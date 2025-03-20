
// Custom error handler middleware
const errorHandler = (err, req, res, next) => {
  // Log error for debugging
  console.error(err.stack);

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Validation Error',
      details: Object.values(err.errors).map(val => val.message)
    });
  }

  // Mongoose cast error (invalid ID format)
  if (err.name === 'CastError') {
    return res.status(400).json({
      message: 'Invalid ID format'
    });
  }

  // Default to 500 server error
  res.status(500).json({
    message: 'Something went wrong on the server',
    error: process.env.NODE_ENV === 'production' ? null : err.message
  });
};

module.exports = errorHandler;
