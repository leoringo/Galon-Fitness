'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trainer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Trainer.hasMany(models.Schedule)
    }
  }
  Trainer.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: "Name cannot be empty!"},
        notNull: {msg: "Name cannot be empty!"},
      }
    },
    exp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {msg: "Experience cannot be empty!"},
        notNull: {msg: "Experience cannot be empty!"},
      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: "Gender cannot be empty!"},
        notNull: {msg: "Gender cannot be empty!"},
      }
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: "Image cannot be empty!"},
        notNull: {msg: "Image cannot be empty!"},
      }
    }
  }, {
    sequelize,
    modelName: 'Trainer',
  });
  return Trainer;
};