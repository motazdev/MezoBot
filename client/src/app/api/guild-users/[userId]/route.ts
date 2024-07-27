import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export async function GET(req: NextRequest, ctx: any) {
  const userId = ctx.params.userId;

  const response = await fetch(`https://discord.com/api/users/${userId}`, {
    headers: {
      Authorization: process.env.NEXT_BOT_API_TOKEN!,
    },
  });
  const data = await response.json();
  return NextResponse.json(data);
}
