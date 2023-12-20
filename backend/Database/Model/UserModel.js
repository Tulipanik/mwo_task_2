const { DataTypes } = require("sequelize");
const sequelize = require("../startBase.js");

const validRoles = ["admin", "user"];

const UserModel = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    unique: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  role: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isValidRole(value) {
        if (!validRoles.includes(value)) {
          throw new Error("Invalid role value");
        }
      },
    },
  },
});

module.exports = UserModel;
