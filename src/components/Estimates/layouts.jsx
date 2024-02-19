import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { backendURL } from "../../utilities/common";
import { useDispatch, useSelector } from "react-redux";
import { useFetchDataDefault } from "../../utilities/ApiHooks/defaultLayouts";
import {
  addSelectedItem,
  initializeStateForCreateQuote,
  initializeStateForCustomQuote,
  selectedItem,
  setNavigationDesktop,
  setQuoteState,
  updateMeasurements,
} from "../../redux/estimateCalculations";
import { useEffect, useState } from "react";
import bgCustom from "../../Assets/customlayoutimage.svg";

export default function Layout() {
  const boxStyles = {
    minHeight: "182px",
    minWidth: "180px",
    margin: "auto",
    borderRadius: "12px",
    boxShadow:
      "0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)",
    border: "1px solid #EAECF0",
    p: 2,
    background: "#D9D9D9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
    flexDirection: "column",
    cursor: "pointer",
  };

  const { data: layouts, isLoading: loading, refetch } = useFetchDataDefault();

  const dispatch = useDispatch();
  const selectedData = useSelector(selectedItem);
  const handleBoxClick = (layout) => {
    dispatch(initializeStateForCreateQuote({ layoutData: layout }));
    dispatch(addSelectedItem(layout));
    dispatch(setQuoteState("create"));
    setselectCustom(false);
  };
  const setStorePage = () => {
    dispatch(updateMeasurements([]));  // reset measurement array on shifting layout
    if (selectCustom) {
      dispatch(setNavigationDesktop("custom"));
    } else dispatch(setNavigationDesktop("measurements"));
  };
  const [selectCustom, setselectCustom] = useState(false);
  const handleselectcustom = () => {
    dispatch(initializeStateForCustomQuote());
    dispatch(addSelectedItem(null));
    dispatch(setQuoteState("custom"));
    setselectCustom(true);
  };
  const handleBack = () => {
    dispatch(setNavigationDesktop("existing"));
  };
  useEffect(() => {
    refetch();
  }, []);
  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "white",
          height: "100vh",
          background: { sm: "white", xs: "#08061B" },
        }}
      >
        <Box
          sx={{
            width: { sm: 800 },
          }}
        >
          <Box style={{ paddingBottom: "10px" }}>
            <Box
              sx={{
                backgroundColor: { xs: "#100D24", sm: "white" },
                padding: { xs: "20px 15px", sm: "0px" },
                borderBottomRightRadius: { xs: "16px", sm: "0px" },
                borderBottomLeftRadius: { xs: "16px", sm: "0px" },
                display: "flex",
                alignItems: "center",
                marginTop: { sm: 0, xs: 2 },
              }}
            >
              <NavLink to="/estimates">
                <Box
                  onClick={handleBack}
                  sx={{
                    display: { xs: "block", sm: "none" },
                    paddingRight: "20px",
                    paddingTop: "4px",
                  }}
                >
                  {" "}
                  <img src="/icons/left_vector.svg" alt="<" />
                </Box>
              </NavLink>

              <Typography
                sx={{
                  color: { sm: "black", xs: "white" },
                  fontSize: { xs: "24px", sm: "2.124rem" },
                  textAlign: { xs: "start", sm: "center" },
                  fontWeight: 500,
                }}
                variant="h4"
              >
                Create New Qoute
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              height: 600,
              overflow: "hidden",
              borderRadius: "12px",
              boxShadow:
                "0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)",
              border: { md: "1px solid #EAECF0", xs: "none" },
              paddingX: 2,
              paddingY: 4,
              rowGap: 2,
              background: { sm: "white", xs: "#08061B" },
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: { md: "18px", xs: "18px" },
                  color: { md: "#101828", xs: "white" },
                  paddingBottom: 1,
                  fontWeight: 600,
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
            {loading ? (
              <Box
                sx={{
                  width: 40,
                  m: "auto",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 300,
                }}
              >
                <CircularProgress sx={{ color: "#8477DA" }} />
              </Box>
            ) : (
              <Grid
                container
                gap={1}
                sx={{ minHeight: "40vh", overflow: "auto", maxHeight: "60vh" }}
              >
                {layouts?.map((layout) => (
                  <Box
                    key={layout._id}
                    sx={{
                      ...boxStyles,
                      backgroundColor:
                        selectedData?._id !== layout._id
                          ? "#D9D9D9"
                          : "#8477DA",
                      color:
                        selectedData?._id !== layout._id ? "black" : "white",
                      width: "162px",
                      height: "192px",
                    }}
                    onClick={() => handleBoxClick(layout)}
                  >
                    <img
                      style={{
                        position: "relative",
                        zIndex: 1,
                        width: "120px",
                        height: "140px",
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
                    backgroundColor: selectCustom ? "#8477DA" : "#D9D9D9",
                    color: selectCustom ? "white" : "#101828",
                    position: "relative",
                  }}
                >
                  <img
                    style={{
                      position: "absolute",
                      zIndex: 1,
                      height: "100px",
                      width: "100px",
                    }}
                    src={bgCustom}
                    alt="custom image"
                  />
                  <Typography
                    sx={{ font: "18px", zIndex: 2, color: "#101828" }}
                  >
                    Custom
                  </Typography>
                </Box>
              </Grid>
            )}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                position: { sm: "static", xs: "fixed" },
                bottom: 0,
                width: { sm: "auto", xs: "90%" },
                py: { sm: 0, xs: 2 },
                bgcolor: { sm: "white", xs: "#08061B" },
              }}
            >
              {/* <NavLink to="/estimates"> */}
              <Button
                sx={{
                  width: { xs: 120, sm: 180 },
                  color: "black",
                  border: "1px solid black",
                  fontSize: 18,
                  ml: 2,
                  backgroundColor: "white",
                }}
                fullWidth
                variant="outlined"
                onClick={handleBack}
              >
                {" "}
                Back
              </Button>
              {/* </NavLink> */}
              <Button
                disabled={selectedData || selectCustom ? false : true}
                sx={{
                  width: { xs: 120, sm: 180 },
                  backgroundColor: "#8477DA",
                  fontSize: 18,
                  "&:hover": { backgroundColor: "#8477DA" },
                  color: "white",
                }}
                onClick={setStorePage}
                fullWidth
                variant="contained"
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
}
