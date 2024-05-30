const mongoose = require('mongoose');
const config = require('../config');

const dbUrl = config.dbUrlMongoDB ;

mongoose.connect(dbUrl, {})
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });

module.exports = mongoose;
