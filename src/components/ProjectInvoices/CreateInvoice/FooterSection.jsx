import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import LogoNavBar from "../../../Assets/purplelogo.svg";
import facebool_logo from "../../../Assets/Vector.svg";
import twitter_logo from "../../../Assets/formkit_twitter.svg";
import linkedin_logo from "../../../Assets/entypo-social_linkedin-with-circle.svg";
import youtube_logo from "../../../Assets/entypo-social_youtube-with-circle.svg";

const FooterSection = () => {
  return (
    <Box sx={{ backgroundColor: "#f5f9f9", pt: 4, pb: 8 }}>
      <Container maxWidth="xl">
        <Grid
          container
        spacing={3}
        >
          <Grid item xs={4} >
            <img src={LogoNavBar} alt="logo nav bar" />
            <Typography
              sx={{
                fontSize: "22px",
                fontWeight: 400,
                lineHeight: "26px",
                color: "#012332",
                mt: 3,
                pr:8
              }}
            >
              We make it easy to schedule, dispatch, estimate, invoice, accept
              credit cards and get booked online by customers.
            </Typography>           
          </Grid>

          <Grid item xs={1.5}>
            <Typography
              sx={{ fontSize: "22px", fontWeight: 500, color: "#012332" }}
            >
              Product
            </Typography>
            <Typography sx={{ mt: 4, fontSize: "22px", color: "#012332" }}>
              Features
            </Typography>
            <Typography sx={{ fontSize: "22px", color: "#012332" }}>
              Pricing
            </Typography>
            <Typography sx={{ fontSize: "22px", color: "#012332" }}>
              Reviews
            </Typography>
            <Typography sx={{ fontSize: "22px", color: "#012332" }}>
              Tours
            </Typography>
          </Grid>

          <Grid item xs={1.5}>
            <Typography
              sx={{ fontSize: "22px", fontWeight: 500, color: "#012332" }}
            >
              Industries
            </Typography>
            <Typography sx={{ mt: 4, fontSize: "22px", color: "#012332" }}>
              Glass
            </Typography>
            <Typography sx={{ fontSize: "22px", color: "#012332" }}>
              Steel
            </Typography>
          </Grid>

          <Grid item xs={1.9}>
            <Typography
              sx={{ fontSize: "22px", fontWeight: 500, color: "#012332" }}
            >
              Resources
            </Typography>
            <Typography sx={{ mt: 4, fontSize: "22px", color: "#012332" }}>
              Help & Support
            </Typography>
            <Typography sx={{ fontSize: "22px", color: "#012332" }}>
              Terms of use
            </Typography>
            <Typography sx={{ fontSize: "22px", color: "#012332" }}>
              Privacy policy
            </Typography>
            <Typography sx={{ fontSize: "22px", color: "#012332" }}>
              Login
            </Typography>
          </Grid>
          <Grid item xs={3.1} sx={{display: "flex", alignItems: "center", gap: 2, mt: 3 }}>
              <img src={facebool_logo} alt="image of facebook" />
              <img src={twitter_logo} alt="image of twitter" />
              <img src={linkedin_logo} alt="image of linkedin" />
              <img src={youtube_logo} alt="image of youtube" />
            </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default FooterSection;
