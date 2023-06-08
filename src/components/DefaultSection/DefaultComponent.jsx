import React, { useState } from "react";
import door from "../../Assets/door.png";
// import { FieldArray,  } from "formik";
import { useFormik, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { Button, MenuItem, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useDropzone } from "react-dropzone";
import {
  Clamps,
  GlassType,
  GlassTypeCount,
  Handles,
  channelorClamps,
  glassType,
  glassTypeCount,
  hardwareFinishes,
  heavyDutyOption,
  heavyPivotOption,
  hinges,
  mountingChannel,
  options,
  pivotHingeOption,
} from "../../data/data";
const validationSchema = Yup.object().shape({
  image: Yup.mixed()
    .required("Image is required")
    .test(
      "fileType",
      "Only image files are allowed (JPEG, PNG, GIF)",
      (value) => {
        if (value) {
          const supportedFormats = ["image/jpeg", "image/png", "image/gif"];
          return supportedFormats.includes(value.type);
        }
        return false;
      }
    )
    .test(
      "fileSize",
      "Image size should be less than 5MB",
      (value) => value && value.size <= 5 * 1024 * 1024
    ),
  hardwareFinishes: Yup.string().required("HardwareFinishes Value is required"),

  handles: Yup.object().shape({
    default: Yup.string().required("Handles Option is required"),
    count: Yup.string().required("Handles Value is required"),
  }),
  hinges: Yup.object().shape({
    default: Yup.string().required("hingesOptions Option is required"),
    count: Yup.string().required("hingesValue Value is required"),
  }),
  pivotHinge: Yup.object().shape({
    default: Yup.string().required("pivotHingeOptions Option is required"),
    count: Yup.string().required("pivotHingeValue Value is required"),
  }),
  heavyDuty: Yup.object().shape({
    default: Yup.string().required("default Option is required"),
    countOne: Yup.string().required("countOne Value is required"),
    countTwo: Yup.string().required("countTwo Value is required"),
  }),
  heavyPivot: Yup.object().shape({
    default: Yup.string().required("default Option is required"),
    countOne: Yup.string().required("countOne Value is required"),
    countTwo: Yup.string().required("countTwo Value is required"),
  }),
  // ChannelorClamps: Yup.string().required("ChannelorClamps Value is required"),
  // mountingChannel: Yup.string().required("mountingChannel Value is required"),
  // clamps: Yup.array().of(
  //   Yup.object().shape({
  //     default: Yup.string().required("Default is required"),
  //     count: Yup.string().required("Count is required"),
  //   })
  // ),

  glassToGlass: Yup.object().shape({
    default: Yup.string().required("default Option is required"),
    count: Yup.string().required("count Value is required"),
  }),
  bar: Yup.object().shape({
    default: Yup.string().required("bar Option is required"),
    count: Yup.string().required("bar Value is required"),
  }),
  outages: Yup.object().shape({
    default: Yup.string().required("outages Option is required"),
  }),
  other: Yup.object().shape({
    people: Yup.number().required("People  is required"),
    hours: Yup.number().required("Hours Value is required"),
  }),
  transom: Yup.string().required("transom Value is required"),
  header: Yup.string().required("transom Value is required"),
  glassTreatment: Yup.string().required("glassTreatment Value is required"),
});

const DefaultComponent = () => {
  const formik = useFormik({
    initialValues: {
      image: null,
      handles: {
        default: Handles[0].value,
        count: "2",
      },
      hardwareFinishes: hardwareFinishes[0].value,

      hinges: {
        default: hinges[0].value,
        count: "2",
      },
      pivotHinge: {
        default: pivotHingeOption[0].value,
        count: "2",
      },
      heavyDuty: {
        default: heavyDutyOption[0].value,
        countOne: "2",
        countTwo: "2",
      },
      heavyPivot: {
        default: heavyPivotOption[0].value,
        countOne: "2",
        countTwo: "2",
      },
      channelorClamps: channelorClamps[0].value,
      mountingChannel: mountingChannel[0].value,
      clamps: [
        {
          name: "wallClamps",
          default: "select options",
          count: "1",
        },
        {
          name: "sleepOver",
          default: "",
          count: "2",
        },
        {
          name: "glassToGlass",
          default: "",
          count: "3",
        },
      ],
      glassToGlass: {
        default: glassType[0].value,
        count: glassTypeCount[0].value,
      },
      bar: {
        default: Handles[0].value,
        count: "2",
      },
      outages: {
        default: "4",
      },
      transom: "",
      header: "",
      glassTypeCount: "",
      other: {
        people: "5",
        hours: "2",
      },
    },

    validationSchema,
    onSubmit: (values) => {
      console.log(values, "not found or found images");
    },
  });

  const handleImageChange = (event) => {
    setFieldValue("image", event.target.files[0]);
  };
  const { getFieldProps, setFieldValue, touched, errors } = formik;
  const [selectedImage, setSelectedImage] = useState(null);
  const onDrop = (acceptedFiles) => {
    setSelectedImage(acceptedFiles[0]);
    // setFieldValue("image", acceptedFiles[0]);
    formik.setFieldValue("image", acceptedFiles[0]);
  };
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <form type="submit">
      <Box
        style={{
          display: "flex",
          marginTop: 4,
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
              <Box
                sx={{
                  width: "300px",
                  border: "1px solid #D0D5DD",
                  borderRadius: 2,
                  padding: 1,
                  marginX: 1,
                }}
              >
                Door & Notched panel
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
                    accept="image/*"
                    id="image-input"
                    type="file"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />

                  {formik.values.image ? (
                    <img
                      width={"100%"}
                      height={"400px"}
                      src={URL.createObjectURL(formik.values.image)}
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
                  <label htmlFor="image-input">
                    <Button
                      style={{
                        width: "100%",
                        boxShadow: "0px 0px 2px blue",
                        color: "#000000",
                        backgroundColor: "rgba(132, 119, 218, 0.14)",
                      }}
                      component="span"
                    >
                      Upload Image
                    </Button>
                  </label>
                </Box>
              </Box>
              {touched.image && errors.image && (
                <div style={{ color: "red" }}>{errors.image}</div>
              )}
            </Box>
          </Box>
          <Button onClick={formik.handleSubmit}>Submit</Button>
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
                  value={formik.values.hardwareFinishes}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  {hardwareFinishes.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
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
                  name="handles.default"
                  style={{ width: "100%" }}
                  value={formik.values.handles.default}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  {Handles.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
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
                size="small"
                variant="outlined"
                name="handles.count"
                style={{
                  width: "250px",
                  paddingX: 10,
                }}
                value={formik.values.handles.count}
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
                  name="hinges.default"
                  style={{ width: "100%" }}
                  value={formik.values.hinges.default}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  {hinges.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
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
                size="small"
                variant="outlined"
                name="hinges.count"
                style={{
                  width: "250px",
                  paddingX: 10,
                }}
                value={formik.values.hinges.count}
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
                  name="pivotHinge.default"
                  style={{ width: "100%" }}
                  value={formik.values.pivotHinge.default}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  {pivotHingeOption.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
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
                size="small"
                variant="outlined"
                name="pivotHinge.count"
                style={{
                  width: "250px",
                  paddingX: 10,
                }}
                value={formik.values.pivotHinge.count}
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
                  name="pivotHinge.default"
                  style={{ width: "100%" }}
                  value={formik.values.heavyDuty.default}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  {heavyDutyOption.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
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
                size="small"
                variant="outlined"
                name="heavyDuty.countOne"
                style={{
                  width: "120px",
                }}
                value={formik.values.heavyDuty.countOne}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <TextField
                size="small"
                variant="outlined"
                name="heavyDuty.countTwo"
                style={{
                  width: "120px",

                  padding: 1,
                  marginX: 1,
                }}
                value={formik.values.heavyDuty.countTwo}
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
                  name="pivotHinge.default"
                  style={{ width: "100%" }}
                  value={formik.values.heavyPivot.default}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  {heavyPivotOption.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
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
                size="small"
                variant="outlined"
                name="heavyPivot.countOne"
                style={{
                  width: "120px",
                }}
                value={formik.values.heavyPivot.countOne}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <TextField
                size="small"
                variant="outlined"
                name="heavyPivot.countTwo"
                style={{
                  width: "120px",

                  padding: 1,
                  marginX: 1,
                }}
                value={formik.values.heavyPivot.countTwo}
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
                  name="channelorClamps"
                  style={{ width: "100%" }}
                  value={formik.values.channelorClamps}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  {channelorClamps.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                {formik.touched.channelorClamps &&
                  formik.errors.channelorClamps && (
                    <div>{formik.errors.channelorClamps}</div>
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
                  {mountingChannel.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
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

          <Box sx={{ border: "1px solid #EAECF0" }}>
            {formik.values.clamps.map((clamp, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  gap: 4,
                  alignContent: "center",
                  padding: "15px 10px 15px 10px",
                }}
              >
                {index === 0 && (
                  <div
                    style={{
                      width: "250px",
                      display: "flex",
                      padding: 4,
                      justifyContent: "space-between",
                    }}
                  >
                    <div>Clamps</div>

                    <div>{clamp.name}</div>
                  </div>
                )}

                {index !== 0 && (
                  <div
                    style={{
                      width: "250px",
                      textAlign: "right",
                      padding: 4,
                    }}
                  >
                    <div>{clamp.name}</div>
                  </div>
                )}

                <div style={{ width: "250px" }}>
                  <Box sx={{ width: "220px" }}>
                    <TextField
                      select
                      size="small"
                      variant="outlined"
                      name={`clamps[${index}].default`}
                      style={{ width: "100%" }}
                      value={clamp.default}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      {Clamps.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Box>
                </div>
                <Box style={{ width: "250px", paddingX: 10 }}>
                  <TextField
                    size="small"
                    variant="outlined"
                    name={`clamps[${index}].count`}
                    style={{ width: "250px", paddingX: 10 }}
                    value={clamp.count}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Box>
              </div>
            ))}
          </Box>

          {/*  clamps ends here*/}

          {/* Glass cl Glass */}
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
              Glass To Glass
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
                  name="default"
                  style={{ width: "100%" }}
                  value={formik.values.glassToGlass.default}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  {glassType.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
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
                name="count"
                style={{ width: "100%" }}
                value={formik.values.glassToGlass.count}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                {glassTypeCount.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </div>

          {/* Bar */}

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
              Bar
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
                  name="bar.default"
                  style={{ width: "100%" }}
                  value={formik.values.bar.default}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  {Handles.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
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
                size="small"
                variant="outlined"
                name="bar.count"
                style={{
                  width: "250px",
                  paddingX: 10,
                }}
                value={formik.values.bar.count}
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
                  name="outages.default"
                  style={{
                    width: "220px",
                    paddingX: 10,
                  }}
                  value={formik.values.outages.default}
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
                  {channelorClamps.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
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
                  {mountingChannel.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
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
                  {mountingChannel.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
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
                {formik.touched.other?.hours && formik.errors.other?.hours && (
                  <Box style={{ color: "red" }}>
                    {formik.errors.other.hours}
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </form>
  );
};

export default DefaultComponent;
