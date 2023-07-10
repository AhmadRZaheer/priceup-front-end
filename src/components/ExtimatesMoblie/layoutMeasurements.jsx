import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import door from "../../Assets/door.png";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
const LayoutMeasurements = ({ setHandleEstimatesPages }) => {
  return (
    <>
      <Box
        sx={{
          width: { md: "70%", sm: "100%", sx: "100%" },
          margin: { md: "auto", xs: 0 },

          display: "flex",
          alignItems: { md: "center", xs: "start" },
          marginTop: { md: 15, sx: 0 },
          flexDirection: "column",
          p: { md: 2, sx: 0 },
          gap: { md: 4, xs: 0 },
        }}
      >
        <Box
          sx={{
            display: { md: "none", xs: "flex" },
            zIndex: 1,
            justifyContent: { md: "center", xs: "start" },
            background: "#18133b",
            width: "100%",
            color: "white",
            paddingY: 1.2,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            marginTop: 7.6,
          }}
        >
          <Box sx={{ display: { md: "none", xs: "block" } }}>
            <ChevronLeftOutlinedIcon
            onClick={() => {
              setHandleEstimatesPages("layout");
            }} sx={{ fontSize: 34, paddingTop: 0.4 }} />
          </Box>
          <Typography textAlign={"center"} variant="h4">
            Create New Qoute
          </Typography>
        </Box>
        <Typography
          sx={{ display: { md: "block", xs: "none" } }}
          textAlign={"center"}
          variant="h4"
        >
          Create New Qoute
        </Typography>
        <Box
          sx={{
            width: { md: "94%", sm: "100%", xs: "100%" },
            margin: "auto",
            borderRadius: { md: "12px", xs: 0 },
            boxShadow:
              "0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)",
            border: { md: "1px solid #EAECF0", xs: "none" },
            paddingX: { md: 2, xs: 0 },
            paddingY: { md: 4, xs: 0 },
            rowGap: 4,
            background: { md: "white", xs: "#100D24" },
            display: "flex",
            flexDirection: "column",
            paddingTop: { md: 0, xs: 6 },
            marginTop: { md: 0, xs: -3 },
          }}
        >
          <Box
            sx={{ paddingLeft: { md: 0, xs: 3 }, paddingTop: { md: 2, xs: 0 } }}
          >
            <Typography
              sx={{
                fontSize: { md: "18px", xs: "18px" },
                color: { md: "black", xs: "white" },
                paddingBottom: 1,
              }}
            >
              Enter Measurements
            </Typography>
            <Typography
              sx={{ color: { md: "#667085", xs: "white" }, font: "14px" }}
            >
              Your new project has been created. Invite colleagues to
              collaborate on this project.
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: { md: "row", xs: "column" },
              width: { md: "96.5%", xs: "100%" },
              paddingY: { md: 4, xs: 0 },
              paddingX: { md: 2, xs: 0 },

              background: { md: "#D9D9D9", xs: "#100D24" },
              gap: 4,
              borderRadius: "8px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: { md: "48.5%", xs: "92%" },
                flexDirection: "column",
                gap: { md: 2, xs: 5 },
                color: { md: "black", xs: "white" },
                background: {
                  md: "none",
                  xs: "linear-gradient(to top right, #100d24 35%, #312969 , #100d24 82%)",
                },
                borderTopLeftRadius: { md: 0, xs: 30 },
                borderTopRightRadius: { md: 0, xs: 30 },
                borderTop: { md: 0, xs: "1px solid #667085" },
                paddingX: { md: 0, xs: 2 },
                // background: "red",
                paddingTop: 2,

                paddingBottom: 8,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <label
                  htmlFor="address"
                  style={{ paddingRight: { md: 0, xs: 2 } }}
                >
                  a
                </label>
                <TextField
                  placeholder="12 inch"
                  size="small"
                  variant="outlined"
                  sx={{
                    background: { md: "#ffff", xs: "#100d24" },
                    borderRadius: "8px",
                    border: "1px solid #D0D5DD",
                    color: { md: "black", xs: "#667085" },
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
                    background: { md: "#ffff", xs: "#100d24" },
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
                    background: { md: "#ffff", xs: "#100d24" },
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
                    background: { md: "#ffff", xs: "#100d24" },
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
                    background: { md: "#ffff", xs: "#100d24" },
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
                justifyContent: { md: "end", xs: "center" },
                alignItems: { md: "center", xs: "center" },
                margin: "auto",
                order: { md: 2, xs: -1 },
              }}
            >
              <img width="150px" src={door} alt="Selected" />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              maxWidth: "100%",
            }}
          >
            {/* <Box sx={{ display: { md: "block", xs: "none" }, width: "150px" }}>
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
            </Box> */}

            <Box
              sx={{
                display: { md: "none", xs: "flex" },
                gap: 2,
                justifyContent: "center",
                width: "92%",
                paddingX: 2,
                paddingY: 2,
                position: "fixed",
                bottom: 0,
                backgroundColor: "#100d24",
                borderTop: "1px solid #423f57",
              }}
            >
              <Box sx={{ width: { md: "150px", xs: "50%" } }}>
                <Button
                  fullWidth
                  onClick={() => setHandleEstimatesPages("layout")}
                  sx={{
                    boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
                    color: "#344054",
                    textTransform: "initial",
                    border: "1px solid #D0D5DD",
                    backgroundColor: { md: "transparent", xs: "white" },
                  }}
                >
                  {" "}
                  Back
                </Button>
              </Box>
              <Box sx={{ width: { md: "150px", xs: "50%" } }}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => setHandleEstimatesPages("review")}
                >
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
