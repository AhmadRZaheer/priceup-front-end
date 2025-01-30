import './style.scss';

import React, { useMemo } from 'react';

import { hexToRgba } from '@/utilities/common';
import {
  Box,
  Container,
  Typography,
} from '@mui/material';

const claimDefaultData = [
  {
    title: "Phoenix, AZ",
    desc: "20634 N. 28th Street, Ste. 150 (602) 828-8276 | phoenix@gcs.glass",
  },
  {
    title: "Austin, TXn",
    desc: "10509 Circle Drive, Unit 1440 (512) 480-9585 | austin@gcs.glass",
  },
  {
    title: "Denver, CO",
    desc: "10500 E. 54th Ave, Unit H (720) 601-1124 | denver@gcs.glass",
  },
  {
    title: "Long Island, NY",
    desc: "1347 Lincoln Avenue, Unit 7 (516) 400-2514 | longisland@gcs.glass",
  },
  {
    title: "Santa Cruz, CA",
    desc: "1970 17th Avenue (831) 353-6486 | santacruz@gcs.glass",
  },
];

const ClaimSection = ({ data }) => {
  const primaryColor = data?.content?.colorSection?.primary;
  const claimData = useMemo(() => {
    const Faqs = data?.content?.section6?.claimData ?? claimDefaultData;
    return Faqs;
  }, [data]);
  return (
    <Container maxWidth="lg" sx={{ pt: {sm:5,xs:2} }}>
      <Box
        sx={{
          background: hexToRgba(primaryColor, 0.04),
          pt: {sm:5.5,xs:2},
          pb: {sm:4,xs:2},
          px: {sm:"32px !important",xs:"16px !important"},
          borderRadius: "10px",
        }}
      >
        <Typography className="claimHead">
          {data?.content?.section6?.heading ?? "How to File a Claim"}{" "}
        </Typography>
        <Typography className="claimSubHead" sx={{ py: {sm:3.5,xs:1}, width: {sm:"90%",xs:'100%'}}}>
          {data?.content?.section6?.subHeading ??
            "Submitting a warranty claim is easy! Simply contact your local GCS Glass & Mirror location to begin the process:"}
        </Typography>
        <Box
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: {sm:5,xs:1},
            pt: {sm:2,xs:0.5},
          }}
        >
          {claimData?.map((data, index) => (
            <Box sx={{ width: "100%" }} key={index}>
              <Typography className="claimText">
                <Box
                  component="span"
                  className="spanColorText"
                  sx={{ color: primaryColor }}
                >
                  {data?.title}:
                </Box>{" "}
                {data?.desc}
              </Typography>
            </Box>
          ))}
        </Box>
        <Typography
          sx={{
            fontFamily: '"Poppins" !important',
            fontSize: {sm:"24px",xs:'16px'},
            fontWeight: 400,
            lineHeight: {sm:"24px",xs:'16px'},
            pt: {pt:4,xs:2},
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
          fontSize: {sm:"24.9px",xs:'14px'},
          fontStyle: "italic",
          lineHeight: {sm:"29px",xs:'16px'},
          textAlign: "center",
          color: "rgba(0, 0, 0, 0.6)",
          px: {sm:12,xs:1},
          pt: {sm:5,xs:2},
          pb: {sm:8,xs:4},
        }}
      >
        {data?.content?.section6?.bottomText ??
          "At GCS Glass & Mirror, we value your trust and strive to provide only the highest-quality products and services. Thank you for choosing us to transform your spaces!"}
      </Typography>
    </Container>
  );
};

export default ClaimSection;
