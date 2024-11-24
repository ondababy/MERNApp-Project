"use client"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@common/components/ui/chart";
import { cn } from "@common/lib/utils";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts";

let shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',];
const placeholderData = shortMonths.map((month) => ({ name: month, total: Math.floor(Math.random() * 5000) + 1000 }));

export const _chartConfig = {
  name: {
    label: "Month",
    color: "text-primary",
  },
  total: {
    label: "Total",
    color: "text-base-content",
  },
}

export const _barConfig = {
  dataKey: {
    name: 'name',
    value: 'total',
  },
  colors: {
    stroke: '#888888',
    fill: 'currentColor',
  },
  props: {
    x: {
      stroke: '#888888',
      fontSize: 12,
      tickLine: false,
      axisLine: false,
    },
    y: {
      stroke: '#888888',
      fontSize: 12,
      tickLine: false,
      axisLine: false,
      tickFormatter: (value) => `${value}`,
    },
    bar: {
      radius: [4, 4, 0, 0],
      fill: 'currentColor',
      className: 'fill-primary',
    },
  },
  chartConfig: _chartConfig,
}
export function BarChartComponent({ data = placeholderData, chartConfig = _barConfig, barStyle }) {
  const [dateKey, setDateKey] = useState({
    key: 'name',
    value: 'total',
  });

  useEffect(() => {
    setDateKey({
      key: chartConfig.dataKey.name,
      value: chartConfig.dataKey.value,
    });
  }, [chartConfig]);

  return (
    <ResponsiveContainer width="100%" height={350}>
      <ChartContainer
        config={chartConfig.chartConfig}
        className="aspect-auto h-[250px] w-full"
      >
        <BarChart data={data}>
          <XAxis
            dataKey={dateKey.key}
            {...chartConfig.props.x}
          />
          <YAxis
            {...chartConfig.props.y}
          />
          <CartesianGrid vertical={false} />

          <ChartTooltip
            content={
              <ChartTooltipContent
                className="w-[150px] bg-base-100 opacity-100 text-base-content"
                nameKey={dateKey.value}
                labelFormatter={(value) => (value)}
              />
            }
          />
          <Bar
            dataKey={dateKey.value}
            className={cn("fill-primary", barStyle)}
            {...chartConfig.props.bar}
          />

        </BarChart>
      </ChartContainer>
    </ResponsiveContainer>
  )
}
