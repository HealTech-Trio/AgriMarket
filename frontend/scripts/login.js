document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const loginForm = document.getElementById('login-form');
    const forgotForm = document.getElementById('forgot-form');
    const forgotPasswordLink = document.getElementById('forgot-password-link');
    const cancelResetBtn = document.getElementById('cancel-reset');
    
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
    
    // Forgot Password Link
    forgotPasswordLink.addEventListener('click', function(e) {
        e.preventDefault();
        loginForm.classList.remove('active');
        forgotForm.classList.add('active');
        showStep('forgot', 1);
    });
    
    // Cancel Reset Button
    cancelResetBtn.addEventListener('click', function() {
        forgotForm.classList.remove('active');
        loginForm.classList.add('active');
    });
    
    // Forgot Password Steps Navigation
    document.getElementById('next-step-1').addEventListener('click', function() {
        if (validateForgotStep1()) {
            showStep('forgot', 2);
            const email = document.getElementById('reset-email').value;
            document.querySelector('.user-email').textContent = email;
            startOTPTimer();
        }
    });
    
    document.getElementById('back-step-2').addEventListener('click', function() {
        showStep('forgot', 1);
    });
    
    document.getElementById('next-step-2').addEventListener('click', function() {
        if (validateForgotStep2()) {
            showStep('forgot', 3);
        }
    });
    
    document.getElementById('back-step-3').addEventListener('click', function() {
        showStep('forgot', 2);
    });
    
    // OTP Input Handling
    const otpInputs = document.querySelectorAll('.otp-inputs input');
    otpInputs.forEach((input, index) => {
        input.addEventListener('input', function() {
            if (this.value.length === 1) {
                if (index < otpInputs.length - 1) {
                    otpInputs[index + 1].focus();
                }
            }
        });
        
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && this.value.length === 0) {
                if (index > 0) {
                    otpInputs[index - 1].focus();
                }
            }
        });
    });
    
    // Resend OTP Link
    document.querySelector('.resend-otp').addEventListener('click', function(e) {
        e.preventDefault();
        startOTPTimer();
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
    
    // Helper Functions
    function showStep(formType, stepNumber) {
        const steps = document.querySelectorAll(`#${formType}-form .step-content`);
        steps.forEach(step => {
            step.classList.remove('active');
        });
        
        // Show the selected step
        document.querySelector(`#${formType}-form .step-content[data-step="${stepNumber}"]`).classList.add('active');
        
        // Update progress steps
        const progressSteps = document.querySelectorAll(`#${formType}-form .step`);
        progressSteps.forEach(step => {
            step.classList.remove('active', 'completed');
            
            const stepValue = parseInt(step.getAttribute('data-step'));
            if (stepValue < stepNumber) {
                step.classList.add('completed');
            } else if (stepValue === stepNumber) {
                step.classList.add('active');
            }
        });
        
        // Scroll to top of form
        document.querySelector(`#${formType}-form`).scrollTo(0, 0);
    }
    
    function validateForgotStep1() {
        const email = document.getElementById('reset-email');
        if (!email.value.trim()) {
            email.style.borderColor = '#ff6b6b';
            return false;
        }
        email.style.borderColor = '#e3f2fd';
        return true;
    }
    
    function validateForgotStep2() {
        let isValid = true;
        const otpInputs = document.querySelectorAll('.otp-inputs input');
        
        otpInputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = '#ff6b6b';
                isValid = false;
            } else {
                input.style.borderColor = '#e3f2fd';
            }
        });
        
        return isValid;
    }
    
    function startOTPTimer() {
        let timeLeft = 120;
        const timerElement = document.querySelector('.timer');
        const resendLink = document.querySelector('.resend-otp');
        
        resendLink.style.display = 'none';
        
        const timer = setInterval(() => {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            
            timerElement.textContent = `(${minutes}:${seconds < 10 ? '0' : ''}${seconds})`;
            
            if (timeLeft <= 0) {
                clearInterval(timer);
                timerElement.textContent = '';
                resendLink.style.display = 'inline';
            }
            
            timeLeft--;
        }, 1000);
    }
    
    function checkPasswordStrength(input) {
        const password = input.value;
        const strengthMeter = input.closest('.input-group').querySelector('.strength-meter');
        const strengthText = input.closest('.input-group').querySelector('.strength-text');
        const bars = strengthMeter.querySelectorAll('.strength-bar');
        
        // Reset all
        bars.forEach(bar => bar.style.backgroundColor = '#ddd');
        strengthText.textContent = 'Weak';
        strengthText.style.color = '#666';
        
        // Check strength
        let strength = 0;
        
        // Length requirement
        if (password.length >= 8) strength++;
        
        // Uppercase requirement
        if (/[A-Z]/.test(password)) strength++;
        
        // Number requirement
        if (/[0-9]/.test(password)) strength++;
        
        // Special char requirement
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        
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

// Form submission for login check
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector(".login-form");

    loginForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const formData = new FormData(loginForm);
        const email = formData.get("email");
        const password = formData.get("password");

        fetch("http://localhost/AgriMarket/backend/logins/login.php", {
            method: "POST",
            body: new URLSearchParams({
                email,
                password
            })
        })
        .then(res => res.json())
        .then(data => {
            alert(data.message);
            if (data.success && data.redirect) {
                window.location.href = data.redirect;
            }
        })
        .catch(err => {
            alert("Something went wrong.");
            console.error(err);
        });
    });
});
