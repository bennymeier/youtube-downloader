const mongoose = require('mongoose');

mongoose
  .connect(
    'mongodb+srv://benny:swootsi1@cluster0.tdsnn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .catch((e) => {
    console.error('Connection error', e.message);
  });

const db = mongoose.connection;

module.exports = db;
