"use client";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
import { Card, CardContent, CardHeader } from "../ui/card";
const chartData = [
  { status: "claimed", total: 18, fill: "var(--color-claimed)" },
  { status: "open", total: 10, fill: "var(--color-open)" },
  { status: "closed", total: 20, fill: "var(--color-closed)" },
];

const chartConfig = {
  total: {
    label: "total",
  },
  claimed: {
    label: "Claimed",
    color: "hsl(var(--chart-1))",
  },
  open: {
    label: "Open",
    color: "hsl(var(--chart-2))",
  },
  closed: {
    label: "Closed",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;
export default function HomeTicketsSummaryChart() {
  const id = "pie-interactive";

  return (
    <Card
      data-chart={id}
      className="w-full h-full 
      bg-transparent
      dark:[border-image:linear-gradient(to_right,#1e293b,50%,transparent)_1] 
      [border-image:linear-gradient(to_right,#e5e7eb,50%,transparent)_1] 
      dark:shadow-sm
      shadow-none
      bg-clip-text bg-gradient-to-r from-white from-10%"
    >
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader>
        <CardContent>
          <ChartContainer
            id={id}
            config={chartConfig}
            className="mx-auto aspect-square w-full max-w-[200px] min-w-[200px] min-h-[200px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="total"
                nameKey="status"
                innerRadius={40}
                activeShape={({
                  outerRadius = 0,
                  ...props
                }: PieSectorDataItem) => (
                  <g>
                    <Sector {...props} outerRadius={outerRadius + 5} />
                    <Sector
                      {...props}
                      outerRadius={outerRadius + 18}
                      innerRadius={outerRadius + 12}
                    />
                  </g>
                )}
              ></Pie>
              <ChartLegend
                content={
                  <ChartLegendContent className="bg-clip-text bg-gradient-to-r dark:from-white from-60% dark:text-transparent" />
                }
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </CardHeader>
    </Card>
  );
}
