document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in and has completed setup
    const userData = UserManagement.getCurrentUser();
    if (!UserManagement.isLoggedIn() || !userData || !userData.completedSetup) {
        window.location.href = 'index.html';
        return;
    }

    // Display user's name
    if (userData.name) {
        document.getElementById('userName').textContent = `Welcome, ${userData.name}`;
    }

    // Get DOM elements
    const difficultyBtns = document.querySelectorAll('.difficulty-btn');
    const bodyPartCards = document.querySelectorAll('.body-part-card');
    const exercisesContainer = document.getElementById('exercisesContainer');

    // Initialize current level
    let currentLevel = 'beginner';

    // Exercise data with updated GIF URLs
    const exercises = {
        chest: {
            beginner: [
                { name: 'Push-ups', description: 'Basic push-up movement', sets: 3, reps: '10-12', gifUrl: 'https://thumbs.gfycat.com/GlossySkinnyDuckbillcat-size_restricted.gif' },
                { name: 'Incline Push-ups', description: 'Easier variation of push-ups', sets: 3, reps: '12-15', gifUrl: 'https://thumbs.gfycat.com/UnhappyDesertedKakarikis-size_restricted.gif' },
                { name: 'Knee Push-ups', description: 'Modified push-ups for beginners', sets: 3, reps: '12-15', gifUrl: 'https://thumbs.gfycat.com/SpectacularTerrificChanticleer-size_restricted.gif' },
                { name: 'Wall Push-ups', description: 'Standing push-ups against wall', sets: 3, reps: '15-20', gifUrl: 'https://thumbs.gfycat.com/FaroffShorttermBear-size_restricted.gif' }
            ],
            intermediate: [
                { name: 'Diamond Push-ups', description: 'Close grip push-ups', sets: 3, reps: '12-15', gifUrl: 'https://thumbs.gfycat.com/FocusedMindlessGermanshepherd-size_restricted.gif' },
                { name: 'Wide Push-ups', description: 'Wide grip push-ups', sets: 3, reps: '12-15', gifUrl: 'https://thumbs.gfycat.com/DaringWellwornGrub-size_restricted.gif' },
                { name: 'Decline Push-ups', description: 'Push-ups with feet elevated', sets: 3, reps: '10-12', gifUrl: 'https://thumbs.gfycat.com/UnacceptableInformalGermanspitz-size_restricted.gif' },
                { name: 'Dumbbell Floor Press', description: 'Press dumbbells while lying on floor', sets: 3, reps: '12-15', gifUrl: 'https://thumbs.gfycat.com/SeparateRemarkableGazelle-size_restricted.gif' },
                { name: 'Band Push-ups', description: 'Push-ups with resistance band', sets: 3, reps: '10-12', gifUrl: 'https://thumbs.gfycat.com/GleamingInformalFieldmouse-size_restricted.gif' },
                { name: 'Archer Push-ups', description: 'Unilateral push-up variation', sets: 3, reps: '8-10 each side', gifUrl: 'https://thumbs.gfycat.com/DentalScratchyHyracotherium-size_restricted.gif' }
            ],
            pro: [
                { name: 'One Arm Push-ups', description: 'Single arm push-up', sets: 3, reps: '6-8 each side', gifUrl: 'https://thumbs.gfycat.com/WanPhysicalGoose-size_restricted.gif' },
                { name: 'Clap Push-ups', description: 'Explosive push-ups with clap', sets: 3, reps: '8-10', gifUrl: 'https://thumbs.gfycat.com/ImmaterialSpottedArcherfish-size_restricted.gif' },
                { name: 'Ring Push-ups', description: 'Push-ups on gymnastic rings', sets: 3, reps: '10-12', gifUrl: 'https://thumbs.gfycat.com/PleasantShrillBuck-size_restricted.gif' },
                { name: 'Weighted Push-ups', description: 'Push-ups with added weight', sets: 3, reps: '8-10', gifUrl: 'https://thumbs.gfycat.com/GleamingDelayedDodo-size_restricted.gif' },
                { name: 'Planche Push-ups', description: 'Advanced push-up variation', sets: 3, reps: '6-8', gifUrl: 'https://thumbs.gfycat.com/UnhealthyInformalElephant-size_restricted.gif' },
                { name: 'Pike Push-ups', description: 'Vertical push-up variation', sets: 3, reps: '8-10', gifUrl: 'https://thumbs.gfycat.com/MeagerHiddenAmericanshorthair-size_restricted.gif' },
                { name: 'Superman Push-ups', description: 'Push-ups with arm/leg raise', sets: 3, reps: '8-10', gifUrl: 'https://thumbs.gfycat.com/FreshSerpentineEwe-size_restricted.gif' },
                { name: 'Explosive Push-ups', description: 'Power-based push-up variation', sets: 3, reps: '6-8', gifUrl: 'https://thumbs.gfycat.com/ImmaterialSpottedArcherfish-size_restricted.gif' },
                { name: 'Handstand Push-ups', description: 'Vertical pressing movement', sets: 3, reps: '5-7', gifUrl: 'https://thumbs.gfycat.com/WelcomeGlassKinglet-size_restricted.gif' }
            ]
        },
        back: {
            beginner: [
                { name: 'Inverted Rows', description: 'Basic horizontal pulling movement', sets: 3, reps: '10-12', gifUrl: 'https://thumbs.gfycat.com/ScratchyImmaterialIndianspinyloach-size_restricted.gif' },
                { name: 'Band Pull-Aparts', description: 'Upper back strengthening', sets: 3, reps: '12-15', gifUrl: 'https://thumbs.gfycat.com/UnfinishedGlossyAntarcticgiantpetrel-size_restricted.gif' },
                { name: 'Superman Holds', description: 'Lower back strengthening', sets: 3, reps: '30 seconds', gifUrl: 'https://thumbs.gfycat.com/FrighteningAgileBear-size_restricted.gif' },
                { name: 'Resistance Band Rows', description: 'Beginner-friendly rowing movement', sets: 3, reps: '12-15', gifUrl: 'https://thumbs.gfycat.com/DentalPoshKingfisher-size_restricted.gif' }
            ],
            intermediate: [
                { name: 'Pull-ups', description: 'Vertical pulling movement', sets: 3, reps: '8-10', gifUrl: 'https://thumbs.gfycat.com/WellmadeUnfinishedAlpineroadguidetigerbeetle-size_restricted.gif' },
                { name: 'Chin-ups', description: 'Underhand grip pull-ups', sets: 3, reps: '8-10', gifUrl: 'https://thumbs.gfycat.com/PleasantPoshKingbird-size_restricted.gif' },
                { name: 'Australian Pull-ups', description: 'Horizontal body rows', sets: 3, reps: '10-12', gifUrl: 'https://thumbs.gfycat.com/ScratchyImmaterialIndianspinyloach-size_restricted.gif' },
                { name: 'Dumbbell Rows', description: 'Single-arm rowing movement', sets: 3, reps: '12 each side', gifUrl: 'https://thumbs.gfycat.com/GratefulSourFish-size_restricted.gif' },
                { name: 'Face Pulls', description: 'Rear deltoid and upper back', sets: 3, reps: '12-15', gifUrl: 'https://thumbs.gfycat.com/UnfinishedGlossyAntarcticgiantpetrel-size_restricted.gif' },
                { name: 'Meadows Rows', description: 'Unilateral back exercise', sets: 3, reps: '10-12 each side', gifUrl: 'https://thumbs.gfycat.com/GratefulSourFish-size_restricted.gif' }
            ],
            pro: [
                { name: 'Weighted Pull-ups', description: 'Pull-ups with added weight', sets: 3, reps: '6-8', gifUrl: 'https://thumbs.gfycat.com/WellmadeUnfinishedAlpineroadguidetigerbeetle-size_restricted.gif' },
                { name: 'One Arm Pull-ups', description: 'Single arm pulling', sets: 3, reps: '3-5 each side', gifUrl: 'https://thumbs.gfycat.com/DentalPoshKingfisher-size_restricted.gif' },
                { name: 'Muscle-ups', description: 'Advanced pulling and pushing', sets: 3, reps: '3-5', gifUrl: 'https://thumbs.gfycat.com/PleasantPoshKingbird-size_restricted.gif' },
                { name: 'Front Lever Rows', description: 'Advanced horizontal pull', sets: 3, reps: '6-8', gifUrl: 'https://thumbs.gfycat.com/ScratchyImmaterialIndianspinyloach-size_restricted.gif' },
                { name: 'Dragon Flags', description: 'Advanced core and back', sets: 3, reps: '5-7', gifUrl: 'https://thumbs.gfycat.com/GratefulSourFish-size_restricted.gif' },
                { name: 'Back Lever', description: 'Static back strength', sets: 3, reps: '10-15s hold', gifUrl: 'https://thumbs.gfycat.com/UnfinishedGlossyAntarcticgiantpetrel-size_restricted.gif' }
            ]
        },
        shoulders: {
            beginner: [
                { name: 'Pike Push-ups', description: 'Modified handstand push-ups', sets: 3, reps: '8-10' },
                { name: 'Lateral Raises', description: 'Side raises for deltoids', sets: 3, reps: '12-15' },
                { name: 'Front Raises', description: 'Forward raises for front deltoids', sets: 3, reps: '12-15' },
                { name: 'Band Shoulder Press', description: 'Overhead press with resistance band', sets: 3, reps: '12-15' }
            ],
            intermediate: [
                { name: 'Military Press', description: 'Strict overhead barbell press', sets: 3, reps: '8-10' },
                { name: 'Arnold Press', description: 'Rotational dumbbell press', sets: 3, reps: '10-12' },
                { name: 'Upright Rows', description: 'Vertical pull for deltoids', sets: 3, reps: '10-12' },
                { name: 'Face Pulls', description: 'Rear deltoid development', sets: 3, reps: '12-15' },
                { name: 'Bent Over Laterals', description: 'Rear deltoid raises', sets: 3, reps: '12-15' },
                { name: 'Push Press', description: 'Explosive overhead press', sets: 3, reps: '8-10' }
            ],
            pro: [
                { name: 'Handstand Push-ups', description: 'Vertical pressing movement', sets: 3, reps: '6-8' },
                { name: 'Single Arm Press', description: 'Unilateral overhead press', sets: 3, reps: '8-10 each' },
                { name: 'Behind Neck Press', description: 'Advanced shoulder press', sets: 3, reps: '8-10' },
                { name: 'Cuban Press', description: 'Complex shoulder movement', sets: 3, reps: '10-12' },
                { name: 'Bradford Press', description: 'Alternating front/back press', sets: 3, reps: '8-10' },
                { name: 'Z Press', description: 'Seated floor press', sets: 3, reps: '8-10' },
                { name: 'Snatch Press', description: 'Olympic lift variation', sets: 3, reps: '6-8' },
                { name: 'Lateral Chain Raises', description: 'Weighted chain raises', sets: 3, reps: '10-12' },
                { name: 'Bottoms-Up Press', description: 'Stability focused press', sets: 3, reps: '8-10' }
            ]
        },
        biceps: {
            beginner: [
                { name: 'Band Curls', description: 'Basic bicep curl with band', sets: 3, reps: '12-15' },
                { name: 'Chin-ups', description: 'Underhand grip pull-ups', sets: 3, reps: '5-8' },
                { name: 'Hammer Curls', description: 'Neutral grip curls', sets: 3, reps: '12-15' },
                { name: 'Concentration Curls', description: 'Isolated bicep curl', sets: 3, reps: '12-15' }
            ],
            intermediate: [
                { name: 'Barbell Curls', description: 'Standing barbell curl', sets: 3, reps: '10-12' },
                { name: 'Incline Curls', description: 'Curls on incline bench', sets: 3, reps: '10-12' },
                { name: 'Preacher Curls', description: 'Supported bicep curls', sets: 3, reps: '10-12' },
                { name: 'Spider Curls', description: 'Prone bench curls', sets: 3, reps: '10-12' },
                { name: '21s', description: 'Partial range curls', sets: 3, reps: '21' },
                { name: 'Zottman Curls', description: 'Rotating dumbbell curls', sets: 3, reps: '10-12' }
            ],
            pro: [
                { name: 'Weighted Chin-ups', description: 'Added weight chin-ups', sets: 3, reps: '6-8' },
                { name: 'Cross Body Curls', description: 'Alternating curls across body', sets: 3, reps: '10-12' },
                { name: 'Drag Curls', description: 'Elbows back curl variation', sets: 3, reps: '10-12' },
                { name: 'Cable Curls', description: 'Constant tension curls', sets: 3, reps: '12-15' },
                { name: 'Reverse Curls', description: 'Forearm focused curls', sets: 3, reps: '12-15' },
                { name: 'Pinwheel Curls', description: 'Dynamic curl variation', sets: 3, reps: '10-12' },
                { name: 'One-Arm Preacher', description: 'Isolated preacher curl', sets: 3, reps: '10-12' },
                { name: 'Isometric Curls', description: 'Static hold curls', sets: 3, reps: '30s hold' },
                { name: 'Eccentric Curls', description: 'Slow negative curls', sets: 3, reps: '8-10' }
            ]
        },
        triceps: {
            beginner: [
                { name: 'Diamond Push-ups', description: 'Close grip push-ups', sets: 3, reps: '10-12' },
                { name: 'Bench Dips', description: 'Basic tricep dips', sets: 3, reps: '12-15' },
                { name: 'Band Pushdowns', description: 'Band tricep extension', sets: 3, reps: '12-15' },
                { name: 'Kickbacks', description: 'Isolation extension', sets: 3, reps: '12-15' }
            ],
            intermediate: [
                { name: 'Skull Crushers', description: 'Lying tricep extension', sets: 3, reps: '10-12' },
                { name: 'Overhead Extension', description: 'Standing extension', sets: 3, reps: '10-12' },
                { name: 'Parallel Bar Dips', description: 'Full range dips', sets: 3, reps: '10-12' },
                { name: 'Close Grip Bench', description: 'Narrow grip press', sets: 3, reps: '8-10' },
                { name: 'JM Press', description: 'Hybrid extension/press', sets: 3, reps: '8-10' },
                { name: 'Rope Pushdowns', description: 'Cable extension', sets: 3, reps: '12-15' }
            ],
            pro: [
                { name: 'Weighted Dips', description: 'Added weight dips', sets: 3, reps: '8-10' },
                { name: 'Ring Dips', description: 'Unstable dips', sets: 3, reps: '8-10' },
                { name: 'Tate Press', description: 'Elbows out extension', sets: 3, reps: '10-12' },
                { name: 'Rolling Extensions', description: 'Dynamic extension', sets: 3, reps: '10-12' },
                { name: 'Decline Skull Crushers', description: 'Decline bench extension', sets: 3, reps: '10-12' },
                { name: 'One Arm Extensions', description: 'Unilateral movement', sets: 3, reps: '10-12 each' },
                { name: 'Reverse Grip Pushdown', description: 'Supinated extension', sets: 3, reps: '12-15' },
                { name: 'Overhead Rope Extension', description: 'Standing rope extension', sets: 3, reps: '12-15' },
                { name: 'Band Assisted Dips', description: 'Assisted bodyweight dips', sets: 3, reps: '12-15' }
            ]
        },
        forearms: {
            beginner: [
                { name: 'Wrist Curls', description: 'Basic wrist flexion', sets: 3, reps: '15-20' },
                { name: 'Reverse Wrist Curls', description: 'Basic wrist extension', sets: 3, reps: '15-20' },
                { name: 'Farmers Walks', description: 'Walking with weights', sets: 3, reps: '30s' },
                { name: 'Band Rotations', description: 'Wrist rotations', sets: 3, reps: '15 each' }
            ],
            intermediate: [
                { name: 'Hammer Curls', description: 'Neutral grip curls', sets: 3, reps: '12-15' },
                { name: 'Plate Pinches', description: 'Static plate holds', sets: 3, reps: '30s' },
                { name: 'Behind Back Curls', description: 'Wrist curl variation', sets: 3, reps: '12-15' },
                { name: 'Towel Pull-ups', description: 'Grip strength pull-ups', sets: 3, reps: '6-8' },
                { name: 'Zottman Curls', description: 'Curl and rotation', sets: 3, reps: '10-12' },
                { name: 'Dead Hangs', description: 'Bar hanging', sets: 3, reps: '45s' }
            ],
            pro: [
                { name: 'Fat Grip Training', description: 'Thick bar exercises', sets: 3, reps: '8-10' },
                { name: 'Captains of Crush', description: 'Gripper training', sets: 3, reps: '6-8' },
                { name: 'Sledgehammer Levering', description: 'Wrist strength', sets: 3, reps: '8-10' },
                { name: 'Rope Climbs', description: 'Full body grip work', sets: 3, reps: '1-2 climbs' },
                { name: 'One Arm Dead Hangs', description: 'Single arm hangs', sets: 3, reps: '20s each' },
                { name: 'Bottoms Up KB Walk', description: 'Stability carries', sets: 3, reps: '30s' },
                { name: 'Rolling Thunder', description: 'Dynamic grip work', sets: 3, reps: '6-8' },
                { name: 'Axle Dead Holds', description: 'Thick bar holds', sets: 3, reps: '30s' },
                { name: 'Pinch Block Carries', description: 'Thumb strength', sets: 3, reps: '30s' }
            ]
        },
        legs: {
            beginner: [
                { name: 'Bodyweight Squats', description: 'Basic squat movement', sets: 3, reps: '15-20' },
                { name: 'Lunges', description: 'Forward stepping lunge', sets: 3, reps: '12 each' },
                { name: 'Glute Bridges', description: 'Hip extension', sets: 3, reps: '15-20' },
                { name: 'Calf Raises', description: 'Standing calf raise', sets: 3, reps: '20-25' }
            ],
            intermediate: [
                { name: 'Goblet Squats', description: 'Weighted front squat', sets: 3, reps: '12-15' },
                { name: 'Bulgarian Split Squats', description: 'Single leg squat', sets: 3, reps: '10-12 each' },
                { name: 'Romanian Deadlifts', description: 'Hip hinge movement', sets: 3, reps: '10-12' },
                { name: 'Step Ups', description: 'Elevated stepping', sets: 3, reps: '12 each' },
                { name: 'Walking Lunges', description: 'Moving lunges', sets: 3, reps: '20 steps' },
                { name: 'Jump Squats', description: 'Explosive squats', sets: 3, reps: '12-15' }
            ],
            pro: [
                { name: 'Pistol Squats', description: 'Single leg squat', sets: 3, reps: '6-8 each' },
                { name: 'Shrimp Squats', description: 'Advanced single leg', sets: 3, reps: '6-8 each' },
                { name: 'Box Jumps', description: 'Explosive jumping', sets: 3, reps: '8-10' },
                { name: 'Sissy Squats', description: 'Quad focused squat', sets: 3, reps: '10-12' },
                { name: 'Nordic Curls', description: 'Hamstring focused', sets: 3, reps: '6-8' },
                { name: 'Dragon Squats', description: 'Complex movement', sets: 3, reps: '8-10' },
                { name: 'Cossack Squats', description: 'Lateral movement', sets: 3, reps: '8-10 each' },
                { name: 'Single Leg RDL', description: 'Unilateral hinge', sets: 3, reps: '10-12 each' },
                { name: 'Plyometric Lunges', description: 'Jumping lunges', sets: 3, reps: '12 each' }
            ]
        }
    };

    // Function to update exercise counts based on difficulty level
    function updateExerciseCounts() {
        const counts = {
            'beginner': 4,
            'intermediate': 6,
            'pro': 9
        };
        
        document.querySelectorAll('.exercise-count .count').forEach(countElement => {
            countElement.textContent = counts[currentLevel];
        });
    }

    // Handle difficulty button clicks
    difficultyBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            difficultyBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentLevel = this.getAttribute('data-level');
            updateExerciseCounts();
        });
    });

    // Initial update of exercise counts
    updateExerciseCounts();

    // Show exercises in full-screen overlay
    function showExercises(bodyPart) {
        console.log('Showing exercises for:', bodyPart, 'at level:', currentLevel);
        
        // Get exercises for the selected body part and level
        let exerciseList = exercises[bodyPart]?.[currentLevel] || [];
        console.log('Found exercises:', exerciseList);

        // Define required count for each level
        const requiredCount = {
            'beginner': 4,
            'intermediate': 6,
            'pro': 9
        };

        // Ensure we have the correct number of exercises for the current level
        exerciseList = exerciseList.slice(0, requiredCount[currentLevel]);

        // If we don't have enough exercises, duplicate some to meet the required count
        while (exerciseList.length < requiredCount[currentLevel]) {
            const index = exerciseList.length % (exercises[bodyPart]?.[currentLevel]?.length || 1);
            exerciseList.push({...exercises[bodyPart][currentLevel][index]});
        }

        // Create modal content
        const modalContent = `
            <div class="exercises-overlay">
                <button class="close-exercises" id="closeExercises">&times;</button>
                <h2 class="section-title">${bodyPart.charAt(0).toUpperCase() + bodyPart.slice(1)} Exercises - ${currentLevel.charAt(0).toUpperCase() + currentLevel.slice(1)} Level</h2>
                <div class="exercises-grid">
                    ${exerciseList.map(exercise => `
                        <div class="exercise-card">
                            <div class="exercise-info">
                                <h3>${exercise.name}</h3>
                                <p>${exercise.description}</p>
                                <div class="exercise-details">
                                    <span><i class="fas fa-redo"></i> ${exercise.sets} sets</span>
                                    <span><i class="fas fa-repeat"></i> ${exercise.reps} reps</span>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        // Update container content and show it
        exercisesContainer.innerHTML = modalContent;
        exercisesContainer.style.display = 'block';
        setTimeout(() => {
            exercisesContainer.classList.add('active');
        }, 10);

        // Handle closing the modal
        function closeExercisesContainer() {
            exercisesContainer.classList.remove('active');
            setTimeout(() => {
                exercisesContainer.style.display = 'none';
            }, 300);
            document.body.style.overflow = 'auto';
            document.removeEventListener('keydown', escapeHandler);
            exercisesContainer.removeEventListener('click', containerClickHandler);
        }

        // Add close button functionality
        const closeBtn = document.getElementById('closeExercises');
        if (closeBtn) {
            closeBtn.onclick = function(e) {
                e.stopPropagation();
                closeExercisesContainer();
            };
        }

        // Close on escape key
        function escapeHandler(e) {
            if (e.key === 'Escape') {
                closeExercisesContainer();
            }
        }
        document.addEventListener('keydown', escapeHandler);

        // Prevent scrolling of background when overlay is open
        document.body.style.overflow = 'hidden';

        // Add click event to close overlay when clicking outside cards
        function containerClickHandler(e) {
            if (e.target.classList.contains('exercises-overlay')) {
                closeExercisesContainer();
            }
        }
        exercisesContainer.addEventListener('click', containerClickHandler);
    }

    // Handle body part card clicks
    bodyPartCards.forEach(card => {
        card.addEventListener('click', function() {
            const bodyPart = this.getAttribute('data-part');
            showExercises(bodyPart);
        });
    });
}); 