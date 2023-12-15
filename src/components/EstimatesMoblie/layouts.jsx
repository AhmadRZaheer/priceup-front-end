import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { useFetchDataDefault } from "../../utilities/ApiHooks/defaultLayouts";
import { backendURL } from "../../utilities/common";
import { useDispatch, useSelector } from "react-redux";
import {
  addSelectedItem,
  initializeStateForCreateQuote,
  initializeStateForCustomQuote,
  resetState,
  selectedItem,
  setListData,
  setNavigation,
  setQuoteState,
} from "../../redux/estimateCalculations";
import QuotesHeader from "./quotesHeader";
import { useFetchDataEstimate } from "../../utilities/ApiHooks/estimate";
export const boxStyles = {
  minHeight: "172px",
  minWidth: { md: "180px", xs: "140px" },
  margin: "auto",
  borderRadius: "8px",
  color: "white",
  boxShadow:
    "0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)",
  border: { md: "1px solid #EAECF0", xs: "none" },
  p: { md: 1.2, xs: 0.3 },
  background: "rgba(36, 28, 52,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: { md: 2, xs: 1 },
  flexDirection: "column",
  cursor: "pointer",
};
const Layout = () => {
  const { data: layouts, isFetching: layoutFetching } = useFetchDataDefault();
  const { data: estimateListData, isFetching: estimateDataFetching } =
    useFetchDataEstimate();
  const dispatch = useDispatch();
  const selectedData = useSelector(selectedItem);
  const [selectCustom, setselectCustom] = useState(false);

  const handleBoxClick = (layout) => {
    dispatch(setListData(estimateListData));
    dispatch(initializeStateForCreateQuote({ layoutData: layout }));
    dispatch(addSelectedItem(layout));
    dispatch(setQuoteState("create"));
    setselectCustom(false);
    // dispatch(resetState());
  };

  const setStorePage = () => {
    if (selectCustom) {
      dispatch(setNavigation("custom"));
    } else dispatch(setNavigation("measurements"));
  };
  const handleselectcustom = () => {
    dispatch(resetState());
    dispatch(setListData(estimateListData));
    dispatch(initializeStateForCustomQuote());
    dispatch(addSelectedItem(null));
    dispatch(setQuoteState("custom"));
    setselectCustom(true);
    // dispatch(resetState());
  };
  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          paddingY: { md: 4, sx: 0 },
        }}
      >
        <Box
          sx={{
            width: "100%",
            margin: "auto",
            height: "100%",
            display: "flex",
            alignItems: { md: "center", xs: "start" },
            flexDirection: "column",
            p: { md: 2, sx: 0 },
            gap: { md: 4, xs: 0 },
          }}
        >
          <QuotesHeader navigateTo={"existing"} />
          <Box sx={{ width: { sm: "744px" } }}>
            <Box
              sx={{
                margin: "auto",
                borderRadius: { md: "12px", xs: 0 },
                boxShadow:
                  " 0px 8px 8px -4px rgba(16, 24, 40, 0.03), 0px 20px 24px -4px rgba(16, 24, 40, 0.08)",
                border: { md: "1px solid #EAECF0", xs: "none" },
                paddingY: 4,
                paddingX: { xs: 2, sm: 0 },
                rowGap: 4,
                display: "flex",
                flexDirection: "column",
                paddingTop: { md: 4, xs: 6 },
                marginTop: { md: 0, xs: -3 },
                overflow: "auto ",
                width: { sm: "744px" },
                height: "620px",
              }}
            >
              <Box sx={{ paddingX: 2 }}>
                <Typography
                  sx={{
                    fontSize: { md: "18px", xs: "18px" },
                    color: { md: "#101828", xs: "white" },
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
              {layoutFetching || estimateDataFetching ? (
                <Box
                  sx={{
                    width: 40,
                    m: "auto",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CircularProgress sx={{ color: "#8477DA" }} />
                </Box>
              ) : (
                <Grid
                  container
                  gap={1}
                  // sx={{ height: "55vh", overflow: "auto" }}
                >
                  {layouts.map((layout) => (
                    <Box
                      key={layout._id}
                      sx={{
                        ...boxStyles,
                        backgroundColor:
                          selectedData?._id !== layout._id
                            ? "#667085"
                            : "#8477DA",
                        color:
                          selectedData?._id !== layout._id
                            ? "white"
                            : "#101828",
                        width: "162px",
                        height: "192px",
                      }}
                      onClick={() => handleBoxClick(layout)}
                    >
                      <img
                        style={{
                          position: "relative",
                          zIndex: 1,
                          width: "70px",
                          height: "120px",
                        }}
                        src={`${backendURL}/${layout?.image}`}
                        alt="Selected"
                      />

                      <Typography sx={{ font: "18px" }}>
                        {layout?.name}
                      </Typography>
                    </Box>
                  ))}

                  <Box
                    onClick={handleselectcustom}
                    sx={{
                      ...boxStyles,
                      backgroundColor: selectCustom ? "#8477DA" : "#667085",
                      color: selectCustom ? "black" : "white",
                      width: "162px",
                      height: "192px",
                    }}
                  >
                    <Typography sx={{ font: "18px" }}>Custom</Typography>
                  </Box>
                </Grid>
              )}
            </Box>

            {/* button */}
            <Box
              sx={{
                display: "flex",
                width: "100%",
                paddingY: 2,
                justifyContent: { xs: "center", sm: "end" },
              }}
            >
              <Button
                disabled={selectedData || selectCustom ? false : true}
                onClick={setStorePage}
                color="primary"
                sx={{
                  textTransform: "capitalize",
                  width: "160px",
                  background: "#8477DA",
                  color: "white",
                  fontSize: 18,
                  "&:hover": { background: "#8477DA", color: "white" },
                }}
              >
                {" "}
                Next
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Layout;
