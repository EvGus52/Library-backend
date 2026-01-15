// Handle Mongoose errors (CastError -> 404, others -> 500)
const handleError = (
  error,
  response,
  notFoundMessage = "Resource not found"
) => {
  if (error.name === "CastError") {
    return response.status(404).json({ error: notFoundMessage });
  }
  return response.status(500).json({ error: error.message });
};

// Check if entity exists, return 404 if not
const handleNotFound = (
  entity,
  response,
  notFoundMessage = "Resource not found"
) => {
  if (!entity) {
    return response.status(404).json({ error: notFoundMessage });
  }
  return null;
};

// Handle server errors (500)
const handleServerError = (error, response) => {
  return response.status(500).json({ error: error.message });
};

module.exports = {
  handleError,
  handleNotFound,
  handleServerError,
};
