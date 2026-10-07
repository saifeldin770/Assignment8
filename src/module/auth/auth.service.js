import userModel from "../../DB/model/user.model.js";
import { create, findOne } from "../../DB/repo/repo.db.js";

export async function signup(userData) {
  const { email } = userData;
  const user = await findOne({ model: userModel, filter: { email } });
  if (user) {
    throw new Error(`Email already exists.`, { cause: { statusCode: 400 } });
  }
  const result = await create({ model: userModel, data: userData });
  return result;
}
export async function login(userData) {
  const { email, password } = userData;
  const user = await findOne({ model: userModel, filter: { email, password } });
  if (!user) {
    throw new Error(`Invalid email or password.`, {
      cause: { statusCode: 400 },
    });
  }
  return user;
}
