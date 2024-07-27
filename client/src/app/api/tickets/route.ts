import { authOptions } from "@/app/utils/auth";
import connectDB from "@/DB/connect";
import Ticket, { ITicket } from "@/DB/models/Ticket";
import { DBReturnData } from "@/lib/types/ticket.interface";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export interface TicketsData extends DBReturnData {
  tickets?: ITicket[];
  ticket?: ITicket;
}

export async function GET(
  req: NextRequest,
  ctx: any
): Promise<NextResponse<TicketsData>> {
  const GSS = await getServerSession(authOptions);

  if (GSS) {
    const db = await connectDB();

    const searchParams = req.nextUrl.searchParams;
    const count = searchParams.get("count");

    const ticketId = searchParams.get("ticketId");

    if (ticketId) {
      const ticket = await Ticket.findById(ticketId).populate([
        {
          path: "claimedBy",
          select: "name role",
          foreignField: "id",
        },
        {
          path: "user",
          select: "name role",
          foreignField: "id",
        },
      ]);
      return NextResponse.json({
        success: true,
        ticket,
      } as TicketsData);
    }

    if (count) {
      let claimed;
      let open;
      let closed;
      const tickets = await Ticket.find();
      claimed = tickets.filter((t) => t.status === "claimed").length;
      open = tickets.filter((t) => t.status === "open").length;
      closed = tickets.filter((t) => t.status === "closed").length;

      if (!tickets.length) {
        return NextResponse.json({
          success: false,
          msg: "There is no tickets at this moment.",
        } as TicketsData);
      }

      return NextResponse.json({
        success: true,
        data: {
          claimed: {
            status: "claimed",
            count: claimed,
          },
          open: {
            status: "open",
            count: open,
          },
          closed: {
            status: "closed",
            count: closed,
          },
        },
      } as TicketsData);
    }

    const tickets = await Ticket.find();
    if (!tickets.length) {
      return NextResponse.json({
        success: false,
        msg: "There is no tickets at this moment.",
      } as TicketsData);
    }
    return NextResponse.json({
      success: true,
      tickets,
    } as TicketsData);
  }
  return NextResponse.json({
    success: false,
    message: "You are not Authorized!",
  });
}
