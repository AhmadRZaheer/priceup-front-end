import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, Stack, Grid, CircularProgress } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import {
  getEstimateCategory,
  resetEstimateState,
  setEstimateCategory,
  setEstimateState,
} from "@/redux/estimateSlice";
import bgCustom from "@/Assets/customlayoutimage.svg";
import { EstimateCategory } from "@/utilities/constants";
import { useNavigate } from "react-router-dom";
import { resetMirrorEstimateState, setMirrorProjectId } from "@/redux/mirrorsEstimateSlice";
import { resetState, setShowerProjectId } from "@/redux/estimateCalculations";

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

const boxStyles = {
  minHeight: "182px",
  minWidth: "180px",
  margin: "auto",
  borderRadius: "12px",
  boxShadow:
    "0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)",
  border: "1px solid #EAECF0",
  p: 2,
  background: "#D9D9D9",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 3,
  flexDirection: "column",
  cursor: "pointer",
};

export default function ChooseEstimateCategoryModal({
  open,
  handleClose,
  projectId
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [category, setCategory] = useState('');
  const handleBoxClick = (category) => {
    setCategory(category);
  };
  const handleSubmit = () => {

    dispatch(resetEstimateState());
    dispatch(resetMirrorEstimateState());
    dispatch(resetState());
    dispatch(setEstimateState("create"));

    if(category === EstimateCategory.SHOWERS){
    // showers
    dispatch(setShowerProjectId(projectId));
    dispatch(setEstimateCategory(EstimateCategory.SHOWERS));
    navigate("/estimates/layouts");
    }
    else{
    // mirrors
    dispatch(setMirrorProjectId(projectId));
    dispatch(setEstimateCategory(EstimateCategory.MIRRORS));
    navigate("/estimates/dimensions");
    }
  }

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
              <CloseIcon onClick={handleClose} className="pointer" />
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

            <Grid
              container
              gap={1}
              sx={{ minHeight: "40vh", overflow: "auto", maxHeight: "60vh" }}
            >
              <Box
                key={"showers-cat"}
                sx={{
                  ...boxStyles,
                  backgroundColor:
                    category !== EstimateCategory.SHOWERS
                      ? "#D9D9D9"
                      : "#8477DA",
                  color:
                    category !== EstimateCategory.SHOWERS
                      ? "black"
                      : "white",
                  width: "162px",
                  height: "192px",
                }}
                onClick={() => handleBoxClick(EstimateCategory.SHOWERS)}
              >
                <img
                  style={{
                    position: "relative",
                    zIndex: 1,
                    width: "120px",
                    height: "140px",
                  }}
                  src={bgCustom}
                  alt="Selected"
                />
                <Typography sx={{ font: "18px" }}>Showers</Typography>
              </Box>
              <Box
                key={"mirrors-cat"}
                sx={{
                  ...boxStyles,
                  backgroundColor:
                    category !== EstimateCategory.MIRRORS
                      ? "#D9D9D9"
                      : "#8477DA",
                  color:
                    category !== EstimateCategory.MIRRORS
                      ? "black"
                      : "white",
                  width: "162px",
                  height: "192px",
                }}
                onClick={() => handleBoxClick(EstimateCategory.MIRRORS)}
              >
                <img
                  style={{
                    position: "relative",
                    zIndex: 1,
                    width: "120px",
                    height: "140px",
                  }}
                  src={bgCustom}
                  alt="Selected"
                />
                <Typography sx={{ font: "18px" }}>Mirrors</Typography>
              </Box>
            </Grid>

          </Box>
          <Box sx={{ display: "flex", justifyContent: "end", gap: "10px" }}>
            <Button
              variant="outlined"
              onClick={handleClose}
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
              disabled={category.length <= 0}
              onClick={handleSubmit}
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
