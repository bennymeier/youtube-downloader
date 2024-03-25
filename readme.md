# YouTube Downloader built with React & Node.js

Just paste a link or search to download your video. The available formats are mp4, mp3, mov and flv.

## Features

- Built in search 🔍
- 4 formats 🤘
- Fast in grabbing information and downloading 🚀
- "Show More" Button at the end of suggestions for more suggestions
- Suggestions 🦾
- Download History (safe in localStorage) 🗃️
- Responsive and built with [Chakra-UI](https://chakra-ui.com/) Framework 😎
- Also usable on iOS & Android 📱

## Coming Soon

- Trends Page/Top 100 most downloaded videos (maybe with filters: regionCode, category, ...)
- Playlist-Downloads
- Show progressbar for download-state
- Quality choice (480p, 720p, 1080p, 4k)
- Fast batch download (insert multiple urls and download automatically)
- Preview video before download
- Edit start and end points of a video
- Contact form for submitting features or bugs
- Deploy a chrome extension (possible? allowed?)
- Electron desktop app (.exe file downloadable)

## Feature on [youtubdle.com](https://youtubdle.com)

Direct download while not leaving YouTube: paste **dl** between youtub**dl**e.com and direct download the video!

## Example

From: `https://www.youtube.com/watch?v=dvgZkm1xWPE` to: `https://www.youtubdle.com/watch?v=dvgZkm1xWPE`

## Screenshots

![](https://raw.githubusercontent.com/bennymeier/new-youtube-downloader/master/.github/download_preview.png)
![](https://raw.githubusercontent.com/bennymeier/new-youtube-downloader/master/.github/suggestions.png)
![](https://raw.githubusercontent.com/bennymeier/new-youtube-downloader/master/.github/download_preview_dark.png)
![](https://raw.githubusercontent.com/bennymeier/new-youtube-downloader/master/.github/suggestions_dark.png)
![](https://raw.githubusercontent.com/bennymeier/new-youtube-downloader/master/.github/download_preview_loading.png)
![](https://raw.githubusercontent.com/bennymeier/new-youtube-downloader/master/.github/suggestions_loading.png)
![](https://raw.githubusercontent.com/bennymeier/new-youtube-downloader/master/.github/changelog.png)

## Stack

### Backend

- Node.js
- Express
- Mongoose

### Frontend

- React
- TypeScript
- axios
- Chakra-UI

## How to setup

### Backend

Edit `nodemon.json` and fill in your personal YouTube-API-Key and MongoDB URL (`MONGODB_URL`, `YOUTUBE_KEY`)
In the project directory you can run:

`npm install`

`npm run dev` for starting backend

### Frontend

Switch to frontend with `cd client`
In the project directory you can run:

`npm install`

`npm run start` for starting frontend
