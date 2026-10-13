import dotenv from "dotenv";
import path from "node:path";
dotenv.config({
  path: path.resolve("./.env.dev"),
});
export const PORT = Number(process.env.PORT) || 3000;
export const DB_URI = process.env.DB_URI_ATLAS;
export const SALT_ROUND = Number(process.env.SALT_ROUND) || 12;
export const ENCRYPT_KEY = process.env.ENCRYPT_KEY || "";
