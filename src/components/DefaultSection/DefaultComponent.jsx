import React, { useState } from "react";

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  MenuItem,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";

const DefaultComponent = () => {
  const finishTypeOptions = [
    { value: "one", label: "one" },
    { value: "two", label: "two" },
    { value: "three", label: "three" },
    { value: "four", label: "four" },
    { value: "five", label: "five" },
  ];
  const options = [
    { value: "Polished Chrome", label: "Polished Chrome" },
    { value: "Not Polished Chrome", label: "Not Polished Chrome" },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        marginTop: 4,
        // padding: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          alignContent: "center",
          // backgroundColor: "rgb(232, 232, 232)",
          paddingTop: 15,
          paddingBottom: 15,
          paddingLeft: "10px",
          paddingRight: "10px",

          // background: "red",
        }}
      >
        {" "}
        <Box
          style={{
            width: "380px",
            paddingX: 10,
            // background: "red",
          }}
        >
          <Box
            sx={{
              // background: "yellow",

              width: "300px",
              border: "1px solid #D0D5DD",
              borderRadius: 2,
              padding: 1,
              marginX: 1,
            }}
          >
            {" "}
            Door & Notched panel
          </Box>
        </Box>{" "}
        <div
          style={{
            width: "250px",

            padding: 4,
          }}
        ></div>{" "}
      </div>
    </div>
  );
};

export default DefaultComponent;
