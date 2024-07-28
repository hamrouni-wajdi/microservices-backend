'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Profile.init({
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Users',
        key: 'userId',
      },
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: DataTypes.STRING,
    address: DataTypes.JSON,
    dateOfBirth: DataTypes.DATE,
    profilePictureUrl: DataTypes.STRING,
    preferences: DataTypes.JSON,
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};