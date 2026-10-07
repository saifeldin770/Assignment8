import express from "express";
import { connectDb } from "./DB/connection.db.js";
import errorMiddleware from "./middleware/error.middleware.js";
import notFoundMiddleware from "./middleware/notfound.middleware.js";
import { PORT } from "./config/config.js";
import authRouter from "./module/auth/auth.controller.js";
import userRouter from "./module/user/user.controller.js";
import noteRouter from "./module/notes/notes.controller.js";
async function bootStrap() {
  const app = express();
  app.use(express.json());
  await connectDb();
  app.use("/users", authRouter, userRouter);
  app.use("/notes", noteRouter);
  app.use("{/*dummy}", notFoundMiddleware);
  app.use(errorMiddleware);
  app.listen(PORT, () => {
    console.log(`app is listening on port ${PORT}`);
  });
}
bootStrap();
