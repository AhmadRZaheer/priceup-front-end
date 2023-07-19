import React, { useEffect, useState } from "react";
import React from "react";
import { Select } from "@material-ui/core";

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addFormEntry } from "../../redux/formSlice";

const HardwareForm = () => {
  const dispatch = useDispatch();
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
    { value: "option4", label: "Option 4" },
  ];

  const validationSchema = Yup.object({
    hardwarePartNumber: Yup.string().required(
      "Hardware Part Number is required"
    ),

    thickness: Yup.string().required("thickness is required"),

    cost: Yup.number().required("Cost is required"),

    price: Yup.number().required("Price is required"),
  });
  const formik = useFormik({
    initialValues: {
      additionalFinishType: "option1",
      hardwarePartNumber: "",
      cost: "5",
      price: "",
      isChecked: false,
      thickness: "optionsrr",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
    },
  });
  const handleAddFormEntry = () => {
    dispatch(
      addFormEntry({
        additionalFinishType: formik.values.additionalFinishType,
        hardwarePartNumber: formik.values.hardwarePartNumber,
        cost: formik.values.cost,
        price: formik.values.price,
        isChecked: formik.values.isChecked,
        thickness: formik.values.thickness,
      })
    );
  };

  const [hardwareDetail, setHardwareDetail] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${backendURL}/hardwares/category/${type}`
        );

        if (response.status === 200) {
          setHardwareDetail(response.data.data);
        } else {
          setError("An error occurred while fetching the data.");
        }
      } catch (error) {
        setError("An error occurred while fetching the data.");
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div
          style={{
            display: "flex",
            gap: 4,
            alignContent: "center",
            paddingTop: 4,
            paddingBottom: 4,
          }}
        >
          <div style={{ width: "250px", padding: 4, alignItems: "center" }}>
            <FormControl style={{ width: "100%" }}>
              <Typography>Add Additional Finish Type</Typography>

              <Select
                variant="outlined"
                value={formik.values.additionalFinishType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="additionalFinishType"
                style={{ width: "100%" }}
              >
                {options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {formik.touched.additionalFinishType &&
              formik.errors.additionalFinishType && (
                <div style={{ color: "red" }}>
                  {formik.errors.additionalFinishType}
                </div>
              )}
          </div>

          <div style={{ width: "250px", padding: 4, alignItems: "center" }}>
            <Typography>Hardware Part Number </Typography>
            <TextField
              variant="outlined"
              name="hardwarePartNumber"
              value={formik.values.hardwarePartNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Hardware Part Number"
              style={{ width: "100%" }}
            />
            {formik.touched.hardwarePartNumber &&
              formik.errors.hardwarePartNumber && (
                <div style={{ color: "red" }}>
                  {formik.errors.hardwarePartNumber}
                </div>
              )}
          </div>

          <div style={{ width: "250px", padding: 4, alignItems: "center" }}>
            <Typography>Cost</Typography>
            <TextField
              variant="outlined"
              name="cost"
              value={formik.values.cost}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Cost"
              style={{ width: "100%" }}
            />
            {formik.touched.cost && formik.errors.cost && (
              <div style={{ color: "red" }}>{formik.errors.cost}</div>
            )}
          </div>

          <div style={{ width: "250px", padding: 4, alignItems: "center" }}>
            <Typography>Price</Typography>
            <TextField
              variant="outlined"
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Price"
              style={{ width: "100%" }}
            />
            {formik.touched.price && formik.errors.price && (
              <div style={{ color: "red" }}>{formik.errors.price}</div>
            )}
          </div>

          <div
            style={{
              maxWidth: "400px",
              padding: 4,
              display: "flex",
              alignItems: "center",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.isChecked}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="isChecked"
                  color="primary"
                />
              }
              label="Price by sqft"
            />

            <div style={{ width: "150px", padding: 4, alignItems: "center" }}>
              <FormControl style={{ width: "100%" }}>
                <Typography>Thickness</Typography>
                <Select
                  variant="outlined"
                  value={formik.values.thickness}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="thickness"
                  style={{ width: "100%" }}
                >
                  {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <IconButton type="submit" onClick={handleAddFormEntry}>
              <Add style={{ color: "rgb(65, 106, 238)" }} />
            </IconButton>
          </div>
        </div>
      </form>
    </div>
  );
};

export default HardwareForm;
