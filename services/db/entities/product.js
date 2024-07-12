const { DataTypes,ARRAY } = require('sequelize');
const sequelize = require('../connection.js'); // Create this file in the next step


const Product = sequelize.define('product', {
  name:DataTypes.STRING,
  desc:DataTypes.STRING,
  banner:DataTypes.STRING,
  type:DataTypes.STRING,
  unit:DataTypes.STRING,
  price:DataTypes.STRING,
  available:DataTypes.BOOLEAN,
  supplier:DataTypes.STRING
});

module.exports = product;