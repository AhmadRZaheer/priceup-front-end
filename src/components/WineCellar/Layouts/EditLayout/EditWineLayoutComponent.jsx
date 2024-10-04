import { Check } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import "../style.scss";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { backendURL } from "@/utilities/common";
import CustomInputMenu from "@/components/ui-components/CustomInputMenu";
import { useFormik } from "formik";
import { setWineItemsStatusAfterFirstLoad } from "@/utilities/layouts";
import CustomInputField from "@/components/ui-components/CustomInput";
import AddMoreItems from "@/components/ShowerLayout/EditLayout/addMoreItems";
import { inputLength, inputMaxValue, thicknessTypes } from "@/utilities/constants";
import {
  useEditDocument,
  useFetchAllDocuments,
  useFetchSingleDocument,
} from "@/utilities/ApiHooks/common";

const EditWineLayoutComponent = () => {
  const routePrefix = `${backendURL}/wineCellars/layouts`;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const layoutId = searchParams.get("id");
  const [selectedlayoutId, setSelectedLayoutId] = useState("");
  const [pageLoading, setPageLoading] = useState(true);
  const [addMoreItemsArray, setAddMoreItemsArray] = useState({});
  const [mounting, setMounting] = useState(null);

  const { data: WineLayout, refetch: refetchAllWineLayouts } =
    useFetchAllDocuments(routePrefix);
  const {
    data: singleLayout,
    isFetching: isfetchingSingleLayout,
    refetch: refetchSingleLayout,
  } = useFetchSingleDocument(`${routePrefix}/${selectedlayoutId}`);
  const { mutate: updateWineLayout, isLoading } = useEditDocument();
  useEffect(() => {
    if (layoutId) {
      setSelectedLayoutId(layoutId);
    }
  }, [layoutId]);
  useEffect(() => {
    refetchAllWineLayouts();
    if (selectedlayoutId) {
      refetchSingleLayout();
    }
  }, [selectedlayoutId]);

  useEffect(() => {
    if (singleLayout) {
      const items = setWineItemsStatusAfterFirstLoad(singleLayout?.layoutData);
      setAddMoreItemsArray(items);
      setMounting({
        channelOrClamps:
          singleLayout?.layoutData?.settings?.channelOrClamps || "Channel",
        mountingChannel: singleLayout?.layoutData?.settings?.mountingChannel,
      });
      setPageLoading(false);
    }
  }, [singleLayout]);

  //Formik
  const initialValues = {
    image: singleLayout?.layoutData?.image,
    name: singleLayout?.layoutData?.name,
    handles: {
      handleType: singleLayout?.layoutData?.settings?.handles.handleType,
      count: singleLayout?.layoutData?.settings?.handles.count,
    },
    doorLock: {
      type: singleLayout?.layoutData?.settings?.doorLock.type,
      count: singleLayout?.layoutData?.settings?.doorLock.count,
    },
    heavyDutyOption: {
      heavyDutyType:
        singleLayout?.layoutData?.settings?.heavyDutyOption.heavyDutyType,
      height: singleLayout?.layoutData?.settings?.heavyDutyOption.height,
      threshold: singleLayout?.layoutData?.settings?.heavyDutyOption.threshold,
    },

    hardwareFinishes: singleLayout?.layoutData?.settings?.hardwareFinishes,

    hinges: {
      hingesType: singleLayout?.layoutData?.settings?.hinges?.hingesType,
      count: singleLayout?.layoutData?.settings?.hinges?.count,
    },

    channel: singleLayout?.layoutData?.settings?.mountingChannel,

    glassType: {
      type: singleLayout?.layoutData?.settings?.glassType?.type,
      thickness: singleLayout?.layoutData?.settings?.glassType?.thickness,
    },

    noOfHoursToCompleteSingleDoor:
      singleLayout?.layoutData?.settings?.noOfHoursToCompleteSingleDoor,

    other: {
      people: singleLayout?.layoutData?.settings?.other?.people,
      hours: singleLayout?.layoutData?.settings?.other?.hours,
    },
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log({ settings: { ...values, ...mounting } });
      handleUpdateLayout({ settings: { ...values, ...mounting } });
    },
  });

  const handleUpdateLayout = (values) => {
    const layoutData = {
      name: values.settings?.name,
      image: values.settings?.image,
      settings: {
        hardwareFinishes: values.settings?.hardwareFinishes,
        handles: {
          handleType: values.settings?.handles?.handleType,
          count: values.settings?.handles?.count,
        },
        hinges: {
          hingesType: values.settings?.hinges?.hingesType,
          count: values.settings?.hinges?.count,
        },
        heavyDutyOption: {
          heavyDutyType: values.settings?.heavyDutyOption?.heavyDutyType,
          threshold: values.settings?.heavyDutyOption?.threshold,
          height: values.settings?.heavyDutyOption?.height,
        },
        channelOrClamps: values.settings?.channelOrClamps,
        mountingChannel:
          values.settings?.channelOrClamps === "Channel"
            ? values.settings?.mountingChannel
            : null,
        glassType: {
          type: values.settings?.glassType?.type,
          thickness: values.settings?.glassType?.thickness,
        },
        doorLock: {
          type: values.settings?.doorLock?.type,
          count: values.settings?.doorLock?.count,
        },
        noOfHoursToCompleteSingleDoor:
          values?.settings?.noOfHoursToCompleteSingleDoor,
        other: {
          people: values.settings?.other?.people,
          hours: values.settings?.other?.hours,
        },
      },
    };
    updateWineLayout({
      apiRoute: `${routePrefix}/${layoutId}`,
      data: layoutData,
    });
  };
  const handleAddMoreItemClick = (id) => {
    switch (
      id // remove formik seelcted val
    ) {
      case "hardwareFinishes":
        if (addMoreItemsArray[id]?.status) {
          formik.setFieldValue("hardwareFinishes", null);
        }
        break;
      case "handles":
        if (addMoreItemsArray[id]?.status) {
          formik.setFieldValue("handles.handleType", null);
          formik.setFieldValue("handles.count", 0);
        }
        break;
      case "doorLock":
        if (addMoreItemsArray[id]?.status) {
          formik.setFieldValue("doorLock.type", null);
          formik.setFieldValue("doorLock.count", 0);
        }
        break;
      case "heavyDutyOption":
        if (addMoreItemsArray[id]?.status) {
          formik.setFieldValue("heavyDutyOption.heavyDutyType", null);
          formik.setFieldValue("heavyDutyOption.height", 0);
        }
        break;
      case "hinges":
        if (addMoreItemsArray[id]?.status) {
          formik.setFieldValue("hinges.hingesType", null);
          formik.setFieldValue("hinges.count", 0);
        }
        break;
      case "glassType":
        if (addMoreItemsArray[id]?.status) {
          formik.setFieldValue("glassType.type", null);
          // formik.setFieldValue('glassType.thickness', '0');
        }
        break;

      case "channel":
        if (addMoreItemsArray[id]?.status) {
          setMounting({
            channelOrClamps: "Channel",
            mountingChannel: null,
          });
        }
        break;
      default:
        break;
    }
    setAddMoreItemsArray((prevVal) => ({
      // update item status
      ...prevVal,
      [id]: {
        ...prevVal[id],
        status: !prevVal[id].status,
      },
    }));
  };

  const handleChangeLayout = (event) => {
    setSelectedLayoutId(event.target.value);
    navigate(`/wine-cellar/layouts/edit?id=${event.target.value}`);
  };

  const activeGlassThickness = formik.values.glassType.thickness;

  const channelAccordingToGlassThickness = useMemo(() => {
    let item = null;
    if (activeGlassThickness === thicknessTypes.ONEBYTWO) {
      item = singleLayout?.listData?.mountingChannel?.find(
        (item) => item.slug === "u-channel-1-2"
      );
    } else if (activeGlassThickness === thicknessTypes.THREEBYEIGHT) {
      item = singleLayout?.listData?.mountingChannel?.find(
        (item) => item.slug === "u-channel-3-8"
      );
    } else {
      // if returns empty value 0
      item = singleLayout?.listData?.mountingChannel?.find(
        (item) => item.slug === "u-channel-3-8"
      );
    }
    return item ? [item] : [];
  }, [activeGlassThickness, singleLayout?.listData]);

  return (
    <Box>
      <Box sx={{ display: "flex", gap: "12px" }}>
        <Box sx={{ display: "flex", gap: "5px" }}>
          <Typography className="layouttitle">Wine Cellar</Typography>
          <Typography className="layouttitle">/</Typography>
          <Typography
            onClick={() => navigate(`/wine-cellar/layouts`)}
            className="layouttitle"
            sx={{ color: "#000000", cursor: "pointer" }}
          >
            Layouts
          </Typography>
          <Typography className="layouttitle">/</Typography>
        </Box>
        <FormControl
          sx={{ width: "197px" }}
          size="small"
          className="custom-textfield"
        >
          <Select
            value={selectedlayoutId}
            size="small"
            labelId="demo-select-small-label"
            id="demo-select-small"
            sx={{ height: "40px", background: "#F6F5FF", width: "262px" }}
            onChange={handleChangeLayout}
            displayEmpty
            renderValue={(value) => {
              const selectedItem = WineLayout?.find(
                (item) => item?._id === value
              );
              return (
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontFamily: '"Roboto", sans-serif !important',
                    color: "#000000",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    textWrap: "nowrap",
                    pt: "2px",
                  }}
                >
                  {selectedItem?.name}
                </Typography>
              );
            }}
          >
            {WineLayout?.map((data, index) => (
              <MenuItem key={index} value={data?._id}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Typography sx={{ fontSize: "14px" }}>
                    {data?.name}
                  </Typography>
                  {data?._id === selectedlayoutId ? (
                    <Check sx={{ color: "#8477DA" }} />
                  ) : null}
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {isfetchingSingleLayout || pageLoading ? (
        <Box
          sx={{
            height: "60vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress sx={{ color: "#8477DA" }} />
        </Box>
      ) : (
        <>
          <form onSubmit={formik.handleSubmit}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                py: 3,
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: 400,
                  lineHeight: "23px",
                  color: "#000000",
                }}
              >
                {singleLayout?.layoutData?.name}
              </Typography>
              <Box>
                <Button
                  disabled={isLoading}
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: "#8477DA",
                    width: "88px",
                    height: "42px",
                    color: "white",
                    textTransform: "capitalize",
                    borderRadius: 1,
                    fontSize: 16,
                    fontWeight: 600,
                    padding: "10px 13px",
                    display: "box",
                    "&:hover": { backgroundColor: "#8477DA" },
                  }}
                >
                  {isLoading ? (
                    <CircularProgress size={22} sx={{ color: "#8477DA" }} />
                  ) : (
                    "Update"
                  )}
                </Button>
              </Box>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={5.2}>
                <Box
                  sx={{
                    width: { md: "auto", xs: "100%" },
                    background: "#F3F5F6",
                    border: "1px solid #D4DBDF",
                    p: "14px 30px",
                    borderRadius: "4px 4px 0px 0px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 700,
                      lineHeight: "21px",
                      color: "#000000",
                    }}
                  >
                    Layout
                  </Typography>
                </Box>
                <Box
                  sx={{
                    height: "808px",
                    border: "1px solid #D4DBDF",
                    px: { md: 2, xs: 1 },
                    background: "#FFFF",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={`${backendURL}/${singleLayout?.layoutData?.image}`}
                    alt="/"
                    style={{ width: "423px", height: "557px" }}
                  />
                </Box>
              </Grid>
              <Grid item xs={6.8}>
                <Box
                  sx={{
                    width: { md: "auto", xs: "100%" },
                    background: "#F3F5F6",
                    border: "1px solid #D4DBDF",
                    p: "14px 30px",
                    borderRadius: "4px 4px 0px 0px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 700,
                      lineHeight: "21px",
                      color: "#000000",
                    }}
                  >
                    Modifications
                  </Typography>
                </Box>
                <Box
                  sx={{
                    border: "1px solid #D0D5DD",
                    p: "24px 30px",
                    background: "#FFFF",
                    borderRadius: "0px 0px 12px 12px",
                  }}
                >
                  <Grid container spacing={2}>
                    {addMoreItemsArray?.hardwareFinishes?.status && (
                      <Grid item md={6} xs={12} sx={{ pb: 1 }}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "12px",
                          }}
                        >
                          <Typography className="modificationTitle">
                            Hardware Finishes
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "10px",
                            }}
                          >
                            <Box>
                              <CustomInputMenu
                                size="small"
                                variant="outlined"
                                name="hardwareFinishes"
                                color={"purple"}
                                fullWidth={true}
                                value={formik.values.hardwareFinishes || null}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                MenuData={
                                  singleLayout?.listData?.hardwareFinishes
                                }
                              />
                            </Box>
                          </Box>
                        </Box>
                      </Grid>
                    )}
                    {addMoreItemsArray?.handles?.status && (
                      <Grid item md={6} xs={12} sx={{ pb: 1 }}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "12px",
                          }}
                        >
                          <Typography className="modificationTitle">
                            Handles
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "10px",
                            }}
                          >
                            <CustomInputMenu
                              size="small"
                              variant="outlined"
                              name="handles.handleType"
                              fullWidth={true}
                              color={"purple"}
                              value={formik.values.handles.handleType || ""}
                              onChange={(e) => {
                                formik.handleChange(e);
                                if (e.target.value === null) {
                                  formik.setFieldValue("handles.count", 0);
                                }
                              }}
                              onBlur={formik.handleBlur}
                              MenuData={singleLayout?.listData?.handles}
                            />
                            <CustomInputField
                              type="number"
                              InputProps={{
                                inputProps: { min: 0 , max: inputMaxValue },
                              }}
                              size="small"
                              variant="outlined"
                              name="handles.count"
                              color={"purple"}
                              fullWidth={true}
                              value={
                                formik.values.handles.count !== undefined
                                  ? formik.values.handles.count
                                  : 0
                              }
                              onChange={(e)=>{
                                if (e.target.value.length <= inputLength) {
                                  formik.handleChange(e)
                                }
                              }}
                              onBlur={formik.handleBlur}
                            />
                          </Box>
                        </Box>
                      </Grid>
                    )}
                    {addMoreItemsArray?.glassType?.status && (
                      <Grid item md={6} xs={12} sx={{ pb: 1 }}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "12px",
                          }}
                        >
                          <Typography className="modificationTitle">
                            Glass Type
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "10px",
                            }}
                          >
                            <CustomInputMenu
                              color={"purple"}
                              size="small"
                              variant="outlined"
                              name="glassType.type"
                              fullWidth={true}
                              value={formik.values.glassType.type || ""}
                              onChange={(event) => {
                                formik.handleChange(event);

                                if (event.target.value === null) {
                                  formik.setFieldValue(
                                    "glassType.thickness",
                                    "0"
                                  );
                                }
                              }}
                              onBlur={formik.handleBlur}
                              MenuData={singleLayout?.listData?.glassType}
                            />
                            <TextField
                              select
                              size="small"
                              variant="outlined"
                              name="glassType.thickness"
                              style={{ width: "100%" }}
                              value={formik.values.glassType.thickness || ""}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              required={true}
                              className={"custom-textfield-purple"}
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  height: "40px",
                                },
                              }}
                            >
                              <MenuItem value="0">0</MenuItem>
                              <MenuItem key="1/2" value="1/2">
                                1/2
                              </MenuItem>
                              <MenuItem key="3/8" value="3/8">
                                3/8
                              </MenuItem>
                            </TextField>
                          </Box>
                        </Box>
                      </Grid>
                    )}
                    {addMoreItemsArray?.hinges?.status && (
                      <Grid item md={6} xs={12} sx={{ pb: 1 }}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "12px",
                          }}
                        >
                          <Typography className="modificationTitle">
                            Hinges
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "10px",
                            }}
                          >
                            <CustomInputMenu
                              color={"purple"}
                              size="small"
                              variant="outlined"
                              name="hinges.hingesType"
                              fullWidth={true}
                              value={formik.values.hinges.hingesType || ""}
                              onChange={(e) => {
                                formik.handleChange(e);

                                if (e.target.value === null) {
                                  formik.setFieldValue("hinges.count", 0);
                                }
                              }}
                              onBlur={formik.handleBlur}
                              MenuData={singleLayout?.listData?.hinges}
                            />
                            <CustomInputField
                              color={"purple"}
                              type="number"
                              InputProps={{
                                inputProps: { min: 0,max: inputMaxValue },
                              }}
                              size="small"
                              variant="outlined"
                              name="hinges.count"
                              fullWidth={true}
                              value={
                                formik.values.hinges.count !== undefined
                                  ? formik.values.hinges.count
                                  : 0
                              }
                              onChange={(e)=>{
                                if (e.target.value.length <= inputLength) {
                                  formik.handleChange(e)
                                 }
                              }                                 
                              }
                              onBlur={formik.handleBlur}
                            />
                          </Box>
                        </Box>
                      </Grid>
                    )}

                    {addMoreItemsArray?.doorLock?.status && (
                      <Grid item md={6} xs={12} sx={{ pb: 1 }}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "12px",
                          }}
                        >
                          <Typography className="modificationTitle">
                            Door Lock
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "10px",
                            }}
                          >
                            <CustomInputMenu
                              size="small"
                              variant="outlined"
                              name="doorLock.type"
                              fullWidth={true}
                              color={"purple"}
                              value={formik.values.doorLock.type || ""}
                              onChange={(e) => {
                                formik.handleChange(e);
                                if (e.target.value === null) {
                                  formik.setFieldValue("doorLock.type", 0);
                                }
                              }}
                              onBlur={formik.handleBlur}
                              MenuData={singleLayout?.listData?.doorLocks}
                            />
                            <CustomInputField
                              type="number"
                              InputProps={{
                                inputProps: { min: 0,max: inputMaxValue },
                              }}
                              size="small"
                              variant="outlined"
                              name="doorLock.count"
                              color={"purple"}
                              fullWidth={true}
                              value={
                                formik.values.doorLock.count !== undefined
                                  ? formik.values.doorLock.count
                                  : 0
                              }
                              onChange={(e)=>{
                                if (e.target.value.length <= inputLength) {
                                  formik.handleChange(e)
                                }
                              }}
                              onBlur={formik.handleBlur}
                            />
                          </Box>
                        </Box>
                      </Grid>
                    )}

                    {addMoreItemsArray?.heavyDutyOption?.status && (
                      <Grid item md={6} xs={12} sx={{ pb: 1 }}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "12px",
                          }}
                        >
                          <Typography className="modificationTitle">
                            Heavy Duty Option
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "10px",
                            }}
                          >
                            <CustomInputMenu
                              color={"purple"}
                              size="small"
                              variant="outlined"
                              name="heavyDutyOption.heavyDutyType"
                              fullWidth={true}
                              value={
                                formik.values.heavyDutyOption.heavyDutyType ||
                                ""
                              }
                              onChange={(e) => {
                                formik.handleChange(e);

                                if (e.target.value === null) {
                                  formik.setFieldValue(
                                    "heavyDutyOption.threshold",
                                    0
                                  );
                                  formik.setFieldValue(
                                    "heavyDutyOption.height",
                                    0
                                  );
                                }
                              }}
                              onBlur={formik.handleBlur}
                              MenuData={singleLayout?.listData?.heavyDutyOption}
                            />

                            <CustomInputField
                              color={"purple"}
                              type="number"
                              InputProps={{
                                inputProps: { min: 0 ,max: inputMaxValue},
                              }}
                              size="small"
                              variant="outlined"
                              placeholder={"height"}
                              name="heavyDutyOption.height"
                              fullWidth={true}
                              value={
                                formik.values.heavyDutyOption.height !==
                                undefined
                                  ? formik.values.heavyDutyOption.height
                                  : null
                              }
                               onChange={(e)=>{
                                if (e.target.value.length <= inputLength) {
                                  formik.handleChange(e)
                                }
                              }}
                              onBlur={formik.handleBlur}
                            />
                          </Box>
                        </Box>
                      </Grid>
                    )}

                    {addMoreItemsArray?.channel?.status && (
                      <Grid xs={6} sx={{ p: 1.8, pb: 1 }}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "12px",
                          }}
                        >
                          <Typography className="modificationTitle">
                            Channel
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "10px",
                            }}
                          >
                            {channelAccordingToGlassThickness?.map((item) => {
                              const isSelected =
                                mounting?.mountingChannel === item._id;
                              return (
                                <MenuItem
                                  key={item.id}
                                  onClick={() =>
                                    setMounting((prev) => ({
                                      ...prev,
                                      mountingChannel: isSelected
                                        ? null
                                        : item._id,
                                    }))
                                  }
                                  sx={{ padding: 0 }}
                                >
                                  <Box
                                    sx={{
                                      width: "100%",
                                      borderRadius: "8px",
                                      height: "46px",
                                      border: isSelected
                                        ? "1px solid #8477DA"
                                        : "1px solid #D4DBDF",
                                      background: isSelected
                                        ? "#8477DA0F"
                                        : "white",
                                      px: "8px",
                                      display: "flex",
                                      gap: 2,
                                      alignItems: "center",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <Box sx={{ display: "flex", gap: 2 }}>
                                      <img
                                        width="25px"
                                        height="25px"
                                        src={`${backendURL}/${item.image}`}
                                        alt={item.name}
                                      />
                                      <Typography>{item.name}</Typography>
                                    </Box>
                                  </Box>
                                </MenuItem>
                              );
                            })}
                          </Box>
                        </Box>
                      </Grid>
                    )}

                    <Grid item xs={12} sx={{ pb: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "12px",
                          width: "100%",
                        }}
                      >
                        <Typography className="modificationTitle">
                          Labor
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            gap: "16px",
                            width: "100%",
                          }}
                        >
                          <Box
                            sx={{
                              width: "50%",
                              display: "flex",
                              flexDirection: "column",
                              gap: "8px",
                            }}
                          >
                            {" "}
                            <Typography
                              className="modificationTitle"
                              sx={{ fontSize: 16 }}
                            >
                              People
                            </Typography>
                            <CustomInputField
                              color={"purple"}
                              size="small"
                              variant="outlined"
                              name="other.people"
                              type="number"
                              InputProps={{
                                inputProps: { min: 0,max: inputMaxValue },
                              }}
                              fullWidth={true}
                              value={formik.values.other.people}
                              onChange={(e)=>{
                                if (e.target.value.length <= inputLength) {
                                  formik.handleChange(e)
                                }
                              }}
                              onBlur={formik.handleBlur}
                            />
                          </Box>
                          <Box
                            sx={{
                              width: "50%",
                              display: "flex",
                              flexDirection: "column",
                              gap: "8px",
                            }}
                          >
                            {" "}
                            <Typography
                              className="modificationTitle"
                              sx={{ fontSize: 16 }}
                            >
                              Hours (Per Person)
                            </Typography>
                            <CustomInputField
                              color={"purple"}
                              size="small"
                              type="number"
                              InputProps={{
                                inputProps: { min: 0,max: inputMaxValue,step: "any", },
                              }}
                              variant="outlined"
                              name="other.hours"
                              fullWidth={true}
                              value={formik.values.other.hours}
                              onChange={(e)=>{
                                if (e.target.value.length <= inputLength) {
                                  formik.handleChange(e)
                                }
                              }}
                              onBlur={formik.handleBlur}
                            />
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            gap: "16px",
                            width: "100%",
                          }}
                        >
                          <Box
                            sx={{
                              width: "50%",
                              display: "flex",
                              flexDirection: "column",
                              gap: "8px",
                            }}
                          >
                            <Typography
                              className="modificationTitle"
                              sx={{ fontSize: 16 }}
                            >
                              Sinlgle Door Hours (Per Person)
                            </Typography>
                            <CustomInputField
                              color={"purple"}
                              size="small"
                              type="number"
                              InputProps={{
                                inputProps: { min: 0,max: inputMaxValue , step: "any",},
                              }}
                              variant="outlined"
                              name="noOfHoursToCompleteSingleDoor"
                              fullWidth={true}
                              value={
                                formik.values.noOfHoursToCompleteSingleDoor ?? 0
                              }
                              onChange={(e)=>{
                                if (e.target.value.length <= inputLength) {
                                  formik.handleChange(e)
                                }
                              }}
                              onBlur={formik.handleBlur}
                            />
                          </Box>
                          <Box
                            sx={{
                              width: "50%",
                              display: "flex",
                              flexDirection: "column",
                              gap: "8px",
                            }}
                        />
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                  <AddMoreItems
                    items={addMoreItemsArray}
                    handleItemClick={handleAddMoreItemClick}
                  />
                </Box>
              </Grid>
            </Grid>
          </form>
        </>
      )}
    </Box>
  );
};

export default EditWineLayoutComponent;
