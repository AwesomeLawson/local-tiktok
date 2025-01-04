const fs = require('fs');
const cheerio = require('cheerio');
const path = require('path');

// Function to parse video metadata from a given HTML chunk
const parseVideoMetadata = (htmlChunk) => {
    const $ = cheerio.load(htmlChunk);
  
    // Extract video URL
    const videoUrl = $('a[href*="tiktok.com"]').attr('href') || null;
  
    // Extract username from the video URL
    const username = videoUrl ? videoUrl.match(/@([\w.-]+)/)?.[1] : null;
  
    // Extract videoId from the video URL
    const videoId = videoUrl ? videoUrl.match(/video\/(\d+)/)?.[1] : null;
  
    // Extract thumbnail URL
    const thumbnailUrl = $('img').attr('src') || null;
  
    // Extract description from the 'alt' attribute of the <img> tag
    const description = $('img').attr('alt') || null;
   
    return {
      videoUrl,
      username,
      videoId,
      thumbnailUrl,
      description,
    };
  };

// Function to parse the HTML and chunk it by divs with a specific class
const chunkHtmlByDivClass = (htmlContent, targetClass) => {
  const $ = cheerio.load(htmlContent);
  const parsedChunks = [];

  // Select all divs with the target class
  $(`div.${targetClass}`).each((_, element) => {
    const chunkHtml = $(element).html(); // Get the inner HTML of the div
    const parsedData = parseVideoMetadata(chunkHtml); // Parse the chunk using your custom function
    parsedChunks.push(parsedData); // Add the parsed data to the array
  });

  return parsedChunks;
};

// Main function
const processHtmlFile = async (inputFilePath, outputFilePath, targetClass) => {
  try {
    // Read the HTML file
    const htmlContent = fs.readFileSync(inputFilePath, 'utf8');

    // Chunk and parse the HTML by div class
    const parsedDataArray = chunkHtmlByDivClass(htmlContent, targetClass);

    // Write the JSON array to a file
    fs.writeFileSync(outputFilePath, JSON.stringify(parsedDataArray, null, 2));

    console.log(`Successfully processed HTML and saved to ${outputFilePath}`);
  } catch (error) {
    console.error('Error processing HTML file:', error.message);
  }
};

// Example usage
const inputFilePath = path.join(__dirname, 'tiktok-favorites.html'); // Path to your HTML file
const outputFilePath = path.join(__dirname, 'tiktok-favorites.json'); // Path to the output JSON file
const targetClass = 'css-1uqux2o-DivItemContainerV2'; // Replace with the actual class name in your HTML

processHtmlFile(inputFilePath, outputFilePath, targetClass);