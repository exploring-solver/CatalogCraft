// src/catalogue/services/imageSearch.js
// const cv = require('opencv4nodejs');
const Catalogue = require('../models/catalogue');
const xlsx = require('xlsx');

exports.getMatchingCatalogues = async (imageBuffer) => {
  const uploadedImage = cv.imdecode(imageBuffer);
  const orb = new cv.ORBDetector();

  const keypoints1 = orb.detect(uploadedImage);
  const descriptors1 = orb.compute(uploadedImage, keypoints1);

  const matchingCatalogues = [];

  const catalogues = await Catalogue.find();
  for (const catalogue of catalogues) {
    if (catalogue.product_image_1) {
      const productImage = cv.imread(catalogue.product_image_1);
      const keypoints2 = orb.detect(productImage);
      const descriptors2 = orb.compute(productImage, keypoints2);

      const bf = new cv.BFMatcher(cv.NORM_HAMMING, true);
      const matches = bf.match(descriptors1, descriptors2);

      if (matches.length > 0) {
        matchingCatalogues.push(catalogue);
      }
    }
  }

  return matchingCatalogues;
};

exports.parseExcelFile = async (filePath, productName) => {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  const data = xlsx.utils.sheet_to_json(sheet);
  const productData = data.find((row) => row.name === productName);

  return productData || null;
};
