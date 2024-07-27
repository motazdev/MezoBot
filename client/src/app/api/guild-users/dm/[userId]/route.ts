import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/auth";

interface createDmBodyProps {
  recipient_id: string;
}
const rateLimitMap = new Map();

export async function POST(req: NextRequest, ctx: any) {
  const GSS = await getServerSession(authOptions);

  const bodyData = await req.json();

  // rate limit
  const ip = req.headers.get("x-forwarded-for") || req.ip;
  const limit = 1; // Limiting requests to 1 per minute per IP
  const windowMs = 60 * 1000; // 1 minute

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, {
      count: 0,
      lastReset: Date.now(),
    });
  }
  const ipData = rateLimitMap.get(ip);

  if (Date.now() - ipData.lastReset > windowMs) {
    ipData.count = 0;
    ipData.lastReset = Date.now();
  }

  if (ipData.count >= limit) {
    return NextResponse.json({
      success: false,
      msg: "You can only send 1 message per minute!",
    });
  }

  ipData.count += 1;

  if (GSS) {
    const userId = ctx.params.userId;

    const createDmBody: createDmBodyProps = { recipient_id: userId };
    const createDmResponse = await fetch(
      `https://discord.com/api/users/@me/channels`,
      {
        cache: "force-cache",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.NEXT_BOT_API_TOKEN!,
        },
        body: JSON.stringify(createDmBody),
      }
    );
    const createDmData = await createDmResponse.json();

    const createMessageResponse = await fetch(
      `https://discord.com/api/channels/${createDmData.id}/messages`,
      {
        cache: "force-cache",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.NEXT_BOT_API_TOKEN!,
        },
        body: JSON.stringify(bodyData as any),
      }
    );
    const createMessageData = await createMessageResponse.json();
    return NextResponse.json({
      success: true,
      msg: `Message Sent Successfully`,
    });
  }

  return NextResponse.json({
    success: false,
    message: "You are not Authorized!",
  });
}
