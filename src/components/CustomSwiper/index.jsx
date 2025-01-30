import 'swiper/css';
import 'swiper/css/navigation';
import '../CustomizeLandingPage/style.scss';

import React from 'react';

import { Navigation } from 'swiper/modules';
import {
  Swiper,
  SwiperSlide,
} from 'swiper/react';

import Bulb from '@/Assets/CustomerLandingImages/blubImg.png';
import { backendURL } from '@/utilities/common';
import { EstimateCategory } from '@/utilities/constants';
import {
  Box,
  Card,
  Container,
  Typography,
} from '@mui/material';

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
        <img src={Bulb} alt="not" className='smilerBulbLogo' />
        <Typography
          sx={{
            fontFamily: '"Poppins" !important',
            fontSize: {sm:"32px",xs:'16px'},
            fontWeight: 600,
            lineHeight: {sm:"35px",xs:'20px'},
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
                300: {
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
                    <Card >
                      <img
                        src={`${backendURL}/${data}`}
                        alt="not"
                        className='sliderCategoryImg'
                      />
                    </Card>
                  </SwiperSlide>
                ))
              ) : (
                <Typography
                  sx={{
                    fontSize: {sm:"20px",xs:'14px'},
                    fontWeight: 500,
                    lineHeight: "54px",
                    textAlign: "center",
                    color:'white'
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
