const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const usersRouter = require("./routes/users");
const loggerOne = require("./middlewares/loggerOne");

dotenv.config();

const app = express();

const { PORT = 3003, API_URL = "http://127.0.0.1" } = process.env;

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
