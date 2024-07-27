import { Schema, Types, models, model, Model } from "mongoose";

export interface IUser {
  id: string;
  username: string;
  guildId: string;
  globalName: string;
  role: string;
}
type UserModel = Model<IUser>;

const UserSchema = new Schema<IUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    guildId: {
      type: String,
      required: true,
    },
    globalName: {
      type: String,
      required: true,
    },
    role: {
      enum: ["user", "admin"],
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

const User: UserModel =
  models?.User || model<IUser, UserModel>("User", UserSchema);
export default User;
