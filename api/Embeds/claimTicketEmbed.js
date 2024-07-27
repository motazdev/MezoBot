import { EmbedBuilder } from "discord.js";

const claimTicketEmbed = (userClaimed, data = null) => {
  const embed = new EmbedBuilder({
    title: data?.title || "Claimed Ticket ✅",
    description:
      data?.description || `Your ticket will be handled by ${userClaimed}`,
    description: data?.footer || `Powered By MezoBot`,
  });

  return embed;
};

export default claimTicketEmbed;
