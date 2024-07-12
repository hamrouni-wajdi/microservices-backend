const { Sequelize } = require('sequelize');
const mysql = require('mysql2/promise');

const sequelize = new Sequelize("macroshopping","root","root", {
  host: "localhost",
  dialect: 'mysql',
});

module.exports = sequelize;
