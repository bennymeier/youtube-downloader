import mongoose from 'mongoose';

const DownloadStatisticSchema = new mongoose.Schema(
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

export default mongoose.model('downloadstatistics', DownloadStatisticSchema);
