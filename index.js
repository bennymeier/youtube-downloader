const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const { google } = require('googleapis');
const contentDisposition = require('content-disposition');
const app = express();
const port = process.env.PORT || 4000;
const db = require('./db');
const statisticRoutes = require('./routes');
// initialize the Youtube API library
const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_KEY,
});

async function searchYouTube(params = {}) {
  const res = await youtube.search.list({
    part: 'snippet',
    type: 'video',
    ...params,
  });
  return res.data;
}

/**
 * Fake a cookie to avoid being identified as a bot.
 */
const reqOptions = {
  requestOptions: {
    headers: {
      Cookie:
        'CONSENT=YES+DE.de+V14+BX; VISITOR_INFO1_LIVE=kYpNG7OoCbY; ID_TOKEN=QUFFLUhqbGY1b2lSSTFxem5uNDctV09oeDhuSm93azZ4Z3w; PREF=al=de&f4=4000000; SID=3geAZGdQt9hIJxt0ST2xySpK_6yaw0kvNarw6v9JTDpZQoKQ5FK1nYqc3dXGQzpM4GRWbA.; __Secure-3PSID=3geAZGdQt9hIJxt0ST2xySpK_6yaw0kvNarw6v9JTDpZQoKQ_zINvfbB7jPNTk2I3oTLYg.; HSID=ApvJR6aSSMIpzAioX; SSID=A4qjlas1kBmX90vX0; APISID=uKTdp7kEoR-Th5wk/Ajvd4cTFRNTvsnnPY; SAPISID=h6Tyds3npH_icpOT/Ae34WsO4j7jVpaLFp; __Secure-3PAPISID=h6Tyds3npH_icpOT/Ae34WsO4j7jVpaLFp; LOGIN_INFO=AFmmF2swRQIhAOZ3RDhhitXMYTD-meEWipRIFho5YaO05aGgteYU2w9SAiA-OKgaB64v_a2AWsOfiJk1JJW6miXXu64EibIGjReNdg:QUQ3MjNmeGs2UTRLWDVYNDNnUVNGRFQ0bThEeGl0ZVpJd2haQldweWpJbFNLTEMtNlJHRmJGTlE2SDc3Rkdyb282elprUllkQnRqc0RJYnNiUzhYNnJ3MENBYjNkcmo2dnFqTFNtMDJCTTJBdV9MMlNvYmdiS2xaOFZvUjFsTk5OX0xFZGQ2M2x1SFZKbEZFSFJ1Z3RXeUxfXzNGZmxsZTdkV3dFWFBOUElMN1B0T0pKemw2aU1F; YSC=hgmjViK_jxo; SIDCC=AJi4QfHbV2YQFgcCjOAOdQG0JWvpGtoxBGtAhNp3rJyU223hoL_CV6Aj3BrLOiQYlZEgVrCwg1I; __Secure-3PSIDCC=AJi4QfGrxA6SlqFGd46AK01jAKdxmwFHWC9u4uFW1t4dnB3lhPCZ-3Gr-Bv2E5LK55HMANtVMQ',
    },
  },
};

app.use(cors());
app.use(express.json());
app.use('/api', statisticRoutes);
const server = app.listen(port, () => console.log(`Server is running on port ${port}`));

/**
 * Get available formats of the video given with the URL.
 */
app.get('/formats', async (req, res) => {
  try {
    const videoURL = req.query.url;
    const formats = await ytdl.getInfo(videoURL);
    res.status(200).json(formats.formats);
  } catch (error) {
    console.error('Error while getting the formats:', error);
    res.status(500).send('Some error occured while getting the formats.');
  }
});

/**
 * Get suggestions depending on the search query/value.
 */
app.get('/suggestions', async (req, res) => {
  const { search, next = null } = req.query;
  try {
    db.collection('searchstatistics').insertOne({ searchInput: search });
    const data = await searchYouTube({
      q: search,
      // nextPageToken: next,
      pageToken: next,
      maxResults: 14,
    });
    const { items, nextPageToken, pageInfo, regionCode, prevPageToken } = data;
    return res.status(200).json({
      success: true,
      data: items,
      pagingInfo: { ...pageInfo, nextPageToken, regionCode, prevPageToken },
    });
  } catch (error) {
    console.error(error);
    if (error.status === 403) {
      return res
        .status(403)
        .json({ success: false, error, limitExceeded: true });
    }
    return res.status(400).json({ success: false, error, limitExceeded: true });
  }
});

/**
 * Get information about a video.
 */
app.get('/metainfo', async (req, res) => {
  const { url } = req.query;
  if (!ytdl.validateID(url) && !ytdl.validateURL(url)) {
    return res
      .status(400)
      .json({ success: false, error: 'No valid YouTube Id!' });
  }
  try {
    const result = await ytdl.getInfo(url);
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ success: false, error });
  }
});

/**
 * Download a video with the selected format.
 */
app.get('/watch', async (req, res) => {
  const { v: url, format: f = '.mp4' } = req.query;
  if (!ytdl.validateID(url) && !ytdl.validateURL(url)) {
    return res
      .status(400)
      .json({ success: false, error: 'No valid YouTube Id!' });
  }
  const formats = ['.mp4', '.mp3', '.mov', '.flv'];
  let format = f;
  if (formats.includes(f)) {
    format = f;
  }

  try {
    const result = await ytdl.getBasicInfo(url);
    const {
      videoDetails: { title, videoId, uploadDate, likes, category, author },
    } = result;
    const videoInfo = {
      title,
      videoId,
      uploadDate,
      likes,
      category,
      authorId: author.id,
      downloadedFormat: format,
    };
    db.collection('downloadstatistics').insertOne(videoInfo);
    res.setHeader(
      'Content-Disposition',
      contentDisposition(`${title}${format}`)
    );

    /**
     * Fix this hack
     */
    let filterQuality = 'audioandvideo';
    if (format === '.mp3') {
      filterQuality = 'audioonly';
    }
    ytdl(url, { format, filter: filterQuality })
      .on('progress', (chunkLength, downloaded, total) => {
        // const download = (downloaded / 1024 / 1024).toFixed(2);
        // const tot = (total / 1024 / 1024).toFixed(2);
        // const progress = Math.ceil((download / tot) * 100);
        // console.log(`${download}MB of ${tot}MB\n`);
      })
      .pipe(res);
  } catch (err) {
    console.error('error ', err);
    res.redirect(`http://${req.headers.host}?error=downloadError`);
  }
});
