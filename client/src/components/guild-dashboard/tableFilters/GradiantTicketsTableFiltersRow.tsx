"use client";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ChevronDown } from "lucide-react";
import { Button } from "../../ui/button";

const GradiantTicketsTableFiltersRow = ({ table, setGlobFilter }: any) => {
  return (
    <div className="flex md:items-center py-4 md:flex-row flex-col md:gap-0 gap-y-2">
      <div className="relative w-full max-w-sm">
        <div className="absolute inset-0 rounded-lg opacity-50 bg-gradient-to-l dark:from-background from-white to-transparent " />
        <Input
          placeholder="Filter..."
          onChange={(event) => event.preventDefault()}
          disabled
          className="max-w-sm cursor-text 
      dark:[border-image:linear-gradient(to_left,#1e293b,50%,transparent)_1] 
      [border-image:linear-gradient(to_left,#e5e7eb,50%,transparent)_1] 
      placeholder:[background-image:linear-gradient(to_left,#1e293b,50%,transparent)_1]
      "
        />
        <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r dark:from-background from-slate-50 to-transparent" />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="md:ml-auto justify-start w-fit">
            Columns <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {table
            .getAllColumns()
            .filter((column: any) => column.getCanHide())
            .map((column: any) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default GradiantTicketsTableFiltersRow;
