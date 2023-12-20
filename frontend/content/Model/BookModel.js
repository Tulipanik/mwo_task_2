export class BookModel {
  constructor({ id, title = "", author = "", genre = "" }) {
    this.id = id || "";
    this.title = title || "";
    this.author = author || "";
    this.genre = genre || "";
  }
}
