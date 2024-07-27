import Ticket from "../../DB/Schema/Ticket.js";

const createTicket = async (
  subject,
  user,
  newChannelId,
  channelName,
  guildId
) => {
  try {
    const newTicket = await Ticket.create({
      subject,
      createdBy: user.id,
      channelId: newChannelId,
      channelName,
      guildId,
    });

    return true;
  } catch (err) {
    return { error: err };
  }
};
export default createTicket;
