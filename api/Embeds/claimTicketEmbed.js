import { EmbedBuilder } from "discord.js";

const claimTicketEmbed = (userClaimed, data = null) => {
  const embed = new EmbedBuilder({
    title: "Claimed Ticket ✅",
    description: `Your ticket will be handled by ${userClaimed}`,
  });

  return embed;
};

export default claimTicketEmbed;
