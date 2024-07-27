import { QueryTimestampsConfig } from "mongoose";

export interface IUser extends QueryTimestampsConfig {
  _id: string;
  id: string;
  username: string;
  guildId: string;
  globalName: string;
  role: "admin" | "user";
}
