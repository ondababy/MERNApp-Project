"use client";

import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@common/components/ui/chart";
const charts = ["desktop", "mobile"]
export const _chartData = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
  [charts[0]]: Math.floor(Math.random() * 1000),
  [charts[1]]: Math.floor(Math.random() * 1000),
}))


export const _lineConfig = {
  dataKey: {
    tooltip: "label",
    key: "date",
    value: charts[0],
  },
  colors: {
    stroke: '#888888',
    fill: 'currentColor',
  },
  props: {
    x: {
      tickLine: false,
      axisLine: false,
      tickMargin: 8,
      minTickGap: 32,
      tickFormatter: (value) => {
        const date = new Date(value)
        return date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })
      },
    },
    y: {
      type: "monotone",
      stroke: `var(--color-${charts[0]})`,
      strokeWidth: 2,
      dot: false,
    },
    line: {
      radius: [4, 4, 0, 0],
      fill: 'currentColor',
      className: 'fill-primary',
    },
    tooltip: {
      label: "label",
      value: "value",
    },
  },
  config: {
    label: {
      label: "Tooltip Label",
      color: "hsl(var(--chart-1))",
    },
    ...charts.reduce((acc, chart, i) => {
      acc[chart] = {
        label: chart,
        color: `hsl(var(--chart-${(i + 1) % 5}))`,
      }
      return acc
    }, {}),

  },
}

export function LineChartComponent({ data = _chartData, lineConfig = _lineConfig, }) {
  return (
    <ChartContainer
      config={lineConfig.config}
      className="aspect-auto h-[250px] w-full"
    >
      <LineChart
        accessibilityLayer
        data={data}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey={lineConfig.dataKey.key}
          {...lineConfig.props.x}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              nameKey={lineConfig.dataKey.tooltip}
              className="w-[150px] bg-base-100 opacity-100 text-base-content"
              labelFormatter={(value) => {
                return new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              }}
            />
          }
        />
        <Line
          dataKey={lineConfig.dataKey.value}
          {...lineConfig.props.y}
        />
      </LineChart>
    </ChartContainer>
  )
}