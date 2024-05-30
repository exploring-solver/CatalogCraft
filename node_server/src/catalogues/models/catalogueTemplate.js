// src/catalogue/models/catalogueTemplate.js
const mongoose = require('../../../services/mongoose');

const catalogueTemplateSchema = new mongoose.Schema({
  template_name: {
    type: String,
    required: true
  },
  catalogues: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Catalogue'
  }]
});

const CatalogueTemplate = mongoose.model('CatalogueTemplate', catalogueTemplateSchema);
module.exports = CatalogueTemplate;
