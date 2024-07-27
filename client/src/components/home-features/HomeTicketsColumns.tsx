"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { DBUser } from "@/lib/types";
import { TicketsStatus } from "@/lib/types/ticket.interface";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
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
export const HomeTicketsColumns: ColumnDef<Ticket>[] = [
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
          <div className="text-center cursor-pointer bg-blue-700/35 rounded-md py-1 px-2 text-sm capitalize">
            {value}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "claimedBy.globalName",
    id: "Claimed By",
    enableHiding: false,
    header: "Claimed By",
    cell: ({ row }) => {
      const value: TicketsStatus = row.getValue("status");
      if (row.original.status === "claimed") {
        return (
          <div className="flex w-full justify-start">
            <div className="text-center cursor-pointer bg-blue-700/35 rounded-md py-1 px-2 text-sm capitalize">
              {row.original?.claimedBy?.globalName}
            </div>
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
    enableHiding: false,
    cell: ({ row }) => {
      const value: TicketsStatus = row.getValue("status");

      if (value === "claimed") {
        return (
          <div className="flex w-full justify-start">
            <div className="bg-[hsl(var(--chart-2))] text-white cursor-pointer w-full font-semibold text-center rounded-md py-2 px-2 capitalize">
              {value}
            </div>
          </div>
        );
      } else if (value === "closed") {
        return (
          <div className="flex w-full justify-start">
            <div className="bg-[hsl(var(--chart-5))] text-white cursor-pointer w-full text-center font-semibold rounded-md py-2 px-2 capitalize">
              {value}
            </div>
          </div>
        );
      } else {
        return (
          <div className="flex w-full justify-start">
            <div className="bg-[hsl(var(--chart-1))] text-white cursor-pointer w-full text-center font-semibold rounded-md py-2 px-2 capitalize">
              {value}
            </div>
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

      return (
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      );
    },
  },
];
