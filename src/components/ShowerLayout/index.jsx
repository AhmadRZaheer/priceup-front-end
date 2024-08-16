import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import "./style.scss";
import { Add } from "@mui/icons-material";
import SingleShowerCard from "./SingleShowerCard";

const ShowerLayout = () => {
  return (
    <Box sx={{ px: 3, py: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
              display:'box',
              "&:hover": { backgroundColor: "#8477DA" },
            }}
          >
            Custom Layout
            <Add color="white" sx={{ml:1.1}} />
          </Button>
        </Box>
      </Box>
      <SingleShowerCard />
    </Box>
  );
};

export default ShowerLayout;
