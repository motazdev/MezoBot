import axios from "axios";
import {
  APIChannel,
  APIGuildCategoryChannel,
  APIRole,
  SingleGuild,
} from "discord.js";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "./auth";

export const getGuildsOfUser = async (session: Session) => {
  const response = await fetch("https://discord.com/api/users/@me/guilds", {
    cache: "force-cache",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });
  const guilds = await response.json();
  return guilds;
};

export const getGuildCategories = async ({ guildId }: { guildId: string }) => {
  try {
    const response: { data: APIGuildCategoryChannel[] } = await axios.get(
      `https://discord.com/api/guilds/${guildId}/channels`,
      {
        headers: {
          Authorization: process.env.NEXT_BOT_API_TOKEN!,
        },
      }
    );
    const categories = response.data.filter(
      (ch: APIGuildCategoryChannel) => ch.type === 4
    );
    return categories;
  } catch (error) {
    console.log("Errorr >", error);
  }
};

export const getGuildRoles = async ({
  guildId,
}: {
  guildId: string;
}): Promise<APIRole[]> => {
  const response = await fetch(
    `https://discord.com/api/guilds/${guildId}/roles`,
    {
      headers: {
        Authorization: process.env.NEXT_BOT_API_TOKEN!,
      },
    }
  );

  const data = await response.json();
  return data;
};

export const getGuildUserById = async (userId: string) => {
  const session = (await getServerSession(authOptions)) as Session;
  const response = await fetch(`/api/guild-users/${userId}`, {
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  });
  const data = await response.json();
  return data;
};

export const getGuildData = async ({
  guildId,
}: {
  guildId: string;
}): Promise<SingleGuild> => {
  const response = await fetch(
    `https://discord.com/api/guilds/${guildId}?with_counts=true`,
    {
      headers: {
        Authorization: process.env.NEXT_BOT_API_TOKEN!,
      },
    }
  );

  const data = await response.json();
  return data;
};
