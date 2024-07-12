const { DataTypes,ARRAY } = require('sequelize');
const sequelize = require('../connection.js'); // Create this file in the next step


const Customer = sequelize.define('customer', {
  password:DataTypes.STRING,
  username:DataTypes.STRING,
  email:DataTypes.STRING,
  firstname:DataTypes.STRING,
  lastname:DataTypes.STRING,
  address:DataTypes.STRING,
  phone:DataTypes.STRING,
});

module.exports = Customer;