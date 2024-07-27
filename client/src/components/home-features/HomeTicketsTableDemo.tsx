import { Ticket } from "@/app/(guild)/guild/[guildId]/tickets/ticketsColumns";
import GradiantTicketsTable from "../guild-dashboard/tables/GradiantTicketsTable";
import { HomeTicketsColumns } from "./HomeTicketsColumns";

const HomeTicketsTableDemo = () => {
  const ticketsData: Ticket[] = [
    {
      _id: "1",
      guildId: "NULL",
      subject: "NULL",
      channelName: "channelname",
      createdBy: {
        globalName: "DisUser1",
        _id: "1",
        name: "NULL",
        guildId: "NULL",
        id: "1",
        role: "admin",
      },
      status: "open",
      claimedBy: {
        globalName: "mezo",
        _id: "1",
        name: "NULL",
        guildId: "NULL",
        id: "1",
        role: "admin",
      },
      reason: "NULL",
      channelId: "NULL",
    },
    {
      _id: "2",
      guildId: "NULL",
      subject: "NULL",
      channelName: "channelname",
      createdBy: {
        globalName: "DisUser2",
        _id: " 2",
        name: "NULL",
        guildId: "NULL",
        id: "2",
        role: "admin",
      },
      status: "closed",
      claimedBy: {
        globalName: "mezo",
        _id: "2",
        name: "NULL",
        guildId: "NULL",
        id: "2",
        role: "admin",
      },
      reason: "NULL",
      channelId: "NULL",
    },
    {
      _id: "3",
      guildId: "NULL",
      subject: "NULL",
      channelName: "channelname",
      createdBy: {
        globalName: "DisUser3",
        _id: " 3",
        name: "NULL",
        guildId: "NULL",
        id: "3",
        role: "admin",
      },
      status: "claimed",
      claimedBy: {
        globalName: "MezoBot",
        _id: "3",
        name: "NULL",
        guildId: "NULL",
        id: "3",
        role: "admin",
      },
      reason: "NULL",
      channelId: "NULL",
    },
  ];
  return (
    <GradiantTicketsTable columns={HomeTicketsColumns} data={ticketsData} />
  );
};

export default HomeTicketsTableDemo;
