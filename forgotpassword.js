function verifyEmail() {
    const email = document.getElementById('email').value.trim();
    const errorDiv = document.getElementById('emailError');
    const users = JSON.parse(localStorage.getItem('users')) || {};
    
    if (!email) {
        showError(errorDiv, 'Please enter your email address');
        return;
    }

    if (!users[email]) {
        showError(errorDiv, 'No account found with this email');
        return;
    }

    // Email exists, show security questions
    const user = users[email];
    const questionsDiv = document.getElementById('securityQuestions');
    questionsDiv.innerHTML = `
        <div class="form-group">
            <input type="text" id="question1" value="${user.securityQuestion1}" readonly>
            <input type="text" id="answer1" placeholder="Your answer" required>
        </div>
        <div class="form-group">
            <input type="text" id="question2" value="${user.securityQuestion2}" readonly>
            <input type="text" id="answer2" placeholder="Your answer" required>
        </div>
    `;
    
    localStorage.setItem('resetEmail', email);
    showStep('step2');
}

function verifyAnswers() {
    const email = localStorage.getItem('resetEmail');
    const users = JSON.parse(localStorage.getItem('users')) || {};
    const user = users[email];
    const answer1 = document.getElementById('answer1').value.trim();
    const answer2 = document.getElementById('answer2').value.trim();
    const errorDiv = document.getElementById('answersError');

    if (!answer1 || !answer2) {
        showError(errorDiv, 'Please answer both security questions');
        return;
    }

    if (answer1.toLowerCase() === user.securityAnswer1.toLowerCase() && 
        answer2.toLowerCase() === user.securityAnswer2.toLowerCase()) {
        showStep('step3');
    } else {
        showError(errorDiv, 'Incorrect answers. Please try again');
    }
}

function resetPassword() {
    const email = localStorage.getItem('resetEmail');
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errorDiv = document.getElementById('passwordError');
    const successDiv = document.getElementById('passwordSuccess');

    if (!newPassword || !confirmPassword) {
        showError(errorDiv, 'Please fill in both password fields');
        return;
    }

    if (newPassword !== confirmPassword) {
        showError(errorDiv, 'Passwords do not match');
        return;
    }

    if (newPassword.length < 6) {
        showError(errorDiv, 'Password must be at least 6 characters long');
        return;
    }

    // Update password in localStorage
    const users = JSON.parse(localStorage.getItem('users')) || {};
    users[email].password = newPassword;
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.removeItem('resetEmail');

    // Show success message and redirect
    successDiv.textContent = 'Password reset successful! Redirecting to login...';
    successDiv.style.display = 'block';
    setTimeout(() => {
        window.location.href = 'login.html?reset=success';
    }, 2000);
}

function showError(element, message) {
    element.textContent = message;
    element.style.display = 'block';
}

function showStep(stepId) {
    document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('active');
    });
    document.getElementById(stepId).classList.add('active');
}
