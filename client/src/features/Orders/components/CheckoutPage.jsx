import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from './CheckoutSteps';
import OrderSummary from './OrderSummary';


export default function CheckoutPage() {
  const cart = useSelector((state) => state.cart);



  return (
    <>
      <CheckoutSteps />

      <OrderSummary {...cart} />

    </>
  )
}
