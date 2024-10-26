import React from 'react';
import { useOrderActions } from '../hooks/useOrderActions';
import CheckoutSteps from './CheckoutSteps';
import OrderSummary from './OrderSummary';


export default function CheckoutPage() {
  const { order } = useOrderActions({})


  return (
    <>
      <CheckoutSteps />
      {order?.completed ? '' :
        <OrderSummary />}
    </>
  )
}
