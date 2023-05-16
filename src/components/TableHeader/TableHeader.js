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

const PrevArrow = ({ onClick }) => (
  <button className="slick-arrow slick-prev" onClick={onClick}>
    <FontAwesomeIcon icon={faChevronLeft} />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    className="slick-arrow slick-next"
    onClick={onClick}
    style={{ color: "red" }}
  >
    <FontAwesomeIcon icon={faChevronRight} />
  </button>
);

const settings = {
  speed: 500,
  slidesToShow: 8,
  slidesToScroll: 3,
  vertical: false,
  arrows: true,
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />,
};

const TableHeader = ({ types }) => {
  return (
    <div style={{ maxWidth: "80vw", margin: "0 auto" }}>
      <Slider {...settings}>
        {types.map((type, index) => (
          <div
            key={index}
            style={{
              padding: "10px",
              minWidth: "200px",
              background: "green",
              cursor: "pointer",
            }}
          >
            {type}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TableHeader;
