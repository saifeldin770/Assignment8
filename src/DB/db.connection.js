import mongoose from "mongoose";
import { DB_URI } from "../config/config.js";
export async function connectDb() {
  try {
    await mongoose.connect(DB_URI);
    await mongoose.syncIndexes();
    console.log("DB connected successfully");
  } catch (error) {
    console.log(error);
    console.log("DB connetion failed");
  }
}
