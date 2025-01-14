import {
  PaymentElement,
  LinkAuthenticationElement,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import "./style.scss";
import { backendURL } from "@/utilities/common";
import { useEditDocument } from "@/utilities/ApiHooks/common";
import { useParams } from "react-router-dom";
import { Close } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { showSnackbar } from "@/redux/snackBarSlice";

export default function CheckoutForm({ refetchData, handleClose }) {
  const { id } = useParams();
  const stripe = useStripe();
  const dispatch = useDispatch();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const {
    mutateAsync: updateInvoiceStatus,
    isLoading: statusLoading,
    isSuccess,
  } = useEditDocument();
  const [descion, setDescion] = useState("");
  const handleChangeStatus = async (value) => {
    dispatch(
      showSnackbar({
        message: `Payment Successfully`,
        severity: "success",
      })
    );
    // setDescion(value);
    try {
      await updateInvoiceStatus({
        data: { transaction: 'performed' },
        apiRoute:`${backendURL}/landing-page-preview/${id}`,
      });
      handleClose();
      refetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);
    console.log(stripe, "stripestripestripe");

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/completion`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", px: 1, pt: 1 }}
      >
        <Typography fontWeight="bold">Payment</Typography>
        <IconButton onClick={handleClose} sx={{ p: "0px !important" }}>
          <Close />
        </IconButton>
      </Box>
      <Box sx={{ m: "10px" }}>
        <LinkAuthenticationElement
          id="link-authentication-element"
          // Access the email value like so:
          // onChange={(event) => {
          //  setEmail(event.value.email);
          // }}
          //
          // Prefill the email field like so:
          // options={{defaultValues: {email: 'foo@bar.com'}}}
        />
      </Box>
      <Box sx={{ m: "10px" }}>
        <PaymentElement id="payment-element" />
      </Box>
      <Box sx={{ m: "10px" }}>
        {/* <button disabled={isLoading || !stripe || !elements} id="submit">
          <span id="button-text">
            {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Pay now"
            )}
          </span>
        </button> */}
        <Box
          sx={{
            display: "flex",
            gap: 1,
            pt: 2,
            justifyContent: "space-between",
          }}
        >
          <Button
            // disabled={isLoading}
            onClick={() => handleChangeStatus("Paid")}
            fullWidth
            variant="contained"
            sx={{
              fontWeight: "bold !important",
              backgroundColor: statusLoading ? "#d8cece" : "#F95500",
              height: "44px",
              width: { sm: "100%", xs: "187px" },
              "&:hover": { backgroundColor: "#F95500" },
              color: "#0B0B0B",
              textTransform: "capitalize",
              borderRadius: 1,
              fontSize: { lg: 16, md: 15, xs: 12 },
              padding: {
                sm: "10px 16px  !important",
                xs: "5px 5px !important",
              },
            }}
          >
            {statusLoading ? (
              <CircularProgress size={24} sx={{ color: "#8477DA" }} />
            ) : (
              "Pay"
            )}
          </Button>
          {/* <Button
            onClick={() => handleChangeStatus("Voided")}
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: statusLoading ? "#d8cece" : "#E22A2D",
              height: "44px",
              width: { sm: "100%", xs: "187px" },
              "&:hover": { backgroundColor: "#E22A2D" },
              color: "white",
              textTransform: "capitalize",
              borderRadius: 1,
              fontSize: { lg: 16, md: 15, xs: 12 },
              padding: {
                sm: "10px 16px  !important",
                xs: "5px 5px !important",
              },
            }}
          >
            {descion === "Voided" && statusLoading ? (
              <CircularProgress size={24} sx={{ color: "#8477DA" }} />
            ) : (
              "Disapproved"
            )}
          </Button> */}
        </Box>
      </Box>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
