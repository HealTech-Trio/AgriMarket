// Login and Registration Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Toggle Password Visibility
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            this.classList.toggle('fa-eye-slash');
        });
    });

    // Forgot Password Flow
    const forgotPasswordLink = document.getElementById('forgot-password-link');
    const loginForm = document.getElementById('login-form');
    const forgotForm = document.getElementById('forgot-form');
    const cancelReset = document.getElementById('cancel-reset');
    
    if (forgotPasswordLink && loginForm && forgotForm && cancelReset) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            loginForm.classList.remove('active');
            forgotForm.classList.add('active');
            // Set the email from login form to reset form if available
            const email = document.getElementById('email').value;
            if (email) {
                document.getElementById('reset-email').value = email;
                document.querySelector('.user-email').textContent = email;
            }
        });
        
        cancelReset.addEventListener('click', function() {
            forgotForm.classList.remove('active');
            loginForm.classList.add('active');
        });
    }

    // Password Reset Steps
    const nextStep1 = document.getElementById('next-step-1');
    const nextStep2 = document.getElementById('next-step-2');
    const backStep2 = document.getElementById('back-step-2');
    const backStep3 = document.getElementById('back-step-3');
    
    if (nextStep1) {
        nextStep1.addEventListener('click', function() {
            goToStep(2);
            // Update the email display in OTP step
            const email = document.getElementById('reset-email').value;
            document.querySelector('.user-email').textContent = email;
        });
    }
    
    if (nextStep2) {
        nextStep2.addEventListener('click', function() {
            goToStep(3);
        });
    }
    
    if (backStep2) {
        backStep2.addEventListener('click', function() {
            goToStep(1);
        });
    }
    
    if (backStep3) {
        backStep3.addEventListener('click', function() {
            goToStep(2);
        });
    }
    
    function goToStep(step) {
        document.querySelectorAll('.step-content').forEach(content => {
            content.classList.remove('active');
        });
        document.querySelector(`.step-content[data-step="${step}"]`).classList.add('active');
        
        document.querySelectorAll('.step').forEach(stepEl => {
            stepEl.classList.remove('active');
        });
        document.querySelector(`.step[data-step="${step}"]`).classList.add('active');
    }

    // Role Selection
    const roleCards = document.querySelectorAll('.role-card');
    const farmerRegistration = document.getElementById('farmer-registration');
    const buyerRegistration = document.getElementById('buyer-registration');
    const roleSelection = document.getElementById('role-selection');
    const backToRoleFarmer = document.getElementById('back-to-role-farmer');
    const backToRoleBuyer = document.getElementById('back-to-role-buyer');
    
    roleCards.forEach(card => {
        card.addEventListener('click', function() {
            const role = this.getAttribute('data-role');
            roleSelection.classList.remove('active');
            
            if (role === 'farmer') {
                farmerRegistration.classList.add('active');
            } else {
                buyerRegistration.classList.add('active');
            }
        });
    });
    
    if (backToRoleFarmer) {
        backToRoleFarmer.addEventListener('click', function() {
            farmerRegistration.classList.remove('active');
            roleSelection.classList.add('active');
        });
    }
    
    if (backToRoleBuyer) {
        backToRoleBuyer.addEventListener('click', function() {
            buyerRegistration.classList.remove('active');
            roleSelection.classList.add('active');
        });
    }

    // Farmer Registration Steps
    const nextFarmerStep1 = document.getElementById('next-farmer-step-1');
    const nextFarmerStep2 = document.getElementById('next-farmer-step-2');
    const backFarmerStep2 = document.getElementById('back-farmer-step-2');
    const backFarmerStep3 = document.getElementById('back-farmer-step-3');
    
    if (nextFarmerStep1) {
        nextFarmerStep1.addEventListener('click', function() {
            goToFarmerStep(2);
        });
    }
    
    if (nextFarmerStep2) {
        nextFarmerStep2.addEventListener('click', function() {
            goToFarmerStep(3);
        });
    }
    
    if (backFarmerStep2) {
        backFarmerStep2.addEventListener('click', function() {
            goToFarmerStep(1);
        });
    }
    
    if (backFarmerStep3) {
        backFarmerStep3.addEventListener('click', function() {
            goToFarmerStep(2);
        });
    }
    
    function goToFarmerStep(step) {
        document.querySelectorAll('.register-form.step-content').forEach(content => {
            content.classList.remove('active');
        });
        document.querySelector(`.register-form.step-content[data-step="${step}"]`).classList.add('active');
        
        document.querySelectorAll('.farmer-registration .step').forEach(stepEl => {
            stepEl.classList.remove('active');
        });
        document.querySelector(`.farmer-registration .step[data-step="${step}"]`).classList.add('active');
    }

    // Buyer Registration Steps
    const nextBuyerStep1 = document.getElementById('next-buyer-step-1');
    const backBuyerStep2 = document.getElementById('back-buyer-step-2');
    
    if (nextBuyerStep1) {
        nextBuyerStep1.addEventListener('click', function() {
            goToBuyerStep(2);
        });
    }
    
    if (backBuyerStep2) {
        backBuyerStep2.addEventListener('click', function() {
            goToBuyerStep(1);
        });
    }
    
    function goToBuyerStep(step) {
        document.querySelectorAll('.register-form.step-content').forEach(content => {
            content.classList.remove('active');
        });
        document.querySelector(`.register-form.step-content[data-step="${step}"]`).classList.add('active');
        
        document.querySelectorAll('.buyer-registration .step').forEach(stepEl => {
            stepEl.classList.remove('active');
        });
        document.querySelector(`.buyer-registration .step[data-step="${step}"]`).classList.add('active');
    }

    // File Upload Display
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => {
        input.addEventListener('change', function() {
            const fileName = this.files[0] ? this.files[0].name : 'No file chosen';
            const fileSize = this.files[0] ? formatFileSize(this.files[0].size) : '';
            
            const container = this.closest('.file-upload');
            const nameElement = container.querySelector('.file-name');
            const sizeElement = container.querySelector('.file-size');
            
            nameElement.textContent = fileName;
            sizeElement.textContent = fileSize;
        });
    });
    
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    }

    // Password Strength Checker
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    passwordInputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.id.includes('password') && !this.id.includes('confirm')) {
                checkPasswordStrength(this);
            }
        });
    });
    
    function checkPasswordStrength(input) {
        const password = input.value;
        const container = input.closest('.input-group');
        const meter = container.querySelector('.strength-meter');
        const text = container.querySelector('.strength-text');
        const bars = container.querySelectorAll('.strength-bar');
        const requirements = container.querySelectorAll('.password-requirements li');
        
        // Reset all
        bars.forEach(bar => bar.style.backgroundColor = '');
        requirements.forEach(req => req.classList.remove('valid'));
        
        if (!password) {
            text.textContent = '';
            return;
        }
        
        // Check requirements
        const hasLength = password.length >= 8;
        const hasUpper = /[A-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        
        if (hasLength) {
            container.querySelector('.req-length').classList.add('valid');
        }
        if (hasUpper) {
            container.querySelector('.req-uppercase').classList.add('valid');
        }
        if (hasNumber) {
            container.querySelector('.req-number').classList.add('valid');
        }
        if (hasSpecial) {
            container.querySelector('.req-special').classList.add('valid');
        }
        
        // Determine strength
        let strength = 0;
        if (password.length > 0) strength += 1;
        if (password.length >= 8) strength += 1;
        if (hasUpper && hasNumber) strength += 1;
        if (hasUpper && hasNumber && hasSpecial) strength += 1;
        
        // Update UI
        if (strength === 0) {
            text.textContent = '';
        } else if (strength <= 2) {
            text.textContent = 'Weak';
            bars[0].style.backgroundColor = "var(--danger-color)";
            bars[0].classList.add('weak');
        } else if (strength === 3) {
            text.textContent = 'Medium';
            bars[0].style.backgroundColor = "var(--warning-color)";
            bars[1].style.backgroundColor = "var(--warning-color)";
        } else {
            text.textContent = 'Strong';
            bars[0].style.backgroundColor = "var(--success-color)";
            bars[1].style.backgroundColor = "var(--success-color)";
            bars[2].style.backgroundColor = "var(--success-color)";
        }
    }

    // OTP Input Auto Focus
    const otpInputs = document.querySelectorAll('.otp-inputs input');
    otpInputs.forEach((input, index) => {
        input.addEventListener('input', function() {
            if (this.value.length === 1 && index < otpInputs.length - 1) {
                otpInputs[index + 1].focus();
            }
        });
        
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && this.value.length === 0 && index > 0) {
                otpInputs[index - 1].focus();
            }
        });
    });
});