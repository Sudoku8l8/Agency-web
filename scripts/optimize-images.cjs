const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Check if sharp is installed
try {
    require.resolve('sharp');
} catch (e) {
    console.log('Installing sharp...');
    try {
        execSync('npm install sharp', { stdio: 'inherit' });
    } catch (err) {
        console.error('Failed to install sharp. Please run "npm install sharp" manually.');
        process.exit(1);
    }
}

const sharp = require('sharp');

const PUBLIC_DIR = path.join(__dirname, '../public');
const QUALITY = 80;

async function optimizeImages() {
    console.log('🔍 Scanning for images in public directory...');

    const files = fs.readdirSync(PUBLIC_DIR);
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png)$/i.test(file));

    console.log(`Found ${imageFiles.length} images to optimize.`);

    for (const file of imageFiles) {
        const inputPath = path.join(PUBLIC_DIR, file);
        const filename = path.parse(file).name;
        const outputPath = path.join(PUBLIC_DIR, `${filename}.webp`);

        if (fs.existsSync(outputPath)) {
            console.log(`⏭️  Skipping ${file} (WebP already exists)`);
            continue;
        }

        try {
            await sharp(inputPath)
                .webp({ quality: QUALITY })
                .toFile(outputPath);

            const originalSize = fs.statSync(inputPath).size;
            const newSize = fs.statSync(outputPath).size;
            const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);

            console.log(`✅ Converted ${file} -> ${filename}.webp (${savings}% savings)`);
        } catch (error) {
            console.error(`❌ Error converting ${file}:`, error.message);
        }
    }

    console.log('\n✨ Optimization complete!');
}

optimizeImages();
