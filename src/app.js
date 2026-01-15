const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const usersRouter = require("./routes/users");
const loggerOne = require("./middlewares/loggerOne");

dotenv.config();

const {
  PORT = 3003,
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
  response.status(200);
  response.send("Hello, World!");
};

app.get("/", helloWorld);

app.use(cors());
app.use(loggerOne);
app.use(bodyParser.json());
app.use(usersRouter);

app.listen(PORT, () => {
  console.log(`Сервер запущен по адресу ${API_URL}:${PORT}`);
});
