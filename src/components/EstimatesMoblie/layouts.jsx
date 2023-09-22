import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { useFetchDataDefault } from "../../utilities/ApiHooks/defaultLayouts";
import { backendURL } from "../../utilities/common";
import { useDispatch, useSelector } from "react-redux";
import {
  addSelectedItem,
  initializeStateForCreateQuote,
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
    console.log('box click');
    dispatch(setListData(estimateListData));
    dispatch(initializeStateForCreateQuote({ layoutData: layout }));
    dispatch(addSelectedItem(layout));
    if(selectCustom){
      console.log('custom remove')
      setselectCustom(false);
      dispatch(setQuoteState("create"));
    }
  };

  const setStorePage = () => {
    if (selectCustom) {
      dispatch(setNavigation("custom"));
    } else dispatch(setNavigation("measurements"));
  };
  const handleselectcustom = () => {
    dispatch(addSelectedItem(null));
    dispatch(setQuoteState("custom"));
    setselectCustom(true);
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          background: "#18133b",
          height: "98vh",
          paddingY: { md: 4, sx: 0 },
        }}
      >
        <Box
          sx={{
            width: { md: "70%", sm: "100%", sx: "100%" },
            margin: { md: "auto", xs: 0 },
            height: "100%",
            display: "flex",
            alignItems: { md: "center", xs: "start" },
            marginTop: { md: 15, sx: 0 },
            flexDirection: "column",
            p: { md: 2, sx: 0 },
            gap: { md: 4, xs: 0 },
          }}
        >
          <QuotesHeader navigateTo={"existing"} />
          <Box
            sx={{
              width: { md: "94%", sm: "98%", xs: "91.3%" },
              margin: "auto",
              minHeight: 700,
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
            {layoutFetching || estimateDataFetching ? (
              <Box
                sx={{
                  width: 40,
                  m: "auto",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 700,
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <Grid container gap={1} sx={{ height: "55vh", overflow: "auto" }}>
                {layouts.map((layout) => (
                  <Box
                    key={layout._id}
                    sx={{
                      ...boxStyles,
                      backgroundColor:
                        selectedData?._id !== layout._id
                          ? "rgba(36, 28, 52,0.5)"
                          : "#8477DA",
                      color:
                        selectedData?._id !== layout._id ? "white" : "black",
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
                    backgroundColor: selectCustom
                      ? "#8477DA"
                      : "rgba(36, 28, 52,0.5)",
                    color: selectCustom ? "black" : "white",
                  }}
                >
                  <Typography sx={{ font: "18px" }}>Custom</Typography>
                </Box>
              </Grid>
            )}
            <Box
              sx={{
                display: "flex",
                position: "fixed",
                bottom: 0,
                left: 0,
                backgroundColor: "#18133b",
                width: "92.6%",
                padding: 2,
              }}
            >
              <Button
                disabled={selectedData?.length < 1 && selectCustom === false}
                onClick={setStorePage}
                color="primary"
                sx={{
                  textTransform: "capitalize",
                  width: "100%",
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
