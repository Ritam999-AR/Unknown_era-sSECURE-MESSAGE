document.addEventListener('DOMContentLoaded', function() {
    // Check for signup success message
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('signup') === 'success') {
        showMessage('Account created successfully! Please login.', 'success');
    }
    
    // Check for password reset success
    if (urlParams.get('reset') === 'success') {
        showMessage('Password reset successful! Please login with your new password.', 'success');
    }
});

function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('message');
    
    if (!email || !password) {
        showError('Please enter both email and password');
        return;
    }

    try {
        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem('users')) || {};
        
        // Check if email exists
        if (!users[email]) {
            showError('No account found with this email');
            return;
        }
        
        // Check if password matches
        if (users[email].password !== password) {
            showError('Incorrect password');
            
            // Shake animation for error
            const form = document.querySelector('form');
            form.style.animation = 'shake 0.5s';
            setTimeout(() => form.style.animation = '', 500);
            return;
        }
        
        // Login successful
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userName', users[email].username);
        
        // Redirect to main page with animation
        const container = document.querySelector('.login-container');
        container.style.transform = 'scale(0.95)';
        container.style.opacity = '0';
        setTimeout(() => {
            window.location.href = 'main.html';
        }, 300);
        
    } catch (error) {
        showError('An error occurred. Please try again.');
    }
}

function showError(message) {
    const errorDiv = document.getElementById('message');
    errorDiv.textContent = message;
    errorDiv.className = 'error-message';
    errorDiv.style.display = 'block';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        errorDiv.style.opacity = '0';
        setTimeout(() => {
            errorDiv.style.display = 'none';
            errorDiv.style.opacity = '1';
        }, 500);
    }, 5000);
}

function showMessage(message, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    messageDiv.className = type === 'success' ? 'success-message' : 'error-message';
    messageDiv.style.display = 'block';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        setTimeout(() => {
            messageDiv.style.display = 'none';
            messageDiv.style.opacity = '1';
        }, 500);
    }, 5000);
    
    // Remove query params from URL
    history.replaceState(null, document.title, location.pathname);
}

function goToForgotPassword() {
    window.location.href = 'reset-password.html';
}
