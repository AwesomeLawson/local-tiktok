const fs = require('fs');
const axios = require('axios');
const path = require('path');

// Function to download a thumbnail and save it to a specified path
const downloadThumbnail = async (thumbnailUrl, outputFilePath) => {
  try {
    const response = await axios({
      method: 'GET',
      url: thumbnailUrl,
      responseType: 'stream', // Stream the image content
    });

    const writer = fs.createWriteStream(outputFilePath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', () => {
        console.log(`Thumbnail saved as ${outputFilePath}`);
        resolve();
      });
      writer.on('error', (err) => {
        console.error(`Error writing thumbnail to ${outputFilePath}:`, err.message);
        reject(err);
      });
    });
  } catch (error) {
    console.error(`Error downloading thumbnail from ${thumbnailUrl}:`, error.message);
    throw error;
  }
};

// Main function to process thumbnails
(async () => {
  try {
    // Read and parse the JSON file containing metadata
    const metadata = JSON.parse(fs.readFileSync('tiktok-favorites.json', 'utf8'));

    // Ensure the thumbnails directory exists
    const thumbnailsDir = path.join(__dirname, 'thumbnails');
    if (!fs.existsSync(thumbnailsDir)) {
      fs.mkdirSync(thumbnailsDir, { recursive: true });
    }

    // Get a list of already downloaded thumbnail files
    const existingFiles = fs.readdirSync(thumbnailsDir)
      .filter(file => file.endsWith('.image'))
      .map(file => path.basename(file, '.image')); // Extract filenames without extension

    console.log(`Existing thumbnails: ${existingFiles.join(', ')}`);

    // Loop over each video metadata object
    for (const video of metadata) {
      if (video.thumbnailUrl && video.videoId) {
        if (existingFiles.includes(video.videoId)) {
          console.log(`Skipping already downloaded thumbnail: ${video.videoId}`);
          continue; // Skip this thumbnail
        }

        try {
          const outputFilePath = path.join(thumbnailsDir, `${video.videoId}.image`);
          await downloadThumbnail(video.thumbnailUrl, outputFilePath);
        } catch (error) {
          console.error(`Failed to download thumbnail for video ${video.videoId}:`, error.message);
        }
      } else {
        console.warn('Skipping thumbnail with missing URL or ID:', video);
      }
    }

    console.log('All thumbnails have been processed.');
  } catch (error) {
    console.error('Error processing thumbnails:', error.message);
  }
})();
