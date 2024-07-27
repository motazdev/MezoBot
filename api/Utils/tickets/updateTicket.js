import Ticket from "../../DB/Schema/Ticket.js";

export const closeTicket = async (reason, channelId) =>
  await Ticket.updateOne(
    { channelId },
    { status: "closed", ...(reason && { reason }) },
    { new: true }
  );

export const claimTicket = async (channelId, claimedId) =>
  await Ticket.updateOne(
    { channelId },
    { status: "claimed", claimedBy: claimedId }
  );
