import React, { useMemo } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement
} from "@stripe/react-stripe-js";


const useOptions = () => {
  const options = useMemo(
    () => ({
      style: {
        base: {
            backgroundColor:"#fff",
            color: "#000",
            letterSpacing: "0.025em",
            fontFamily: "Source Code Pro, monospace",
            "::placeholder": {
                color: "#252525"
            },
        },
        invalid: {
            color: "#f00",
            "::placeholder": {
                color: "#f00"
            }
        }
      }
    }),
    []
  );

  return options;
};

const SplitForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();

  const handleSubmit = async event => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const payload = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement)
    });
    console.log("[PaymentMethod]", payload);
  };

  return (
    <form onSubmit={handleSubmit}>
        <div className="row bg-black p-4 rounded-3 mb-3">
            <div className="col-sm-12 mb-3">
                <CardNumberElement  options={options} placeholder="Enter Card Number" />
            </div>
            <div className="col-sm-6  mb-3">
                <CardExpiryElement options={options}  placeholder="Card Holder's Name" />
            </div>
            <div className="col-sm-6  mb-3">
                <CardCvcElement options={options} placeholder="Expiry Date" />
            </div>
        </div>
        <button type="submit" className="btn cus_btn custom01" disabled={!stripe}>
            Pay
        </button>
    </form>
  );
};

export default SplitForm;
