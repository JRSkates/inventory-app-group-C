const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");

class Item extends Model {}

Item.init(
  {
    // Define your columns here
    // test
  },
  {
    sequelize,
  }
);

module.exports = Item;
