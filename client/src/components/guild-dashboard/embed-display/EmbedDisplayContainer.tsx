import { IEmbed } from "@/lib/types/embed.interface";
import Image from "next/image";
import { ReactElement } from "react";
import EmbedDisplay from "./EmbedDisplay";

const EmbedDisplayContainer = ({
  embed,
  title,
  description,
  fields,
  footer,
}: {
  embed: IEmbed;
  title: string | ReactElement;
  description: string | ReactElement;
  fields: any[];
  footer: string | ReactElement;
}) => {
  const date = new Date();

  return (
    <div className="bg-[#313338] sticky top-5 rounded-xl pr-5 py-3 pl-3 col-span-2 h-fit ">
      <div className="flex flex-row gap-4">
        <div className="bot-img w-12 rounded-full bg-red-100 flex justify-center items-center p-2 h-12">
          <Image
            src="/discord.svg"
            alt="logo"
            width={100}
            priority
            height={100}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <EmbedDisplay
          embed={embed}
          title={title}
          description={description}
          footer={footer}
          fields={fields}
        />
      </div>
    </div>
  );
};

export default EmbedDisplayContainer;
