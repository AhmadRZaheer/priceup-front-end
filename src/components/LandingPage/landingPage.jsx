import { Box, Button, Grid, Typography, useMediaQuery } from "@mui/material";
import LogoNavBar from "../../Assets/purplelogo.svg";
import bg_Header from "../../Assets/bg-Header.png";
import right_headerimage from "../../Assets/header-right-image.svg";
import Time_logo from "../../Assets/Time_atack.svg";
import happy_logo from "../../Assets/happy.svg";
import bosostarrow_logo from "../../Assets/Line_up.svg";
import Rectangle_section from "../../Assets/Rectangle-section-1&2.png";
import { Check } from "@mui/icons-material";
import facebool_logo from "../../Assets/Vector.svg";
import twitter_logo from "../../Assets/formkit_twitter.svg";
import linkedin_logo from "../../Assets/entypo-social_linkedin-with-circle.svg";
import youtube_logo from "../../Assets/entypo-social_youtube-with-circle.svg";
import { Link } from "react-router-dom";

const LandingPageComponent = () => {
  const mobile = useMediaQuery("(max-width: 900px)");
  return (
    <>
      <Box sx={{ bgcolor: "#100D24", width: "100%" }}>
        {/* Navigation Bar */}
        <Box
          sx={{
            width: "90%",
            m: "auto",
            display: "flex",
            justifyContent: "space-between",
            py: 1,
          }}
        >
          <Box>
            <img src={LogoNavBar} alt="logo nav bar" />
          </Box>
          <Link to="/login">
            <Button
              // size="medium"
              sx={{
                bgcolor: "#8477DA",
                color: "white",
                textTransform: "capitalize",
                width: { md: "190px", xs: "120px" },
                height: { md: "50px", xs: "40px" },
                ":hover": {
                  bgcolor: "#8477DA",
                },
              }}
            >
              Client Login
            </Button>
          </Link>
        </Box>
        {/* Section Header */}
        <Box
          sx={{
            width: { md: "84%", xs: "90%" },
            m: "auto",
            backgroundImage: { md: `url(${bg_Header})`, xs: "none" },
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            pl: { md: 12, xs: 0 },
            pt: { md: 16, xs: 0 },
            pb: { md: 12, xs: 2 },
            mt: 3,
            borderRadius: { md: "77px", xs: "40px" },
            display: "flex",
            flexDirection: { md: "row", xs: "column" },
            gap: 10,
            position: "relative",
          }}
        >
          {/* left side */}
          <Box sx={{ width: { lg: 580, md: 500 } }}>
            <Typography
              sx={{
                fontSize: { lg: "84px", md: "70px", xs: "54px" },
                fontWeight: 500,
                color: "white",
                lineHeight: { md: "101px", xs: "70px" },
              }}
            >
              Supercharge your glass business
            </Typography>
            <Typography
              sx={{
                fontSize: { lg: "18px", md: "16px", xs: "14px" },
                fontWeight: "light",
                color: "white",
                pr: 4,
                mt: 2,
              }}
            >
              We make it easy to estimate, invoice, and organize glass customers
              and their projects all from your phone.
            </Typography>
            <Button
              sx={{
                bgcolor: "#8477DA",
                color: "white",
                textTransform: "capitalize",
                width: "190px",
                height: "50px",
                mt: 4,
                ":hover": {
                  bgcolor: "#8477DA",
                },
              }}
            >
              Request Access
            </Button>
          </Box>
          {/* right side */}
          <Box
            sx={{
              position: { md: "absolute", xs: "static" },
              right: { lg: 200, md: 60 },
              textAlign: { md: "end", xs: "center" },
              width: "100%",
              // ml: { md: 0, xs: -2.5 },
            }}
          >
            <img src={right_headerimage} alt="" />
          </Box>
        </Box>
        {/* section what we do  */}
        <Typography
          sx={{
            fontSize: "48px",
            fontWeight: 500,
            lineHeight: "58px",
            color: "white",
            textAlign: "center",
            pt: { md: 24, xs: 10 },
          }}
        >
          What will this do for you?
        </Typography>
        {/* bg of scetion 2 and 3 */}
        <Box
          sx={{
            backgroundImage: { md: `url(${Rectangle_section})`, xs: "none" },
          }}
        >
          {/* servisis of section 2 */}
          <Box sx={{ width: "90%", m: "auto", pb: 10, pt: { md: 5, xs: 8 } }}>
            <Grid container gap={3} justifyContent={"center"}>
              <Box
                sx={{
                  border: "1px  solid rgba(64, 63, 63)",
                  borderRadius: "16px",
                  p: 2,
                  backgroundImage:
                    "linear-gradient(to right, #100D24 15%, #8477DA 400%)",
                  width: "350px",
                  height: "267px",
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <img src={Time_logo} alt="time logo" />
                </Box>
                <Typography sx={{ fontSize: "20px", mt: 1, color: "white" }}>
                  Save more time
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "light",
                    color: "white",
                    mt: 1,
                  }}
                >
                  Users choose the activity/subject of their interest and the
                  location where they want to meet with the service provider.
                </Typography>
              </Box>

              <Box
                sx={{
                  border: "1px  solid rgba(64, 63, 63)",
                  borderRadius: "16px",
                  p: 2,
                  backgroundImage:
                    "linear-gradient(to right, #100D24 15%, #8477DA 400%)",
                  width: "350px",
                  height: "267px",
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "center", p: 1.4 }}>
                  <img src={happy_logo} alt="time logo" />
                </Box>
                <Typography sx={{ fontSize: "20px", mt: 1, color: "white" }}>
                  Improve customer service
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "light",
                    color: "white",
                    mt: 1,
                  }}
                >
                  Users choose the activity/subject of their interest and the
                  location where they want to meet with the service provider.
                </Typography>
              </Box>

              <Box
                sx={{
                  border: "1px  solid rgba(64, 63, 63)",
                  borderRadius: "16px",
                  p: 2,
                  backgroundImage:
                    "linear-gradient(to right, #100D24 15%, #8477DA 400%)",
                  width: "350px",
                  height: "267px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    p: 3,
                    pt: 5,
                  }}
                >
                  <img src={bosostarrow_logo} alt="time logo" />
                </Box>
                <Typography sx={{ fontSize: "20px", mt: 1, color: "white" }}>
                  Boost Sales
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "light",
                    color: "white",
                    mt: 1,
                  }}
                >
                  Users choose the activity/subject of their interest and the
                  location where they want to meet with the service provider.
                </Typography>
              </Box>
            </Grid>
          </Box>

          {/* section Powerful features */}
          <Box sx={{ width: "90%", m: "auto", mt: 12, pb: 15 }}>
            <Typography
              sx={{
                fontSize: "48px",
                fontWeight: 500,
                color: "white",
                textAlign: "center",
              }}
            >
              Powerful features for your entire team
            </Typography>
            <Typography
              sx={{
                fontSize: "22px",
                fontWeight: 400,
                textAlign: "center",
                mt: 1,
                color: "#D6D6D6",
              }}
            >
              PriceUp enables your entire team to price our showers and
              {mobile ? "" : <br />} custom glass jobs faster than any other
              method.
            </Typography>
            <Box
              sx={{
                backgroundImage: `url(${bg_Header})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                p: { md: 12, xs: 5 },
                mt: 8,
                borderRadius: { md: "77px", xs: "60px" },
              }}
            >
              <Grid container gap={2} justifyContent={"center"}>
                <Box
                  sx={{
                    bgcolor: "rgba(142, 134, 199, 0.5)",
                    px: 2,
                    height: "60px",
                    borderRadius: "16px",
                    display: "flex",
                    alignItems: "center",
                    width: "300px",
                    gap: 3,
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                  }}
                >
                  <Check sx={{ color: "#9186D6", fontSize: 36 }} />
                  <Typography sx={{ color: "white", fontSize: "20px" }}>
                    Multiple Layouts
                  </Typography>
                </Box>

                <Box
                  sx={{
                    bgcolor: "rgba(142, 134, 199, 0.5)",
                    px: 2,
                    height: "60px",
                    borderRadius: "16px",
                    display: "flex",
                    alignItems: "center",
                    width: "300px",
                    gap: 3,
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                  }}
                >
                  <Check sx={{ color: "#9186D6", fontSize: 36 }} />
                  <Typography sx={{ color: "white", fontSize: "20px" }}>
                    Fast Estimates
                  </Typography>
                </Box>

                <Box
                  sx={{
                    bgcolor: "rgba(142, 134, 199, 0.5)",
                    px: 2,
                    height: "60px",
                    borderRadius: "16px",
                    display: "flex",
                    alignItems: "center",
                    width: "300px",
                    gap: 3,
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                  }}
                >
                  <Check sx={{ color: "#9186D6", fontSize: 36 }} />
                  <Typography sx={{ color: "white", fontSize: "20px" }}>
                    Messaging
                  </Typography>
                </Box>

                <Box
                  sx={{
                    bgcolor: "rgba(142, 134, 199, 0.5)",
                    px: 2,
                    height: "60px",
                    borderRadius: "16px",
                    display: "flex",
                    alignItems: "center",
                    width: "300px",
                    gap: 3,
                    mt: 2,
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                  }}
                >
                  <Check sx={{ color: "#9186D6", fontSize: 36 }} />
                  <Typography sx={{ color: "white", fontSize: "20px" }}>
                    Invoicing
                  </Typography>
                </Box>
                <Box
                  sx={{
                    bgcolor: "rgba(142, 134, 199, 0.5)",
                    px: 2,
                    height: "60px",
                    borderRadius: "16px",
                    display: "flex",
                    alignItems: "center",
                    width: "300px",
                    gap: 3,
                    mt: 2,
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                  }}
                >
                  <Check sx={{ color: "#9186D6", fontSize: 36 }} />
                  <Typography sx={{ color: "white", fontSize: "20px" }}>
                    Schedule & Dispatch
                  </Typography>
                </Box>
              </Grid>
            </Box>

            <Typography
              sx={{
                fontSize: "28px",
                mt: 10,
                textAlign: "center",
                color: "white",
              }}
            >
              Start your 14 day trial today with no commitments
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <Button
                // size="medium"
                sx={{
                  bgcolor: "#8477DA",
                  color: "white",
                  textTransform: "capitalize",
                  width: "190px",
                  height: "50px",
                  fontWeight: "bold",
                  ":hover": {
                    bgcolor: "#8477DA",
                  },
                }}
              >
                Get Started for free
              </Button>
            </Box>
          </Box>
        </Box>
        {/* footer */}

        <Box sx={{ bgcolor: "#1E1B2F", pt: 10, mt: { lg: 0, md: -10 } }}>
          <Grid
            container
            sx={{
              width: "90%",
              m: "auto",
              gap: { lg: 18, md: 15, sm: 10, xs: 8 },
            }}
          >
            <Box sx={{ width: { md: "377px", xs: "300px" } }}>
              <img src={LogoNavBar} alt="logo nav bar" />
              <Typography
                sx={{
                  fontSize: "22px",
                  fontWeight: 400,
                  lineHeight: "26px",
                  color: "#D6D6D6",
                  mt: 3,
                }}
              >
                We make it easy to schedule, dispatch, estimate, invoice, accept
                credit cards and get booked online by customers.
              </Typography>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mt: 3 }}
              >
                <img src={facebool_logo} alt="image of facebook" />
                <img src={twitter_logo} alt="image of twitter" />
                <img src={linkedin_logo} alt="image of linkedin" />
                <img src={youtube_logo} alt="image of youtube" />
              </Box>
            </Box>

            <Box>
              <Typography
                sx={{ fontSize: "22px", fontWeight: 500, color: "#D6D6D6" }}
              >
                Product
              </Typography>
              <Typography sx={{ mt: 4, fontSize: "22px", color: "#D6D6D6" }}>
                Features
              </Typography>
              <Typography sx={{ fontSize: "22px", color: "#D6D6D6" }}>
                Pricing
              </Typography>
              <Typography sx={{ fontSize: "22px", color: "#D6D6D6" }}>
                Reviews
              </Typography>
              <Typography sx={{ fontSize: "22px", color: "#D6D6D6" }}>
                Tours
              </Typography>
            </Box>

            <Box>
              <Typography
                sx={{ fontSize: "22px", fontWeight: 500, color: "#D6D6D6" }}
              >
                Industries
              </Typography>
              <Typography sx={{ mt: 4, fontSize: "22px", color: "#D6D6D6" }}>
                Glass
              </Typography>
              <Typography sx={{ fontSize: "22px", color: "#D6D6D6" }}>
                Steel
              </Typography>
            </Box>

            <Box>
              <Typography
                sx={{ fontSize: "22px", fontWeight: 500, color: "#D6D6D6" }}
              >
                Resources
              </Typography>
              <Typography sx={{ mt: 4, fontSize: "22px", color: "#D6D6D6" }}>
                Help & Support
              </Typography>
              <Typography sx={{ fontSize: "22px", color: "#D6D6D6" }}>
                Terms of use
              </Typography>
              <Typography sx={{ fontSize: "22px", color: "#D6D6D6" }}>
                Privacy policy
              </Typography>
              <Typography sx={{ fontSize: "22px", color: "#D6D6D6" }}>
                Login
              </Typography>
            </Box>
          </Grid>

          <Box sx={{ width: "90%", pt: 4, m: "auto" }}>
            <Typography
              sx={{
                fontSize: { md: "22px", xs: "18px" },
                color: "#D6D6D6",
                textAlign: "center",
              }}
            >
              Created by elix.marketing
            </Typography>
            <Typography
              sx={{
                fontSize: { md: "22px", xs: "18px" },
                color: "#D6D6D6",
                textAlign: "center",
              }}
            >
              © Glass Experts, Inc. Copyright 2023
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default LandingPageComponent;
