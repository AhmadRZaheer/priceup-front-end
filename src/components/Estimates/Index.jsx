import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { layouts } from "../../data/data";
import ClientDetailsModel from "./Model";
import LayoutMeasurements from "./layoutMeasurements";
import LayoutReview from "./LayoutReview";
import ExistingQuotes from "./existingQuotes";
import { NavLink } from "react-router-dom";

const Index = () => {
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
  const [clientDetailOpen, setClientDetailOpen] = useState(false);
  const [layoutMeasurementsOpen, SetlayoutMeasurementsOpen] = useState(true);
  const [StorePage, setStorePage] = useState("Layout");

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          background: "white",
          height: "93.3vh",
          overflowY: "scroll",
          paddingY: 4,
          borderTopLeftRadius: 30,
          borderBottomLeftRadius: 30,
        }}
      >
        {StorePage === "Layout" && (
          <Box
            sx={{
              width: "70%",
              margin: "auto",

              display: "flex",
              alignItems: "center",
              //   background: "blue",
              marginTop: 5,
              flexDirection: "column",
              p: 2,
              gap: 4,
            }}
          >
            <Typography textAlign={"center"} variant="h4">
              Create New Qoute
            </Typography>
            <Box
              sx={{
                width: "94%",
                margin: "auto",
                borderRadius: "12px",
                boxShadow:
                  "0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)",
                border: "1px solid #EAECF0",
                paddingX: 2,
                paddingY: 4,
                rowGap: 4,
                // background: "green",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box>
                <Typography sx={{ font: "18px" }}>Slect Layout</Typography>
                <Typography sx={{ color: "#667085", font: "14px" }}>
                  Your new project has been created. Invite colleagues to
                  collaborate on this project.
                </Typography>
              </Box>
              <Grid container gap={4}>
                {layouts.map((layout) => (
                  <Box key={layout.id} sx={boxStyles}>
                    <img src={layout.imageSrc} alt="Selected" />
                    <Typography sx={{ font: "18px" }}>
                      {layout.title}
                    </Typography>
                  </Box>
                ))}
                <Box sx={boxStyles}>
                  <Typography sx={{ font: "18px" }}>Custom</Typography>
                </Box>
              </Grid>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <NavLink to="/Estimates">
                  <Button
                    // href="/Existing"
                    sx={{ width: 100 }}
                    fullWidth
                    variant="outlined"
                  >
                    {" "}
                    Back
                  </Button>
                </NavLink>
                <Button
                  sx={{ width: 100 }}
                  onClick={() => setStorePage("Measurments")}
                  fullWidth
                  variant="contained"
                >
                  {" "}
                  Next
                </Button>
              </Box>
            </Box>
          </Box>
        )}
        {StorePage === "Measurments" && (
          <LayoutMeasurements setHandleEstimatesPages={setStorePage} />
        )}
        {StorePage === "Review" && (
          <LayoutReview setHandleEstimatesPages={setStorePage} />
        )}
      </Box>
      <ClientDetailsModel
        open={clientDetailOpen}
        handleCancel={() => setClientDetailOpen(false)}
        SetlayoutMeasurementsOpen={SetlayoutMeasurementsOpen}
      />
    </>
  );
};

export default Index;
