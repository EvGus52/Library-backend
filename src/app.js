const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books");
const { jsonErrorHandler, notFoundHandler, errorHandler } = require("./middlewares/errorHandler");

dotenv.config();

const {
  PORT = 3005,
  API_URL = "http://127.0.0.1",
  MONGO_URL = "mongodb://localhost:27017/backend",
} = process.env;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDb");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

const app = express();

const helloWorld = (request, response) => {
  response.status(200).json({ message: "Hello, World!" });
};

app.get("/", helloWorld);

app.use(cors());
app.use(express.json());
app.use(jsonErrorHandler);
app.use(usersRouter);
app.use(booksRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Сервер запущен по адресу ${API_URL}:${PORT}`);
});
