import { SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!")
    .addStringOption((option) =>
      option
        .setName("subject")
        .setDescription("Ticket Subject")
        .setRequired(true)
    ),
  execute: async (interaction) => {
    await interaction.reply({ content: "Pong!", ephemeral: true }); // ephermal > only visible for yourself
  },
};
