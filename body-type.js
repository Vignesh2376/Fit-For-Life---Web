document.addEventListener('DOMContentLoaded', function() {
    // Get current user data first
    const userData = UserManagement.getCurrentUser();
    
    // Check if user is logged in and has completed previous steps
    if (!UserManagement.isLoggedIn() || !userData || !userData.dob || !userData.weight || !userData.height) {
        window.location.href = 'index.html';
        return;
    }

    // Display user's name
    if (userData.name) {
        document.getElementById('userName').textContent = `Welcome, ${userData.name}`;
    }

    // Get all body type cards
    const bodyTypeCards = document.querySelectorAll('.body-type-card');
    const continueBtn = document.querySelector('.continue-btn');

    // Handle body type selection
    bodyTypeCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove selection from all cards
            bodyTypeCards.forEach(c => c.classList.remove('selected'));
            // Add selection to clicked card
            this.classList.add('selected');
            // Enable continue button
            continueBtn.disabled = false;
        });
    });

    // Handle continue button click
    continueBtn.addEventListener('click', function() {
        // Get selected body type
        const selectedCard = document.querySelector('.body-type-card.selected');
        if (!selectedCard) return;

        const bodyType = selectedCard.getAttribute('data-type');

        // Update user data with selected body type and mark setup as complete
        const updatedUserData = {
            ...userData,
            bodyType: bodyType,
            completedSetup: true,
            lastLogin: new Date().toISOString()
        };

        // Save updated user data
        UserManagement.saveUserData(updatedUserData);

        // Redirect to workout plan
        window.location.href = 'workout-plan.html';
    });
}); 