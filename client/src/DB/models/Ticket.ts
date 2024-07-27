import { Schema, Types, models, model, Model } from "mongoose";

export interface ITicket {
  subject: string;
  createdBy: string;
  channelId: string;
  channelName: string;
  status: string;
  reason: string;
  claimedBy: string;
}
type TicketModel = Model<ITicket>;
const TicketSchema = new Schema<ITicket, TicketModel>(
  {
    subject: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    channelId: {
      type: String,
      required: true,
    },
    channelName: {
      type: String,
      required: true,
    },
    status: {
      enum: ["closed", "open", "claimed"],
      type: String,
      default: "open",
    },
    reason: {
      type: String,
    },
    claimedBy: {
      type: String,
      ref: "User",
      foreignField: "id",
    },
  },
  { timestamps: true }
);

const Ticket: TicketModel =
  models.Ticket || model<ITicket, TicketModel>("Ticket", TicketSchema);
export default Ticket;
