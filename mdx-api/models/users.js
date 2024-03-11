/**
 * User Model
 */

// Import necessary modules from Sequelize
const { DataTypes } = require("sequelize");

// User model definition
const UserModel = {
  // User ID
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  // User's unique username
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  // User's unique email address
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  // User's first name
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // User's last name (optional)
  lastName: {
    type: DataTypes.STRING,
    allowNull: true
  }
};

// Exporting module
module.exports = {
  // Method to initialize the model
  initialise: (sequelize) => {
    // Defining the 'user' model in Sequelize
    this.model = sequelize.define("user", UserModel);
  },

  // Method to create a new user
  createUser: (user) => {
    return this.model.create(user);
  },

  // Method to find a user based on a query
  findUser: (query) => {
    return this.model.findOne({
      where: query,
    });
  },

  // Method to update user information
  updateUser: (query, updatedValue) => {
    return this.model.update(updatedValue, {
      where: query,
    });
  },

  // Method to find all users based on a query
  findAllUsers: (query) => {
    return this.model.findAll({
      where: query
    });
  },

  // Method to delete a user based on a query
  deleteUser: (query) => {
    return this.model.destroy({
      where: query
    });
  }
};
