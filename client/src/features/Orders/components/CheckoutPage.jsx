import React from 'react';
import CheckoutSteps from './CheckoutSteps';
import OrderSummary from './OrderSummary';


export default function CheckoutPage() {

  const [items, setItems] = React.useState([]);
  const [subTotal, setSubTotal] = React.useState(0);



  return (
    <>
      <CheckoutSteps />

      <OrderSummary items={items} subTotal={subTotal} />

    </>
  )
}
