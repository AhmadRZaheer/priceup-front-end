import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import image from "../../../Assets/DoorImg.png";
import "../style.scss";
import CheckIcon from "@mui/icons-material/Check";
import ModificationItem from "./ModificationItem";
import { Add } from "@mui/icons-material";
import RemoveIcon from "@mui/icons-material/Remove";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getDefaultId } from "@/redux/defaultSlice";
import {
  useFetchDataDefault,
  useFetchSingleDefault,
} from "@/utilities/ApiHooks/defaultLayouts";
import { backendURL } from "@/utilities/common";
import { useFormik } from "formik";
import CustomInputMenu from "@/components/ui-components/CustomInputMenu";
import CustomInputField from "@/components/ui-components/CustomInput";
import MountingSection from "./MountingSection";

const data = [
  { id: 1, name: "Pivot Hinge Option", status: true },
  { id: 2, name: "Heavy Duty Option", status: true },
  { id: 3, name: "Channel or Clamps", status: false },
  { id: 4, name: "Heavy Pivot Option", status: false },
  { id: 5, name: "Wall Clamps (Mounting)", status: false },
  { id: 6, name: "Sleeve Over (Mounting)", status: false },
  { id: 7, name: "Glass to Glass (Mounting)", status: false },
  { id: 8, name: "Wall Clamps (Corner)", status: false },
];
const layoutArray = [{ name: "Doors" }, { name: "Doors & Panel" }];

const EditShowerLayout = () => {
  const [searchParams] = useSearchParams();
  const layoutId = searchParams.get("id");

  const [modification, setModification] = useState(data);
  const [layout, setLayout] = useState(layoutId);
  const [expandAccordian, setExpandAccordian] = useState(false);
  const defaultId = useSelector(getDefaultId);
  const navigate = useNavigate();

  const {
    data: ShowsLayouts,
    refetch: refetchAllLayouts,
    isLoading: isLoadingShowsLayouts,
  } = useFetchDataDefault();

  const {
    data: singleDefault,
    isFetching: isfetchingDefaultSingle,
    refetch,
  } = useFetchSingleDefault(layout ?? defaultId);
  const [mounting, setMounting] = useState(null);

  useEffect(() => {
    refetch();
  }, [refetch]);
  useEffect(() => {
    if (singleDefault) {
      setMounting({
        channelOrClamps: singleDefault?.layoutData?.settings?.channelOrClamps,
        mountingChannel: singleDefault?.layoutData?.settings?.mountingChannel,
        wallClamp: singleDefault?.layoutData?.settings?.wallClamp,
        sleeveOver: singleDefault?.layoutData?.settings?.sleeveOver,
        glassToGlass: singleDefault?.layoutData?.settings?.glassToGlass,
        cornerWallClamp: singleDefault?.layoutData?.settings?.cornerWallClamp,
        cornerSleeveOver: singleDefault?.layoutData?.settings?.cornerSleeveOver,
        cornerGlassToGlass:
          singleDefault?.layoutData?.settings?.cornerGlassToGlass,
      });
    }
  }, [singleDefault]);
  const handleChangeLayout = (event) => {
    setLayout(event.target.value);
    navigate(`/layouts/edit/?id=${event.target.value}`);
  };
  useEffect(() => {
    setLayout("Doors");
  }, []);

  const initialValues = {
    image: singleDefault?.layoutData?.image,
    name: singleDefault?.layoutData?.name,
    handles: {
      handleType: singleDefault?.layoutData?.settings?.handles.handleType,
      count: singleDefault?.layoutData?.settings?.handles.count,
    },

    hardwareFinishes: singleDefault?.layoutData?.settings?.hardwareFinishes,

    hinges: {
      hingesType: singleDefault?.layoutData?.settings?.hinges?.hingesType,
      count: singleDefault?.layoutData?.settings?.hinges?.count,
    },
    pivotHingeOption: {
      pivotHingeType:
        singleDefault?.layoutData?.settings?.pivotHingeOption.pivotHingeType,
      count: singleDefault?.layoutData?.settings?.pivotHingeOption.count,
    },
    heavyDutyOption: {
      heavyDutyType:
        singleDefault?.layoutData?.settings?.heavyDutyOption.heavyDutyType,
      height: singleDefault?.layoutData?.settings?.heavyDutyOption.height,
      threshold: singleDefault?.layoutData?.settings?.heavyDutyOption.threshold,
    },
    heavyPivotOption: {
      heavyPivotType:
        singleDefault?.layoutData?.settings?.heavyPivotOption.heavyPivotType,
      height: singleDefault?.layoutData?.settings?.heavyPivotOption.height,
      threshold:
        singleDefault?.layoutData?.settings?.heavyPivotOption.threshold,
    },
    channelOrClamps: singleDefault?.layoutData?.settings?.channelOrClamps,
    mountingChannel: singleDefault?.layoutData?.settings?.mountingChannel,

    cornerGlassToGlass: {
      glassToGlassType:
        singleDefault?.layoutData?.settings.cornerGlassToGlass
          ?.glassToGlassType,

      count: singleDefault?.layoutData?.settings.cornerGlassToGlass?.count,
    },
    cornerWallClamp: {
      wallClampType:
        singleDefault?.layoutData?.settings.cornerWallClamp?.wallClampType,

      count: singleDefault?.layoutData?.settings.cornerWallClamp?.count,
    },
    cornerSleeveOver: {
      sleeveOverType:
        singleDefault?.layoutData?.settings.cornerSleeveOver?.sleeveOverType,
      count: singleDefault?.layoutData?.settings.cornerSleeveOver?.count,
    },

    glassToGlass: {
      glassToGlassType:
        singleDefault?.layoutData?.settings.glassToGlass?.glassToGlassType,

      count: singleDefault?.layoutData?.settings.glassToGlass?.count,
    },
    wallClamp: {
      wallClampType:
        singleDefault?.layoutData?.settings.wallClamp?.wallClampType,

      count: singleDefault?.layoutData?.settings.wallClamp?.count,
    },
    sleeveOver: {
      sleeveOverType:
        singleDefault?.layoutData?.settings.sleeveOver?.sleeveOverType,
      count: singleDefault?.layoutData?.settings.sleeveOver?.count,
    },
    glassType: {
      type: singleDefault?.layoutData?.settings?.glassType?.type,
      thickness: singleDefault?.layoutData?.settings?.glassType?.thickness,
    },
    slidingDoorSystem: {
      type: singleDefault?.layoutData?.settings?.slidingDoorSystem.type,
      count: singleDefault?.layoutData?.settings?.slidingDoorSystem.count,
    },
    outages: singleDefault?.layoutData?.settings?.outages,
    transom: singleDefault?.layoutData?.settings?.transom,
    header: singleDefault?.layoutData?.settings?.header,
    glassAddon: singleDefault?.layoutData?.settings?.glassAddon,
    notch: singleDefault?.layoutData?.settings?.notch,

    other: {
      people: singleDefault?.layoutData?.settings?.other?.people,
      hours: singleDefault?.layoutData?.settings?.other?.hours,
    },
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values, "values");
    },
  });

  const handleButtonClick = (id) => {
    setModification((prevModification) =>
      prevModification.map((item) =>
        item.id === id ? { ...item, status: !item.status } : item
      )
    );
  };

  const LayoutData = singleDefault?.layoutData;

  useEffect(() => {
    refetch();
    refetchAllLayouts();
  }, [layout]);
  return (
    <Box sx={{ px: 3, py: 3 }}>
      <Box sx={{ display: "flex", gap: "12px" }}>
        <Typography className="layouttitle">
          Showers <Box sx={{ color: "#000000" }}>/ Layouts</Box>
        </Typography>
        <FormControl
          sx={{ width: "197px" }}
          size="small"
          className="custom-textfield"
        >
          <Select
            value={layout}
            size="small"
            labelId="demo-select-small-label"
            id="demo-select-small"
            sx={{ height: "40px", background: "#F6F5FF", width: "197px" }}
            onChange={handleChangeLayout}
            displayEmpty
            renderValue={(selected) => {
              const data = ShowsLayouts?.find((item) => item?._id === selected);
              return <Typography>{data?.name}</Typography>;
            }}
            MenuProps={{
              PaperProps: {
                style: {
                  width: "200px",
                },
              },
            }}
          >
            {ShowsLayouts?.map((data, index) => (
              <MenuItem key={index} value={data?._id}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Typography>{data?.name}</Typography>
                  {data?._id === layout ? (
                    <CheckIcon sx={{ color: "#8477DA" }} />
                  ) : null}
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
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
            {LayoutData?.name}
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
                src={`${backendURL}/${LayoutData?.image}`}
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
                          MenuData={singleDefault?.listData?.hardwareFinishes}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Grid>
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
                        MenuData={singleDefault?.listData?.handles}
                      />
                      <CustomInputField
                        type="number"
                        InputProps={{
                          inputProps: { min: 0 },
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
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </Box>
                  </Box>
                </Grid>
                {modification[0].status && (
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
                            formik.values.pivotHingeOption.pivotHingeType || ""
                          }
                          onChange={(e) => {
                            formik.handleChange(e);

                            if (e.target.value === null) {
                              formik.setFieldValue("pivotHingeOption.count", 0);
                            }
                          }}
                          onBlur={formik.handleBlur}
                          MenuData={singleDefault?.listData?.pivotHingeOption}
                        />
                        <CustomInputField
                          color={"purple"}
                          type="number"
                          InputProps={{
                            inputProps: { min: 0 },
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
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </Box>
                    </Box>
                  </Grid>
                )}

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
                        MenuData={singleDefault?.listData?.hinges}
                      />
                      <CustomInputField
                        color={"purple"}
                        type="number"
                        InputProps={{
                          inputProps: { min: 0 },
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
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </Box>
                  </Box>
                </Grid>
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
                            formik.setFieldValue("glassType.thickness", "0");
                          }
                        }}
                        onBlur={formik.handleBlur}
                        MenuData={singleDefault?.listData?.glassType}
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
                {modification[1].status && (
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
                              formik.setFieldValue("heavyDutyOption.height", 0);
                            }
                          }}
                          onBlur={formik.handleBlur}
                          MenuData={singleDefault?.listData?.heavyDutyOption}
                        />

                        <CustomInputField
                          color={"purple"}
                          type="number"
                          InputProps={{
                            inputProps: { min: 0 },
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
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </Box>
                    </Box>
                  </Grid>
                )}
                {modification[2].status && (
                  <Grid item md={6} xs={12} sx={{ pb: 1 }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                      }}
                    >
                      <Typography className="modificationTitle">
                        Channel or Clamps
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                        }}
                      >
                        <div
                          style={{
                            width: "250px",
                            padding: "10px 10px 10px 10px",
                            padding: 4,
                          }}
                        >
                          Mounting
                        </div>

                        <MountingSection
                          mounting={mounting}
                          setMounting={setMounting}
                          list={singleDefault?.listData}
                          activeGlassThickness={
                            formik.values.glassType.thickness
                          }
                        />
                      </Box>
                    </Box>
                  </Grid>
                )}
              </Grid>

              <Accordion
                expanded={expandAccordian}
                onChange={() => {
                  setExpandAccordian(!expandAccordian);
                }}
                sx={{
                  border: "none",
                  background: "none",
                  boxShadow: "none",
                  ":before": {
                    backgroundColor: "white !important",
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: "#8477DA" }} />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                  sx={{
                    color: "#5D6164",
                    p: 0,
                    flexGrow: `0 !important`,
                    width: "130px",
                    "&.Mui-expanded": {
                      minHeight: "40px",
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 500,
                      lineHeight: "21px",
                      color: "#9088C0",
                    }}
                  >
                    Add more items
                  </Typography>
                </AccordionSummary>
                <AccordionDetails style={{ padding: "0px" }}>
                  {modification.map((data, index) => (
                    <Button
                      onClick={() => handleButtonClick(data.id)}
                      key={index}
                      variant="contained"
                      sx={{
                        height: "36px",
                        border: "1px solid #8477DA",
                        background: "#F6F5FF",
                        borderRadius: "4px !important",
                        p: "10px",
                        gap: "10px",
                        mr: "10px",
                        mb: "10px",
                        boxShadow: "none",
                        ":hover": {
                          background: "#F6F5FF",
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "14px",
                          lineHeight: "16.14px",
                          color: "#000000",
                        }}
                      >
                        {data.name}
                      </Typography>
                      {!data.status ? (
                        <Add sx={{ color: "#8477DA !important" }} />
                      ) : (
                        <RemoveIcon sx={{ color: "#8477DA !important" }} />
                      )}
                    </Button>
                  ))}
                </AccordionDetails>
              </Accordion>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default EditShowerLayout;
