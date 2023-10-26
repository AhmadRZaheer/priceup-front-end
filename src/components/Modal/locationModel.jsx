import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import BasicAccordion from "../chipsAccordion/accordion";
import { Button } from "@mui/material";
import ChipsArray from "../chipsAccordion/chips";

const style = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  gap: 2,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "12px",
  p: 4,
};

export default function LocationModel({ open, onClose }) {
  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          backdropFilter: "blur(2px)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <Box sx={style}>
          <Typography variant="h6">
            Olivia is currently added in the following locations:
          </Typography>
          <Box>
            <ChipsArray />
          </Box>
          <BasicAccordion />

          <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
            <Button
              onClick={onClose}
              variant="outlined"
              sx={{
                color: "black",
                border: "1px solid #D0D5DD",
                width: "50%",
                "&:hover": {
                  backgroundColor: "#8477da",
                },
              }}
            >
              Cancel
            </Button>
            <Button
              fullWidth
              variant="contained"
              sx={{ backgroundColor: "#8477DA", width: "50%" }}
            >
              Done
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
