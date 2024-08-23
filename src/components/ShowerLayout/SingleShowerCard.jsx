import React from "react";
import "./style.scss";
import { Box, Button, Divider, Typography } from "@mui/material";
import image from "../../Assets/dummy.png";
import ViewDrawer from "./ViewDrawer";
import { useNavigate } from "react-router-dom";

const SingleShowerCard = ({ data }) => {
  const [viewLayout, setViewLayout] = React.useState(false);
  const toggleViewDrawer = (open) => (event) => {
    setViewLayout(open);
  };
  const navigate = useNavigate();
  return (
    <>
      <Box
        sx={{
          width: { lg: "414px", xs: "600px" },
          borderRadius: "8px",
          border: "1px solid #D0D5DD",
          // height: "319px",
          boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
          padding: "16px",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <Box sx={{ display: "flex", gap: "10px" }}>
          <img
            src={image}
            alt="/"
            style={{ width: "59.99px", height: "79px" }}
          />
          <p className="cardTitle">{data.name}</p>
        </Box>
        <Divider sx={{ borderColor: "#D0D5DD" }} />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box className="cardTitleContainer" sx={{ gap: "14px" }}>
            <Box className="cardTitleContainer">
              <Typography className="descTitle">Hardware Finishes</Typography>
              <Typography className="descBoldTitle">
                Polished Chrome (02)
              </Typography>
            </Box>
            <Box className="cardTitleContainer">
              <Typography className="descTitle">Handles</Typography>
              <Typography className="descBoldTitle">8x8 D-pull (01)</Typography>
            </Box>
          </Box>
          <Box className="cardTitleContainer" sx={{ gap: "14px" }}>
            <Box className="cardTitleContainer">
              <Typography className="descTitle">Hinges</Typography>
              <Typography className="descBoldTitle">STD Bevel (02)</Typography>
            </Box>
            <Box className="cardTitleContainer">
              <Typography className="descTitle">Pivot Hinge Option</Typography>
              <Typography className="descBoldTitle">
                Pivot Bevel (02)
              </Typography>
            </Box>
          </Box>
          <Box className="cardTitleContainer">
            <Typography className="descTitle">Glass Type</Typography>
            <Typography className="descBoldTitle">Clear (1/2)</Typography>
          </Box>
        </Box>
        <Divider sx={{ borderColor: "#D0D5DD" }} />
        <Box sx={{ display: "flex", justifyContent: "space-between",gap:'12px' }}>
          <Button
            onClick={toggleViewDrawer(true)}
            variant="text"
            className="cardBtn"
            sx={{ border: "1px solid #8477DA", color: "#8477DA",width:'100%' }}
          >
            View
          </Button>
          <Button
            onClick={() => navigate("/layouts/edit")}
            variant="contained"
            className="cardBtn"
            sx={{ background: "#8477DA", ":hover": { background: "#8477DA" },width:'100%' }}
          >
            Edit
          </Button>
        </Box>
      </Box>
      <ViewDrawer state={viewLayout} toggleDrawer={toggleViewDrawer} />
    </>
  );
};

export default SingleShowerCard;
