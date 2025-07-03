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

    if (!userData || !userData.completed_setup) {
        window.location.href = 'user-details.html';
        return;
    }

    // Get user's body type from localStorage or use default
    const userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
    const bodyType = userDetails.bodyType || 'mesomorph';
    
    // Initialize diet plan with local data
    initializeDietPlan(bodyType);
    
    // Show loading animation
    showLoadingAnimation();
});

function displayDietPlan(plan) {
    document.getElementById('dailyCalories').textContent = plan.calories;
    document.getElementById('proteinGrams').textContent = plan.protein + 'g';
    document.getElementById('carbsGrams').textContent = plan.carbs + 'g';
    document.getElementById('fatsGrams').textContent = plan.fats + 'g';
    // Display meals, recommendations, and timing as needed
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

// Loading animation function
function showLoadingAnimation() {
    const sections = document.querySelectorAll('.diet-plan-section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            section.style.transition = 'all 0.6s ease-out';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

function initializeDietPlan(bodyType) {
    // Set nutrition values based on body type
    const nutritionData = getNutritionData(bodyType);
    
    // Update nutrition overview
    updateNutritionOverview(nutritionData);
    
    // Generate meal plan
    generateMealPlan(bodyType, nutritionData);
    
    // Generate recommendations
    generateRecommendations(bodyType);
    
    // Generate meal timing
    generateMealTiming(bodyType);
}

function getNutritionData(bodyType) {
    const baseData = {
        ectomorph: {
            calories: 2500,
            protein: 180,
            carbs: 300,
            fats: 80
        },
        mesomorph: {
            calories: 2200,
            protein: 160,
            carbs: 250,
            fats: 70
        },
        endomorph: {
            calories: 1800,
            protein: 140,
            carbs: 180,
            fats: 60
        }
    };
    
    return baseData[bodyType] || baseData.mesomorph;
}

function updateNutritionOverview(nutritionData) {
    // Update calorie circle
    const dailyCaloriesElement = document.getElementById('dailyCalories');
    if (dailyCaloriesElement) {
        dailyCaloriesElement.textContent = nutritionData.calories;
    }
    
    // Update macro circles
    const proteinElement = document.getElementById('proteinGrams');
    const carbsElement = document.getElementById('carbsGrams');
    const fatsElement = document.getElementById('fatsGrams');
    
    if (proteinElement) proteinElement.textContent = nutritionData.protein + 'g';
    if (carbsElement) carbsElement.textContent = nutritionData.carbs + 'g';
    if (fatsElement) fatsElement.textContent = nutritionData.fats + 'g';
    
    // Animate the circles
    animateNutritionCircles();
}

function animateNutritionCircles() {
    const circles = document.querySelectorAll('.calorie-circle, .macro-circle');
    circles.forEach((circle, index) => {
        setTimeout(() => {
            circle.style.transform = 'scale(1.1)';
            setTimeout(() => {
                circle.style.transform = 'scale(1)';
            }, 200);
        }, index * 200);
    });
}

function generateMealPlan(bodyType, nutritionData) {
    const mealGrid = document.getElementById('mealGrid');
    if (!mealGrid) return;
    
    const meals = getMealPlan(bodyType);
    
    const mealHTML = meals.map(meal => `
        <div class="meal-card">
            <div class="meal-header">
                <h4><i class="fas ${meal.icon}"></i> ${meal.name}</h4>
                <p class="meal-description">${meal.description}</p>
                <span class="meal-calories">${meal.calories} calories</span>
            </div>
            <div class="meal-content">
                <div class="foods-list">
                    ${meal.foods.map(food => `
                        <div class="food-item">
                            <span class="food-name">${food.name}</span>
                            <div class="food-macros">
                                <span class="macro protein">${food.protein}g protein</span>
                                <span class="macro carbs">${food.carbs}g carbs</span>
                                <span class="macro fats">${food.fats}g fats</span>
                                <span class="calories">${food.calories} cal</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `).join('');
    
    mealGrid.innerHTML = mealHTML;
}

function getMealPlan(bodyType) {
    const mealPlans = {
        ectomorph: [
            {
                name: 'Breakfast',
                description: 'High-protein breakfast to kickstart your day',
                icon: 'fa-sun',
                calories: 650,
                foods: [
                    { name: 'Oatmeal with berries', protein: 12, carbs: 45, fats: 8, calories: 280 },
                    { name: 'Greek yogurt', protein: 20, carbs: 8, fats: 0, calories: 120 },
                    { name: 'Banana', protein: 1, carbs: 27, fats: 0, calories: 110 },
                    { name: 'Almonds', protein: 6, carbs: 6, fats: 14, calories: 140 }
                ],
                totalProtein: 39,
                totalCarbs: 86,
                totalFats: 22
            },
            {
                name: 'Lunch',
                description: 'Balanced meal for sustained energy',
                icon: 'fa-cloud-sun',
                calories: 750,
                foods: [
                    { name: 'Grilled chicken breast', protein: 35, carbs: 0, fats: 4, calories: 180 },
                    { name: 'Brown rice', protein: 5, carbs: 45, fats: 2, calories: 220 },
                    { name: 'Mixed vegetables', protein: 4, carbs: 20, fats: 0, calories: 100 },
                    { name: 'Olive oil', protein: 0, carbs: 0, fats: 14, calories: 120 },
                    { name: 'Apple', protein: 0, carbs: 25, fats: 0, calories: 100 }
                ],
                totalProtein: 44,
                totalCarbs: 90,
                totalFats: 20
            },
            {
                name: 'Dinner',
                description: 'Protein-rich dinner for muscle recovery',
                icon: 'fa-moon',
                calories: 700,
                foods: [
                    { name: 'Salmon fillet', protein: 40, carbs: 0, fats: 22, calories: 350 },
                    { name: 'Sweet potato', protein: 4, carbs: 45, fats: 0, calories: 200 },
                    { name: 'Broccoli', protein: 4, carbs: 12, fats: 0, calories: 60 },
                    { name: 'Quinoa', protein: 8, carbs: 20, fats: 2, calories: 120 }
                ],
                totalProtein: 56,
                totalCarbs: 77,
                totalFats: 24
            },
            {
                name: 'Snacks',
                description: 'Healthy snacks throughout the day',
                icon: 'fa-apple-alt',
                calories: 400,
                foods: [
                    { name: 'Protein shake', protein: 25, carbs: 15, fats: 2, calories: 180 },
                    { name: 'Mixed nuts', protein: 8, carbs: 8, fats: 16, calories: 180 },
                    { name: 'Carrot sticks', protein: 2, carbs: 12, fats: 0, calories: 50 }
                ],
                totalProtein: 35,
                totalCarbs: 35,
                totalFats: 18
            }
        ],
        mesomorph: [
            {
                name: 'Breakfast',
                description: 'Balanced breakfast for energy and muscle',
                icon: 'fa-sun',
                calories: 550,
                foods: [
                    { name: 'Eggs (3 whole)', protein: 18, carbs: 0, fats: 15, calories: 210 },
                    { name: 'Whole grain toast', protein: 8, carbs: 30, fats: 2, calories: 160 },
                    { name: 'Avocado', protein: 2, carbs: 8, fats: 12, calories: 120 },
                    { name: 'Orange juice', protein: 1, carbs: 20, fats: 0, calories: 80 }
                ],
                totalProtein: 29,
                totalCarbs: 58,
                totalFats: 29
            },
            {
                name: 'Lunch',
                description: 'Lean protein with complex carbs',
                icon: 'fa-cloud-sun',
                calories: 650,
                foods: [
                    { name: 'Turkey breast', protein: 30, carbs: 0, fats: 3, calories: 150 },
                    { name: 'Quinoa salad', protein: 8, carbs: 35, fats: 4, calories: 200 },
                    { name: 'Mixed greens', protein: 3, carbs: 15, fats: 0, calories: 80 },
                    { name: 'Olive oil dressing', protein: 0, carbs: 0, fats: 14, calories: 120 },
                    { name: 'Berries', protein: 1, carbs: 20, fats: 0, calories: 80 }
                ],
                totalProtein: 42,
                totalCarbs: 70,
                totalFats: 21
            },
            {
                name: 'Dinner',
                description: 'Light dinner for recovery',
                icon: 'fa-moon',
                calories: 600,
                foods: [
                    { name: 'Lean beef steak', protein: 35, carbs: 0, fats: 12, calories: 250 },
                    { name: 'Roasted vegetables', protein: 4, carbs: 25, fats: 8, calories: 180 },
                    { name: 'Brown rice', protein: 5, carbs: 30, fats: 2, calories: 150 },
                    { name: 'Green beans', protein: 2, carbs: 8, fats: 0, calories: 40 }
                ],
                totalProtein: 46,
                totalCarbs: 63,
                totalFats: 22
            },
            {
                name: 'Snacks',
                description: 'Smart snacking for muscle growth',
                icon: 'fa-apple-alt',
                calories: 350,
                foods: [
                    { name: 'Cottage cheese', protein: 20, carbs: 8, fats: 2, calories: 130 },
                    { name: 'Almonds', protein: 6, carbs: 6, fats: 14, calories: 140 },
                    { name: 'Greek yogurt', protein: 15, carbs: 8, fats: 0, calories: 90 }
                ],
                totalProtein: 41,
                totalCarbs: 22,
                totalFats: 16
            }
        ],
        endomorph: [
            {
                name: 'Breakfast',
                description: 'High-protein, low-carb breakfast',
                icon: 'fa-sun',
                calories: 450,
                foods: [
                    { name: 'Egg whites (6)', protein: 24, carbs: 0, fats: 0, calories: 120 },
                    { name: 'Spinach omelette', protein: 4, carbs: 4, fats: 8, calories: 80 },
                    { name: 'Turkey bacon', protein: 12, carbs: 0, fats: 6, calories: 100 },
                    { name: 'Green tea', protein: 0, carbs: 0, fats: 0, calories: 0 },
                    { name: 'Berries', protein: 1, carbs: 15, fats: 0, calories: 60 }
                ],
                totalProtein: 41,
                totalCarbs: 19,
                totalFats: 14
            },
            {
                name: 'Lunch',
                description: 'Lean protein with vegetables',
                icon: 'fa-cloud-sun',
                calories: 500,
                foods: [
                    { name: 'Grilled chicken breast', protein: 35, carbs: 0, fats: 4, calories: 180 },
                    { name: 'Mixed salad', protein: 4, carbs: 20, fats: 0, calories: 100 },
                    { name: 'Olive oil', protein: 0, carbs: 0, fats: 14, calories: 120 },
                    { name: 'Cucumber', protein: 1, carbs: 8, fats: 0, calories: 40 },
                    { name: 'Apple', protein: 0, carbs: 25, fats: 0, calories: 100 }
                ],
                totalProtein: 40,
                totalCarbs: 53,
                totalFats: 18
            },
            {
                name: 'Dinner',
                description: 'Light protein-focused dinner',
                icon: 'fa-moon',
                calories: 450,
                foods: [
                    { name: 'White fish fillet', protein: 30, carbs: 0, fats: 6, calories: 180 },
                    { name: 'Steamed broccoli', protein: 4, carbs: 12, fats: 0, calories: 60 },
                    { name: 'Cauliflower rice', protein: 3, carbs: 15, fats: 0, calories: 80 },
                    { name: 'Lemon herb sauce', protein: 0, carbs: 2, fats: 8, calories: 80 },
                    { name: 'Green beans', protein: 2, carbs: 8, fats: 0, calories: 40 }
                ],
                totalProtein: 39,
                totalCarbs: 37,
                totalFats: 14
            },
            {
                name: 'Snacks',
                description: 'Low-calorie, high-protein snacks',
                icon: 'fa-apple-alt',
                calories: 300,
                foods: [
                    { name: 'Protein shake', protein: 25, carbs: 8, fats: 2, calories: 150 },
                    { name: 'Celery sticks', protein: 1, carbs: 8, fats: 0, calories: 40 },
                    { name: 'Hard-boiled egg', protein: 6, carbs: 0, fats: 5, calories: 70 },
                    { name: 'Green tea', protein: 0, carbs: 0, fats: 0, calories: 0 }
                ],
                totalProtein: 32,
                totalCarbs: 16,
                totalFats: 7
            }
        ]
    };
    
    return mealPlans[bodyType] || mealPlans.mesomorph;
}

function generateRecommendations(bodyType) {
    const recommendationsContainer = document.getElementById('foodRecommendations');
    
    const recommendations = {
        ectomorph: [
            { icon: 'fa-dumbbell', text: 'Focus on calorie-dense foods like nuts, avocados, and olive oil' },
            { icon: 'fa-clock', text: 'Eat every 2-3 hours to maintain high calorie intake' },
            { icon: 'fa-glass-whiskey', text: 'Include protein shakes between meals for extra calories' },
            { icon: 'fa-seedling', text: 'Choose complex carbs like sweet potatoes and brown rice' },
            { icon: 'fa-fish', text: 'Include fatty fish like salmon for healthy fats and protein' }
        ],
        mesomorph: [
            { icon: 'fa-balance-scale', text: 'Maintain a balanced ratio of protein, carbs, and fats' },
            { icon: 'fa-clock', text: 'Eat 4-5 meals per day for optimal muscle growth' },
            { icon: 'fa-dumbbell', text: 'Time protein intake around workouts for maximum benefit' },
            { icon: 'fa-seedling', text: 'Include plenty of vegetables for micronutrients' },
            { icon: 'fa-tint', text: 'Stay hydrated with at least 8 glasses of water daily' }
        ],
        endomorph: [
            { icon: 'fa-burn', text: 'Focus on high-protein, moderate-fat, low-carb foods' },
            { icon: 'fa-clock', text: 'Eat smaller, more frequent meals to boost metabolism' },
            { icon: 'fa-seedling', text: 'Fill up on non-starchy vegetables to control hunger' },
            { icon: 'fa-tint', text: 'Drink plenty of water and green tea to boost metabolism' },
            { icon: 'fa-ban', text: 'Limit processed foods and added sugars' }
        ]
    };
    
    const recs = recommendations[bodyType] || recommendations.mesomorph;
    
    const recommendationsHTML = `
        <div class="recommendations-list">
            ${recs.map(rec => `
                <li>
                    <div class="recommendation-icon">
                        <i class="fas ${rec.icon}"></i>
                    </div>
                    <div class="recommendation-text">${rec.text}</div>
                </li>
            `).join('')}
        </div>
    `;
    
    recommendationsContainer.innerHTML = recommendationsHTML;
}

function generateMealTiming(bodyType) {
    const timingContainer = document.getElementById('mealTiming');
    
    const timingSchedules = {
        ectomorph: [
            { time: '7:00 AM', meal: 'Breakfast', icon: 'fa-sun' },
            { time: '10:00 AM', meal: 'Snack', icon: 'fa-apple-alt' },
            { time: '1:00 PM', meal: 'Lunch', icon: 'fa-cloud-sun' },
            { time: '4:00 PM', meal: 'Pre-workout', icon: 'fa-dumbbell' },
            { time: '7:00 PM', meal: 'Dinner', icon: 'fa-moon' },
            { time: '9:30 PM', meal: 'Evening snack', icon: 'fa-star' }
        ],
        mesomorph: [
            { time: '7:30 AM', meal: 'Breakfast', icon: 'fa-sun' },
            { time: '10:30 AM', meal: 'Morning snack', icon: 'fa-apple-alt' },
            { time: '1:30 PM', meal: 'Lunch', icon: 'fa-cloud-sun' },
            { time: '4:30 PM', meal: 'Pre-workout', icon: 'fa-dumbbell' },
            { time: '7:30 PM', meal: 'Dinner', icon: 'fa-moon' },
            { time: '9:00 PM', meal: 'Protein snack', icon: 'fa-star' }
        ],
        endomorph: [
            { time: '8:00 AM', meal: 'Breakfast', icon: 'fa-sun' },
            { time: '11:00 AM', meal: 'Light snack', icon: 'fa-apple-alt' },
            { time: '2:00 PM', meal: 'Lunch', icon: 'fa-cloud-sun' },
            { time: '5:00 PM', meal: 'Pre-workout', icon: 'fa-dumbbell' },
            { time: '8:00 PM', meal: 'Dinner', icon: 'fa-moon' },
            { time: '10:00 PM', meal: 'Optional snack', icon: 'fa-star' }
        ]
    };
    
    const schedule = timingSchedules[bodyType] || timingSchedules.mesomorph;
    
    const timingHTML = schedule.map(item => `
        <div>
            <div class="timing-icon">
                <i class="fas ${item.icon}"></i>
            </div>
            <div class="timing-text">
                <strong>${item.time}</strong> - ${item.meal}
            </div>
        </div>
    `).join('');
    
    timingContainer.innerHTML = timingHTML;
} 