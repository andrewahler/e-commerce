const seedCategories = require('./category-seeds');
const seedProducts = require('./product-seeds');
const seedtag = require('./tag-seeds');
const seedProducttag = require('./product-tag-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  await seedCategories();
  console.log('\n----- CATEGORIES SEEDED -----\n');

  await seedProducts();
  console.log('\n----- PRODUCTS SEEDED -----\n');

  await seedtag();
  console.log('\n----- tag SEEDED -----\n');

  await seedProducttag();
  console.log('\n----- PRODUCT tag SEEDED -----\n');

  process.exit(0);
};

seedAll();
