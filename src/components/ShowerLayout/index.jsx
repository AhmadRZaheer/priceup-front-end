import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import "./style.scss";
import { Add } from "@mui/icons-material";
import SingleShowerCard from "./SingleShowerCard";

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
];

const ShowerLayout = () => {
  return (
    <Box sx={{ px: 3, py: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          pb: 5,
          pr: 2.6,
        }}
      >
        <Typography className="layouttitle">
          Showers <Box sx={{ color: "#000000" }}>/ Layouts</Box>
        </Typography>
        <Box>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#8477DA",
              width: "174px",
              height: "42px",
              color: "white",
              textTransform: "capitalize",
              borderRadius: 1,
              fontSize: 16,
              padding: "10px 13px",
              display: "box",
              "&:hover": { backgroundColor: "#8477DA" },
            }}
          >
            Custom Layout
            <Add color="white" sx={{ ml: 1.1 }} />
          </Button>
        </Box>
      </Box>
      <Grid
        container
        sx={{
          m: "0px !important",
          gap: 2,
          display: "flex",
          justifyContent: { md: "space-between", xs: "normal" },
        }}
      >
        {modification.map((data, index) => (
          <SingleShowerCard key={index} data={data} />
        ))}
      </Grid>
    </Box>
  );
};

export default ShowerLayout;
