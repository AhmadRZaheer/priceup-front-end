import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import "./style.scss";
import SingleShowerCard from "@/components/common/Layouts/SingleLayoutCard";
import { useFetchAllDocuments } from "@/utilities/ApiHooks/common";
import { backendURL } from "@/utilities/common";

const WineLayoutsComponent = () => {
  const {
    data: WineLayouts,
    refetch,
    isLoading: isLoadingWineLayouts,
  } = useFetchAllDocuments(`${backendURL}/wineCellars/layouts`);

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
        <Box sx={{ display: "flex", gap: "5px" }}>
          <Typography className="layouttitle">Wine Cellar</Typography>
          <Typography className="layouttitle">/</Typography>
          <Typography className="layouttitle" sx={{ color: "#000000" }}>
            Layouts
          </Typography>
        </Box>
      </Box>
      <Grid container gap={"21px"}>
        {isLoadingWineLayouts ? (
          <Box
            sx={{
              height: "60vh",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress sx={{ color: "#8477DA" }} />
          </Box>
        ) : (
          WineLayouts?.map((data, index) => (
            <Grid item>
              <SingleShowerCard key={index} data={data} variant="wineCellar" />
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default WineLayoutsComponent;
