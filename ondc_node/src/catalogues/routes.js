// src/catalogue/routes.js
const express = require('express');
const router = express.Router();
const catalogueController = require('./controllers/catalogueController');
const auth = require('../../middlewares/auth');

router.get('/get', auth, catalogueController.getUserCatalogues);
router.get('/get-by-id/:id', catalogueController.getCatalogueById);
router.get('/get-by-category/:category', catalogueController.getCataloguesByCategory);
router.get('/get-all-by-category', catalogueController.getAllCataloguesByCategory);
router.post('/create', auth, catalogueController.createCatalogue);
router.get('/get-all', catalogueController.getAllCatalogues);
router.get('/categories', catalogueController.getAllCategories);
router.get('/try', catalogueController.trial);
router.post('/csv', catalogueController.uploadCSV);
router.post('/create-category', catalogueController.createCategory);
// router.post('/search-similar-images', catalogueController.searchSimilarImages);
router.get('/template-catalogues/:template_name', catalogueController.getTemplateCatalogues);
router.get('/search-catalogues', catalogueController.searchCatalogues);
router.get('/templates', catalogueController.getAllTemplates);

module.exports = router;
