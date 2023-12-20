const express = require("express");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const operations = require("../../Database/DatabaseOperation.js");
const router = express.Router();

dotenv.config();

const endpoints = require("../../config/endpoints.json").endpoints;
const secretKey = process.env.SECRET;

router.post(endpoints.login, (req, res) => {
  const { username, password } = req.body;
  if (username == undefined || password == undefined) {
    res.status(401).json({ message: "Invalid username or password" });
    return;
  }

  operations
    .getUser(username)
    .then((user) => {
      if (user.length != 0 && user[0].password == password) {
        const token = jwt.sign(user[0].dataValues, secretKey);
        res.json({ token: token });
      } else {
        res.status(401).json({ message: "Invalid username or password" });
      }
    })
    .catch(() => {
      res.status(401).json({ message: "Invalid username or password" });
    });
});

router.post(endpoints.register, (req, res) => {
  const { username, password } = req.body;
  const user = {
    username: username,
    password: password,
    role: "user",
  };

  operations
    .setUser(user)
    .then(() => {
      res.status(200).json({ message: "Registered" });
    })
    .catch(() => {
      res.status(401).json({ message: "cannot register" });
    });
});

const authorize = (requiredRoles) => (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    try {
      const decodedToken = jwt.verify(token, secretKey);
      if (!requiredRoles.includes(decodedToken.role)) {
        res.status(401).json({ message: "Wrong privilages" });
        return;
      }
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: "Invalid token" });
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

router.get(endpoints.getAll, authorize(["admin", "user"]), (req, res) => {
  const perPage = parseInt(req.query.perpage) || 50;
  const page = parseInt(req.query.page) || 1;

  const startIndex = page;
  const endIndex = startIndex + perPage - 1;

  operations.getAllBooks(startIndex, endIndex).then((data) => {
    return res.status(200).json(data);
  });
});

router.get(endpoints.getAllGenre, authorize(["admin", "user"]), (req, res) => {
  const perPage = parseInt(req.query.perpage) || 50;
  const page = parseInt(req.query.page) || 1;

  operations
    .getAllGenreBooks(req.params.genre)
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((err) => {
      return res.status(501).json({ message: "Błędny gatunek" });
    });
});

router.get(endpoints.getAllAuthor, authorize(["admin", "user"]), (req, res) => {
  const perPage = parseInt(req.query.perpage) || 50;
  const page = parseInt(req.query.page) || 1;

  operations
    .getAllAuthorBooks(req.params.author)
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((err) => {
      return res.status(501).json({ message: "Błędny autor" });
    });
});

router.get(endpoints.getId, authorize(["admin", "user"]), (req, res) => {
  operations
    .getIdBook(req.params.id)
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((err) => {
      return res.status(501).json({ message: "Błędne id" });
    });
});

router.get(endpoints.maxId, authorize(["admin", "user"]), (req, res) => {
  operations.getMaxId().then((value) => {
    res.status(200).json({ max: value });
  });
});

router.post(endpoints.add, authorize(["admin", "user"]), (req, res) => {
  let toAdd = req.body;

  console.log(toAdd);
  operations.getMaxId().then((id) => {
    toAdd.id = id + 1;
    console.log(toAdd);
    operations
      .addBook(toAdd)
      .then(() => {
        res.status(201).json({ message: "Udało się dodać do bazy" });
      })
      .catch((err) => {
        if ((req.body.title = "")) {
          res.status(501).json({ message: "Błąd tytułu" });
        }
        res.status(500).json({ message: "Błąd podczas dodawania do bazy" });
      });
  });
});

router.put(endpoints.update, authorize(["admin", "user"]), (req, res) => {
  operations
    .updateBook(req.body)
    .then(() => {
      res.status(200).json({ message: "Zaktualizowano pomyślnie" });
    })
    .catch((err) => {
      if ((req.body.title = "")) {
        res.status(501).json({ message: "Błąd tytułu" });
      }
      res.status(502).json({ message: "Błąd podczas dodawania do bazy" });
    });
});

router.delete(endpoints.deleteAll, authorize(["admin"]), (req, res) => {
  console.log("Siema");
  operations
    .deleteAllBooks()
    .then(() => {
      res.status(200).json({ message: "Wszystko usunięto pomyślnie" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Błąd podczas dodawania do bazy" });
    });
});

router.delete(endpoints.deleteAllId, authorize(["admin"]), (req, res) => {
  operations
    .deleteById(req.params.id)
    .then(() => {
      res.status(200).json({ message: "Usunięto pomyślnie" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Błąd id" });
    });
});

router.delete(endpoints.deleteAllGenre, authorize(["admin"]), (req, res) => {
  operations
    .deleteAllBooksByGenre(req.params.genre)
    .then(() => {
      res.status(200).json({
        message: `Pomyślnie usunięto wszytskie książki z gatunku ${req.params.genre}`,
      });
    })
    .catch((err) => {
      res.status(501).json({ message: "Błąd gatunku" });
    });
});

module.exports = router;
