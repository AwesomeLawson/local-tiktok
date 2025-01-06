# **Download Your TikTok Videos/View Offline**

This project is a Node.js application designed to make an offline copy of your liked/favorited TikTok videos. It includes a sequence of scripts that:

1. Preprocess HTML content.
2. Parse the HTML into structured JSON metadata.
3. Download videos from the parsed metadata.
4. Download corresponding thumbnail images.

---

## **Description**

This application automates the process of downloading TikTok videos and thumbnails by parsing a provided HTML file. It extracts video metadata such as URLs, usernames, video IDs, and  descriptions, and then downloads the media files for offline viewing. Additionally, it includes a simple local web page for browsing the downloaded video library. The heavy lifting for this application is made possible by RapidAPI Hub that downloads TikTok videos. You'll need to sign up for a license. The free tier allows 150 downloads per month. If you have more than that, like I did, you'll need to pay $5 for a month's access to hundreds of thousanads of downloads. Here's the page where I started my account with them and signed up https://rapidapi.com/elisbushaj2/api/tiktok-video-downloader-api.

If you want to send a thanks or support you can always buy me a coffee: https://buymeacoffee.com/mattlawson
---

## **Getting Started**
### **Save your TikTok video library as HTML**
  - Open TikTok in the browser on a computer.
  - Open your profile and choose the tab where you have your saved content like Favorites or Liked.
  - Scroll all the way to the bottom of the page to load all the videos. TikTok uses something called lazy loading so you need to scroll down all the way to force it to load your whole library.
  - Open Developer Tools in your browser. This is F12 in Chrome on the PC.
  - Click the button on the upper left of the Developer Tools pane that allows you to select an element. It will turn the icon blue in Chrome on the PC.
  - Click any video thumbnail. You should notice the Elements tab is open and a section is highlighted that oyu just clicked.
  - Scroll up until you see a <div tag with an attribute called data-e2e with a value of user-liked-item-list
  - Right click that line and choose Edit as HTML. The element is opened as HTML and editable.
  - Select the whole contents by right-clicking, choosing select all, then right-clicking and choosing copy.
  - Open Notepad or any text editor and paste these HTML contents for use later.
  - Back in your browser close developer tools by using the "x" in the upper right or pressing F12 again.
  - Pat yourself on the back because it all gets easier from here.

### **Sign up for a RapidAPI Hub TikTok API Key**
  - Follow the instructions here: https://rapidapi.com/elisbushaj2/api/tiktok-video-downloader-api
  - When you see the API key in the test application copy it to Notepad or a text editor and save it for later.

### **Dependencies**

- **Node.js** (version 14 or later)
  - Download from [Node.js official website](https://nodejs.org/).
  - Verify installation:
    ```bash
    node -v
    npm -v
    ```
- **Git** (optional, for cloning the repository)
  - Download from [Git official website](https://git-scm.com/).
  - Verify installation:
    ```bash
    git --version
    ```

### **Installing**

There are two ways to get the project files:

**Option 1: Clone the Repository**

```bash
git clone https://github.com/your-username/tiktok-video-processor.git
cd tiktok-video-processor
```

**Option 2: Download as a ZIP File**

1. Click the **"Code"** button on the GitHub repository page.
2. Select **"Download ZIP"**.
3. Extract the ZIP file.
4. Navigate to the extracted folder in a terminal or command prompt:
   ```bash
   cd path/to/tiktok-video-processor
   ```

Once you have the project files, run the following command to install the required dependencies:

```bash
npm install
```

---

## **Executing Program**

### **Loading your TikTok library into the application**
Copy and paste the HTML from the Getting Started step into the file called tiktok-favorites.html.

### **Use your API Key**
Open download-videos.js and look for PUT YOUR API KEY HERE and replace that with the mix of letters and numbers from RapidAPI Hub.

### **Running the Applicaiton Script**

The application script `app.js` runs all the processing steps in sequence. Use the following command:

```bash
node app.js
```

This will execute the following scripts in order:

1. `preprocess-html.js`: Prepares the raw HTML for parsing.
2. `parse-html-to-json.js`: Extracts video metadata and saves it as a JSON file.
3. `download-videos.js`: Downloads the videos based on the parsed metadata.
4. `download-thumbnails.js`: Downloads the thumbnail images for the videos.

### **Running Individual Scripts**

If you prefer to run each script individually, you can use the following commands:

1. **Preprocess HTML**:
   ```bash
   node preprocess-html.js
   ```
2. **Parse HTML to JSON**:
   ```bash
   node parse-html-to-json.js
   ```
3. **Download Videos**:
   ```bash
   node download-videos.js
   ```
4. **Download Thumbnails**:
   ```bash
   node download-thumbnails.js
   ```

---

## **Viewing Your Saved TikTok Videos**

### **Install a simple web server**
The http-server is a simple web server that serves index.html to your browser. Your files are only accessible locally. Use the following command to install it:

```bash
npm install http-server -g
```

### **Starting the web server**
When you're ready to view your library type the following command in the tiktok-video-downloader folder:

```bash
http-server
```

The web server will start and run on port 8080 by default.

### **Viewing the web page**
You can browser to http://172.0.0.1:8080 to view the web page or hold control and click the link listed on the command prompt.

## **Help**

If you encounter any issues, ensure that:

1. Node.js and npm are installed correctly.
2. All dependencies have been installed using `npm install`.
3. The HTML file `tiktok-favorites.html` contains valid TikTok video data.

For further assistance, feel free to contact the author.

---

## **File Structure**

```
/tiktok-video-processor
|
├── videos                     # Empty folder for downloaded videos
├── thumbnails                 # Empty folder for downloaded thumbnails
├── app.js                     # Master script to run all steps in sequence
├── preprocess-html.js         # Preprocesses raw HTML for parsing
├── parse-html-to-json.js      # Parses HTML into structured JSON metadata
├── download-videos.js         # Downloads TikTok videos based on metadata
├── download-thumbnails.js     # Downloads thumbnail images for videos
├── tiktok-favorites.html      # Empty HTML file for your TikTok video list
├── tiktok-favorites.json      # Parsed JSON output from the HTML file
├── index.html                 # Single page TikTok library viewer
└── README.md                  # Project documentation
```

---

## **Output**

- Videos will be downloaded to the `/videos` folder.
- Thumbnails will be downloaded to the `/thumbnails` folder.

---

## **Version History**

- **1.0**
  - Initial release

---

## **License**

This project is licensed under the [MIT License](LICENSE). See the `LICENSE` file for details.

---

## **Authors**

- **Matt Lawson**  
  *mattlawson80@gmail.com*  
  GitHub: [AwesomeLawson](https://github.com/AwesomeLawson)

---

## **Acknowledgments**

Special thanks to:

- [RapidAPI Hub](https://rapidapi.com/elisbushaj2/api/tiktok-video-downloader-api)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Cheerio Library](https://cheerio.js.org/)
- [PurpleBooth](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2) for the README template
