import { ButtonBuilder, ButtonStyle, ActionRowBuilder } from "discord.js";

const closeTicketButton = new ButtonBuilder({
  label: "Close",
  style: ButtonStyle.Danger,
  custom_id: "close_ticket",
});

const afterTicketClaimButtonsRow = () => {
  const row = new ActionRowBuilder().addComponents(closeTicketButton);
  return row;
};

export default afterTicketClaimButtonsRow;
