"use client";
import { Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ChartData } from "@/services/ticket";

const chartConfig = {
  claimed: {
    label: "Claimed",
    color: "hsl(var(--chart-2))",
  },
  open: {
    label: "Open",
    color: "hsl(var(--chart-1))",
  },
  closed: {
    label: "Closed",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

const TicketsSummaryChart = ({ chartData }: { chartData: ChartData }) => {
  const id = "pie-interactive";
  const fullChartData = Object.keys(chartData).map((info) => {
    const key = info as keyof ChartData;
    return {
      status: info,
      total: chartData[key],
      fill: `var(--color-${key})`,
    };
  });
  return (
    <ChartContainer
      id={id}
      config={chartConfig}
      className="mx-auto aspect-square w-full max-w-[300px]"
    >
      <PieChart>
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Pie
          data={fullChartData}
          dataKey="total"
          nameKey="status"
          innerRadius={60}
          strokeWidth={5}
          activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => (
            <g>
              <Sector {...props} outerRadius={outerRadius + 10} />
              <Sector
                {...props}
                outerRadius={outerRadius + 25}
                innerRadius={outerRadius + 12}
              />
            </g>
          )}
        ></Pie>
        <ChartLegend content={<ChartLegendContent className="" />} />
      </PieChart>
    </ChartContainer>
  );
};

export default TicketsSummaryChart;
