// import models
const Product = require('./Product');
const Category = require('./Category');
const Tags = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category,{
  foreignKey:"category_id"
})

// Categories have many Products
Category.hasMany(Product,{
  foreignKey:"category_id"
})

// Products belongToMany Tags (through ProductTag)
Tags.belongsTo(Product,{
  foreignKey:"tag_id"
})

// Tags belongToMany Products (through ProductTag)
Product.belongsTo(Tags,{
  foreignKey:"category_id"
})

module.exports = {
  Product,
  Category,
  Tags,
  ProductTag,
};
