import { Router } from "express";
import { login, signup } from "./auth.service.js";
import { successResponse } from "../../common/responsse/success.response.js";
const authRouter = Router();
authRouter.post("/signup", async (req, res) => {
  const result = await signup(req.body);
  successResponse({ res, data: result, status: 201, msg: "created" });
});
authRouter.post("/login", async (req, res) => {
  const result = await login(req.body);
  successResponse({ res, data: result, status: 200, msg: "logged-in" });
});
export default authRouter;
