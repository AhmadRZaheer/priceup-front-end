import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getDefaultId,
  getRefetch,
  setDefaultId,
} from "../../redux/defaultSlice";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useFetchDataDefault } from "../../utilities/ApiHooks/defaultLayouts";
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
  useEffect(() => {
    if (defaultId.length <= 0 && types?.length) {
      dispatch(setDefaultId(types[0]._id));
    }
  }, [types]);
  const renderSliderItems = (items) => {
    return items?.map((item, index) => (
      <div key={index}>{renderSliderItem(item)}</div>
    ));
  };
  const renderSliderItem = (props) => (
    <Box
      onClick={() => showMore(props._id)}
      sx={{
        paddingLeft: "15px",
        paddingRight: "15px",
        minHeight: "50px",
        marginRight: 2,
        backgroundColor: props?._id === defaultId ? "#8477DA" : "",

        "&:hover": {
          backgroundColor: "#8477DA",
          color: "white",
        },
        "&:active": {
          backgroundColor: "#8477DA",
          color: "white",
        },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        color: props?._id === defaultId ? "white" : "black",
        borderRadius: "4px",
      }}
    >
      <h3>{props?.name}</h3>
    </Box>
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

export default LayoutHeader;
