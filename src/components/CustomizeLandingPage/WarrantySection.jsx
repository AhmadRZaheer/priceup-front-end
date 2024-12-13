import { Box, Container, Grid, Typography } from '@mui/material'
import React from 'react'
import Warranty1 from "../../Assets/CustomerLandingImages/CustomerLanding04.jpg";
import Warranty2 from "../../Assets/CustomerLandingImages/CustomerLanding03.jpg";
import Warranty3 from "../../Assets/CustomerLandingImages/CustomerLanding02.jpg";
import './style.scss';

const WarrantySection = () => {
  return (
    <Container
    maxWidth="xl"
    sx={{
      pb: 4,
      minHeight: "60vh",
      mt: 25,
      display: "flex",
      justifyContent: "center",
    }}
  >
    <Box className="block-div wranty-section">
      <Box
        sx={{
          my: "80px",
          background: "rgba(255,255,255,.7)",
          backdropFilter: "blur(10px)",
          py: 5,
          px: 7.5,
          zIndex: 5,
        }}
        className="width-md block-div"
      >
        <Typography
          sx={{
            fontSize: "2.2rem",
            mb: "10px",
            mt: "5px",
            fontWeight: 600,
            lineHeight: 1.1,
            pr: 3.1,
          }}
          variant="h2"
        >
          Limited Lifetime Craftsmanship Warranty
        </Typography>
        <Typography component="p" sx={{ mb: 2, pr: 2 }}>
          GCS Glass warrants our products against defects in materials and
          workmanship under normal use for as long as it is owned by the
          original purchasing business or consumer. If a claim is deemed
          valid, the decision whether to repair or replace is determined by
          GCS Glass.
        </Typography>
      </Box>
      <Box className="wranty-image-box block-div">
        <Grid container spacing={6} sx={{ height: "100%" }}>
          <Grid item xs={4} className="warranty-image block-div">
            <img
              src={Warranty1}
              alt="not"
              className="single-wranty-image"
            />
          </Grid>
          <Grid
            item
            xs={4}
            className="warranty-image block-div"
            sx={{ transform: "translateY(-100px)" }}
          >
            <img
              src={Warranty2}
              alt="not"
              className="single-wranty-image"
            />
          </Grid>
          <Grid
            item
            xs={4}
            className="warranty-image block-div"
            sx={{ transform: "translateY(50px)" }}
          >
            <img
              src={Warranty3}
              alt="not"
              className="single-wranty-image"
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  </Container>
  )
}

export default WarrantySection
