// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category,{
  foreignKey:"category_id"
})

// Categories have many Products
Category.hasMany(Product,{
  foreignKey:"category_id"
})

// Products belongToMany tag (through ProductTag)
Tag.belongsToMany(Product,{
  through:ProductTag,
  foreignKey:"tag_id"
})

// tag belongToMany Products (through ProductTag)
Product.belongsTo(Tag,{
  through: ProductTag,
  foreignKey:"category_id"
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
