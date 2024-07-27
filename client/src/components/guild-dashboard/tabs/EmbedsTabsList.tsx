"use client";

import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { parseAsString, useQueryState } from "nuqs";

export default function EmbedsTabsList() {
  const [tabQuery, setTabQuery] = useQueryState(
    "tab",
    parseAsString.withDefault("on_ticket_create")
  );

  const redirectTab = (tabName: string) => {
    setTabQuery(tabName);
  };
  return (
    <TabsList>
      <TabsTrigger
        value="on_ticket_create"
        onFocus={() => redirectTab("on_ticket_create")}
      >
        On Ticket Create
      </TabsTrigger>
      <TabsTrigger
        value="after_ticket_create"
        onFocus={() => redirectTab("after_ticket_create")}
      >
        After Ticket Create
      </TabsTrigger>
      <TabsTrigger
        value="after_ticket_claimed"
        onFocus={() => redirectTab("after_ticket_claimed")}
      >
        After Ticket Claimed
      </TabsTrigger>
    </TabsList>
  );
}
