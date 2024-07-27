const createInteraction = {
  name: "interactionCreate",
  on: true,
  async execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) {
      interaction.interaction.reply({ content: "outdated command" });
    }
    try {
      await command.execute(interaction);
    } catch (error) {
      console.error("interaction error ==> ", error);
      if (interaction.replied || interaction.deferred) {
        await interaction.editReply({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      }
    }
  },
};

export default createInteraction;
