import { Box, Container, Typography } from "@mui/material";
import React from "react";
import "./style.scss";

const ClaimSection = () => {
  return (
    <Container maxWidth="lg" sx={{pt:5}}>
      <Box
        sx={{
          background: "rgba(249, 85, 0, 0.04)",
          pt: 5.5,
          pb: 4,
          px: "32px !important",
          borderRadius: "10px",
        }}
      >
        <Typography className="claimHead">How to File a Claim</Typography>
        <Typography className="claimSubHead" sx={{ py: 3.5, width: "90%" }}>
          Submitting a warranty claim is easy! Simply contact your local GCS
          Glass & Mirror location to begin the process:
        </Typography>
        <Box sx={{ width: "100%", display: "flex", pt: 2, gap: 10 }}>
          <Box sx={{ width: "50%" }}>
            <Typography className="claimText">
              <Box component="span" className="spanColorText">
                Phoenix, AZ:
              </Box>{" "}
              20634 N. 28th Street, Ste. 150 (602) 828-8276 | phoenix@gcs.glass
            </Typography>
          </Box>
          <Box sx={{ width: "50%" }}>
            <Typography className="claimText">
              <Box component="span" className="spanColorText">
                Austin, TX:
              </Box>{" "}
              10509 Circle Drive, Unit 1440 (512) 480-9585 | austin@gcs.glass
            </Typography>
          </Box>
        </Box>
        <Box sx={{ width: "100%", display: "flex", pt: 5, gap: 10 }}>
          <Box sx={{ width: "50%" }}>
            <Typography className="claimText">
              <Box component="span" className="spanColorText">
                Denver, CO:
              </Box>{" "}
              10500 E. 54th Ave, Unit H (720) 601-1124 | denver@gcs.glass
            </Typography>
          </Box>
          <Box sx={{ width: "50%" }}>
            <Typography className="claimText">
              <Box component="span" className="spanColorText">
                Long Island, NY:
              </Box>
              1347 Lincoln Avenue, Unit 7 (516) 400-2514 | longisland@gcs.glass
            </Typography>
          </Box>
        </Box>
        <Box sx={{ width: "100%", display: "flex", pt: 5, gap: 10 }}>
          <Box sx={{ width: "50%" }}></Box>
          <Box sx={{ width: "50%" }}>
            <Typography className="claimText">
              <Box component="span" className="spanColorText">
                Santa Cruz, CA:
              </Box>
              1970 17th Avenue (831) 353-6486 | santacruz@gcs.glass
            </Typography>
          </Box>
        </Box>
        <Typography
          sx={{
            fontFamily: '"Poppins" !important',
            fontSize: "24px",
            fontWeight: 400,
            lineHeight: "24px",
            pt: 4,
          }}
        >
          <Box component="span" sx={{ fontWeight: `${700} !important` }}>
            Business Hours:
          </Box>{" "}
          Hours vary by location. Please contact your nearest office for
          details.
        </Typography>
      </Box>
      <Typography
        sx={{
          fontFamily: '"Poppins" !important',
          fontSize: "24.9px",
          fontStyle: "italic",
          lineHeight: "29px",
          textAlign: "center",
          color: "rgba(0, 0, 0, 0.6)",
          px: 12,
          pt: 5,
          pb:8
        }}
      >
        At GCS Glass & Mirror, we value your trust and strive to provide only
        the highest-quality products and services. Thank you for choosing us to
        transform your spaces!
      </Typography>
    </Container>
  );
};

export default ClaimSection;
