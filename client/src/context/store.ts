import { SingleGuild } from "discord.js";
import { headers } from "next/headers";

import { create } from "zustand";
type Store = {
  isLoading: boolean;
  guildToManageId: string;
  singleGuildData: SingleGuild | null;
  fetchGuild: (id: string) => Promise<void>;
  setGuildId: (id: any) => void;
};

const fetchData = async (guildId: string): Promise<SingleGuild> => {
  const response = await fetch(`/api/guild-data?id=${guildId}`, {
    headers: {
      Authorization: "asfasfasf",
    },
  });
  const guild = await response.json();
  return guild;
};

export const useGuildStore = create<Store>((set) => ({
  isLoading: false,
  guildToManageId: "",
  singleGuildData: null,
  setGuildId: (id) => set(() => ({ guildToManageId: id })),
  fetchGuild: async (id) => {
    try {
      set({ isLoading: true });
      const guildData = await fetchData(id).then((data) => {
        set({ isLoading: false });
        set({ singleGuildData: data });
        set({ guildToManageId: id });
      });
    } catch (error) {
      console.error("Error fetching guild data:", error);
    }
  },
}));
