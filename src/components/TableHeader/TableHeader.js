import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { items } from "../../data/data";

const TableHeader = ({ showMore, types }) => {
  const renderSliderItems = (items) => {
    return items.map((item, index) => (
      <div key={index}>{renderSliderItem(item.name, item._id)}</div>
    ));
  };

  const renderSliderItem = (title, option) => (
    <div
      onClick={() => showMore(option)}
      style={{
        padding: "10px",
        minHeight: "50px",
        minWidth: "150px",
        backgroundColor: "rgb(232, 232, 232)",
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

  const CustomPrevArrow = (props) => (
    <div
      {...props}
      style={{
        ...props.style,
        color: "red", // Change the arrow color to red
      }}
    >
      Previous
    </div>
  );

  const CustomNextArrow = (props) => (
    // console.log(props, "arrow porpss"),
    (
      <div
        {...props}
        style={{
          ...props.style,
          background: "green !important", // Change the arrow color to blue
        }}
      >
        Next
      </div>
    )
  );

  const sliderSettings = {
  
    speed: 500,
    arrows: true,
    slidesToShow: 6,
    vertical: false,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />, // Replace default prevArrow with a custom one
    nextArrow: <CustomNextArrow />, // Replace default nextArrow with a custom one
  };

  return (
    <div
      style={{
        maxWidth: "78vw",
        margin: "0 auto",
        // backgroundColor: "rgb(232, 232, 232)",
      }}
    >
      <Slider {...sliderSettings}>{renderSliderItems(types)}</Slider>
    </div>
  );
};

export default TableHeader;
