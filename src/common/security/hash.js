import * as bcrypt from "bcrypt";
import { SALT_ROUND } from "../../config/config.js";

export async function hashValue({ value, saltRound = SALT_ROUND }) {
  return await bcrypt.hash(value, saltRound);
}
export async function compareHash({ value, hash }) {
  return await bcrypt.compare(value, hash);
}
