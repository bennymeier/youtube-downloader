import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import ytdl from '@distube/ytdl-core';
import { google } from 'googleapis';
import contentDisposition from 'content-disposition';
import dotenv from 'dotenv';
import { sendMail } from './sendMail';
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



app.listen(port, () => console.log(`Server is running on port ${port}`));
app.use(cors());
app.use(express.json());

app.post('/contact', async (req: Request, res: Response) => {
  try {
    const { email, issueType, description } = req.body;

    if (!email || !issueType || !description) {
      res.status(400).json({ message: 'All fields are required.' });
    }
    const mailOptions = {
      from: `"YouTubdle.com" ${process.env.MAIL_USER}`,
      to: process.env.MAIL_TO as string,
      subject: "YouTubdle.com Form",
      replyTo: email,
      text: `Nachricht von: ${email}\n\n${description}`,
    };

    const result = await sendMail(mailOptions);

    if (result.success) {
      res.json({ success: true, message: 'Deine Nachricht wurde erfolgreich gesendet.' });
    } else {
      res.status(500).json({ success: false, message: 'Fehler beim Senden deiner Nachricht.' });
    }
  } catch (error) {
    console.error('Error while sending the email:', error);
    res.status(500).send('Some error occurred while sending the email.');
  }
});

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

/**
 * Get suggestions depending on the search query/value.
 */
app.get('/suggestions', async (req: Request, res: Response) => {
  const { search, next = null } = req.query as { search?: string; next?: string | null };

  try {
    const data = await searchYouTube({
      q: search,
      // nextPageToken: next,
      pageToken: next as any,
      maxResults: 14,
    });

    // @ts-ignore
    const { items, nextPageToken, pageInfo, regionCode, prevPageToken } = data;
    res.status(200).json({
      success: true,
      data: items,
      pagingInfo: { ...pageInfo, nextPageToken, regionCode, prevPageToken },
    });
  } catch (error: any) {
    console.error(error);
    if (error.status === 403) {
      res.status(403).json({ success: false, error, limitExceeded: true });
    }
    res.status(400).json({ success: false, error, limitExceeded: true });
  }
});

/**
 * Get information about a video.
 */
app.get('/metainfo', async (req: Request, res: Response) => {
  const url = req.query.url as string;

  if (!ytdl.validateID(url) && !ytdl.validateURL(url)) {
    res.status(400).json({ success: false, error: 'No valid YouTube Id!' });
  }

  try {
    const result = await ytdl.getInfo(url);
    res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ success: false, error });
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
    res.status(400).json({ success: false, error: 'No valid YouTube Id!' });
  }

  const formats = ['.mp4', '.mp3', '.mov', '.flv'];
  let format: string = formats.includes(f) ? f : '.mp4';

  try {
    const result = await ytdl.getBasicInfo(url as string);
    const {
      videoDetails: { title },
    } = result;
    res.setHeader('Content-Disposition', contentDisposition(`${title}${format}`));

    let filterQuality: 'audioandvideo' | 'audioonly' = format === '.mp3' ? 'audioonly' : 'audioandvideo';
    ytdl(url as string, { filter: filterQuality })
      .pipe(res);
  } catch (err: any) {
    console.error('error', err);
    res.redirect(`http://${req.headers.host}?error=downloadError`);
  }
});