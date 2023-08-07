'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Member)
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: "Name cannot be empty!"},
        notNull: {msg: "Name cannot be empty!"},
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: "Address cannot be empty!"},
        notNull: {msg: "Address cannot be empty!"},
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {msg: "Email already taken!"},
      validate: {
        notEmpty: {msg: "Email cannot be empty!"},
        notNull: {msg: "Email cannot be empty!"},
        isEmail: {msg: "Please check your email format!"}
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: "Password cannot be empty!"},
        notNull: {msg: "Password cannot be empty!"},
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: "Phone Number cannot be empty!"},
        notNull: {msg: "Phone Number cannot be empty!"},
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
    isSubscribed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (instance) => {
        instance.password = require('bcryptjs').hashSync(instance.password, 5)
        instance.isSubscribed = false
      }
    }
  });
  return User;
};