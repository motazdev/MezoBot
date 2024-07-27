import ticketService from "@/services/ticket";
import { ShieldHalfIcon, Ticket, UsersRound } from "lucide-react";
import guildService from "@/services/guild";
import GuildDataBox from "./GuildDataBox";

const GuildDataBoxes = async ({ params }: { params: { guildId: string } }) => {
  const tickets = await ticketService.getGuildTickets({
    guildId: params.guildId,
  });
  const staff = await guildService.getGuildStaff({
    guildId: params.guildId,
  });
  const members = await guildService.getGuildMembers({
    guildId: params.guildId,
  });
  return (
    <div className="grid lg:grid-cols-3 sm:gap-y-3 md:gap-y-0  sm:grid-cols-1 gap-3 py-10 ">
      <GuildDataBox
        icon={<Ticket size={50} />}
        boxName="Total Tickets"
        data={tickets?.data.length}
      />
      <GuildDataBox
        icon={<ShieldHalfIcon size={50} />}
        boxName="Staff"
        data={staff?.data.length}
      />
      <GuildDataBox
        icon={<UsersRound size={50} />}
        boxName="Members"
        data={members.data.length}
      />
    </div>
  );
};

export default GuildDataBoxes;
