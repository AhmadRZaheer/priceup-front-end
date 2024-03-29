import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { backendURL } from "../../utilities/common";
import { useDispatch, useSelector } from "react-redux";
import { useFetchDataDefault } from "../../utilities/ApiHooks/defaultLayouts";
import {
  addSelectedItem,
  initializeStateForCreateQuote,
  selectedItem,
  setNavigationDesktop,
} from "../../redux/estimateCalculations";
import { useFetchDataEstimate } from "../../utilities/ApiHooks/estimate";

export default function Layout() {

  const setStorePage = () => {
    dispatch(setNavigationDesktop("Measurments"))

  };
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
  const { data: layouts, isFetching: loading } = useFetchDataDefault();
  const { data: estimateListData, isFetching: estimateDataFetching } = useFetchDataEstimate();
  const dispatch = useDispatch();
  const selectedData = useSelector(selectedItem);
  const handleBoxClick = (layout) => {
    dispatch(initializeStateForCreateQuote({ layoutData: layout, listData: estimateListData }));
    dispatch(addSelectedItem(layout));
  };
  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          background: "white",
          height: "98vh",
          paddingY: 4,
        }}
      >
        <Box
          sx={{
            width: { md: "70%", sm: "100%", sx: "100%" },
            margin: { md: "auto", xs: 0 },
            height: "100%",
            display: "flex",
            alignItems: { md: "center", xs: "start" },
            flexDirection: "column",
            p: { md: 2, sx: 0 },
            gap: { md: 4, xs: 0 },
          }}
        >
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
              marginX: "auto",
              minHeight: 400,
              borderRadius: "12px",
              boxShadow:
                "0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)",
              border: { md: "1px solid #EAECF0", xs: "none" },
              paddingX: 2,
              paddingY: 4,
              rowGap: 2,
              background: { md: "white", xs: "#100D24" },
              display: "flex",
              flexDirection: "column",
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
            {loading || estimateDataFetching ? (
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
                <CircularProgress />
              </Box>
            ) : (
              <Grid
                container
                gap={1}
                sx={{ minHeight: "40vh", overflow: "auto", maxHeight: "60vh" }}
              >
                {layouts.map((layout) => (
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

                <Box sx={boxStyles}>
                  <Typography sx={{ font: "18px" }}>Custom</Typography>
                </Box>
              </Grid>
            )}
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <NavLink to="/Estimates">
                <Button
                  sx={{
                    width: 180,
                    color: "black",
                    border: "1px solid black",
                    fontSize: 18,
                    ml: 2,
                  }}
                  fullWidth
                  variant="outlined"
                >
                  {" "}
                  Back
                </Button>
              </NavLink>
              <Button
                disabled={selectedData?.length < 1}
                sx={{
                  width: 180,
                  backgroundColor: "#8477DA",
                  fontSize: 18,
                  "&:hover": { backgroundColor: "#8477DA" },
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
