import { useState } from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import {
  NavLink,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

import ShowerImg from '@/Assets/CustomerLandingImages/Showers.svg';
import WineCallerImg from '@/Assets/CustomerLandingImages/wineCellar.svg';
import {
  addSelectedItem,
  getQuoteState,
  resetNotifications,
  selectedItem,
  setDoorWidth,
  setQuoteState,
  updateMeasurements,
} from '@/redux/customEstimateSlice';
import { setEstimateCategory } from '@/redux/estimateSlice';
import { EstimateCategory } from '@/utilities/constants';
import { CheckCircle } from '@mui/icons-material';
import {
  Box,
  Button,
  Grid,
  Typography,
  useMediaQuery,
} from '@mui/material';

export const CustomCategoryLayouts = () => {
  const boxStyles = {
    minHeight: "182px",
    minWidth: "170px",
    // margin: "auto",
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

  // const {
  //   data: layouts,
  //   isFetched,
  //   refetch,
  // } = useFetchAllDocuments(`${backendURL}/layouts/for-estimate`);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const selectedData = useSelector(selectedItem);
  const quoteState = useSelector(getQuoteState);
  const projectId = searchParams.get("projectId");
  const category = searchParams.get("category");
  const iphoneSe = useMediaQuery("(max-width: 375px)");
  const iphone14Pro = useMediaQuery("(max-width: 430px)");

  const [customLayout, setCustomLayout] = useState("");
  const handleBoxClick = (layoutCategory) => {
    setCustomLayout(layoutCategory);
    dispatch(addSelectedItem(null));
    dispatch(setQuoteState("custom"));
    dispatch(setEstimateCategory(layoutCategory));
  };
  const setStorePage = () => {
    dispatch(resetNotifications());
    dispatch(updateMeasurements([]));
    dispatch(setDoorWidth(0));
    navigate(
      `/estimates/dimensions?category=${customLayout}&projectId=${projectId}&estimateState=${quoteState}&layoutId=null`
    );
  };

  return (
    <Box
      sx={{
        width: "100%",
        background: { sm: "#F6F5FF", xs: "#08061B" },
      }}
    >
      <Box style={{ paddingBottom: "10px" }}>
        <Box
          sx={{
            backgroundColor: { xs: "#100D24", sm: "#F6F5FF" },
            padding: { xs: "10px", sm: "0px" },
            borderBottomRightRadius: { xs: "16px", sm: "0px" },
            borderBottomLeftRadius: { xs: "16px", sm: "0px" },
            display: "flex",
            alignItems: "center",
            marginTop: { sm: 0, xs: 8 },
          }}
        >
          <NavLink to={`/projects/${projectId}?category=${category}`}>
            <Box
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
              fontSize: "24px",
              textAlign: { xs: "start", sm: "center" },
              fontWeight: 600,
              mb: { sm: 1 },
            }}
          >
            Create New Estimate
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          height: iphoneSe ? 440 : iphone14Pro ? 670 : "auto",
          overflow: "hidden",
          borderRadius: "12px",

          border: { sm: " 1px solid rgba(208, 213, 221, 1)", xs: "none" },

          background: { sm: "white", xs: "#08061B" },
        }}
      >
        <Box
          px={"25px"}
          py={"19px"}
          bgcolor={"white"}
          sx={{
            borderBottom: " 1px solid rgba(208, 213, 221, 1)",
            display: { sm: "block", xs: "none" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: { md: "#101828", xs: "white" },
                  paddingBottom: 0.5,
                  fontWeight: 700,
                }}
              >
                Select Category For Custom
              </Typography>
              <Typography
                sx={{
                  color: { md: "#667085", xs: "white" },
                  font: "14px",
                  fontWeight: 600,
                }}
              >
                Your new project has been created. Invite colleagues to
                collaborate on this project.
              </Typography>
            </Box>

            {/* <CustomInputField
              id="input-with-icon-textfield"
              placeholder="Search layout"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={icon} alt="search input" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment
                    position="start"
                    onClick={() => setSearch("")}
                    style={{ width: "21px", height: "21px" }}
                  >
                    {search !== "" && <Close sx={{ cursor: "pointer" }} />}
                  </InputAdornment>
                ),
              }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            /> */}
          </Box>
        </Box>
        <Box sx={{ p: 2, background: "#F6F5FF" }}>
          {/* {!isFetched ? (
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
          ) : ( */}
          <Grid
            container
            // spacing={2}
            gap={3}
            sx={{
              minHeight: "55vh",
              overflow: "auto",
              maxHeight: "55vh",
              width: "100%",
              // m: "auto",
            }}
          >
            <Box
              key={"showers-cat"}
              sx={{
                ...boxStyles,
                backgroundColor:
                  customLayout === EstimateCategory.SHOWERS
                    ? "rgba(132, 119, 218, 1)"
                    : "#b8b8b9",
                color: "black",
                width: "170px",
                height: "195px",
                border:
                  customLayout === EstimateCategory.SHOWERS
                    ? "1px solid rgba(132, 119, 218, 1)"
                    : "1px solid rgba(208, 213, 221, 1)",
                position: "relative",
              }}
              onClick={() => handleBoxClick(EstimateCategory.SHOWERS)}
            >
              {customLayout === EstimateCategory.SHOWERS && (
                <Box
                  sx={{
                    position: "absolute",
                    right: "10px",
                    top: "10px",
                  }}
                >
                  <CheckCircle
                    sx={{
                      color: "white",
                      width: "21px",
                      height: "21px",
                    }}
                  />
                </Box>
              )}
              <img
                style={{
                  position: "relative",
                  zIndex: 1,
                  width: "345px",
                  height: "209px",
                   marginTop:'-36px'
                }}
                src={ShowerImg}
                alt="Selected"
              />
              <Typography
                sx={{
                  fontSize: "18px",
                    fontWeight: 500,
                  lineHeight: "21.86px",
                  color: "white",
                  mt:'-28px'
                }}
              >
                Showers
              </Typography>
            </Box>
            <Box
              key={"wineCellar-cat"}
              sx={{
                ...boxStyles,
                backgroundColor:
                  customLayout === EstimateCategory.WINECELLARS
                    ? "rgba(132, 119, 218,1)"
                    : "#b8b8b9",
                color: "black",
                width: "170px",
                height: "195px",
                border:
                  customLayout === EstimateCategory.WINECELLARS
                    ? "1px solid rgba(132, 119, 218, 1)"
                    : "1px solid rgba(208, 213, 221, 1)",
                position: "relative",
              }}
              onClick={() => handleBoxClick(EstimateCategory.WINECELLARS)}
            >
              {customLayout === EstimateCategory.WINECELLARS && (
                <Box
                  sx={{
                    position: "absolute",
                    right: "10px",
                    top: "10px",
                  }}
                >
                  <CheckCircle
                    sx={{
                      color: "white",
                      width: "21px",
                      height: "21px",
                    }}
                  />
                </Box>
              )}
              <img
                style={{
                  position: "relative",
                  zIndex: 1,
                  width: "150px",
                  height: "170px",
                }}
                src={WineCallerImg}
                alt="Selected"
              />
              <Typography
                sx={{
                  fontSize: "18px",
                  fontWeight: 500,
                  lineHeight: "21.86px",
                  color: "white",
                }}
              >
                Wine Cellar
              </Typography>
            </Box>
          </Grid>
          {/* // )} */}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: { sm: "flex-end", xs: "space-between" },
            position: { sm: "static", xs: "fixed" },
            gap: { sm: 2 },
            bottom: 0,
            left: 0,
            width: { sm: "auto", xs: "100%" },
            p: { sm: 0, xs: 2 },
            px: { sm: "25px" },
            py: { sm: "19px" },
            bgcolor: { sm: "white", xs: "#08061B" },
          }}
        >
          <NavLink to={`/projects/${projectId}`}>
            <Button
              sx={{
                width: { xs: 120, sm: 260 },
                color: "rgba(132, 119, 218, 1)",
                fontSize: 16,
                // ml: 2,
                backgroundColor: "white",
                border: "1px solid rgba(132, 119, 218, 1)",
                lineHeight: "21.86px",
                ":hover": {
                  border: "1px solid rgba(132, 119, 218, 1)",
                  background: "white",
                },
              }}
              fullWidth
              variant="outlined"
            >
              {" "}
              Back
            </Button>
          </NavLink>
          <Button
            disabled={selectedData || customLayout.length ? false : true}
            sx={{
              width: { xs: 120, sm: 260 },
              backgroundColor: "#8477DA",
              fontSize: 16,
              "&:hover": { backgroundColor: "#8477DA" },
              ":disabled": {
                bgcolor: "#c2c2c2",
              },
              mr: { sm: 0, xs: "30px" },
              color: "white",
              lineHeight: "21.86px",
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
  );
};
