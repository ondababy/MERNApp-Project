import { useStripeCheckout } from '@custom';
import { Elements, PaymentElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutForm = () => {
  const { handleCheckout, error, loading } = useStripeCheckout();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const billingDetails = {
      email: '',
      name: '',
      phone: '',
      address: '', // new property
    };
    await handleCheckout(billingDetails);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement /> {/* replaced CardElement with PaymentElement */}
      <button type="submit" disabled={loading}>
        Pay
      </button>
      {error && <div>{error}</div>}
    </form>
  );
}

export default function CheckoutPayment() {

  const options = {
    // passing the client secret obtained from the server
    clientSecret: import.meta.env.VITE_APP_STRIPE_SECRET_KEY,
  };
  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  )
}
