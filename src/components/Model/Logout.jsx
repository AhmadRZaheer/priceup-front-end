import * as React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  gap: 2,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "#ffff",
  borderRadius: "4px",
  p: 3,
};

export default function LagoutModal({ open, close, logout }) {
  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
            }}
          >
            <Typography>Logout</Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 1,
              marginTop: 2,
              justifyContent: "end",
            }}
          >
            <Button
              fullWidth
              sx={{
                boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
                color: "#344054",
                textTransform: "initial",
                border: "1px solid #D0D5DD",
              }}
              onClick={close}
            >
              Cancel
            </Button>
            <Button
              href="/login"
              onClick={logout}
              sx={{
                textTransform: "initial",
              }}
              fullWidth
              variant="contained"
            >
              Logout
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
