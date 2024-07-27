import DMUserDataButton from "@/components/guild-dashboard/DMUserDataButton";
import { Button } from "@/components/ui/button";
import useClipboard from "react-use-clipboard";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
const TicketsTableDropDown = ({
  ticketHolderId,
  isDemo = false,
}: {
  ticketHolderId: string;
  isDemo?: boolean;
}) => {
  const [isCopied, setCopied] = useClipboard(ticketHolderId, {
    successDuration: 1000,
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={setCopied}>
          {isCopied ? "Copied.." : "Copy ticket holder ID"}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <DMUserDataButton
            isDemo={isDemo}
            value="DM Ticket Holder Data"
            userId={ticketHolderId}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TicketsTableDropDown;
