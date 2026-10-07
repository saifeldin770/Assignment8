import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: [18, "Value must be between 18 and 60."],
      max: [60, "value must be between 18 and 60."],
    },
  },
  {
    optimisticConcurrency: true,
  },
);
const userModel = mongoose.model("users", userSchema);
export default userModel;
