import { EmbedBuilder } from "discord.js";
import Guild from "../DB/Schema/Guild.js";

const ticketCreateEmbed = async (
  title,
  interaction,
  channelID,
  data = null
) => {
  let activeAdmins = [];
  const guild = interaction.client.guilds.cache.get(interaction.guildId);
  const guildDB = await Guild.findOne({ guildId: interaction.guildId });
  const members = await guild.members.fetch();

  let onlineMembers = members.filter(
    (member) =>
      !member.user.bot &&
      member.presence &&
      member.presence.status !== "offline"
  );

  members.map((user) => {
    const member = guild.members.cache.get(user.user.id);
    const memberRoles = member.roles.cache;
    memberRoles.forEach((role) => {
      if (guildDB.staff_roles.find((id) => id === role.id)) {
        activeAdmins.push(user.user.username);
      }
    });
  });

  const embed = new EmbedBuilder({
    color: "1752220",
    title,
    description: data?.description
      ? data?.description
      : `Ticket opened at Room <#${channelID}>`,
    fields: data?.fields
      ? data?.fields
      : [{ name: "Active Admins", value: activeAdmins.length }],
    footer: { text: data?.footer ? data.footer : "Powered By Mezo BOT" },
  });
  embed.data.id = "ticket_created_successfully_embed";

  return embed;
};

export default ticketCreateEmbed;
