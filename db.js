const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('MongoDB connection established');
  })
  .catch((e) => {
    console.error('Connection error', e.message);
  });

const db = mongoose.connection;

module.exports = db;
