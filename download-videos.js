const axios = require('axios');
const fs = require('fs'); // Import the filesystem module
const path = require('path');

const getDownloadUrl = async (videoUrl) => {
    const options = {
        method: 'GET',
        url: 'https://tiktok-video-downloader-api.p.rapidapi.com/media',
        params: {
            videoUrl: videoUrl,
        },
        headers: {
            'x-rapidapi-key': 'PUT YOUR API KEY HERE',
            'x-rapidapi-host': 'tiktok-video-downloader-api.p.rapidapi.com',
        },
    };

    try {
        // Fetch the media information (including downloadUrl)
        const response = await axios.request(options);
        const { downloadUrl } = response.data;

        console.log('First response received, download URL:', downloadUrl);
        return downloadUrl;

    } catch (error) {
        console.error('Error fetching download URL:', error.message);
        throw error;
    }
};

const downloadVideo = async (downloadUrl, filePath) => {
    try {
        const videoStream = await axios({
            method: 'GET',
            url: downloadUrl,
            responseType: 'stream', // Stream the video content
        });

        const writer = fs.createWriteStream(filePath); // Create a writable stream

        // Pipe the video stream into the file
        videoStream.data.pipe(writer);

        // Return a Promise that resolves when the file is fully written
        return new Promise((resolve, reject) => {
            writer.on('finish', () => {
                console.log('Video successfully saved to:', filePath);
                resolve();
            });
            writer.on('error', (err) => {
                console.error('Error writing video to file:', err.message);
                reject(err);
            });
        });

    } catch (error) {
        console.error('Error downloading the video:', error.message);
        throw error;
    }
};

// Main function to read metadata and download all videos
(async () => {
    try {
        // Read and parse the JSON file containing metadata
        const metadata = JSON.parse(fs.readFileSync('tiktok-favorites.json', 'utf8'));

        // Get a list of already downloaded video files
        const downloadedFiles = new Set(
            fs.readdirSync(path.join(__dirname, 'videos'))
                .filter(file => file.endsWith('.mp4')) // Only include .mp4 files
                .map(file => path.parse(file).name) // Get filenames without extensions
        );

        // Loop over each video metadata object
        for (const video of metadata) {
            if (video.videoUrl && video.videoId) {
                // Check if the video has already been downloaded
                if (downloadedFiles.has(video.videoId)) {
                    console.log(`Skipping already downloaded video: ${video.videoId}`);
                    continue; // Skip to the next video
                }

                try {
                    const downloadUrl = await getDownloadUrl(video.videoUrl);
                    const outputFilePath = path.join(__dirname, 'videos', `${video.videoId}.mp4`);
                    await downloadVideo(downloadUrl, outputFilePath);
                } catch (error) {
                    console.error(`Failed to download video ${video.videoId}:`, error.message);
                }
            } else {
                console.warn('Skipping video with missing URL or ID:', video);
            }
        }

        console.log('All videos have been processed.');
    } catch (error) {
        console.error('Error processing videos:', error.message);
    }
})();