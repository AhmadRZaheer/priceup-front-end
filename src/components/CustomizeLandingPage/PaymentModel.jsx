import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Payment from "../StripePayment";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 808,
//   bgcolor: "#FFFFFF",
//   border: "1px solid #D0D5DD",
  p: "24px 16px 24px 16px",
  borderRadius: "12px",
  display: "grid",
  gap: 2,
  justifyContent:'center'
};

export default function PaymentModel({ open, handleClose,refetchData }) {
  const [stripePromise, setStripePromise] = useState(null);
  useEffect(() => {
    setStripePromise(
      loadStripe(
        "pk_test_51PbsdGRujwjTz5jAngiBVuLGHvo6F3ALHulFXgBb9VCl2sY9oX6mQSLYv7ryU8nCqwo2XUCKBGoN2DnKBE7nFhOZ0047xQUUoC"
      )
    );
  }, []);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          ".MuiModal-backdrop": {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <Box sx={style}>
          <Payment stripePromise={stripePromise} refetchData={refetchData} handleClose={handleClose} />
        </Box>
      </Modal>
    </>
  );
}
