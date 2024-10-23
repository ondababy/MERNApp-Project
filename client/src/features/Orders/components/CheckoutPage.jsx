import { useCartActions } from '@features';
import CheckoutSteps from './CheckoutSteps';
import OrderSummary from './OrderSummary';


export default function CheckoutPage() {
  const { cart, getItems } = useCartActions()



  return (
    <>
      <CheckoutSteps />

      <OrderSummary order={cart} />

    </>
  )
}
