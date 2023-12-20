const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");
const bookRoutes = require("./Controllers/LibraryController.js");

dotenv.config();
const app = express();

const allowedOrigins = [
  "http://localhost:19006",
  "http://localhost:8080",
  "http://127.0.0.1:8081",
  "http://127.0.0.1:8080",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));
// app.use(cors("*"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

const APIConnection = function () {
  try {
    const port = process.env.PORT;

    app.listen(port, () => {
      console.log(`Serwer nasłuchuje na porcie: ${port}`);
    });
  } catch (err) {
    console.error(`Błąd w pobieraniu pliku konfiguracyjnego: ${err.message}`);
    process.exit(1);
  }
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

  app.use(bodyParser.json());
  app.use("", bookRoutes);
};

module.exports = APIConnection;
