const { spawn } = require('child_process');
const path = require('path');

// List of scripts to run in sequence
const scripts = [
  'preprocess-html.js',
  'parse-html-to-json.js',
  'download-videos.js',
  'download-thumbnails.js'
];

// Function to run a script using child_process spawn
const runScript = (script) => {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(__dirname, script);
    const process = spawn('node', [scriptPath], { stdio: 'inherit' });

    process.on('close', (code) => {
      if (code === 0) {
        console.log(`✔️  ${script} completed successfully.`);
        resolve();
      } else {
        console.error(`❌  ${script} failed with exit code ${code}.`);
        reject(new Error(`${script} failed`));
      }
    });
  });
};

// Main function to run all scripts in sequence
const runAllScripts = async () => {
  try {
    for (const script of scripts) {
      console.log(`▶️  Running ${script}...`);
      await runScript(script); // Wait for each script to complete before moving to the next
    }
    console.log('🎉 All scripts completed successfully!');
  } catch (error) {
    console.error('🚨 Error:', error.message);
  }
};

// Execute the main function
runAllScripts();
