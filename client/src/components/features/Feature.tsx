import { cn } from "@/lib/utils";

export default function Feature({
  header,
  content,
  display,
  ltr = true,
}: {
  header: string;
  content: string;
  display: any;
  ltr?: boolean; // Left to right
}) {
  return (
    <div className="grid grid-rows-1 md:grid-cols-2 grid-cols-1 gap-4 justify-between items-center ">
      <div
        className={cn(
          " flex flex-col gap-4 ",
          !ltr ? "md:order-2 md:ml-10" : "md:w-[70%]"
        )}
      >
        <h1 className="text-2xl font-bold ">{header}</h1>
        <p className="text-gray-500">{content}</p>
      </div>
      <div className={cn("h-full md:col-span-1 ", !ltr ? "order-1" : "")}>
        {display}
      </div>
    </div>
  );
}
