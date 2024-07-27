import { getGuildsOfUser } from "@/app/utils/actions";
import Container from "@/components/Container";
import GuildCard from "@/components/GuildCard";
import { Guild, OAuth2Guild } from "discord.js";
import { Metadata } from "next";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "../../utils/auth";

export const metadata: Metadata = {
  title: "MezoBot | Guilds",
  description:
    "Transform the way you handle support on your Discord server with our powerful bot.",
};

const Page = async () => {
  const session = (await getServerSession(authOptions)) as Session;
  const userGuilds = await getGuildsOfUser(session);

  return (
    <div>
      <Container>
        <div className="flex py-20 flex-col items-center">
          <h1 className="text-4xl capitalize font-semibold">
            Choose a guild to manage
          </h1>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          {userGuilds.map(
            (guild: Guild & OAuth2Guild) =>
              guild.owner && <GuildCard guild={guild} key={guild.id} />
          )}
        </div>
      </Container>
    </div>
  );
};

export default Page;
