"use client"

import { cn } from "@common/lib/utils";
import { useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
let shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',];
const placeholderData = shortMonths.map((month) => ({ name: month, total: Math.floor(Math.random() * 5000) + 1000 }));
const placeholderConfig = {
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

  }
}

export function BarChartComponent({ data = placeholderData, chartConfig = placeholderConfig, barStyle }) {
  const [dateKey, setDateKey] = useState({
    key: 'name',
    value: 'total',
  });

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey={dateKey.key}
          {...chartConfig.props.x}
        />
        <YAxis
          {...chartConfig.props.y}
        />
        <Bar
          dataKey={dateKey.value}
          className={cn("fill-primary", barStyle)}
          {...chartConfig.props.bar}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
