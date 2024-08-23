import {
  Box,
  Button,
  CircularProgress,
  Grid,
  InputAdornment,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { backendURL } from "@/utilities/common";
import { useDispatch, useSelector } from "react-redux";
import { useFetchDataDefault } from "@/utilities/ApiHooks/defaultLayouts";
import {
  addSelectedItem,
  getProjectId,
  // initializeStateForCreateQuote,
  // initializeStateForCustomQuote,
  selectedItem,
  setDoorWidth,
  // setNavigationDesktop,
  setQuoteState,
  setisCustomizedDoorWidth,
  updateMeasurements,
} from "@/redux/estimateCalculations";
import { useEffect, useMemo, useState } from "react";
import bgCustom from "@/Assets/customlayoutimage.svg";
import CustomInputField from "@/components/ui-components/CustomInput";
import { CheckCircle, Close } from "@mui/icons-material";
import icon from "../../../Assets/search-icon.svg";

export const ShowerLayouts = () => {
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedData = useSelector(selectedItem);
  const projectId = useSelector(getProjectId);

  const iphoneSe = useMediaQuery("(max-width: 375px)");
  const iphone14Pro = useMediaQuery("(max-width: 430px)");
  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {
    if (layouts) {
      const data = [...layouts, { id: 3213412321, name: "Custom" }];
      const result = data.filter((item) =>
        item.name.toLowerCase().includes(search?.toLowerCase() || "")
      );
      return result;
    }
    return [];
  }, [layouts, search]);

  const handleBoxClick = (layout) => {
    dispatch(setisCustomizedDoorWidth(false));
    dispatch(addSelectedItem(layout));
    dispatch(setQuoteState("create"));
    setselectCustom(false);
  };
  const setStorePage = () => {
    dispatch(updateMeasurements([])); // reset measurement array on shifting layout
    dispatch(setDoorWidth(0));
    navigate("/estimates/dimensions");
    // if (selectCustom) {
    //     dispatch(setNavigationDesktop("custom"));
    // } else dispatch(setNavigationDesktop("measurements"));
  };
  const [selectCustom, setselectCustom] = useState(false);
  const handleselectcustom = () => {
    // dispatch(initializeStateForCustomQuote());
    dispatch(addSelectedItem(null));
    dispatch(setQuoteState("custom"));
    setselectCustom(true);
  };
  // const handleBack = () => {
  //     dispatch(setNavigationDesktop("existing"));
  // };
  useEffect(() => {
    refetch();
  }, []);
  return (
    <Box
      sx={{
        width: "100%",
        // display: "flex",
        // alignItems: "center",
        // justifyContent: "center",
        // height: "100vh",
        background: { sm: "#F6F5FF", xs: "#08061B" },
        // padding: 2,
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
          <NavLink to={`/projects/${projectId}`}>
            <Box
              // onClick={handleBack}
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
              mb: {sm: 1}
            }}
            // variant="h4"
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
          //   boxShadow:
          //     "0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)",
          border: { sm: " 1px solid rgba(208, 213, 221, 1)", xs: "none" },
          //   paddingX: 2,
          //   paddingY: 4,
          //   rowGap: 2,
          background: { sm: "white", xs: "#08061B" },
          //   display: "flex",
          //   flexDirection: "column",
          width: { sm: "calc(100vw - 380px)" },
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
                Select Layout
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

            <CustomInputField
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
            />
          </Box>
        </Box>
        <Box sx={{ p: 2, background: "#F6F5FF" }}>
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
              // spacing={2}
              gap={1}
              sx={{
                minHeight: "60vh",
                overflow: "auto",
                maxHeight: "60vh",
                width: "100%",
                m: "auto",
              }}
            >
              {filteredData.length > 0 ? (
                filteredData.map((layout) => {
                  const isSelected =
                    layout.name === "Custom"
                      ? selectCustom
                      : selectedData?._id === layout._id;
                  const image =
                    layout.name === "Custom"
                      ? bgCustom
                      : `${backendURL}/${layout?.image}`;
                  const handleClick =
                    layout.name === "Custom"
                      ? handleselectcustom
                      : () => handleBoxClick(layout);

                  return (
                    <Box
                      key={layout._id}
                      sx={{
                        ...boxStyles,
                        backgroundColor: isSelected
                          ? "rgba(132, 119, 218, 0.1)"
                          : "white",
                        color: "black",
                        width: "255px",
                        height: "309px",
                        border: isSelected
                          ? "1px solid rgba(132, 119, 218, 1)"
                          : "1px solid rgba(208, 213, 221, 1)",
                        position: "relative",
                      }}
                      onClick={handleClick}
                    >
                      {isSelected && (
                        <Box
                          sx={{
                            position: "absolute",
                            right: "10px",
                            top: "10px",
                          }}
                        >
                          <CheckCircle
                            sx={{
                              color: "rgba(132, 119, 218, 1)",
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
                          width: "200px",
                          height: "255px",
                        }}
                        src={image}
                        alt={layout.name}
                      />
                      <Typography sx={{ font: "16px", fontWeight: 600 }}>
                        {layout.name}
                      </Typography>
                    </Box>
                  );
                })
              ) : (
                <Typography
                  className="disabled-text"
                  sx={{
                    fontSize: "14px",
                    display: "flex",
                    height: "60vh",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  no Layout Found
                </Typography>
              )}

              {/* <Box
                onClick={handleselectcustom}
                sx={{
                  ...boxStyles,
                  backgroundColor: selectCustom
                    ? "rgba(132, 119, 218, 0.1)"
                    : "white",
                  color: "black",
                  position: "relative",
                  width: "255px",
                  height: "309px",
                  border: selectCustom
                    ? "1px solid rgba(132, 119, 218, 1)"
                    : "1px solid rgba(208, 213, 221, 1)",
                }}
              >
                {selectCustom && (
                  <Box
                    sx={{ position: "absolute", right: "10px", top: "10px" }}
                  >
                    <CheckCircle
                      sx={{
                        color: "rgba(132, 119, 218, 1)",
                        width: "21px",
                        height: "21px",
                      }}
                    />
                  </Box>
                )}
                <img
                  style={{
                    zIndex: 1,
                    width: "200px",
                    height: "255px",
                  }}
                  src={bgCustom}
                  alt="custom image"
                />
                <Typography sx={{ font: "16px", fontWeight: 600 }}>
                  Custom
                </Typography>
              </Box> */}
            </Grid>
          )}
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
              // onClick={handleBack}
            >
              {" "}
              Back
            </Button>
          </NavLink>
          <Button
            disabled={selectedData || selectCustom ? false : true}
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
