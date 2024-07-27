import { IEmbed } from "@/lib/types/embed.interface";
import { ReactElement } from "react";
import EmbedDisplayDescription from "./EmbedDisplayDescription";
import EmbedDisplayFields from "./EmbedDisplayFields";
import EmbedDisplayFooter from "./EmbedDisplayFooter";
import OnTicketCreateTitle from "./EmbedDisplayTitle";

const EmbedDisplay = ({
  embed,
  title,
  description,
  fields,
  footer,
  className,
}: {
  embed: IEmbed;
  title: string | ReactElement;
  description: string | ReactElement;
  fields: any[];
  footer: string | ReactElement;
  className?: string;
}) => {
  const date = new Date();
  return (
    <div className="msg-content w-full flex flex-col gap-1">
      <div
        className="msg-author 
         text-sm flex flex-row gap-1 place-items-end"
      >
        <p className="text-white">mezobot</p>
        <p className="bg-[#5078f0] text-white text-xs py-0.5 px-1 rounded-md">
          BOT
        </p>
        <p className="text-xs text-gray-400">
          Today at {date.getHours()}:{date.getMinutes()}
        </p>
      </div>

      <div className="bg-clip-content text-transparent embed border-l-emerald-300 flex flex-col gap-y-2.5 border-l-4 px-3 py-3  w-full">
        <OnTicketCreateTitle data={title} />
        <EmbedDisplayDescription data={description} />
        <EmbedDisplayFields data={fields} />
        <EmbedDisplayFooter data={footer} />
      </div>
    </div>
  );
};

export default EmbedDisplay;
