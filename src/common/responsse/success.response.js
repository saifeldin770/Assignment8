export function successResponse({ res, status = 200, msg = "done", data }) {
  res.status(status).json({ msg, data });
}
