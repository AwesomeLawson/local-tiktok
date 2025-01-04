const fs = require('fs');
const cheerio = require('cheerio');
const path = require('path');

// Function to find the most common class name in the HTML
const findMostCommonClass = (htmlContent) => {
  const $ = cheerio.load(htmlContent);
  const classCounts = {};

  // Iterate over all elements with a class attribute
  $('[class]').each((_, element) => {
    const classList = $(element).attr('class').split(/\s+/); // Split classes by whitespace
    classList.forEach(className => {
      if (className.indexOf('DivItemContainer') > -1) {
        classCounts[className] = (classCounts[className] || 0) + 1;
      }
    });
  });

  // Find the class with the highest count
  const mostCommonClass = Object.entries(classCounts).reduce((max, entry) => {
    return entry[1] > max[1] ? entry : max;
  });

  return mostCommonClass[0]; // Return the most common class name
};

// Function to update the target class in the JavaScript file
const updateTargetClass = (filePath, targetClass) => {
  try {
    let fileContent = fs.readFileSync(filePath, 'utf8');

    // Replace the line containing `const targetClass = ...`
    fileContent = fileContent.replace(
      /const targetClass = '.*';\s*\/\/ Replace with the actual class name in your HTML/,
      `const targetClass = '${targetClass}'; // Replace with the actual class name in your HTML`
    );

    fs.writeFileSync(filePath, fileContent, 'utf8');
    console.log(`Successfully updated target class to '${targetClass}' in ${filePath}`);
  } catch (error) {
    console.error('Error updating the target class:', error.message);
  }
};

// Main function
const main = () => {
  try {
    const htmlFilePath = path.join(__dirname, 'tiktok-favorites.html');
    const jsFilePath = path.join(__dirname, 'parse-html-to-json.js');

    // Read the HTML file
    const htmlContent = fs.readFileSync(htmlFilePath, 'utf8');

    // Find the most common class name
    const mostCommonClass = findMostCommonClass(htmlContent);
    console.log(`Most common class: ${mostCommonClass}`);

    // Update the JavaScript file with the most common class name
    updateTargetClass(jsFilePath, mostCommonClass);
  } catch (error) {
    console.error('Error processing files:', error.message);
  }
};

main();
