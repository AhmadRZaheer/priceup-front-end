
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TableHeader = ({ showMore }) => {
  const renderSliderItems = (items) => {
    return items.map((item, index) => (
      <div key={index}>{renderSliderItem(item.title, item.option)}</div>
    ));
  };

  const renderSliderItem = (title, option) => (
    <div
      onClick={() => showMore(option)}
      style={{
        paddingTop: "10px",
        paddingBottom: "10px",
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
    <div
      {...props}
      style={{
        ...props.style,
        color: "red", // Change the arrow color to blue
      }}
    >
      Next
    </div>
  );

  const sliderSettings = {
    infinite: true,
    speed: 500,
    arrows: true,
    slidesToShow: 6,
    vertical: false,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />, // Replace default prevArrow with a custom one
    nextArrow: <CustomNextArrow />, // Replace default nextArrow with a custom one
  };

  const items = [
    { title: "Finishes", option: "one" },
    { title: "Handles", option: "two" },
    { title: "Hinges", option: "three" },
    { title: "Finishes", option: "four" },
    { title: "Handles", option: "five" },
    { title: "Handles", option: "six" },
    { title: "Finishes", option: "one" },
    { title: "Handles", option: "two" },
    { title: "Hinges", option: "three" },
    { title: "Finishes", option: "four" },
    { title: "Handles", option: "five" },
    { title: "Handles", option: "six" },
    { title: "Finishes", option: "four" },
    { title: "Handles", option: "five" },
    { title: "Handles", option: "six" },
  ];

  return (
    <div
      style={{
        maxWidth: "78vw",
        margin: "0 auto",
        // backgroundColor: "rgb(232, 232, 232)",
      }}
    >
      <Slider {...sliderSettings}>{renderSliderItems(items)}</Slider>
    </div>
  );
};

export default TableHeader;
