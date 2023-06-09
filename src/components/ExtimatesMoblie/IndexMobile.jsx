import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
// import { layouts } from "../../data/data";
import ClientDetailsModel from "./Model";
import LayoutMeasurements from "./layoutMeasurements";
import LayoutReview from "./LayoutReview";
import MenuList from "./MenuList";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import Summary from "./Summary";
import ExitingQuotes from "./existingQuotes";
import { useFetchDataDefault } from "../../utilities/ApiHooks/DefaultLayouts";
import { backendURL } from "../../utilities/common";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedId } from "../../redux/selectedIdSlice";

const IndexMobile = () => {
  // const selectedId = useSelector((state) => state.selectedId);
  // console.log(selectedId, "selectedId 11");
  // const dispatch = useDispatch();

  // const handleBoxClick = (id) => {
  //   dispatch(setSelectedId(id));
  // };
  const boxStyles = {
    minHeight: "152px",
    minWidth: { md: "180px", xs: "140px" },
    margin: "auto",
    borderRadius: "12px",
    boxShadow:
      "0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)",
    border: { md: "1px solid #EAECF0", xs: "none" },
    p: { md: 1.2, xs: 0.3 },
    background: "#D9D9D9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: { md: 2, xs: 1 },
    flexDirection: "column",
    cursor: "pointer",
    position: "relative",
    // "&:hover": {
    //   backgroundColor: { md: "none", xs: "rgba(121, 102, 189, 0.5)" },
    // },
  };
  const [clientDetailOpen, setClientDetailOpen] = useState(false);
  const [handleEstimatesPages, setHandleEstimatesPages] = useState("exiting");
  // const [item, setItem] = useState("");
  // console.log(item, "item estimate");
  const [selectedLayout, setSelectedLayout] = useState(null);
  const [doorDetail, setDoorDetail] = useState(null);

  const handleBoxClick = (layout) => {
    setSelectedLayout(layout);
    setHandleEstimatesPages("measurements");
  };

  const { data: layouts, refetch: defaultDataRefetch } = useFetchDataDefault();
  console.log(layouts, "layouts in mobile view");

  return (
    <>
      {handleEstimatesPages == "layout" && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            background: "#18133b",

            height: "93.3vh",
            overflowY: "scroll",
            paddingY: { md: 4, sx: 0 },
          }}
        >
          <Box
            sx={{
              width: { md: "70%", sm: "100%", sx: "100%" },
              margin: { md: "auto", xs: 0 },

              display: "flex",
              alignItems: { md: "center", xs: "start" },
              //   background: "blue",
              marginTop: { md: 15, sx: 0 },
              flexDirection: "column",
              p: { md: 2, sx: 0 },
              gap: { md: 4, xs: 0 },
            }}
          >
            <Box
              sx={{
                display: { md: "none", xs: "flex" },
                zIndex: 1,
                justifyContent: { md: "center", xs: "start" },
                background: "#18133b",
                width: "100%",
                color: "white",
                paddingY: 1.2,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                marginTop: 7.6,
              }}
            >
              <Box sx={{ display: { md: "none", xs: "block" } }}>
                <ChevronLeftOutlinedIcon
                  onClick={() => {
                    setHandleEstimatesPages("exiting");
                  }}
                  sx={{ fontSize: 34, paddingTop: 0.4 }}
                />
              </Box>
              <Typography textAlign={"center"} variant="h4">
                Create New Qoute
              </Typography>
            </Box>
            <Typography
              sx={{ display: { md: "block", xs: "none" } }}
              textAlign={"center"}
              variant="h4"
            >
              Create New Qoute
            </Typography>
            <Box
              sx={{
                width: { md: "94%", sm: "98%", xs: "91.3%" },
                margin: "auto",
                borderRadius: { md: "12px", xs: 0 },
                boxShadow:
                  "0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)",
                border: { md: "1px solid #EAECF0", xs: "none" },
                paddingX: 2,
                paddingY: 4,
                rowGap: 4,
                background: { md: "white", xs: "#100D24" },
                display: "flex",
                flexDirection: "column",
                paddingTop: { md: 4, xs: 6 },
                marginTop: { md: 0, xs: -3 },
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: { md: "18px", xs: "18px" },
                    color: { md: "black", xs: "white" },
                    paddingBottom: 1,
                  }}
                >
                  Select Layout
                </Typography>
                <Typography
                  sx={{ color: { md: "#667085", xs: "white" }, font: "14px" }}
                >
                  Your new project has been created. Invite colleagues to
                  collaborate on this project.
                </Typography>
              </Box>
              <Grid container gap={2}>
                {layouts.map((layout) => (
                  <Box
                    key={layout._id}
                    // sx={boxStyles}
                    sx={{
                      ...boxStyles,
                      backgroundColor:
                        selectedLayout === layout
                          ? "rgba(121, 102, 189, 0.5)"
                          : "#D9D9D9",
                    }}
                    // onClick={() => setItem(layout)}
                    onClick={() => handleBoxClick(layout)}
                  >
                    <img
                      style={{
                        position: "relative",
                        zIndex: 1,
                        width: "80px",
                        height: "80px",
                      }}
                      // src={layout.imageSrc}
                      src={`${backendURL}/${layout?.image}`}
                      alt="Selected"
                    />
                    <Typography sx={{ font: "18px" }}>
                      {layout?.name}
                    </Typography>
                  </Box>
                ))}
                <Box sx={boxStyles}>
                  <Typography sx={{ font: "18px" }}>Custom</Typography>
                </Box>
              </Grid>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: { md: "end", xs: "center" },
                }}
              >
                {/* <Box
                  sx={{
                    position: { md: "relative", xs: "fixed" },
                    bottom: { md: "none", xs: 0 },
                    left: { md: "none", xs: 0 },
                    zIndex: 2,
                    width: { md: "150px", sm: "96%", xs: "94%" },
                    paddingY: { md: 0, xs: 3 },
                    paddingX: { md: 0, sm: 2, xs: 1.4 },
                    borderTop: { md: "none", xs: "1px solid #404040" },
                    backgroundColor: { md: "none", xs: "#100D24" },
                  }}
                >
                  <Button
                    // disabled={id.length === 0}
                    onClick={() => {
                      setHandleEstimatesPages("measurements");
                    }}
                    fullWidth
                    variant="contained"
                  >
                    {" "}
                    Next
                  </Button>
                </Box> */}
              </Box>
            </Box>
          </Box>
        </Box>
      )}

      {handleEstimatesPages == "measurements" && (
        <LayoutMeasurements
          setHandleEstimatesPages={setHandleEstimatesPages}
          item={selectedLayout}
          setDoorDetail={setDoorDetail}
        />
      )}
      {handleEstimatesPages == "review" && (
        <LayoutReview
          setHandleEstimatesPages={setHandleEstimatesPages}
          doorDetail={doorDetail}
        />
      )}
      {handleEstimatesPages == "summary" && (
        <Summary
          setHandleEstimatesPages={setHandleEstimatesPages}
          setClientDetailOpen={setClientDetailOpen}
        />
      )}
      {handleEstimatesPages == "exiting" && (
        <ExitingQuotes
          setHandleEstimatesPages={setHandleEstimatesPages}
          setClientDetailOpen={setClientDetailOpen}
        />
      )}

      {/* <LoginMobile /> */}
      <ClientDetailsModel
        open={clientDetailOpen}
        handleCancel={() => setClientDetailOpen(false)}
      />
    </>
  );
};

export default IndexMobile;
