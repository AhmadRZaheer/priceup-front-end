import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { items } from "../../data/data";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const TableHeader = ({ showMore, types }) => {
  const renderSliderItems = (items) => {
    console.log(items, "itemsss");
    return items?.map((item, index) => (
      <div key={index} style={{display: "flex", gap: 10}}>
        {renderSliderItem(item, item?.slug)}
        </div>
    ));
  };

  const renderSliderItem = (title, option) => (
    console.log(option, "options to show handles"),
    (
      <Box
        onClick={() => showMore(option)}
        sx={{
          paddingLeft: "15px",
          paddingRight: "15px",
          minHeight: "50px",
          // minWidth: "80px",
          // maxWidth: "200px",
          "&:hover": {
            backgroundColor: "rgba(132, 119, 218, 0.2)",
          },
          "&:active": {
            backgroundColor: "rgba(132, 119, 218, 0.2)",
          },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          // width: "fit-content",
          // margin: "0 auto",
          borderRadius: "4px",// Add border radius for a rounded look
        }}
      >
        <h3>{title?.name}</h3>
      </Box>
    )
  );

  const CustomPrevArrow = (props) => (
    <div
      {...props}
      style={{
        ...props.style,
        color: "blue !important", // Change the arrow color to red
        zIndex: 2,
        backgroundColor: "black",
        borderRadius: "100%" 
      }}
    >
      Previous
    </div>
  );

  const CustomNextArrow = (props) => (
    // console.log(props, "arrow porpss"),
    <div
      {...props}
      style={{
        ...props.style,
        color: "green !important",
        // backgroundColor: "black",
        borderRadius: "100%",
        width: "20px",
        height: "20px"
         // Change the arrow color to blue
      }}
    >
      
    </div>
  );

  const sliderSettings = {
    speed: 500,
    arrows: true,
    slidesToShow: 6,
    vertical: false,
    slidesToScroll: 1,
    prevArrow: <ArrowBackIosNewIcon  sx={{color: "black", "&:hover": {color: 'black'}}}/>, // Replace default prevArrow with a custom one
    nextArrow: <ArrowForwardIosIcon  sx={{color: "black", "&:hover": {color: 'black'}}}/>, // Replace default nextArrow with a custom one
    adaptiveHeight: true,
  };

  return (
    <div
      style={{
        maxWidth: "78vw",
        margin: "0 auto",
        // backgroundColor: "green",
      }}
    >
      <Slider {...sliderSettings}>{renderSliderItems(types)}</Slider>
    </div>
  );
};

export default TableHeader;
