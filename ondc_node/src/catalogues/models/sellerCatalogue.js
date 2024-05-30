// src/catalogue/models/sellerCatalogue.js
const mongoose = require('../../../services/mongoose');

const sellerCatalogueSchema = new mongoose.Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  catalogue: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Catalogue',
    required: true
  },
  selling_price: Number,
  hsn_code: String,
  quantity: String,
  seller_sku: String,
  product_image_6: String,
  product_image_7: String,
  product_image_8: String,
  product_image_9: String,
  product_image_10: String,
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

const SellerCatalogue = mongoose.model('SellerCatalogue', sellerCatalogueSchema);
module.exports = SellerCatalogue;
