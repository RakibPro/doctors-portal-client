import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

const CheckoutForm = ({ booking }) => {
    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [success, setSuccess] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');

    const stripe = useStripe();
    const elements = useElements();
    const { price, patient, email, _id } = booking;

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch('http://localhost:5000/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`,
            },
            body: JSON.stringify({ price }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [price]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setCardError(error.message);
        } else {
            setCardError('');
        }

        setSuccess('');
        setProcessing(true);
        const { paymentIntent, error: confirmError } =
            await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: patient,
                        email: email,
                    },
                },
            });

        if (confirmError) {
            setCardError(confirmError.message);
            return;
        }
        if (paymentIntent.status === 'succeeded') {
            console.log(card);
            // Store payment info on database
            const payment = {
                price,
                transactionId: paymentIntent.id,
                email,
                bookingId: _id,
            };

            fetch('http://localhost:5000/payments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `bearer ${localStorage.getItem(
                        'accessToken'
                    )}`,
                },
                body: JSON.stringify(payment),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log('Success:', data);
                    setSuccess('Congrats, Your payment is Successful');
                    setTransactionId(paymentIntent.id);
                });
        }
        setProcessing(false);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button
                    className='btn btn-sm btn-secondary text-white mt-4'
                    type='submit'
                    disabled={!stripe || !clientSecret || processing}
                >
                    Pay
                </button>
            </form>
            <p className='text-error'>{cardError}</p>
            {success && (
                <div className='mt-3'>
                    <p className='text-success'>{success}</p>
                    <p>
                        Your TransactionId:&nbsp;
                        <span className='font-bold'>{transactionId}</span>
                    </p>
                </div>
            )}
        </>
    );
};

export default CheckoutForm;
