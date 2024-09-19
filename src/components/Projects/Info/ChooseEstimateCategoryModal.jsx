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
  setProjectId,
} from "@/redux/estimateSlice";
import bgCustom from "@/Assets/customlayoutimage.svg";
import { EstimateCategory } from "@/utilities/constants";
import { useNavigate } from "react-router-dom";
import {
  resetMirrorEstimateState,
  resetNotifications as resetNotificationsMirror,
  setMirrorProjectId,
} from "@/redux/mirrorsEstimateSlice";
import DefaultIcon from "@/Assets/columns.svg";
import { resetNotifications as resetNotificationsShower, resetState, setShowerProjectId } from "@/redux/estimateCalculations";
import { resetNotifications as resetNotificationsWineCaller, resetWineCellarEstimateState, setWineCellarProjectId } from "@/redux/wineCellarEstimateSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 808,
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
  projectId,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [category, setCategory] = useState("");
  const handleBoxClick = (category) => {
    setCategory(category);
  };
  const handleSubmit = () => {
    dispatch(resetEstimateState());
    dispatch(resetMirrorEstimateState());
    dispatch(resetWineCellarEstimateState());
    dispatch(resetState());
    dispatch(setEstimateState("create"));
    dispatch(setProjectId(projectId));

    if (category === EstimateCategory.SHOWERS) {
      // showers
      dispatch(resetNotificationsShower());
      dispatch(setShowerProjectId(projectId));
      dispatch(setEstimateCategory(EstimateCategory.SHOWERS));
      navigate("/estimates/layouts");
    } else if(category === EstimateCategory.WINECELLARS){
      dispatch(resetNotificationsWineCaller());
      // dispatch(setWineCellarProjectId(projectId));
      dispatch(setEstimateCategory(EstimateCategory.WINECELLARS));
      navigate("/estimates/layouts");
    }
    else {
      // mirrors
      dispatch(resetNotificationsMirror());
      dispatch(setMirrorProjectId(projectId));
      dispatch(setEstimateCategory(EstimateCategory.MIRRORS));
      navigate("/estimates/dimensions");
    }
  };

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
          <Stack direction='column' gap='4px'>
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
                  fontFamily: '"Roboto",sans-serif !important'
                }}
              >
                Create Estimate
              </Typography>
              <CloseIcon
                onClick={handleClose}
                className="pointer"
                sx={{ color: "rgba(93, 98, 101, 1)" }}
              />
            </Box>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 600,
                lineHeight: "21.86px",
                color: "#212528",
                opacity: '70%',
                // pt: 0.5,
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
            <Grid container gap={2} sx={{ height: "100%" }}>
              <Box
                key={"showers-cat"}
                sx={{
                  ...boxStyles,
                  backgroundColor:
                    category !== EstimateCategory.SHOWERS
                      ? "rgba(184, 184, 185, 1)"
                      : "#8477DA",
                  color:
                    category !== EstimateCategory.SHOWERS ? "black" : "white",
                  width: "214px",
                  height: "243px",
                }}
                onClick={() => handleBoxClick(EstimateCategory.SHOWERS)}
              >
                <img
                  style={{
                    position: "relative",
                    zIndex: 1,
                    width: "150px",
                    height: "170px",
                  }}
                  src={DefaultIcon}
                  alt="Selected"
                />
                <Typography sx={{ fontSize: "16px", color: "#FFFFFF", lineHeight: '21.86px' }}>
                  Showers
                </Typography>
              </Box>
              <Box
                key={"mirrors-cat"}
                sx={{
                  ...boxStyles,
                  backgroundColor:
                    category !== EstimateCategory.MIRRORS
                      ? "rgba(184, 184, 185, 1)"
                      : "#8477DA",
                  color:
                    category !== EstimateCategory.MIRRORS ? "black" : "white",
                  width: "214px",
                  height: "243px",
                }}
                onClick={() => handleBoxClick(EstimateCategory.MIRRORS)}
              >
                <img
                  style={{
                    position: "relative",
                    zIndex: 1,
                    width: "150px",
                    height: "170px",
                  }}
                  src={DefaultIcon}
                  alt="Selected"
                />
                <Typography sx={{ fontSize: "16px", color: "#FFFFFF", lineHeight: '21.86px' }}>
                  Mirrors
                </Typography>
              </Box>
              <Box
                key={"wineCellar-cat"}
                sx={{
                  ...boxStyles,
                  backgroundColor:
                    category !== EstimateCategory.WINECELLARS
                      ? "rgba(184, 184, 185, 1)"
                      : "#8477DA",
                  color:
                    category !== EstimateCategory.WINECELLARS ? "black" : "white",
                  width: "214px",
                  height: "243px",
                }}
                onClick={() => handleBoxClick(EstimateCategory.WINECELLARS)}
              >
                <img
                  style={{
                    position: "relative",
                    zIndex: 1,
                    width: "150px",
                    height: "170px",
                  }}
                  src={DefaultIcon}
                  alt="Selected"
                />
                <Typography sx={{ fontSize: "16px", color: "#FFFFFF", lineHeight: '21.86px' }}>
                  Wine Cellar
                </Typography>
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
                "&:hover": {
                  backgroundColor: "#FFFFFF",
                  borderColor: " #8477DA",
                },
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
