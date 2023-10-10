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
        'CONSENT=PENDING+280; SOCS=CAISEwgDEgk0ODA3MzU0MDIaAmRlIAEaBgiAqp2aBg; VISITOR_INFO1_LIVE=8bYxodZSJIw; PREF=tz=Europe.Berlin&f6=400&f5=20000&f4=4000000&f7=100; LOGIN_INFO=AFmmF2swRQIhAJmmpd3yROUkuXnWwrLCb2HAzmloXfr96dgzNHekOPOGAiAL5rHaKj9HtWPIKj0u-crdXiWMLIUwn8I1tgkVDLLp6g:QUQ3MjNmejlrVjBheElCa3diQ1ZrVElleEdCT1Z0aVc0OUxZZExvOEtlRno5Z2JhTHBIMlJZVnJWejF1bUxlanppeGRsOW5GcndpeGhGa3A0SFVwSzRpOVFQamNkTzd0dTI1eXpwWXNYRGhjdWZJRDBCM3kxS08zNGJnZVZPcFFGb3dpd1gzYmZ6LURJM2I5OWd3YXNHeThGT3pHaXhjRlRR; YSC=ak77CormrmM; HSID=Atlo_4N65b7NzCjZA; SSID=ANGMgxzJsfE9u_3tD; APISID=3RJTTg6kECNp4S1q/ASvNDFmo5NNkKnglh; SAPISID=d3b75xR-fOnxDd1_/AqesXl2CLtxkg-wP1; __Secure-1PAPISID=d3b75xR-fOnxDd1_/AqesXl2CLtxkg-wP1; __Secure-3PAPISID=d3b75xR-fOnxDd1_/AqesXl2CLtxkg-wP1; SID=aQiAZDeuxqzEQMmp3i7in4FhUgDigllT28vn0LXcuCEUrXuS-L2d9nZyuu_SHvMSo07x4A.; __Secure-1PSID=aQiAZDeuxqzEQMmp3i7in4FhUgDigllT28vn0LXcuCEUrXuSOP85sJ9IyGiuDzxjGOAW6g.; __Secure-3PSID=aQiAZDeuxqzEQMmp3i7in4FhUgDigllT28vn0LXcuCEUrXuSY3xZQD3LCIHTMLF8d4BlyA.; VISITOR_PRIVACY_METADATA=CgJERRIA; __Secure-1PSIDTS=sidts-CjIBSAxbGUS91QD9oXw4xABnlybUEaq4uM0VCV_5WHFDgH_rDEC3ygikfy3M5acIVoGVthAA; __Secure-3PSIDTS=sidts-CjIBSAxbGUS91QD9oXw4xABnlybUEaq4uM0VCV_5WHFDgH_rDEC3ygikfy3M5acIVoGVthAA; SIDCC=APoG2W_YNJLKkPDdclkLwaQssea94HwcX9mgJ2FyySwoDmArku60u_UtYI3HvKAel1okPO2hOA; __Secure-1PSIDCC=APoG2W_H5EmDDIRGfKmV6C8Tw4FJE_68V0KGGGlHkUh8UnotWLBWEDRoI5gGOvRnVCvE2WyeGzY; __Secure-3PSIDCC=APoG2W-iSYntdpFMy0T-egBB9rQrParW40BztRlB64g8c-8ZE3cl9e34oX9wQqZ3o5MwojZEVgE',
    },
  },
};

app.use(cors());
app.use(express.json());
app.use('/api', statisticRoutes);
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(port, () => console.log(`Server is running on port ${port}`));

/**
 * Get available formats of the video given with the URL.
 */
app.get('/formats', async (req, res) => {
  try {
    const videoURL = req.query.url;
    const formats = await ytdl.getInfo(videoURL);
    console.log(formats.formats)
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
  db.collection('searchstatistics').insertOne({ searchInput: search });
  try {
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
    return res.status(400).json({ success: false, error });
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
    const result = await ytdl.getInfo(url, reqOptions);
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.log(error);
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
    const result = await ytdl.getBasicInfo(url, reqOptions);
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
    ytdl(url, { format, filter: filterQuality, ...reqOptions })
      .on('progress', (chunkLength, downloaded, total) => {
        // const download = (downloaded / 1024 / 1024).toFixed(2);
        // const tot = (total / 1024 / 1024).toFixed(2);
        // const progress = Math.ceil((download / tot) * 100);
        // console.log(`${download}MB of ${tot}MB\n`);
      })
      .pipe(res);
    res.on('finish', () => console.log('File downloaded!'));
  } catch (err) {
    console.error('error ', err);
    res.redirect(`http://${req.headers.host}?error=downloadError`);
  }
});
