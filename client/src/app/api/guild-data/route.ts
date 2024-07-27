import { authOptions } from "@/app/utils/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  const GSS = await getServerSession(authOptions);

  if (GSS) {
    const guildId = req.url.split("=")[1];
    const response = await fetch(
      `https://discord.com/api/guilds/${guildId}?with_counts=true`,
      {
        cache: "force-cache",
        headers: {
          Authorization: process.env.NEXT_BOT_API_TOKEN!,
        },
      }
    );
    const guild = await response.json();

    return NextResponse.json(guild);
  }
  return NextResponse.json({
    success: false,
    message: "You are not Authorized!",
  });
}
