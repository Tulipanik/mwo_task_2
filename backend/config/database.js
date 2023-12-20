module.exports = {
  development: {
    username: "user",
    password: process.env.PASSWORD_DB || null,
    database: "main",
    host: "localhost",
    dialect: "sqlite",
    storage: "./Database/db.development.sqlite3",
    port: process.env.PORT_DB,
  },
};
