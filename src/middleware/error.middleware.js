function errorMiddleware(error, req, res, next) {
  const statusCode = error.statusCode?.cause || 400;
  res
    .status(statusCode)
    .json({ msg: error.message, errorStack: error.stack, error });
}
export default errorMiddleware;
