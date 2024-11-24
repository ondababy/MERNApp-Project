import { Overview, _barConfig } from '@custom';

import { useEffect, useState } from 'react';
import { chartApi } from '../chart.api';

let shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',];
const placeholderData = shortMonths.map((month) => ({ month, revenue: Math.floor(Math.random() * 5000) + 1000 }));

export default function MonthlyRevenue({ className }) {
  const [chartData, setChartData] = useState(placeholderData);
  const [monthlyRevenue] = chartApi.useMonthlyRevenueMutation();

  const fetchMonthlyRevenue = async () => {
    return monthlyRevenue()
      .unwrap()
      .then((data) => {
        setChartData(data.resource);
      })
      .catch((error) => {
        console.error('Failed to fetch monthly revenue', error);
      });
  };

  useEffect(() => {
    fetchMonthlyRevenue();
  }, []);



  return (
    <Overview
      className={className}
      title="Monthly Revenue"
      description="Revenue overview of sales. "
      barProps={{
        data: chartData,
        barConfig: {
          ..._barConfig,
          dataKey: {
            name: 'month',
            value: 'revenue',
          },
          chartConfig: {
            month: {
              label: "Month",
              color: "text-primary",
            },
            revenue: {
              label: "Revenue",
              color: "text-base-content",
            },
          }
        },
      }}
    />
  )
}
