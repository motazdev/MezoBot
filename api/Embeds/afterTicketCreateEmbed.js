import { EmbedBuilder } from "discord.js";

const afterTicketCreateEmbed = (subject, data = null) => {
  const embed = new EmbedBuilder({
    title: data?.title || "Ticket Opened",
    description:
      data?.description ||
      "Thank you for contacting support Please describe your issue and wait for a response.",
    fields: data?.fields || [],
    footer: { text: data?.footer || "Powered By Mezo BOT" },
  });

  return embed;
};

export default afterTicketCreateEmbed;
