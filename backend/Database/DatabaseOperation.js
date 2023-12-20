const Sequelize = require("sequelize");
const BookModel = require("./Model/BookModel.js");
const UserModel = require("./Model/UserModel.js");
const BOOKS = require("../DataSeeder/BookSeeder.js");

async function createBooks() {
  try {
    const createdBooks = await BookModel.bulkCreate(BOOKS);
    console.log("Utworzone rekordy", createdBooks);
  } catch (err) {
    console.error("Błąd tworzenia rekordu:", err);

    if (err.name === "SequelizeValidationError") {
      console.error("Błąd walidacji:", err.errors);
    } else {
    }
  }
}

async function createUser() {
  try {
    const usersToAdd = [
      { id: 0, username: "siema", password: "elo", role: "user" },
      { id: 1, username: "zwykly", password: "user", role: "user" },
      { id: 2, username: "jestem", password: "admin", role: "admin" },
    ];
    const createdUsers = await UserModel.bulkCreate(usersToAdd);

    console.log("Utworzone rekordy", createdUsers);
  } catch (err) {
    console.error("Błąd tworzenia rekordu:", err);

    if (err.name === "SequelizeValidationError") {
      console.error("Błąd walidacji:", err.errors);
    } else {
      console.error("Błąd");
    }
  }
}

createBooks();
createUser();

async function getUser(username) {
  const user = await UserModel.findAll({
    where: {
      ["username"]: username,
    },
  });

  return user;
}

async function setUser(user) {
  const id = (await UserModel.max("id")) + 1;
  user.id = id;
  console.log(user);
  await UserModel.create(user);
}

async function getAllBooks(fromId, toId) {
  const books = await BookModel.findAll({
    where: {
      id: {
        [Sequelize.Op.between]: [fromId, toId],
      },
    },
  });

  return books;
}

async function getAllGenreBooks(bookGenre) {
  const books = await BookModel.findAll({
    where: {
      ["genre"]: bookGenre,
    },
  });
  return books;
}

async function getAllAuthorBooks(bookAuthor) {
  const books = await BookModel.findAll({
    where: {
      ["author"]: bookAuthor,
    },
  });
  return books;
}

async function getIdBook(id) {
  const books = await BookModel.findAll({
    where: {
      ["id"]: id,
    },
  });
  return books;
}

async function addBook(bookData) {
  const book = await BookModel.create(bookData);
}

async function deleteAllBooks() {
  await BookModel.truncate();
}

async function deleteById(id) {
  BookModel.destroy({
    where: {
      ["id"]: id,
    },
  });
}

async function updateBook(updatedBook) {
  try {
    const book = await BookModel.findByPk(updatedBook.id);

    await book.update({
      title: updatedBook.title,
      author: updatedBook.author,
      genre: updatedBook.genre,
    });

    console.log("Book updated successfully");
  } catch (error) {
    throw new Error("Error updating book:", error);
  }
}

async function deleteAllBooksByGenre(bookGenre) {
  BookModel.destroy({
    where: {
      ["genre"]: bookGenre,
    },
  });
}

async function getMaxId() {
  return BookModel.max("id");
}

module.exports = {
  getAllBooks,
  getAllGenreBooks,
  getAllAuthorBooks,
  getIdBook,
  addBook,
  updateBook,
  deleteAllBooks,
  deleteById,
  deleteAllBooksByGenre,
  getMaxId,
  getUser,
  setUser,
};
