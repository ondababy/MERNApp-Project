import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@common/components/ui/card";
import React from 'react';
import { FaCheck } from "react-icons/fa";
// hard coded shipping methods
const defaultMethods = {
  std: {
    fee: 100,
    method: 'Standard',
    description: 'A standard shipping method',
    date_shipping_range: {
      from: 3,
      to: 7
    }
  },
  exp: {
    fee: 200,
    method: 'Express',
    description: 'An express shipping method.',
    date_shipping_range: {
      from: 1,
      to: 3
    }
  },
  smd: {
    fee: 300,
    method: 'Same Day',
    description: 'A prioritized  shipping method. Deliver on the same day.',
    date_shipping_range: {
      from: 0,
      to: 1
    }
  }
}
export default function CheckoutShipping({ shippingMethods = defaultMethods, onSelect = () => { } }) {
  const [selected, setSelected] = React.useState("std");
  const handleSelected = (key) => () => {
    setSelected(key);
    onSelect(shippingMethods[key]);
  }

  return (
    <div className='w-full '>
      <h1 className='font-semibold text-lg'> Select shipping method:</h1>
      <div className="divider"></div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {
          Object.keys(shippingMethods).map((key) => {
            const { method, fpee, description, date_shipping_range } = shippingMethods[key];
            return (
              <Card key={key} className={`mt-4 flex flex-col ${selected === key ? 'bg-primary/10' : ''}`} onClick={handleSelected(key)}>
                <CardHeader>
                  <CardTitle>
                    {method}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="h-16">
                    <span>
                      {description}
                    </span>
                    <br />
                    <span className="italic">
                      {`Delivery: ${date_shipping_range.from} - ${date_shipping_range.to} days`}
                    </span>
                  </CardDescription>
                </CardContent>
                {
                  selected === key && (
                    <CardFooter className="mt-auto text-xl text-success animate__animated animate__bounceIn">
                      <FaCheck />
                    </CardFooter>
                  )
                }
              </Card>
            )
          })
        }
      </div>
    </div>
  )
}
