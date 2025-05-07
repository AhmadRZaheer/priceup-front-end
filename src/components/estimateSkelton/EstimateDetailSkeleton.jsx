import { Box, Divider, Grid, Skeleton, Stack, Typography } from "@mui/material";
import React from "react";

const EstimateDetailSkeleton = () => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          paddingBottom: { sm: 0, xs: "80px" },
        }}
      >
        <Box
          sx={{
            borderRadius: "12px",
            overflow: "hidden",
            border: "1px solid #D0D5DD",
            backgroundColor: "white",
          }}
        >
          <Box
            sx={{
              px: 3,
              py: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 700,
                lineHeight: "16.41px",
                fontFamily: '"Roboto", sans-serif !important',
              }}
            >
              Estimate Details
            </Typography>
            <Box sx={{ width: "175px" }}>
              <Skeleton variant="rounded" height={30} width={120} />
            </Box>
          </Box>
          <Divider sx={{ borderColor: "#D4DBDF" }} />
          <Box sx={{ backgroundColor: "#F3F5F6", px: 3, py: 2 }}>
            <Grid container>
              <Grid item md={3} className="text-xs-samibold">
                Dimensions
              </Grid>
              <Grid item md={3} className="text-xs-samibold">
                Summary
              </Grid>
              <Grid item md={3} className="text-xs-samibold">
                Pricing Subcategories
              </Grid>
              <Grid item md={3} className="text-xs-samibold">
                Gross Profit Margin
              </Grid>
            </Grid>
          </Box>
          <Divider sx={{ borderColor: "#D4DBDF" }} />
          <Box sx={{ px: 3, py: 2 }}>
            <Grid container spacing={2}>
              <Grid item md={3}>
                <Stack gap={2}>
                  {Array.from({ length: 5 }).map((data, index) => {
                    return (
                      <Box>
                        <Skeleton variant="rounded" height={30} width={120} />
                      </Box>
                    );
                  })}
                  <Box sx={{ width: 120 }}>
                    <Divider sx={{ borderColor: "#D4DBDF",my:1 }} />
                    <Skeleton variant="rounded" height={30} width={120} />
                  </Box>
                </Stack>
              </Grid>
              <Grid item md={3}>
                <Stack gap={2}>
                  {Array.from({ length: 8 }).map((data, index) => {
                    return (
                      <Box>
                        <Skeleton variant="rounded" height={30} width={120} />
                      </Box>
                    );
                  })}
                </Stack>
              </Grid>
              <Grid item md={3}>
                <Stack gap={2}>
                  {Array.from({ length: 6 }).map((data, index) => {
                    return (
                      <Box>
                        <Skeleton variant="rounded" height={30} width={120} />
                      </Box>
                    );
                  })}
                </Stack>
              </Grid>
              <Grid item md={3}>
                <Stack gap={2}>
                  {Array.from({ length: 5 }).map((data, index) => {
                    return (
                      <Box>
                        <Skeleton variant="rounded" height={30} width={120} />
                      </Box>
                    );
                  })}
                  <Box sx={{ width: 120 }}>
                    <Divider sx={{ borderColor: "#D4DBDF",my:1 }} />
                    <Skeleton variant="rounded" height={30} width={120} />
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default EstimateDetailSkeleton;
