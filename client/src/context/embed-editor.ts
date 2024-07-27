import { IEmbed, IEmbedResponse } from "@/lib/types/embed.interface";
import { create } from "zustand";

type Store = {
  data: {
    [key: string]: IEmbedResponse | null;
  };
  setOnTicketCreateEmbed: (embed: any) => void;
  setAfterTicketCreateEmbed: (embed: any) => void;
  setAfterTicketClaimedEmbed: (embed: any) => void;
  setEmbedDisplayFields: (embed: any) => void;
  setEmbedData: (embed: any) => void;
};

export const useEmbedStore = create<Store>((set) => ({
  data: {
    on_ticket_create: null,
    after_ticket_create: null,
    after_ticket_claimed: null,
  },
  setOnTicketCreateEmbed: (embed: IEmbedResponse | IEmbed) =>
    set((state: any) => ({
      data: {
        ...state.data,
        on_ticket_create: embed,
      },
    })),
  setAfterTicketCreateEmbed: (embed: IEmbedResponse | IEmbed) =>
    set((state: any) => ({
      data: {
        ...state.data,
        after_ticket_create: embed,
      },
    })),
  setAfterTicketClaimedEmbed: (embed: IEmbedResponse | IEmbed) =>
    set((state: any) => ({
      data: {
        ...state.data,
        after_ticket_claimed: embed,
      },
    })),
  setEmbedData: (embed: any) => set({ data: embed }),
  setEmbedDisplayFields: (fields: any) =>
    set((state: any) => ({ data: { ...state.data, fields } })),
}));
