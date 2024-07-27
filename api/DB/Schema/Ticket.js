import mongoose, { Schema, Types, model } from "mongoose";
const TicketSchema = new Schema(
  {
    subject: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
      ref: "User",
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
    },

    guildId: {
      type: String,
      ref: "Guild",
    },
  },
  { timestamps: true }
);

const Ticket = mongoose.models.Ticket || model("Ticket", TicketSchema);
export default Ticket;
