import PageHeader from "@/components/guild-dashboard/PageHeader";
import guildService from "@/services/guild";

import TicketDesignTabs from "@/components/guild-dashboard/tabs/TicketDesignTabs";
import "react-quill/dist/quill.snow.css";
interface PageProps {
  params: { guildId: string };
}

const Page = async ({ params }: PageProps) => {
  const embeds = await guildService.getGuildEmbeds({
    guildId: params.guildId,
  });
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Edit Tickets" />
      <TicketDesignTabs params={params} embeds={embeds.data} />
    </div>
  );
};

export default Page;
