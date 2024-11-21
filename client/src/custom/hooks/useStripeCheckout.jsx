// import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import { useState } from 'react';

// export default function useStripeCheckout() {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const defaultPaymentDetails = {
//     clientSecret: import.meta.env.VITE_APP_STRIPE_SECRET_KEY
//   }

//   const handleCheckout = async (billingDetails) => {

//     setLoading(true);
//     try {
//       const { error, paymentIntent } = await stripe.confirmCardPayment(defaultPaymentDetails.clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//           billing_details: billingDetails,
//         },
//       });

//       if (error) {
//         setError(error.message);
//         setLoading(false);
//         return;
//       }

//       setLoading(false);
//       return paymentIntent;
//     } catch (err) {
//       setError(err.message);
//       setLoading(false);
//     }
//   };

//   return {
//     handleCheckout,
//     error,
//     loading,
//   };
// }
