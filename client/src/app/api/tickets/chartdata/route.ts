import { authOptions } from "@/app/utils/auth";
import connectDB from "@/DB/connect";
import Ticket, { ITicket } from "@/DB/models/Ticket";
import { DBReturnData } from "@/lib/types/ticket.interface";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export interface TicketsData extends DBReturnData {
  tickets?: ITicket[];
}

export async function GET(
  req: NextRequest,
  ctx: any
): Promise<NextResponse<TicketsData>> {
  const GSS = await getServerSession(authOptions);
  if (GSS) {
    const db = await connectDB();

    //   let options = new Set([
    //     { status: "open", count: 5 },
    //     { status: "closed", count: 50 },
    //   ]);
    let options = new Array<any>([{ status: "none", count: 100 }]);
    let claimedCount;
    let openCount;
    let closedCount;
    let series: Array<number> = [];
    const ticketsStatus = ["open", "closed", "claimed"];
    const tickets = (await Ticket.find()) as ITicket[];

    const yy = tickets.map((t: ITicket) => {
      return { status: t.status };
    });

    ticketsStatus.forEach((st, i) => {
      series.push(tickets.filter((t) => t.status === st).length);
    });
    if (!tickets.length) {
      return NextResponse.json({
        success: false,
        msg: "There is no tickets at this moment.",
      } as TicketsData);
    }

    claimedCount = tickets.filter((t) => t.status === "claimed").length;
    openCount = tickets.filter((t) => t.status === "open").length;
    closedCount = tickets.filter((t) => t.status === "closed").length;

    const optionsArray = Array.from(options);

    return NextResponse.json({
      test: yy,
      success: true,
      status: ticketsStatus,
      statusCount: series,
    } as TicketsData);
  }
  return NextResponse.json({
    success: false,
    message: "You are not Authorized!",
  });
}
