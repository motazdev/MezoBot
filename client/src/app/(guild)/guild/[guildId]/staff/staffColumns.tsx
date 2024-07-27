"use client";

import StaffTableDropDown from "@/components/guild-dashboard/dropdown-menus/StaffTableDropDown";
import { Checkbox } from "@/components/ui/checkbox";
import { DBUser } from "@/lib/types";
import { TicketsStatus } from "@/lib/types/ticket.interface";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export type Staff = DBUser;

export const staffCols = async () => {};

export const staffColumns: ColumnDef<Staff>[] = [
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
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "username",
    id: "username",
    header: "Username",
    cell: ({ row }) => {
      const value: TicketsStatus = row.getValue("username");
      return (
        <div className="flex w-full justify-start">
          <Link
            scroll={false}
            href={`/guild/${row.original.guildId}/staff/${row.original.id}`}
            className="text-center bg-blue-700/35 rounded-md py-1 px-2 text-sm"
          >
            {value}
          </Link>
        </div>
      );
    },
  },
  {
    id: "globalName",
    accessorKey: "globalName",
    header: "Name",
    cell: ({ row }) => {
      const value: TicketsStatus = row.getValue("globalName");
      return (
        <div className="flex w-full justify-start">
          <Link
            scroll={false}
            href={`/guild/${row.original.guildId}/staff/${row.original.id}`}
            className="text-center bg-blue-700/35 rounded-md py-1 px-2 text-sm"
          >
            {value}
          </Link>
        </div>
      );
    },
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return <StaffTableDropDown staffId={row.original.id} />;
    },
  },
];
