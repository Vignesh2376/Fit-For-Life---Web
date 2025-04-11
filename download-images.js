const https = require('https');
const fs = require('fs');
const path = require('path');

// Create the directory if it doesn't exist
const dir = 'assets/images/body-parts';
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

// Image URLs from a free fitness image API
const images = {
    'chest': 'https://api.musclewiki.com/media/uploads/anatomy/chest-front.jpg',
    'back': 'https://api.musclewiki.com/media/uploads/anatomy/back-front.jpg',
    'shoulders': 'https://api.musclewiki.com/media/uploads/anatomy/shoulders-front.jpg',
    'biceps': 'https://api.musclewiki.com/media/uploads/anatomy/biceps-front.jpg',
    'triceps': 'https://api.musclewiki.com/media/uploads/anatomy/triceps-front.jpg',
    'forearms': 'https://api.musclewiki.com/media/uploads/anatomy/forearms-front.jpg',
    'legs': 'https://api.musclewiki.com/media/uploads/anatomy/legs-front.jpg'
};

// Download each image
Object.entries(images).forEach(([name, url]) => {
    const filepath = path.join(dir, `${name}.jpg`);
    https.get(url, (response) => {
        const fileStream = fs.createWriteStream(filepath);
        response.pipe(fileStream);
        fileStream.on('finish', () => {
            console.log(`Downloaded ${name}.jpg`);
        });
    }).on('error', (err) => {
        console.error(`Error downloading ${name}.jpg:`, err.message);
    });
}); 