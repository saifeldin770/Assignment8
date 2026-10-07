import mongoose from "mongoose";
import { DB_URI } from "../config/config.js";
export async function connectDb() {
  try {
    await mongoose.connect(DB_URI);
    await mongoose.syncIndexes();
    console.log("DB Connected Successfully");
  } catch (error) {
    console.log("DB Failed To Connect");
    console.log(error);
  }
}
