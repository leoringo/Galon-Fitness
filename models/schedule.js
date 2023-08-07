'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Schedule.belongsTo(models.Class)
      Schedule.belongsTo(models.Trainer)
    }
  }
  Schedule.init({
    TrainerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {msg: "Trainer cannot be empty!"},
        notNull: {msg: "Trainer cannot be empty!"},
      }
    
    },
    ClassId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {msg: "Class cannot be empty!"},
        notNull: {msg: "Class cannot be empty!"},
      }
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {msg: "Date cannot be empty!"},
        notNull: {msg: "Date cannot be empty!"},
      }
    }
  }, {
    sequelize,
    modelName: 'Schedule',
  });
  return Schedule;
};