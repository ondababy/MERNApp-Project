"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@common/components/ui/card"
import { BarChartComponent } from "../charts/bar"

export function Overview({
  title = "Overview",
  description = "Overview of sales",
  className,
  barProps,
}) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>
          {title}
        </CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <BarChartComponent
          {...barProps}
        />
      </CardContent>
    </Card>

  )
}