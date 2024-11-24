"use client"


import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@common/components/ui/card";
import { DatePickerWithRange, LineChartComponent, } from "@custom";
import { useEffect, useState } from "react";
import { chartApi } from '../chart.api';

const _charts = ["successful", "cancelled"]
const _total = {
  successful: 123456,
  cancelled: 1234,
}



export default function DailyRevenue() {
  const [charts, setCharts] = useState(_charts)
  const [activeChart, setActiveChart] = useState(_charts[0])
  const [dateRange, setDateRange] = useState(null);
  const [total, setTotal] = useState(_total)
  const [chartData, setChartData] = useState(null)
  const [dailyRevenue] = chartApi.useDailyRevenueMutation()

  const fetchDailyRevenue = async (date) => {
    return dailyRevenue({
      startDate: date.from,
      endDate: date.to,
    }).unwrap()
      .then((data) => {
        const _chartData = data.resource
        const _charts = Object.keys(_chartData[0]).filter((key) => key !== "date")
        const total = _charts.reduce((acc, key) => {
          acc[key] = _chartData.reduce((sum, item) => sum + item[key], 0)
          return acc
        }, {})
        setCharts(_charts)
        setTotal(total)
        setChartData(_chartData)
        setActiveChart(_charts[0])
      })

      .catch((error) => {
        console.error('Failed to fetch daily revenue', error)
      })
  }

  useEffect(() => {
    if (dateRange) fetchDailyRevenue(dateRange)
  }, [dateRange])

  useEffect(() => {
  }, [activeChart])

  return (
    <div className="flex flex-col gap-4">
      <DatePickerWithRange onChange={setDateRange} />
      <Card>
        <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
          <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
            <CardTitle>
              Daily Revenue
            </CardTitle>
            <CardDescription>
              Showing daily revenue for successful and cancelled orders from specified date range.
            </CardDescription>
          </div>
          <div className="flex">
            {charts.map((key) => {
              const chart = key
              return (
                <button
                  key={chart}
                  data-active={activeChart === chart}
                  className={`flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6 ${activeChart === chart ? 'bg-primary/10' : 'hover:bg-primary/10'}`}
                  onClick={() => setActiveChart(chart)}
                >
                  <span className="text-xs text-muted-foreground">
                    {chart.charAt(0).toUpperCase() + chart.slice(1)}
                  </span>
                  <span className="text-lg font-bold leading-none sm:text-3xl">
                    {total[key].toLocaleString()}
                  </span>
                </button>
              )
            })}
          </div>
        </CardHeader>
        <CardContent className="px-2 sm:p-6">
          <LineChartComponent
            data={chartData}
            lineConfig={{
              dataKey: {
                tooltip: "date",
                key: "date",
                value: activeChart,
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
            }}
          />
        </CardContent>
      </Card>
    </div>
  )
}
