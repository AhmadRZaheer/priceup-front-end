import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { ErrorOutline } from "@mui/icons-material";
import { EstimateCategory } from "@/utilities/constants";
import MissingHardwaresErrorForShowerLayout from "@/components/Estimates/Showers/missingHardwareErrorMsgs";
import MissingHardwaresErrorForMirrorLayout from "@/components/Estimates/Mirrors/missingHardwareErrorMsgs";
import MissingHardwaresErrorForWineCellarLayout from "../Estimates/WineCellar/missingHardwareErrorMsgs";

const style = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  gap: 0.5,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  //   width: 950,
  bgcolor: "#ffff",
  borderRadius: "4px",
  p: 3,
};

export default function HardwareMissingAlert({ open, handleClose, estimateCategory }) {

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, maxWidth: "900px", width: { sm: "auto", xs: "80%" } }}>
          <Typography sx={{ fontWeight: "bold", fontSize: 22 }}> <ErrorOutline sx={{ fontSize: 22, mb: '-3px' }} /> Missing Hardware Alert</Typography>
          <Typography>Following are some errors in current selected hardware,
            Please try changing your hardware...</Typography>
          {estimateCategory === EstimateCategory.SHOWERS ? <MissingHardwaresErrorForShowerLayout /> : estimateCategory === EstimateCategory.MIRRORS ? <MissingHardwaresErrorForMirrorLayout /> : <MissingHardwaresErrorForWineCellarLayout />}
          <Box
            sx={{
              display: "flex",
              gap: 1,
              marginTop: 2,
              justifyContent: "end",
            }}
          >
            <Button
              sx={{
                boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
                color: "#344054",
                textTransform: "initial",
                border: "1px solid #D0D5DD",
              }}
              onClick={handleClose}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
