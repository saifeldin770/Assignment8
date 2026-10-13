async function globalErrorMiddleware(error, req, res, next) {
  const statusCode = error.cause?.statusCode || 400;
  res
    .status(statusCode)
    .json({ errorMsg: error.message, errorStack: error.stack, error });
}
export default globalErrorMiddleware;
