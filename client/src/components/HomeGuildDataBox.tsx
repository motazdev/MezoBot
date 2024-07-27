import { cn } from "@/lib/utils";
import { Ticket } from "lucide-react";

interface pageParams {
  boxName: string;
}

const HomeGuildDataBox = ({ boxName }: pageParams) => {
  return (
    <div className={cn("relative h-full gap-x-4")}>
      <div className="absolute top-0 flex w-full justify-center">
        <div className="left-0 h-[1px] animate-border-width rounded-full bg-gradient-to-r dark:from-[rgba(17,17,17,0)] via-white to-[rgba(17,17,17,0)] transition-all duration-3000" />
      </div>
      <div
        className="flex flex-col h-full rounded-md border 
          dark:[border-image:linear-gradient(to_right,#1e293b,50%,transparent)_1] 
          [border-image:linear-gradient(to_right,#e5e7eb,50%,transparent)_1] 
          px-3 py-2 bg-clip-text bg-gradient-to-r dark:from-white from-black from-40%"
      >
        <div className="flex flex-row justify-between items-end">
          <p className="text-sm ">
            <Ticket size={30} />
          </p>
          <p className="font-semibold text-sm text-gray-400 text-transparent">
            {boxName}
          </p>
        </div>

        <span className="border-t  w-4/6 my-3 m-auto"></span>

        <p className="text-3xl justify-end flex text-transparent ">48</p>
      </div>
    </div>
  );
};

export default HomeGuildDataBox;
