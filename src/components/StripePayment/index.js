import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Box, Container, Typography } from "@mui/material";
import "./style.scss";

function Payment(props) {
  const { stripePromise,refetchData,handleClose } = props;
  const [clientSecret, setClientSecret] = useState(
    "pi_3QRs8ZRujwjTz5jA0JZcwoov_secret_NrmCC54cC7Gozt16djTnu0abp"
  );

  //   useEffect(() => {
  //     // Create PaymentIntent as soon as the page loads
  //     fetch("/api/create-payment-intent")
  //       .then((res) => res.json())
  //       .then(({clientSecret}) => setClientSecret(clientSecret));
  //   }, []);

  return (
    <Box sx={{ maxWidth: 345 }}>
     
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm refetchData={refetchData} handleClose={handleClose} />
        </Elements>
      )}
    </Box>
  );
}

export default Payment;