const config = require('./config');
// const { connectDB } = require('./services/mongoose');
const app = require('./app');
const PORT = process.env.PORT || config.port;

const start = async () => {

  // Dynamically import AdminJS and @adminjs/mongoose
  const { default: AdminJS } = await import('adminjs');
  const AdminJSMongoose = await import('@adminjs/mongoose');
  const { buildRouter } = await import('@adminjs/express');

  // Import User and Post models
  const User = require('./src/users/models/user'); // Ensure this path is correct
  const Catalogue = require('./src/catalogues/models/catalogue'); // Ensure this path is correct
  const CatalogueTemplate = require('./src/catalogues/models/catalogueTemplate'); // Ensure this path is correct
  const Category = require('./src/catalogues/models/categories'); // Ensure this path is correct
  const SellerCatalogue = require('./src/catalogues/models/sellerCatalogue'); // Ensure this path is correct

  // Register AdminJS Mongoose adapter
  AdminJS.registerAdapter({
    Resource: AdminJSMongoose.Resource,
    Database: AdminJSMongoose.Database,
  });

  // Configure AdminJS
  const adminOptions = {
    resources: [
      { resource: User, options: { parent: { name: 'User Management' } } },
      { resource: Catalogue, options: { parent: { name: 'Catalog Management' } } },
      { resource: CatalogueTemplate, options: { parent: { name: 'Catalog Management' } } },
      { resource: Category, options: { parent: { name: 'Catalog Management' } } },
      { resource: SellerCatalogue, options: { parent: { name: 'Catalog Management' } } },
    ],
    rootPath: '/admin',
  };

  const admin = new AdminJS(adminOptions);
  const adminRouter = buildRouter(admin);
  app.use(admin.options.rootPath, adminRouter);

  app.listen(PORT, () => {
    console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`);
  });
};

start();
