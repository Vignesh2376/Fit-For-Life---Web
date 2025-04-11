// User management functionality
const UserManagement = {
    // Check if user is logged in
    isLoggedIn() {
        return localStorage.getItem('userData') !== null;
    },

    // Get current user data
    getCurrentUser() {
        const userData = localStorage.getItem('userData');
        return userData ? JSON.parse(userData) : null;
    },

    // Get all users
    getAllUsers() {
        const allUsers = localStorage.getItem('allUsers');
        return allUsers ? JSON.parse(allUsers) : {};
    },

    // Save user data
    saveUserData(userData) {
        localStorage.setItem('userData', JSON.stringify(userData));
        
        // Save to allUsers
        const allUsers = this.getAllUsers();
        allUsers[userData.username] = userData;
        localStorage.setItem('allUsers', JSON.stringify(allUsers));
    },

    // Logout user
    logout() {
        localStorage.removeItem('userData');
        window.location.href = 'index.html';
    },

    // Check and redirect if logged in
    checkLoginStatus() {
        const currentPath = window.location.pathname;
        // Only redirect if we're on the index page
        if (currentPath.endsWith('index.html') || currentPath === '/' || currentPath === '') {
            if (this.isLoggedIn()) {
                const userData = this.getCurrentUser();
                if (!userData) return;
                
                // If user has completed setup, go directly to workout plan
                if (userData.completedSetup) {
                    window.location.href = 'workout-plan.html';
                } else if (userData.dob && !userData.bodyType) {
                    window.location.href = 'body-type.html';
                } else if (!userData.dob) {
                    window.location.href = 'user-details.html';
                }
            }
        }
    }
};

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check login status when page loads
    UserManagement.checkLoginStatus();

    // Only run login/signup related code if we're on the login page
    const isLoginPage = window.location.pathname.endsWith('index.html') || 
                       window.location.pathname === '/' || 
                       window.location.pathname === '';

    if (isLoginPage) {
        // Get form elements
        const loginForm = document.querySelector('.login-form');
        const signupForm = document.querySelector('.signup-form');
        const switchFormLinks = document.querySelectorAll('.switch-form');
        
        // Handle form switching
        if (switchFormLinks) {
            switchFormLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const formToShow = this.getAttribute('data-form');
                    
                    if (formToShow === 'signup') {
                        loginForm.classList.remove('active-form');
                        signupForm.classList.add('active-form');
                    } else {
                        signupForm.classList.remove('active-form');
                        loginForm.classList.add('active-form');
                    }
                });
            });
        }
        
        // Handle login form submission
        if (loginForm) {
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const username = this.querySelector('input[type="text"]').value;
                const password = this.querySelector('input[type="password"]').value;
                
                if (username && password) {
                    // Create new user data for login
                    const userData = {
                        username: username,
                        name: username,
                        lastLogin: new Date().toISOString(),
                        completedSetup: false
                    };

                    // Save user data
                    UserManagement.saveUserData(userData);

                    // Always redirect to user details page on login
                    window.location.href = 'user-details.html';
                } else {
                    alert('Please enter both username and password');
                }
            });
        }
        
        // Handle signup form submission
        if (signupForm) {
            signupForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const fullName = this.querySelector('input[type="text"]').value;
                const email = this.querySelector('input[type="email"]').value;
                const password = this.querySelectorAll('input[type="password"]')[0].value;
                const confirmPassword = this.querySelectorAll('input[type="password"]')[1].value;
                
                // Basic validation
                if (!fullName || !email || !password || !confirmPassword) {
                    alert('Please fill in all fields');
                    return;
                }

                if (password !== confirmPassword) {
                    alert('Passwords do not match!');
                    return;
                }

                if (password.length < 6) {
                    alert('Password must be at least 6 characters long');
                    return;
                }
                
                // Create user data
                const userData = {
                    username: email.split('@')[0],
                    name: fullName,
                    email: email,
                    lastLogin: new Date().toISOString(),
                    completedSetup: false
                };

                // Save user data
                UserManagement.saveUserData(userData);

                // Redirect to user details page
                window.location.href = 'user-details.html';
            });
        }

        // Add some animation to the images on hover (only on login page)
        const images = document.querySelectorAll('.image-gallery img');
        if (images.length > 0) {
            images.forEach(img => {
                img.addEventListener('mouseenter', function() {
                    this.style.transform = 'scale(1.05)';
                });
                
                img.addEventListener('mouseleave', function() {
                    this.style.transform = 'scale(1)';
                });
            });
        }
    }
}); 