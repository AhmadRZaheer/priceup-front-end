import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { layouts } from "../../data/data";
import ClientDetailsModel from "./Model";
import LayoutMeasurements from "./layoutMeasurements";
import LayoutReview from "./LayoutReview";

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

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          background: "yellow",
          height: "93.3vh",
          overflowY: "scroll",
          paddingY: 4,
        }}
      >
        {!layoutMeasurementsOpen ? (
          <Box
            sx={{
              width: "70%",
              margin: "auto",

              display: "flex",
              alignItems: "center",
              //   background: "blue",
              marginTop: 15,
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
              <Box sx={{ display: "flex", justifyContent: "end" }}>
                <Box sx={{ width: "150px" }}>
                  <Button
                    onClick={() => setClientDetailOpen(true)}
                    fullWidth
                    variant="contained"
                  >
                    {" "}
                    Next
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        ) : (
          //   <LayoutMeasurements />
          <LayoutReview />
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
