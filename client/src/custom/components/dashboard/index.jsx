

import { BasicAnalytics, Overview, RecentSales } from "../analytics"
import { DatePickerWithRange } from "../datepicker"

import { useSelector } from "react-redux"
import { analyticsData, metadata } from "./metadata"


export function DashboardPage() {
  const { userInfo } = useSelector((state) => state.auth)
  return (
    <>
      <div className="flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex flex-col-reverse lg:flex-row lg:items-center lg:justify-between lg:space-y-2 gap-8 my-4">
            <h2 className="text-3xl font-bold tracking-tight">
              Welcome back, {userInfo?.username}
            </h2>
            <div className="flex items-center space-x-2 justify-end">
              <DatePickerWithRange />
            </div>
          </div>
          <div className="divider"></div>

          {/* CONTENT */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {analyticsData.map((data, index) => (
              <BasicAnalytics
                key={index}
                title={data.title}
                icon={<svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d={data.iconPath} />
                </svg>}
              >
                <div className="text-2xl font-bold">{data.value}</div>
                <p className="text-xs text-muted-foreground">
                  {data.description}
                </p>
              </BasicAnalytics>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Overview className="lg:col-span-4" />
            <RecentSales className="lg:col-span-3" />
          </div>
        </div>
      </div>
    </>
  )
}
