"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IEmbed } from "@/DB/models/Embed";
import { parseAsString, useQueryState } from "nuqs";
import AfterTicketCreateTab from "./AfterTicketCreateTab";
import OnTicketClaimTab from "./OnTicketClaimTab";
import OnTicketCreateTab from "./OnTicketCreateTab";
import EmbedsTabsList from "./EmbedsTabsList";

const TicketDesignTabs = ({
  params,
  embeds,
}: {
  params: { guildId: string };
  embeds: IEmbed[];
}) => {
  const [tabQuery, setTabQuery] = useQueryState(
    "tab",
    parseAsString.withDefault("on_ticket_create")
  );

  const redirectTab = (tabName: string) => {
    setTabQuery(tabName);
  };

  return (
    <Tabs value={tabQuery}>
      <EmbedsTabsList />

      <TabsContent value="on_ticket_create">
        <OnTicketCreateTab
          params={params}
          embed={
            embeds?.filter(
              (em: IEmbed) => em.embed_tag === "on_ticket_create"
            )[0]
          }
        />
      </TabsContent>
      <TabsContent value="after_ticket_create">
        <AfterTicketCreateTab
          params={params}
          embed={
            embeds?.filter(
              (em: IEmbed) => em.embed_tag === "after_ticket_create"
            )[0]
          }
        />
      </TabsContent>
      <TabsContent value="after_ticket_claimed">
        <OnTicketClaimTab
          params={params}
          embed={
            embeds?.filter(
              (em: IEmbed) => em.embed_tag === "after_ticket_claimed"
            )[0]
          }
        />
      </TabsContent>
    </Tabs>
  );
};

export default TicketDesignTabs;
