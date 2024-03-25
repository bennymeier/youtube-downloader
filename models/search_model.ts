import mongoose from 'mongoose';

const SearchStatisticSchema = new mongoose.Schema(
  {
    searchInput: { required: true, type: String },
  },
  { timestamps: true }
);

export default mongoose.model('searchstatistics', SearchStatisticSchema);
