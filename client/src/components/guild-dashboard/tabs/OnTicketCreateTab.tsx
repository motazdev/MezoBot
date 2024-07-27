"use client";
import { IEmbed } from "@/DB/models/Embed";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { embedDefaultData } from "@/constants/embedConstants";
import { useEmbedStore } from "@/context/embed-editor";
import { discord_translate_tags } from "@/lib/utils";
import { parseAsString, useQueryState } from "nuqs";
import EmbedDisplayContainer from "../embed-display/EmbedDisplayContainer";
import EmbedEditorForm from "../embed-edit-form/EmbedEditorForm";
const OnTicketCreateTab = ({
  params,
  embed,
}: {
  params: { guildId: string };
  embed: IEmbed;
}) => {
  const { data: embedData } = useEmbedStore();
  const [tabQuery, setTabQuery] = useQueryState(
    "tab",
    parseAsString.withDefault("on_ticket_create")
  );
  return (
    <div className="ticket-editor grid md:grid-cols-4 gap-6">
      <Drawer>
        <div className="md:col-span-2">
          <EmbedEditorForm guildId={params.guildId} data={embed} />
        </div>
        <DrawerContent>
          <EmbedDisplayContainer
            embed={embed}
            title={discord_translate_tags(
              embedData[tabQuery]?.title ?? embedDefaultData[tabQuery].title
            )}
            description={discord_translate_tags(
              embedData[tabQuery]?.description ??
                embedDefaultData[tabQuery].description
            )}
            footer={discord_translate_tags(
              embedData[tabQuery]?.footer ?? embedDefaultData[tabQuery].footer
            )}
            fields={embedData[tabQuery]?.fields || []}
          />
        </DrawerContent>
        <div className="md:block hidden w-full col-span-2">
          <EmbedDisplayContainer
            embed={embed}
            title={discord_translate_tags(
              embedData[tabQuery]?.title ?? embedDefaultData[tabQuery].title
            )}
            description={discord_translate_tags(
              embedData[tabQuery]?.description ??
                embedDefaultData[tabQuery].description
            )}
            footer={discord_translate_tags(
              embedData[tabQuery]?.footer ?? embedDefaultData[tabQuery].footer
            )}
            fields={embedData[tabQuery]?.fields || []}
          />
        </div>
      </Drawer>
    </div>
  );
};

export default OnTicketCreateTab;
