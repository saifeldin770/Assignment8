import { Router } from "express";
import { deleteUser, getUser, updateUser } from "./user.service.js";
const userRouter = Router();
userRouter.patch("/:id", async (req, res, next) => {
  try {
    const result = await updateUser(req.params.id, req.body);
    return res.status(200).json({ msg: "updated", data: result });
  } catch (error) {
    next(error);
  }
});
userRouter.delete("/", async (req, res, next) => {
  try {
    const result = await deleteUser(req.query.id);
    return res.status(200).json({ msg: "deleted", data: result });
  } catch (error) {
    next(error);
  }
});
userRouter.get("/", async (req, res, next) => {
  try {
    const result = await getUser(req.query.id);
    return res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
});
export default userRouter;
