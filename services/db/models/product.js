'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init({
    name: DataTypes.STRING,
    desc: DataTypes.STRING,
    banner: DataTypes.STRING,
    type: DataTypes.STRING,
    unit: DataTypes.STRING,
    price: DataTypes.STRING,
    available: DataTypes.BOOLEAN,
    supplier: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  Product.associate = function(models) {
    Product.belongsToMany(models.Customer, { through: models.CustomerProduct, as: 'customers', foreignKey: 'productId' });
  };

  return Product;
};