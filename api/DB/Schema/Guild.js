import mongoose, { Schema, Types, model } from "mongoose";

const GuildSchema = new Schema(
  {
    guildId: {
      type: String,
      required: true,
      unique: true,
    },
    ownerId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    plan: {
      enum: ["free", "paid"],
      type: String,
      default: "free",
    },
    categoryId: {
      type: String,
    },
    staff_roles: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const Guild = mongoose.models.Guild || model("Guild", GuildSchema);

export default Guild;
