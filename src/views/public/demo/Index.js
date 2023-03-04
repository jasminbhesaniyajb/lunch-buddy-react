import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import React from "react";

import SplitForm from "./SplitForm";
import "./styles.css";

const stripePromise = loadStripe("pk_test_HqQgfXNd8VDztXMky4n234de00uAgNy4k2");
const PublicDemo = () => {
  return (
    <Elements stripe={stripePromise}>
      <div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <SplitForm />
        <br />
      </div>
    </Elements>
  );
};
export default PublicDemo;
