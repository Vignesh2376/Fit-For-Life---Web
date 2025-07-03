import apiRequest from './api.js';

// Global navigation and utility functions
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in on all pages except index
    const currentPage = window.location.pathname.split('/').pop();
    if (currentPage !== 'index.html' && currentPage !== '') {
        if (!localStorage.getItem('access')) {
            window.location.href = 'index.html';
            return;
        }
    }
    
    // Setup navigation
    setupNavigation();
    
    // Setup logout functionality
    setupLogout();
});

// Setup navigation menu
function setupNavigation() {
    const navLinks = document.querySelectorAll('nav a, .nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                e.preventDefault();
                window.location.href = href;
            }
        });
    });
}

// Setup logout functionality
function setupLogout() {
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async function(e) {
            e.preventDefault();
            try {
                await apiRequest('accounts/logout/', 'POST', { refresh_token: localStorage.getItem('refresh') });
            } catch (err) {}
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            window.location.href = 'index.html';
        });
    }
}

// Workout Management Object (localStorage-based)
window.WorkoutManagement = {
    // Get all workout logs
    getWorkoutLogs: function() {
        const logs = localStorage.getItem('workoutLogs');
        return logs ? JSON.parse(logs) : [];
    },
    
    // Create new workout log
    createWorkoutLog: function(workoutData) {
        const logs = this.getWorkoutLogs();
        const newLog = {
            id: Date.now(),
            date: new Date().toISOString(),
            ...workoutData
        };
        logs.push(newLog);
        localStorage.setItem('workoutLogs', JSON.stringify(logs));
        return newLog;
    },
    
    // Delete workout log
    deleteWorkoutLog: function(logId) {
        const logs = this.getWorkoutLogs();
        const filteredLogs = logs.filter(log => log.id !== logId);
        localStorage.setItem('workoutLogs', JSON.stringify(filteredLogs));
    }
};

// Progress Management Object (localStorage-based)
const ProgressManagement = {
    // Get progress data
    getProgressData: function() {
        const data = localStorage.getItem('progressData');
        return data ? JSON.parse(data) : [];
    },
    
    // Save progress data
    saveProgressData: function(progressData) {
        localStorage.setItem('progressData', JSON.stringify(progressData));
    },
    
    // Add new progress entry
    addProgressEntry: function(entry) {
        const data = this.getProgressData();
        const newEntry = {
            id: Date.now(),
            date: new Date().toISOString(),
            ...entry
        };
        data.push(newEntry);
        this.saveProgressData(data);
        return newEntry;
    }
};

// Utility functions
function showMessage(message, type = 'info') {
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    // Add to page
    document.body.appendChild(messageDiv);
    
    // Remove after 3 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString();
}

function formatTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleTimeString();
} 