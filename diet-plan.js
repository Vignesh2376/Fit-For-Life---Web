// Initialize user data if not exists
document.addEventListener('DOMContentLoaded', function() {
    if (!localStorage.getItem('userData')) {
        localStorage.setItem('userData', JSON.stringify({
            bodyType: 'mesomorph',
            name: 'User'
        }));
    }
    initializeDietPlan();
});

// Diet plans for different body types
const dietPlans = {
    ectomorph: {
        calories: 3000,
        macros: {
            protein: 180, // 30% of calories
            carbs: 420,   // 55% of calories
            fats: 67      // 15% of calories
        },
        meals: [
            {
                name: "Breakfast",
                description: "High-carb breakfast to kickstart metabolism",
                calories: 750,
                foods: [
                    { name: "Oatmeal with banana and honey", protein: 15, carbs: 65, fats: 6, calories: 375 },
                    { name: "Greek yogurt with berries", protein: 20, carbs: 25, fats: 0, calories: 180 },
                    { name: "Almonds (1 oz)", protein: 6, carbs: 6, fats: 14, calories: 170 },
                    { name: "Whey protein shake", protein: 24, carbs: 3, fats: 1, calories: 120 }
                ]
            },
            {
                name: "Mid-Morning Snack",
                description: "Quick energy boost",
                calories: 400,
                foods: [
                    { name: "Mass gainer smoothie", protein: 25, carbs: 50, fats: 5, calories: 350 },
                    { name: "Whole grain crackers", protein: 3, carbs: 22, fats: 3, calories: 150 }
                ]
            },
            {
                name: "Lunch",
                description: "Balanced meal with lean protein",
                calories: 800,
                foods: [
                    { name: "Grilled chicken breast (8 oz)", protein: 50, carbs: 0, fats: 6, calories: 250 },
                    { name: "Brown rice (2 cups)", protein: 10, carbs: 90, fats: 4, calories: 430 },
                    { name: "Mixed vegetables", protein: 5, carbs: 15, fats: 0, calories: 80 },
                    { name: "Olive oil (1 tbsp)", protein: 0, carbs: 0, fats: 14, calories: 120 }
                ]
            },
            {
                name: "Post-Workout",
                description: "Fast-absorbing nutrients",
                calories: 350,
                foods: [
                    { name: "Whey protein shake", protein: 25, carbs: 2, fats: 1, calories: 120 },
                    { name: "Banana", protein: 1, carbs: 27, fats: 0, calories: 105 },
                    { name: "Dextrose powder", protein: 0, carbs: 30, fats: 0, calories: 120 }
                ]
            },
            {
                name: "Dinner",
                description: "Protein-rich evening meal",
                calories: 700,
                foods: [
                    { name: "Salmon fillet (8 oz)", protein: 46, carbs: 0, fats: 28, calories: 440 },
                    { name: "Sweet potato (large)", protein: 4, carbs: 37, fats: 0, calories: 160 },
                    { name: "Quinoa (1 cup)", protein: 8, carbs: 39, fats: 4, calories: 220 },
                    { name: "Steamed broccoli", protein: 4, carbs: 7, fats: 0, calories: 45 }
                ]
            }
        ],
        recommendations: [
            "Eat every 2-3 hours to maintain high calorie intake",
            "Focus on calorie-dense foods to meet energy needs",
            "Include protein with every meal for muscle growth",
            "Don't skip post-workout nutrition",
            "Consume healthy fats moderately for hormonal balance"
        ],
        mealTiming: [
            "Breakfast: Within 1 hour of waking (7:00 AM)",
            "Mid-Morning Snack: 10:00 AM",
            "Lunch: 1:00 PM",
            "Post-Workout: Immediately after training (4:00 PM)",
            "Dinner: 7:00 PM",
            "Optional: Protein shake before bed"
        ]
    },
    mesomorph: {
        calories: 2500,
        macros: {
            protein: 188, // 30% of calories
            carbs: 250,   // 40% of calories
            fats: 69      // 30% of calories
        },
        meals: [
            {
                name: "Breakfast",
                description: "Protein-rich start",
                calories: 600,
                foods: [
                    { name: "Eggs (3 whole)", protein: 18, carbs: 0, fats: 15, calories: 210 },
                    { name: "Egg whites (3)", protein: 10, carbs: 0, fats: 0, calories: 50 },
                    { name: "Whole grain toast (2 slices)", protein: 8, carbs: 28, fats: 2, calories: 160 },
                    { name: "Avocado (1/2)", protein: 2, carbs: 6, fats: 15, calories: 160 }
                ]
            },
            {
                name: "Mid-Morning Snack",
                description: "Balanced nutrients",
                calories: 350,
                foods: [
                    { name: "Greek yogurt (1 cup)", protein: 23, carbs: 8, fats: 0, calories: 130 },
                    { name: "Mixed berries (1 cup)", protein: 1, carbs: 17, fats: 0, calories: 70 },
                    { name: "Granola (1/4 cup)", protein: 4, carbs: 18, fats: 6, calories: 140 }
                ]
            },
            {
                name: "Lunch",
                description: "Lean protein and complex carbs",
                calories: 650,
                foods: [
                    { name: "Grilled chicken breast (6 oz)", protein: 38, carbs: 0, fats: 4, calories: 180 },
                    { name: "Quinoa (1 cup)", protein: 8, carbs: 39, fats: 4, calories: 220 },
                    { name: "Mixed vegetables", protein: 5, carbs: 15, fats: 0, calories: 80 },
                    { name: "Olive oil dressing", protein: 0, carbs: 0, fats: 14, calories: 120 }
                ]
            },
            {
                name: "Post-Workout",
                description: "Recovery nutrition",
                calories: 300,
                foods: [
                    { name: "Whey protein shake", protein: 25, carbs: 2, fats: 1, calories: 120 },
                    { name: "Banana", protein: 1, carbs: 27, fats: 0, calories: 105 },
                    { name: "Rice cakes (2)", protein: 2, carbs: 22, fats: 0, calories: 100 }
                ]
            },
            {
                name: "Dinner",
                description: "Balanced evening meal",
                calories: 600,
                foods: [
                    { name: "Lean beef (6 oz)", protein: 42, carbs: 0, fats: 16, calories: 320 },
                    { name: "Sweet potato (medium)", protein: 2, carbs: 26, fats: 0, calories: 120 },
                    { name: "Broccoli (2 cups)", protein: 6, carbs: 12, fats: 0, calories: 60 },
                    { name: "Quinoa (1/2 cup)", protein: 4, carbs: 20, fats: 2, calories: 110 }
                ]
            }
        ],
        recommendations: [
            "Balance protein and carbs in each meal",
            "Moderate portions for steady energy",
            "Include a variety of vegetables for nutrients",
            "Time carbs around workouts for optimal performance",
            "Stay hydrated with 3-4 liters of water daily"
        ],
        mealTiming: [
            "Breakfast: 7:00 AM",
            "Mid-Morning Snack: 10:00 AM",
            "Lunch: 1:00 PM",
            "Post-Workout: 4:00 PM",
            "Dinner: 7:00 PM"
        ]
    },
    endomorph: {
        calories: 2000,
        macros: {
            protein: 175, // 35% of calories
            carbs: 150,   // 30% of calories
            fats: 78      // 35% of calories
        },
        meals: [
            {
                name: "Breakfast",
                description: "Low-carb, high-protein start",
                calories: 400,
                foods: [
                    { name: "Egg whites (6)", protein: 20, carbs: 0, fats: 0, calories: 100 },
                    { name: "Whole egg (1)", protein: 6, carbs: 0, fats: 5, calories: 70 },
                    { name: "Turkey bacon (3 slices)", protein: 15, carbs: 0, fats: 6, calories: 120 },
                    { name: "Spinach and mushrooms", protein: 3, carbs: 3, fats: 0, calories: 25 },
                    { name: "Avocado (1/4)", protein: 1, carbs: 3, fats: 7, calories: 80 }
                ]
            },
            {
                name: "Mid-Morning Snack",
                description: "Protein-focused snack",
                calories: 250,
                foods: [
                    { name: "Greek yogurt (plain)", protein: 23, carbs: 8, fats: 0, calories: 130 },
                    { name: "Almonds (12)", protein: 3, carbs: 3, fats: 7, calories: 85 },
                    { name: "Chia seeds (1 tbsp)", protein: 2, carbs: 5, fats: 4, calories: 60 }
                ]
            },
            {
                name: "Lunch",
                description: "High-protein, moderate-fat lunch",
                calories: 500,
                foods: [
                    { name: "Tuna (6 oz)", protein: 40, carbs: 0, fats: 4, calories: 200 },
                    { name: "Mixed greens (2 cups)", protein: 2, carbs: 5, fats: 0, calories: 30 },
                    { name: "Olive oil dressing", protein: 0, carbs: 0, fats: 14, calories: 120 },
                    { name: "Cherry tomatoes", protein: 1, carbs: 4, fats: 0, calories: 25 },
                    { name: "Cucumber", protein: 1, carbs: 4, fats: 0, calories: 20 }
                ]
            },
            {
                name: "Post-Workout",
                description: "Lean protein recovery",
                calories: 250,
                foods: [
                    { name: "Whey protein isolate", protein: 27, carbs: 1, fats: 0, calories: 120 },
                    { name: "Celery sticks", protein: 0, carbs: 3, fats: 0, calories: 15 },
                    { name: "Almond butter (1 tbsp)", protein: 3, carbs: 3, fats: 9, calories: 100 }
                ]
            },
            {
                name: "Dinner",
                description: "Low-carb dinner",
                calories: 600,
                foods: [
                    { name: "Grilled fish (8 oz)", protein: 46, carbs: 0, fats: 12, calories: 300 },
                    { name: "Cauliflower rice", protein: 2, carbs: 5, fats: 0, calories: 25 },
                    { name: "Asparagus", protein: 2, carbs: 4, fats: 0, calories: 20 },
                    { name: "Brussels sprouts", protein: 3, carbs: 8, fats: 0, calories: 40 },
                    { name: "Coconut oil (1 tbsp)", protein: 0, carbs: 0, fats: 14, calories: 120 }
                ]
            }
        ],
        recommendations: [
            "Focus on protein-rich foods for satiety",
            "Limit carbohydrate intake to control insulin",
            "Include healthy fats for hormone balance",
            "Eat plenty of fibrous vegetables",
            "Control portion sizes and track calories"
        ],
        mealTiming: [
            "Breakfast: 8:00 AM",
            "Mid-Morning Snack: 10:30 AM",
            "Lunch: 1:30 PM",
            "Post-Workout: 4:30 PM",
            "Dinner: 7:30 PM"
        ]
    },
    lean: {
        calories: 2640,
        macros: {
            protein: 213,
            carbs: 208,
            fats: 98
        },
        meals: [
            {
                name: "Breakfast",
                time: "7:00–8:00 AM",
                description: "High-protein breakfast with complex carbs",
                calories: 585,
                foods: [
                    { name: "4 whole eggs + 2 egg whites", protein: 28, carbs: 2, fats: 22, calories: 320 },
                    { name: "2 slices whole grain bread", protein: 6, carbs: 28, fats: 2, calories: 160 },
                    { name: "1 banana", protein: 1, carbs: 27, fats: 0, calories: 105 }
                ]
            },
            {
                name: "Mid-Morning Snack",
                time: "10:00–10:30 AM",
                description: "Protein-rich snack with healthy fats",
                calories: 340,
                foods: [
                    { name: "Greek yogurt (200g)", protein: 10, carbs: 7, fats: 4, calories: 130 },
                    { name: "Almonds (15g / ~10 almonds)", protein: 3, carbs: 3, fats: 8, calories: 90 },
                    { name: "1 scoop whey protein", protein: 24, carbs: 2, fats: 1, calories: 120 }
                ]
            },
            {
                name: "Lunch",
                time: "1:00–2:00 PM",
                description: "Balanced meal with lean protein and complex carbs",
                calories: 585,
                foods: [
                    { name: "Grilled chicken breast (150g)", protein: 35, carbs: 0, fats: 7, calories: 250 },
                    { name: "Brown rice (1 cup cooked)", protein: 5, carbs: 45, fats: 2, calories: 215 },
                    { name: "Mixed veggies (1 cup)", protein: 2, carbs: 10, fats: 2, calories: 80 },
                    { name: "Olive oil (1 tsp)", protein: 0, carbs: 0, fats: 5, calories: 40 }
                ]
            },
            {
                name: "Pre-Workout",
                time: "4:00–5:00 PM",
                description: "Quick energy boost before training",
                calories: 225,
                foods: [
                    { name: "1 banana", protein: 1, carbs: 27, fats: 0, calories: 105 },
                    { name: "1 scoop whey protein", protein: 24, carbs: 2, fats: 1, calories: 120 }
                ]
            },
            {
                name: "Post-Workout",
                time: "6:30–7:00 PM",
                description: "Recovery nutrition",
                calories: 245,
                foods: [
                    { name: "Whey protein shake", protein: 24, carbs: 2, fats: 1, calories: 120 },
                    { name: "1 rice cake", protein: 1, carbs: 7, fats: 0, calories: 35 },
                    { name: "10 almonds", protein: 3, carbs: 3, fats: 8, calories: 90 }
                ]
            },
            {
                name: "Dinner",
                time: "8:00–9:00 PM",
                description: "Lean protein with complex carbs",
                calories: 480,
                foods: [
                    { name: "Grilled fish or tofu/paneer (150g)", protein: 28, carbs: 2, fats: 14, calories: 250 },
                    { name: "Sweet potato (150g)", protein: 2, carbs: 30, fats: 0, calories: 130 },
                    { name: "Salad with olive oil", protein: 1, carbs: 5, fats: 9, calories: 100 }
                ]
            },
            {
                name: "Bedtime Snack",
                time: "10:00 PM",
                description: "Slow-digesting protein before bed",
                calories: 180,
                foods: [
                    { name: "Cottage cheese (100g)", protein: 11, carbs: 3, fats: 4, calories: 90 },
                    { name: "1 tbsp peanut butter", protein: 4, carbs: 3, fats: 8, calories: 90 }
                ]
            }
        ],
        recommendations: [
            "Caloric Surplus: Consume ~250–500 kcal more than maintenance",
            "Protein: 1.6–2.2 g per kg of body weight daily",
            "Carbs: Essential for energy and glycogen storage – 4–7 g/kg/day",
            "Fats: 20–30% of daily calories from healthy fats",
            "Hydration: 3–4 liters of water/day",
            "Meal Timing: 5–6 meals spaced every 2.5–3 hours to support protein synthesis"
        ],
        mealTiming: [
            "Breakfast: 7:00–8:00 AM",
            "Mid-Morning Snack: 10:00–10:30 AM",
            "Lunch: 1:00–2:00 PM",
            "Pre-Workout: 4:00–5:00 PM",
            "Post-Workout: 6:30–7:00 PM",
            "Dinner: 8:00–9:00 PM",
            "Bedtime Snack: 10:00 PM"
        ]
    },
    ripped: {
        calories: 1795,
        macros: {
            protein: 173,
            carbs: 108,
            fats: 64
        },
        meals: [
            {
                name: "Breakfast",
                time: "7:00–8:00 AM",
                description: "High-protein, moderate-carb breakfast",
                calories: 290,
                foods: [
                    { name: "4 egg whites + 2 whole eggs (scrambled)", protein: 27, carbs: 0, fats: 10, calories: 190 },
                    { name: "½ cup oats with cinnamon", protein: 0, carbs: 20, fats: 1, calories: 100 },
                    { name: "Black coffee (no sugar)", protein: 0, carbs: 0, fats: 0, calories: 0 }
                ]
            },
            {
                name: "Mid-Morning Snack",
                time: "10:00–10:30 AM",
                description: "Protein-rich snack with healthy fats",
                calories: 180,
                foods: [
                    { name: "Greek yogurt (150g, low-fat)", protein: 13, carbs: 6, fats: 3, calories: 130 },
                    { name: "1 tbsp chia seeds", protein: 2, carbs: 2, fats: 5, calories: 50 }
                ]
            },
            {
                name: "Lunch",
                time: "1:00–2:00 PM",
                description: "Lean protein with complex carbs",
                calories: 400,
                foods: [
                    { name: "Grilled chicken breast (150g)", protein: 38, carbs: 0, fats: 4, calories: 250 },
                    { name: "Steamed broccoli + carrots (1 cup)", protein: 0, carbs: 10, fats: 0, calories: 50 },
                    { name: "Quinoa or brown rice (½ cup)", protein: 0, carbs: 20, fats: 8, calories: 100 }
                ]
            },
            {
                name: "Pre-Workout",
                time: "4:00–5:00 PM",
                description: "Quick energy before training",
                calories: 215,
                foods: [
                    { name: "1 banana", protein: 1, carbs: 25, fats: 0, calories: 95 },
                    { name: "1 scoop whey protein (with water)", protein: 24, carbs: 0, fats: 1, calories: 120 }
                ]
            },
            {
                name: "Post-Workout",
                time: "6:30–7:00 PM",
                description: "Recovery nutrition",
                calories: 190,
                foods: [
                    { name: "Whey protein shake (1 scoop)", protein: 24, carbs: 2, fats: 1, calories: 120 },
                    { name: "2 rice cakes", protein: 0, carbs: 10, fats: 1, calories: 70 }
                ]
            },
            {
                name: "Dinner",
                time: "8:00–9:00 PM",
                description: "Lean protein with healthy fats",
                calories: 350,
                foods: [
                    { name: "Grilled fish or tofu (150g)", protein: 30, carbs: 0, fats: 15, calories: 250 },
                    { name: "Spinach or salad greens", protein: 0, carbs: 10, fats: 0, calories: 50 },
                    { name: "Olive oil drizzle (1 tsp)", protein: 0, carbs: 0, fats: 5, calories: 50 }
                ]
            },
            {
                name: "Bedtime Snack",
                time: "10:00 PM",
                description: "Optional slow-digesting protein",
                calories: 160,
                foods: [
                    { name: "Cottage cheese (100g, low-fat)", protein: 14, carbs: 3, fats: 5, calories: 120 },
                    { name: "5 almonds", protein: 0, carbs: 0, fats: 5, calories: 40 }
                ]
            }
        ],
        recommendations: [
            "Calorie Intake: 300–500 kcal deficit below maintenance (depends on TDEE)",
            "Protein: 2.0–2.5 g/kg of body weight",
            "Carbohydrates: Moderate (~2–3 g/kg/day)",
            "Fats: Low to moderate (0.8–1 g/kg/day)",
            "Water: 3–4 liters/day",
            "Meal Frequency: 5–6 small meals/day every 2.5–3 hours"
        ],
        mealTiming: [
            "Breakfast: 7:00–8:00 AM",
            "Mid-Morning Snack: 10:00–10:30 AM",
            "Lunch: 1:00–2:00 PM",
            "Pre-Workout: 4:00–5:00 PM",
            "Post-Workout: 6:30–7:00 PM",
            "Dinner: 8:00–9:00 PM",
            "Bedtime Snack (Optional): 10:00 PM"
        ]
    },
    bulked: {
        calories: 3440,
        macros: {
            protein: 282,
            carbs: 245,
            fats: 139
        },
        meals: [
            {
                name: "Breakfast",
                time: "7:30–8:00 AM",
                description: "High-calorie, nutrient-dense breakfast",
                calories: 750,
                foods: [
                    { name: "4 whole eggs + 2 egg whites (omelet)", protein: 30, carbs: 2, fats: 20, calories: 340 },
                    { name: "2 slices whole grain toast", protein: 8, carbs: 28, fats: 2, calories: 160 },
                    { name: "1 cup oats with banana, peanut butter, and honey", protein: 2, carbs: 35, fats: 8, calories: 170 },
                    { name: "1 glass whole milk", protein: 2, carbs: 5, fats: 5, calories: 80 }
                ]
            },
            {
                name: "Mid-Morning Snack",
                time: "10:30–11:00 AM",
                description: "Protein and healthy fats",
                calories: 430,
                foods: [
                    { name: "Greek yogurt (200g)", protein: 20, carbs: 8, fats: 4, calories: 180 },
                    { name: "Handful of walnuts", protein: 4, carbs: 4, fats: 16, calories: 180 },
                    { name: "1 scoop whey protein in water", protein: 11, carbs: 3, fats: 2, calories: 70 }
                ]
            },
            {
                name: "Lunch",
                time: "1:00–2:00 PM",
                description: "Balanced meal with complex carbs",
                calories: 650,
                foods: [
                    { name: "Grilled chicken breast or paneer (200g)", protein: 50, carbs: 0, fats: 8, calories: 300 },
                    { name: "Brown rice or quinoa (1.5 cups cooked)", protein: 0, carbs: 45, fats: 4, calories: 250 },
                    { name: "Mixed vegetables with olive oil (1 tsp)", protein: 0, carbs: 5, fats: 8, calories: 100 }
                ]
            },
            {
                name: "Pre-Workout",
                time: "4:00–4:30 PM",
                description: "Energy for training",
                calories: 430,
                foods: [
                    { name: "1 banana + 2 rice cakes with peanut butter", protein: 4, carbs: 40, fats: 10, calories: 310 },
                    { name: "1 scoop whey protein", protein: 24, carbs: 5, fats: 2, calories: 120 }
                ]
            },
            {
                name: "Post-Workout",
                time: "6:30–7:00 PM",
                description: "Recovery nutrition",
                calories: 330,
                foods: [
                    { name: "Whey protein shake with milk (1 scoop in 300ml milk)", protein: 30, carbs: 15, fats: 8, calories: 280 },
                    { name: "2 dates or 1 slice of white bread", protein: 2, carbs: 10, fats: 2, calories: 50 }
                ]
            },
            {
                name: "Dinner",
                time: "8:30–9:00 PM",
                description: "Protein-rich dinner with healthy carbs",
                calories: 600,
                foods: [
                    { name: "Grilled salmon / tofu / chicken (200g)", protein: 45, carbs: 0, fats: 15, calories: 350 },
                    { name: "Sweet potato (1 cup)", protein: 0, carbs: 30, fats: 0, calories: 150 },
                    { name: "Green salad with olive oil dressing", protein: 0, carbs: 5, fats: 10, calories: 100 }
                ]
            },
            {
                name: "Bedtime Snack",
                time: "10:00–10:30 PM",
                description: "Slow-digesting protein before bed",
                calories: 250,
                foods: [
                    { name: "Cottage cheese (100g) + 1 tbsp peanut butter", protein: 20, carbs: 5, fats: 15, calories: 250 },
                    { name: "Optional: Casein protein if available", protein: 0, carbs: 0, fats: 0, calories: 0 }
                ]
            }
        ],
        recommendations: [
            "Calorie Intake: 300–600 kcal surplus above maintenance (based on TDEE)",
            "Protein: 1.6–2.2 g/kg of body weight",
            "Carbohydrates: High: 5–7 g/kg/day for energy and recovery",
            "Fats: Moderate: 0.8–1.2 g/kg/day",
            "Water: 3–4 liters/day",
            "Meal Frequency: 5–6 meals/day spaced every 2.5–3 hours"
        ],
        mealTiming: [
            "Breakfast: 7:30–8:00 AM",
            "Mid-Morning Snack: 10:30–11:00 AM",
            "Lunch: 1:00–2:00 PM",
            "Pre-Workout: 4:00–4:30 PM",
            "Post-Workout: 6:30–7:00 PM",
            "Dinner: 8:30–9:00 PM",
            "Bedtime Snack: 10:00–10:30 PM"
        ]
    }
};

// Function to initialize the diet plan
function initializeDietPlan() {
    try {
        // Get user data from localStorage
        const userData = JSON.parse(localStorage.getItem('userData')) || { bodyType: 'mesomorph' };
        const bodyType = userData.bodyType.toLowerCase();
        const plan = dietPlans[bodyType];

        if (!plan) {
            console.error('Invalid body type');
            return;
        }

        console.log('Initializing diet plan for body type:', bodyType); // Debug log

        // Update body type and macros
        document.getElementById('currentBodyType').textContent = bodyType.charAt(0).toUpperCase() + bodyType.slice(1);
        document.getElementById('dailyCalories').textContent = plan.calories;
        document.getElementById('proteinGrams').textContent = `${plan.macros.protein}g`;
        document.getElementById('carbsGrams').textContent = `${plan.macros.carbs}g`;
        document.getElementById('fatsGrams').textContent = `${plan.macros.fats}g`;

        // Calculate macro percentages for the circles
        const totalMacros = plan.macros.protein + plan.macros.carbs + plan.macros.fats;
        const proteinPercentage = (plan.macros.protein / totalMacros) * 100;
        const carbsPercentage = (plan.macros.carbs / totalMacros) * 100;
        const fatsPercentage = (plan.macros.fats / totalMacros) * 100;

        // Update the circle backgrounds
        document.querySelector('.macro-circle.protein').style.background = 
            `conic-gradient(#FF6B6B ${proteinPercentage}%, #f0f0f0 ${proteinPercentage}%)`;
        document.querySelector('.macro-circle.carbs').style.background = 
            `conic-gradient(#4ECDC4 ${carbsPercentage}%, #f0f0f0 ${carbsPercentage}%)`;
        document.querySelector('.macro-circle.fats').style.background = 
            `conic-gradient(#FFE66D ${fatsPercentage}%, #f0f0f0 ${fatsPercentage}%)`;

        // Update meals section
        const mealGrid = document.getElementById('mealGrid');
        mealGrid.innerHTML = ''; // Clear existing content

        console.log('Adding meals to grid:', plan.meals.length, 'meals'); // Debug log

        // Add all meals to the grid
        plan.meals.forEach(meal => {
            const mealCard = document.createElement('div');
            mealCard.className = 'meal-card';
            
            let foodsList = meal.foods.map(food => 
                `<div class="food-item">
                    <div class="food-name">${food.name}</div>
                    <div class="food-macros">
                        <span class="macro protein">P: ${food.protein}g</span>
                        <span class="macro carbs">C: ${food.carbs}g</span>
                        <span class="macro fats">F: ${food.fats}g</span>
                        <span class="calories">${food.calories} cal</span>
                    </div>
                </div>`
            ).join('');

            mealCard.innerHTML = `
                <div class="meal-header">
                    <h4>${meal.name}</h4>
                    <p class="meal-description">${meal.description}</p>
                    <div class="meal-calories">${meal.calories} calories</div>
                </div>
                <div class="meal-content">
                    <div class="foods-list">
                        ${foodsList}
                    </div>
                </div>
            `;
            mealGrid.appendChild(mealCard);
        });

        // Update recommendations
        const recommendationsDiv = document.getElementById('foodRecommendations');
        recommendationsDiv.innerHTML = `
            <ul class="recommendations-list">
                ${plan.recommendations.map(rec => 
                    `<li>
                        <span class="recommendation-icon"><i class="fas fa-check"></i></span>
                        <span class="recommendation-text">${rec}</span>
                    </li>`
                ).join('')}
            </ul>
        `;

        // Update meal timing
        const mealTimingDiv = document.getElementById('mealTiming');
        mealTimingDiv.innerHTML = `
            <ul class="timing-list">
                ${plan.mealTiming.map(timing => 
                    `<li>
                        <span class="timing-icon"><i class="fas fa-clock"></i></span>
                        <span class="timing-text">${timing}</span>
                    </li>`
                ).join('')}
            </ul>
        `;

        console.log('Diet plan initialization complete'); // Debug log
    } catch (error) {
        console.error('Error initializing diet plan:', error);
    }
}

// Update when user data changes in another tab
window.addEventListener('storage', function(e) {
    if (e.key === 'userData') {
        initializeDietPlan();
    }
});

function createMealCard(meal) {
    const mealCard = document.createElement('div');
    mealCard.className = 'meal-card';

    const mealHeader = document.createElement('div');
    mealHeader.className = 'meal-header';

    const mealTitle = document.createElement('h4');
    mealTitle.textContent = meal.name;
    mealHeader.appendChild(mealTitle);

    if (meal.time) {
        const mealTime = document.createElement('p');
        mealTime.className = 'meal-time';
        mealTime.textContent = meal.time;
        mealHeader.appendChild(mealTime);
    }

    if (meal.description) {
        const mealDescription = document.createElement('p');
        mealDescription.className = 'meal-description';
        mealDescription.textContent = meal.description;
        mealHeader.appendChild(mealDescription);
    }

    if (meal.calories) {
        const mealCalories = document.createElement('div');
        mealCalories.className = 'meal-calories';
        mealCalories.textContent = `${meal.calories} calories`;
        mealHeader.appendChild(mealCalories);
    }

    mealCard.appendChild(mealHeader);

    const mealContent = document.createElement('div');
    mealContent.className = 'meal-content';

    // Handle both array of strings and array of objects for foods
    if (Array.isArray(meal.foods)) {
        const foodsList = document.createElement('div');
        foodsList.className = 'foods-list';

        meal.foods.forEach(food => {
            const foodItem = document.createElement('div');
            foodItem.className = 'food-item';

            if (typeof food === 'string') {
                // Simple food item (string)
                foodItem.innerHTML = `<div class="food-name">${food}</div>`;
            } else {
                // Detailed food item (object with macros)
                foodItem.innerHTML = `
                    <div class="food-name">${food.name}</div>
                    <div class="food-macros">
                        <span class="macro protein">P: ${food.protein}g</span>
                        <span class="macro carbs">C: ${food.carbs}g</span>
                        <span class="macro fats">F: ${food.fats}g</span>
                        <span class="calories">${food.calories} cal</span>
                    </div>
                `;
            }

            foodsList.appendChild(foodItem);
        });

        mealContent.appendChild(foodsList);
    }

    mealCard.appendChild(mealContent);
    return mealCard;
}

function displayMeals(meals) {
    const mealGrid = document.getElementById('mealGrid');
    mealGrid.innerHTML = '';
    meals.forEach(meal => {
        mealGrid.appendChild(createMealCard(meal));
    });
}

function calculateIdealWeight(height, gender) {
    // Height should be in cm
    // Returns weight in kg
    let idealWeight = 0;
    
    if (gender === 'male') {
        // Robinson formula for men
        idealWeight = 52 + (1.9 * ((height - 152.4) / 2.54));
    } else {
        // Robinson formula for women
        idealWeight = 49 + (1.7 * ((height - 152.4) / 2.54));
    }
    
    // Calculate weight ranges
    const ranges = {
        min: Math.round(idealWeight * 0.90),
        ideal: Math.round(idealWeight),
        max: Math.round(idealWeight * 1.10)
    };
    
    return ranges;
}

function calculateBMI(weight, height) {
    // Weight in kg, height in cm
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    return Math.round(bmi * 10) / 10;
}

function getWeightStatus(bmi) {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal weight';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
}

function updateWeightRecommendations() {
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const genderSelect = document.getElementById('gender');
    const weightStatusElement = document.getElementById('weightStatus');
    
    if (!heightInput || !weightInput || !genderSelect) return;
    
    const height = parseFloat(heightInput.value);
    const weight = parseFloat(weightInput.value);
    const gender = genderSelect.value;
    
    if (height && weight && gender) {
        const bmi = calculateBMI(weight, height);
        const idealWeightRanges = calculateIdealWeight(height, gender);
        
        // Update the weight status display
        const status = getWeightStatus(bmi);
        const weightDifference = weight - idealWeightRanges.ideal;
        
        let recommendationText = `
            <div class="weight-status">
                <h4>Body Composition Analysis</h4>
                <p>Current BMI: ${bmi} (${status})</p>
                <p>Ideal Weight Range: ${idealWeightRanges.min}kg - ${idealWeightRanges.max}kg</p>
                <p>Target Weight: ${idealWeightRanges.ideal}kg</p>
        `;
        
        if (Math.abs(weightDifference) > 2) {
            if (weightDifference > 0) {
                recommendationText += `<p>Consider losing ${Math.round(weightDifference)}kg for optimal health.</p>`;
            } else {
                recommendationText += `<p>Consider gaining ${Math.round(Math.abs(weightDifference))}kg for optimal health.</p>`;
            }
        } else {
            recommendationText += `<p>Your weight is within the ideal range!</p>`;
        }
        
        recommendationText += `</div>`;
        
        if (weightStatusElement) {
            weightStatusElement.innerHTML = recommendationText;
        }
        
        // Update recommended diet plan based on status and goals
        updateRecommendedDietPlan(status, bmi, gender);
    }
}

function updateRecommendedDietPlan(weightStatus, bmi, gender) {
    const dietRecommendationElement = document.getElementById('dietRecommendation');
    if (!dietRecommendationElement) return;
    
    let recommendedPlan = '';
    
    switch(weightStatus) {
        case 'Underweight':
            recommendedPlan = 'bulked';
            break;
        case 'Normal weight':
            if (bmi < 22) {
                recommendedPlan = 'lean';
            } else {
                recommendedPlan = 'ripped';
            }
            break;
        case 'Overweight':
        case 'Obese':
            recommendedPlan = 'ripped';
            break;
    }
    
    const planText = `
        <div class="diet-recommendation">
            <h4>Recommended Diet Plan</h4>
            <p>Based on your body composition, we recommend the ${recommendedPlan.toUpperCase()} diet plan.</p>
            <p>This plan will help you achieve your ideal body weight while maintaining healthy muscle mass.</p>
        </div>
    `;
    
    dietRecommendationElement.innerHTML = planText;
}

// Add event listeners to form inputs
document.addEventListener('DOMContentLoaded', function() {
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const genderSelect = document.getElementById('gender');
    
    if (heightInput && weightInput && genderSelect) {
        heightInput.addEventListener('input', updateWeightRecommendations);
        weightInput.addEventListener('input', updateWeightRecommendations);
        genderSelect.addEventListener('change', updateWeightRecommendations);
    }
}); 