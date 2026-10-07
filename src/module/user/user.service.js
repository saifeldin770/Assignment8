import userModel from "../../DB/model/user.model.js";
import {
  deleteOne,
  findByIdAndUpdate,
  findOne,
} from "../../DB/repo/repo.db.js";

export async function updateUser(id, updatedData) {
  const { password, ...data } = updatedData;
  if (data.email) {
    const { email } = data;
    const isEmailExists = await findOne({
      model: userModel,
      filter: { email, _id: { $ne: id } },
    });
    if (isEmailExists) {
      throw new Error("Email already exists.", { cause: { statusCode: 400 } });
    }
  }
  const user = await findByIdAndUpdate({
    model: userModel,
    id,
    data: { ...data, $inc: { __v: 1 } },
    options: { runValidators: true, returnDocument: true },
  });
  if (!user) {
    throw new Error(`User not found.`, { cause: { statusCode: 404 } });
  }
  return user;
}
export async function deleteUser(id) {
  if (!id) {
    throw new Error(`id is required.`, { cause: { statusCode: 400 } });
  }
  const result = await deleteOne({ model: userModel, filter: { _id: id } });
  if (result.deletedCount === 0) {
    throw new Error(`User not Found.`, { cause: { statusCode: 404 } });
  }
  return result;
}
export async function getUser(id) {
  if (!id) {
    throw new Error(`id is required.`, { cause: { statusCode: 400 } });
  }
  const user = await findOne({ model: userModel, filter: { _id: id } });
  if (!user) {
    throw new Error("User not found.", { cause: { statusCode: 404 } });
  }
  return user;
}
