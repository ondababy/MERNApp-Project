import { useCartActions } from '@features';
import React from 'react';
import { useOrderActions } from '../hooks/useOrderActions';
import CheckoutSteps from './CheckoutSteps';
import OrderSummary from './OrderSummary';


export default function CheckoutPage() {
  const [checkoutStatus, setCheckoutStatus] = React.useState(false)
  const { items } = useCartActions()
  const { order } = useOrderActions(items)



  return (
    <>
      <CheckoutSteps />

      <OrderSummary order={order} checkoutFinished={checkoutStatus} />

    </>
  )
}
