const Sequelize = require("sequelize");
const sqlite3 = require("sqlite3");
const config = require("../config/database.js");

const environment = process.env.NODE_ENV || "development";
const dbConfig = config[environment];

const sequelize = new Sequelize(dbConfig);
module.exports = sequelize;
const APIConnection = require("../LibraryAPI/APIStart.js");

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

sequelize.sync().then(() => {
  console.log("Database synchronization successful");
  const Books = require("./Model/BookModel.js");
  const User = require("./Model/UserModel.js");
  console.log(Books);
  Books.sync().then(() => {
    console.log(Books === sequelize.models.Book);
    User.sync().then(() => {
      console.log(User === sequelize.models.User);
      const operations = require("./DatabaseOperation.js");
      APIConnection();
    });
  });
});
