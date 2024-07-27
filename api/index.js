import cors from "cors";
import {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  Partials,
} from "discord.js";
import dotenv from "dotenv";
import express from "express";
import { Server } from "socket.io";
import { connectDB } from "./DB/connect.js";
import { default as EmbedDB } from "./DB/Schema/Embed.js";
import Guild from "./DB/Schema/Guild.js";
import ticketClosedEmbed from "./Embeds/ticketClosedEmbed.js";
import { loadCommands } from "./Handlers/commandHandler.js";
import { loadEvents } from "./Handlers/eventHandler.js";
import closeTicketReasonModal from "./Modals/closeTicketReasonModal.js";
import appRouter from "./server/app.router.js";
import { claimTicket, closeTicket } from "./Utils/tickets/updateTicket.js";
import afterTicketClaimButtonsRow from "./ButtonsRows/afterTicketClaimButtons.js";
import claimTicketEmbed from "./Embeds/claimTicketEmbed.js";
const { User, Message, GuildMember } = Partials;

const { Guilds, GuildMembers, GuildMessages, GuildPresences } =
  GatewayIntentBits;
dotenv.config();
const app = express();
const port = 3001;

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());

connectDB();

export const client = new Client({
  intents: [Guilds, GuildMembers, GuildMessages, GuildPresences],
  partials: [User, Message, GuildMember],
});
client.commands = new Collection();

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on("guildCreate", async (guild) => {
  try {
    const isExist = (await Guild.find({ guildId: guild.id })).length;
    if (!isExist) {
      const newGuild = await Guild.create({
        guildId: guild.id,
        ownerId: guild.ownerId,
        name: guild.name,
      });
    }
  } catch (error) {
    console.log("Error adding guild", error);
  }
});
client.login(process.env.DISCORD_TOKEN).then(() => {
  loadEvents(client);
  loadCommands(client);
});

const getDiscordClient = (req, res, next) => {
  req.discordClient = client;

  return next();
};

appRouter(app, express, getDiscordClient);

const server = app.listen(port, () =>
  console.log(`MezoBot app listening on port ${port}!`)
);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

client.on("interactionCreate", async (interaction) => {
  const guildData = await Guild.findOne({ guildId: interaction.guildId });
  const user = interaction.user;

  if (interaction.customId === "close_ticket") {
    await interaction.showModal(closeTicketReasonModal(interaction.channelId));
  } else if (interaction.customId === "claim_ticket") {
    const userRoles = interaction.member.roles.cache.map((r) => r.id);
    const isClaimAllowed = userRoles.some((r) => {
      return guildData.staff_roles.includes(r);
    });
    if (isClaimAllowed) {
      const customOnTicketClaimEmbed = await EmbedDB.findOne({
        embed_tag: "on_ticket_claim",
      }).then((data) => data);
      interaction.message.edit({
        components: [afterTicketClaimButtonsRow()],
      });
      const userClaimed = `<@${user.id}>`;
      claimTicket(interaction.channelId, user.id);
      return await interaction.reply({
        ephemeral: true,
        embeds: [claimTicketEmbed(userClaimed, customOnTicketClaimEmbed)],
      });
    }

    return await interaction.reply({
      ephemeral: true,
      content: "Only Staff members can claim the tickets",
    });
  }
});

client.on("interactionCreate", async (interaction) => {
  const guildData = await Guild.findOne({ guildId: interaction.guildId });
  const user = interaction.user;
  if (
    interaction.customId ===
    `close_ticket_reason_modal_${interaction.channelId}`
  ) {
    const reason = interaction.fields.getTextInputValue("reason_input");

    const ticketsChannels = interaction.guild.channels.cache.filter(
      (ch) => ch.parentId === guildData.categoryId
    );
    const yy = await closeTicket(reason, interaction.channelId);

    let embed = await ticketClosedEmbed(client, interaction);
    // DELETE LATER
    if (reason == "test") {
      ticketsChannels.forEach((e) => e.delete());
    } else {
      await client.users.send(user, {
        embeds: [embed.data],
      });
      await interaction.guild.channels.cache
        .get(interaction.channelId)
        .delete("Ticket Closed");
    }

    await interaction.reply({
      content: "Ticket Closed!",
    });
  }
});

io.on("connection", (socket) => {
  socket.on("ticket_created", (message) => {
    console.log("Ticket has been created (server): ", message);
    io.emit("ticket_created", `${message}`);
  });
});