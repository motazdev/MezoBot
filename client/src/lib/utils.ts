import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const discord_tags_map: { [key: string]: string } = {
  "<@ticket_room_name>": "@Ticket-1",
  "&lt;@ticket_room_name&gt;": "@Ticket-1",
  "&lt;@staff_count&gt;": "9",
  "<@staff_count>": "9",
};

export const discord_translate_tags = (content: string) => {
  const regex =
    /<@ticket_room_name>|&lt;@ticket_room_name&gt;|<@staff_count>|&lt;@staff_count&gt;/g;

  const newContent = content.replaceAll(
    regex,
    (matched: any) => discord_tags_map[matched]
  );

  return newContent;
};
