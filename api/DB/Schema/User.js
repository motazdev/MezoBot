import mongoose, { Schema, Types, model } from "mongoose";
const UserSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    guildId: {
      type: String,
      required: true,
      ref: "Guild",
      foreignField: "guildId",
    },
    globalName: {
      type: String,
      required: true,
    },
    role: {
      enum: ["admin", "user"],
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || model("User", UserSchema);
export default User;
