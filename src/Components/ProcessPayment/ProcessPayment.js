import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51I97rxKyA5cevebV0lqDcxe6yTnAXWpBHUTWZ32qrDFaE2Zt1n1llHRqPmPTwpgOeiE9Dvkkexz9OiAuWugPBa5Y00H0DbJxKn');

const ProcessPayment = ({handlePaymentSuccess}) => {
	return (
		<Elements stripe={stripePromise}>
            <CheckoutForm handlePaymentSuccess={handlePaymentSuccess}/>
		</Elements>
	);
};

export default ProcessPayment;
