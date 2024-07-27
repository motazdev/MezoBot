import { getGuildsOfUser } from "@/app/utils/actions";
import { authOptions } from "@/app/utils/auth";
import GuildDataBoxes from "@/components/guild-dashboard/GuildDataBoxes";
import MainBotChannelOptions from "@/components/guild-dashboard/MainBotChannelOptions";
import guildService from "@/services/guild";
import { Guild, OAuth2Guild } from "discord.js";
import { getServerSession, Session } from "next-auth";
import { redirect } from "next/navigation";

interface PageProps {
  params: {
    guildId: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const session = (await getServerSession(authOptions)) as Session;
  const userGuilds = await getGuildsOfUser(session);

  if (!userGuilds.find((g: Guild) => g.id == params.guildId)) {
    redirect("/dashboard");
  }
  const check = await guildService.checkBotInGuild({
    guildId: params.guildId,
  });
  if (!check.success) {
    redirect(
      "https://discord.com/oauth2/authorize?client_id=1123366210197803079&permissions=1101676014608&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&integration_type=0&scope=bot+identify+applications.commands"
    );
  }

  return (
    <div className="flex flex-col">
      <GuildDataBoxes params={params} />
      <MainBotChannelOptions guildId={params.guildId} />
    </div>
  );
};

export default Page;
