import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import "./style.scss";
import Imag1 from "../../Assets/CustomerLandingImages/2.png";
import Imag2 from "../../Assets/CustomerLandingImages/3.png";

const UpgradeOPtions = () => {
  return (
    <Container maxWidth="lg" sx={{ pb: 8,pt:8 }}>
      <Typography className="optionHeading" sx={{ width: "60%" }}>
        We’ve got glass upgrade options.
      </Typography>
      <Grid container spacing={3} sx={{ px: "92px !important" }}>
        <Grid item xs={4}>
          <img src={Imag1} alt="not" style={{}} />
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
            <Typography className="optionHead">
              GCS ARMOR THE ULTIMATE GLASS PROTECTION SOLUTION{" "}
            </Typography>
            <Typography className="optionSubHead" sx={{ pr: 3 }}>
              Glass is naturally porous, allowing water and contaminants to seep
              in, but GCS Armor's hydrophobic nano coating fills and seals these
              pores, leaving surfaces smooth and protected. Backed by a 10-year
              warranty, it ensures long-lasting durability.
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
              Ask about our GCS Armor Bath Kit for easy maintenance, and
              experience the next level of glass protection today. Contact us to
              get started!
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6.5} sx={{ display: "flex", justifyContent: "center" }}>
          <img src={Imag2} alt="not" style={{}} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default UpgradeOPtions;
