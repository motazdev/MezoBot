import { QueryTimestampsConfig } from "mongoose";

export interface IGuild extends QueryTimestampsConfig {
  _id: string;
  guildId: string;
  ownerId: string;
  plan: string;
}
