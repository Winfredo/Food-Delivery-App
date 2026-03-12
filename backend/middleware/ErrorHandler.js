const ErrorHandler = (err, req, res, next) => {
  const errStatus = err.status || 500;
  const errMessage = err.message || "Internal Server Error";

  res.status(errStatus).json({
    success: false,
    message: errMessage,
    status: errStatus,
    stack: process.env.NODE_ENV === "development" && err.stack,
  });
};

export default ErrorHandler;
