import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import ytdl from 'ytdl-core';
import { google } from 'googleapis';
import contentDisposition from 'content-disposition';
import db from './db';
import statisticRoutes from './routes';
import dotenv from 'dotenv';
dotenv.config();

const app: Express = express();
const port: string | number = process.env.PORT || 4000;

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_KEY,
});


interface SearchParams {
  q?: string;
  pageToken?: string;
  maxResults?: number;
}

async function searchYouTube(params: SearchParams = {}) {
  const res = await youtube.search.list({
    // @ts-ignore
    part: 'snippet',
    type: 'video',
    ...params,
  });
  return (res as any).data;
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

app.listen(port, () => console.log(`Server is running on port ${port}`));
app.use(cors());
app.use(express.json());
app.use('/api', statisticRoutes);

app.get('/formats', async (req: Request, res: Response) => {
  try {
    const videoURL: string = req.query.url as string;
    const formats = await ytdl.getInfo(videoURL);
    res.status(200).json(formats.formats);
  } catch (error) {
    console.error('Error while getting the formats:', error);
    res.status(500).send('Some error occurred while getting the formats.');
  }
});

interface YouTubeSearchResult {
  items: any[];
  nextPageToken: string;
  pageInfo: any;
  regionCode: string;
  prevPageToken?: string;
}

/**
 * Get suggestions depending on the search query/value.
 */
app.get('/suggestions', async (req: Request, res: Response) => {
  const { search, next = null } = req.query as { search?: string; next?: string | null };

  try {
    await db.collection('searchstatistics').insertOne({ searchInput: search });

    const data = await searchYouTube({
      q: search,
      // nextPageToken: next,
      pageToken: next as any,
      maxResults: 14,
    });

    // @ts-ignore
    const { items, nextPageToken, pageInfo, regionCode, prevPageToken } = data;
    return res.status(200).json({
      success: true,
      data: items,
      pagingInfo: { ...pageInfo, nextPageToken, regionCode, prevPageToken },
    });
  } catch (error: any) {
    console.error(error);
    if (error.status === 403) {
      return res.status(403).json({ success: false, error, limitExceeded: true });
    }
    return res.status(400).json({ success: false, error, limitExceeded: true });
  }
});

/**
 * Get information about a video.
 */
app.get('/metainfo', async (req: Request, res: Response) => {
  const url = req.query.url as string;

  if (!ytdl.validateID(url) && !ytdl.validateURL(url)) {
    return res.status(400).json({ success: false, error: 'No valid YouTube Id!' });
  }

  try {
    const result = await ytdl.getInfo(url);
    return res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    console.error(error);
    return res.status(400).json({ success: false, error });
  }
});

/**
 * Download a video with the selected format.
 */
app.get('/watch', async (req: Request, res: Response) => {
  const { v: url, format: f = '.mp4' } = req.query as {
    v?: string;
    format?: string;
  };

  if (url === undefined || (!ytdl.validateID(url) && !ytdl.validateURL(url))) {
    return res.status(400).json({ success: false, error: 'No valid YouTube Id!' });
  }

  const formats = ['.mp4', '.mp3', '.mov', '.flv'];
  let format: string = formats.includes(f) ? f : '.mp4';

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

    await db.collection('downloadstatistics').insertOne(videoInfo);
    res.setHeader('Content-Disposition', contentDisposition(`${title}${format}`));

    let filterQuality: 'audioandvideo' | 'audioonly' = format === '.mp3' ? 'audioonly' : 'audioandvideo';
    ytdl(url, { filter: filterQuality })
      .on('progress', (chunkLength: number, downloaded: number, total: number) => {
      })
      .pipe(res);
  } catch (err: any) {
    console.error('error', err);
    res.redirect(`http://${req.headers.host}?error=downloadError`);
  }
});