document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const roleSelection = document.getElementById('role-selection');
    const farmerRegistration = document.getElementById('farmer-registration');
    const buyerRegistration = document.getElementById('buyer-registration');
    const roleCards = document.querySelectorAll('.role-card');
    
    // Role Selection
    roleCards.forEach(card => {
        card.addEventListener('click', function() {
            roleCards.forEach(c => c.classList.remove('selected'));
            
            this.classList.add('selected');
            
            const role = this.getAttribute('data-role');
            roleSelection.classList.remove('active');
            
            if (role === 'farmer') {
                farmerRegistration.classList.add('active');
                showStep('farmer', 1);
            } else {
                buyerRegistration.classList.add('active');
                showStep('buyer', 1);
            }
        });
    });
    
    // Back buttons
    document.getElementById('back-to-role-farmer').addEventListener('click', function() {
        farmerRegistration.classList.remove('active');
        roleSelection.classList.add('active');
    });
    
    document.getElementById('back-to-role-buyer').addEventListener('click', function() {
        buyerRegistration.classList.remove('active');
        roleSelection.classList.add('active');
    });
    
    // Farmer Steps Navigation
    document.getElementById('next-farmer-step-1').addEventListener('click', function() {
        if (validateFarmerStep1()) {
            showStep('farmer', 2);
        }
    });
    
    document.getElementById('back-farmer-step-2').addEventListener('click', function() {
        showStep('farmer', 1);
    });
    
    document.getElementById('next-farmer-step-2').addEventListener('click', function() {
        if (validateFarmerStep2()) {
            showStep('farmer', 3);
        }
    });
    
    document.getElementById('back-farmer-step-3').addEventListener('click', function() {
        showStep('farmer', 2);
    });
    
    // Buyer Steps Navigation
    document.getElementById('next-buyer-step-1').addEventListener('click', function() {
        if (validateBuyerStep1()) {
            showStep('buyer', 2);
        }
    });
    
    document.getElementById('back-buyer-step-2').addEventListener('click', function() {
        showStep('buyer', 1);
    });
    
    // File Upload
    const fileInput = document.getElementById('farm-document');
    if (fileInput) {
        fileInput.addEventListener('change', function() {
            const fileNameElement = document.querySelector('.file-name');
            const fileSizeElement = document.querySelector('.file-size');
            
            if (this.files.length > 0) {
                const file = this.files[0];
                fileNameElement.textContent = file.name;
                fileSizeElement.textContent = formatFileSize(file.size);
            }
        });
    }

    // Password Toggle
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            this.classList.toggle('fa-eye-slash');
        });
    });
    
    // Password Strength Check
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    passwordInputs.forEach(input => {
        if (input.id.includes('password') && !input.id.includes('confirm')) {
            input.addEventListener('input', function() {
                checkPasswordStrength(this);
            });
        }
    });
    
    // Buyer registration
    document.querySelector("#buyer-registration form[data-step='2']").addEventListener("submit", function(e) {
        e.preventDefault();

        const data = {
            name: document.getElementById("buyer-name").value,
            email: document.getElementById("buyer-email").value,
            phone: document.getElementById("buyer-phone").value,
            province: document.getElementById("buyer-province").value,
            category: document.getElementById("buyer-category").value,
            password: document.getElementById("buyer-password").value,
        };

        fetch("http://localhost/AgriMarket/backend/logins/buyer-register.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(result => {
            if (result.success) {
                alert("Registration successful!");
                window.location.href = "login.html";
            } else {
                alert(result.message);
            }
        })
        .catch(err => {
            alert("Something went wrong.");
            console.error(err);
        });
    });

    // Farmer registration
    const form = document.querySelector("#farmer-registration form[data-step='3']");
    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const formData = new FormData();

        // Collect all values from steps 1, 2, 3
        formData.append("full_name", document.getElementById("farmer-name").value);
        formData.append("email", document.getElementById("farmer-email").value);
        formData.append("phone", document.getElementById("farmer-phone").value);
        formData.append("province", document.getElementById("farmer-province").value);
        formData.append("farm_name", document.getElementById("farm-name").value);
        formData.append("farm_location", document.getElementById("farm-location").value);
        formData.append("id_number", document.getElementById("farm-id").value);
        formData.append("id_document", document.getElementById("farm-document").files[0]);
        formData.append("farm_type", document.getElementById("farm-type").value);
        formData.append("years_in_operation", document.getElementById("farm-years").value);
        formData.append("password", document.getElementById("farmer-password").value);
        formData.append("confirm_password", document.getElementById("farmer-confirm-password").value);

        fetch("http://localhost/AgriMarket/backend/logins/farmer-register.php", {
            method: "POST",
            body: formData
        })
        .then(res => res.json())
        .then(result => {
            alert(result.message);
            if (result.success) window.location.href = "login.html";
        })
        .catch(err => {
            alert("Something went wrong");
            console.error(err);
        });
    });

    function showStep(userType, stepNumber) {
        // Hide all steps for this user type
        const steps = document.querySelectorAll(`#${userType}-registration .step-content`);
        steps.forEach(step => {
            step.classList.remove('active');
        });
        
        // Show the selected step
        document.querySelector(`#${userType}-registration .step-content[data-step="${stepNumber}"]`).classList.add('active');
        
        // Update progress steps
        const progressSteps = document.querySelectorAll(`#${userType}-registration .step`);
        progressSteps.forEach(step => {
            step.classList.remove('active', 'completed');
            
            const stepValue = parseInt(step.getAttribute('data-step'));
            if (stepValue < stepNumber) {
                step.classList.add('completed');
            } else if (stepValue === stepNumber) {
                step.classList.add('active');
            }
        });
        document.querySelectorAll('.checkbox-container input').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const checkmark = this.nextElementSibling;
                if (this.checked) {
                    checkmark.style.backgroundColor = '#3a7bd5';
                    checkmark.style.borderColor = '#3a7bd5';
                } else {
                    checkmark.style.backgroundColor = 'white';
                    checkmark.style.borderColor = '#e3f2fd';
                }
            });
        });
        // Scroll to top of form
        document.querySelector(`#${userType}-registration`).scrollTo(0, 0);
    }
    
    function validateFarmerStep1() {
        const requiredFields = [
            'farmer-name', 'farmer-email', 'farmer-phone', 
            'farmer-province', 'farm-name', 'farm-location'
        ];
        
        let isValid = true;
        
        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (!field.value.trim()) {
                field.style.borderColor = '#ff6b6b';
                isValid = false;
            } else {
                field.style.borderColor = '#e3f2fd';
            }
        });
        
        return isValid;
    }
    
    function validateFarmerStep2() {
        const requiredFields = [
            'farm-id', 'farm-type', 'farm-years'
        ];
        
        let isValid = true;
        
        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (!field.value.trim()) {
                field.style.borderColor = '#ff6b6b';
                isValid = false;
            } else {
                field.style.borderColor = '#e3f2fd';
            }
        });
        
        // Check if file was uploaded
        const fileInput = document.getElementById('farm-document');
        if (fileInput.files.length === 0) {
            document.querySelector('.file-upload').style.borderColor = '#ff6b6b';
            isValid = false;
        } else {
            document.querySelector('.file-upload').style.borderColor = '#e3f2fd';
        }
        
        return isValid;
    }
    
    function validateBuyerStep1() {
        const requiredFields = [
            'buyer-name', 'buyer-email', 'buyer-phone', 
            'buyer-category', 'buyer-province'
        ];
        
        let isValid = true;
        
        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (!field.value.trim()) {
                field.style.borderColor = '#ff6b6b';
                isValid = false;
            } else {
                field.style.borderColor = '#e3f2fd';
            }
        });
        
        return isValid;
    }
    
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    }
    
    function checkPasswordStrength(input) {
        const password = input.value;
        const strengthMeter = input.closest('.input-group').querySelector('.strength-meter');
        const strengthText = input.closest('.input-group').querySelector('.strength-text');
        const bars = strengthMeter.querySelectorAll('.strength-bar');
        const requirements = input.closest('.input-group').querySelectorAll('.password-requirements li');
        
        // Reset all
        bars.forEach(bar => bar.style.backgroundColor = '#ddd');
        requirements.forEach(req => req.classList.remove('valid'));
        strengthText.textContent = 'Weak';
        strengthText.style.color = '#666';
        
        // Check strength
        let strength = 0;
        
        // Length requirement
        if (password.length >= 8) {
            strength++;
            requirements[0].classList.add('valid');
        }
        
        // Uppercase requirement
        if (/[A-Z]/.test(password)) {
            strength++;
            requirements[1].classList.add('valid');
        }
        
        // Number requirement
        if (/[0-9]/.test(password)) {
            strength++;
            requirements[2].classList.add('valid');
        }
        
        // Special char requirement
        if (/[^A-Za-z0-9]/.test(password)) {
            strength++;
            requirements[3].classList.add('valid');
        }
        
        // Update meter
        if (strength > 0) {
            for (let i = 0; i < strength; i++) {
                if (strength < 2) {
                    bars[i].style.backgroundColor = '#ff6b6b';
                    strengthText.textContent = 'Weak';
                    strengthText.style.color = '#ff6b6b';
                } else if (strength < 3) {
                    bars[i].style.backgroundColor = '#ffd93d';
                    strengthText.textContent = 'Medium';
                    strengthText.style.color = '#ffd93d';
                } else {
                    bars[i].style.backgroundColor = '#6bcf7f';
                    strengthText.textContent = 'Strong';
                    strengthText.style.color = '#6bcf7f';
                }
            }
        }
    }
});