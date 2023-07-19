import React, { useEffect, useRef, useState } from "react";
import door from "../../Assets/door.png";
// import { FieldArray,  } from "formik";
import { useFormik, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
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
} from "../../utilities/ApiHooks/DefaultLayouts";
import DefaultComponentHeader from "./DefaultComponentHeader";
import { getDefaultId, getRefetch, setRefetch } from "../../redux/defaultSlice";
import { useDispatch, useSelector } from "react-redux";
import { backendURL } from "../../utilities/common";
const DefaultComponent = ({ showSnackbar }) => {
  const dispatch = useDispatch();
  const defaultId = useSelector(getDefaultId);
  const refetchDefault = useSelector(getRefetch);
  const {
    mutate: updateDefault,
    isLoading: LoadingForEdit,
    isError: ErrorForEdit,
    isSuccess: SuccessForEdit,
  } = useEditDefault();

  const {
    data: singleDefault,
    isFetching: isfetchingDefaultSingle,
    refetch,
  } = useFetchSingleDefault(defaultId);
  console.log(singleDefault, "singleDefault test");
  const formik = useFormik({
    initialValues: {
      // image: singleDefault?.layoutData?.image,
      image: null,
      name: singleDefault?.layoutData?.name,
      handles: {
        handleType: singleDefault?.layoutData?.settings?.handles.handleType,
        count: singleDefault?.layoutData?.settings?.handles.count,
      },

      hardwareFinishes: singleDefault?.layoutData?.settings?.hardwareFinishes,
      // hardwareFinishes: "64a276b30336b4e1e0846c3f",

      hinges: {
        hingesType: singleDefault?.layoutData?.settings?.hinges?.hingesType,

        count: singleDefault?.layoutData?.settings?.hinges?.count,
      },
      pivotHinge: {
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
      glassTreatment: singleDefault?.layoutData?.settings?.glassTreatment,

      other: {
        people: singleDefault?.layoutData?.settings?.other?.people,
        hours: singleDefault?.layoutData?.settings?.other?.hours,
      },
    },
    enableReinitialize: true,
    onSubmit: (values) => {},
  });
  console.log(formik.values, "formik values to check image");
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
          <CircularProgress size={24} color="warning" />
        </Box>
      ) : (
        <Box
          style={{
            display: "flex",
            marginTop: 4,
            maxHeight: "66vh",
            overflowY: "scroll",
          }}
        >
          {/* image Section*/}

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
                        src={URL.createObjectURL(formik.values.image)}
                        // src={`${backendURL}/${formik.values.image}`}
                        alt="Selected"
                      />
                    ) : (
                      <img
                        width={"100%"}
                        height={"400px"}
                        src={door}
                        alt="Selected"
                      />
                    )}
                    <Button
                      style={{
                        width: "100%",
                        boxShadow: "0px 0px 2px blue",
                        color: "#000000",
                        backgroundColor: "rgba(132, 119, 218, 0.14)",
                      }}
                      component="span"
                      onClick={handleFileUpload}
                    >
                      Upload Image
                    </Button>
                    {/* <Button
                      style={{
                        width: "100%",
                        boxShadow: "0px 0px 2px blue",
                        color: "#000000",
                        backgroundColor: "rgba(132, 119, 218, 0.14)",
                      }}
                      component="span"
                      onClick={handleEditClick}
                    >
                      Update Data
                    </Button> */}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box>
            {/* Hardware Finishes */}

            <div
              style={{
                display: "flex",
                gap: 4,
                alignContent: "center",
                padding: "15px 10px 15px 10px",
              }}
            >
              <div
                style={{
                  width: "250px",

                  padding: "15px 10px 15px 10px",
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
                    {singleDefault?.listData?.hardwareFinishes.map((option) => (
                      <MenuItem
                        key={option.name}
                        // selected={
                        //   singleDefault?.layoutData?.settings
                        //     ?.hardwareFinishes === option?._id
                        // }
                        value={option?._id}
                      >
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
                padding: "15px 10px 15px 10px",
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
                    value={formik.values.handles.handleType || null}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
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
                  size="small"
                  variant="outlined"
                  name="handles.count"
                  style={{
                    width: "250px",
                    paddingX: 10,
                  }}
                  value={
                    formik.values.handles.count !== 0
                      ? formik.values.handles.count
                      : null
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
                padding: "15px 10px 15px 10px",
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
                    value={formik.values.hinges.hingesType || null}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
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
                  size="small"
                  variant="outlined"
                  name="hinges.count"
                  style={{
                    width: "250px",
                    paddingX: 10,
                  }}
                  value={
                    formik.values.hinges.count !== 0
                      ? formik.values.hinges.count
                      : null
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Box>
            </div>
            {/* Pivot Hinge Option */}
            <div
              style={{
                display: "flex",
                gap: 4,
                alignContent: "center",
                padding: "15px 10px 15px 10px",
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
                    name="pivotHinge.pivotHingeType"
                    style={{ width: "100%" }}
                    value={formik.values.pivotHinge.pivotHingeType}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
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
                  size="small"
                  variant="outlined"
                  name="pivotHinge.count"
                  style={{
                    width: "250px",
                    paddingX: 10,
                  }}
                  value={
                    formik.values.pivotHinge.count !== 0
                      ? formik.values.pivotHinge.count
                      : null
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
                padding: "15px 10px 15px 10px",
              }}
            >
              <div
                style={{
                  width: "250px",
                  padding: 4,
                }}
              >
                Heavy Duty Option
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
                    name="heavyDutyOption.heavyDutyType"
                    style={{ width: "100%" }}
                    value={formik.values.heavyDutyOption.heavyDutyType}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
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
                }}
              >
                <TextField
                  type="number"
                  size="small"
                  variant="outlined"
                  name="heavyDutyOption.threshold"
                  style={{
                    width: "120px",

                    padding: 1,
                    marginX: 1,
                  }}
                  value={
                    formik.values.heavyDutyOption.threshold !== 0
                      ? formik.values.heavyDutyOption.threshold
                      : null
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <TextField
                  type="number"
                  size="small"
                  variant="outlined"
                  name="heavyDutyOption.height"
                  style={{
                    width: "120px",
                  }}
                  value={
                    formik.values.heavyDutyOption.height !== 0
                      ? formik.values.heavyDutyOption.height
                      : null
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Box>
            </div>
            {/* Heavy Pivot Option */}
            <div
              style={{
                display: "flex",
                gap: 4,
                alignContent: "center",
                padding: "15px 10px 15px 10px",
              }}
            >
              <div
                style={{
                  width: "250px",
                  padding: 4,
                }}
              >
                Heavy Pivot Option
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
                    name="heavyPivotOption.heavyPivotType"
                    style={{ width: "100%" }}
                    value={formik.values.heavyPivotOption.heavyPivotType}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
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
                <TextField
                  type="number"
                  size="small"
                  variant="outlined"
                  name="heavyPivot.countOne"
                  style={{
                    width: "120px",
                  }}
                  value={
                    formik.values.heavyPivotOption.height !== 0
                      ? formik.values.heavyPivotOption.height
                      : null
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <TextField
                  type="number"
                  size="small"
                  variant="outlined"
                  name="heavyPivot.countTwo"
                  style={{
                    width: "120px",

                    padding: 1,
                    marginX: 1,
                  }}
                  value={
                    formik.values.heavyPivotOption.threshold !== 0
                      ? formik.values.heavyPivotOption.threshold
                      : null
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Box>
            </div>

            {/* Channel or Clamps */}

            <div
              style={{
                display: "flex",
                gap: 4,
                alignContent: "center",
                padding: "15px 10px 15px 10px",
              }}
            >
              <div
                style={{
                  width: "250px",
                  padding: "15px 10px 15px 10px",
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
                    {singleDefault?.listData?.channelOrClamps.map((option) => (
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

            <div
              style={{
                display: "flex",
                gap: 4,
                alignContent: "center",
                padding: "15px 10px 15px 10px",
              }}
            >
              <div
                style={{
                  width: "250px",

                  padding: "15px 10px 15px 10px",
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
                    {singleDefault?.listData?.mountingChannel.map((option) => (
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
            {/* Clamps*/}

            {/* Wall Clamps */}
            <div
              style={{
                display: "flex",
                gap: 4,
                alignContent: "center",
                padding: "15px 10px 15px 10px",
              }}
            >
              <div
                style={{
                  width: "250px",
                  padding: "15px 10px 15px 10px",
                  padding: 4,

                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography>Clamps</Typography>
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
                    value={formik.values.wallClamp.wallClampType}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
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
                  size="small"
                  variant="outlined"
                  name="wallClamp.count"
                  style={{
                    width: "250px",
                    paddingX: 10,
                  }}
                  value={
                    formik.values.wallClamp.count !== 0
                      ? formik.values.wallClamp.count
                      : null
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
                padding: "15px 10px 15px 10px",
              }}
            >
              <div
                style={{
                  width: "250px",
                  padding: "15px 10px 15px 10px",
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
                    value={formik.values.sleeveOver.sleeveOverType}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
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
                  size="small"
                  variant="outlined"
                  name="sleeveOver.count"
                  style={{
                    width: "250px",
                    paddingX: 10,
                  }}
                  value={
                    formik.values.sleeveOver.count !== 0
                      ? formik.values.sleeveOver.count
                      : null
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
                padding: "15px 10px 15px 10px",
              }}
            >
              <div
                style={{
                  width: "250px",
                  padding: "15px 10px 15px 10px",
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
                    value={formik.values.glassToGlass.glassToGlassType}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
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
                  size="small"
                  variant="outlined"
                  name="glassToGlass.count"
                  style={{
                    width: "250px",
                    paddingX: 10,
                  }}
                  value={
                    formik.values.glassToGlass.count !== 0
                      ? formik.values.glassToGlass.count
                      : null
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Box>
            </div>

            {/*  clamps ends here*/}

            {/* Glass type*/}

            <div
              style={{
                display: "flex",
                gap: 4,
                alignContent: "center",
                padding: "15px 10px 15px 10px",
              }}
            >
              <div
                style={{
                  width: "250px",
                  padding: "15px 10px 15px 10px",
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
                {/* <Box sx={{ width: "220px" }}>
              <TextField
                select
                size="small"
                variant="outlined"
                name="glassType.type"
                style={{ width: "100%" }}
                value={formik.values.glassType.type}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                {singleDefault?.listData?.glassType.map((option) => (
                  <MenuItem key={option._id} value={option._id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Box> */}
                <Box sx={{ width: "220px" }}>
                  <TextField
                    select
                    size="small"
                    variant="outlined"
                    name="glassType.type"
                    style={{ width: "100%" }}
                    value={formik.values.glassType.type}
                    onChange={(event) => {
                      formik.handleChange(event);
                    }}
                    onBlur={formik.handleBlur}
                  >
                    {singleDefault?.listData?.glassType.map((option) => (
                      <MenuItem key={option._id} value={option._id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              </div>
              {/* <Box sx={{ width: "250px" }}>
            <TextField
              select
              size="small"
              variant="outlined"
              name="glassType.thickness"
              style={{ width: "100%" }}
              value={formik.values.glassType.thickness}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              {singleDefault?.listData?.glassType?.[0].options?.map(
                (option) => (
                  <MenuItem key={option._id} value={option._id}>
                    {option.thickness}
                  </MenuItem>
                )
              )}
           
            </TextField>
          </Box> */}
              <Box sx={{ width: "250px" }}>
                <TextField
                  select
                  size="small"
                  variant="outlined"
                  name="glassType.thickness"
                  style={{ width: "100%" }}
                  value={formik.values.glassType.thickness}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  {singleDefault?.listData?.glassType
                    ?.find(
                      (option) => option._id === formik.values.glassType.type
                    )
                    ?.options?.map((option) => (
                      <MenuItem key={option._id} value={option._id}>
                        {option.thickness}
                      </MenuItem>
                    ))}
                </TextField>
              </Box>
            </div>
            {/*   sliding Door System */}

            <div
              style={{
                display: "flex",
                gap: 4,
                alignContent: "center",
                padding: "15px 10px 15px 10px",
              }}
            >
              <div
                style={{
                  width: "250px",
                  padding: 4,
                }}
              >
                sliding Door System
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
                    name="slidingDoorSystem.type"
                    style={{ width: "100%" }}
                    value={formik.values.slidingDoorSystem.type}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
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
                      : null
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
                padding: "15px 10px 15px 10px",
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

            {/* Transom (if full height) */}

            <div
              style={{
                display: "flex",
                gap: 4,
                alignContent: "center",
                padding: "15px 10px 15px 10px",
              }}
            >
              <div
                style={{
                  width: "250px",
                  padding: "15px 10px 15px 10px",
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
            {/* Header (if not full height) */}

            <div
              style={{
                display: "flex",
                gap: 4,
                alignContent: "center",
                padding: "15px 10px 15px 10px",
              }}
            >
              <div
                style={{
                  width: "250px",

                  padding: "15px 10px 15px 10px",
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

            {/* Glass Treatment */}

            <div
              style={{
                display: "flex",
                gap: 4,
                alignContent: "center",
                padding: "15px 10px 15px 10px",
              }}
            >
              <div
                style={{
                  width: "250px",
                  padding: "15px 10px 15px 10px",
                  padding: 4,
                }}
              >
                Glass Treatment
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
                    name="glassTreatment"
                    style={{ width: "100%" }}
                    value={formik.values.glassTreatment}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    {singleDefault?.listData?.glassTreatment.map((option) => (
                      <MenuItem key={option._id} value={option._id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  {formik.touched.glassTreatment &&
                    formik.errors.glassTreatment && (
                      <Box style={{ color: "red" }}>
                        {formik.errors.glassTreatment}
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

            {/*  Other*/}

            <Box display="flex" alignItems="center" padding="15px 10px">
              <Box style={{ width: "250px", padding: 4 }}>Other</Box>
              <Box style={{ width: "250px" }}>
                <Box sx={{ width: "220px" }}>
                  <Typography>People</Typography>
                  <TextField
                    size="small"
                    variant="outlined"
                    name="other.people"
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
