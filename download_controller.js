const DownloadStatistic = require('./download_model');

const createDownload = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a download statistic!',
    });
  }

  try {
    const download = new DownloadStatistic(body);
    await download.save();
    return res.status(201).json({
      success: true,
      data: download,
      message: 'Download Statistics created!',
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error,
      message: 'Download Statistics not created!',
    });
  }
};

const getDownloads = async (req, res) => {
  try {
    const downloads = await DownloadStatistic.find({});

    if (!downloads.length) {
      return res
        .status(404)
        .json({ success: false, error: `Downloads Statistics not found` });
    }

    return res.status(200).json({ success: true, data: downloads });
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
};

module.exports = {
  createDownload,
  getDownloads,
};
