// scripts/fetch-youtube-videos-batch.js
import https from 'https';
import fs from 'fs';

function extractVideoId(url) {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

function fetchVideoData(videoId) {
    return new Promise((resolve, reject) => {
        const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;

        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (error) {
                    reject(error);
                }
            });
        }).on('error', reject);
    });
}

function suggestCategory(title) {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('mock test')) return 'Mock Tests';
    if (lowerTitle.includes('test route') || lowerTitle.includes('test centre')) return 'Test Routes';
    if (lowerTitle.includes('tip') || lowerTitle.includes('mistake')) return 'Tips & Tricks';
    if (lowerTitle.includes('student') || lowerTitle.includes('learner')) return 'Student Tests';
    return 'Driving Lessons';
}

async function processUrls(urls) {
    const results = [];

    for (const url of urls) {
        const videoId = extractVideoId(url.trim());
        if (!videoId) continue;

        try {
            const data = await fetchVideoData(videoId);
            const category = suggestCategory(data.title);
            results.push({
                id: videoId,
                title: data.title.replace(/"/g, '\\"'),
                description: "Add your description here",
                category: category,
            });
            console.log(`✅ Fetched: ${data.title}`);
        } catch (error) {
            console.error(`❌ Failed: ${videoId}`);
        }
    }

    return results;
}

// Read URLs from file or command line
const urlsFile = process.argv[2] || 'urls.txt';

fs.readFile(urlsFile, 'utf8', async (err, data) => {
    if (err) {
        console.error('Create a urls.txt file with one YouTube URL per line');
        return;
    }

    const urls = data.split('\n').filter(line => line.trim());
    console.log(`\n🎬 Processing ${urls.length} videos...\n`);

    const results = await processUrls(urls);

    console.log('\n' + '='.repeat(80));
    console.log('Copy this into your videos.ts array:\n');

    results.forEach(video => {
        console.log(`  {`);
        console.log(`    id: "${video.id}",`);
        console.log(`    title: "${video.title}",`);
        console.log(`    description: "${video.description}",`);
        console.log(`    category: "${video.category}",`);
        console.log(`  },`);
    });

    console.log('\n' + '='.repeat(80) + '\n');
});
