// Crop Analysis Modal with Gemini Integration
document.addEventListener('DOMContentLoaded', function() {
    // State variables
    let uploadedImages = [];
    let analysisInProgress = false;
    
    // Create crop modal element
    const cropModal = document.createElement('div');
    cropModal.className = 'crop-modal';
    cropModal.innerHTML = `
        <div class="crop-modal-backdrop"></div>
        <div class="crop-modal-container">
            <div class="crop-modal-header">
                <div class="crop-header-content">
                    <div class="crop-avatar">
                        <div class="crop-pulse"></div>
                        <i class="fas fa-seedling"></i>
                    </div>
                    <div class="crop-header-text">
                        <h2>Crop Analysis</h2>
                        <p>AI-powered crop health monitoring and diagnostics</p>
                    </div>
                </div>
                <button class="crop-modal-close" id="closeCropModal">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="crop-modal-body">
                <div class="crop-upload-section">
                    <h3 class="upload-title">Upload Crop Images for Analysis</h3>
                    <div class="upload-options">
                        <div class="upload-btn" id="uploadImageBtn">
                            <i class="fas fa-cloud-upload-alt"></i>
                            <span>Upload Image</span>
                            <input type="file" accept="image/*" multiple style="display: none;" id="cropImageInput">
                        </div>
                        <div class="upload-btn" id="takePhotoBtn">
                            <i class="fas fa-camera"></i>
                            <span>Take Photo</span>
                        </div>
                    </div>
                    <div class="upload-preview">
                        <div class="preview-item empty" data-index="0">
                            <i class="fas fa-plus"></i>
                        </div>
                        <div class="preview-item empty" data-index="1">
                            <i class="fas fa-plus"></i>
                        </div>
                        <div class="preview-item empty" data-index="2">
                            <i class="fas fa-plus"></i>
                        </div>
                    </div>
                    <button class="analyze-btn" id="analyzeBtn" disabled>
                        <i class="fas fa-search"></i>
                        Analyze Crop Health
                    </button>
                </div>
                
                <div class="crop-results-section" style="display: none;">
                    <h3 class="section-title"><i class="fas fa-heartbeat"></i> Health Assessment</h3>
                    <div class="health-indicator">
                        <div class="health-score">--</div>
                        <div class="health-label">Overall Crop Health</div>
                        <div class="health-gauge">
                            <div class="gauge-fill" style="width: 0%"></div>
                        </div>
                        <div class="gauge-markers">
                            <span class="gauge-marker">Critical</span>
                            <span class="gauge-marker">Moderate</span>
                            <span class="gauge-marker">Healthy</span>
                        </div>
                    </div>
                    <div class="issues-list">
                        <!-- Issues will be populated here -->
                    </div>
                </div>
                
                <div class="image-analysis" style="display: none;">
                    <h3 class="section-title"><i class="fas fa-image"></i> Image Analysis</h3>
                    <div class="analyzed-image">
                        <img src="" alt="Crop analysis" id="analyzedImage">
                    </div>
                    <div class="analysis-notes">
                        <p>AI analysis results will appear here after processing.</p>
                    </div>
                </div>
                
                <div class="recommendations-section" style="display: none;">
                    <h3 class="section-title"><i class="fas fa-clipboard-list"></i> Recommended Actions</h3>
                    <!-- Recommendations will be populated here -->
                </div>
                            
                <div class="crop-actions">
                    <button class="crop-action-btn" id="analyzeAnotherBtn">
                        <i class="fas fa-camera"></i>
                        Analyze Another Crop
                    </button>
                    <button class="crop-action-btn">
                        <i class="fas fa-history"></i>
                        View Historical Data
                    </button>
                    <button class="crop-action-btn primary">
                        <i class="fas fa-shopping-cart"></i>
                        Find Recommended Products
                    </button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(cropModal);
    
    // Get elements
    const cropModalBackdrop = cropModal.querySelector('.crop-modal-backdrop');
    const closeCropModal = cropModal.querySelector('#closeCropModal');
    const uploadImageBtn = cropModal.querySelector('#uploadImageBtn');
    const takePhotoBtn = cropModal.querySelector('#takePhotoBtn');
    const cropImageInput = cropModal.querySelector('#cropImageInput');
    const analyzeBtn = cropModal.querySelector('#analyzeBtn');
    const analyzeAnotherBtn = cropModal.querySelector('#analyzeAnotherBtn');
    const previewItems = cropModal.querySelectorAll('.preview-item');
    const analyzedImage = cropModal.querySelector('#analyzedImage');
    
    // Open modal when crop analysis is clicked
    document.addEventListener('click', function(e) {
        if (e.target.closest('.crop-analysis')) {
            e.preventDefault();
            openCropModal();
        }
    });
    
    // Close modal handlers
    closeCropModal?.addEventListener('click', closeCropModalFunc);
    cropModalBackdrop?.addEventListener('click', function(e) {
        if (e.target === cropModalBackdrop) {
            closeCropModalFunc();
        }
    });
    
    // Upload image button click
    uploadImageBtn?.addEventListener('click', function() {
        cropImageInput.click();
    });
    
    // Image input change handler
    cropImageInput?.addEventListener('change', function(e) {
        const files = Array.from(e.target.files);
        
        files.forEach(file => {
            if (uploadedImages.length >= 3) return; // Max 3 images
            
            const reader = new FileReader();
            reader.onload = function(event) {
                const emptyPreview = Array.from(previewItems).find(item => 
                    item.classList.contains('empty')
                );
                
                if (emptyPreview) {
                    emptyPreview.innerHTML = '';
                    emptyPreview.classList.remove('empty');
                    
                    const img = document.createElement('img');
                    img.src = event.target.result;
                    emptyPreview.appendChild(img);
                    
                    // Add remove button
                    const removeBtn = document.createElement('button');
                    removeBtn.className = 'preview-remove';
                    removeBtn.innerHTML = '<i class="fas fa-times"></i>';
                    removeBtn.onclick = (e) => {
                        e.stopPropagation();
                        removeImage(emptyPreview);
                    };
                    emptyPreview.appendChild(removeBtn);
                    
                    // Store file data
                    uploadedImages.push({
                        file: file,
                        preview: event.target.result,
                        element: emptyPreview
                    });
                    
                    updateAnalyzeButton();
                }
            };
            reader.readAsDataURL(file);
        });
        
        // Clear input
        e.target.value = '';
    });
    
    // Take photo button (placeholder for camera functionality)
    takePhotoBtn?.addEventListener('click', function() {
        // In production, implement camera access
        alert("Camera functionality would be implemented here. Please use the upload option for now.");
    });
    
    // Analyze button click
    analyzeBtn?.addEventListener('click', async function() {
        if (uploadedImages.length === 0 || analysisInProgress) return;
        
        await performAnalysis();
    });
    
    // Analyze another button
    analyzeAnotherBtn?.addEventListener('click', function() {
        resetCropModal();
    });
    
    // Functions
    function openCropModal() {
        cropModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        resetCropModal();
    }
    
    function closeCropModalFunc() {
        cropModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    function resetCropModal() {
        // Clear state
        uploadedImages = [];
        analysisInProgress = false;
        
        // Reset preview items
        previewItems.forEach(item => {
            item.innerHTML = '<i class="fas fa-plus"></i>';
            item.classList.add('empty');
        });
        
        // Reset buttons
        analyzeBtn.disabled = true;
        analyzeBtn.innerHTML = '<i class="fas fa-search"></i> Analyze Crop Health';
        
        // Hide result sections
        hideResultSections();
        
        // Remove overlays
        removeOverlays();
    }
    
    function removeImage(previewElement) {
        const imageIndex = uploadedImages.findIndex(img => img.element === previewElement);
        if (imageIndex > -1) {
            uploadedImages.splice(imageIndex, 1);
        }
        
        previewElement.innerHTML = '<i class="fas fa-plus"></i>';
        previewElement.classList.add('empty');
        
        updateAnalyzeButton();
    }
    
    function updateAnalyzeButton() {
        analyzeBtn.disabled = uploadedImages.length === 0;
    }
    
    async function performAnalysis() {
        if (analysisInProgress) return;
        
        analysisInProgress = true;
        showAnalysisLoading();
        
        try {
            const analysisResult = await sendImagesToBackend();
            hideAnalysisLoading();
            displayAnalysisResults(analysisResult);
        } catch (error) {
            console.error('Analysis error:', error);
            hideAnalysisLoading();
            showAnalysisError(error.message || 'Failed to analyze images. Please try again.');
        } finally {
            analysisInProgress = false;
        }
    }
    
    async function sendImagesToBackend() {
        const formData = new FormData();
        
        uploadedImages.forEach((imageData) => {
            formData.append('images', imageData.file);
        });
        
        const response = await fetch('http://127.0.0.1:5000/api/crop-analysis', {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.status === 'error') {
            throw new Error(data.error);
        }
        
        return data.analysis;
    }
    
    function showAnalysisLoading() {
        analyzeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
        analyzeBtn.disabled = true;
        
        hideResultSections();
        
        const loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'analysis-loading-overlay';
        loadingOverlay.innerHTML = `
            <div class="loading-content">
                <div class="loading-spinner">
                    <div class="spinner-ring"></div>
                    <div class="spinner-ring"></div>
                    <div class="spinner-ring"></div>
                </div>
                <h3>Analyzing Your Crop Images</h3>
                <p>AI is processing your images and detecting crop health issues...</p>
                <div class="loading-progress">
                    <div class="progress-bar">
                        <div class="progress-fill"></div>
                    </div>
                    <span class="progress-text">Processing images...</span>
                </div>
            </div>
        `;
        
        cropModal.querySelector('.crop-modal-body').appendChild(loadingOverlay);
        animateProgress();
    }
    
    function hideAnalysisLoading() {
        removeOverlays();
        analyzeBtn.innerHTML = '<i class="fas fa-search"></i> Analyze Crop Health';
        analyzeBtn.disabled = false;
    }
    
    function animateProgress() {
        const overlay = cropModal.querySelector('.analysis-loading-overlay');
        if (!overlay) return;
        
        const progressFill = overlay.querySelector('.progress-fill');
        const progressText = overlay.querySelector('.progress-text');
        
        setTimeout(() => {
            progressFill.style.width = '30%';
            progressText.textContent = 'Detecting crop features...';
        }, 500);
        
        setTimeout(() => {
            progressFill.style.width = '60%';
            progressText.textContent = 'Analyzing health indicators...';
        }, 1500);
        
        setTimeout(() => {
            progressFill.style.width = '90%';
            progressText.textContent = 'Generating recommendations...';
        }, 2500);
    }
    
    function displayAnalysisResults(analysis) {
        // Update health score
        const healthScore = cropModal.querySelector('.health-score');
        const healthLabel = cropModal.querySelector('.health-label');
        const gaugeFill = cropModal.querySelector('.gauge-fill');
        
        healthScore.textContent = `${analysis.health_score}%`;
        healthLabel.textContent = `Overall Crop Health - ${analysis.health_status}`;
        gaugeFill.style.width = `${analysis.health_score}%`;
        
        // Update issues
        updateIssuesList(analysis.issues);
        
        // Update recommendations
        updateRecommendations(analysis.recommendations);
        
        // Update analyzed image
        if (uploadedImages.length > 0) {
            analyzedImage.src = uploadedImages[0].preview;
        }
        
        // Update analysis notes
        const analysisNotes = cropModal.querySelector('.analysis-notes p');
        analysisNotes.textContent = analysis.summary || 'AI analysis completed successfully.';
        
        // Show results with animation
        showResultSections();
    }
    
    function updateIssuesList(issues) {
        const issuesList = cropModal.querySelector('.issues-list');
        issuesList.innerHTML = '';
        
        if (issues.length === 0) {
            issuesList.innerHTML = '<p class="no-issues">No significant issues detected in your crops!</p>';
            return;
        }
        
        issues.forEach(issue => {
            const issueElement = document.createElement('div');
            issueElement.className = `issue-item ${getSeverityClass(issue.severity)}`;
            
            issueElement.innerHTML = `
                <div class="issue-icon">
                    <i class="${getIssueIcon(issue.type, issue.severity)}"></i>
                </div>
                <div class="issue-content">
                    <div class="issue-name">${issue.name}</div>
                    <p class="issue-desc">${issue.description}</p>
                    <span class="issue-confidence">${issue.confidence}% confidence</span>
                </div>
            `;
            
            issuesList.appendChild(issueElement);
        });
    }
    
    function updateRecommendations(recommendations) {
        const recommendationsSection = cropModal.querySelector('.recommendations-section');
        
        // Clear existing recommendations (keep title)
        const existingRecs = recommendationsSection.querySelectorAll('.recommendation-item');
        existingRecs.forEach(rec => rec.remove());
        
        if (recommendations.length === 0) {
            const noRecs = document.createElement('p');
            noRecs.className = 'no-recommendations';
            noRecs.textContent = 'Your crops look healthy! Continue with regular care and monitoring.';
            recommendationsSection.appendChild(noRecs);
            return;
        }
        
        recommendations.forEach(rec => {
            const recElement = document.createElement('div');
            recElement.className = `recommendation-item ${getUrgencyClass(rec.urgency)}`;
            
            const detailsHtml = rec.details ? rec.details.map(detail => 
                `<div class="rec-detail">
                    <i class="fas fa-check"></i>
                    <span>${detail}</span>
                </div>`
            ).join('') : '';
            
            recElement.innerHTML = `
                <div class="rec-icon">
                    <i class="${getRecommendationIcon(rec.urgency)}"></i>
                </div>
                <div class="rec-content">
                    <h4>${rec.title}</h4>
                    <p>${rec.description}</p>
                    <div class="rec-details">
                        <div class="rec-detail">
                            <i class="fas fa-clock"></i>
                            <span>${rec.timeframe}</span>
                        </div>
                        ${detailsHtml}
                    </div>
                </div>
            `;
            
            recommendationsSection.appendChild(recElement);
        });
    }
    
    function showResultSections() {
        const sections = cropModal.querySelectorAll('.crop-results-section, .image-analysis, .recommendations-section');
        sections.forEach((section, index) => {
            section.style.display = 'block';
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                section.style.transition = 'all 0.5s ease';
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }
    
    function hideResultSections() {
        const sections = cropModal.querySelectorAll('.crop-results-section, .image-analysis, .recommendations-section');
        sections.forEach(section => {
            section.style.display = 'none';
        });
    }
    
    function showAnalysisError(message) {
        const errorOverlay = document.createElement('div');
        errorOverlay.className = 'analysis-error-overlay';
        errorOverlay.innerHTML = `
            <div class="error-content">
                <i class="fas fa-exclamation-circle"></i>
                <h3>Analysis Failed</h3>
                <p>${message}</p>
                <button class="error-retry-btn" onclick="this.closest('.analysis-error-overlay').remove()">
                    Try Again
                </button>
            </div>
        `;
        
        cropModal.querySelector('.crop-modal-body').appendChild(errorOverlay);
        
        setTimeout(() => {
            if (errorOverlay.parentElement) {
                errorOverlay.remove();
            }
        }, 10000);
    }
    
    function removeOverlays() {
        const overlays = cropModal.querySelectorAll('.analysis-loading-overlay, .analysis-error-overlay');
        overlays.forEach(overlay => overlay.remove());
    }
    
    // Helper functions
    function getSeverityClass(severity) {
        const classes = {
            'high': 'critical',
            'medium': 'warning',
            'low': 'resolved'
        };
        return classes[severity] || '';
    }
    
    function getIssueIcon(type, severity) {
        if (severity === 'low') return 'fas fa-check-circle';
        
        const icons = {
            'disease': 'fas fa-virus',
            'pest': 'fas fa-bug',
            'nutrient': 'fas fa-leaf',
            'environmental': 'fas fa-thermometer-half'
        };
        return icons[type] || 'fas fa-exclamation-triangle';
    }
    
    function getUrgencyClass(urgency) {
        const classes = {
            'high': 'urgent',
            'medium': '',
            'low': 'low-priority'
        };
        return classes[urgency] || '';
    }
    
    function getRecommendationIcon(urgency) {
        const icons = {
            'high': 'fas fa-exclamation-triangle',
            'medium': 'fas fa-info-circle',
            'low': 'fas fa-lightbulb'
        };
        return icons[urgency] || 'fas fa-clipboard-list';
    }
});