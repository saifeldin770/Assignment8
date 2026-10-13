// import { compare, hash } from "bcrypt";
import {
  ConflictException,
  NotFoundException,
} from "../../common/exceptions/app.exceptions.js";
import {
  decryptValue,
  encryptValue,
} from "../../common/security/encryption.js";
import { compareHash, hashValue } from "../../common/security/hash.js";
import { createDoc, findOneDoc } from "../../DB/model/db.repo.js";
import userModel from "../../DB/model/user.model.js";
// import CryptoJS from "crypto-js";
export async function signup(userData) {
  const { email } = userData;
  const userEmail = await findOneDoc({ model: userModel, filter: { email } });
  if (userEmail) {
    throw ConflictException({
      errorMsg: "Email Already Exists",
      cause: { statusCode: 409 },
    }); //If You Write throw or no it didn't effect but better write if.
  }
  // userData.password = await hash(userData.password, 12);
  userData.password = await hashValue({ value: userData.password });
  // userData.phone = CryptoJS.AES.encrypt(
  //   userData.phone,
  //   "secret key 123",
  // ).toString();
  userData.phone = encryptValue({ value: userData.phone });
  const newUser = await createDoc({ model: userModel, insertedData: userData });
  return newUser;
}
export async function login(userData) {
  const { email, password } = userData;
  const user = await findOneDoc({ model: userModel, filter: { email } });
  if (!user) {
    throw NotFoundException({ errorMsg: `Invalid Email or Password` });
  }
  // const isMatch = await compare(password, user.password);
  const isMatch = await compareHash({ value: password, hash: user.password });
  if (!isMatch) {
    throw NotFoundException({ errorMsg: `Invalid Email or Password` });
  }
  // user.phone = CryptoJS.AES.decrypt(user.phone, "secret key 123").toString(
  //   CryptoJS.enc.Utf8,
  // );
  user.phone = decryptValue({ cipherValue: user.phone });
  return user;
}
