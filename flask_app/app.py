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
from datetime import datetime, timedelta
from scipy.stats import norm
import math

load_dotenv()

app = Flask(__name__)
CORS(app)

from flask import send_from_directory

# Crop yield baselines (tons per hectare)
CROP_YIELD_BASELINES = {
    "maize": 3.5, "corn": 3.5, "wheat": 2.8, "rice": 4.2, "soybean": 2.5,
    "tomato": 25.0, "potato": 17.0, "cassava": 10.0, "sorghum": 2.0,
    "barley": 2.7, "millet": 1.5, "beans": 1.2, "pea": 1.8, "cotton": 1.5,
    "sugarcane": 70.0, "coffee": 1.2, "tea": 2.0, "cocoa": 0.8
}

# Crop maturity days
CROP_MATURITY_DAYS = {
    "maize": 120, "corn": 120, "wheat": 150, "rice": 120, "soybean": 100,
    "tomato": 90, "potato": 110, "cassava": 270, "sorghum": 110,
    "barley": 140, "millet": 90, "beans": 85, "pea": 95, "cotton": 160,
    "sugarcane": 365, "coffee": 270, "tea": 180, "cocoa": 180
}

# Soil type multipliers (adjust yield based on soil quality)
SOIL_MULTIPLIERS = {
    "loam": 1.0, "clay": 0.85, "sandy": 0.75, "silt": 0.95, 
    "peat": 0.9, "chalky": 0.8, "clay_loam": 0.95, "sandy_loam": 0.9
}

# Irrigation type multipliers
IRRIGATION_MULTIPLIERS = {
    "drip": 1.1, "sprinkler": 1.0, "flood": 0.9, "none": 0.7,
    "manual": 0.85, "pivot": 1.05, "subsurface": 1.15
}

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


@app.route('/api/yield-prediction', methods=['POST'])
def yield_prediction():
    try:
        # Get form data
        crop_type = request.form.get('crop_type', '').strip().lower()
        variety = request.form.get('variety', '').strip()
        area = request.form.get('area', '').strip()
        planting_date_str = request.form.get('planting_date', '').strip()
        soil_type = request.form.get('soil_type', '').strip().lower()
        irrigation_type = request.form.get('irrigation_type', '').strip().lower()
        
        # Validate required fields
        if not all([crop_type, variety, area, planting_date_str, soil_type, irrigation_type]):
            return jsonify({
                "error": "All fields are required",
                "status": "error"
            }), 400
        
        try:
            area_float = float(area)
            if area_float <= 0:
                raise ValueError("Area must be positive")
        except ValueError:
            return jsonify({
                "error": "Invalid area value",
                "status": "error"
            }), 400
        
        # Calculate quantitative values using formulas
        # 1. Get baseline yield for crop type
        baseline_yield = CROP_YIELD_BASELINES.get(crop_type, 2.0)  # Default to 2.0 if crop not found
        
        # 2. Apply soil and irrigation multipliers
        soil_multiplier = SOIL_MULTIPLIERS.get(soil_type, 0.8)
        irrigation_multiplier = IRRIGATION_MULTIPLIERS.get(irrigation_type, 0.8)
        
        # 3. Calculate expected yield per hectare
        expected_yield_per_hectare = baseline_yield * soil_multiplier * irrigation_multiplier
        
        # 4. Calculate total yield
        total_yield = area_float * expected_yield_per_hectare
        
        # 5. Calculate harvest window
        try:
            planting_date = datetime.strptime(planting_date_str, '%Y-%m-%d')
            maturity_days = CROP_MATURITY_DAYS.get(crop_type, 100)
            harvest_start = planting_date + timedelta(days=maturity_days - 7)
            harvest_end = planting_date + timedelta(days=maturity_days + 7)
            harvest_window = f"{harvest_start.strftime('%b %d')}-{harvest_end.strftime('%b %d')}"
        except:
            harvest_window = "Unable to determine"
        
        # 6. Calculate confidence using normal distribution
        try:
            # Assume baseline yield has a standard deviation of 20%
            baseline_std = baseline_yield * 0.2
            confidence = int(norm.cdf(expected_yield_per_hectare, 
                                    loc=baseline_yield, 
                                    scale=baseline_std) * 100)
            confidence = max(50, min(95, confidence))  # Keep between 50-95%
        except:
            confidence = 75  # Fallback value
        
        # 7. Calculate comparison percentage (how it compares to baseline)
        comparison_percentage = int(((expected_yield_per_hectare / baseline_yield) - 1) * 100)
        comparison_status = "above" if comparison_percentage >= 0 else "below"
        
        # 8. Calculate individual scores using weighted factors
        weather_score = 75 + (comparison_percentage // 2)  # Simulate weather impact
        soil_score = int(soil_multiplier * 100)
        water_score = int(irrigation_multiplier * 100)
        pest_score = 80  # Base pest score, will be modified by Gemini
        
        # Prepare content for Gemini - Only ask for qualitative insights
        analysis_prompt = f"""
        You are an expert agricultural yield prediction AI specialist. Based on the calculated quantitative values, provide ONLY qualitative insights and recommendations in a valid JSON response with the following exact structure:

        {{
            "weather_impact": "+8%",
            "weather_rainfall": "Optimal",
            "weather_temperature": "Ideal range",
            "weather_recommendation": "Weather conditions are favorable for maximum yield potential.",
            "soil_impact": "+5%",
            "soil_ph": "6.8 (Ideal)",
            "soil_organic_matter": "Good",
            "soil_recommendation": "Soil conditions are excellent. Maintain current practices.",
            "water_impact": "+2%",
            "water_stress": "Low",
            "water_efficiency": "Could improve",
            "water_recommendation": "Consider optimizing irrigation schedule for better efficiency.",
            "pest_impact": "-3%",
            "pest_risk_level": "Medium",
            "pest_early_blight": "Low risk",
            "pest_primary_threat": "Aphids - Moderate risk",
            "pest_recommendation": "Monitor closely. Consider preventive measures in 2 weeks.",
            "recommendations": [
                {{
                    "title": "Optimize Irrigation",
                    "description": "Adjust drip irrigation to 30 minutes twice daily instead of 45 minutes once daily. This improves water absorption and reduces runoff.",
                    "timeframe": "Implement within 7 days",
                    "potential_gain": "Potential yield gain: +5%",
                    "urgency": "medium",
                    "icon": "fas fa-tint"
                }},
                {{
                    "title": "Pest Prevention",
                    "description": "Apply neem oil solution as preventive measure against aphids. Focus on lower leaf surfaces where pests typically gather.",
                    "timeframe": "Apply within 5 days",
                    "potential_gain": "Prevents 3-5% yield loss",
                    "urgency": "high",
                    "icon": "fas fa-spray-can"
                }}
            ],
            "summary": "Based on current conditions, your {crop_type} crop shows excellent potential with favorable weather and soil conditions."
        }}

        IMPORTANT: DO NOT generate any numerical values for total_yield, yield_per_hectare, harvest_window, confidence, comparison_percentage, or any scores. These have already been calculated mathematically.

        Crop Information:
        - Crop Type: {crop_type}
        - Variety: {variety}  
        - Cultivation Area: {area} hectares
        - Planting Date: {planting_date_str}
        - Soil Type: {soil_type}
        - Irrigation Type: {irrigation_type}

        Calculated Values:
        - Expected Yield: {total_yield:.2f} tons total, {expected_yield_per_hectare:.2f} tons/hectare
        - Harvest Window: {harvest_window}
        - Confidence: {confidence}%
        - Comparison: {comparison_percentage}% {comparison_status} baseline

        Provide only qualitative insights, explanations, and recommendations based on these calculated values. Return ONLY valid JSON, no other text.
        """
        
        # Send to Gemini for qualitative analysis
        response = model.generate_content(
            contents=[analysis_prompt],
            generation_config=genai.types.GenerationConfig(
                temperature=0.2,
                max_output_tokens=1500,
            )
        )
        
        # Get the response text
        response_text = response.text.strip()
        print(f"Gemini qualitative response: {response_text}")
        
        # Try to parse JSON response
        try:
            # Clean the response text - remove any markdown formatting
            if response_text.startswith('```json'):
                response_text = response_text.replace('```json', '').replace('```', '').strip()
            elif response_text.startswith('```'):
                response_text = response_text.replace('```', '').strip()
            
            qualitative_result = json.loads(response_text)
            
            # Combine mathematical calculations with Gemini's qualitative insights
            prediction_result = {
                "total_yield": round(total_yield, 2),
                "yield_per_hectare": round(expected_yield_per_hectare, 2),
                "harvest_window": harvest_window,
                "confidence": confidence,
                "comparison_percentage": abs(comparison_percentage),  # Absolute value
                "comparison_status": comparison_status,
                "weather_score": weather_score,
                "soil_score": soil_score,
                "water_score": water_score,
                "pest_score": pest_score,
            }
            
            # Add all qualitative fields from Gemini
            prediction_result.update(qualitative_result)
            
            return jsonify({
                "prediction": prediction_result,
                "status": "success"
            })
            
        except (json.JSONDecodeError, ValueError) as e:
            print(f"JSON parsing error: {str(e)}")
            print(f"Raw response: {response_text}")
            
            # Fallback with calculated values only
            prediction_result = {
                "total_yield": round(total_yield, 2),
                "yield_per_hectare": round(expected_yield_per_hectare, 2),
                "harvest_window": harvest_window,
                "confidence": confidence,
                "comparison_percentage": abs(comparison_percentage),
                "comparison_status": comparison_status,
                "weather_score": weather_score,
                "weather_impact": "0%",
                "weather_recommendation": "Weather analysis unavailable",
                "soil_score": soil_score,
                "soil_impact": "0%", 
                "soil_recommendation": "Soil analysis unavailable",
                "water_score": water_score,
                "water_impact": "0%",
                "water_recommendation": "Water analysis unavailable",
                "pest_score": pest_score,
                "pest_impact": "0%",
                "pest_recommendation": "Pest analysis unavailable",
                "recommendations": [
                    {
                        "title": "Analysis Partially Completed",
                        "description": "Quantitative calculations completed but qualitative analysis failed",
                        "timeframe": "N/A",
                        "potential_gain": "Please try again or consult an expert",
                        "urgency": "low",
                        "icon": "fas fa-exclamation-triangle"
                    }
                ],
                "summary": f"Yield prediction calculated but detailed analysis unavailable. Expected yield: {total_yield:.2f} tons."
            }
            
            return jsonify({
                "prediction": prediction_result,
                "status": "partial_success"
            })
    
    except Exception as e:
        print(f"Error in yield_prediction: {str(e)}")
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