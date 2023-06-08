import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import layout1 from "../../Assets/estimates/layout1.svg";
import layout2 from "../../Assets/estimates/layout2.svg";

import layout3 from "../../Assets/estimates/layout3.svg";
import layout4 from "../../Assets/estimates/layout4.svg";
import layout5 from "../../Assets/estimates/layout5.svg";
import layout6 from "../../Assets/estimates/layout6.svg";
import layout7 from "../../Assets/estimates/layout7.svg";

const Index = () => {
  return (
    <Box
      sx={{
        // minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        background: "yellow",
        paddingY: 4,
      }}
    >
      <Box
        sx={{
          width: "70%",
          margin: "auto",

          display: "flex",
          alignItems: "center",
          background: "blue",
          marginTop: 15,
          flexDirection: "column",
          p: 2,
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
            p: 2,
            background: "green",
          }}
        >
          <Typography sx={{ font: "18px" }}>Select Layout</Typography>
          <Typography sx={{ color: "#667085", font: "14px" }}>
            Your new project has been created. Invite colleagues to collaborate
            on this project.
          </Typography>

          <Grid container gap={4}>
            <Box
              sx={{
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
              }}
            >
              <img src={layout1} alt="Selected" />
              <Typography sx={{ font: "18px" }}> Layout 1</Typography>
            </Box>
            <Box
              sx={{
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
              }}
            >
              <img src={layout2} alt="Selected" />
              <Typography sx={{ font: "18px" }}> Layout 2</Typography>
            </Box>{" "}
            <Box
              sx={{
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
              }}
            >
              <img src={layout3} alt="Selected" />
              <Typography sx={{ font: "18px" }}> Layout 3</Typography>
            </Box>{" "}
            <Box
              sx={{
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
              }}
            >
              <img src={layout4} alt="Selected" />
              <Typography sx={{ font: "18px" }}> Layout 4</Typography>
            </Box>{" "}
            <Box
              sx={{
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
              }}
            >
              <img src={layout5} alt="Selected" />
              <Typography sx={{ font: "18px" }}> Layout 5</Typography>
            </Box>{" "}
            <Box
              sx={{
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
              }}
            >
              <img src={layout6} alt="Selected" />
              <Typography sx={{ font: "18px" }}> Layout 6</Typography>
            </Box>{" "}
            <Box
              sx={{
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
              }}
            >
              <img src={layout7} alt="Selected" />
              <Typography sx={{ font: "18px" }}> Layout 7</Typography>
            </Box>{" "}
            <Box
              sx={{
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
              }}
            >
              <Typography sx={{ font: "18px" }}>Custom</Typography>
            </Box>{" "}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Index;
