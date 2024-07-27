import {
  ModalBuilder,
  TextInputBuilder,
  ComponentType,
  TextInputStyle,
  ActionRowBuilder,
} from "discord.js";

const closeTicketReasonModal = (id) => {
  const modal = new ModalBuilder({
    title: "Reason",
    custom_id: `close_ticket_reason_modal_${id}`,
  });

  const reasonInput = new TextInputBuilder({
    custom_id: "reason_input",
    label: "Reason",
    max_length: 200,
    min_length: 1,
    required: true,
    style: TextInputStyle.Short,
    placeholder: "reason...",
  });
  const reasonInputRow = new ActionRowBuilder().addComponents(reasonInput);

  modal.addComponents(reasonInputRow);
  return modal;
};

export default closeTicketReasonModal;
