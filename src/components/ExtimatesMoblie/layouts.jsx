import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";

import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";

import { useFetchDataDefault } from "../../utilities/ApiHooks/DefaultLayouts";
import { backendURL } from "../../utilities/common";
import { useDispatch, useSelector } from "react-redux";
import {
  addSelectedItem,
  selectedItem,
  setNavigation,
} from "../../redux/estimateCalculations";
export const boxStyles = {
  minHeight: "172px",
  minWidth: { md: "180px", xs: "140px" },
  margin: "auto",
  borderRadius: "8px",
  boxShadow:
    "0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)",
  border: { md: "1px solid #EAECF0", xs: "none" },
  p: { md: 1.2, xs: 0.3 },
  background: "#8477DA",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: { md: 2, xs: 1 },
  flexDirection: "column",
  cursor: "pointer",
  // position: "relative",
};
const Layout = () => {
  const { data: layouts, refetch: defaultDataRefetch } = useFetchDataDefault();
  const dispatch = useDispatch();
  const selectedData = useSelector(selectedItem);

  const handleBoxClick = (layout) => {
    dispatch(addSelectedItem(layout));
    // dispatch(setNavigation("measurements"));
  };
  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          background: "#18133b",

          height: "97vh",
          // overflowY: "scroll",
          paddingY: { md: 4, sx: 0 },
        }}
      >
        <Box
          sx={{
            width: { md: "70%", sm: "100%", sx: "100%" },
            margin: { md: "auto", xs: 0 },

            display: "flex",
            alignItems: { md: "center", xs: "start" },
            //   background: "blue",
            marginTop: { md: 15, sx: 0 },
            flexDirection: "column",
            p: { md: 2, sx: 0 },
            gap: { md: 4, xs: 0 },
          }}
        >
          {/* create New Quotes  header with back arrow*/}
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
              borderTop: "2px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <Box sx={{ display: { md: "none", xs: "block" } }}>
              <ChevronLeftOutlinedIcon
                onClick={() => {
                  dispatch(setNavigation("existing"));
                }}
                sx={{ fontSize: 34, paddingTop: 0.4 }}
              />
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
              width: { md: "94%", sm: "98%", xs: "91.3%" },
              margin: "auto",
              borderRadius: { md: "12px", xs: 0 },
              boxShadow:
                "0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)",
              border: { md: "1px solid #EAECF0", xs: "none" },
              paddingX: 2,
              paddingY: 4,
              rowGap: 4,
              background: { md: "white", xs: "#100D24" },
              display: "flex",
              flexDirection: "column",
              paddingTop: { md: 4, xs: 6 },
              marginTop: { md: 0, xs: -3 },
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: { md: "18px", xs: "18px" },
                  color: { md: "black", xs: "white" },
                  paddingBottom: 1,
                }}
              >
                Select Layout
              </Typography>
              <Typography
                sx={{ color: { md: "#667085", xs: "white" }, font: "14px" }}
              >
                Your new project has been created. Invite colleagues to
                collaborate on this project.
              </Typography>
            </Box>
            <Grid container gap={1} sx={{ height: "55vh", overflow: "auto" }}>
              {layouts.map((layout) => (
                <Box
                  key={layout._id}
                  // sx={boxStyles}
                  sx={{
                    ...boxStyles,
                    backgroundColor:
                      selectedData?._id !== layout._id
                        ? "rgba(121, 102, 189, 0.5)"
                        : "#8477DA",
                  }}
                  onClick={() => handleBoxClick(layout)}
                >
                  <img
                    style={{
                      position: "relative",
                      zIndex: 1,
                      width: "70px",
                      height: "120px",
                    }}
                    // src={layout.imageSrc}
                    src={`${backendURL}/${layout?.image}`}
                    alt="Selected"
                  />
                  <Typography sx={{ font: "18px" }}>{layout?.name}</Typography>
                </Box>
              ))}
              <Box sx={boxStyles}>
                <Typography sx={{ font: "18px" }}>Custom</Typography>
              </Box>
            </Grid>
            <Box
              sx={{
                display: "flex",
                // position: "absolute",
                // botton: 0,
                justifyContent: { md: "end", xs: "center" },
              }}
            >
              <Button
                onClick={() => {
                  dispatch(setNavigation("measurements"));
                }}
                color="primary"
                sx={{
                  textTransform: "capitalize",
                  width: "100%",
                  background: "#8477DA",
                  color: "white",
                  fontSize: 18,
                  "&:hover": { background: "#8477DA", color: "white" },
                }}
              >
                {" "}
                Next
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Layout;
