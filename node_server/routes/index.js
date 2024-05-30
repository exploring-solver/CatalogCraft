const express = require('express');
const statusRoutes = require('../src/health/routes');
const userRoutes = require('../src/users/routes');
const catalogueRoutes = require('../src/catalogues/routes');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send('Welcome to the CatalogCraft node API!')
  })
  app.use('/status', statusRoutes);
  app.use('/auth', userRoutes);
  app.use('/catalogue', catalogueRoutes);

  // Handle 404 - Not Found
  app.use('*', (req, res, next) => {
    if (req.originalUrl.startsWith('/admin')) {
      return next(); // Pass the request to the next middleware
    }

    // For all other URLs, return a 404 response
    res.status(404).send('Not found!!!');
  });

};
