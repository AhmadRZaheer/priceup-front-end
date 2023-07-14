import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { layouts } from "../../data/data";
import ClientDetailsModel from "./Model";
import door from "../../Assets/door.png";

const LayoutMeasurements = ({setHandleEstimatesPages}) => {
  return (
    <>
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
            <Typography sx={{ font: "18px" }}>Enter Measurements</Typography>
            <Typography sx={{ color: "#667085", font: "14px" }}>
              Your new project has been created. Invite colleagues to
              collaborate on this project.
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "96.5%",
              paddingY: 4,
              paddingX: 2,

              background: "#D9D9D9",
              gap: 4,
              borderRadius: "8px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: "48.5%",
                flexDirection: "column",
                gap: 2,

                // background: "red",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <label htmlFor="address">a</label>
                <TextField
                  placeholder="12 inch"
                  size="small"
                  variant="outlined"
                  sx={{
                    background: "#ffff",
                    borderRadius: "8px",
                    border: "1px solid #D0D5DD",
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <label htmlFor="address">b</label>
                <TextField
                  placeholder="12 inch"
                  size="small"
                  variant="outlined"
                  sx={{
                    background: "#ffff",
                    borderRadius: "8px",
                    border: "1px solid #D0D5DD",
                  }}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <label htmlFor="address">c</label>
                <TextField
                  placeholder="12 inch"
                  size="small"
                  variant="outlined"
                  sx={{
                    background: "#ffff",
                    borderRadius: "8px",
                    border: "1px solid #D0D5DD",
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <label htmlFor="address">d</label>
                <TextField
                  placeholder="12 inch"
                  size="small"
                  variant="outlined"
                  sx={{
                    background: "#ffff",
                    borderRadius: "8px",
                    border: "1px solid #D0D5DD",
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <label htmlFor="address">e</label>
                <TextField
                  placeholder="12 inch"
                  size="small"
                  variant="outlined"
                  sx={{
                    background: "#ffff",
                    borderRadius: "8px",
                    border: "1px solid #D0D5DD",
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                width: "48.5%",
                justifyContent: "end",
              }}
            >
              <img src={door} alt="Selected" />
            </Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ width: "150px" }}>
              <Button
                fullWidth
                sx={{
                  boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
                  color: "#344054",
                  textTransform: "initial",
                  border: "1px solid #8477DA",
                }}
              >
                Reset
              </Button>
            </Box>
            <Box sx={{ display: "flex", gap: 4, justifyContent: "end" }}>
              <Box sx={{ width: "150px" }}>
                <Button
                  fullWidth
                  onClick={() => setHandleEstimatesPages("Layout")}
                  sx={{
                    boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
                    color: "#344054",
                    textTransform: "initial",
                    border: "1px solid #D0D5DD",
                  }}
                >
                  Back
                </Button>
              </Box>
              <Box sx={{ width: "150px" }}>
                <Button onClick={() => setHandleEstimatesPages("Review")} fullWidth variant="contained">
                  {" "}
                  Next
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default LayoutMeasurements;
