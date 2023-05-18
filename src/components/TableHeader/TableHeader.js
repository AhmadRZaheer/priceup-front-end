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
import { Button, IconButton } from "@mui/material";

const PrevArrow = ({ onClick }) => (
  <Button className="slick-arrow slick-prev" onClick={onClick}>
    <FontAwesomeIcon icon={faChevronLeft} />
  </Button>
);

const NextArrow = ({ onClick }) => (
  <Button className="slick-arrow slick-next" onClick={onClick}>
    <FontAwesomeIcon icon={faChevronRight} />
  </Button>
);

// const settings = {
//   speed: 500,
//   slidesToShow: 8,
//   slidesToScroll: 3,
//   vertical: false,
//   arrows: true,
//   prevArrow: <PrevArrow />,
//   nextArrow: <NextArrow />,
// };

// const TableHeader = ({ types, showMore }) => {
//   return (
//     <div
//       style={{
//         maxWidth: "80vw",
//         margin: "0 auto",
//         backgroundColor: "green",
//         cursor: "pointer",
//       }}
//     >
//       <Slider {...settings}>
//         <div
//           onClick={() => showMore("one")}
//           style={{
//             padding: "10px",
//             minWidth: "200px",
//             background: "green",
//           }}
//         >
//           Finishes
//         </div>
//         <div
//           onClick={() => showMore("two")}
//           style={{
//             padding: "10px",
//             minWidth: "200px",
//             background: "green",
//           }}
//         >
//           Handles
//         </div>
//         <div
//           onClick={() => showMore("three")}
//           style={{
//             padding: "10px",
//             minWidth: "200px",
//             background: "green",
//           }}
//         >
//           Hinges
//         </div>
//         <div
//           onClick={() => showMore("four")}
//           style={{
//             padding: "10px",
//             minWidth: "200px",
//             background: "green",
//           }}
//         >
//           Finishes
//         </div>
//         <div
//           onClick={() => showMore("five")}
//           style={{
//             padding: "10px",
//             minWidth: "200px",
//             background: "green",
//           }}
//         >
//           Handles
//         </div>
//       </Slider>
//     </div>
//   );
// };

const TableHeader = ({ showMore }) => {
  const sliderSettings = {
    // infinite: true,
    speed: 500,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    slidesToShow: 3,
    vertical: false,
    slidesToScroll: 1,
  };

  const renderSliderItem = (title, option) => (
    <div
      onClick={() => showMore(option)}
      style={{
        padding: "10px",
        minWidth: "200px",
        backgroundColor: "green",
        cursor: "pointer",
      }}
    >
      {title}
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
        {renderSliderItem("Finishes", "one")}
        {renderSliderItem("Handles", "two")}
        {renderSliderItem("Hinges", "three")}
        {renderSliderItem("Finishes", "four")}
        {renderSliderItem("Handles", "five")}
        {renderSliderItem("Handles", "six")}
        {renderSliderItem("Finishes", "one")}
        {renderSliderItem("Handles", "two")}
        {renderSliderItem("Hinges", "three")}
        {renderSliderItem("Finishes", "four")}
        {renderSliderItem("Handles", "five")}
        {renderSliderItem("Handles", "six")}
      </Slider>
    </div>
  );
};
export default TableHeader;
