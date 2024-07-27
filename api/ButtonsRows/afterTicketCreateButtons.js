import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

const closeTicketButton = new ButtonBuilder({
  label: "Close",
  style: ButtonStyle.Danger,
  custom_id: "close_ticket",
});

const claimTicketButton = () => {
  return new ButtonBuilder({
    label: "Claim",
    style: ButtonStyle.Primary,
    custom_id: "claim_ticket",
  });
};

export const afterTicketCreateButtonsRow = new ActionRowBuilder().addComponents(
  closeTicketButton,
  claimTicketButton()
);
