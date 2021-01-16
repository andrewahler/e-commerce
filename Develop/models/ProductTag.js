const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model { }

ProductTag.init(
  {
    // define columns
    category_name: [
      "Shirts",
      "Shorts",
      "Music",
      "Hats",
      "Shoes"
    ],

   
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
