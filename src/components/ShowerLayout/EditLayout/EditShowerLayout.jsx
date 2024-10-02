import {
  // Accordion,
  // AccordionDetails,
  // AccordionSummary,
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
import React, { useEffect, useState } from "react";
// import image from "../../../Assets/DoorImg.png";
import "../style.scss";
import CheckIcon from "@mui/icons-material/Check";
// import ModificationItem from "./ModificationItem";

import { useNavigate, useSearchParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { getDefaultId } from "@/redux/defaultSlice";
import {
  useEditDefault
} from "@/utilities/ApiHooks/defaultLayouts";
import { backendURL } from "@/utilities/common";
import { useFormik } from "formik";
import CustomInputMenu from "@/components/ui-components/CustomInputMenu";
import CustomInputField from "@/components/ui-components/CustomInput";
import MountingSection from "../MountingSection";
import { useFetchAllDocuments, useFetchSingleDocument } from "@/utilities/ApiHooks/common";
import AddMoreItems from "./addMoreItems";
import { setItemsStatusAfterFirstLoad } from "@/utilities/layouts";
import { inputLength, inputMaxValue } from "@/utilities/constants";

const routePrefix = `${backendURL}/layouts`;

const EditShowerLayout = () => {
  const [searchParams] = useSearchParams();
  const layoutId = searchParams.get("id");
  const [addMoreItemsArray, setAddMoreItemsArray] = useState({});
  const [selectedlayoutId, setSelectedLayoutId] = useState('');
  const [pageLoading, setPageLoading] = useState(true);
  const navigate = useNavigate();

  const {
    data: allLayouts,
    refetch: refetchAllLayouts,
  } = useFetchAllDocuments(routePrefix);

  const {
    data: singleLayout,
    isFetching: isfetchingSingleLayout,
    refetch: refetchSingleLayout,
  } = useFetchSingleDocument(`${routePrefix}/${selectedlayoutId}`)

  const { mutate: updateDefault, isSuccess: SuccessForEdit } = useEditDefault();

  const [mounting, setMounting] = useState(null);

  const handleChangeLayout = (event) => {
    setSelectedLayoutId(event.target.value);
    navigate(`/layouts/edit?id=${event.target.value}`);
  };

  const initialValues = {
    image: singleLayout?.layoutData?.image,
    name: singleLayout?.layoutData?.name,
    handles: {
      handleType: singleLayout?.layoutData?.settings?.handles.handleType,
      count: singleLayout?.layoutData?.settings?.handles.count,
    },

    hardwareFinishes: singleLayout?.layoutData?.settings?.hardwareFinishes,

    hinges: {
      hingesType: singleLayout?.layoutData?.settings?.hinges?.hingesType,
      count: singleLayout?.layoutData?.settings?.hinges?.count,
    },
    pivotHingeOption: {
      pivotHingeType:
        singleLayout?.layoutData?.settings?.pivotHingeOption.pivotHingeType,
      count: singleLayout?.layoutData?.settings?.pivotHingeOption.count,
    },
    heavyDutyOption: {
      heavyDutyType:
        singleLayout?.layoutData?.settings?.heavyDutyOption.heavyDutyType,
      height: singleLayout?.layoutData?.settings?.heavyDutyOption.height,
      threshold: singleLayout?.layoutData?.settings?.heavyDutyOption.threshold,
    },
    heavyPivotOption: {
      heavyPivotType:
        singleLayout?.layoutData?.settings?.heavyPivotOption.heavyPivotType,
      height: singleLayout?.layoutData?.settings?.heavyPivotOption.height,
      threshold:
        singleLayout?.layoutData?.settings?.heavyPivotOption.threshold,
    },
    channelOrClamps: singleLayout?.layoutData?.settings?.channelOrClamps,
    mountingChannel: singleLayout?.layoutData?.settings?.mountingChannel,

    cornerGlassToGlass: {
      glassToGlassType:
        singleLayout?.layoutData?.settings.cornerGlassToGlass
          ?.glassToGlassType,

      count: singleLayout?.layoutData?.settings.cornerGlassToGlass?.count,
    },
    cornerWallClamp: {
      wallClampType:
        singleLayout?.layoutData?.settings.cornerWallClamp?.wallClampType,

      count: singleLayout?.layoutData?.settings.cornerWallClamp?.count,
    },
    cornerSleeveOver: {
      sleeveOverType:
        singleLayout?.layoutData?.settings.cornerSleeveOver?.sleeveOverType,
      count: singleLayout?.layoutData?.settings.cornerSleeveOver?.count,
    },

    glassToGlass: {
      glassToGlassType:
        singleLayout?.layoutData?.settings.glassToGlass?.glassToGlassType,

      count: singleLayout?.layoutData?.settings.glassToGlass?.count,
    },
    wallClamp: {
      wallClampType:
        singleLayout?.layoutData?.settings.wallClamp?.wallClampType,

      count: singleLayout?.layoutData?.settings.wallClamp?.count,
    },
    sleeveOver: {
      sleeveOverType:
        singleLayout?.layoutData?.settings.sleeveOver?.sleeveOverType,
      count: singleLayout?.layoutData?.settings.sleeveOver?.count,
    },
    glassType: {
      type: singleLayout?.layoutData?.settings?.glassType?.type,
      thickness: singleLayout?.layoutData?.settings?.glassType?.thickness,
    },
    slidingDoorSystem: {
      type: singleLayout?.layoutData?.settings?.slidingDoorSystem.type,
      count: singleLayout?.layoutData?.settings?.slidingDoorSystem.count,
    },
    outages: singleLayout?.layoutData?.settings?.outages,
    transom: singleLayout?.layoutData?.settings?.transom,
    header: singleLayout?.layoutData?.settings?.header,
    glassAddon: singleLayout?.layoutData?.settings?.glassAddon,
    notch: singleLayout?.layoutData?.settings?.notch,

    other: {
      people: singleLayout?.layoutData?.settings?.other?.people,
      hours: singleLayout?.layoutData?.settings?.other?.hours,
    },
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      updateDefault({ settings: { ...values, ...mounting }, id: layoutId });
    },
  });

  const handleAddMoreItemClick = (id) => {
    switch (id) { // remove formik seelcted val
      case 'hardwareFinishes':
        if (addMoreItemsArray[id]?.status) {
          formik.setFieldValue('hardwareFinishes', null);
        }
        break;
      case 'handles':
        if (addMoreItemsArray[id]?.status) {
          formik.setFieldValue('handles.handleType', null);
          formik.setFieldValue('handles.count', 0);
        }
        break;
      case 'hinges':
        if (addMoreItemsArray[id]?.status) {
          formik.setFieldValue('hinges.hingesType', null);
          formik.setFieldValue('hinges.count', 0);
        }
        break;
      case 'pivotHingeOption':
        if (addMoreItemsArray[id]?.status) {
          formik.setFieldValue('pivotHingeOption.pivotHingeType', null);
          formik.setFieldValue('pivotHingeOption.count', 0);
        }
        break;
      case 'heavyDutyOption':
        if (addMoreItemsArray[id]?.status) {
          formik.setFieldValue('heavyDutyOption.heavyDutyType', null);
          formik.setFieldValue('heavyDutyOption.height', 0);
        }
        break;
      case 'heavyPivotOption':
        if (addMoreItemsArray[id]?.status) {
          formik.setFieldValue('heavyPivotOption.heavyPivotType', null);
          formik.setFieldValue('heavyPivotOption.height', 0);
          formik.setFieldValue('heavyPivotOption.threshold', 0);
        }
        break;
      case 'glassType':
        if (addMoreItemsArray[id]?.status) {
          formik.setFieldValue('glassType.type', null);
          // formik.setFieldValue('glassType.thickness', '0');
        }
        break;
      case 'slidingDoorSystem':
        if (addMoreItemsArray[id]?.status) {
          formik.setFieldValue('slidingDoorSystem.type', null);
          formik.setFieldValue('slidingDoorSystem.count', 0);
        }
        break;
      case 'outages':
        if (addMoreItemsArray[id]?.status) {
          formik.setFieldValue('outages', 0);
        }
        break;
      case 'transom':
        if (addMoreItemsArray[id]?.status) {
          formik.setFieldValue('transom', null);
        }
        break;
      case 'header':
        if (addMoreItemsArray[id]?.status) {
          formik.setFieldValue('header', null);
        }
        break;
      case 'glassAddon':
        if (addMoreItemsArray[id]?.status) {
          formik.setFieldValue('glassAddon', null);
        }
        break;
      case 'notch':
        if (addMoreItemsArray[id]?.status) {
          formik.setFieldValue('notch', 0);
        }
        break;
      case 'mounting':
        if (addMoreItemsArray[id]?.status) {
          setMounting({
            channelOrClamps: 'Channel',
            mountingChannel: null,
            wallClamp: { wallClampType: null, count: 0 },
            sleeveOver: { sleeveOverType: null, count: 0 },
            glassToGlass: { glassToGlassType: null, count: 0 },
            cornerWallClamp: { wallClampType: null, count: 0 },
            cornerSleeveOver: { sleeveOverType: null, count: 0 },
            cornerGlassToGlass: { glassToGlassType: null, count: 0 },
          });
        }
        break;
      default:
        break;
    }
    setAddMoreItemsArray((prevVal) => ({  // update item status
      ...prevVal,
      [id]: {
        ...prevVal[id],
        status: !prevVal[id].status,
      },
    }));
  };


  useEffect(() => {
    if (singleLayout) {
      const items = setItemsStatusAfterFirstLoad(singleLayout?.layoutData)
      setAddMoreItemsArray(items);

      setMounting({
        channelOrClamps: singleLayout?.layoutData?.settings?.channelOrClamps || "Channel",
        mountingChannel: singleLayout?.layoutData?.settings?.mountingChannel,
        wallClamp: singleLayout?.layoutData?.settings?.wallClamp,
        sleeveOver: singleLayout?.layoutData?.settings?.sleeveOver,
        glassToGlass: singleLayout?.layoutData?.settings?.glassToGlass,
        cornerWallClamp: singleLayout?.layoutData?.settings?.cornerWallClamp,
        cornerSleeveOver: singleLayout?.layoutData?.settings?.cornerSleeveOver,
        cornerGlassToGlass:
          singleLayout?.layoutData?.settings?.cornerGlassToGlass,
      });
      setPageLoading(false);
    }
  }, [singleLayout]);

  useEffect(() => {
    if (layoutId) {
      setSelectedLayoutId(layoutId)
    }
  }, [layoutId]);

  useEffect(() => {
    refetchAllLayouts();
    if (selectedlayoutId) {
      refetchSingleLayout();
    }
  }, [selectedlayoutId]);

  return (
    <Box>
      <Box sx={{ display: "flex", gap: "12px" }}>
        <Box sx={{ display: 'flex', gap: '5px' }}>
          <Typography className="layouttitle">
            Shower
          </Typography>
          <Typography className="layouttitle">
            /
          </Typography>
          <Typography onClick={() => navigate(`/layouts`)} className="layouttitle" sx={{ color: "#000000", cursor: 'pointer' }}>
            Layouts
          </Typography>
          <Typography className="layouttitle">
            /
          </Typography>
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
              const selectedItem = allLayouts?.find(item => item?._id === value);
              return <Typography sx={{
                fontSize: "14px",
                fontFamily: '"Roboto", sans-serif !important',
                color: '#000000',
                textOverflow: 'ellipsis', overflow: 'hidden',
                textWrap: 'nowrap',
                pt: '2px'
              }}>{selectedItem?.name}</Typography>;
            }}
          >
            {allLayouts?.map((data, index) => (
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
                    <CheckIcon sx={{ color: "#8477DA" }} />
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
                Update
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
                  {addMoreItemsArray?.hardwareFinishes?.status && <Grid item md={6} xs={12} sx={{ pb: 1 }}>
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
                            MenuData={singleLayout?.listData?.hardwareFinishes}
                          />
                        </Box>
                      </Box>
                    </Box>
                  </Grid>}
                  {addMoreItemsArray?.handles?.status && <Grid item md={6} xs={12} sx={{ pb: 1 }}>
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
                            inputProps: { min: 0,max: inputMaxValue },
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
                  </Grid>}
                  {addMoreItemsArray?.pivotHingeOption.status && (
                    <Grid item md={6} xs={12} sx={{ pb: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "12px",
                        }}
                      >
                        <Typography className="modificationTitle">
                          Pivot Hinge Option
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
                            name="pivotHingeOption.pivotHingeType"
                            fullWidth={true}
                            value={
                              formik.values.pivotHingeOption.pivotHingeType ||
                              ""
                            }
                            onChange={(e) => {
                              formik.handleChange(e);

                              if (e.target.value === null) {
                                formik.setFieldValue(
                                  "pivotHingeOption.count",
                                  0
                                );
                              }
                            }}
                            onBlur={formik.handleBlur}
                            MenuData={singleLayout?.listData?.pivotHingeOption}
                          />
                          <CustomInputField
                            color={"purple"}
                            type="number"
                            InputProps={{
                              inputProps: { min: 0,max: inputMaxValue },
                            }}
                            size="small"
                            variant="outlined"
                            name="pivotHingeOption.count"
                            fullWidth={true}
                            value={
                              formik.values.pivotHingeOption.count !== undefined
                                ? formik.values.pivotHingeOption.count
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
                  {addMoreItemsArray?.glassType?.status && <Grid item md={6} xs={12} sx={{ pb: 1 }}>
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
                              formik.setFieldValue("glassType.thickness", "0");
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
                  </Grid>}
                  {addMoreItemsArray?.hinges?.status && <Grid item md={6} xs={12} sx={{ pb: 1 }}>
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
                          }}
                          onBlur={formik.handleBlur}
                        />
                      </Box>
                    </Box>
                  </Grid>}

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
                              formik.values.heavyDutyOption.heavyDutyType || ""
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
                              inputProps: { min: 0,max: inputMaxValue },
                            }}
                            size="small"
                            variant="outlined"
                            placeholder={"height"}
                            name="heavyDutyOption.height"
                            fullWidth={true}
                            value={
                              formik.values.heavyDutyOption.height !== undefined
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
                  {addMoreItemsArray?.mounting?.status && (
                    <Grid xs={12} sx={{ p: 1.8, pb: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "12px",
                        }}
                      >
                        <Typography className="modificationTitle">
                          Mounting
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                          }}
                        >
                          {/* <div
                            style={{
                              width: "250px",
                              padding: "10px 10px 10px 10px",
                              padding: 4,
                            }}
                          >
                            Mounting
                          </div> */}

                          <MountingSection
                            mounting={mounting}
                            setMounting={setMounting}
                            list={singleLayout?.listData}
                            activeGlassThickness={
                              formik.values.glassType.thickness
                            }
                          />
                        </Box>
                      </Box>
                    </Grid>
                  )}
                  {addMoreItemsArray?.heavyPivotOption?.status && (
                    <Grid item md={6} xs={12} sx={{ pb: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "12px",
                        }}
                      >
                        <Typography className="modificationTitle">
                          Heavy Pivot Option
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
                            name="heavyPivotOption.heavyPivotType"
                            fullWidth={true}
                            value={
                              formik.values.heavyPivotOption.heavyPivotType ||
                              ""
                            }
                            onChange={(e) => {
                              formik.handleChange(e);

                              if (e.target.value === null) {
                                formik.setFieldValue(
                                  "heavyPivotOption.height",
                                  0
                                );
                                formik.setFieldValue(
                                  "heavyPivotOption.threshold",
                                  0
                                );
                              }
                            }}
                            onBlur={formik.handleBlur}
                            MenuData={singleLayout?.listData?.heavyPivotOption}
                          />
                          <Box sx={{ display: "flex", gap: 2 }}>
                            <CustomInputField
                              color={"purple"}
                              type="number"
                              InputProps={{
                                inputProps: { min: 0,max: inputMaxValue },
                              }}
                              size="small"
                              variant="outlined"
                              name="heavyPivotOption.threshold"
                              fullWidth={true}
                              placeholder={"width"}
                              value={
                                formik.values.heavyPivotOption.threshold !==
                                  undefined
                                  ? formik.values.heavyPivotOption.threshold
                                  : 0
                              }
                              onChange={(e)=>{
                                if (e.target.value.length <= inputLength) {
                                  formik.handleChange(e)
                                }
                              }}
                              onBlur={formik.handleBlur}
                            />
                            <CustomInputField
                              color={"purple"}
                              type="number"
                              InputProps={{
                                inputProps: { min: 0,max: inputMaxValue },
                              }}
                              size="small"
                              variant="outlined"
                              name="heavyPivotOption.height"
                              fullWidth={true}
                              placeholder={"height"}
                              value={
                                formik.values.heavyPivotOption.height !==
                                  undefined
                                  ? formik.values.heavyPivotOption.height
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
                      </Box>
                    </Grid>
                  )}
                  {addMoreItemsArray?.slidingDoorSystem?.status && (
                    <Grid item md={6} xs={12} sx={{ pb: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "12px",
                        }}
                      >
                        <Typography className="modificationTitle">
                          Sliding Door System
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
                            name="slidingDoorSystem.type"
                            fullWidth={true}
                            value={formik.values.slidingDoorSystem.type}
                            onChange={(e) => {
                              formik.handleChange(e);
                              if (e.target.value === null) {
                                formik.setFieldValue(
                                  "slidingDoorSystem.count",
                                  0
                                );
                              }
                            }}
                            onBlur={formik.handleBlur}
                            MenuData={
                              singleLayout?.listData?.slidingDoorSystem
                            }
                          />

                          <CustomInputField
                            color={"purple"}
                            type="number"
                            InputProps={{
                              inputProps: { min: 0,max: inputMaxValue },
                            }}
                            size="small"
                            fullWidth={true}
                            variant="outlined"
                            name="slidingDoorSystem.count"
                            value={
                              formik.values.slidingDoorSystem.count !== 0
                                ? formik.values.slidingDoorSystem.count
                                : 0 // Set the default value to 0
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
                  {addMoreItemsArray?.outages?.status && (
                    <Grid item md={6} xs={12} sx={{ pb: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "12px",
                        }}
                      >
                        <Typography className="modificationTitle">
                          Outages
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                          }}
                        >
                          <CustomInputField
                            color={"purple"}
                            size="small"
                            variant="outlined"
                            name="outages"
                            type="number"
                            InputProps={{
                              inputProps: { min: 0,max: inputMaxValue },
                            }}
                            fullWidth={true}
                            value={formik.values.outages}
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
                  {addMoreItemsArray?.transom?.status && (
                    <Grid item md={6} xs={12} sx={{ pb: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "12px",
                        }}
                      >
                        <Typography className="modificationTitle">
                          Transom (if full height)
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
                            name="transom"
                            fullWidth={true}
                            value={formik.values.transom}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            MenuData={singleLayout?.listData?.transom}
                          />
                        </Box>
                      </Box>
                    </Grid>
                  )}
                  {addMoreItemsArray?.header?.status && (
                    <Grid item md={6} xs={12} sx={{ pb: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "12px",
                        }}
                      >
                        <Typography className="modificationTitle">
                          Header (if not full height)
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
                            name="header"
                            fullWidth={true}
                            value={formik.values.header}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            MenuData={singleLayout?.listData?.header}
                          />
                        </Box>
                      </Box>
                    </Grid>
                  )}
                  {addMoreItemsArray?.glassAddon?.status && (
                    <Grid item md={6} xs={12} sx={{ pb: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "12px",
                        }}
                      >
                        <Typography className="modificationTitle">
                          Glass Addon
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
                            name="glassAddon"
                            fullWidth={true}
                            value={formik.values.glassAddon}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            MenuData={singleLayout?.listData?.glassAddons}
                          />
                        </Box>
                      </Box>
                    </Grid>
                  )}
                  {addMoreItemsArray?.notch?.status && (
                    <Grid item md={6} xs={12} sx={{ pb: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "12px",
                        }}
                      >
                        <Typography className="modificationTitle">
                          Notch
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                          }}
                        >
                          <CustomInputField
                            color={"purple"}
                            size="small"
                            variant="outlined"
                            name="notch"
                            type="number"
                            InputProps={{
                              inputProps: { min: 0,max: inputMaxValue },
                            }}
                            fullWidth={true}
                            value={formik.values.notch}
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
                        <Box sx={{ width: "50%" }}>
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
                        <Box sx={{ width: "50%" }}>
                          {" "}
                          <Typography
                            className="modificationTitle"
                            sx={{ fontSize: 16 }}
                          >
                            Hours
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
                    </Box>
                  </Grid>
                </Grid>
                <AddMoreItems items={addMoreItemsArray} handleItemClick={handleAddMoreItemClick} />
              </Box>
            </Grid>
          </Grid>
        </form>
      )}
    </Box>
  );
};

export default EditShowerLayout;
