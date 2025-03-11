// User data storage and authentication management
class UserAuth {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('users')) || [];
    }

    // Save users to localStorage
    saveUsers() {
        localStorage.setItem('users', JSON.stringify(this.users));
    }

    // Register a new user
    signup(name, email, password) {
        // Check if email already exists
        if (this.users.some(user => user.email === email)) {
            throw new Error('Email already registered');
        }

        // Create new user object
        const user = {
            id: Date.now().toString(),
            name,
            email,
            password, // In a real app, this should be hashed
            createdAt: new Date().toISOString()
        };

        this.users.push(user);
        this.saveUsers();
        return user;
    }

    // Login user
    login(email, password) {
        const user = this.users.find(u => u.email === email && u.password === password);
        if (!user) {
            throw new Error('Invalid email or password');
        }
        return user;
    }

    // Reset password
    resetPassword(email, newPassword) {
        const user = this.users.find(u => u.email === email);
        if (!user) {
            throw new Error('Email not found');
        }
        user.password = newPassword;
        this.saveUsers();
    }

    // Get current user
    getCurrentUser() {
        const userEmail = localStorage.getItem('userEmail');
        return this.users.find(u => u.email === userEmail);
    }

    // Logout user
    logout() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userEmail');
    }
}

// Create global instance
const auth = new UserAuth();
