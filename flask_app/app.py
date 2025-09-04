from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import io
import fitz
import google.generativeai as genai
from datetime import datetime
import os
import json
from dotenv import load_dotenv
import tempfile

load_dotenv()

app = Flask(__name__)
CORS(app)

from flask import send_from_directory

# @app.route('/')
# def serve_index():
#     return send_from_directory('.', 'dashboard.php')

genai.configure(api_key=os.getenv('GEMINI_API_KEY'))

try:
    with open('system_instruction.txt', 'r') as file:
        system_instruction = file.read()
except FileNotFoundError:
    system_instruction = "No instructions found"

model = genai.GenerativeModel(
    model_name="gemini-2.0-flash-exp",
    system_instruction=system_instruction
)

chat_sessions = {}

def process_image(file_stream):
    """Process uploaded image file and return image data for Gemini"""
    try:
        # Reset stream position to beginning
        file_stream.seek(0)
        image = Image.open(file_stream)
        
        # Convert to RGB if necessary
        if image.mode != 'RGB':
            image = image.convert('RGB')
        
        # Save as PNG bytes
        image_bytes = io.BytesIO()
        image.save(image_bytes, format="PNG")
        image_bytes.seek(0)
        
        return {
            "mime_type": "image/png",
            "data": image_bytes.read()
        }
    except Exception as e:
        print(f"Image processing error: {e}")
        return None

@app.route('/api/chatbot', methods=['POST'])
def chatbot_response():
    try:
        user_input = request.form.get("message", "").strip()
        conversation_id = request.form.get("conversation_id", "")
        audio_file = request.files.get("audio")
        image_file = request.files.get("image")
        
        # Validate input - either text message, audio file, or image file must be provided
        if not user_input and not audio_file and not image_file:
            return jsonify({
                "error": "No message, audio, or image provided", 
                "response": "Please provide a message, audio recording, or image."
            }), 400
        
        # Create chat session
        if not conversation_id:
            conversation_id = f"conv_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
        
        if conversation_id not in chat_sessions:
            chat_sessions[conversation_id] = model.start_chat()
        
        chat = chat_sessions[conversation_id]
        
        # Prepare content for the message
        content_parts = []
        
        # Handle image file if provided
        if image_file:
            try:
                filename = image_file.filename.lower()
                if filename.endswith((".png", ".jpg", ".jpeg", ".gif", ".bmp", ".webp")):
                    image_data = process_image(image_file.stream)
                    if image_data:
                        content_parts.append(image_data)
                        if user_input:
                            content_parts.append(f"User question about the image: {user_input}")
                        else:
                            content_parts.append("Please describe what you see in this image.")
                    else:
                        content_parts.append(f"I received an image file named '{image_file.filename}' but couldn't process it.")
                else:
                    content_parts.append(f"I received a file named '{image_file.filename}' but I can only process image files (PNG, JPG, JPEG, GIF, BMP, WEBP).")
                    
                print(f"Processing image file: {image_file.filename}")
                
            except Exception as image_error:
                print(f"Error processing image: {str(image_error)}")
                return jsonify({
                    "error": "Failed to process image file",
                    "response": "I'm sorry, I couldn't process your image. Please try again.",
                    "status": "error"
                }), 400
        
        # Handle audio file if provided
        elif audio_file:
            try:
                # Save audio file temporarily
                with tempfile.NamedTemporaryFile(delete=False, suffix='.webm') as temp_file:
                    audio_data = audio_file.read()
                    temp_file.write(audio_data)
                    temp_audio_path = temp_file.name
                
                print(f"Processing audio file: {audio_file.filename}, Size: {len(audio_data)} bytes")
                
                # Upload the audio file to Gemini
                uploaded_file = genai.upload_file(path=temp_audio_path, mime_type='audio/webm')
                print(f"Uploaded audio file: {uploaded_file.uri}")
                
                # If no text message, add a default prompt for audio analysis
                if not user_input:
                    content_parts.append("Please transcribe and respond to this audio message based strictly and fully on the user language spoken.")
                else:
                    content_parts.append(user_input)
                
                content_parts.append(uploaded_file)
                
                # Clean up temp file
                os.unlink(temp_audio_path)
                
            except Exception as audio_error:
                print(f"Error processing audio: {str(audio_error)}")
                # Clean up temp file if it exists
                try:
                    if 'temp_audio_path' in locals():
                        os.unlink(temp_audio_path)
                except:
                    pass
                return jsonify({
                    "error": "Failed to process audio file",
                    "response": "I'm sorry, I couldn't process your audio recording. Please try again.",
                    "status": "error"
                }), 400
        
        # Add user message if provided and not already handled with image
        if user_input and not image_file:
            content_parts.append(user_input)
        
        # Send message to Gemini
        response = chat.send_message(
            content=content_parts,
            generation_config=genai.types.GenerationConfig(
                temperature=0.2,
                max_output_tokens=500,
            )
        )
        
        # Get the response text
        response_text = response.text
        print(f"Gemini response: {response_text[:100]}...")
        
        return jsonify({
            "response": response_text,
            "conversation_id": conversation_id,
            "status": "success"
        })
    
    except Exception as e:
        print(f"Error in chatbot_response: {str(e)}")
        import traceback
        traceback.print_exc()
        
        return jsonify({
            "error": str(e),
            "response": "I'm sorry, I encountered an error while processing your request. Please try again.",
            "status": "error"
        }), 500


# CROP ANALYSIS

@app.route('/api/crop-analysis', methods=['POST'])
def crop_analysis():
    try:
        uploaded_files = request.files.getlist('images')
        
        if not uploaded_files or len(uploaded_files) == 0:
            return jsonify({
                "error": "No images provided",
                "status": "error"
            }), 400
        
        # Validate that we have 1-3 images
        if len(uploaded_files) > 3:
            return jsonify({
                "error": "Maximum 3 images allowed",
                "status": "error"
            }), 400
        
        # Process images
        processed_images = []
        for i, image_file in enumerate(uploaded_files):
            if image_file.filename == '':
                continue
                
            try:
                # Process image
                image_data = process_image(image_file.stream)
                if image_data:
                    processed_images.append(image_data)
                else:
                    return jsonify({
                        "error": f"Could not process image {i+1}",
                        "status": "error"
                    }), 400
            except Exception as e:
                print(f"Error processing image {i+1}: {str(e)}")
                return jsonify({
                    "error": f"Failed to process image {i+1}",
                    "status": "error"
                }), 400
        
        if not processed_images:
            return jsonify({
                "error": "No valid images to analyze",
                "status": "error"
            }), 400
        
        # Prepare content for Gemini
        content_parts = []
        
        # Add system instruction for crop analysis
        analysis_prompt = """
        You are an expert agricultural AI specialist. Analyze the provided crop image(s) and return ONLY a valid JSON response with the following exact structure:

        {
            "health_score": 85,
            "health_status": "Healthy|Moderate|Critical",
            "issues": [
                {
                    "name": "Issue Name",
                    "description": "Brief description of the issue",
                    "confidence": 92,
                    "severity": "low|medium|high",
                    "type": "disease|pest|nutrient|environmental"
                }
            ],
            "recommendations": [
                {
                    "title": "Action Title",
                    "description": "Detailed recommendation description",
                    "urgency": "low|medium|high",
                    "timeframe": "Apply within X days",
                    "details": ["Detail 1", "Detail 2"]
                }
            ],
            "summary": "Brief overall assessment of the crop condition"
        }

        Analyze for diseases, pests, nutrient deficiencies, and general health. Provide confidence scores as percentages (0-100). Return ONLY valid JSON, no other text.
        """
        
        content_parts.append(analysis_prompt)
        
        # Add all processed images
        for image_data in processed_images:
            content_parts.append(image_data)
        
        # Send to Gemini for analysis
        response = model.generate_content(
            contents=content_parts,  # Changed 'content' to 'contents'
            generation_config=genai.types.GenerationConfig(
                temperature=0.1,
                max_output_tokens=1000,
            )
        )
        
        # Get the response text
        response_text = response.text.strip()
        print(f"Gemini crop analysis response: {response_text}")
        
        # Try to parse JSON response
        try:
            # Clean the response text - remove any markdown formatting
            if response_text.startswith('```json'):
                response_text = response_text.replace('```json', '').replace('```', '').strip()
            elif response_text.startswith('```'):
                response_text = response_text.replace('```', '').strip()
            
            analysis_result = json.loads(response_text)
            
            # Validate required fields
            required_fields = ['health_score', 'health_status', 'issues', 'recommendations', 'summary']
            for field in required_fields:
                if field not in analysis_result:
                    raise ValueError(f"Missing required field: {field}")
            
            return jsonify({
                "analysis": analysis_result,
                "status": "success"
            })
            
        except (json.JSONDecodeError, ValueError) as e:
            print(f"JSON parsing error: {str(e)}")
            print(f"Raw response: {response_text}")
            
            # Fallback response if JSON parsing fails
            return jsonify({
                "analysis": {
                    "health_score": 0,
                    "health_status": "Moderate",
                    "issues": [
                        {
                            "name": "Analysis Error",
                            "description": "Could not parse detailed analysis",
                            "confidence": 0,
                            "severity": "medium",
                            "type": "system"
                        }
                    ],
                    "recommendations": [
                        {
                            "title": "Manual Review Needed",
                            "description": "Please consult with an agricultural expert for detailed analysis",
                            "urgency": "medium",
                            "timeframe": "As soon as possible",
                            "details": ["Contact local agricultural extension office"]
                        }
                    ],
                    "summary": "Analysis completed but detailed results unavailable. Raw AI response: " + response_text[:200]
                },
                "status": "partial_success"
            })
    
    except Exception as e:
        print(f"Error in crop_analysis: {str(e)}")
        import traceback
        traceback.print_exc()
        
        return jsonify({
            "error": str(e),
            "status": "error"
        }), 500


@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy", "message": "Chatbot API is running"})

if __name__ == '__main__':
    print("Starting Flask chatbot server...")
    app.run(debug=True, host='0.0.0.0', port=5000)