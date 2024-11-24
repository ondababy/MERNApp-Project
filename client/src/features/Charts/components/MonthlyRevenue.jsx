import { Overview, _barConfig } from '@custom';
import React from 'react';

let shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',];
const placeholderData = shortMonths.map((month) => ({ month, revenue: Math.floor(Math.random() * 5000) + 1000 }));

export default function MonthlyRevenue({ className }) {
  return (
    <Overview
      className={className}
      title="Monthly Revenue"
      description="Revenue overview of sales. "
      barProps={{
        barConfig: {
          ..._barConfig,
          dataKey: {
            name: 'month',
            value: 'revenue',
          },
        },
      }}




    />
  )
}
