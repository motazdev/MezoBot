"use client";
import "@/app/(guild)/guild/[guildId]/ticket-design/style.css";
import { IEmbedField, IEmbedFieldResponse } from "@/lib/types/embed.interface";
import { cn, discord_translate_tags } from "@/lib/utils";
const EmbedDisplayFields = ({ data }: { data: IEmbedFieldResponse[] }) => {
  const getFieldClassName = (index: number) => {
    let currentGroup = 0;
    for (let i = 0; i < index; i++) {
      if (data[i].inline) {
        currentGroup++;
      } else {
        currentGroup = 0;
      }
    }

    if (data[index].inline) {
      return `embed-inline-field-${(currentGroup % 3) + 1}`;
    } else {
      return "col-start-1 col-end-13";
    }
  };
  return (
    <div className="fields grid col-start-1 col-end-1">
      {data?.map((field: IEmbedFieldResponse, i: number) => {
        return (
          <div
            key={field._id || i}
            className={cn("field text-white", getFieldClassName(i))}
          >
            <div className="name">{discord_translate_tags(field.name)}</div>
            <div className="name font-light text-gray-400">
              {discord_translate_tags(field.value)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EmbedDisplayFields;
