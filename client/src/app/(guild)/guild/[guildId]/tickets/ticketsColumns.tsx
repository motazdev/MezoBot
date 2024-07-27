"use client";

import TicketsTableDropDown from "@/components/guild-dashboard/dropdown-menus/TicketsTableDropDown";
import { Checkbox } from "@/components/ui/checkbox";
import { DBUser } from "@/lib/types";
import { TicketsStatus } from "@/lib/types/ticket.interface";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export type Ticket = {
  _id: string;
  guildId: string;
  subject: string;
  channelName: string;
  createdBy: DBUser;
  status: "open" | "closed" | "claimed";
  claimedBy: DBUser;
  reason: string;
  channelId: string;
};
export type VisibilityState = Record<string, boolean>;
export type VisibilityTableState = {
  columnVisibility: VisibilityState;
};
export const ticketsColumns: ColumnDef<Ticket>[] = [
  {
    accessorKey: "_id",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "ID",
    accessorKey: "_id",
    header: "ID",
  },
  {
    accessorKey: "createdBy.globalName",
    id: "Created By",
    header: "Created By",
    cell: ({ row }) => {
      const value: TicketsStatus = row.getValue("Created By");
      return (
        <div className="flex w-full justify-start">
          <Link
            scroll={false}
            href={`/guild/${row.original.guildId}/tickets/${row.original._id}/details`}
            className="text-center bg-blue-700/35 rounded-md py-1 px-2 text-sm capitalize"
          >
            {value}
          </Link>
        </div>
      );
    },
  },
  {
    id: "claimedBy.globalName",
    accessorKey: "claimedBy.globalName",
    header: "Claimed By",
    cell: ({ row }) => {
      const value: TicketsStatus = row.getValue("status");
      if (row.original.status === "claimed") {
        return (
          <div className="flex w-full justify-start">
            <Link
              scroll={false}
              href={`/guild/${row.original.guildId}/staff/${row.original.claimedBy.id}`}
              className="text-center bg-blue-700/35 rounded-md py-1 px-2 text-sm capitalize"
            >
              {row.original?.claimedBy?.globalName}
            </Link>
          </div>
        );
      } else {
        return (
          <div className="flex w-full justify-start">
            <p className="text-center text-gray-400">Not Claimed Yet</p>
          </div>
        );
      }
    },
  },
  {
    accessorKey: "status",
    header: "Status",

    cell: ({ row }) => {
      const value: TicketsStatus = row.getValue("status");

      if (value === "claimed") {
        return (
          <div className="flex w-full justify-start">
            <Link
              scroll={false}
              href={`/guild/${row.original.guildId}/tickets/${row.original._id}/details`}
              className="bg-[hsl(var(--chart-2))] w-full  text-white font-semibold text-center rounded-md py-2 px-2 capitalize"
            >
              {value}
            </Link>
          </div>
        );
      } else if (value === "closed") {
        return (
          <div className="flex w-full justify-start">
            <Link
              scroll={false}
              href={`/guild/${row.original.guildId}/tickets/${row.original._id}/details`}
              className="bg-[hsl(var(--chart-5))] w-full text-center text-white font-semibold rounded-md py-2 px-2 capitalize"
            >
              {value}
            </Link>
          </div>
        );
      } else {
        return (
          <div className="flex w-full justify-start">
            <Link
              scroll={false}
              href={`/guild/${row.original.guildId}/tickets/${row.original._id}/details`}
              className="bg-[hsl(var(--chart-1))] w-full text-center text-white font-semibold rounded-md py-2 px-2 capitalize"
            >
              {value}
            </Link>
          </div>
        );
      }
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const ticketHolderId = row.original.createdBy.id;

      return <TicketsTableDropDown ticketHolderId={ticketHolderId} />;
    },
  },
];
