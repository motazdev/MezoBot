import { IEmbed } from "@/lib/types/embed.interface";

export interface IEmbedDefaultData {
  [key: string]: IEmbed;
}

export const embedDefaultData: IEmbedDefaultData = {
  after_ticket_create: {
    fields: [],
    title: "Ticket Name",
    footer: "Footer",
    description:
      "Thank you for contacting support Please describe your issue and wait for a response.",
  } as IEmbed,
  after_ticket_claimed: {
    title: "Claimed Ticket ✅",
    fields: [],
    footer: "Footer of claimed ticket",
    description:
      "Thank you for contacting support Please describe your issue and wait for a response.",
  } as IEmbed,
  on_ticket_create: {
    title: "Ticket Name",
    footer: "Footer",
    fields: [],

    description:
      "Thank you for contacting support Please describe your issue and wait for a response.",
  } as IEmbed,
};
