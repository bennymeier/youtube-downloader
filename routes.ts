import express from 'express';
import { getDownloads as DownloadControllerGetDownloads } from './controllers/download_controller';
import { getSearchs as SearchControllerGetSearchs } from './controllers/search_controller';

const router = express.Router();

router.get('/download', DownloadControllerGetDownloads);
router.get('/search', SearchControllerGetSearchs);

export default router;
