import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import LogoNavBar from "../../Assets/purplelogo.svg";
import Img from "../../Assets/example.jpg";
import right_headerimage from "../../Assets/header-right-image.svg";
import bg_Header from "../../Assets/bg-Header.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { PDFViewer } from "@react-pdf/renderer";
import PDFFile from "../PDFFile";

const CustomizeLandingPage = () => {
  return (
    <>
      <Box sx={{ bgcolor: "black", width: "100%" }}>
        {/* <Box
          sx={{
            width: "90%",
            m: "auto",
            display: "flex",
            justifyContent: "center",
            py: 1,
          }}
        >
          <Box>
            <img src={LogoNavBar} alt="logo nav bar" />
          </Box>
        </Box> */}
        {/* Navigation Bar */}
        <Box
          sx={{
            width: "90%",
            m: "auto",
            display: "flex",
            justifyContent: "center",
            py: 1,
          }}
        >
          <Box>
            <img src={LogoNavBar} alt="logo nav bar" />
          </Box>
          {/* <Link to="/login">
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
          </Link> */}
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
          </Box>
          {/* right side */}
          <Box
            sx={{
              position: { md: "absolute", xs: "static" },
              right: { lg: 200, md: 60 },
              top: 0,
              textAlign: { md: "end", xs: "center" },
              width: "100%",
            }}
          >
            <img src={right_headerimage} alt="" height="560" />
          </Box>
        </Box>
      </Box>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{ p: 5 }}>
            <Typography
              sx={{
                fontSize: "40px",
                fontWeight: 500,
                lineHeight: "54px",
              }}
            >
              The Highest Quality Residential Glass Services
            </Typography>
            <Typography
              sx={{
                fontSize: { lg: "18px", md: "16px", xs: "14px" },
                fontWeight: "light",
                pr: 4,
                mt: 2,
              }}
            >
              We make it easy to estimate, invoice, and organize glass customers
              and their projects all from your phone.
            </Typography>
          </Box>
        </Box>
        <Box sx={{ pb: 5, px: 4 }}>
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={10}
            slidesPerView={1} // Adjust slides per view according to your needs
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
            style={{
              "--swiper-navigation-color": "#000",
              "--swiper-navigation-size": "35px",
              // '.swiper-button-prev' : { background :'red'}
            }}
          >
            {Array.from({ length: 5 }).map((data) => (
              <SwiperSlide>
                <Card sx={{}}>
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    height="320"
                    image={Img}
                  />
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
        <Box sx={{ px: 4 }}>
          <Box sx={{ p: 5 }}>
            <Typography
              sx={{
                fontSize: "40px",
                fontWeight: 500,
                lineHeight: "54px",
                textAlign:'center'
              }}
            >
              Estimates Quotes
            </Typography>
          </Box>
          <PDFViewer width={"100%"} height="1200px">
            <PDFFile  data={{}} key={"pdfFile"} />
          </PDFViewer>
        </Box>
      </Container>
      <Box sx={{ bgcolor: "#000000", width: "100%" }}>
        <Box
          sx={{
            width: "90%",
            m: "auto",
            display: "flex",
            justifyContent: "center",
            p: 2,
          }}
        >
          <Typography sx={{ color: "white", fontSize: "18px" }}>
            © 2024 | All rights reserved.
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default CustomizeLandingPage;
