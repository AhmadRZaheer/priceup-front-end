import './style.scss';

import React from 'react';

import { backendURL } from '@/utilities/common';
import {
  Box,
  Container,
  Grid,
  Typography,
} from '@mui/material';

import Imag1 from '../../Assets/CustomerLandingImages/2.png';
import Imag2 from '../../Assets/CustomerLandingImages/3.png';

const UpgradeOPtions = ({ data }) => {
  const primaryColor = data?.content?.colorSection?.primary;
  return (
    <Container maxWidth="lg" sx={{ pb: 8, pt: 8 }}>
      <Typography className="optionHeading" sx={{ width: "60%" }}>
        We’ve got glass upgrade options.
      </Typography>
      <Grid container spacing={3} sx={{ px: "92px !important" }}>
        <Grid item xs={4}>
          <img
            src={
              data?.content?.section8?.image1
                ? `${backendURL}/${data?.content?.section8?.image1}`
                : Imag1
            }
            alt="not"
            style={{ width: "100%", height: "401px" }}
          />
        </Grid>
        <Grid item xs={7.5} sx={{ display: "flex" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 5,
            }}
          >
            <Typography className="optionHead" sx={{ color: primaryColor }}>
              {data?.content?.section8?.product?.title ??
                "GCS ARMOR THE ULTIMATE GLASS PROTECTION SOLUTION"}{" "}
            </Typography>
            <Typography className="optionSubHead" sx={{ pr: 3 }}>
              {data?.content?.section8.product?.description1 ??
                "Glass is naturally porous, allowing water and contaminants to seep in, but GCS Armor's hydrophobic nano coating fills and seals these pores, leaving surfaces smooth and protected. Backed by a 10-year warranty, it ensures long-lasting durability."}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ px: "92px !important" }}>
        <Grid item xs={5} sx={{ display: "flex" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography className="optionSubHead" sx={{ pr: 3 }}>
              {data?.content?.section8.product?.description2 ??
                "Ask about our GCS Armor Bath Kit for easy maintenance, and experience the next level of glass protection today. Contact us to get started!"}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6.5} sx={{ display: "flex", justifyContent: "center" }}>
          <img
            src={
              data?.content?.section8?.image2
                ? `${backendURL}/${data?.content?.section8?.image2}`
                : Imag2
            }
            alt="not"
            style={{ height: "372px" }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default UpgradeOPtions;
