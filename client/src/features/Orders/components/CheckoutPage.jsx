import React from 'react';
import { useSelector } from 'react-redux';
import CheckoutSteps from './CheckoutSteps';
import OrderSummary from './OrderSummary';


export default function CheckoutPage() {
  const order = useSelector((state) => state.order);


  return (
    <>
      <CheckoutSteps />
      {order?.completed ? '' :
        <OrderSummary />}
    </>
  )
}
