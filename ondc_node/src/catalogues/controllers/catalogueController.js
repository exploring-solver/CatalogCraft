// src/catalogue/controllers/catalogueController.js
const Catalogue = require('../models/catalogue');
const Category = require('../models/categories');
const SellerCatalogue = require('../models/sellerCatalogue');
const CatalogueTemplate = require('../models/catalogueTemplate');
const { parseExcelFile, getMatchingCatalogues } = require('../services/imageSearch');
const mongoose = require('../../../services/mongoose');
// const cv = require('opencv4nodejs');

// Get catalogue of logged-in user
exports.getUserCatalogues = async (req, res) => {
  try {
    const userId = req.user._id;
    const sellerCatalogues = await SellerCatalogue.find({ seller: userId }).populate('catalogue');
    res.status(200).json(sellerCatalogues);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new catalogue or link seller with existing catalogue
exports.createCatalogue = async (req, res) => {
  try {
    const catalogueData = req.body;

    // Check if a catalogue with the provided UPC already exists
    const existingCatalogue = await Catalogue.findOne({ upc: catalogueData.upc });
    if (existingCatalogue) {
      // If a catalogue with the UPC exists, link the seller with the existing catalogue
      const sellerCatalogueData = {
        seller: req.user._id,
        catalogue: existingCatalogue._id,
        selling_price: catalogueData.selling_price,
        hsn_code: catalogueData.hsn_code,
        quantity: catalogueData.quantity,
        seller_sku: catalogueData.seller_sku,
        product_image_6: catalogueData.product_image_6,
        product_image_7: catalogueData.product_image_7,
        product_image_8: catalogueData.product_image_8,
        product_image_9: catalogueData.product_image_9,
        product_image_10: catalogueData.product_image_10
      };

      const sellerCatalogue = new SellerCatalogue(sellerCatalogueData);
      await sellerCatalogue.save();

      return res.status(201).json({ message: 'Seller linked with existing catalogue' });
    }
    else {
      // Find the category by name
      const category = await Category.findOne({ category: catalogueData.category });
      if (!category) {
        return res.status(400).json({ error: 'Invalid category' });
      }

      // Replace the category name with the category _id
      catalogueData.category = category._id;

      // Create a new catalogue
      const catalogue = new Catalogue(catalogueData);
      await catalogue.save();

      // Create a new SellerCatalogue entry
      const sellerCatalogueData = {
        seller: req.user._id,
        catalogue: catalogue._id,
        selling_price: catalogueData.selling_price,
        hsn_code: catalogueData.hsn_code,
        quantity: catalogueData.quantity,
        seller_sku: catalogueData.seller_sku,
        product_image_6: catalogueData.product_image_6,
        product_image_7: catalogueData.product_image_7,
        product_image_8: catalogueData.product_image_8,
        product_image_9: catalogueData.product_image_9,
        product_image_10: catalogueData.product_image_10
      };
      const sellerCatalogue = new SellerCatalogue(sellerCatalogueData);
      await sellerCatalogue.save();

      res.status(201).json({ message: 'Catalogue created successfully' });
    }
    
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all catalogues
exports.getAllCatalogues = async (req, res) => {
  try {
    const catalogues = await Catalogue.find().populate('category');
    res.status(200).json(catalogues);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().select('category');
    res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get catalogues by category
exports.getCataloguesByCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ category: req.params.category });
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const catalogues = await Catalogue.find({ category: category._id });
    res.status(200).json(catalogues);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all catalogues by category
exports.getAllCataloguesByCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    const resultData = {};

    for (const category of categories) {
      const catalogues = await Catalogue.find({ category: category._id });
      resultData[category.category] = catalogues;
    }

    res.status(200).json(resultData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Trial route
exports.trial = (req, res) => {
  res.send('Trial route working');
};

// Get catalogue by ID
exports.getCatalogueById = async (req, res) => {
  try {
    const catalogue = await Catalogue.findById(req.params.id);
    if (!catalogue) {
      return res.status(404).json({ error: 'Catalogue not found' });
    }
    res.status(200).json(catalogue);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Upload product details from CSV
exports.uploadCSV = async (req, res) => {
  try {
    const productName = req.body.name;
    if (!productName) {
      return res.status(400).json({ error: 'Missing product name in request data' });
    }

    const productData = await parseExcelFile('src/catalogues/ondc.xlsx', productName);
    if (productData) {
      res.status(200).json(productData);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Search similar images
exports.searchSimilarImages = async (req, res) => {
  try {
    const imageFile = req.files.image;
    if (!imageFile) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const matchingCatalogues = await getMatchingCatalogues(imageFile.data);
    res.status(200).json(matchingCatalogues);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get catalogues by template name
exports.getTemplateCatalogues = async (req, res) => {
  try {
    const template = await CatalogueTemplate.findOne({ template_name: req.params.template_name }).populate('catalogues');
    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }
    res.status(200).json(template.catalogues);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Search catalogues
exports.searchCatalogues = async (req, res) => {
  try {
    const query = req.query.query;
    if (!query) {
      return res.status(400).json({ error: 'A search query is required' });
    }

    const catalogues = await Catalogue.find({
      $or: [
        { product_name: { $regex: query, $options: 'i' } },
        { asin: { $regex: query, $options: 'i' } },
        { upc: { $regex: query, $options: 'i' } }
      ]
    });

    res.status(200).json(catalogues);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getAllTemplates = async (req, res) => {
  try {
    const templates = await CatalogueTemplate.find().select('template_name -_id');
    const templateNames = templates.map(template => template.template_name);
    res.status(200).json(templateNames);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};