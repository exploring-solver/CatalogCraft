require('dotenv').config();

const config = {
  port: 3018,
  // dbUrlMongoDB: "mongodb://localhost:27017/ondc",
  dbUrlMongoDB: process.env.dbUrlMongoDB,
  API_KEY_JWT: process.env.API_KEY_JWT,
  TOKEN_EXPIRES_IN: process.env.TOKEN_EXPIRES_IN,
};

module.exports = config;
