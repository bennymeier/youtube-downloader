const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DownloadStatistic = new Schema(
  {
    videoId: { required: true, type: String },
    title: { required: true, type: String },
    uploadDate: { type: String },
    likes: { type: Number },
    category: { type: String },
    authorId: { type: String },
    downloadedFormat: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('downloadstatistics', DownloadStatistic);
