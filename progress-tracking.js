// Progress Tracking Page Specific JavaScript

import apiRequest from './api.js';

// Progress tracking functionality
let charts = {};

// Initialize progress tracking
function initializeProgressTracking() {
    try {
        // Show loading
        document.getElementById('loading').style.display = 'block';
        document.getElementById('content').style.display = 'none';

        // Load data from local storage
        loadProgressData();
        
        // Hide loading and show content
        document.getElementById('loading').style.display = 'none';
        document.getElementById('content').style.display = 'block';
    } catch (error) {
        console.error('Error initializing progress tracking:', error);
        document.getElementById('loading').innerHTML = '<h3>Error loading data. Please try again.</h3>';
    }
}

// Load progress data from local storage
function loadProgressData() {
    try {
        // Get workout logs from localStorage
        const workoutLogs = JSON.parse(localStorage.getItem('workoutLogs') || '[]');
        
        // Calculate basic statistics
        const stats = calculateStats(workoutLogs);
        
        // Generate basic analysis
        const analysis = generateAnalysis(workoutLogs);
        
        // Update stats overview
        updateStatsOverview(stats);
        
        // Update insights
        updateInsights(analysis);
        
        // Create charts
        createCharts(workoutLogs, analysis);
        
    } catch (error) {
        console.error('Error loading progress data:', error);
        // Show fallback data or error message
        showFallbackData();
    }
}

// Calculate basic statistics from workout logs
function calculateStats(workoutLogs) {
    if (!workoutLogs || workoutLogs.length === 0) {
        return {
            total_workouts: 0,
            weekly_average: 0,
            current_streak: 0,
            favorite_body_part: 'N/A'
        };
    }

    const totalWorkouts = workoutLogs.length;
    
    // Calculate weekly average (last 4 weeks)
    const fourWeeksAgo = new Date();
    fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 28);
    const recentWorkouts = workoutLogs.filter(log => new Date(log.date) > fourWeeksAgo);
    const weeklyAverage = Math.round((recentWorkouts.length / 4) * 10) / 10;
    
    // Calculate current streak
    let currentStreak = 0;
    const sortedLogs = workoutLogs.sort((a, b) => new Date(b.date) - new Date(a.date));
    const today = new Date().toDateString();
    
    for (let i = 0; i < sortedLogs.length; i++) {
        const logDate = new Date(sortedLogs[i].date).toDateString();
        if (logDate === today || i === 0) {
            currentStreak++;
        } else {
            break;
        }
    }
    
    // Find favorite body part
    const bodyPartCounts = {};
    workoutLogs.forEach(log => {
        bodyPartCounts[log.bodyPart] = (bodyPartCounts[log.bodyPart] || 0) + 1;
    });
    
    const favoriteBodyPart = Object.keys(bodyPartCounts).reduce((a, b) => 
        bodyPartCounts[a] > bodyPartCounts[b] ? a : b, 'N/A');

    return {
        total_workouts: totalWorkouts,
        weekly_average: weeklyAverage,
        current_streak: currentStreak,
        favorite_body_part: favoriteBodyPart
    };
}

// Generate basic analysis from workout logs
function generateAnalysis(workoutLogs) {
    if (!workoutLogs || workoutLogs.length === 0) {
        return {
            insights: [{
                type: 'info',
                title: 'Welcome to Progress Tracking!',
                description: 'Start logging your workouts and progress to see personalized insights and recommendations.'
            }]
        };
    }

    const insights = [];
    
    // Basic insights based on workout frequency
    if (workoutLogs.length < 5) {
        insights.push({
            type: 'info',
            title: 'Getting Started',
            description: 'Great job starting your fitness journey! Keep logging your workouts to track your progress.'
        });
    } else if (workoutLogs.length < 20) {
        insights.push({
            type: 'success',
            title: 'Building Momentum',
            description: 'You\'re building a great foundation! Consistency is key to achieving your fitness goals.'
        });
    } else {
        insights.push({
            type: 'success',
            title: 'Dedicated Athlete',
            description: 'Impressive dedication! You\'re showing real commitment to your fitness journey.'
        });
    }

    return { insights };
}

// Update stats overview
function updateStatsOverview(stats) {
    const statsContainer = document.getElementById('statsOverview');
    
    if (stats) {
        statsContainer.innerHTML = `
            <div class="stat-card">
                <div class="stat-number">${stats.total_workouts || 0}</div>
                <div class="stat-label">Total Workouts</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${stats.weekly_average || 0}</div>
                <div class="stat-label">Weekly Average</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${stats.current_streak || 0}</div>
                <div class="stat-label">Current Streak</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${stats.favorite_body_part || 'N/A'}</div>
                <div class="stat-label">Favorite Body Part</div>
            </div>
        `;
    } else {
        statsContainer.innerHTML = '<p>No workout data available yet.</p>';
    }
}

// Update insights
function updateInsights(analysis) {
    const insightsContainer = document.getElementById('insightsContainer');
    
    if (analysis && analysis.insights) {
        insightsContainer.innerHTML = analysis.insights.map(insight => `
            <div class="insight-item ${insight.type}">
                <h4>${insight.title}</h4>
                <p>${insight.description}</p>
            </div>
        `).join('');
    } else {
        insightsContainer.innerHTML = `
            <div class="insight-item">
                <h4>Welcome to Progress Tracking!</h4>
                <p>Start logging your workouts and progress to see personalized insights and recommendations.</p>
            </div>
        `;
    }
}

// Create charts
function createCharts(workoutLogs, analysis) {
    // For now, we'll create simple placeholder charts
    // In a full implementation, you could use Chart.js to create visual charts
    console.log('Charts would be created here with workout data:', workoutLogs);
}

// Show fallback data when backend is not available
function showFallbackData() {
    const statsContainer = document.getElementById('statsOverview');
    const insightsContainer = document.getElementById('insightsContainer');
    
    statsContainer.innerHTML = `
        <div class="stat-card">
            <div class="stat-number">0</div>
            <div class="stat-label">Total Workouts</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">0</div>
            <div class="stat-label">Weekly Average</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">0</div>
            <div class="stat-label">Current Streak</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">N/A</div>
            <div class="stat-label">Favorite Body Part</div>
        </div>
    `;
    
    insightsContainer.innerHTML = `
        <div class="insight-item">
            <h4>Welcome to Progress Tracking!</h4>
            <p>Start logging your workouts and progress to see personalized insights and recommendations.</p>
        </div>
        <div class="insight-item">
            <h4>Local Storage Mode</h4>
            <p>Your workout data is being stored locally. Log workouts from the workout plan to see your progress here.</p>
        </div>
    `;
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', async function() {
    if (!localStorage.getItem('access')) {
        window.location.href = 'index.html';
        return;
    }

    // Fetch and display progress entries
    try {
        const entries = await apiRequest('progress/entries/');
        displayProgress(entries);
    } catch (err) {
        showMessage('Failed to load progress data', 'error');
    }

    // Log progress form
    const progressForm = document.getElementById('progressForm');
    if (progressForm) {
        progressForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const weight = parseFloat(document.getElementById('weight').value);
            const bodyFat = parseFloat(document.getElementById('bodyFat').value);
            const muscleMass = parseFloat(document.getElementById('muscleMass').value);
            try {
                await apiRequest('progress/entries/', 'POST', {
                    weight,
                    body_fat: bodyFat,
                    muscle_mass: muscleMass
                });
                showMessage('Progress logged!', 'success');
                setTimeout(() => window.location.reload(), 1000);
            } catch (err) {
                showMessage('Failed to log progress', 'error');
            }
        });
    }
});

function displayProgress(entries) {
    // Display stats, insights, and charts as needed
    // ...
}

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