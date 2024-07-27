"use client";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePathname, useRouter } from "next/navigation";

const TicketsTabsTrigger = () => {
  const r = useRouter();
  const path = usePathname();
  const redirectTab = (tabName: string) => {
    r.push(`${path}/?tab=${tabName}`);
  };
  return (
    <TabsList>
      <TabsTrigger
        value="on_ticket_create"
        onClick={() => redirectTab("on_ticket_create")}
      >
        On Ticket Create
      </TabsTrigger>
      <TabsTrigger
        value="after_ticket_create"
        onClick={() => redirectTab("after_ticket_create")}
      >
        After Ticket Create
      </TabsTrigger>
      <TabsTrigger
        value="after_ticket_claimed"
        onClick={() => redirectTab("after_ticket_claimed")}
      >
        After Ticket Claimed
      </TabsTrigger>
    </TabsList>
  );
};

export default TicketsTabsTrigger;
