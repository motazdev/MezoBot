import { DataResponse } from "@/lib/types";
import request from "./request";
import { Ticket } from "@/app/(guild)/guild/[guildId]/tickets/ticketsColumns";
export interface ChartData {
  claimed: number;
  closed: number;
  open: number;
}
const ticketService = {
  getGuildTickets: ({
    guildId,
  }: {
    guildId: string;
  }): Promise<DataResponse<Ticket[]>> =>
    request.get(`/ticket/guild/${guildId}`),
  getTicketData: ({
    ticketId,
  }: {
    ticketId: string;
  }): Promise<DataResponse<Ticket>> => request.get(`/ticket/${ticketId}`),
  claimedTicketsByAdmin: ({
    adminId,
  }: {
    adminId: string;
  }): Promise<DataResponse<Ticket[]>> =>
    request.get(`/ticket/claimed/${adminId}`),
  summaryTicketsChartData: ({
    guildId,
  }: {
    guildId: string;
  }): Promise<DataResponse<ChartData>> =>
    request.get(`/ticket/${guildId}/summary-chart-data`),
};

export default ticketService;
