import React, { useEffect, useRef } from "react";
import { useFormik } from "formik";
import {
  Button,
  CircularProgress,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import {
  useEditDefault,
  useFetchSingleDefault,
} from "../../utilities/ApiHooks/defaultLayouts";
import DefaultComponentHeader from "./defaultComponentHeader";
import { getDefaultId, getRefetch, setRefetch } from "../../redux/defaultSlice";
import { useDispatch, useSelector } from "react-redux";
import { backendURL } from "../../utilities/common";
const DefaultComponent = ({ showSnackbar }) => {
  const dispatch = useDispatch();
  const defaultId = useSelector(getDefaultId);
  const refetchDefault = useSelector(getRefetch);
  const { mutate: updateDefault, isSuccess: SuccessForEdit } = useEditDefault();
  const {
    data: singleDefault,
    isFetching: isfetchingDefaultSingle,
    refetch,
  } = useFetchSingleDefault(defaultId);

  const formik = useFormik({
    initialValues: {
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
        threshold:
          singleDefault?.layoutData?.settings?.heavyDutyOption.threshold,
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
    },
    enableReinitialize: true,
    onSubmit: (values) => {},
  });
  console.log(formik.values, "value");
  const { setFieldValue } = formik;
  const fileInputRef = useRef(null);

  const handleFileUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setFieldValue("image", imageUrl);
  };
  const handleEditClick = () => {
    const updatedValues = formik.values;
    const id = defaultId;
    updateDefault({ settings: updatedValues, id: id });
    // formik.resetForm();
  };
  useEffect(() => {
    if (SuccessForEdit) {
      refetch();
      showSnackbar("Updated Successfully ", "success");
      dispatch(setRefetch(refetchDefault + 1));
    }
  }, [SuccessForEdit]);
  return (
    <form type="submit">
      <DefaultComponentHeader
        selected={singleDefault?.layoutData?.name}
        handleEditClick={handleEditClick}
      />
      {isfetchingDefaultSingle ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: "20px",
            alignItems: "center",

            height: "56vh",
          }}
        >
          <CircularProgress size={24} sx={{color: "#8477DA"}} />
        </Box>
      ) : (
        <Box
          style={{
            display: "flex",
            marginTop: 4,
            maxHeight: "66vh",
            overflowY: "scroll",
            width: "100%",
          }}
        >
          <Box>
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 14,
                alignContent: "center",
                paddingTop: 15,
                paddingBottom: 15,
                paddingLeft: "10px",
                paddingRight: "10px",
              }}
            >
              <Box
                style={{
                  width: "380px",
                  paddingX: 10,
                }}
              >
                <Box sx={{ width: "320px" }}>
                  <TextField
                    size="small"
                    variant="outlined"
                    name="name"
                    style={{ width: "100%" }}
                    value={formik.values.name || null}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Box>
              </Box>
              <Box
                style={{
                  width: "380px",
                  paddingX: 10,
                }}
              >
                <Box
                  sx={{
                    width: "315px",
                    borderRadius: 2,
                    marginX: 1,
                  }}
                >
                  <Box>
                    <input
                      type="file"
                      accept="image/svg+xml,image/png,image/jpeg,image/gif"
                      style={{ display: "none" }}
                      ref={fileInputRef}
                      onChange={handleFileChange}
                    />
                    {formik.values.image ? (
                      <img
                        width={"100%"}
                        height={"400px"}
                        src={`${backendURL}/${formik.values.image}`}
                        alt="Selected"
                      />
                    ) : (
                      <Box
                        sx={{
                          width: "100%",
                          height: "400px",
                          textAlign: "center",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <CircularProgress size={24} sx={{color: "#8477DA"}} />
                      </Box>
                    )}
                    {/* <Button
                      style={{
                        width: "100%",
                        boxShadow: "0px 0px 2px blue",
                        color: "white",
                        backgroundColor: "#8477DA",
                        "&:hover": {
                          backgroundColor: "#8477DA",
                        },
                      }}
                      component="span"
                      onClick={handleFileUpload}
                    >
                      Upload Image
                    </Button> */}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box>
            <div
              style={{
                display: "flex",
                gap: 4,
                alignContent: "center",
                padding: "10px 10px 10px 10px",
              }}
            >
              <div
                style={{
                  width: "250px",
                 padding: "10px 10px 10px 10px",
                  padding: 4,
                }}
              >
                Hardware Finishes
              </div>{" "}
              <div
                style={{
                  width: "250px",
                }}
              >
                <Box sx={{ width: "220px" }}>
                  <TextField
                    select
                    size="small"
                    variant="outlined"
                    name="hardwareFinishes"
                    style={{ width: "100%" }}
                    value={formik.values.hardwareFinishes || null}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <MenuItem value={null}>Select Empty</MenuItem>
                    {singleDefault?.listData?.hardwareFinishes.map((option) => (
                      <MenuItem key={option.name} value={option?._id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              </div>
              <div
                style={{
                  width: "250px",

                  padding: 4,
                }}
              ></div>{" "}
            </div>

            {/* Handles */}

            <div
              style={{
                display: "flex",
                gap: 4,
                alignContent: "center",
               padding: "10px 10px 10px 10px",
              }}
            >
              <div
                style={{
                  width: "250px",
                  padding: 4,
                }}
              >
                Handles
              </div>{" "}
              <div
                style={{
                  width: "250px",
                }}
              >
                <Box sx={{ width: "220px" }}>
                  <TextField
                    select
                    size="small"
                    variant="outlined"
                    name="handles.handleType"
                    style={{ width: "100%" }}
                    value={formik.values.handles.handleType || ""}
                    onChange={(e) => {
                      formik.handleChange(e);

                      // Check if the selected value is empty and set the number TextField to 0
                      if (e.target.value === null) {
                        formik.setFieldValue("handles.count", 0);
                      }
                    }}
                    onBlur={formik.handleBlur}
                  >
                    <MenuItem value={null}>Select Empty</MenuItem>
                    {singleDefault?.listData?.handles.map((option) => (
                      <MenuItem key={option?._id} value={option?._id}>
                        {option?.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              </div>
              <Box
                style={{
                  width: "250px",
                  paddingX: 10,
                }}
              >
                <TextField
                  type="number"
                  InputProps={{
                    inputProps: { min: 0 },
                  }}
                  size="small"
                  variant="outlined"
                  name="handles.count"
                  style={{
                    width: "250px",
                    paddingX: 10,
                  }}
                  value={
                    formik.values.handles.count !== undefined
                      ? formik.values.handles.count
                      : 0
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Box>
            </div>

            {/* Hinges */}

            <div
              style={{
                display: "flex",
                gap: 4,
                alignContent: "center",
               padding: "10px 10px 10px 10px",
              }}
            >
              <div
                style={{
                  width: "250px",
                  padding: 4,
                }}
              >
                Hinges
              </div>{" "}
              <div
                style={{
                  width: "250px",
                }}
              >
                <Box sx={{ width: "220px" }}>
                  <TextField
                    select
                    size="small"
                    variant="outlined"
                    name="hinges.hingesType"
                    style={{ width: "100%" }}
                    value={formik.values.hinges.hingesType || ""}
                    onChange={(e) => {
                      formik.handleChange(e);

                      // Check if the selected value is empty and set the number TextField to 0
                      if (e.target.value === null) {
                        formik.setFieldValue("hinges.count", 0);
                      }
                    }}
                    onBlur={formik.handleBlur}
                  >
                    <MenuItem value={null}>Select Empty</MenuItem>
                    {singleDefault?.listData?.hinges.map((option) => (
                      <MenuItem key={option._id} value={option._id}>
                        {option?.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              </div>
              <Box
                style={{
                  width: "250px",
                  paddingX: 10,
                }}
              >
                <TextField
                  type="number"
                  InputProps={{
                    inputProps: { min: 0 },
                  }}
                  size="small"
                  variant="outlined"
                  name="hinges.count"
                  style={{
                    width: "250px",
                    paddingX: 10,
                  }}
                  value={
                    formik.values.hinges.count !== undefined
                      ? formik.values.hinges.count
                      : 0
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Box>
            </div>

            <div
              style={{
                display: "flex",
                gap: 4,
                alignContent: "center",
               padding: "10px 10px 10px 10px",
              }}
            >
              <div
                style={{
                  width: "250px",
                  padding: 4,
                }}
              >
                Pivot Hinge Option
              </div>{" "}
              <div
                style={{
                  width: "250px",
                }}
              >
                <Box sx={{ width: "220px" }}>
                  <TextField
                    select
                    size="small"
                    variant="outlined"
                    name="pivotHingeOption.pivotHingeType"
                    style={{ width: "100%" }}
                    value={formik.values.pivotHingeOption.pivotHingeType || ""}
                    onChange={(e) => {
                      formik.handleChange(e);

                      // Check if the selected value is empty and set the number TextField to 0
                      if (e.target.value === null) {
                        formik.setFieldValue("pivotHingeOption.count", 0);
                      }
                    }}
                    onBlur={formik.handleBlur}
                  >
                    <MenuItem value={null}>Select Empty</MenuItem>
                    {singleDefault?.listData?.pivotHingeOption.map((option) => (
                      <MenuItem key={option._id} value={option._id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              </div>
              <Box
                style={{
                  width: "250px",
                  paddingX: 10,
                }}
              >
                <TextField
                  type="number"
                  InputProps={{
                    inputProps: { min: 0 },
                  }}
                  size="small"
                  variant="outlined"
                  name="pivotHingeOption.count"
                  style={{
                    width: "250px",
                    paddingX: 10,
                  }}
                  value={
                    formik.values.pivotHingeOption.count !== undefined
                      ? formik.values.pivotHingeOption.count
                      : 0
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Box>
            </div>

            {/* Heavy Duty Option */}

            <div
              style={{
                display: "flex",
                gap: 4,
                alignContent: "center",
               padding: "10px 10px 10px 10px",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "250px",
                  padding: 4,
                  marginTop: "22px",
                }}
              >
                Heavy Duty Option
              </div>{" "}
              <div
                style={{
                  width: "250px",
                  marginTop: "22px",
                }}
              >
                <Box sx={{ width: "220px" }}>
                  <TextField
                    select
                    size="small"
                    variant="outlined"
                    name="heavyDutyOption.heavyDutyType"
                    style={{ width: "100%" }}
                    value={formik.values.heavyDutyOption.heavyDutyType || ""}
                    onChange={(e) => {
                      formik.handleChange(e);

                      // Check if the selected value is empty and set the number TextFields to 0
                      if (e.target.value === null) {
                        formik.setFieldValue("heavyDutyOption.threshold", 0);
                        formik.setFieldValue("heavyDutyOption.height", 0);
                      }
                    }}
                    onBlur={formik.handleBlur}
                  >
                    <MenuItem value={null}>Select Empty</MenuItem>
                    {singleDefault?.listData?.heavyDutyOption.map((option) => (
                      <MenuItem key={option._id} value={option._id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              </div>
              <Box
                sx={{
                  display: "flex",
                  width: "250px",
                  gap: 2,
                  alignItems: "center",
                }}
              >
                {/* width */}
                <Box>
                  <Typography>Width</Typography>
                  <TextField
                    type="number"
                    InputProps={{
                      inputProps: { min: 0 },
                    }}
                    size="small"
                    variant="outlined"
                    name="heavyDutyOption.threshold"
                    style={{
                      width: "120px",
                      padding: 1,
                      marginX: 1,
                    }}
                    value={
                      formik.values.heavyDutyOption.threshold !== undefined
                        ? formik.values.heavyDutyOption.threshold
                        : 0
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Box>

                {/* height */}
                <Box>
                  <Typography>Height</Typography>
                  <TextField
                    type="number"
                    InputProps={{
                      inputProps: { min: 0 },
                    }}
                    size="small"
                    variant="outlined"
                    name="heavyDutyOption.height"
                    style={{
                      width: "120px",
                    }}
                    value={
                      formik.values.heavyDutyOption.height !== undefined
                        ? formik.values.heavyDutyOption.height
                        : 0
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Box>
              </Box>
            </div>

            {/* Heavy Pivot Option */}
            {/* Heavy Pivot Option */}
            <div
              style={{
                display: "flex",
                gap: 4,
                alignContent: "center",
               padding: "10px 10px 10px 10px",
              }}
            >
              <div
                style={{
                  width: "250px",
                  padding: 4,
                  marginTop: "24px",
                }}
              >
                Heavy Pivot Option
              </div>{" "}
              <div
                style={{
                  width: "250px",
                }}
              >
                <Box sx={{ width: "220px", marginTop: "24px" }}>
                  <TextField
                    select
                    size="small"
                    variant="outlined"
                    name="heavyPivotOption.heavyPivotType"
                    style={{ width: "100%" }}
                    value={formik.values.heavyPivotOption.heavyPivotType || ""}
                    onChange={(e) => {
                      formik.handleChange(e);

                      // Check if the selected value is empty and set the number TextFields to 0
                      if (e.target.value === null) {
                        formik.setFieldValue("heavyPivotOption.height", 0);
                        formik.setFieldValue("heavyPivotOption.threshold", 0);
                      }
                    }}
                    onBlur={formik.handleBlur}
                  >
                    <MenuItem value={null}>Select Empty</MenuItem>
                    {singleDefault?.listData?.heavyPivotOption.map((option) => (
                      <MenuItem key={option._id} value={option._id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              </div>
              <Box
                sx={{
                  display: "flex",
                  width: "250px",
                  gap: 2,
                }}
              >
                <Box>
                  <Typography>Width</Typography>
                  <TextField
                    type="number"
                    InputProps={{
                      inputProps: { min: 0 },
                    }}
                    size="small"
                    variant="outlined"
                    name="heavyPivotOption.threshold"
                    style={{
                      width: "120px",
                      padding: 1,
                      marginX: 1,
                    }}
                    value={
                      formik.values.heavyPivotOption.threshold !== undefined
                        ? formik.values.heavyPivotOption.threshold
                        : 0
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Box>
                <Box>
                  <Typography>Height</Typography>
                  <TextField
                    type="number"
                    InputProps={{
                      inputProps: { min: 0 },
                    }}
                    size="small"
                    variant="outlined"
                    name="heavyPivotOption.height"
                    style={{
                      width: "120px",
                    }}
                    value={
                      formik.values.heavyPivotOption.height !== undefined
                        ? formik.values.heavyPivotOption.height
                        : 0
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Box>
              </Box>
            </div>

            {/* Channel or Clamps */}

            <div
              style={{
                display: "flex",
                gap: 4,
                alignContent: "center",
               padding: "10px 10px 10px 10px",
              }}
            >
              <div
                style={{
                  width: "250px",
                 padding: "10px 10px 10px 10px",
                  padding: 4,
                }}
              >
                Channel or Clamps
              </div>
              <div
                style={{
                  width: "250px",
                }}
              >
                <Box sx={{ width: "220px" }}>
                  <TextField
                    select
                    size="small"
                    variant="outlined"
                    name="channelOrClamps"
                    style={{ width: "100%" }}
                    value={formik.values.channelOrClamps}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    {/* <MenuItem value="">Select Empty</MenuItem> */}
                    {["Channel", "Clamps"].map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                  {formik.touched.channelOrClamps &&
                    formik.errors.channelOrClamps && (
                      <div>{formik.errors.channelOrClamps}</div>
                    )}
                </Box>
              </div>
              <div
                style={{
                  width: "250px",
                  padding: 4,
                }}
              ></div>
            </div>
            {/* Mounting Channel */}

            {formik.values.channelOrClamps === "Channel" && (
              <div
                style={{
                  display: "flex",
                  gap: 4,
                  alignContent: "center",
                 padding: "10px 10px 10px 10px",
                }}
              >
                <div
                  style={{
                    width: "250px",

                   padding: "10px 10px 10px 10px",
                    padding: 4,
                  }}
                >
                  Mounting Channel
                </div>{" "}
                <div
                  style={{
                    width: "250px",
                  }}
                >
                  <Box sx={{ width: "220px" }}>
                    <TextField
                      select
                      size="small"
                      variant="outlined"
                      name="mountingChannel"
                      style={{ width: "100%" }}
                      value={formik.values.mountingChannel}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <MenuItem value={null}>Select Empty</MenuItem>
                      {singleDefault?.listData?.mountingChannel.map(
                        (option) => (
                          <MenuItem key={option._id} value={option._id}>
                            {option.name}
                          </MenuItem>
                        )
                      )}
                    </TextField>
                  </Box>
                </div>
                <div
                  style={{
                    width: "250px",

                    padding: 4,
                  }}
                ></div>{" "}
              </div>
            )}
            {/* Clamps*/}

            {formik.values.channelOrClamps === "Clamps" && (
              <>
                {/* Wall Clamps */}
                <div
                  style={{
                    display: "flex",
                    gap: 4,
                    alignContent: "center",
                   padding: "10px 10px 10px 10px",
                  }}
                >
                  <div
                    style={{
                      width: "250px",
                     padding: "10px 10px 10px 10px",
                      padding: 4,
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography>Mounting Clamps</Typography>
                    <Typography variant="body2">Wall Clamps</Typography>
                  </div>
                  <div
                    style={{
                      width: "250px",
                    }}
                  >
                    <Box sx={{ width: "220px" }}>
                      <TextField
                        select
                        size="small"
                        variant="outlined"
                        name="wallClamp.wallClampType"
                        style={{ width: "100%" }}
                        value={formik.values.wallClamp.wallClampType || ""}
                        onChange={(e) => {
                          formik.handleChange(e);

                          // Check if the selected value is empty and set the number TextField to 0
                          if (e.target.value === null) {
                            formik.setFieldValue("wallClamp.count", 0);
                          }
                        }}
                        onBlur={formik.handleBlur}
                      >
                        <MenuItem value={null}>Select Empty</MenuItem>
                        {singleDefault?.listData?.wallClamp.map((option) => (
                          <MenuItem key={option._id} value={option._id}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Box>
                  </div>
                  <Box sx={{ width: "250px" }}>
                    <TextField
                      type="number"
                      InputProps={{
                        inputProps: { min: 0 },
                      }}
                      size="small"
                      variant="outlined"
                      name="wallClamp.count"
                      style={{
                        width: "250px",
                        paddingX: 10,
                      }}
                      value={
                        formik.values.wallClamp.count !== undefined
                          ? formik.values.wallClamp.count
                          : 0
                      }
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </Box>
                </div>

                {/* Sleeve Over */}
                <div
                  style={{
                    display: "flex",
                    gap: 4,
                    alignContent: "center",
                   padding: "10px 10px 10px 10px",
                  }}
                >
                  <div
                    style={{
                      width: "250px",
                     padding: "10px 10px 10px 10px",
                      padding: 4,
                      display: "flex",
                      justifyContent: "end",
                    }}
                  >
                    <Typography variant="body2">Sleeve Over</Typography>
                  </div>
                  <div
                    style={{
                      width: "250px",
                    }}
                  >
                    <Box sx={{ width: "220px" }}>
                      <TextField
                        select
                        size="small"
                        variant="outlined"
                        name="sleeveOver.sleeveOverType"
                        style={{ width: "100%" }}
                        value={formik.values.sleeveOver.sleeveOverType || ""}
                        onChange={(e) => {
                          formik.handleChange(e);

                          // Check if the selected value is empty and set the number TextField to 0
                          if (e.target.value === null) {
                            formik.setFieldValue("sleeveOver.count", 0);
                          }
                        }}
                        onBlur={formik.handleBlur}
                      >
                        <MenuItem value={null}>Select Empty</MenuItem>
                        {singleDefault?.listData?.sleeveOver.map((option) => (
                          <MenuItem key={option._id} value={option._id}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Box>
                  </div>
                  <Box sx={{ width: "250px" }}>
                    <TextField
                      type="number"
                      InputProps={{
                        inputProps: { min: 0 },
                      }}
                      size="small"
                      variant="outlined"
                      name="sleeveOver.count"
                      style={{
                        width: "250px",
                        paddingX: 10,
                      }}
                      value={
                        formik.values.sleeveOver.count !== undefined
                          ? formik.values.sleeveOver.count
                          : 0
                      }
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </Box>
                </div>

                {/* Glass to Glass */}
                <div
                  style={{
                    display: "flex",
                    gap: 4,
                    alignContent: "center",
                   padding: "10px 10px 10px 10px",
                  }}
                >
                  <div
                    style={{
                      width: "250px",
                     padding: "10px 10px 10px 10px",
                      padding: 4,
                      display: "flex",
                      justifyContent: "end",
                    }}
                  >
                    <Typography variant="body2">Glass to Glass</Typography>
                  </div>
                  <div
                    style={{
                      width: "250px",
                    }}
                  >
                    <Box sx={{ width: "220px" }}>
                      <TextField
                        select
                        size="small"
                        variant="outlined"
                        name="glassToGlass.glassToGlassType"
                        style={{ width: "100%" }}
                        value={
                          formik.values.glassToGlass.glassToGlassType || ""
                        }
                        onChange={(e) => {
                          formik.handleChange(e);

                          // Check if the selected value is empty and set the number TextField to 0
                          if (e.target.value === null) {
                            formik.setFieldValue("glassToGlass.count", 0);
                          }
                        }}
                        onBlur={formik.handleBlur}
                      >
                        <MenuItem value={null}>Select Empty</MenuItem>
                        {singleDefault?.listData?.glassToGlass.map((option) => (
                          <MenuItem key={option._id} value={option._id}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Box>
                  </div>
                  <Box sx={{ width: "250px" }}>
                    <TextField
                      type="number"
                      InputProps={{
                        inputProps: { min: 0 },
                      }}
                      size="small"
                      variant="outlined"
                      name="glassToGlass.count"
                      style={{
                        width: "250px",
                        paddingX: 10,
                      }}
                      value={
                        formik.values.glassToGlass.count !== undefined
                          ? formik.values.glassToGlass.count
                          : 0
                      }
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </Box>
                </div>
              </>
            )}
            {/* Corner Wall Clamps */}
            <div
              style={{
                display: "flex",
                gap: 4,
                alignContent: "center",
               padding: "10px 10px 10px 10px",
              }}
            >
              <div
                style={{
                  width: "250px",
                 padding: "10px 10px 10px 10px",
                  padding: 4,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography>Corners</Typography>
                <Typography variant="body2">Wall Clamps</Typography>
              </div>
              <div
                style={{
                  width: "250px",
                }}
              >
                <Box sx={{ width: "220px" }}>
                  <TextField
                    select
                    size="small"
                    variant="outlined"
                    name="cornerWallClamp.wallClampType"
                    style={{ width: "100%" }}
                    value={formik.values.cornerWallClamp.wallClampType || ""}
                    onChange={(e) => {
                      formik.handleChange(e);

                      // Check if the selected value is empty and set the number TextField to 0
                      if (e.target.value === null) {
                        formik.setFieldValue("cornerWallClamp.count", 0);
                      }
                    }}
                    onBlur={formik.handleBlur}
                  >
                    <MenuItem value={null}>Select Empty</MenuItem>
                    {singleDefault?.listData?.cornerWallClamp.map((option) => (
                      <MenuItem key={option._id} value={option._id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              </div>
              <Box sx={{ width: "250px" }}>
                <TextField
                  type="number"
                  InputProps={{
                    inputProps: { min: 0 },
                  }}
                  size="small"
                  variant="outlined"
                  name="cornerWallClamp.count"
                  style={{
                    width: "250px",
                    paddingX: 10,
                  }}
                  value={
                    formik.values.cornerWallClamp.count !== undefined
                      ? formik.values.cornerWallClamp.count
                      : 0
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Box>
            </div>

            {/* Sleeve Over */}
            <div
              style={{
                display: "flex",
                gap: 4,
                alignContent: "center",
               padding: "10px 10px 10px 10px",
              }}
            >
              <div
                style={{
                  width: "250px",
                 padding: "10px 10px 10px 10px",
                  padding: 4,
                  display: "flex",
                  justifyContent: "end",
                }}
              >
                <Typography variant="body2">Sleeve Over</Typography>
              </div>
              <div
                style={{
                  width: "250px",
                }}
              >
                <Box sx={{ width: "220px" }}>
                  <TextField
                    select
                    size="small"
                    variant="outlined"
                    name="cornerSleeveOver.sleeveOverType"
                    style={{ width: "100%" }}
                    value={formik.values.cornerSleeveOver.sleeveOverType || ""}
                    onChange={(e) => {
                      formik.handleChange(e);

                      // Check if the selected value is empty and set the number TextField to 0
                      if (e.target.value === null) {
                        formik.setFieldValue("cornerSleeveOver.count", 0);
                      }
                    }}
                    onBlur={formik.handleBlur}
                  >
                    <MenuItem value={null}>Select Empty</MenuItem>
                    {singleDefault?.listData?.cornerSleeveOver.map((option) => (
                      <MenuItem key={option._id} value={option._id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              </div>
              <Box sx={{ width: "250px" }}>
                <TextField
                  type="number"
                  InputProps={{
                    inputProps: { min: 0 },
                  }}
                  size="small"
                  variant="outlined"
                  name="cornerSleeveOver.count"
                  style={{
                    width: "250px",
                    paddingX: 10,
                  }}
                  value={
                    formik.values.cornerSleeveOver.count !== undefined
                      ? formik.values.cornerSleeveOver.count
                      : 0
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Box>
            </div>

            {/* Glass to Glass */}
            <div
              style={{
                display: "flex",
                gap: 4,
                alignContent: "center",
               padding: "10px 10px 10px 10px",
              }}
            >
              <div
                style={{
                  width: "250px",
                 padding: "10px 10px 10px 10px",
                  padding: 4,
                  display: "flex",
                  justifyContent: "end",
                }}
              >
                <Typography variant="body2">Glass to Glass</Typography>
              </div>
              <div
                style={{
                  width: "250px",
                }}
              >
                <Box sx={{ width: "220px" }}>
                  <TextField
                    select
                    size="small"
                    variant="outlined"
                    name="cornerGlassToGlass.glassToGlassType"
                    style={{ width: "100%" }}
                    value={
                      formik.values.cornerGlassToGlass.glassToGlassType || ""
                    }
                    onChange={(e) => {
                      formik.handleChange(e);

                      // Check if the selected value is empty and set the number TextField to 0
                      if (e.target.value === null) {
                        formik.setFieldValue("cornerGlassToGlass.count", 0);
                      }
                    }}
                    onBlur={formik.handleBlur}
                  >
                    <MenuItem value={null}>Select Empty</MenuItem>
                    {singleDefault?.listData?.cornerGlassToGlass.map(
                      (option) => (
                        <MenuItem key={option._id} value={option._id}>
                          {option.name}
                        </MenuItem>
                      )
                    )}
                  </TextField>
                </Box>
              </div>
              <Box sx={{ width: "250px" }}>
                <TextField
                  type="number"
                  InputProps={{
                    inputProps: { min: 0 },
                  }}
                  size="small"
                  variant="outlined"
                  name="cornerGlassToGlass.count"
                  style={{
                    width: "250px",
                    paddingX: 10,
                  }}
                  value={
                    formik.values.cornerGlassToGlass.count !== undefined
                      ? formik.values.cornerGlassToGlass.count
                      : 0
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Box>
            </div>
            <div
              style={{
                display: "flex",
                gap: 4,
                alignContent: "center",
               padding: "10px 10px 10px 10px",
              }}
            >
              <div
                style={{
                  width: "250px",
                 padding: "10px 10px 10px 10px",
                  padding: 4,
                }}
              >
                Glass Type
              </div>
              <div
                style={{
                  width: "250px",
                }}
              >
                <Box sx={{ width: "220px" }}>
                  <TextField
                    select
                    size="small"
                    variant="outlined"
                    name="glassType.type"
                    style={{ width: "100%" }}
                    value={formik.values.glassType.type || ""}
                    onChange={(event) => {
                      formik.handleChange(event);

                      // Check if the selected value is empty and set the value of "thickness" to "0"
                      if (event.target.value === null) {
                        formik.setFieldValue("glassType.thickness", "0");
                      }
                    }}
                    onBlur={formik.handleBlur}
                  >
                    <MenuItem value={null}>Select Empty</MenuItem>
                    {singleDefault?.listData?.glassType.map((option) => (
                      <MenuItem key={option._id} value={option._id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              </div>
              <Box sx={{ width: "250px" }}>
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
            </div>

            {/*   sliding Door System */}

            <div
              style={{
                display: "flex",
                gap: 4,
                alignContent: "center",
               padding: "10px 10px 10px 10px",
              }}
            >
              <div
                style={{
                  width: "250px",
                  padding: 4,
                }}
              >
                sliding Door System
              </div>
              <div
                style={{
                  width: "250px",
                }}
              >
                <Box sx={{ width: "220px" }}>
                  <TextField
                    select
                    size="small"
                    variant="outlined"
                    name="slidingDoorSystem.type"
                    style={{ width: "100%" }}
                    value={formik.values.slidingDoorSystem.type}
                    onChange={(e) => {
                      formik.handleChange(e);
                      if (e.target.value === null) {
                        // Set the number TextField value to 0 when "Select Empty" is chosen
                        formik.setFieldValue("slidingDoorSystem.count", 0);
                      }
                    }}
                    onBlur={formik.handleBlur}
                  >
                    <MenuItem value={null}>Select Empty</MenuItem>
                    {singleDefault?.listData?.slidingDoorSystem.map(
                      (option) => (
                        <MenuItem key={option._id} value={option._id}>
                          {option.name}
                        </MenuItem>
                      )
                    )}
                  </TextField>
                </Box>
              </div>
              <Box sx={{ width: "250px" }}>
                <TextField
                  type="number"
                  InputProps={{
                    inputProps: { min: 0 },
                  }}
                  size="small"
                  variant="outlined"
                  name="slidingDoorSystem.count"
                  style={{
                    width: "250px",
                    paddingX: 10,
                  }}
                  value={
                    formik.values.slidingDoorSystem.count !== 0
                      ? formik.values.slidingDoorSystem.count
                      : 0 // Set the default value to 0
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Box>
            </div>

            {/* Outages */}

            <div
              style={{
                display: "flex",
                gap: 4,
                alignContent: "center",
               padding: "10px 10px 10px 10px",
              }}
            >
              <div
                style={{
                  width: "250px",
                  padding: 4,
                }}
              >
                Outages
              </div>{" "}
              <div
                style={{
                  width: "250px",
                }}
              >
                <Box sx={{ width: "220px" }}>
                  <TextField
                    size="small"
                    variant="outlined"
                    name="outages"
                    type="number"
                    InputProps={{
                      inputProps: { min: 0 },
                    }}
                    style={{
                      width: "220px",
                      paddingX: 10,
                    }}
                    value={formik.values.outages}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Box>
              </div>
              <Box
                style={{
                  width: "250px",
                  paddingX: 10,
                }}
              ></Box>
            </div>

            <div
              style={{
                display: "flex",
                gap: 4,
                alignContent: "center",
               padding: "10px 10px 10px 10px",
              }}
            >
              <div
                style={{
                  width: "250px",
                 padding: "10px 10px 10px 10px",
                  padding: 4,
                }}
              >
                Transom (if full height)
              </div>
              <div
                style={{
                  width: "250px",
                }}
              >
                <Box sx={{ width: "220px" }}>
                  <TextField
                    select
                    size="small"
                    variant="outlined"
                    name="transom"
                    style={{ width: "100%" }}
                    value={formik.values.transom}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <MenuItem value={null}>Select Empty</MenuItem>
                    {singleDefault?.listData?.transom.map((option) => (
                      <MenuItem key={option._id} value={option._id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              </div>
              <div
                style={{
                  width: "250px",
                  padding: 4,
                }}
              ></div>
            </div>

            <div
              style={{
                display: "flex",
                gap: 4,
                alignContent: "center",
               padding: "10px 10px 10px 10px",
              }}
            >
              <div
                style={{
                  width: "250px",

                 padding: "10px 10px 10px 10px",
                  padding: 4,
                }}
              >
                Header (if not full height)
              </div>{" "}
              <div
                style={{
                  width: "250px",
                }}
              >
                <Box sx={{ width: "220px" }}>
                  <TextField
                    select
                    size="small"
                    variant="outlined"
                    name="header"
                    style={{ width: "100%" }}
                    value={formik.values.header}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <MenuItem value={null}>Select Empty</MenuItem>
                    {singleDefault?.listData?.header.map((option) => (
                      <MenuItem key={option._id} value={option._id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              </div>
              <div
                style={{
                  width: "250px",

                  padding: 4,
                }}
              ></div>{" "}
            </div>

            <div
              style={{
                display: "flex",
                gap: 4,
                alignContent: "center",
               padding: "10px 10px 10px 10px",
              }}
            >
              <div
                style={{
                  width: "250px",
                 padding: "10px 10px 10px 10px",
                  padding: 4,
                }}
              >
                Glass Addon
              </div>{" "}
              <div
                style={{
                  width: "250px",
                }}
              >
                <Box sx={{ width: "220px" }}>
                  <TextField
                    select
                    size="small"
                    variant="outlined"
                    name="glassAddon"
                    style={{ width: "100%" }}
                    value={formik.values.glassAddon}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <MenuItem value={null}>Select Empty</MenuItem>
                    {singleDefault?.listData?.glassAddons.map((option) => (
                      <MenuItem key={option._id} value={option._id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  {formik.touched.glassAddon && formik.errors.glassAddon && (
                    <Box style={{ color: "red" }}>
                      {formik.errors.glassAddon}
                    </Box>
                  )}
                </Box>
              </div>
              <div
                style={{
                  width: "250px",

                  padding: 4,
                }}
              ></div>{" "}
            </div>

            {/* notch */}
            <div
              style={{
                display: "flex",
                gap: 4,
                alignContent: "center",
               padding: "10px 10px 10px 10px",
              }}
            >
              <div
                style={{
                  width: "250px",
                  padding: 4,
                }}
              >
                Notch
              </div>{" "}
              <div
                style={{
                  width: "250px",
                }}
              >
                <Box sx={{ width: "220px" }}>
                  <TextField
                    size="small"
                    variant="outlined"
                    name="notch"
                    type="number"
                    InputProps={{
                      inputProps: { min: 0 },
                    }}
                    style={{
                      width: "220px",
                      paddingX: 10,
                    }}
                    value={formik.values.notch}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Box>
              </div>
              <Box
                style={{
                  width: "250px",
                  paddingX: 10,
                }}
              ></Box>
            </div>

            {/* Others box */}
            <Box display="flex" alignItems="center" padding="15px 10px">
              <Box style={{ width: "250px", padding: 4 }}>Other</Box>
              <Box style={{ width: "250px" }}>
                <Box sx={{ width: "220px" }}>
                  <Typography>People</Typography>
                  <TextField
                    size="small"
                    variant="outlined"
                    name="other.people"
                    type="number"
                    InputProps={{
                      inputProps: { min: 0 },
                    }}
                    style={{ width: "100%" }}
                    value={formik.values.other.people}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.other?.people &&
                    formik.errors.other?.people && (
                      <Box style={{ color: "red" }}>
                        {formik.errors.other.people}
                      </Box>
                    )}
                </Box>
              </Box>
              <Box style={{ width: "250px" }}>
                <Box sx={{ width: "220px" }}>
                  <Typography>Hours</Typography>
                  <TextField
                    size="small"
                    type="number"
                    InputProps={{
                      inputProps: { min: 0 },
                    }}
                    variant="outlined"
                    name="other.hours"
                    style={{ width: "100%" }}
                    value={formik.values.other.hours}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.other?.hours &&
                    formik.errors.other?.hours && (
                      <Box style={{ color: "red" }}>
                        {formik.errors.other.hours}
                      </Box>
                    )}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </form>
  );
};

export default DefaultComponent;
