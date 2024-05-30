// src/catalogue/models/categories.js
const mongoose = require('../../../services/mongoose');

const categorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    unique: true
  }
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
