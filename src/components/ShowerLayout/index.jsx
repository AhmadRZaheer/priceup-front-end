import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import "./style.scss";
import { Add } from "@mui/icons-material";
import SingleShowerCard from "./SingleShowerCard";
import { useFetchDataDefault } from "@/utilities/ApiHooks/defaultLayouts";

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
  const {
    data: ShowsLayouts,
    refetch,
    isLoading: isLoadingShowsLayouts,
  } = useFetchDataDefault();

  useEffect(() => {
    refetch();
  }, [refetch]);
  console.log(ShowsLayouts, "ShowsLayouts");
  return (
    <Box sx={{ px: "34px", py: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          pb: 5,
          pr: 3,
        }}
      >
        <Typography className="layouttitle">
          Showers <Box sx={{ color: "#000000" }}>&nbsp;/ Layouts</Box>
        </Typography>
        <Box>
          <Button
            // onClick={() => navigate("/layouts/edit")}
            variant="contained"
            // endIcon={}
            sx={{
              background: "#8477DA",
              ":hover": { background: "#8477DA" },
              fontSize: 16,
              fontWeight: 600,
              lineHeight: "21.86px",
              letterSpacing: "0.1px",
              gap: "10px",
            }}
          >
            Custom Layout
            <Add sx={{ width: "16px", height: "16px", color: "#FFFFFF" }} />
          </Button>
        </Box>
      </Box>
      <Grid
        container
        gap={"21px"}
        sx={
          {
            // m: "0px !important",
            // gap: '21px',
            // display: "flex",
            // justifyContent: { md: "space-between", xs: "normal" },
          }
        }
      >
        {isLoadingShowsLayouts ? (
          <Box>
            <CircularProgress sx={{ color: "#8477DA" }} />
          </Box>
        ) : (
          ShowsLayouts?.map((data, index) => (
            <Grid item>
              <SingleShowerCard key={index} data={data} />
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default ShowerLayout;
