// JSON parsing error handler
const jsonErrorHandler = (error, request, response, next) => {
  if (error instanceof SyntaxError) {
    return response.status(400).json({ error: "Invalid JSON format" });
  }
  next(error);
};

// 404 handler for non-existent routes
const notFoundHandler = (request, response) => {
  response.status(404).json({ error: "Route not found" });
};

// 500 error handler
const errorHandler = (error, request, response, next) => {
  response
    .status(500)
    .json({ error: error.message || "Internal server error" });
};

module.exports = {
  jsonErrorHandler,
  notFoundHandler,
  errorHandler,
};
