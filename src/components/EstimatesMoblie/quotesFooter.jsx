import React from "react";
import { Box, Button } from "@mui/material";
import {
  setDoorWidth,
  setNavigation,
  updateMeasurements,
} from "../../redux/estimateCalculations";
import { useDispatch } from "react-redux";

const QuotesFooter = ({ navigateNext, type, navigateBack, disabled }) => {
  const dispatch = useDispatch();
  const nextClickHandler = () => {
    if (type !== "submit") {
      dispatch(setNavigation(navigateNext));
    }
  };
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "space-between",
          width: "100%",
          // borderTop: { xs: "1px solid #423f57", sm: "none" },
          zIndex: 100,
          marginY: "20px",
        }}
      >
        <Button
          fullWidth
          onClick={() => {
            dispatch(setNavigation(navigateBack));
            if (navigateBack === "layouts") {
              dispatch(updateMeasurements([]));
              dispatch(setDoorWidth(0));
            }
          }}
          sx={{
            boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
            color: "#344054",
            textTransform: "initial",
            border: "1px solid #D0D5DD",
            backgroundColor: { md: "transparent", xs: "white" },
            width: "160px",
          }}
        >
          {" "}
          Back
        </Button>

        <Button
          fullWidth
          disabled={disabled}
          type={type}
          variant="contained"
          onClick={() => {
            nextClickHandler();
          }}
          sx={{
            backgroundColor: "#8477da",
            "&:hover": {
              backgroundColor: "#8477da",
            },
            width: "160px",
          }}
        >
          {" "}
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default QuotesFooter;
