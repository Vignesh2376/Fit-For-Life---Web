import apiRequest from './api.js';

document.addEventListener('DOMContentLoaded', async function() {
    if (!localStorage.getItem('access')) {
        window.location.href = 'index.html';
        return;
    }

    const userNameElement = document.getElementById('userName');
    const userForm = document.getElementById('userDetailsForm');

    // Fetch user profile and populate form
    let userData = null;
    try {
        userData = await apiRequest('accounts/profile/');
        if (userData && userNameElement) {
            userNameElement.textContent = `Welcome, ${userData.first_name || userData.username}`;
        }
        loadUserData(userData);
    } catch (err) {
        showMessage('Session expired. Please login again.', 'error');
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        setTimeout(() => window.location.href = 'index.html', 1500);
        return;
    }

    // Set max date for DOB (18 years ago from today)
    const dobInput = document.getElementById('dob');
    if (dobInput) {
        const today = new Date();
        const year = today.getFullYear() - 18;
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        dobInput.max = `${year}-${month}-${day}`;
    }

    userForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const userDetails = {
            date_of_birth: document.getElementById('dob').value,
            weight: parseFloat(document.getElementById('weight').value),
            height: parseFloat(document.getElementById('height').value),
            body_fat_percentage: document.getElementById('bodyFat').value ? parseFloat(document.getElementById('bodyFat').value) : null,
            last_gym_visit: document.getElementById('lastGym').value,
            fitness_goal: document.getElementById('fitnessGoal').value
        };
        
        // Save user details to localStorage for diet plan access
        const storedUserDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
        Object.assign(storedUserDetails, userDetails);
        localStorage.setItem('userDetails', JSON.stringify(storedUserDetails));
        
        try {
            await apiRequest('accounts/profile/', 'PUT', userDetails);
            showMessage('Profile updated successfully!', 'success');
            setTimeout(() => {
                window.location.href = 'body-type.html';
            }, 1000);
        } catch (err) {
            showMessage(err.detail || err.message || 'Failed to update profile', 'error');
        }
    });

    function loadUserData(userData) {
        if (!userData) return;
        if (userData.date_of_birth) document.getElementById('dob').value = userData.date_of_birth;
        if (userData.weight) document.getElementById('weight').value = userData.weight;
        if (userData.height) document.getElementById('height').value = userData.height;
        if (userData.body_fat_percentage) document.getElementById('bodyFat').value = userData.body_fat_percentage;
        if (userData.last_gym_visit) document.getElementById('lastGym').value = userData.last_gym_visit;
        if (userData.fitness_goal) document.getElementById('fitnessGoal').value = userData.fitness_goal;
    }
});

function showMessage(message, type = 'info') {
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        max-width: 300px;
        word-wrap: break-word;
    `;
    switch(type) {
        case 'success':
            messageDiv.style.backgroundColor = '#4CAF50';
            break;
        case 'error':
            messageDiv.style.backgroundColor = '#f44336';
            break;
        case 'warning':
            messageDiv.style.backgroundColor = '#ff9800';
            break;
        default:
            messageDiv.style.backgroundColor = '#2196F3';
    }
    document.body.appendChild(messageDiv);
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.remove();
                }
            }, 300);
        }
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style); 