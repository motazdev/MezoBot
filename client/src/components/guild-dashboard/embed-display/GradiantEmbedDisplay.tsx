import { IEmbed } from "@/lib/types/embed.interface";
import { cn } from "@/lib/utils";
import { ReactElement } from "react";
import EmbedDisplayDescription from "./EmbedDisplayDescription";
import EmbedDisplayFields from "./EmbedDisplayFields";
import EmbedDisplayFooter from "./EmbedDisplayFooter";
import OnTicketCreateTitle from "./EmbedDisplayTitle";
const GradiantEmbedDisplay = ({
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
    <div className="msg-content bg-clip-text dark:from-white  text-transparent bg-gradient-to-r from-gray-400 from-50% w-full flex flex-col gap-1">
      <div
        className="msg-author 
           text-sm flex flex-row gap-1 place-items-end"
      >
        <p className="text-white">mezobot</p>
        <p className="bg-[#5078f0] text-white text-xs py-0.5 px-1 rounded-md">
          BOT
        </p>
        <p className={cn("text-xs  ", className)}>
          Today at {date.getHours()}:{date.getMinutes()}
        </p>
      </div>

      <div className=" embed border-l-emerald-300 bg-clip-text dark:from-white  text-transparent bg-gradient-to-r from-gray-400 from-10% flex flex-col gap-y-2.5 border-l-4 px-3 py-3  w-full">
        <OnTicketCreateTitle data={title} />
        <EmbedDisplayDescription data={description} />
        <EmbedDisplayFields data={fields} />
        <EmbedDisplayFooter data={footer} />
      </div>
    </div>
  );
};

export default GradiantEmbedDisplay;
