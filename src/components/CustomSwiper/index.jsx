import { backendURL } from "@/utilities/common";
import { Box, Card, Container, Typography } from "@mui/material";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Bulb from "@/Assets/CustomerLandingImages/blubImg.png";
import { EstimateCategory } from "@/utilities/constants";

const CustomSwiper = ({ data, category, colorData }) => {
  const detailDesc =
    category === EstimateCategory.SHOWERS
      ? "Shower"
      : category === EstimateCategory.MIRRORS
      ? "Mirror"
      : "Wine Cellar";
  return (
    <Box>
      <style>
        {`.swiper-button-next,
      .swiper-button-prev {
      color: ${colorData?.secondary} !important; 
      background-color: ${colorData?.primary} !important;
      padding: 8px;
      }
      .swiper-button-next:hover,
      .swiper-button-prev:hover {
      color: ${colorData?.secondary} !important;
      background-color: ${colorData?.primary};
      padding: 8px;
      }`}
      </style>
      <Box sx={{ display: "flex", py: 4, justifyContent: "center" }}>
        <img src={Bulb} alt="not" style={{ height: "50px" }} />
        <Typography
          sx={{
            fontFamily: '"Poppins" !important',
            fontSize: "32px",
            fontWeight: 600,
            lineHeight: "35px",
            alignSelf: "end",
            borderBottom: "1px solid",
            borderColor: colorData?.primary,
            color: colorData?.secondary,
          }}
        >
          <Box component="span" sx={{ color: colorData?.primary }}>
            Similar
          </Box>{" "}
          {detailDesc} projects that we’ve worked on:
        </Typography>
      </Box>
      <Container sx={{ px: "0px !important" }}>
        <Box sx={{ width: "100%", display: "flex", gap: 2 }}>
          <Box sx={{ width: "100%" }}>
            {" "}
            <Swiper
              modules={[Navigation]}
              navigation
              spaceBetween={20}
              slidesPerView={4}
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
                "--swiper-navigation-color": "#fff !important",
                "--swiper-pagination-color": "#fff !important",
                "--swiper-navigation-size": "28px",
              }}
            >
              {data?.images?.length > 0 ? (
                data?.images?.map((data, index) => (
                  <SwiperSlide key={index}>
                    <Card sx={{}}>
                      <img
                        src={`${backendURL}/${data}`}
                        alt="not"
                        style={{
                          height: "345px",
                          width: "100%",
                          objectFit: "fill",
                        }}
                      />
                    </Card>
                  </SwiperSlide>
                ))
              ) : (
                <Typography
                  sx={{
                    fontSize: "20px",
                    fontWeight: 500,
                    lineHeight: "54px",
                    textAlign: "center",
                  }}
                >
                  No Image Selected!
                </Typography>
              )}
            </Swiper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default CustomSwiper;
