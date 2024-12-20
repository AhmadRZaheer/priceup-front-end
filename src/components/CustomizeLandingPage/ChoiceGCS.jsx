import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import "./style.scss";
import bgHeaderImage from "../../Assets/CustomerLandingImages/WhyChoice.svg";
import Diamond from "../../Assets/CustomerLandingImages/Diamond-Icon.png";
import EyeIcon from "../../Assets/CustomerLandingImages/Eye-Icon.png";
import PersonHeart from "../../Assets/CustomerLandingImages/Person-with-Heart-Icon.png";
import StopWatch from "../../Assets/CustomerLandingImages/Stopwatch-Icon.png";

const ChoiceGCS = () => {
  return (
    <>
      <Container maxWidth="lg" sx={{ pb: 2.5, pt: 3.5 }}>
        <Typography className="choiceHead">Why Choose GCS?</Typography>
        <Typography className="choiceSubHead">
          The Highest Quality Residential Glass Services
        </Typography>
        <Typography className="choiceDesc">
          Founded in 2013 in Phoenix Arizona, GCS has had a tremendous amount of
          success due to our “can do it” attitude along with our innovative
          approach to every aspect of the business.
        </Typography>
      </Container>
      <Box
        sx={{
          // width: { md: "89%", xs: "90%" },
          // m: "auto",
          backgroundImage: { md: `url(${bgHeaderImage})`, xs: "none" },
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          // px: { md: 12, xs: 0 },
          //   pt: { md: 10, xs: 0 },
          pb: { md: 5, xs: 2 },
          mt: 2,
          display: "flex",
          flexDirection: { md: "row", xs: "column" },
          //   gap: 10,
          position: "relative",
          // justifyContent: "space-around",
          height: "555px",
        }}
      >
        <Container maxWidth="lg" sx={{ alignItems: "end", display: "flex" }}>
          <Box className="width-lg" sx={{}}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                gap: 3,
              }}
            >
              <Box
                sx={{
                  width: "25%",
                  background: "rgba(237,237,237,1)",
                  p: "20px",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={Diamond}
                    alt="not"
                    style={{ height: "64px", width: "64px", padding: "10px" }}
                  />
                </Box>
                <Typography
                  variant="h3"
                  sx={{
                    fontFamily: '"Poppins" !important',
                    fontSize: "20px",
                    py: 0.5,
                    fontWeight: 600,
                    lineHeight: "30px",
                  }}
                >
                  Lasting Impressions
                </Typography>
                <Typography
                  sx={{
                    fontFamily: '"Poppins" !important',
                    fontSize: "20px",
                    lineHeight: "30px",
                  }}
                >
                  Replacing just the glass in your shower will give your
                  bathroom a million-dollar look.
                </Typography>
              </Box>

              <Box
                sx={{
                  width: "25%",
                  background: "rgba(237,237,237,1)",
                  p: "20px",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={PersonHeart}
                    alt="not"
                    style={{ height: "64px", width: "64px", padding: "10px" }}
                  />
                </Box>

                <Typography
                  variant="h3"
                  sx={{
                    fontSize: "20px",
                    py: 0.5,
                    fontWeight: 600,
                    lineHeight: "30px",
                    fontFamily: '"Poppins" !important',
                  }}
                >
                  Customer Care
                </Typography>
                <Typography
                  sx={{
                    fontSize: "20px",
                    lineHeight: "30px",
                    fontFamily: '"Poppins" !important',
                  }}
                >
                  When you work with us, it’s an experience you will love from
                  the initial contact to the final install.
                </Typography>
              </Box>

              <Box
                sx={{
                  width: "25%",
                  background: "rgba(237,237,237,1)",
                  p: "20px",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={StopWatch}
                    alt="not"
                    style={{ height: "64px", width: "64px", padding: "10px" }}
                  />
                </Box>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: "20px",
                    py: 0.5,
                    fontWeight: 600,
                    lineHeight: "30px",
                    fontFamily: '"Poppins" !important',
                  }}
                >
                  Fast Response
                </Typography>
                <Typography
                  sx={{
                    fontSize: "20px",
                    lineHeight: "30px",
                    fontFamily: '"Poppins" !important',
                  }}
                >
                  Schedule today and let us help you design and install your
                  next project.
                </Typography>
              </Box>

              <Box
                sx={{
                  width: "25%",
                  background: "rgba(237,237,237,1)",
                  p: "20px",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={EyeIcon}
                    alt="not"
                    style={{ height: "64px", width: "64px", padding: "10px" }}
                  />
                </Box>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: "20px",
                    py: 0.5,
                    fontWeight: 600,
                    lineHeight: "30px",
                    fontFamily: '"Poppins" !important',
                  }}
                >
                  High Clarity
                </Typography>
                <Typography
                  sx={{
                    fontSize: "20px",
                    lineHeight: "30px",
                    fontFamily: '"Poppins" !important',
                  }}
                >
                  Don’t forget to ask about our starphire ultra-clear glass. It
                  will change your life.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ChoiceGCS;