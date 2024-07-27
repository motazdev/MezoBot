import { authOptions } from "@/app/utils/auth";
import PageHeader from "@/components/guild-dashboard/PageHeader";
import TicketsTable from "@/components/guild-dashboard/tables/TicketsTable";
import { Button } from "@/components/ui/button";
import ticketService from "@/services/ticket";
import { PlusIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import { ticketsColumns } from "./ticketsColumns";

const Page = async ({ params }: { params: { guildId: string } }) => {
  const tickets = await ticketService.getGuildTickets({
    guildId: params.guildId,
  });

  return (
    <div className="py-10">
      <div className="flex flex-col gap-8">
        <PageHeader
          title="Tickets"
          description="Click on closed/claimed ticket's status to view its details."
          action={
            <Button>
              New Ticket <PlusIcon />
            </Button>
          }
        />
        <TicketsTable columns={ticketsColumns} data={tickets.data} />
      </div>
    </div>
  );
};

export default Page;
