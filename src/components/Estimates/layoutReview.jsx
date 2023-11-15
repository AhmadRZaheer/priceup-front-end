import React, { useMemo } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import MenuList from "./menuList";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Snackbars from "../Modal/snackBar";
import {
  getContent,
  getLayoutArea,
  getQuoteState,
  setInputContent,
  setNavigationDesktop,
  setTotal,
  getTotal,
  getMeasurementSide,
  getLayoutPerimeter,
  getQuoteId,
  setNavigation,
  setHardwarePrice,
  setGlassPrice,
  setGlassAddonsPrice,
  setFabricationPrice,
  setLaborPrice,
  resetState,
  selectedItem,
} from "../../redux/estimateCalculations";
import {
  useEditEstimates,
  useFetchDataEstimate,
} from "../../utilities/ApiHooks/estimate";
import Summary from "./summary";
import ChannelTypeDesktop from "./channelorClamp";
import { calculateTotal } from "../../utilities/common";
import { useNavigate } from "react-router-dom";
import { layoutVariants } from "../../utilities/constants";

const LayoutReview = ({ setClientDetailOpen }) => {
  const navigate = useNavigate();
  const {
    mutate: mutateEdit,
    isError: ErrorForAddEidt,
    isSuccess: CreatedSuccessfullyEdit,
  } = useEditEstimates();
  const estimatesContent = useSelector(getContent);
  const estimatesTotal = useSelector(getTotal);
  const measurements = useSelector(getMeasurementSide);
  const perimeter = useSelector(getLayoutPerimeter);
  const quoteId = useSelector(getQuoteId);
  const sqftArea = useSelector(getLayoutArea);
  const updatecheck = useSelector(getQuoteState);
  const selectedContent = useSelector(getContent);
  const selectedData = useSelector(selectedItem);
  const quoteActiveState = useMemo(() => {
    let state = "";
    if (updatecheck === "create") {
      state = selectedData?.settings?.variant;
    } else if (updatecheck === "edit") {
      state = selectedData?.layoutData?.variant;
    }
    return state;
  }, [updatecheck]);

  const dispatch = useDispatch();
  const handleEditEstimate = () => {
    const hardwareAddonsArray = estimatesContent?.hardwareAddons?.map((row) => {
      return {
        type: row.item._id,
        count: row.count,
      };
    });
    const wallClampArray = estimatesContent?.mountingClamps?.wallClamp?.map(
      (row) => {
        return {
          type: row.item._id,
          count: row.count,
        };
      }
    );
    const sleeveOverArray = estimatesContent?.mountingClamps?.sleeveOver?.map(
      (row) => {
        return {
          type: row.item._id,
          count: row.count,
        };
      }
    );
    const glassToGlassArray =
      estimatesContent?.mountingClamps?.glassToGlass?.map((row) => {
        return {
          type: row.item._id,
          count: row.count,
        };
      });
    const cornerWallClampArray =
      estimatesContent?.cornerClamps?.cornerWallClamp?.map((row) => {
        return {
          type: row.item._id,
          count: row.count,
        };
      });
    const cornerSleeveOverArray =
      estimatesContent?.cornerClamps?.cornerSleeveOver?.map((row) => {
        return {
          type: row.item._id,
          count: row.count,
        };
      });
    const cornerGlassToGlassArray =
      estimatesContent?.cornerClamps?.cornerGlassToGlass?.map((row) => {
        return {
          type: row.item._id,
          count: row.count,
        };
      });
    const glassAddonsArray = estimatesContent?.glassAddons?.map(
      (item) => item?._id
    );
    const estimate = {
      hardwareFinishes: estimatesContent?.hardwareFinishes?._id,
      handles: {
        type: estimatesContent?.handles?.item?._id,
        count: estimatesContent?.handles?.count,
      },
      hinges: {
        type: estimatesContent?.hinges?.item?._id,
        count: estimatesContent?.hinges?.count,
      },
      mountingClamps: {
        wallClamp: [...wallClampArray],
        sleeveOver: [...sleeveOverArray],
        glassToGlass: [...glassToGlassArray],
      },
      cornerClamps: {
        wallClamp: [...cornerWallClampArray],
        sleeveOver: [...cornerSleeveOverArray],
        glassToGlass: [...cornerGlassToGlassArray],
      },
      mountingChannel: estimatesContent?.mountingChannel?.item?._id || null,
      glassType: {
        type: estimatesContent?.glassType?.item?._id,
        thickness: estimatesContent?.glassType?.thickness,
      },
      glassAddons: [...glassAddonsArray],
      slidingDoorSystem: {
        type: estimatesContent?.slidingDoorSystem?.item?._id,
        count: estimatesContent?.slidingDoorSystem?.count,
      },
      header: {
        type: estimatesContent?.header?.item?._id,
        count: estimatesContent?.slidingDoorSystem?.count,
      },
      oneInchHoles: estimatesContent?.oneInchHoles,
      hingeCut: estimatesContent?.hingeCut,
      clampCut: estimatesContent?.clampCut,
      notch: estimatesContent?.notch,
      outages: estimatesContent?.outages,
      mitre: estimatesContent?.mitre,
      polish: estimatesContent?.polish,
      people: estimatesContent?.people,
      hours: estimatesContent?.hours,
      cost: Number(estimatesTotal),
      hardwareAddons: [...hardwareAddonsArray],
      sleeveOverCount: estimatesContent?.sleeveOverCount,
      towelBarsCount: estimatesContent?.sleeveOverCount,
      measurements: measurements,
      perimeter: perimeter,
      sqftArea: sqftArea,
    };

    mutateEdit({
      customerData: {},
      estimateData: estimate,
      id: quoteId,
    });
  };

  const quoteState = useSelector(getQuoteState);
  console.log(quoteState, "staet");
  const setHandleEstimatesPages = () => {
    dispatch(
      setNavigationDesktop(
        quoteState === "create"
          ? "measurments"
          : quoteState === "custom"
          ? "custom"
          : "existing"
      )
    );
  };
  const { data: estimatesData, refetch: Refetched } = useFetchDataEstimate();

  useEffect(() => {
    const prices = calculateTotal(
      selectedContent,
      sqftArea,
      estimatesData,
      quoteState
    );
    dispatch(setHardwarePrice(prices.hardwarePrice));
    dispatch(setGlassPrice(prices.glassPrice));
    dispatch(setGlassAddonsPrice(prices.glassAddonsPrice));
    dispatch(setFabricationPrice(prices.fabricationPrice));
    dispatch(setLaborPrice(prices.laborPrice));
    dispatch(setTotal(prices.total));
  }, [selectedContent]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const showSnackbar = (message, severity) => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };
  React.useEffect(() => {
    if (CreatedSuccessfullyEdit) {
      showSnackbar("Estimate Updated successfully", "success");
      // dispatch(resetState());
      dispatch(setNavigation("existing"));
      Refetched();
      navigate("/estimates");
    } else if (ErrorForAddEidt) {
      const errorMessage = ErrorForAddEidt.message || "An error occurred";
      showSnackbar(errorMessage, "error");
    }
  }, [CreatedSuccessfullyEdit, ErrorForAddEidt]);
  const closeSnackbar = () => {
    setSnackbar((prevState) => ({
      ...prevState,
      open: false,
    }));
  };

  const [summaryState, setSummaryState] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    window.addEventListener("resize", updateWindowWidth);

    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, []);

  return (
    <>
      <Box
        sx={{
          width: { xs: "100%", sm: 900 },
          margin: { sm: "auto", xs: 0 },
          display: "flex",
          alignItems: "center",
          height: { xs: "100vh", sm: "96vh" },
          flexDirection: "column",
          gap: 4,
          backgroundColor: { xs: "#08061B", sm: "white" },
        }}
      >
        <div style={{ width: "100%" }}>
          <Box
            sx={{
              backgroundColor: { xs: "#100D24", sm: "white" },
              backdropFilter: "blur(127px)",
              padding: { xs: "20px 15px", sm: "0px" },
              borderBottomRightRadius: { xs: "16px", sm: "0px" },
              borderBottomLeftRadius: { xs: "16px", sm: "0px" },
              display: "flex",
              alignItems: "center",
            }}
          >
            {/* <NavLink to="/estimates"> */}
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
            {/* </NavLink> */}

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
        </div>

        <Box
          sx={{
            width: "100%",
            margin: "auto",
            borderRadius: { sm: "12px", xs: 0 },
            boxShadow:
              "0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)",
            border: { sm: "1px solid #EAECF0", xs: "none" },
            paddingX: { sm: 2, xs: 0 },
            paddingY: 4,
            rowGap: 4,
            background: { sm: "white", xs: "#08061B" },
            display: "flex",
            flexDirection: "column",
            paddingTop: 2,
            marginBottom: 4.6,
          }}
        >
          <Box sx={{ width: { sm: "100%", xs: "90%" }, margin: "auto" }}>
            <Typography
              sx={{
                fontSize: { sm: "18px", xs: "18px" },
                color: { sm: "black", xs: "white" },
                paddingBottom: 1,
              }}
            >
              Summary
            </Typography>
            <Typography
              sx={{ color: { sm: "#667085", xs: "white" }, font: "14px" }}
            >
              Modify your estimate below to finalize the total price.
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              width: { sm: "96.5%", xs: "94%" },
              paddingY: { sm: 4, xs: 0 },
              paddingX: { sm: 2, xs: 0 },
              background: { sm: "rgba(217, 217, 217, 0.3)" },
              maxHeight: 1400,
              borderRadius: "8px",
              justifyContent: "space-between",
              flexDirection: { sm: "row", xs: "column" },
              margin: { sm: 0, xs: "auto" },
              overflow: "auto",
            }}
          >
            {summaryState || windowWidth > 600 ? (
              <Box
                sx={{
                  display: "flex",
                  width: { sm: "42%" },
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderBottom: {
                        sm: "2px solid #D0D5DD",
                        xs: "2px solid #423f57",
                      },
                      color: { sm: "black", xs: "white" },
                    }}
                  >
                    <Box sx={{ width: "100%" }}>
                      <MenuList
                        menuOptions={estimatesData?.hardwareFinishes}
                        title={"Hardware Finishes"}
                        type={"hardwareFinishes"}
                        showSnackbar={showSnackbar}
                        estimatesData={estimatesData}
                        currentItem={selectedContent?.hardwareFinishes}
                      />
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderBottom: {
                        sm: "2px solid #D0D5DD",
                        xs: "2px solid #423f57",
                      },
                    }}
                  >
                    <Box sx={{ width: "100%" }}>
                      <MenuList
                        menuOptions={estimatesData?.handles}
                        title={"Handles"}
                        type={"handles"}
                        showSnackbar={showSnackbar}
                        count={selectedContent.handles.count}
                        currentItem={selectedContent?.handles?.item}
                      />
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderBottom: {
                        sm: "2px solid #D0D5DD",
                        xs: "2px solid #423f57",
                      },
                    }}
                  >
                    <Box sx={{ width: "100%" }}>
                      <MenuList
                        menuOptions={estimatesData?.hinges}
                        title={"Hinges"}
                        type={"hinges"}
                        showSnackbar={showSnackbar}
                        count={selectedContent.hinges.count}
                        currentItem={selectedContent?.hinges?.item}
                      />
                    </Box>
                  </Box>
                  {![
                    layoutVariants.DOOR,
                    layoutVariants.DOUBLEDOOR,
                    layoutVariants.DOUBLEBARN,
                  ].includes(quoteActiveState) && (
                    <Box
                      sx={{
                        alignItems: "center",
                        borderBottom: {
                          sm: "2px solid #D0D5DD",
                          xs: "2px solid #423f57",
                        },
                      }}
                    >
                      <Box sx={{ width: "100%", display: "flex" }}>
                        <Box
                          sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <ChannelTypeDesktop
                            menuOptions={estimatesData?.channelOrClamps}
                            title={"Mounting"}
                            type={"mounting"}
                            showSnackbar={showSnackbar}
                            estimatesData={estimatesData}
                          />
                        </Box>
                      </Box>
                    </Box>
                  )}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderBottom: {
                        sm: "2px solid #D0D5DD",
                        xs: "2px solid #423f57",
                      },
                    }}
                  >
                    <Box sx={{ width: "100%" }}>
                      <MenuList
                        menuOptions={estimatesData?.glassType}
                        title={" Glass type"}
                        type={"glassType"}
                        showSnackbar={showSnackbar}
                        thickness={selectedContent.glassType.thickness}
                        currentItem={selectedContent?.glassType?.item}
                      />
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderBottom: {
                        sm: "2px solid #D0D5DD",
                        xs: "2px solid #423f57",
                      },
                    }}
                  >
                    <Box sx={{ width: "100%" }}>
                      <MenuList
                        menuOptions={estimatesData?.slidingDoorSystem}
                        title={"Sliding Door System"}
                        type={"slidingDoorSystem"}
                        showSnackbar={showSnackbar}
                        count={selectedContent.slidingDoorSystem.count}
                        currentItem={selectedContent?.slidingDoorSystem?.item}
                      />
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderBottom: {
                        sm: "2px solid #D0D5DD",
                        xs: "2px solid #423f57",
                      },
                    }}
                  >
                    <Box sx={{ width: "100%" }}>
                      <MenuList
                        menuOptions={estimatesData?.header}
                        title={"Header"}
                        type={"header"}
                        showSnackbar={showSnackbar}
                        count={selectedContent.header.count}
                        currentItem={selectedContent?.header?.item}
                      />
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderBottom: {
                        sm: "2px solid #D0D5DD",
                        xs: "2px solid #423f57",
                      },
                    }}
                  >
                    <Box sx={{ width: "100%" }}>
                      <MenuList
                        menuOptions={estimatesData?.glassAddons}
                        title={"Glass Addons"}
                        type={"glassAddons"}
                        showSnackbar={showSnackbar}
                        // currentItem={selectedContent?.glassAddons}
                      />
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderBottom: {
                        sm: "2px solid #D0D5DD",
                        xs: "2px solid #423f57",
                      },
                    }}
                  >
                    <Box sx={{ width: "100%" }}>
                      <MenuList
                        menuOptions={estimatesData?.hardwareAddons}
                        title={"Hardware Addons"}
                        type={"hardwareAddons"}
                        showSnackbar={showSnackbar}
                      />
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderBottom: {
                        sm: "2px solid #D0D5DD",
                        xs: "2px solid #423f57",
                      },
                      paddingLeft: 3,
                      paddingBottom: 1,
                      color: { sm: "#000000  ", xs: "white" },
                    }}
                  >
                    <Typography>1" Holes</Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        width: "120px",
                        padddingY: 4,
                      }}
                    >
                      <TextField
                        type="number"
                        InputProps={{
                          style: {
                            color: "black",
                            borderRadius: 10,
                            border: "1px solid #cccccc",
                            backgroundColor: "white",
                          },
                          inputProps: { min: 0 },
                        }}
                        InputLabelProps={{
                          style: {
                            color: "rgba(255, 255, 255, 0.5)",
                          },
                        }}
                        sx={{
                          color: { sm: "black", xs: "white" },
                          width: "100%",
                        }}
                        variant="outlined"
                        size="small"
                        value={selectedContent.oneInchHoles}
                        onChange={(event) =>
                          dispatch(
                            setInputContent({
                              type: "oneInchHoles",
                              value: event.target.value,
                            })
                          )
                        }
                      />
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderBottom: {
                        sm: "2px solid #D0D5DD",
                        xs: "2px solid #423f57",
                      },
                      paddingLeft: 3,
                      paddingBottom: 1,
                      color: { sm: "#000000  ", xs: "white" },
                    }}
                  >
                    <Typography>Hinge Cut Out</Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        width: "120px",
                        padddingY: 4,
                      }}
                    >
                      <TextField
                        type="number"
                        InputProps={{
                          style: {
                            color: "black",
                            borderRadius: 10,
                            border: "1px solid #cccccc",
                            backgroundColor: "white",
                          },
                          inputProps: { min: 0 },
                        }}
                        InputLabelProps={{
                          style: {
                            color: "rgba(255, 255, 255, 0.5)",
                          },
                        }}
                        sx={{
                          color: { sm: "black", xs: "white" },
                          width: "100%",
                        }}
                        variant="outlined"
                        size="small"
                        value={selectedContent.hingeCut}
                        onChange={(event) =>
                          dispatch(
                            setInputContent({
                              type: "hingeCut",
                              value: event.target.value,
                            })
                          )
                        }
                      />
                    </Box>
                  </Box>
                  {![
                    layoutVariants.DOOR,
                    layoutVariants.DOUBLEDOOR,
                    layoutVariants.DOUBLEBARN,
                  ].includes(quoteActiveState) && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderBottom: {
                          sm: "2px solid #D0D5DD",
                          xs: "2px solid #423f57",
                        },
                        paddingLeft: 3,
                        paddingBottom: 1,
                        color: { sm: "#000000  ", xs: "white" },
                      }}
                    >
                      <Typography>Clamp Cut Out</Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          width: "120px",
                          padddingY: 4,
                        }}
                      >
                        <TextField
                          type="number"
                          InputProps={{
                            style: {
                              color: "black",
                              borderRadius: 10,
                              border: "1px solid #cccccc",
                              backgroundColor: "white",
                            },
                            inputProps: { min: 0 },
                          }}
                          InputLabelProps={{
                            style: {
                              color: "rgba(255, 255, 255, 0.5)",
                            },
                          }}
                          sx={{
                            color: { sm: "black", xs: "white" },
                            width: "100%",
                          }}
                          variant="outlined"
                          size="small"
                          value={selectedContent.clampCut}
                          onChange={(event) =>
                            dispatch(
                              setInputContent({
                                type: "clampCut",
                                value: event.target.value,
                              })
                            )
                          }
                        />
                      </Box>
                    </Box>
                  )}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderBottom: {
                        sm: "2px solid #D0D5DD",
                        xs: "2px solid #423f57",
                      },
                      paddingLeft: 3,
                      paddingBottom: 1,
                      color: { sm: "#000000  ", xs: "white" },
                    }}
                  >
                    <Typography>Notch</Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        width: "120px",
                        padddingY: 4,
                      }}
                    >
                      <TextField
                        type="number"
                        InputProps={{
                          style: {
                            color: "black",
                            borderRadius: 10,
                            border: "1px solid #cccccc",
                            backgroundColor: "white",
                          },
                          inputProps: { min: 0 },
                        }}
                        InputLabelProps={{
                          style: {
                            color: "rgba(255, 255, 255, 0.5)",
                          },
                        }}
                        sx={{
                          color: { sm: "black", xs: "white" },
                          width: "100%",
                        }}
                        variant="outlined"
                        size="small"
                        value={selectedContent.notch}
                        onChange={(event) =>
                          dispatch(
                            setInputContent({
                              type: "notch",
                              value: event.target.value,
                            })
                          )
                        }
                      />
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderBottom: {
                        sm: "2px solid #D0D5DD",
                        xs: "2px solid #423f57",
                      },
                      paddingLeft: 3,
                      paddingBottom: 1,
                      color: { sm: "#000000  ", xs: "white" },
                    }}
                  >
                    <Typography>Outages</Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        width: "120px",
                        padddingY: 4,
                      }}
                    >
                      <TextField
                        type="number"
                        InputProps={{
                          style: {
                            color: "black",
                            borderRadius: 10,
                            border: "1px solid #cccccc",
                            backgroundColor: "white",
                          },
                          inputProps: { min: 0 },
                        }}
                        InputLabelProps={{
                          style: {
                            color: "rgba(255, 255, 255, 0.5)",
                          },
                        }}
                        sx={{
                          color: { sm: "black", xs: "white" },
                          width: "100%",
                        }}
                        variant="outlined"
                        size="small"
                        value={selectedContent.outages}
                        onChange={(event) =>
                          dispatch(
                            setInputContent({
                              type: "outages",
                              value: event.target.value,
                            })
                          )
                        }
                      />
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderBottom: {
                        sm: "2px solid #D0D5DD",
                        xs: "2px solid #423f57",
                      },
                      paddingLeft: 3,
                      paddingBottom: 1,
                      color: { sm: "#000000  ", xs: "white" },
                    }}
                  >
                    <Typography>Mitre</Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        width: "120px",
                        padddingY: 4,
                      }}
                    >
                      <TextField
                        type="number"
                        InputProps={{
                          style: {
                            color: "black",
                            borderRadius: 10,
                            border: "1px solid #cccccc",
                            backgroundColor: "white",
                          },
                          inputProps: { min: 0 },
                        }}
                        InputLabelProps={{
                          style: {
                            color: "rgba(255, 255, 255, 0.5)",
                          },
                        }}
                        sx={{
                          color: { sm: "black", xs: "white" },
                          width: "100%",
                        }}
                        variant="outlined"
                        size="small"
                        value={selectedContent.mitre}
                        onChange={(event) =>
                          dispatch(
                            setInputContent({
                              type: "mitre",
                              value: event.target.value,
                            })
                          )
                        }
                      />
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderBottom: {
                        sm: "2px solid #D0D5DD",
                        xs: "2px solid #423f57",
                      },
                      paddingLeft: 3,
                      paddingBottom: 1,
                      color: { sm: "#000000  ", xs: "white" },
                    }}
                  >
                    <Typography>Polish</Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        width: "120px",
                        padddingY: 4,
                      }}
                    >
                      <TextField
                        type="number"
                        InputProps={{
                          style: {
                            color: "black",
                            borderRadius: 10,
                            border: "1px solid #cccccc",
                            backgroundColor: "white",
                          },
                          inputProps: { min: 0 },
                        }}
                        InputLabelProps={{
                          style: {
                            color: "rgba(255, 255, 255, 0.5)",
                          },
                        }}
                        sx={{
                          color: { sm: "black", xs: "white" },
                          width: "100%",
                        }}
                        variant="outlined"
                        size="small"
                        value={selectedContent.polish}
                        onChange={(event) => {
                          dispatch(
                            setInputContent({
                              type: "polish",
                              value: event.target.value,
                            })
                          );
                        }}
                      />
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderBottom: {
                        sm: "2px solid #D0D5DD",
                        xs: "2px solid #423f57",
                      },
                      paddingLeft: 3,
                      paddingBottom: 1,
                      color: { sm: "#000000  ", xs: "white" },
                    }}
                  >
                    <Typography>People:</Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        width: "120px",
                        padddingY: 4,
                      }}
                    >
                      <TextField
                        type="number"
                        InputProps={{
                          style: {
                            color: "black",
                            borderRadius: 10,
                            border: "1px solid #cccccc",
                            backgroundColor: "white",
                          },
                          inputProps: { min: 0 },
                        }}
                        InputLabelProps={{
                          style: {
                            color: "rgba(255, 255, 255, 0.5)",
                          },
                        }}
                        sx={{
                          color: { sm: "black", xs: "white" },
                          width: "100%",
                        }}
                        variant="outlined"
                        size="small"
                        value={selectedContent.people}
                        onChange={(event) =>
                          dispatch(
                            setInputContent({
                              type: "people",
                              value: event.target.value,
                            })
                          )
                        }
                      />
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderBottom: {
                        sm: "2px solid #D0D5DD",
                        xs: "2px solid #423f57",
                      },
                      paddingLeft: 3,
                      paddingBottom: 1,
                      color: { sm: "#000000  ", xs: "white" },
                    }}
                  >
                    <Typography>Hours:</Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        width: "120px",
                        padddingY: 4,
                      }}
                    >
                      <TextField
                        type="number"
                        InputProps={{
                          style: {
                            color: "black",
                            borderRadius: 10,
                            border: "1px solid #cccccc",
                            backgroundColor: "white",
                          },
                          inputProps: { min: 0 },
                        }}
                        InputLabelProps={{
                          style: {
                            color: "rgba(255, 255, 255, 0.5)",
                          },
                        }}
                        sx={{
                          color: { sm: "black", xs: "white" },
                          width: "100%",
                        }}
                        variant="outlined"
                        size="small"
                        value={selectedContent.hours}
                        onChange={(event) =>
                          dispatch(
                            setInputContent({
                              type: "hours",
                              value: event.target.value,
                            })
                          )
                        }
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            ) : (
              ""
            )}

            {/* Buttons */}
            {summaryState && windowWidth < 600 ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: { sm: "96%" },
                  paddingX: 2,
                  marginY: 3,
                }}
              >
                <Box sx={{ width: "150px" }}>
                  <Button
                    fullWidth
                    onClick={setHandleEstimatesPages}
                    sx={{
                      boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
                      color: "#344054",
                      textTransform: "initial",
                      border: "1px solid #D0D5DD",
                      backgroundColor: { sm: "transparent", xs: "white" },
                    }}
                  >
                    {" "}
                    Back
                  </Button>
                </Box>
                <Box sx={{ width: "150px" }}>
                  <Button
                    fullWidth
                    disabled={selectedContent?.hardwareFinishes === null}
                    variant="contained"
                    onClick={() => {
                      setSummaryState(false);
                    }}
                    sx={{
                      backgroundColor: "#8477da",
                      "&:hover": {
                        backgroundColor: "#8477da",
                      },
                    }}
                  >
                    {" "}
                    Next
                  </Button>
                </Box>
              </Box>
            ) : (
              ""
            )}

            {!summaryState || windowWidth > 600 ? (
              <Box sx={{ width: { sm: "46%" } }}>
                <Summary />
              </Box>
            ) : (
              ""
            )}
          </Box>

          {/* Buttons */}
          {!summaryState || windowWidth > 600 ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: { sm: "96%" },
                paddingX: 2,
              }}
            >
              <Box sx={{ width: "150px" }}>
                <Button
                  fullWidth
                  onClick={
                    summaryState
                      ? setHandleEstimatesPages
                      : () => {
                          setSummaryState(true);
                        }
                  }
                  sx={{
                    boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
                    color: "#344054",
                    textTransform: "initial",
                    border: "1px solid #D0D5DD",
                    backgroundColor: { sm: "transparent", xs: "white" },
                  }}
                >
                  {" "}
                  Back
                </Button>
              </Box>
              <Box sx={{ width: "150px" }}>
                <Button
                  fullWidth
                  disabled={selectedContent?.hardwareFinishes === null}
                  variant="contained"
                  onClick={() => {
                    if (["create", "custom"].includes(updatecheck)) {
                      setClientDetailOpen(true);
                    } else {
                      handleEditEstimate();
                      showSnackbar("Estimate Edit successfully", "success");
                    }
                  }}
                  sx={{
                    backgroundColor: "#8477da",
                    "&:hover": {
                      backgroundColor: "#8477da",
                    },
                  }}
                >
                  {" "}
                  Next
                </Button>
              </Box>
            </Box>
          ) : (
            ""
          )}
        </Box>

        <Snackbars
          open={snackbar.open}
          message={snackbar.message}
          severity={snackbar.severity}
          closeSnackbar={closeSnackbar}
        />
      </Box>
    </>
  );
};

export default LayoutReview;
