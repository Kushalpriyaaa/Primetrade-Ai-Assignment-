const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  // Development mode - show stack trace
  if (process.env.NODE_ENV === "development") {
    return res.status(statusCode).json({
      success: false,
      message,
      stack: err.stack,
    });
  }

  // Production mode - hide stack trace
  res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = errorHandler;
