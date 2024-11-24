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
export function BarChartComponent({ data = placeholderData, barConfig = _barConfig, barStyle }) {
  const [dateKey, setDateKey] = useState({
    key: 'name',
    value: 'total',
  });

  useEffect(() => {
    setDateKey({
      key: barConfig.dataKey.name,
      value: barConfig.dataKey.value,
    });
  }, [barConfig]);

  return (
    <ResponsiveContainer width="100%" height={350}>
      <ChartContainer
        config={barConfig.chartConfig}
        className="aspect-auto h-[250px] w-full"
      >
        <BarChart data={data}>
          <XAxis
            dataKey={dateKey.key}
            {...barConfig.props.x}
          />
          <YAxis
            {...barConfig.props.y}
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
            {...barConfig.props.bar}
          />

        </BarChart>
      </ChartContainer>
    </ResponsiveContainer>
  )
}
