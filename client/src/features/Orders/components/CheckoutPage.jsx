import { useCartActions } from '@features';
import { useOrderActions } from '../hooks/useOrderActions';
import CheckoutSteps from './CheckoutSteps';
import OrderSummary from './OrderSummary';


export default function CheckoutPage() {
  const { getItems } = useCartActions()
  const { order } = useOrderActions()



  return (
    <>
      <CheckoutSteps />

      <OrderSummary order={order} />

    </>
  )
}
