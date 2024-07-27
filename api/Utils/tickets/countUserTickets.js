import Ticket from "../../DB/Schema/Ticket.js";

const countUserTickets = async (user, guildId) => {
  try {
    const total = await Ticket.find({ createdBy: user.id, guildId });
    if (!total) return 0;
    const count = total.length;
    return count;
  } catch (err) {
    console.log("Error countUserTickets: ", err);
  }
};

export default countUserTickets;
