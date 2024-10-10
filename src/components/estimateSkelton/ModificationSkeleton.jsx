import { Box, Divider, Skeleton, Typography } from "@mui/material";
import React from "react";

const ModificationSkeleton = () => {
  return (
    <>
      <Box
        sx={{
          width: { xs: "100%", sm: "96%" },
          ml: { sm: "auto", xs: 0 },
          mr: { sm: "1px", xs: 0 },
          display: "flex",
          alignItems: "center",
          height: { xs: "100vh", sm: "auto" },
          flexDirection: "column",
          gap: { sm: 0, xs: 4 },
          backgroundColor: { xs: "#08061B", sm: "white" },
          borderRadius: { sm: "12px", xs: 0 },
        }}
      >
        <Box
          sx={{
            width: "100%",
            borderRadius: { sm: "12px", xs: 0 },
            border: { sm: "1px solid #EAECF0", xs: "none" },
            overflow: { sm: "hidden" },
            border: "1px solid rgba(208, 213, 221, 1)",
          }}
        >
          <Box
            sx={{
              background: "rgba(243, 245, 246, 1)",
              paddingY: 2,
              px: 3,
              display: { sm: "block", xs: "none" },
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 700,
                fontFamily: '"Roboto", sans-serif !important',
              }}
            >
              Modifications
            </Typography>
          </Box>
          <Divider sx={{ borderColor: "rgba(208, 213, 221, 1)" }} />
          <Box
            sx={{
              margin: "auto",

              paddingX: { sm: 2, xs: 0 },
              py: "0px !important",
              background: { sm: "white", xs: "#08061B" },
              display: "flex",
              flexDirection: "column",
              marginBottom: { sm: 4.6, xs: 10 },
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: { sm: "auto", xs: "94%" },
                paddingBottom: { sm: 0, xs: 0 },
                maxHeight: 1400,
                borderRadius: "8px",
                justifyContent: "space-between",
                flexDirection: { sm: "row", xs: "column" },
                margin: { sm: 0, xs: "auto" },
                overflow: "auto",
              }}
            >
              <Box // Make sure to add a key when mapping over arrays in React
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                {Array.from({ length: 6 }).map((data, index) => {
                  return (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderBottom: {
                          sm: "2px solid #D0D5DD",
                          xs: "2px solid #423f57",
                        },
                        color: { sm: "black", xs: "white" },
                        py: "6px",
                      }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          paddingLeft: "0px !important",
                          paddingY: "10px !important",
                        }}
                      >
                        <Skeleton variant="rounded" height={30} />
                      </Box>
                    </Box>
                  );
                })}
                {Array.from({ length: 6 }).map((data, index) => {
                  return (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderBottom: {
                          sm: "2px solid #D0D5DD",
                          xs: "2px solid #423f57",
                        },
                        color: { sm: "#000000  ", xs: "white" },
                        py: 2,
                      }}
                    >
                      <Skeleton variant="rounded" height={30} width={120} />
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          width: "120px",
                          padddingY: 4,
                        }}
                      >
                        <Skeleton variant="rounded" height={30} width={190} />
                      </Box>
                    </Box>
                  );
                })}
                <Box sx={{ py: 2 }}>
                  <Skeleton variant="rounded" height={35} />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ModificationSkeleton;
