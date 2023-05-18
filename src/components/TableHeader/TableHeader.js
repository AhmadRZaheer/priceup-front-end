// import React from "react";

// const Header = ({ types }) => {
//   return (
//     <div style={{ maxWidth: "80vw", overflowX: "auto" }}>
//       <div style={{ display: "flex" }}>
//         {types.map((type, index) => (
//           <div key={index} style={{ padding: "10px", minWidth: "200px" }}>
//             {type}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
// export default Header;

// import React from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// const Header = ({ types }) => {
//   const settings = {
//     dots: false,
//     arrows: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 8,
//     slidesToScroll: 1,
//   };

//   return (
//     <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
//       <Slider {...settings}>
//         {types.map((type, index) => (
//           <div key={index} style={{ padding: "10px", minWidth: "200px" }}>
//             {type}
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// };
// export default Header;

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@mui/material";

const PrevArrow = ({ onClick }) => (
  <Button
    style={{ zIndex: 5 }}
    className="slick-arrow slick-prev"
    onClick={onClick}
  >
    <FontAwesomeIcon icon={faChevronLeft} />
  </Button>
);

const NextArrow = ({ onClick }) => (
  <Button
    style={{ zIndex: 5 }}
    className="slick-arrow slick-next"
    onClick={onClick}
  >
    <FontAwesomeIcon icon={faChevronRight} />
  </Button>
);

const TableHeader = ({ showMore }) => {
  const sliderSettings = {
    infinite: true,
    scroll: NextArrow,
    speed: 500,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    slidesToShow: 6,
    vertical: false,
    slidesToScroll: 1,
  };

  const renderSliderItem = (title, option) => (
    <div
      onClick={() => showMore(option)}
      style={{
        paddingTop: "20px",
        paddingBottom: "20px",
        minWidth: "200px",
        backgroundColor: "gray",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        width: "fit-content", // Set the width to fit the content
        margin: "0 auto", // Center the item horizontally
        borderRadius: "4px", // Add border radius for a rounded look
      }}
    >
      <h3>{title}</h3>
    </div>
  );

  return (
    <div
      style={{
        maxWidth: "80vw",
        margin: "0 auto",
      }}
    >
      <Slider {...sliderSettings}>
        <div style={{}}>{renderSliderItem("Finishes", "one")}</div>
        <div style={{}}> {renderSliderItem("Handles", "two")}</div>
        <div style={{}}> {renderSliderItem("Hinges", "three")}</div>

        <div style={{}}> {renderSliderItem("Finishes", "four")}</div>

        <div style={{}}> {renderSliderItem("Handles", "five")}</div>
        <div style={{}}> {renderSliderItem("Handles", "six")}</div>
        <div style={{}}>{renderSliderItem("Finishes", "one")}</div>
        <div style={{}}> {renderSliderItem("Handles", "two")}</div>
        <div style={{}}> {renderSliderItem("Hinges", "three")}</div>

        <div style={{}}> {renderSliderItem("Finishes", "four")}</div>

        <div style={{}}> {renderSliderItem("Handles", "five")}</div>
        <div style={{}}> {renderSliderItem("Handles", "six")}</div>
      </Slider>
    </div>
  );
};
export default TableHeader;
