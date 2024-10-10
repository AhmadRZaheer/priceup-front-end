import { Box, Grid, Skeleton, Typography } from "@mui/material";
import React from "react";

const LayoutMeasurementSkeleton = () => {
  return (
    <>
      <Box
        sx={{
          borderRadius: { sm: "12px", xs: 0 },
          boxShadow:
            "0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)",
          border: {
            sm: " 1px solid rgba(212, 219, 223, 1)",
            xs: "none",
          },
          overflow: { sm: "hidden" },
        }}
      >
        <Box
          sx={{
            background: " rgba(243, 245, 246, 1)",
            paddingY: 1.3,
            px: 3,
            display: { sm: "flex", xs: "none" },
            borderBottom: "1px solid rgba(212, 219, 223, 1)",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 700,
              fontFamily: '"Roboto", sans-serif !important',
            }}
          >
            Layout & Measurement
          </Typography>
          <Skeleton variant="rounded" height={30} width={120} />
        </Box>
        <Box
          sx={{
            paddingX: { sm: 2, xs: 0 },
            paddingBottom: { sm: 2, xs: 0 },
            // rowGap: 4,
            background: { sm: "white", xs: "#08061B" },
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { sm: "row", xs: "column" },
              width: { sm: "auto", xs: "99.8%" },
              paddingBottom: { sm: 2, xs: 0 },
              paddingX: { sm: 2, xs: 0 },
              //   height: "100%",
              gap: { lg: "84px", xs: 4 },
              borderRadius: "8px",
              pt: 2,
            }}
          >
            <Grid container spacing={2}>
              <Grid item md={12} xs={12}>
                <Skeleton variant="rounded" height={40} width={"60%"} />
              </Grid>
              {Array.from({ length: 5 }).map((data, index) => {
                return (
                  <Grid item md={6} xs={12}>
                    <Skeleton variant="rounded" height={40} />
                  </Grid>
                );
              })}
            </Grid>
            <Skeleton variant="rounded" height={330} width={"48.5%"} />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            position: { sm: "static", xs: "fixed" },
            bottom: 0,
            left: 0,
            width: { sm: "auto", xs: "100%" },
            pt: { sm: 0, xs: 2 },
            bgcolor: { sm: "white", xs: "#08061B" },
            pr:4,
            pb:2
          }}
        >
          <Skeleton variant="rounded" height={40} width={120} />
        </Box>
      </Box>
    </>
  );
};

export default LayoutMeasurementSkeleton;
