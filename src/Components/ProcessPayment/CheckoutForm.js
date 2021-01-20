import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';

const CheckoutForm = ({handlePaymentSuccess}) => {
  const stripe = useStripe();
  const elements = useElements();

  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(null);

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
      setPaymentError(error.message);
      setPaymentSuccess(null);

    } else {
      console.log('[PaymentMethod]', paymentMethod);
      setPaymentSuccess('Your ' + paymentMethod.card.brand + ' card payment successful');
      setPaymentError(null);
      handlePaymentSuccess(paymentMethod.id);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <CardElement />
      
      <button type="submit" disabled={!stripe} className="mt-4 btn btn-success">
        Pay
      </button>
    </form>
    {
      paymentError && <p style={{color: 'red'}}>{paymentError}</p>
    }
    {
      paymentSuccess && <p style={{color: 'green'}}>{paymentSuccess}</p>
    }
    </div>
  );
};

export default CheckoutForm;