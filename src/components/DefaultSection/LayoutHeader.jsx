import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { items } from "../../data/data";
import { useDispatch } from "react-redux";
import { setDefaultId } from "../../redux/defaultSlice";

const LayoutHeader = ({ types }) => {
  const dispatch = useDispatch();

  const showMore = (id) => {
    dispatch(setDefaultId(id));
  };
  const renderSliderItems = (items) => {
    console.log(items, "itemsss");
    return items?.map((item, index) => (
      <div key={index}>{renderSliderItem(item)}</div>
    ));
  };

  const renderSliderItem = (props) => (
    console.log(props, "options to show handles"),
    (
      <div
        onClick={() => showMore(props?._id)}
        style={{
          paddingLeft: "15px",
          paddingRight: "15px",
          // paddingTop: "10px",
          // paddingBottom: "10px",

          minHeight: "50px",
          minWidth: "110px",
          backgroundColor: "rgb(232, 232, 232)",
          // backgroundColor: "#fff",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          // gap: 8,
          width: "fit-content", // Set the width to fit the content
          margin: "0 auto", // Center the item horizontally
          borderRadius: "4px", // Add border radius for a rounded look
        }}
      >
        <h3>{props?.name}</h3>
      </div>
    )
  );

  const CustomPrevArrow = (props) => (
    <div
      {...props}
      style={{
        ...props.style,
        color: "blue !important", // Change the arrow color to red
        zIndex: 2,
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
        color: "green !important", // Change the arrow color to blue
      }}
    >
      jkj
    </div>
  );

  const sliderSettings = {
    speed: 500,
    arrows: true,
    slidesToShow: 6,
    vertical: false,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />, // Replace default prevArrow with a custom one
    nextArrow: <CustomNextArrow />, // Replace default nextArrow with a custom one
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

export default LayoutHeader;
