'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Class.belongsTo(models.Category)
      Class.hasMany(models.Member)
    }
  }
  Class.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: "Name cannot be empty!"},
        notNull: {msg: "Name cannot be empty!"},
      }
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {msg: "Category cannot be empty!"},
        notNull: {msg: "Category cannot be empty!"},
      }
    },
    lat: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: "Lat cannot be empty!"},
        notNull: {msg: "Lat cannot be empty!"},
      }
    },
    lon: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: "Lon cannot be empty!"},
        notNull: {msg: "Lon cannot be empty!"},
      }
    },
    imgUrl: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'ImgUrl cannot be empty!'},
        notNull: {msg: 'ImgUrl cannot be empty!'}
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'Description cannot be empty!'},
        notNull: {msg: 'Description cannot be empty!'}
      }
    }
  }, {
    sequelize,
    modelName: 'Class',
  });
  return Class;
};