import React, { useState } from "react";
import door from "../../Assets/door.png";

import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  MenuItem,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { useDropzone } from "react-dropzone";

const DefaultComponent = () => {
  const finishTypeOptions = [
    { value: "one", label: "one" },
    { value: "two", label: "two" },
    { value: "three", label: "three" },
    { value: "four", label: "four" },
    { value: "five", label: "five" },
  ];
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
    // Add more options as needed
  ];
  const hardwareOptionsSetting = [
    "Hardware Finishes",
    "Hinges",
    "Pivot Hinge Option",
    "Heavy Duty Option",
    "Heavy Pivot Option",
    "Channel or Clamps",
    "Mounting Channel",
    "Clamps",
    "Mounting Channel",
  ];
  const [selectedImage, setSelectedImage] = useState(null);

  const onDrop = (acceptedFiles) => {
    setSelectedImage(acceptedFiles[0]);
    // setFieldValue("image", acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Box
      style={{
        display: "flex",
        marginTop: 4,
        // padding: 10,
        // backgroundColor: "pink",
      }}
    >
      {/* image */}
      <Box sx={{}}>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
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

                width: "315px",
                // border: "1px solid #D0D5DD",
                borderRadius: 2,
                // padding: 1,
                marginX: 1,
              }}
            >
              <Box>
                <input
                  accept="image/*"
                  id="image-input"
                  type="file"
                  {...getInputProps()}
                  style={{ display: "none" }}
                />

                {selectedImage ? (
                  <img
                    width={"100%"}
                    height={"400px"}
                    src={URL.createObjectURL(selectedImage)}
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
          </Box>{" "}
        </Box>
      </Box>
      <Box sx={{}}>
        {/* //row 1 */}
        <Box sx={{}}>
          <div
            style={{
              display: "flex",

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
            <div
              style={{
                width: "250px",

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
                {" "}
                <TextField
                  select
                  size="small"
                  variant="outlined"
                  name="thickness"
                  style={{ width: "100%" }}
                  defaultValue={options[0].value}
                >
                  {options.map((option) => (
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
        </Box>
        {/* //row 2 */}
        <Box sx={{}}>
          <div
            style={{
              display: "flex",

              gap: 4,

              alignContent: "center",

              paddingTop: 15,

              paddingBottom: 15,

              paddingLeft: "10px",

              paddingRight: "10px",

              // background: "red",
            }}
          >
            <div
              style={{
                width: "250px",

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
                {" "}
                <TextField
                  select
                  size="small"
                  variant="outlined"
                  name="thickness"
                  style={{ width: "100%" }}
                  defaultValue={options[0].value}
                >
                  {options.map((option) => (
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
                // background: "red",
              }}
            >
              <Box
                sx={{
                  // background: "yellow",

                  width: "220px",
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
          </div>
        </Box>
        {/* //row 3 */}
        <Box sx={{}}>
          <div
            style={{
              display: "flex",

              gap: 4,

              alignContent: "center",

              paddingTop: 15,

              paddingBottom: 15,

              paddingLeft: "10px",

              paddingRight: "10px",

              // background: "red",
            }}
          >
            <div
              style={{
                width: "250px",

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
                {" "}
                <TextField
                  select
                  size="small"
                  variant="outlined"
                  name="thickness"
                  style={{ width: "100%" }}
                  defaultValue={options[0].value}
                >
                  {options.map((option) => (
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
                // background: "red",
              }}
            >
              <Box
                sx={{
                  // background: "yellow",

                  width: "220px",
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
          </div>
        </Box>

        {/* //row 4 */}
        <Box sx={{}}>
          <div
            style={{
              display: "flex",

              gap: 4,

              alignContent: "center",

              paddingTop: 15,

              paddingBottom: 15,

              paddingLeft: "10px",

              paddingRight: "10px",

              // background: "red",
            }}
          >
            <div
              style={{
                width: "250px",

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
                {" "}
                <TextField
                  select
                  size="small"
                  variant="outlined"
                  name="thickness"
                  style={{ width: "100%" }}
                  defaultValue={options[0].value}
                >
                  {options.map((option) => (
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
                // background: "red",
              }}
            >
              <Box
                sx={{
                  // background: "yellow",

                  width: "220px",
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
          </div>
        </Box>
        {/* //row 5 */}
        <Box sx={{}}>
          <div
            style={{
              display: "flex",

              gap: 4,

              alignContent: "center",

              paddingTop: 15,

              paddingBottom: 15,

              paddingLeft: "10px",

              paddingRight: "10px",

              // background: "red",
            }}
          >
            <div
              style={{
                width: "250px",

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
                {" "}
                <TextField
                  select
                  size="small"
                  variant="outlined"
                  name="thickness"
                  style={{ width: "100%" }}
                  defaultValue={options[0].value}
                >
                  {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </div>
            <Box
              style={{
                display: "flex",
                width: "250px",
                paddingX: 10,
                // background: "red",
              }}
            >
              <Box
                sx={{
                  // background: "yellow",

                  width: "110px",
                  border: "1px solid #D0D5DD",
                  borderRadius: 2,
                  padding: 1,
                  marginX: 1,
                }}
              >
                {" "}
                85
              </Box>
              <Box
                sx={{
                  // background: "yellow",

                  width: "110px",
                  border: "1px solid #D0D5DD",
                  borderRadius: 2,
                  padding: 1,
                  marginX: 1,
                }}
              >
                {" "}
                85
              </Box>
            </Box>{" "}
          </div>
        </Box>
        {/* //row 6 */}
        <Box sx={{}}>
          <div
            style={{
              display: "flex",

              gap: 4,

              alignContent: "center",

              paddingTop: 15,

              paddingBottom: 15,

              paddingLeft: "10px",

              paddingRight: "10px",

              // background: "red",
            }}
          >
            <div
              style={{
                width: "250px",

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
                {" "}
                <TextField
                  select
                  size="small"
                  variant="outlined"
                  name="thickness"
                  style={{ width: "100%" }}
                  defaultValue={options[0].value}
                >
                  {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </div>
            <Box
              style={{
                display: "flex",
                width: "250px",
                paddingX: 10,
                // background: "red",
              }}
            >
              <Box
                sx={{
                  // background: "yellow",

                  width: "110px",
                  border: "1px solid #D0D5DD",
                  borderRadius: 2,
                  padding: 1,
                  marginX: 1,
                }}
              >
                {" "}
                85
              </Box>
              <Box
                sx={{
                  // background: "yellow",

                  width: "110px",
                  border: "1px solid #D0D5DD",
                  borderRadius: 2,
                  padding: 1,
                  marginX: 1,
                }}
              >
                {" "}
                85
              </Box>
            </Box>{" "}
          </div>
        </Box>

        {/* //row 7 */}
        <Box sx={{}}>
          <div
            style={{
              display: "flex",

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
            <div
              style={{
                width: "250px",

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
                {" "}
                <TextField
                  select
                  size="small"
                  variant="outlined"
                  name="thickness"
                  style={{ width: "100%" }}
                  defaultValue={options[0].value}
                >
                  {options.map((option) => (
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
        </Box>
        {/* //row 8 */}
        <Box sx={{}}>
          <div
            style={{
              display: "flex",

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
            <div
              style={{
                width: "250px",

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
                {" "}
                <TextField
                  select
                  size="small"
                  variant="outlined"
                  name="thickness"
                  style={{ width: "100%" }}
                  defaultValue={options[0].value}
                >
                  {options.map((option) => (
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
        </Box>
        {/* //row 9 */}
        <Box sx={{}}>
          <div
            style={{
              display: "flex",

              gap: 4,

              alignContent: "center",

              paddingTop: 15,

              paddingBottom: 15,

              paddingLeft: "10px",

              paddingRight: "10px",

              // background: "red",
            }}
          >
            <div
              style={{
                width: "250px",

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
                {" "}
                <TextField
                  select
                  size="small"
                  variant="outlined"
                  name="thickness"
                  style={{ width: "100%" }}
                  defaultValue={options[0].value}
                >
                  {options.map((option) => (
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
                // background: "red",
              }}
            >
              <Box
                sx={{
                  // background: "yellow",

                  width: "220px",
                  border: "1px solid #D0D5DD",
                  borderRadius: 2,
                  padding: 1,
                  marginX: 1,
                }}
              >
                {" "}
                3
              </Box>
            </Box>{" "}
          </div>
        </Box>
        {/* row 10 */}
        <Box sx={{}}>
          <div
            style={{
              display: "flex",

              gap: 4,

              alignContent: "center",

              paddingTop: 15,

              paddingBottom: 15,

              paddingLeft: "10px",

              paddingRight: "10px",

              // background: "red",
            }}
          >
            <div
              style={{
                width: "250px",

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
                {" "}
                <TextField
                  select
                  size="small"
                  variant="outlined"
                  name="thickness"
                  style={{ width: "100%" }}
                  defaultValue={options[0].value}
                >
                  {options.map((option) => (
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
                // background: "red",
              }}
            >
              <Box
                sx={{
                  // background: "yellow",

                  width: "220px",
                  border: "1px solid #D0D5DD",
                  borderRadius: 2,
                  padding: 1,
                  marginX: 1,
                }}
              >
                {" "}
                count
              </Box>
            </Box>{" "}
          </div>
        </Box>
        {/* row 11 */}
        <Box sx={{}}>
          <div
            style={{
              display: "flex",

              gap: 4,

              alignContent: "center",

              paddingTop: 15,

              paddingBottom: 15,

              paddingLeft: "10px",

              paddingRight: "10px",

              // background: "red",
            }}
          >
            <div
              style={{
                width: "250px",

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
                {" "}
                <TextField
                  select
                  size="small"
                  variant="outlined"
                  name="thickness"
                  style={{ width: "100%" }}
                  defaultValue={options[0].value}
                >
                  {options.map((option) => (
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
                // background: "red",
              }}
            >
              <Box
                sx={{
                  // background: "yellow",

                  width: "220px",
                  border: "1px solid #D0D5DD",
                  borderRadius: 2,
                  padding: 1,
                  marginX: 1,
                }}
              >
                {" "}
                count
              </Box>
            </Box>{" "}
          </div>
        </Box>
        {/* row 12 */}
        <Box sx={{}}>
          <div
            style={{
              display: "flex",

              gap: 4,

              alignContent: "center",

              paddingTop: 15,

              paddingBottom: 15,

              paddingLeft: "10px",

              paddingRight: "10px",

              // background: "red",
            }}
          >
            <div
              style={{
                width: "250px",

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
                {" "}
                <TextField
                  select
                  size="small"
                  variant="outlined"
                  name="thickness"
                  style={{ width: "100%" }}
                  defaultValue={options[0].value}
                >
                  {options.map((option) => (
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
                padding: 1,
                marginX: 1,
              }}
            >
              <Box sx={{ width: "250px" }}>
                {" "}
                <TextField
                  select
                  size="small"
                  variant="outlined"
                  name="thickness"
                  style={{ width: "100%" }}
                  defaultValue={options[0].value}
                >
                  {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </div>
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default DefaultComponent;
