const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SearchStatistic = new Schema(
  {
    searchInput: { required: true, type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('searchstatistics', SearchStatistic);
