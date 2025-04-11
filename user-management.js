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

    // Save user data
    saveUserData(userData) {
        localStorage.setItem('userData', JSON.stringify(userData));
    },

    // Logout user
    logout() {
        localStorage.removeItem('userData');
        window.location.replace('index.html');
    },

    // Check and redirect if logged in
    checkLoginStatus() {
        // Only check on index page
        if (window.location.pathname.endsWith('index.html') || 
            window.location.pathname === '/' || 
            window.location.pathname === '') {
            
            const userData = this.getCurrentUser();
            if (this.isLoggedIn() && userData) {
                if (userData.completedSetup && userData.bodyType) {
                    window.location.replace('workout-plan.html');
                } else if (userData.dob && !userData.bodyType) {
                    window.location.replace('body-type.html');
                } else {
                    window.location.replace('user-details.html');
                }
            }
        }
    }
};

// Export for use in other files
window.UserManagement = UserManagement; 