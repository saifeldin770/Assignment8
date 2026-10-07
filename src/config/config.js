import dotenv from "dotenv";
import path from "node:path";
dotenv.config({
  path: path.resolve("./.env.dev"),
});
export const PORT = Number(process.env.PORT) || 3000;
export const DB_LOCAL_URL = process.env.DB_LOCAL_URL || "";
export const DB_NAME = process.env.DB_NAME || "";
export const DB_URI = DB_LOCAL_URL + DB_NAME;
