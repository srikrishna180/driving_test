// scripts/fetch-youtube-video.js
import https from 'https';
import readline from 'readline';

// Extract video ID from YouTube URL
function extractVideoId(url) {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

// Fetch video data from YouTube oEmbed API (no API key needed!)
function fetchVideoData(videoId) {
    return new Promise((resolve, reject) => {
        const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;

        https.get(url, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                try {
                    const videoData = JSON.parse(data);
                    resolve(videoData);
                } catch (error) {
                    reject(new Error('Failed to parse video data'));
                }
            });
        }).on('error', (error) => {
            reject(error);
        });
    });
}

// Suggest category based on title keywords
function suggestCategory(title) {
    const lowerTitle = title.toLowerCase();

    if (lowerTitle.includes('mock test') || lowerTitle.includes('mock driving')) {
        return 'Mock Tests';
    }
    if (lowerTitle.includes('test route') || lowerTitle.includes('test centre') || lowerTitle.includes('test center')) {
        return 'Test Routes';
    }
    if (lowerTitle.includes('tip') || lowerTitle.includes('mistake') || lowerTitle.includes('avoid') || lowerTitle.includes('guide')) {
        return 'Tips & Tricks';
    }
    if (lowerTitle.includes('student') || lowerTitle.includes('learner') || lowerTitle.includes('passed') || lowerTitle.includes('failed')) {
        return 'Student Tests';
    }
    return 'Driving Lessons';
}

// Generate TypeScript object
function generateTSObject(videoId, videoData, category) {
    const title = videoData.title.replace(/"/g, '\\"');

    return `  {
    id: "${videoId}",
    title: "${title}",
    description: "Add your description here",
    category: "${category}",
  },`;
}

// Process single video
async function processVideo(rl) {
    return new Promise((resolve) => {
        rl.question('Paste YouTube URL: ', async (url) => {
            const videoId = extractVideoId(url);

            if (!videoId) {
                console.error('❌ Invalid YouTube URL\n');
                resolve(false);
                return;
            }

            console.log(`\n✅ Video ID: ${videoId}`);
            console.log('🔍 Fetching video data...\n');

            try {
                const videoData = await fetchVideoData(videoId);
                const suggestedCategory = suggestCategory(videoData.title);

                console.log('📹 Video Title:', videoData.title);
                console.log('👤 Channel:', videoData.author_name);
                console.log('🏷️  Suggested Category:', suggestedCategory);
                console.log('\n' + '='.repeat(80) + '\n');
                console.log('Copy this into your videos.ts array:\n');
                console.log(generateTSObject(videoId, videoData, suggestedCategory));
                console.log('\n' + '='.repeat(80) + '\n');

                resolve(true);

            } catch (error) {
                console.error('❌ Error fetching video data:', error.message, '\n');
                resolve(false);
            }
        });
    });
}

// Ask to continue
function askToContinue(rl) {
    return new Promise((resolve) => {
        rl.question('Add another video? (y/n): ', (answer) => {
            resolve(answer.toLowerCase() === 'y');
        });
    });
}

// Main function
async function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    console.log('\n🎬 YouTube Video Data Fetcher for videos.ts\n');
    console.log('Categories: Mock Tests | Test Routes | Tips & Tricks | Student Tests | Driving Lessons\n');

    let continueProcessing = true;

    while (continueProcessing) {
        await processVideo(rl);
        continueProcessing = await askToContinue(rl);
    }

    console.log('\n✅ Done!\n');
    rl.close();
}

// Run the script
main();
