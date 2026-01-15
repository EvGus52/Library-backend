const Book = require("../models/book");
const { handleError, handleNotFound, handleServerError } = require("../utils/errorHandlers");

const getBooks = (request, response) => {
  return Book.find({})
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((e) => handleServerError(e, response));
};

const getBook = (request, response) => {
  const { book_id } = request.params;
  return Book.findById(book_id)
    .then((book) => {
      const notFound = handleNotFound(book, response, "Book not found");
      if (notFound) return notFound;
      response.status(200).json(book);
    })
    .catch((e) => handleError(e, response, "Book not found"));
};

const createBook = (request, response) => {
  return Book.create({ ...request.body })
    .then((book) => {
      response.status(201).json(book);
    })
    .catch((e) => handleServerError(e, response));
};

const updateBook = (request, response) => {
  const { book_id } = request.params;
  return Book.findByIdAndUpdate(book_id, { ...request.body }, { new: true })
    .then((book) => {
      const notFound = handleNotFound(book, response, "Book not found");
      if (notFound) return notFound;
      response.status(200).json(book);
    })
    .catch((e) => handleError(e, response, "Book not found"));
};

const deleteBook = (request, response) => {
  const { book_id } = request.params;
  return Book.findByIdAndDelete(book_id)
    .then((book) => {
      const notFound = handleNotFound(book, response, "Book not found");
      if (notFound) return notFound;
      response.status(200).json({ message: "Success" });
    })
    .catch((e) => handleError(e, response, "Book not found"));
};

module.exports = {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
};
