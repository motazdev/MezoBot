import PageHeader from "@/components/guild-dashboard/PageHeader";
import UserCard from "@/components/guild-dashboard/UserCard";
import { Button } from "@/components/ui/button";
import ticketService from "@/services/ticket";

interface PageProps {
  params: {
    ticketId: string;
    guildId: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const ticketId = params.ticketId;

  const ticket = await ticketService.getTicketData({ ticketId });

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Ticket Details"
        description={ticketId}
        action={
          <Button className="capitalize" variant={ticket.data.status}>
            {ticket.data.status}
          </Button>
        }
      />
      <div className="details">
        <div className="grid grid-cols-3 gap-6">
          <div className="CreatedBy">
            <h3 className="text-xl mb-4">Created By</h3>
            {ticket.data.createdBy && (
              <UserCard
                userId={ticket.data.createdBy.id}
                guildId={params.guildId}
              />
            )}
          </div>
          {ticket.data.claimedBy && (
            <div className="ClaimedBy">
              <h3 className="text-xl mb-4">Claimed By</h3>
              <UserCard
                userId={ticket.data.claimedBy.id}
                guildId={params.guildId}
              />
            </div>
          )}

          <div className="ticketchanneldata">
            <h3 className="text-xl mb-4">Ticket Channel</h3>
            <div className="border rounded-md py-5 px-3">
              <div className="flex flex-col">
                <div className="flex flex-row gap-2">
                  <p className="text-gray-400">Channel ID: </p>
                  <p>{ticket.data.channelId}</p>
                </div>
                <div className="flex flex-row gap-2">
                  <p className="text-gray-400">Channel Name: </p>
                  <p>
                    {ticket.data.createdBy.globalName} number{" "}
                    {ticket.data.channelName}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {ticket.data.status == "closed" && (
            <div className="ticketchanneldata">
              <h3 className="text-xl mb-4">Ticket Data</h3>
              <div className="border rounded-md py-5 px-3">
                <div className="flex flex-col">
                  <div className="flex flex-row gap-2">
                    <p className="text-gray-400">Closed Reason: </p>
                    <p>{ticket.data.reason}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
