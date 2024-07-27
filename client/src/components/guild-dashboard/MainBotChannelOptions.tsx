import { getGuildCategories, getGuildRoles } from "@/app/utils/actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import guildService from "@/services/guild";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import BotSettingsForm from "./bot-settings-form/BotSettingsForm";

import TicketsSummaryChart from "../chart/TicketsSummaryChart";
import ticketService from "@/services/ticket";
import { BarChart3, PieChartIcon } from "lucide-react";

const MainBotChannelOptions = async ({ guildId }: { guildId: string }) => {
  const cateogires = await getGuildCategories({ guildId });
  const roles = await getGuildRoles({ guildId });
  const guild = await guildService.getSingleGuild({ guildId });
  const summaryChartData = await ticketService.summaryTicketsChartData({
    guildId,
  });
  return (
    <div className="flex flex-col gap-y-4 ">
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-3 justify-items-center">
        <div className=" rounded-md w-full ">
          <Card className="bg-muted/40 h-full">
            <CardHeader>
              <CardTitle>Tickets Summary</CardTitle>
            </CardHeader>
            <CardContent className="w-full flex justify-center items-cente">
              {summaryChartData.success ? (
                <TicketsSummaryChart chartData={summaryChartData.data} />
              ) : (
                <div className="flex flex-col md:pt-16 py-10 md:py-0 items-center justify-center text-center">
                  <BarChart3 className="h-16 w-16 text-muted-foreground" />
                  <h3 className="text-xl font-bold mt-4">
                    No Tickets Available
                  </h3>
                  <p className="text-muted-foreground mt-2">
                    Not Data for a Chart
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        <div className="col-span-2 relative rounded-md w-full">
          <TooltipProvider>
            <Tooltip>
              <div className="absolute -top-2 -left-1">
                <TooltipTrigger>
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Update this settings so the bot can start working.</p>
                </TooltipContent>
              </div>
            </Tooltip>
          </TooltipProvider>
          <Card className="bg-muted/40 h-full">
            <CardHeader>
              <CardTitle>Support Settings</CardTitle>
              <CardDescription>
                Update staff roles & category of the ticket&apos;s channel.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BotSettingsForm
                cateogires={cateogires}
                guildId={guildId}
                roles={roles}
                guildData={guild.data}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MainBotChannelOptions;
