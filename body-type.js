import apiRequest from './api.js';

document.addEventListener('DOMContentLoaded', async function() {
    if (!localStorage.getItem('access')) {
        window.location.href = 'index.html';
        return;
    }

    let userData = null;
    try {
        userData = await apiRequest('accounts/profile/');
    } catch (err) {
        showMessage('Session expired. Please login again.', 'error');
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        setTimeout(() => window.location.href = 'index.html', 1500);
        return;
    }

    if (!userData || !userData.date_of_birth || !userData.weight || !userData.height) {
        window.location.href = 'user-details.html';
        return;
    }

    const userNameElement = document.getElementById('userName');
    if (userData.first_name && userNameElement) {
        userNameElement.textContent = `Welcome, ${userData.first_name}`;
    }

    const bodyTypeCards = document.querySelectorAll('.body-type-card');
    const continueBtn = document.querySelector('.continue-btn');

    bodyTypeCards.forEach(card => {
        card.addEventListener('click', function() {
            bodyTypeCards.forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            continueBtn.disabled = false;
        });
    });

    continueBtn.addEventListener('click', async function() {
        const selectedCard = document.querySelector('.body-type-card.selected');
        if (!selectedCard) {
            showMessage('Please select a body type', 'error');
            return;
        }

        const bodyType = selectedCard.getAttribute('data-type');
        
        // Save body type to localStorage for diet plan access
        const userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
        userDetails.bodyType = bodyType;
        localStorage.setItem('userDetails', JSON.stringify(userDetails));
        
        try {
            await apiRequest('accounts/profile/', 'PUT', {
                body_type: bodyType,
                completed_setup: true
            });
            showMessage('Body type selected successfully! Redirecting...', 'success');
            setTimeout(() => {
                window.location.href = 'workout-plan.html';
            }, 1000);
        } catch (err) {
            showMessage(err.detail || err.message || 'Failed to save body type', 'error');
        }
    });
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