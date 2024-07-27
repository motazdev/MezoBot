"use client";

import { useGuildStore } from "@/context/store";
import { cn } from "@/lib/utils";
import Image from "next/image";

const SidebarGuildLogo = ({ isMobile }: { isMobile: boolean }) => {
  const { singleGuildData: guild, isLoading, fetchGuild } = useGuildStore();
  return (
    <div
      className={cn(
        "flex flex-col  ",
        isMobile ? "pb-5 border-b " : "py-10 pl-3"
      )}
    >
      <div className="flex flex-row items-center gap-x-3">
        {!isLoading && (
          <>
            {guild?.icon ? (
              <div className="img w-28 h-28 relative ">
                <Image
                  src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
                  alt="ss"
                  fill
                  sizes="100px"
                  priority
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOMSP20FAAFIgJW0PRabQAAAABJRU5ErkJggg=="
                />
              </div>
            ) : (
              <Image
                src="/discord.svg"
                alt="ss"
                placeholder="blur"
                width={100}
                sizes="100px"
                style={{ objectFit: "cover" }}
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOMSP20FAAFIgJW0PRabQAAAABJRU5ErkJggg=="
                height={100}
              />
            )}
            <p className="text-white">{guild?.name}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default SidebarGuildLogo;
