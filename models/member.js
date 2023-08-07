'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Member.belongsTo(models.Class)
      Member.belongsTo(models.User)
    }
  }
  Member.init({
    ClassId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {msg: "Class cannot be empty!"},
        notEmpty: {msg: "Class cannot be empty!"}
      },
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {msg: "User cannot be empty!"},
        notEmpty: {msg: "User cannot be empty!"},
      },
    }
  }, {
    sequelize,
    modelName: 'Member',
  });
  return Member;
};