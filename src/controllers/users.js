const User = require("../models/user");
const {
  handleError,
  handleNotFound,
  handleServerError,
} = require("../utils/errorHandlers");

const getUsers = (request, response) => {
  return User.find({})
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((e) => handleServerError(e, response));
};

const getUser = (request, response) => {
  const { user_id } = request.params;
  return User.findById(user_id)
    .then((user) => {
      const notFound = handleNotFound(user, response, "User not found");
      if (notFound) return notFound;
      response.status(200).json(user);
    })
    .catch((e) => handleError(e, response, "User not found"));
};

const createUser = (request, response) => {
  return User.create({ ...request.body })
    .then((user) => {
      response.status(201).json(user);
    })
    .catch((e) => handleServerError(e, response));
};

const updateUser = (request, response) => {
  const { user_id } = request.params;
  return User.findByIdAndUpdate(user_id, { ...request.body }, { new: true })
    .then((user) => {
      const notFound = handleNotFound(user, response, "User not found");
      if (notFound) return notFound;
      response.status(200).json(user);
    })
    .catch((e) => handleError(e, response, "User not found"));
};

const deleteUser = (request, response) => {
  const { user_id } = request.params;
  return User.findByIdAndDelete(user_id)
    .then((user) => {
      const notFound = handleNotFound(user, response, "User not found");
      if (notFound) return notFound;
      response.status(200).json({ message: "Success" });
    })
    .catch((e) => handleError(e, response, "User not found"));
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
