import React, { useState } from "react";
import { InputLabel, Select } from "@material-ui/core";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  MenuItem,
  TextField,
} from "@mui/material";
import { Add } from "@mui/icons-material";

const HardWareComponent = () => {
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
    { value: "option4", label: "Option 4" },
  ];
  const [selectedOptions, setSelectedOptions] = React.useState(["option1"]);

  const handleChange = (event) => {
    setSelectedOptions(event.target.value);
  };
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}
    >
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
            <InputLabel> Add Additional Finish Type</InputLabel>
            <Select
              variant="outlined"
              value={selectedOptions}
              onChange={handleChange}
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
        <div
          style={{
            width: "250px",
            padding: 4,

            alignItems: "center",
          }}
        >
          Hardware Part Number
          <TextField />
        </div>{" "}
        <div
          style={{
            width: "250px",
            padding: 4,

            alignItems: "center",
          }}
        >
          Cost
          <TextField />
        </div>{" "}
        <div
          style={{
            width: "250px",
            padding: 4,

            alignItems: "center",
          }}
        >
          Price
          <TextField />
        </div>{" "}
        <div
          style={{
            width: "400px",
            padding: 4,
            display: "flex",
            alignItems: "center",
            // background: "green",
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={isChecked}
                onChange={handleCheckboxChange}
                color="primary"
              />
            }
            label="Price by sqft"
          />
          <div style={{ width: "150px", padding: 4, alignItems: "center" }}>
            <FormControl style={{ width: "100%" }}>
              <InputLabel>Thickness</InputLabel>
              <Select
                variant="outlined"
                value={selectedOptions}
                onChange={handleChange}
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
          <IconButton>
            <Add style={{ color: "rgb(65, 106, 238)" }} />
          </IconButton>
        </div>{" "}
      </div>
    </div>
  );
};

export default HardWareComponent;
