import { Box, Button, Grid, Typography } from "@mui/material";
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

const LandingPageComponent = () => {
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
          <Button
            // size="medium"
            sx={{
              bgcolor: "#8477DA",
              color: "white",
              textTransform: "capitalize",
              width: "190px",
              height: "50px",
              ":hover": {
                bgcolor: "#8477DA",
              },
            }}
          >
            Client Login
          </Button>
        </Box>
        {/* Section Header */}
        <Box
          sx={{
            width: "84%",
            m: "auto",
            backgroundImage: `url(${bg_Header})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            pl: 12,
            pt: 16,
            pb: 12,
            mt: 3,
            borderRadius: "77px",
            display: "flex",
            gap: 10,
            position: "relative",
          }}
        >
          {/* left side */}
          <Box width={580}>
            <Typography
              sx={{
                fontSize: "84px",
                fontWeight: 500,
                color: "white",
                lineHeight: "101px",
              }}
            >
              Supercharge your glass business
            </Typography>
            <Typography
              sx={{
                fontSize: "18px",
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
          <Box sx={{ position: "absolute", right: 200 }}>
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
            pt: 24,
          }}
        >
          What will this do for you?
        </Typography>
        {/* bg of scetion 2 and 3 */}
        <Box sx={{ backgroundImage: `url(${Rectangle_section})` }}>
          {/* servisis of section 2 */}
          <Box sx={{ width: "90%", m: "auto", pb: 10, pt: 5 }}>
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
              PriceUp enables your entire team to price our showers and <br />{" "}
              custom glass jobs faster than any other method.
            </Typography>
            <Box
              sx={{
                backgroundImage: `url(${bg_Header})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                p: 12,
                mt: 8,
                borderRadius: "77px",
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

        <Box sx={{ bgcolor: "#1E1B2F", pt: 10 }}>
          <Box
            sx={{
              width: "90%",
              m: "auto",
              display: "flex",
              flexGrow: "inherit",
              gap: 15,
            }}
          >
            <Box sx={{ width: "377px" }}>
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
          </Box>

          <Box sx={{ py: 2, pt: 4 }}>
            <Typography
              sx={{ fontSize: "22px", color: "#D6D6D6", textAlign: "center" }}
            >
              Created by elix.marketing
            </Typography>
            <Typography
              sx={{ fontSize: "22px", color: "#D6D6D6", textAlign: "center" }}
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
