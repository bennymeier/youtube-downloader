const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SearchStatistic = new Schema(
  {
    videoId: { required: true, type: String },
    searchInput: { required: true, type: String },
    channelId: { type: String },
    channelTitle: { type: String },
    publishedAt: { type: String },
    title: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('searchstatistic', SearchStatistic);
