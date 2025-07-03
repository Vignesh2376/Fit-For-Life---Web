// Exercise GIF URLs for all body parts and difficulty levels
const exerciseGifs = {
    chest: {
        beginner: {
            'Push-ups': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Incline Push-ups': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Knee Push-ups': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Wall Push-ups': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif'
        },
        intermediate: {
            'Diamond Push-ups': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Wide Push-ups': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Decline Push-ups': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Dumbbell Floor Press': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Band Push-ups': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Archer Push-ups': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif'
        },
        pro: {
            'One Arm Push-ups': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Clap Push-ups': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Ring Push-ups': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Weighted Push-ups': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Planche Push-ups': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Pike Push-ups': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Superman Push-ups': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Explosive Push-ups': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Handstand Push-ups': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif'
        }
    },
    back: {
        beginner: {
            'Inverted Rows': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Band Pull-Aparts': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Superman Holds': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Resistance Band Rows': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif'
        },
        intermediate: {
            'Pull-ups': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Chin-ups': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Australian Pull-ups': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Dumbbell Rows': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Face Pulls': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Meadows Rows': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif'
        },
        pro: {
            'Weighted Pull-ups': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'One Arm Pull-ups': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Muscle-ups': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Front Lever Rows': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Dragon Flags': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Back Lever': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif'
        }
    },
    shoulders: {
        beginner: {
            'Pike Push-ups': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Lateral Raises': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Front Raises': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Band Shoulder Press': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif'
        },
        intermediate: {
            'Military Press': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Arnold Press': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Upright Rows': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Face Pulls': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Bent Over Laterals': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Push Press': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif'
        },
        pro: {
            'Handstand Push-ups': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Single Arm Press': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Behind Neck Press': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Cuban Press': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Bradford Press': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Z Press': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Snatch Press': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Lateral Chain Raises': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Bottoms-Up Press': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif'
        }
    },
    biceps: {
        beginner: {
            'Band Curls': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Chin-ups': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Hammer Curls': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Concentration Curls': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif'
        },
        intermediate: {
            'Barbell Curls': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Incline Curls': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Preacher Curls': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Spider Curls': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            '21s': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Zottman Curls': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif'
        },
        pro: {
            'Weighted Chin-ups': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Cross Body Curls': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Drag Curls': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Cable Curls': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Reverse Curls': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Pinwheel Curls': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'One-Arm Preacher': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Isometric Curls': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Eccentric Curls': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif'
        }
    },
    triceps: {
        beginner: {
            'Diamond Push-ups': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Bench Dips': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Band Pushdowns': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Kickbacks': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif'
        },
        intermediate: {
            'Skull Crushers': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Overhead Extension': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Parallel Bar Dips': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Close Grip Bench': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'JM Press': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Rope Pushdowns': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif'
        },
        pro: {
            'Weighted Dips': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Ring Dips': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Tate Press': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Rolling Extensions': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Decline Skull Crushers': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'One Arm Extensions': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Reverse Grip Pushdown': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Overhead Rope Extension': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Band Assisted Dips': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif'
        }
    },
    forearms: {
        beginner: {
            'Wrist Curls': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Reverse Wrist Curls': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Farmers Walks': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Band Rotations': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif'
        },
        intermediate: {
            'Hammer Curls': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Plate Pinches': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Behind Back Curls': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Towel Pull-ups': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Zottman Curls': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Dead Hangs': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif'
        },
        pro: {
            'Fat Grip Training': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Captains of Crush': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Sledgehammer Levering': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Rope Climbs': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'One Arm Dead Hangs': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Bottoms Up KB Walk': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Rolling Thunder': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Axle Dead Holds': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Pinch Block Carries': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif'
        }
    },
    legs: {
        beginner: {
            'Bodyweight Squats': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Lunges': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Glute Bridges': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Calf Raises': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif'
        },
        intermediate: {
            'Goblet Squats': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Bulgarian Split Squats': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Romanian Deadlifts': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Step Ups': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Walking Lunges': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Jump Squats': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif'
        },
        pro: {
            'Pistol Squats': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Shrimp Squats': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Box Jumps': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Sissy Squats': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Nordic Curls': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Dragon Squats': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Cossack Squats': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Single Leg RDL': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
            'Plyometric Lunges': 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif'
        }
    }
};

// Function to get GIF URL for a specific exercise
function getExerciseGif(bodyPart, difficulty, exerciseName) {
    return exerciseGifs[bodyPart]?.[difficulty]?.[exerciseName] || 'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif';
}

// Export for use in other files
export { exerciseGifs, getExerciseGif }; 