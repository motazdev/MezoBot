import { BaseGuild, Guild } from "discord.js";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      email: string;
      image: string;
      address: string;
      provider: string;
      id: string | number;
      accessToken: string;
    };
    accessToken: string | number;
  }
}

declare module "discord.js" {
  interface SingleGuild extends Guild, BaseGuild {
    approximate_member_count: number | null;
    approximate_presence_count: number | null;
    roles: Array<Role>;
  }
}
