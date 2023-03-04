import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";

import React, { useMemo } from "react";

import { CHECK_STRIPE_ORDER_STATUS, STRIPE_CREATE_ORDER } from "../../../services/parent";

import useResponsiveFontSize from "./useResponsiveFontSize";

const useOptions = () => {
  const fontSize = useResponsiveFontSize();
  const options = useMemo(
    () => ({
      style: {
        base: {
          fontSize,
          color: "#424770",
          letterSpacing: "0.025em",
          fontFamily: "Source Code Pro, monospace",
          "::placeholder": {
            color: "#aab7c4"
          }
        },
        invalid: {
          color: "#9e2146"
        }
      }
    }),
    [fontSize]
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

    console.log(stripe)
    
    const data = {
      email: 'mendaparaharsh02@gmail.com',
      amount: 15000,
      currency: 'cad',
    }

    try {
      const order = await STRIPE_CREATE_ORDER(data)
      
      const clientSecret = order['client_secret'];
      console.log(clientSecret)

      try {
        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardNumberElement),
            billing_details: {
              email: data.email
            },
          },
        });
        if (result.error) {
          // Show error to your customer (e.g., insufficient funds)
          console.log(result.error.message);
        } else {
          // The payment has been processed!
          if (result.paymentIntent.status === 'succeeded') {
            console.log('Money is in the bank!', result);
            try {
              const status = CHECK_STRIPE_ORDER_STATUS({ id: result.paymentIntent.id })
              console.log(status)
            } catch (e) {
              console.log('CHECK_STRIPE_ORDER_STATUS Error', e)
            }
            // Show a success message to your customer
            // There's a risk of the customer closing the window before callback
            // execution. Set up a webhook or plugin to listen for the
            // payment_intent.succeeded event that handles any business critical
            // post-payment actions.
          }
        } 
      } catch (e) {
        console.log('Stripe Error', e)
      }  
    } catch (e) {
        console.log('Stripe Error', e)
    }
  };

  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        'color': '#32325d',
        'fontFamily': '"Helvetica Neue", Helvetica, sans-serif',
        'fontSmoothing': 'antialiased',
        'fontSize': '16px',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Card number
          <CardNumberElement
            options={CARD_ELEMENT_OPTIONS}
            onReady={() => {
              console.log("CardNumberElement [ready]");
            }}
            onChange={event => {
              console.log("CardNumberElement [change]", event);
            }}
            onBlur={() => {
              console.log("CardNumberElement [blur]");
            }}
            onFocus={() => {
              console.log("CardNumberElement [focus]");
            }}
          />
        </label>
        <label>
          Expiration date
          <CardExpiryElement
            options={CARD_ELEMENT_OPTIONS}
            onReady={() => {
              console.log("CardNumberElement [ready]");
            }}
            onChange={event => {
              console.log("CardNumberElement [change]", event);
            }}
            onBlur={() => {
              console.log("CardNumberElement [blur]");
            }}
            onFocus={() => {
              console.log("CardNumberElement [focus]");
            }}
          />
        </label>
        <label>
          CVC
          <CardCvcElement
            options={CARD_ELEMENT_OPTIONS}
            onReady={() => {
              console.log("CardNumberElement [ready]");
            }}
            onChange={event => {
              console.log("CardNumberElement [change]", event);
            }}
            onBlur={() => {
              console.log("CardNumberElement [blur]");
            }}
            onFocus={() => {
              console.log("CardNumberElement [focus]");
            }}
          />
        </label>
        <button type="submit" disabled={!stripe} onClick={handleSubmit}>
          Pay
        </button>
    </form>
    </div>
  );
};

export default SplitForm;
