import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { items } from "../../data/data";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const TableHeader = ({ showMore, types }) => {
  const [selectedOption, setSelectedOption] = useState("handles");
  const renderSliderItems = (items) => {
    return items?.map((item, index) => (
      <div key={index} style={{ display: "flex", gap: 10 }}>
        {renderSliderItem(item, item?.slug)}
      </div>
    ));
  };
  const handleItemClick = (option) => {
    showMore(option);
    setSelectedOption(option);
  };

  const renderSliderItem = (title, option) => (
    (
      <Box
        onClick={() => handleItemClick(option)}
        sx={{
          paddingLeft: "15px",
          paddingRight: "15px",
          minHeight: "50px",
          marginRight: 2,
          backgroundColor:
            selectedOption === option
              ? "rgba(132, 119, 218, 0.2)"
              : "transparent",
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

          borderRadius: "4px",
        }}
      >
        <h3>{title?.name}</h3>
      </Box>
    )
  );

  const sliderSettings = {
    speed: 500,
    arrows: true,
    slidesToShow: 6,
    vertical: false,
    slidesToScroll: 1,
    prevArrow: (
      <ArrowBackIosNewIcon
        sx={{ color: "black", "&:hover": { color: "black" } }}
      />
    ), // Replace default prevArrow with a custom one
    nextArrow: (
      <ArrowForwardIosIcon
        sx={{ color: "black", "&:hover": { color: "black" } }}
      />
    ), // Replace default nextArrow with a custom one
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
