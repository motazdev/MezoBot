import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import LoadingSpinner from "../LoadingSpinner";

interface pageParams {
  icon: ReactNode;
  data: number | undefined | null | string | any;
  boxName: string;
  className?: string;
  isLoading?: boolean;
}

const GuildDataBox = ({
  icon,
  data,
  boxName,
  className,
  isLoading = false,
}: pageParams) => {
  return (
    <div className={cn("relative h-full gap-x-4", className)}>
      <div className="absolute top-0 flex w-full justify-center">
        <div className="left-0 h-[1px] animate-border-width rounded-full bg-gradient-to-r from-[rgba(17,17,17,0)] via-white to-[rgba(17,17,17,0)] transition-all duration-3000" />
      </div>
      <div className="flex flex-col h-full rounded-md border  px-3 py-2">
        <div className="flex flex-row justify-between items-end">
          <p className="text-sm ">{icon}</p>
          <p className="font-semibold text-sm text-gray-400">{boxName}</p>
        </div>

        <span className="border-t  w-4/6 my-3 m-auto"></span>

        {isLoading ? (
          <div className="justify-end flex">
            <LoadingSpinner className="w-8 h-8 " />
          </div>
        ) : (
          <p className="text-3xl justify-end flex ">{data}</p>
        )}
      </div>
    </div>
  );
};

export default GuildDataBox;
