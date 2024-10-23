import { useCartActions } from '@features';
import React from 'react';
import CheckoutSteps from './CheckoutSteps';
import OrderSummary from './OrderSummary';


export default function CheckoutPage() {
  const { cart, getItems } = useCartActions()
  React.useEffect(() => {
    getItems();
  }, []);


  return (
    <>
      <CheckoutSteps />

      <OrderSummary order={cart} />

    </>
  )
}
