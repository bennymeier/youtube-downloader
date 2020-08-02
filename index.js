const express = require("express");
const cors = require("cors");
const ytdl = require("ytdl-core");
const searchYoutube = require("youtube-api-v3-search");
const contentDisposition = require("content-disposition");
const app = express();
const port = process.env.PORT || 4000;
const YOUTUBE_KEY = require("./youtube_key");

// app.use(express.static(__dirname));
app.use(cors());
app.use(express.json());

app.listen(port, () => console.log(`Server is running on port ${port}`));

// app.get("/", (req, res) => {
//     res.sendFile(__dirname + "/index.html");
// });

app.get("/suggestions", async (req, res) => {
  const { search } = req.query;
  const options = {
    q: search,
    part: "snippet",
    type: "video",
  };
  try {
    const data = await searchYoutube(YOUTUBE_KEY, options);
    const { items } = data;
    return res.status(200).json({ success: true, data: items });
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
});

app.get("/metainfo", async (req, res) => {
  const { url } = req.query;
  if (!ytdl.validateID(url) && !ytdl.validateURL(url)) {
    return res
      .status(400)
      .json({ success: false, error: "No valid YouTube Id!" });
  }
  try {
    const result = await ytdl.getBasicInfo(url);
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
});

app.get("/watch", async (req, res) => {
  const { v: url, format: f = "mp4" } = req.query;
  if (!ytdl.validateID(url) && !ytdl.validateURL(url)) {
    return res
      .status(400)
      .json({ success: false, error: "No valid YouTube Id!" });
  }
  const formats = ["mp4", "mp3", "mov", "flv"];
  let format = f;
  if (formats.includes(f)) {
    format = f;
  }
  try {
    const result = await ytdl.getBasicInfo(url);
    const {
      videoDetails: { title },
    } = result;
    res.setHeader(
      "Content-disposition",
      contentDisposition(`${title}.${format}`)
    );
    ytdl(url, { format })
      .on("progress", (chunkLength, downloaded, total) => {
        // const download = (downloaded / 1024 / 1024).toFixed(2);
        // const tot = (total / 1024 / 1024).toFixed(2);
        // const progress = Math.ceil((download / tot) * 100);
        // console.log(`${download}MB of ${tot}MB\n`);
      })
      .pipe(res);
  } catch (err) {
    console.log("error ", err);
    res.redirect(`http://${req.headers.host}?error=downloadError`);
  }
});
