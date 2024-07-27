import { authOptions } from "@/app/utils/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest, ctx: any) {
  const GSS = await getServerSession(authOptions);

  if (GSS) {
    const userId = ctx.params.userId;

    const response = await fetch(`https://discord.com/api/users/${userId}`, {
      cache: "force-cache",
      headers: {
        Authorization: process.env.NEXT_BOT_API_TOKEN!,
      },
    });
    const data = await response.json();
    return NextResponse.json(data);
  }
  return NextResponse.json({
    success: false,
    message: "You are not Authorized!",
  });
}
