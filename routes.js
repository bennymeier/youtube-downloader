const express = require('express');
const DownloadController = require('./download_controller');
const SearchController = require('./search_controller');
const router = express.Router();

router.post('/download', DownloadController.createDownload);
router.get('/download', DownloadController.getDownloads);
router.post('/search', SearchController.createSearch);
router.get('/search', SearchController.getSearchs);

module.exports = router;
