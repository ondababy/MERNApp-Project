import { useCartActions } from '@features';
import React from 'react';
import { useOrderActions } from '../hooks/useOrderActions';
import CheckoutSteps from './CheckoutSteps';
import OrderSummary from './OrderSummary';


export default function CheckoutPage() {
  const [checkoutStatus, setCheckoutStatus] = React.useState(false)
  const { getItems } = useCartActions()
  const { order } = useOrderActions()



  return (
    <>
      <CheckoutSteps />

      <OrderSummary order={order} checkoutFinished={checkoutStatus} />

    </>
  )
}
