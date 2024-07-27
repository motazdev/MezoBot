import { ChannelType, PermissionsBitField } from "discord.js";
import { afterTicketCreateButtonsRow } from "../ButtonsRows/afterTicketCreateButtons.js";
import { default as EmbedDB } from "../DB/Schema/Embed.js";
import afterTicketCreateEmbed from "../Embeds/afterTicketCreateEmbed.js";
import createTicket from "../Utils/tickets/createTicket.js";
import createUser from "../Utils/users/createUser.js";
import countUserTickets from "./tickets/countUserTickets.js";

const createTicketChannel = async (interaction, categoryId) => {
  const guild = interaction.client.guilds.cache.get(interaction.guildId);
  const user = interaction.user;
  const subject =
    interaction.options.get("subject")?.value || "No Subject Provided";

  const createNewUser = await createUser(user, "user", interaction.guildId);

  const count = await countUserTickets(user, interaction.guildId);
  if (count > 10) {
    return { error: "You can't create more than 10 Tickets" };
  }
  let chID = 0;
  const newChannel = await guild.channels
    .create({
      name: `ticket-#${count + 1}-${user.globalName}`,
      type: ChannelType.GuildText,
      parent: categoryId,
      permissionOverwrites: [
        {
          id: user.id,
          allow: [PermissionsBitField.Flags.ViewChannel],
        },
        {
          id: interaction.client.user.id,
          allow: [PermissionsBitField.Flags.ViewChannel],
        },
        {
          id: guild.roles.everyone.id,
          deny: [PermissionsBitField.Flags.ViewChannel],
        },
      ],
    })
    .then(async (channel) => {
      const customAfterTicketCreateEmbed = await EmbedDB.findOne({
        embed_tag: "after_ticket_create",
      }).then((data) => data);

      let msg;
      if (customAfterTicketCreateEmbed) {
        msg = await channel.send({
          embeds: [
            afterTicketCreateEmbed(subject, customAfterTicketCreateEmbed),
          ],
          components: [afterTicketCreateButtonsRow],
        });
      } else {
        msg = await channel.send({
          embeds: [afterTicketCreateEmbed(subject)],
          components: [afterTicketCreateButtonsRow],
        });
      }
      const newChannelId = channel.id;
      // Create a message component collector
      const newTicket = await createTicket(
        subject,
        user,
        newChannelId,
        channel.name,
        channel.guild.id
      );

      chID = channel.id;
    });
  return { id: chID };
};

export default createTicketChannel;
