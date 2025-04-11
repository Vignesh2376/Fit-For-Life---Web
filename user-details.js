document.addEventListener('DOMContentLoaded', function() {
    // Get current user data first
    const userData = UserManagement.getCurrentUser();
    
    // Check if user is logged in and has completed previous steps
    if (!UserManagement.isLoggedIn() || !userData) {
        window.location.replace('index.html');
        return;
    }

    // Display user's name
    if (userData.name) {
        document.getElementById('userName').textContent = `Welcome, ${userData.name}`;
    }

    // Get the form element
    const userDetailsForm = document.getElementById('userDetailsForm');

    // Handle form submission
    userDetailsForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = {
            dob: document.getElementById('dob').value,
            weight: document.getElementById('weight').value,
            height: document.getElementById('height').value,
            bodyFat: document.getElementById('bodyFat').value,
            lastGym: document.getElementById('lastGym').value,
            fitnessGoal: document.getElementById('fitnessGoal').value
        };

        // Update user data with form data
        const updatedUserData = {
            ...userData,
            ...formData
        };

        // Save updated user data
        UserManagement.saveUserData(updatedUserData);

        // Redirect to body type selection
        window.location.replace('body-type.html');
    });

    // Set maximum date for DOB to today
    const dobInput = document.getElementById('dob');
    const today = new Date().toISOString().split('T')[0];
    dobInput.max = today;
}); 