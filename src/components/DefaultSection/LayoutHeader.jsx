import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { items } from "../../data/data";
import { useDispatch, useSelector } from "react-redux";
import {
  getDefaultId,
  getRefetch,
  setDefaultId,
} from "../../redux/defaultSlice";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {
  useEditDefault,
  useFetchDataDefault,
} from "../../utilities/ApiHooks/DefaultLayouts";
import { useEffect } from "react";
import { Box } from "@mui/material";

const LayoutHeader = () => {
  const { data: types, refetch: defaultDataRefetch } = useFetchDataDefault();
  const refetch = useSelector(getRefetch);
  const defaultId = useSelector(getDefaultId);

  useEffect(() => {
    defaultDataRefetch();
  }, [refetch]);
  const dispatch = useDispatch();

  const showMore = (id) => {
    dispatch(setDefaultId(id));
  };
  const renderSliderItems = (items) => {
    return items?.map((item, index) => (
      <div key={index}>{renderSliderItem(item)}</div>
    ));
  };

  const renderSliderItem = (props) => (
    (
      <Box
        onClick={() => showMore(props._id)}
        sx={{
          paddingLeft: "15px",
          paddingRight: "15px",
          minHeight: "50px",
          marginRight: 2,
          backgroundColor:
            props?._id === defaultId ? "rgba(132, 119, 218, 0.2)" : "",

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
        <h3>{props?.name}</h3>
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
