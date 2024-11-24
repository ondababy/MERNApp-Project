import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@common/components/ui/card"
import React from 'react'

const AnalyticsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    className="h-4 w-4 text-muted-foreground"
  >
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
)

const ExampleContent = () => (
  <>
    <div className="text-2xl font-bold">$45,231.89</div>
    <p className="text-xs text-muted-foreground">
      +20.1% from last month
    </p>
  </>
)

export function BasicAnalytics({
  className,
  title = "Analytics",
  icon = <AnalyticsIcon />,
  children = <ExampleContent />,
}) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>

  )
}
