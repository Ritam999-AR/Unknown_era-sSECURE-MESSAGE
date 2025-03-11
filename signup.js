function handleSignup(event) {
    event.preventDefault();
    const errorDiv = document.getElementById('error');
    
    // Get form values
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const securityQuestion1 = document.getElementById('securityQuestion1').value;
    const securityAnswer1 = document.getElementById('securityAnswer1').value.trim();
    const securityQuestion2 = document.getElementById('securityQuestion2').value;
    const securityAnswer2 = document.getElementById('securityAnswer2').value.trim();

    // Validate inputs
    if (!username || !email || !password || !confirmPassword || 
        !securityQuestion1 || !securityAnswer1 || !securityQuestion2 || !securityAnswer2) {
        showError('Please fill in all fields');
        return;
    }

    if (password !== confirmPassword) {
        showError('Passwords do not match');
        return;
    }

    if (password.length < 6) {
        showError('Password must be at least 6 characters long');
        return;
    }

    if (securityQuestion1 === securityQuestion2) {
        showError('Please select different security questions');
        return;
    }

    // Get existing users or create new users object
    const users = JSON.parse(localStorage.getItem('users')) || {};

    // Check if email already exists
    if (users[email]) {
        showError('Email already registered');
        return;
    }

    // Save user data
    users[email] = {
        username,
        password,
        securityQuestion1,
        securityAnswer1,
        securityQuestion2,
        securityAnswer2,
        createdAt: new Date().toISOString()
    };

    try {
        localStorage.setItem('users', JSON.stringify(users));
        window.location.href = 'login.html?signup=success';
    } catch (error) {
        showError('Error creating account. Please try again.');
    }
}

function showError(message) {
    const errorDiv = document.getElementById('error');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
}

function togglePasswordVisibility(inputId) {
    const passwordInput = document.getElementById(inputId);
    const toggleButton = passwordInput.nextElementSibling;
    const icon = toggleButton.querySelector('.password-icon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.textContent = '🔓';
    } else {
        passwordInput.type = 'password';
        icon.textContent = '👁️';
    }
    
    // Add focus back to password input
    passwordInput.focus();
}
