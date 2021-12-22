const SearchStatistic = require('./search_model');

const createSearch = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a search!',
    });
  }

  try {
    const download = new SearchStatistic(body);
    await download.save();
    return res.status(201).json({
      success: true,
      data: download,
      message: 'Search Statistics created!',
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error,
      message: 'Search Statistics not created!',
    });
  }
};

const getSearchs = async (req, res) => {
  try {
    const downloads = await SearchStatistic.find({});

    if (!downloads.length) {
      return res
        .status(404)
        .json({ success: false, error: `Search Statistics not found` });
    }

    return res.status(200).json({ success: true, data: downloads });
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
};

module.exports = {
  createSearch,
  getSearchs,
};
