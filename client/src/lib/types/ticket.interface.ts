import { QueryTimestampsConfig } from "mongoose";

export interface DBReturnData {
  success: boolean;
  msg?: string;
}

export interface ITicket extends QueryTimestampsConfig {
  _id: string;
  subject: string;
  channelId: string;
  channelName: string;
  status: TicketsStatus;
  guildId: string;
  createdBy: string;
}

export type TicketsStatus = "claimed" | "open" | "closed";
