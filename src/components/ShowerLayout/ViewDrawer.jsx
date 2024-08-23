import { Box, Button, Grid, SwipeableDrawer, Typography } from "@mui/material";
import React from "react";
import image from "../../Assets/dummy.png";
import "./style.scss";
import { useNavigate } from "react-router-dom";

const modification = [
  { id: 1, name: "Hardware Finishes" },
  { id: 2, name: "Handles" },
  { id: 3, name: "Pivot Hinge Option" },
  { id: 4, name: "Hinges" },
  { id: 5, name: "Glass Type" },
  { id: 6, name: "Heavy Duty Option" },
  { id: 7, name: "Channel or Clamps" },
  { id: 8, name: "Heavy Pivot Option" },
  { id: 9, name: "Wall Clamps (Mounting)" },
  { id: 10, name: "Sleeve Over (Mounting)" },
  { id: 11, name: "Glass to Glass (Mounting)" },
  { id: 12, name: "Wall Clamps (Corner)" },
  { id: 13, name: "Hardware Finishes (Duplicate)" },
  { id: 14, name: "Handles (Duplicate)" },
  { id: 15, name: "Pivot Hinge Option (Duplicate)" },
  { id: 16, name: "Hinges (Duplicate)" },
  { id: 17, name: "Glass Type (Duplicate)" },
  { id: 18, name: "Heavy Duty Option (Duplicate)" },
];

const ViewDrawer = ({ state, toggleDrawer }) => {
  const navigate = useNavigate();
  return (
    <div>
      <SwipeableDrawer
        // className="customModel"
        anchor="right"
        open={state}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        sx={{
          "& .MuiDrawer-paper": {
            top: { sm: "69px", xs: "57px" },
            boxShadow: "none",
            borderTopLeftRadius: 16,
            p: "32px 12px",
            border: "0.5px solid #F3F5F6",
            width: { sm: "573px", xs: "100%" },
            // height: "90vh"
            // overflowY: "auto",
          },
        }}
      >
        <Box
          className="cardTitleContainer"
          sx={{ pl: 2, gap: "20px" }}
          role="presentation"
          onKeyDown={toggleDrawer(false)}
        >
          <Box sx={{ display: "flex" }}>
            <img
              src={image}
              alt="/"
              style={{ width: "59.99px", height: "79px" }}
            />
            <p className="cardTitle">Doors</p>
          </Box>
          <Grid
            container
            spacing={2}
            sx={{ py: 1, overflowY: "auto", height: "calc(100vh - 265px)" }}
          >
            {modification.map((data, index) => (
              <Grid item xs={6} className="cardTitleContainer" sx={{ py: 1 }}>
                <Typography className="drawerTitle">{data.name}</Typography>
                <Typography className="drawerBoldTitle">
                  Polished Chrome (02)
                </Typography>
              </Grid>
            ))}
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              // pr: 5,
              pb: 5,
              gap: "12px",
            }}
          >
            <Button
              onClick={toggleDrawer(false)}
              variant="text"
              className="drawerBtn"
              sx={{ border: "1px solid #8477DA", color: "#8477DA" }}
            >
              Close
            </Button>
            <Button
              onClick={() => navigate("/layouts/edit")}
              variant="contained"
              className="drawerBtn"
              sx={{
                background: "#8477DA",
                ":hover": { background: "#8477DA" },
              }}
            >
              Edit
            </Button>
          </Box>
        </Box>
      </SwipeableDrawer>
    </div>
  );
};

export default ViewDrawer;
