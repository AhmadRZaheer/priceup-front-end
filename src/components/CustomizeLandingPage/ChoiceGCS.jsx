import { Box, Container, Typography } from "@mui/material";
import React from "react";
import "./style.scss";
import bgHeaderImage from "../../Assets/CustomerLandingImages/WhyChoice.svg";
import Diamond from "../../Assets/CustomerLandingImages/Diamond-Icon.png";
import EyeIcon from "../../Assets/CustomerLandingImages/Eye-Icon.png";
import PersonHeart from "../../Assets/CustomerLandingImages/Person-with-Heart-Icon.png";
import StopWatch from "../../Assets/CustomerLandingImages/Stopwatch-Icon.png";
import { backendURL } from "@/utilities/common";

const ChoiceGCS = ({ data }) => {
  const primaryColor = data?.content?.colorSection?.primary;
  return (
    <>
      <Container maxWidth="lg" sx={{ pb: 2.5, pt: 3.5 }}>
        <Typography className="choiceHead" sx={{ color: primaryColor }}>
          {data?.content?.section3?.heading ?? "Why Choose GCS?"}
        </Typography>
        <Typography className="choiceSubHead">
          {data?.content?.section3?.subheading ??
            "The Highest Quality Residential Glass Services"}
        </Typography>
        <Typography className="choiceDesc">
          {data?.content?.section3?.description ??
            "Founded in 2013 in Phoenix Arizona, GCS has had a tremendous amount of success due to our “can do it” attitude along with our innovative approach to every aspect of the business."}
        </Typography>
      </Container>
      <Box
        sx={{
          backgroundImage: {
            md: `url(${
              data?.content?.section3?.bgimage
                ? `${backendURL}/${data?.content?.section3?.bgimage}`
                : bgHeaderImage
            })`,
            xs: "none",
          },
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          pb: { md: 5, xs: 2 },
          mt: 2,
          display: "flex",
          flexDirection: { md: "row", xs: "column" },
          position: "relative",
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
                  backdropFilter: " blur(5.599999904632568px)",
                  boxShadow: "0px 4px 2.1px 0px rgba(0, 0, 0, 0.12)",
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
                  {data?.content?.section3?.card1?.text1 ??
                    "Lasting Impressions"}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: '"Poppins" !important',
                    fontSize: "20px",
                    lineHeight: "30px",
                  }}
                >
                  {data?.content?.section3?.card1?.text2 ??
                    "Replacing just the glass in your shower will give your bathroom a million-dollar look."}
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
                  {data?.content?.section3?.card2?.text1 ?? "Customer Care"}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "20px",
                    lineHeight: "30px",
                    fontFamily: '"Poppins" !important',
                  }}
                >
                  {data?.content?.section3?.card2?.text2 ??
                    "When you work with us, it’s an experience you will love from the initial contact to the final install."}
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
                  {data?.content?.section3?.card3?.text1 ?? "Fast Response"}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "20px",
                    lineHeight: "30px",
                    fontFamily: '"Poppins" !important',
                  }}
                >
                  {data?.content?.section3?.card3?.text2 ??
                    "Schedule today and let us help you design and install your next project."}
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
                  {data?.content?.section3?.card4?.text1 ?? "High Clarity"}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "20px",
                    lineHeight: "30px",
                    fontFamily: '"Poppins" !important',
                  }}
                >
                  {data?.content?.section3?.card4?.text2 ??
                    "Don’t forget to ask about our starphire ultra-clear glass. It will change your life."}
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
