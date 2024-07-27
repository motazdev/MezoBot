import { EmbedBuilder } from "discord.js";
import countUserTickets from "../Utils/tickets/countUserTickets.js";
import Ticket from "../DB/Schema/Ticket.js";

const ticketClosedEmbed = async (client, interaction) => {
  const ticket = await Ticket.findOne({ channelId: interaction.channelId });
  const embed = new EmbedBuilder({
    author: { name: interaction.guild.name },
    title: `Closed Ticket Details`,
    description: ticket._id || 0,
    fields: [
      { name: "Ticket ID", value: ticket._id || 0, inline: true },
      {
        name: "Created By",
        value: `<@${ticket.createdBy}>` || 0,
        inline: true,
      },
      { name: "Opened At", value: `${ticket.createdAt}`, inline: true },
      {
        name: "Claimed By",
        value: ticket.claimedBy ? `<@${ticket.claimedBy}>` : "Not Claimed",
        inline: true,
      },
      { name: "Reason", value: ticket.reason || "No Reason", inline: true },
    ],
  });

  return embed;
};

export default ticketClosedEmbed;
