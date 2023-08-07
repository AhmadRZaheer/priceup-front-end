import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box } from "@mui/material";
import { useState } from "react";
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
              ? "#8477DA"
              : "transparent",
          "&:hover": {
            backgroundColor: "#8477DA",
            color: "white"
          },
          "&:active": {
            backgroundColor: "#8477DA",
            color: "white"
          },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: selectedOption === option ? "white": "black",
          borderRadius: "4px",
          
        }}
      >
        <h3 style={{minWidth: 200, textAlign: "center"}}>{title?.name}</h3>
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
    ), 
    nextArrow: (
      <ArrowForwardIosIcon
        sx={{ color: "black", "&:hover": { color: "black" } }}
      />
    ),
    adaptiveHeight: true,
  };

  return (
    <div
      style={{
        maxWidth: "75vw",
        margin: "0 auto",
      }}
    >
      <Slider {...sliderSettings}>{renderSliderItems(types)}</Slider>
    </div>
  );
};

export default TableHeader;
