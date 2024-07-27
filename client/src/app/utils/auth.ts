import connectDB from "@/DB/connect";
import User from "@/DB/models/User";
import jwt from "jsonwebtoken";
import { NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
export const authOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      const conn = await connectDB();
      const isExist = (await User.find({ id: token.id })).length > 0;
      if (!isExist) {
        await User.create({ id: token.id, username: token.name });
      }
      const userToken = jwt.sign(
        { id: token.id, username: token.name },
        process.env.NEXTAUTH_SECRET!
      );
      session.user.accessToken = userToken;
      session.user.id = token.id as string;
      session.accessToken = token.accessToken as string;
      return session;
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthOptions;
