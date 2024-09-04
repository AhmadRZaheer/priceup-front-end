import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import "./style.scss";
// import { Add } from "@mui/icons-material";
import SingleShowerCard from "./SingleShowerCard";
import { useFetchDataDefault } from "@/utilities/ApiHooks/defaultLayouts";

const ShowerLayout = () => {
  const {
    data: ShowsLayouts,
    refetch,
    isLoading: isLoadingShowsLayouts,
  } = useFetchDataDefault();

  useEffect(() => {
    refetch();
  }, [refetch]);
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          pb: 5,
          pr: 3,
        }}
      >
        <Box sx={{ display: 'flex', gap: '5px' }}>
          <Typography className="layouttitle">
            Shower
          </Typography>
          <Typography className="layouttitle">
            /
          </Typography>
          <Typography className="layouttitle" sx={{ color: "#000000" }}>
            Layouts
          </Typography>
        </Box>

        {/* <Box>
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
        </Box> */}
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
          <Box sx={{ height: "60vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
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
