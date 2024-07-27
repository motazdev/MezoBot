import { IEmbed } from "@/lib/types/embed.interface";
import Image from "next/image";
import { ReactElement } from "react";
import GradiantEmbedDisplay from "./GradiantEmbedDisplay";

const GradiantEmbedDisplayContainer = ({
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
  return (
    <div className=" relative bg-[#5e626c] dark:bg-card rounded-md  shadow-[rgba(0,0,15,0.5)_-10px_0px_8px_-7px] dark:shadow-[black_-10px_0px_8px_-7px]">
      <div
        className=" 
    sticky top-5 rounded-xl pr-5 py-3 pl-3 col-span-2 h-fit "
      >
        <div className="flex flex-row gap-4">
          <div className="bot-img w-12 rounded-full bg-white flex justify-center items-center p-2 h-12">
            <Image
              src="/discord.svg"
              alt="logo"
              width={100}
              priority
              height={100}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          <GradiantEmbedDisplay
            embed={embed}
            title={title}
            description={description}
            footer={footer}
            fields={fields}
          />
        </div>
      </div>
      <div className="absolute inset-y-0 left-0 w-full  bg-gradient-to-l dark:from-background from-slate-50 from-5% to-transparent" />
    </div>
  );
};
export default GradiantEmbedDisplayContainer;
