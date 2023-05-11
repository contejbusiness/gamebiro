"use client";
import { useState } from "react";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51N5o10SAKxpLk0TvcVlMVqqJXXkN6nbyn5qsATPrFLjlsPKMGdtZiskomTyZS2HkcRqqAdmmICOqK0SA5vvEExCD00Mp5n204b"
);

const Page = () => {
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: {
        number: "4242424242424242",
        exp_month: 12,
        exp_year: 2022,
        cvc: "123",
      },
    });

    if (error) {
      setError(error.message);
    } else {
      console.log(paymentMethod);
      // Make API call to server to process payment
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Elements stripe={stripePromise}>
        <CardElement />
        <button type="submit">Pay Now</button>
        {error && <div>{error}</div>}
      </Elements>
    </form>
  );
};

export default Page;
