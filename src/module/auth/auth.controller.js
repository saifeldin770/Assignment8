import { Router } from "express";
import { login, signup } from "./auth.service.js";
const authRouter = Router();
authRouter.post("/signup", async (req, res, next) => {
  try {
    const result = await signup(req.body);
    return res
      .status(201)
      .json({ msg: "User added successfully", data: result });
  } catch (error) {
    next(error);
  }
});
authRouter.post("/login", async (req, res, next) => {
  try {
    const result = await login(req.body);
    return res.status(200).json({ msg: "logged in", data: result });
  } catch (error) {
    next(error);
  }
});
export default authRouter;
