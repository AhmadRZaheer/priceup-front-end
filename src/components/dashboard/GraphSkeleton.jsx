import { Box, Skeleton, Stack, Typography } from "@mui/material";
import React from "react";

const GraphSkeleton = ({name}) => {
  return (    
      <Box
        sx={{
          background: "white",
          width: "49%",
          p: 1.3,
        }}
      >
        <Stack direction='row' justifyContent='space-between'>

        <Typography
          sx={{
            fontFamily: "Helvetica, Arial, sans-serif !important",
            fontSize: "14px",
            fontWeight: `${800} !important`,
          }}
        >
          {name}
        </Typography>
        <Skeleton variant="rounded" height={30} width={30} />
        </Stack>
       
        <Box sx={{ my: 1.5 }}>
          <Skeleton variant="rounded" height={403} width={"100%"} />
        </Box>
      </Box>
  );
};

export default GraphSkeleton;