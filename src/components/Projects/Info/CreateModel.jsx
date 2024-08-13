import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 841,
  bgcolor: "#FFFFFF",
  border: "1px solid #D0D5DD",
  p: "24px 16px 24px 16px",
  borderRadius: "12px",
  display: "grid",
  gap: 2,
};

export default function CreateModel({
  openModel,
  handleOpenModel,
  handleCloseModel,
}) {
  return (
    <>
      <Modal
        open={openModel}
        onClose={handleCloseModel}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          ".MuiModal-backdrop": {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <Box sx={style}>
          <Stack>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography
                sx={{
                  fontSize: "18px",
                  fontWeight: 700,
                  lineHeight: "21.09px",
                }}
              >
                Create Estimate
              </Typography>
              <CloseIcon onClick={handleCloseModel} className="pointer" />
            </Box>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 600,
                lineHeight: "21.86px",
                color: "#212528",
                pt: 0.5,
              }}
            >
              Select item for estimation
            </Typography>
          </Stack>
          <Box
            sx={{
              background: "#F3F5F6",
              borderRadius: "12px",
              p: "24px 16px",
              height: "291px",
            }}
          >
            dd
          </Box>
          <Box sx={{ display: "flex", justifyContent: "end", gap: "10px" }}>
            <Button
              variant="outlined"
              onClick={handleCloseModel}
              sx={{
                mr: 1,
                backgroundColor: "#FFFFFF",
                border: "1px solid #D6DAE3",
                "&:hover": { backgroundColor: "#FFFFFF" },
                color: "#212528",
                textTransform: "capitalize",
                borderRadius: 1,
                fontSize: 16,
                fontWeight: 600,
                lineHeight: "21.86px",
                p: "10px 16px",
                width: "86px",
                height: "42px",
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#8477DA",
                "&:hover": { backgroundColor: "#8477DA" },
                color: "white",
                textTransform: "capitalize",
                borderRadius: 1,
                fontSize: 16,
                fontWeight: 600,
                lineHeight: "21.86px",
                p: "10px 16px",
                width: "69px",
                height: "42px",
              }}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
