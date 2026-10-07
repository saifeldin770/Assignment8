function notFoundMiddleware(req, res) {
  res.status(404).json({ msg: "invalid Url Or Method" });
}
export default notFoundMiddleware;
