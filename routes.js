const express = require('express');
const DownloadController = require('./controllers/download_controller');
const SearchController = require('./controllers/search_controller');
const router = express.Router();

router.get('/download', DownloadController.getDownloads);
router.get('/search', SearchController.getSearchs);

module.exports = router;
