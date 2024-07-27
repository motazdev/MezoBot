import { SlashCommandBuilder } from "discord.js";
import { default as EmbedDB } from "../../DB/Schema/Embed.js";
import ticketCreateEmbed from "../../Embeds/ticketCreateEmbed.js";
import createTicketChannel from "../../Utils/createTicketChannel.js";
import Guild from "../../DB/Schema/Guild.js";

export default {
  data: new SlashCommandBuilder()
    .setName("ticket")
    .setDescription("Create a new ticket!")
    .addStringOption((option) =>
      option
        .setName("subject")
        .setDescription("Ticket Subject")
        .setRequired(true)
    ),
  execute: async (interaction) => {
    const guild = await Guild.findOne({ guildId: interaction.guildId });
    if (!guild.categoryId || !guild.staff_roles || !guild.staff_roles?.length) {
      if (interaction.user.id == guild.ownerId) {
        return await interaction.reply({
          content:
            "Update Support Category & Staff roles in the dashboard so i can start working !",
          ephemeral: true,
        });
      }

      return await interaction.reply({
        content: "I'll be working soon !",
        ephemeral: true,
      });
    }
    const createTicket = await createTicketChannel(
      interaction,
      guild.categoryId
    );
    await interaction.deferReply();

    if (createTicket?.error) {
      return interaction.editReply({
        content: createTicket.error,
        ephemeral: true,
      });
    }

    const customOnTicketCreateEmbed = await EmbedDB.findOne({
      embed_tag: "on_ticket_create",
    }).then(async (data) => {
      const Embed = await ticketCreateEmbed(
        data?.title,
        interaction,
        createTicket.id,
        data
      );
      await interaction.editReply({ embeds: [Embed], ephemeral: true });
    });
  },
};
