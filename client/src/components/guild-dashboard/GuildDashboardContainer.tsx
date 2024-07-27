import { ReactNode } from "react";

const GuildDashboardContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 dark:bg-obsidian">
      {children}
    </div>
  );
};

export default GuildDashboardContainer;
