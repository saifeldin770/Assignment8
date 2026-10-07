import mongoose from "mongoose";
const notesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return value !== value.toUpperCase();
        },
        message: `title mustn't be entered uppercase.`,
      },
    },
    content: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "users",
    },
  },
  {
    timestamps: true,
    optimisticConcurrency: true,
  },
);
const notesModel = mongoose.model("notes", notesSchema);
export default notesModel;
