const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Tag extends Model {}

Tag.init(
  {
    // define columns
    attributes: [
      "id",
      "price",
      "title",
      "amount",
      "description",
    ],
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);

module.exports = Tag;
