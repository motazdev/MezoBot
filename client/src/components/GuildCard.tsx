"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useGuildStore } from "@/context/store";
import { Guild, OAuth2Guild } from "discord.js";
import Image from "next/image";
import Link from "next/link";
const GuildCard = ({ guild }: { guild: Guild & OAuth2Guild }) => {
  const { fetchGuild } = useGuildStore();

  const presistGuild = (guildId: string) => {
    fetchGuild(guildId);
  };
  return (
    <Link
      href={`/guild/${guild.id}`}
      onClick={() => presistGuild(guild.id)}
      className="h-full shadow-lg w-full overflow-hidden"
    >
      <Card key={guild.id} className=" ">
        <CardContent className="p-6">
          <div className="flex justify-between items-center ">
            <div className="w-16">
              {guild.icon ? (
                <Image
                  src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
                  alt="ss"
                  width={100}
                  height={100}
                  className="w-24 h-24 max-w-24 max-h-24"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOMSP20FAAFIgJW0PRabQAAAABJRU5ErkJggg=="
                />
              ) : (
                <Image
                  src="/discord.svg"
                  alt="ss"
                  placeholder="blur"
                  className="w-24 h-24 max-w-24 max-h-24"
                  width={100}
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOMSP20FAAFIgJW0PRabQAAAABJRU5ErkJggg=="
                  height={100}
                />
              )}
            </div>

            <p className="text-lg font-semibold">{guild.name}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default GuildCard;
