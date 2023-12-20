const { fakerPL } = require("@faker-js/faker");
const Book = require("../Shared/Book.js");

let idCount = 0;
fakerPL.seed(1234);

function createBook(idCount) {
  const title = fakerPL.music.songName();
  const author = fakerPL.person.fullName();
  const genre = fakerPL.music.genre();
  const releaseDate = fakerPL.date.past();

  return new Book(idCount, title, author, genre, releaseDate);
}

let BOOKS = Array.from({ length: 50 }, () => {
  idCount += 1;
  return createBook(idCount);
});

module.exports = BOOKS;
