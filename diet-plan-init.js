// Diet Plan Page Initialization
document.addEventListener('DOMContentLoaded', function() {
    console.log('Diet plan page loaded');
    
    // Check if user is logged in
    if (!UserManagement.isLoggedIn()) {
        console.log('User not logged in, redirecting to index.html');
        window.location.href = 'index.html';
        return;
    }
    
    // Get current user data
    const userData = UserManagement.getCurrentUser();
    console.log('Current user data:', userData);
    
    // Check if user has completed setup
    if (!userData || !userData.bodyType) {
        console.log('User setup not complete, redirecting to user-details.html');
        window.location.href = 'user-details.html';
        return;
    }
    
    // Update body type display
    const currentBodyTypeElement = document.getElementById('currentBodyType');
    if (currentBodyTypeElement && userData.bodyType) {
        currentBodyTypeElement.textContent = userData.bodyType;
    }
    
    // Initialize diet plan
    initializeDietPlan(userData);
    
    console.log('Diet plan page setup complete');
});

// Initialize diet plan based on user data
function initializeDietPlan(userData) {
    try {
        // Calculate daily calorie needs
        const dailyCalories = calculateDailyCalories(userData);
        
        // Calculate macronutrients
        const macros = calculateMacros(dailyCalories, userData.bodyType);
        
        // Update nutrition overview
        updateNutritionOverview(dailyCalories, macros);
        
        // Generate and display meal plan
        const mealPlan = generateMealPlan(userData.bodyType, dailyCalories);
        displayMealPlan(mealPlan);
        
        // Generate and display recommendations
        const recommendations = generateRecommendations(userData.bodyType);
        displayRecommendations(recommendations);
        
        // Generate and display meal timing
        const mealTiming = generateMealTiming();
        displayMealTiming(mealTiming);
        
    } catch (error) {
        console.error('Error initializing diet plan:', error);
        showError('Failed to load diet plan. Please try again.');
    }
}

// Calculate daily calorie needs
function calculateDailyCalories(userData) {
    // Basic BMR calculation using Mifflin-St Jeor Equation
    let bmr;
    const age = calculateAge(userData.dob);
    
    if (userData.gender === 'male') {
        bmr = 10 * userData.weight + 6.25 * userData.height - 5 * age + 5;
    } else {
        bmr = 10 * userData.weight + 6.25 * userData.height - 5 * age - 161;
    }
    
    // Activity multiplier (assuming moderate activity)
    const activityMultiplier = 1.55;
    let dailyCalories = bmr * activityMultiplier;
    
    // Adjust based on body type and goals
    if (userData.bodyType === 'ectomorph') {
        dailyCalories += 300; // Add calories for weight gain
    } else if (userData.bodyType === 'endomorph') {
        dailyCalories -= 300; // Reduce calories for weight loss
    }
    
    return Math.round(dailyCalories);
}

// Calculate age from date of birth
function calculateAge(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

// Calculate macronutrients
function calculateMacros(dailyCalories, bodyType) {
    let proteinRatio, carbsRatio, fatRatio;
    
    switch (bodyType) {
        case 'ectomorph':
            // Higher carbs for energy and muscle building
            proteinRatio = 0.25;
            carbsRatio = 0.50;
            fatRatio = 0.25;
            break;
        case 'mesomorph':
            // Balanced macros
            proteinRatio = 0.30;
            carbsRatio = 0.40;
            fatRatio = 0.30;
            break;
        case 'endomorph':
            // Higher protein, lower carbs for fat loss
            proteinRatio = 0.35;
            carbsRatio = 0.30;
            fatRatio = 0.35;
            break;
        default:
            proteinRatio = 0.30;
            carbsRatio = 0.40;
            fatRatio = 0.30;
    }
    
    return {
        protein: Math.round((dailyCalories * proteinRatio) / 4), // 4 calories per gram
        carbs: Math.round((dailyCalories * carbsRatio) / 4),     // 4 calories per gram
        fat: Math.round((dailyCalories * fatRatio) / 9)          // 9 calories per gram
    };
}

// Update nutrition overview
function updateNutritionOverview(dailyCalories, macros) {
    const dailyCaloriesElement = document.getElementById('dailyCalories');
    const proteinGramsElement = document.getElementById('proteinGrams');
    const carbsGramsElement = document.getElementById('carbsGrams');
    const fatsGramsElement = document.getElementById('fatsGrams');
    
    if (dailyCaloriesElement) dailyCaloriesElement.textContent = dailyCalories;
    if (proteinGramsElement) proteinGramsElement.textContent = `${macros.protein}g`;
    if (carbsGramsElement) carbsGramsElement.textContent = `${macros.carbs}g`;
    if (fatsGramsElement) fatsGramsElement.textContent = `${macros.fat}g`;
}

// Generate meal plan
function generateMealPlan(bodyType, dailyCalories) {
    const meals = {
        breakfast: generateMeal('breakfast', dailyCalories * 0.25, bodyType),
        lunch: generateMeal('lunch', dailyCalories * 0.35, bodyType),
        dinner: generateMeal('dinner', dailyCalories * 0.30, bodyType),
        snack: generateMeal('snack', dailyCalories * 0.10, bodyType)
    };
    
    return meals;
}

// Generate individual meal
function generateMeal(mealType, calories, bodyType) {
    const mealData = {
        breakfast: {
            ectomorph: [
                { name: 'Oatmeal with Berries and Nuts', calories: 400, protein: 15, carbs: 60, fat: 12 },
                { name: 'Greek Yogurt with Honey', calories: 200, protein: 20, carbs: 25, fat: 3 },
                { name: 'Banana', calories: 100, protein: 1, carbs: 25, fat: 0 }
            ],
            mesomorph: [
                { name: 'Eggs with Whole Grain Toast', calories: 350, protein: 25, carbs: 35, fat: 15 },
                { name: 'Protein Smoothie', calories: 250, protein: 30, carbs: 20, fat: 5 },
                { name: 'Apple', calories: 80, protein: 0, carbs: 20, fat: 0 }
            ],
            endomorph: [
                { name: 'Protein Oatmeal', calories: 300, protein: 25, carbs: 35, fat: 8 },
                { name: 'Cottage Cheese with Berries', calories: 150, protein: 20, carbs: 10, fat: 2 },
                { name: 'Green Tea', calories: 0, protein: 0, carbs: 0, fat: 0 }
            ]
        },
        lunch: {
            ectomorph: [
                { name: 'Chicken Rice Bowl', calories: 600, protein: 40, carbs: 80, fat: 15 },
                { name: 'Sweet Potato', calories: 150, protein: 3, carbs: 35, fat: 0 },
                { name: 'Mixed Vegetables', calories: 100, protein: 5, carbs: 15, fat: 2 }
            ],
            mesomorph: [
                { name: 'Grilled Chicken Salad', calories: 450, protein: 45, carbs: 25, fat: 20 },
                { name: 'Quinoa', calories: 200, protein: 8, carbs: 35, fat: 3 },
                { name: 'Olive Oil Dressing', calories: 120, protein: 0, carbs: 0, fat: 14 }
            ],
            endomorph: [
                { name: 'Tuna Salad', calories: 350, protein: 40, carbs: 15, fat: 18 },
                { name: 'Mixed Greens', calories: 50, protein: 5, carbs: 8, fat: 1 },
                { name: 'Avocado', calories: 160, protein: 2, carbs: 8, fat: 15 }
            ]
        },
        dinner: {
            ectomorph: [
                { name: 'Salmon with Brown Rice', calories: 550, protein: 45, carbs: 70, fat: 18 },
                { name: 'Broccoli', calories: 80, protein: 6, carbs: 12, fat: 1 },
                { name: 'Olive Oil', calories: 120, protein: 0, carbs: 0, fat: 14 }
            ],
            mesomorph: [
                { name: 'Lean Beef with Sweet Potato', calories: 500, protein: 50, carbs: 45, fat: 20 },
                { name: 'Green Beans', calories: 70, protein: 4, carbs: 10, fat: 1 },
                { name: 'Coconut Oil', calories: 120, protein: 0, carbs: 0, fat: 14 }
            ],
            endomorph: [
                { name: 'Turkey Breast with Vegetables', calories: 400, protein: 45, carbs: 25, fat: 18 },
                { name: 'Cauliflower Rice', calories: 80, protein: 4, carbs: 12, fat: 1 },
                { name: 'Butter', calories: 100, protein: 0, carbs: 0, fat: 11 }
            ]
        },
        snack: {
            ectomorph: [
                { name: 'Protein Shake', calories: 200, protein: 25, carbs: 20, fat: 3 },
                { name: 'Mixed Nuts', calories: 150, protein: 5, carbs: 8, fat: 12 }
            ],
            mesomorph: [
                { name: 'Greek Yogurt', calories: 150, protein: 20, carbs: 15, fat: 2 },
                { name: 'Almonds', calories: 100, protein: 4, carbs: 4, fat: 9 }
            ],
            endomorph: [
                { name: 'Cottage Cheese', calories: 120, protein: 20, carbs: 5, fat: 2 },
                { name: 'Celery Sticks', calories: 20, protein: 1, carbs: 4, fat: 0 }
            ]
        }
    };
    
    return mealData[mealType][bodyType] || mealData[mealType]['mesomorph'];
}

// Display meal plan
function displayMealPlan(mealPlan) {
    const mealGrid = document.getElementById('mealGrid');
    if (!mealGrid) return;
    
    let html = '';
    
    Object.entries(mealPlan).forEach(([mealType, foods]) => {
        const totalCalories = foods.reduce((sum, food) => sum + food.calories, 0);
        const totalProtein = foods.reduce((sum, food) => sum + food.protein, 0);
        const totalCarbs = foods.reduce((sum, food) => sum + food.carbs, 0);
        const totalFat = foods.reduce((sum, food) => sum + food.fat, 0);
        
        html += `
            <div class="meal-card">
                <div class="meal-header">
                    <h4>${mealType.charAt(0).toUpperCase() + mealType.slice(1)}</h4>
                    <span class="meal-calories">${totalCalories} cal</span>
                </div>
                <div class="meal-foods">
                    ${foods.map(food => `
                        <div class="food-item">
                            <span class="food-name">${food.name}</span>
                            <span class="food-calories">${food.calories} cal</span>
                        </div>
                    `).join('')}
                </div>
                <div class="meal-macros">
                    <span class="macro">P: ${totalProtein}g</span>
                    <span class="macro">C: ${totalCarbs}g</span>
                    <span class="macro">F: ${totalFat}g</span>
                </div>
            </div>
        `;
    });
    
    mealGrid.innerHTML = html;
}

// Generate recommendations
function generateRecommendations(bodyType) {
    const recommendations = {
        ectomorph: [
            'Eat frequent meals throughout the day (5-6 meals)',
            'Include complex carbohydrates in every meal',
            'Add healthy fats like nuts, avocados, and olive oil',
            'Consume protein with every meal (1.2-1.5g per kg body weight)',
            'Consider protein shakes between meals',
            'Eat 30 minutes before and after workouts'
        ],
        mesomorph: [
            'Maintain a balanced macronutrient ratio',
            'Eat protein with every meal (1.6-2.2g per kg body weight)',
            'Time your meals around your workouts',
            'Include both complex carbs and healthy fats',
            'Stay hydrated throughout the day',
            'Consider intermittent fasting for fat loss'
        ],
        endomorph: [
            'Focus on protein-rich foods',
            'Limit carbohydrate intake, especially refined carbs',
            'Include healthy fats in moderation',
            'Eat smaller, more frequent meals',
            'Avoid eating late at night',
            'Consider a ketogenic or low-carb diet'
        ]
    };
    
    return recommendations[bodyType] || recommendations.mesomorph;
}

// Display recommendations
function displayRecommendations(recommendations) {
    const recommendationsContainer = document.getElementById('foodRecommendations');
    if (!recommendationsContainer) return;
    
    const html = recommendations.map(rec => `
        <div class="recommendation-item">
            <i class="fas fa-check-circle"></i>
            <span>${rec}</span>
        </div>
    `).join('');
    
    recommendationsContainer.innerHTML = html;
}

// Generate meal timing
function generateMealTiming() {
    return [
        { time: '7:00 AM', meal: 'Breakfast', note: 'Start your day with protein and complex carbs' },
        { time: '10:00 AM', meal: 'Snack', note: 'Keep your metabolism active' },
        { time: '1:00 PM', meal: 'Lunch', note: 'Main meal with balanced macros' },
        { time: '4:00 PM', meal: 'Pre-workout', note: 'Light snack before exercise' },
        { time: '7:00 PM', meal: 'Dinner', note: 'Protein-rich meal to support recovery' },
        { time: '9:00 PM', meal: 'Evening Snack', note: 'Optional light protein snack' }
    ];
}

// Display meal timing
function displayMealTiming(mealTiming) {
    const mealTimingContainer = document.getElementById('mealTiming');
    if (!mealTimingContainer) return;
    
    const html = mealTiming.map(timing => `
        <div class="timing-item">
            <div class="timing-time">${timing.time}</div>
            <div class="timing-meal">${timing.meal}</div>
            <div class="timing-note">${timing.note}</div>
        </div>
    `).join('');
    
    mealTimingContainer.innerHTML = html;
}

// Show error message
function showError(message) {
    const mealGrid = document.getElementById('mealGrid');
    const recommendationsContainer = document.getElementById('foodRecommendations');
    const mealTimingContainer = document.getElementById('mealTiming');
    
    if (mealGrid) mealGrid.innerHTML = `<p class="error">${message}</p>`;
    if (recommendationsContainer) recommendationsContainer.innerHTML = `<p class="error">${message}</p>`;
    if (mealTimingContainer) mealTimingContainer.innerHTML = `<p class="error">${message}</p>`;
} 