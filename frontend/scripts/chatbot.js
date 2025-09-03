document.addEventListener('DOMContentLoaded', function() {
    // Chat elements
    const chatContainer = document.getElementById('chat-container');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const voiceBtn = document.getElementById('voice-btn');
    const recordingIndicator = document.getElementById('recording-indicator');
    const recordingTime = document.getElementById('recording-time');
    const imageBtn = document.getElementById('image-btn');
    const imageInput = document.getElementById('image-input');
    const imagePreviewContainer = document.getElementById('imagePreviewContainer');
    const previewImage = document.getElementById('previewImage');
    const removeImageBtn = document.getElementById('removeImageBtn');
    
    // State variables
    let isRecording = false;
    let isGenerating = false;
    let mediaRecorder = null;
    let recordingStartTime = null;
    let recordingTimer = null;
    let audioChunks = [];
    let currentlyPlayingAudio = null;
    let currentTypingTimeout = null;
    let isTyping = false;
    let selectedImage = null;
    let selectedImageFile = null;
    
    // Initialize chat functionality
    initChat();
    
    function initChat() {
        setupEventListeners();
        updateSendButton();
        autoResizeTextarea();
        
        // Add markdown support
        if (typeof marked === 'undefined') {
            loadMarkdownLibrary();
        }
    }
    
    function loadMarkdownLibrary() {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';
        document.head.appendChild(script);
    }
    
    function setupEventListeners() {
        // Send button click
        sendBtn.addEventListener('click', handleSendOrStop);
        
        // Enter key to send (Shift+Enter for new line)
        chatInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (!isGenerating) {
                    handleSendMessage();
                }
            }
        });
        
        // Auto-resize textarea and update send button
        chatInput.addEventListener('input', function() {
            autoResizeTextarea();
            updateSendButton();
        });
        
        // Voice recording
        voiceBtn.addEventListener('click', toggleVoiceRecording);
        
        // Image upload functionality
        imageBtn.addEventListener('click', () => {
            imageInput.click();
        });
        
        imageInput.addEventListener('change', handleImageSelect);
        removeImageBtn.addEventListener('click', removeSelectedImage);
        
        // Voice recording with hold gesture (optional)
        voiceBtn.addEventListener('mousedown', startVoiceRecording);
        voiceBtn.addEventListener('mouseup', stopVoiceRecording);
        voiceBtn.addEventListener('mouseleave', stopVoiceRecording);
        
        // Touch events for mobile
        voiceBtn.addEventListener('touchstart', startVoiceRecording);
        voiceBtn.addEventListener('touchend', stopVoiceRecording);
        voiceBtn.addEventListener('touchcancel', stopVoiceRecording);
    }
    
    function handleSendOrStop() {
        if (isGenerating) {
            stopGeneration();
        } else {
            handleSendMessage();
        }
    }
    
    function stopGeneration() {
        isGenerating = false;
        isTyping = false;
        
        // Reset send button
        sendBtn.innerHTML = '<i class="fas fa-paper-plane"></i>';
        sendBtn.disabled = false;
        
        // Clear typing timeout
        if (currentTypingTimeout) {
            clearTimeout(currentTypingTimeout);
            currentTypingTimeout = null;
        }
        
        chatInput.disabled = false;
    }
    
    function autoResizeTextarea() {
        chatInput.style.height = 'auto';
        const maxHeight = 120; // Max height in pixels
        const newHeight = Math.min(chatInput.scrollHeight, maxHeight);
        chatInput.style.height = newHeight + 'px';
        chatInput.style.overflowY = chatInput.scrollHeight > maxHeight ? 'auto' : 'hidden';
    }
    
    function updateSendButton() {
        const hasText = chatInput.value.trim().length > 0;
        const hasImage = selectedImage !== null;
        if (!isGenerating) {
            sendBtn.disabled = !(hasText || hasImage);
        }
    }
    
    async function handleSendMessage() {
        const message = chatInput.value.trim();
        const hasImage = selectedImage !== null;
        
        if ((!message && !hasImage) || isGenerating) return;
        
        // Set generating state
        isGenerating = true;
        sendBtn.innerHTML = '<div class="dots-spinner"><span></span><span></span><span></span></div>';
        sendBtn.disabled = false; // Keep enabled for stop functionality
        chatInput.disabled = true;
        
        // Add user message to chat (with image if present)
        if (hasImage) {
            addImageMessage(message, selectedImage, 'user');
        } else {
            addTextMessage(message, 'user');
        }
        
        // Clear input and image
        chatInput.value = '';
        removeSelectedImage();
        autoResizeTextarea();
        
        // Add AI loading message
        const aiMessageElement = addAILoadingMessage();
        
        try {
            // Send to backend (include image file if present)
            const response = await sendToBackend(message, null, selectedImageFile);
            
            // Remove loading and start typing
            removeLoadingIndicator(aiMessageElement);
            await typeResponse(response, aiMessageElement);
            
        } catch (error) {
            console.error('Error sending message:', error);
            removeLoadingIndicator(aiMessageElement);
            updateAIMessage(aiMessageElement, 'Sorry, I encountered an error. Please try again.');
        } finally {
            if (!isTyping) {
                stopGeneration();
            }
        }
        
        scrollToBottom();
    }

    function handleImageSelect(event) {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            selectedImageFile = file;
            
            // Create preview
            const reader = new FileReader();
            reader.onload = function(e) {
                selectedImage = e.target.result;
                previewImage.src = selectedImage;
                imagePreviewContainer.style.display = 'block';
                updateSendButton();
            };
            reader.readAsDataURL(file);
        }
    }

    function removeSelectedImage() {
        selectedImage = null;
        selectedImageFile = null;
        imagePreviewContainer.style.display = 'none';
        imageInput.value = '';
        updateSendButton();
    }

    function addTextMessage(message, sender, timestamp = null) {
        const messageElement = document.createElement('div');
        messageElement.className = `chat-message ${sender}-message`;
        
        const time = timestamp || getCurrentTime();
        
        messageElement.innerHTML = `
            <div class="message-content">
                <p>${escapeHtml(message)}</p>
                <span class="message-time">${time}</span>
            </div>
        `;
        
        chatContainer.appendChild(messageElement);
        scrollToBottom();
        scrollToLatestMessage();
        
        return messageElement;
    }
    
    function addImageMessage(message, imageSrc, sender, timestamp = null) {
        const messageElement = document.createElement('div');
        messageElement.className = `chat-message ${sender}-message`;
        
        const time = timestamp || getCurrentTime();
        
        let imageHtml = '';
        if (imageSrc) {
            imageHtml = `<img src="${imageSrc}" alt="Uploaded image" class="message-image" onclick="openImageModal('${imageSrc}')">`;
        }
        
        let textHtml = '';
        if (message) {
            textHtml = `<p>${escapeHtml(message)}</p>`;
        }
        
        messageElement.innerHTML = `
            <div class="message-content">
                ${imageHtml}
                ${textHtml}
                <span class="message-time">${time}</span>
            </div>
        `;
        
        chatContainer.appendChild(messageElement);
        scrollToBottom();
        scrollToLatestMessage();
        
        return messageElement;
    }

    function addAILoadingMessage() {
        const messageElement = document.createElement('div');
        messageElement.className = 'chat-message ai-message';
        
        messageElement.innerHTML = `
            <div class="message-content loading-message">
                <div class="ai-typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
                <span class="message-time">${getCurrentTime()}</span>
            </div>
        `;
        
        chatContainer.appendChild(messageElement);
        scrollToBottom();
        
        return messageElement;
    }
    
    function removeLoadingIndicator(messageElement) {
        const messageContent = messageElement.querySelector('.message-content');
        messageContent.className = 'message-content';
        messageContent.innerHTML = `
            <div class="ai-content"></div>
            <span class="message-time">${getCurrentTime()}</span>
        `;
    }
    
    function updateAIMessage(messageElement, content) {
        const contentDiv = messageElement.querySelector('.ai-content');
        if (contentDiv) {
            const formattedContent = formatMessage(content);
            contentDiv.innerHTML = formattedContent;
        }
    }
    
    async function typeResponse(markdown, messageElement) {
        const contentDiv = messageElement.querySelector('.ai-content');
        if (!contentDiv) return;

        isTyping = true;
        const formattedHTML = formatMessage(markdown);
        
        function getDelay(char) {
            if (char === '.' || char === ',' || char === '?' || char === '!') return 200;
            if (char === ' ') return 20;
            return 15;
        }

        let i = 0;
        
        return new Promise((resolve) => {
            function typing() {
                if (!isGenerating || !isTyping) {
                    // If generation was stopped, show full content and resolve
                    contentDiv.innerHTML = formattedHTML;
                    isTyping = false;
                    resolve();
                    return;
                }
                
                if (i <= formattedHTML.length) {
                    contentDiv.innerHTML = formattedHTML.substring(0, i);
                    scrollToBottom();
                    const delay = getDelay(formattedHTML.charAt(i));
                    i++;
                    currentTypingTimeout = setTimeout(typing, delay);
                } else {
                    // Typing complete
                    isTyping = false;
                    stopGeneration();
                    resolve();
                }
            }
            
            typing();
        });
    }
    
    function formatMessage(text) {
        if (!text) return '';
        
        // Use marked library if available, otherwise return plain text
        if (typeof marked !== 'undefined') {
            return marked.parse(text);
        }
        
        // Simple markdown-like formatting fallback
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code>$1</code>')
            .replace(/\n/g, '<br>');
    }
    
    async function sendToBackend(message, audioBlob, imageFile) {
        const formData = new FormData();
        formData.append('message', message || '');
        
        if (audioBlob) {
            formData.append('audio', audioBlob, 'audio.webm');
        }
        
        if (imageFile) {
            formData.append('image', imageFile);
        }

        const response = await fetch('http://127.0.0.1:5000/api/safety-chat', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.response;
    }
    
    function addVoiceMessage(audioBlob, sender, duration, timestamp = null) {
        const messageElement = document.createElement('div');
        messageElement.className = `chat-message ${sender}-message`;
        
        const time = timestamp || getCurrentTime();
        const audioUrl = URL.createObjectURL(audioBlob);
        const voiceId = 'voice_' + Date.now();
        
        messageElement.innerHTML = `
            <div class="message-content voice-message">
                <button class="voice-play-btn" data-audio-url="${audioUrl}" data-voice-id="${voiceId}">
                    <i class="fas fa-play"></i>
                </button>
                <div class="voice-waveform"></div>
                <span class="voice-duration">${formatDuration(duration)}</span>
                <span class="message-time">${time}</span>
            </div>
        `;
        
        // Add play button functionality
        const playBtn = messageElement.querySelector('.voice-play-btn');
        playBtn.addEventListener('click', () => toggleAudioPlayback(playBtn, audioUrl, voiceId));
        
        chatContainer.appendChild(messageElement);
        scrollToBottom();
        
        return messageElement;
    }
    
    function toggleVoiceRecording(e) {
        e.preventDefault();
        if (isRecording) {
            stopVoiceRecording();
        } else {
            startVoiceRecording();
        }
    }

    async function startVoiceRecording() {
        if (isRecording) return;
        
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            
            mediaRecorder = new MediaRecorder(stream);
            audioChunks = [];
            
            mediaRecorder.ondataavailable = event => {
                audioChunks.push(event.data);
            };
            
            mediaRecorder.onstop = handleRecordingStop;
            
            mediaRecorder.start();
            isRecording = true;
            recordingStartTime = Date.now();
            
            // Update UI
            voiceBtn.classList.add('recording');
            voiceBtn.innerHTML = '<i class="fas fa-stop"></i>';
            
            // Move recording indicator before input wrapper
            const inputWrapper = document.querySelector('.input-wrapper');
            inputWrapper.parentNode.insertBefore(recordingIndicator, inputWrapper);
            recordingIndicator.style.display = 'flex';
            
            // Start timer
            startRecordingTimer();
            
        } catch (error) {
            console.error('Error accessing microphone:', error);
            showError('Could not access microphone. Please check permissions.');
        }
    }
    
    function stopVoiceRecording() {
        if (!isRecording || !mediaRecorder) return;
        
        isRecording = false;
        mediaRecorder.stop();
        
        // Stop all tracks to free up microphone
        mediaRecorder.stream.getTracks().forEach(track => track.stop());
        
        // Update UI
        voiceBtn.classList.remove('recording');
        voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
        recordingIndicator.style.display = 'none';
        
        // Clear timer
        if (recordingTimer) {
            clearInterval(recordingTimer);
            recordingTimer = null;
        }
    }
    
    async function handleRecordingStop() {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        const duration = Math.floor((Date.now() - recordingStartTime) / 1000);
        
        // Only process if recording was longer than 1 second
        if (duration >= 1) {
            // Add voice message to chat
            addVoiceMessage(audioBlob, 'user', duration);
            
            // Set generating state
            isGenerating = true;
            sendBtn.innerHTML = '<div class="dots-spinner"><span></span><span></span><span></span></div>';
            chatInput.disabled = true;
            
            // Add AI loading message
            const aiMessageElement = addAILoadingMessage();
            
            try {
                // Send audio to backend
                const response = await sendToBackend('', audioBlob);
                
                // Remove loading and start typing
                removeLoadingIndicator(aiMessageElement);
                await typeResponse(response, aiMessageElement);
                
            } catch (error) {
                console.error('Error sending audio:', error);
                removeLoadingIndicator(aiMessageElement);
                updateAIMessage(aiMessageElement, 'Sorry, I could not process your audio. Please try again.');
            } finally {
                if (!isTyping) {
                    stopGeneration();
                }
            }
        }
        
        // Clean up
        audioChunks = [];
        recordingStartTime = null;
    }
    
    function startRecordingTimer() {
        recordingTimer = setInterval(() => {
            if (recordingStartTime) {
                const elapsed = Math.floor((Date.now() - recordingStartTime) / 1000);
                recordingTime.textContent = formatDuration(elapsed);
                
                // Auto-stop after 60 seconds
                if (elapsed >= 60) {
                    stopVoiceRecording();
                }
            }
        }, 1000);
    }
    
    function toggleAudioPlayback(button, audioUrl, voiceId) {
        const icon = button.querySelector('i');
        
        // Stop any currently playing audio
        if (currentlyPlayingAudio && !currentlyPlayingAudio.paused) {
            currentlyPlayingAudio.pause();
            currentlyPlayingAudio.currentTime = 0;
            
            // Reset all play buttons
            document.querySelectorAll('.voice-play-btn').forEach(btn => {
                btn.querySelector('i').className = 'fas fa-play';
            });
        }
        
        // If clicking the same button that was playing, just stop
        if (currentlyPlayingAudio && currentlyPlayingAudio.src === audioUrl && !currentlyPlayingAudio.paused) {
            return;
        }
        
        // Create new audio element
        currentlyPlayingAudio = new Audio(audioUrl);
        
        currentlyPlayingAudio.onplay = () => {
            icon.className = 'fas fa-pause';
        };
        
        currentlyPlayingAudio.onpause = () => {
            icon.className = 'fas fa-play';
        };
        
        currentlyPlayingAudio.onended = () => {
            icon.className = 'fas fa-play';
            currentlyPlayingAudio = null;
        };
        
        currentlyPlayingAudio.onerror = () => {
            icon.className = 'fas fa-play';
            currentlyPlayingAudio = null;
            showError('Could not play audio');
        };
        
        // Start playing
        currentlyPlayingAudio.play().catch(error => {
            console.error('Error playing audio:', error);
            showError('Could not play audio');
        });
    }
    
    function scrollToBottom() {
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
    
    function getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
        });
    }
    
    function formatDuration(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    function showError(message) {
        // Create error toast
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--danger-color);
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            z-index: 1000;
            animation: slideDown 0.3s ease;
        `;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
    
    function scrollToLatestMessage() {
        const chatContainer = document.getElementById('chat-container');
        if (chatContainer) {
            setTimeout(() => {
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }, 100);
        }
    }
function openImageModal(imageSrc) {
    // Create a simple modal to view full-size image
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10002;
        cursor: pointer;
    `;
    
    const img = document.createElement('img');
    img.src = imageSrc;
    img.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        border-radius: 8px;
    `;
    
    modal.appendChild(img);
    document.body.appendChild(modal);
    
    modal.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
}
    // Export functions for external use if needed
    window.chatFunctionality = {
        addTextMessage,
        addVoiceMessage,
        scrollToBottom
    };
});

