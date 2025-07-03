import apiRequest from './api.js';

// Index Page (Login/Signup) Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const switchFormLinks = document.querySelectorAll('.switch-form');
    
    // Redirect if already logged in
    if (localStorage.getItem('access')) {
        window.location.href = 'user-details.html';
        return;
    }
    
    // Handle form switching
    switchFormLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetForm = this.getAttribute('data-form');
            
            if (targetForm === 'signup') {
                loginForm.classList.remove('active-form');
                signupForm.classList.add('active-form');
            } else {
                signupForm.classList.remove('active-form');
                loginForm.classList.add('active-form');
            }
        });
    });
    
    // Login
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const loginInput = this.querySelector('input[name="username"]').value.trim();
        const password = this.querySelector('input[name="password"]').value;
        
        if (!loginInput || !password) {
            showMessage('Please fill in all fields', 'error');
            return;
        }
        
        try {
            const res = await apiRequest('accounts/login/', 'POST', { username: loginInput, password });
            localStorage.setItem('access', res.tokens.access);
            localStorage.setItem('refresh', res.tokens.refresh);
            
            showMessage('Login successful! Redirecting...', 'success');
            setTimeout(() => {
                window.location.href = 'user-details.html';
            }, 1000);
        } catch (err) {
            showMessage(err.detail || err.message || 'Invalid username or password', 'error');
        }
    });
    
    // Signup
    signupForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const name = this.querySelector('input[name="fullName"]').value.trim();
        const username = this.querySelector('input[name="username"]').value.trim();
        const email = this.querySelector('input[name="email"]').value.trim();
        const password = this.querySelector('input[name="password"]').value;
        const confirmPassword = this.querySelector('input[name="confirmPassword"]').value;
        
        if (!name || !username || !email || !password || !confirmPassword) {
            showMessage('Please fill in all fields', 'error');
            return;
        }
        
        if (password !== confirmPassword) {
            showMessage('Passwords do not match', 'error');
            return;
        }
        
        if (password.length < 6) {
            showMessage('Password must be at least 6 characters long', 'error');
            return;
        }
        
        try {
            const res = await apiRequest('accounts/register/', 'POST', {
                username,
                email,
                password,
                password_confirm: confirmPassword,
                first_name: name.split(' ')[0],
                last_name: name.split(' ').slice(1).join(' ')
            });
            localStorage.setItem('access', res.tokens.access);
            localStorage.setItem('refresh', res.tokens.refresh);
            
            showMessage('Account created successfully! Redirecting...', 'success');
            setTimeout(() => {
                window.location.href = 'user-details.html';
            }, 1000);
        } catch (err) {
            showMessage(err.detail || err.message || 'Account creation failed', 'error');
        }
    });
    
    // Page setup complete
});

// Message display function
function showMessage(message, type = 'info') {
    // Remove any existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.innerHTML = `
        <div class="message-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-weight: 500;
    `;
    
    // Add to page
    document.body.appendChild(messageDiv);
    
    // Animate in
    setTimeout(() => {
        messageDiv.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
        messageDiv.style.transform = 'translateX(100%)';
        setTimeout(() => {
            messageDiv.remove();
        }, 300);
    }, 4000);
} 