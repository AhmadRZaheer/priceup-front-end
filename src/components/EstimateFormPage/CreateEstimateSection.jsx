import { KeyboardArrowRight, Label } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  Radio,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CustomInputField from "../ui-components/CustomInput";
import { inputMaxValue } from "@/utilities/constants";

const CreateEstimateSection = ({ next, back }) => {
  const [selections, setSelections] = useState({
    glass: null,
    finish: null,
    handle: null,
    hinge: null,
    lock: null,
  });

  const handleChange = (key, value) => {
    setSelections((prevSelections) => ({
      ...prevSelections,
      [key]: value,
    }));
  };
  // Dimensions
  const [dimensions, setDimensions] = useState({
    height: "",
    width: "",
    depth: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDimensions((prevDimensions) => ({
      ...prevDimensions,
      [name]: value,
    }));
  };
  const isFormValid =
    selections.glass &&
    selections.finish &&
    selections.handle &&
    selections.hinge &&
    selections.lock &&
    dimensions.height &&
    dimensions.width &&
    dimensions.depth;

  console.log(selections, dimensions, "dfdfdfd");

  return (
    <Box
      sx={{
        bgcolor: "#FFFFFF",
        p: "24px 16px 24px 16px",
        borderRadius: "12px",
      }}
    >
      <Box>
        <Typography
          sx={{
            fontSize: { lg: 24, md: 20 },
            fontWeight: 600,
            color: "#000000",
            display: "flex",
            lineHeight: "32.78px",
            gap: 1,
          }}
        >
          Estimate Detail
        </Typography>
        <Typography
          sx={{
            color: "#212528",
            fontSize: { lg: 16, md: 14 },
            fontWeight: 600,
            lineHeight: "21.86px",
            opacity: "70%",
          }}
        >
          Create, edit and manage your Estimate.
        </Typography>
      </Box>
      <Stack direction="row" sx={{ pt: 6, gap: 2 }}>
        <Box sx={{ width: "40%", display: "flex", justifyContent: "center" }}>
          <Box sx={{}}>
            <img
              src="http://3.219.213.248:5000/images/layouts/layout_7.png"
              height="450px"
              alt="not"
            />
            <Typography
              sx={{
                fontSize: { lg: 24, md: 20 },
                fontWeight: 600,
                color: "#000000",
                display: "flex",
                lineHeight: "32.78px",
                gap: 1,
                pt: 1.5,
              }}
            >
              Double Sliding Door
            </Typography>
          </Box>
        </Box>
        <Box sx={{ width: "60%" }}>
          <Typography
            sx={{
              fontSize: { lg: 24, md: 20 },
              fontWeight: 600,
              color: "#000000",
              display: "flex",
              lineHeight: "32.78px",
              gap: 1,
            }}
          >
            Select Your Customizations
          </Typography>
          <Box sx={{ pt: 5 }}>
            <Typography
              sx={{
                color: "#212528",
                fontSize: { lg: 16, md: 14 },
                fontWeight: 600,
                lineHeight: "21.86px",
                opacity: "70%",
              }}
            >
              Glass Finish Options
            </Typography>
            <Grid container sx={{ pt: 2, gap: 2 }}>
              {Array.from({ length: 5 }).map((_, index) => {
                const value = `option${index + 1}`;
                return (
                  <Box
                    key={index}
                    sx={{
                      background: selections.glass === value ? "#F3F5F6" : "",
                      width: "175px",
                      display: "flex",
                      p: 1.5,
                      cursor: "pointer",
                    }}
                    onClick={() => handleChange("glass", value)}
                  >
                    <FormControlLabel
                      value={value}
                      control={
                        <Radio
                          checked={selections.glass === value}
                          onChange={() => handleChange("glass", value)}
                          sx={{
                            color: "#8477DA",
                            "&.Mui-checked": {
                              color: "#8477DA",
                            },
                          }}
                        />
                      }
                    />
                    <Box>
                      <img
                        src="http://3.219.213.248:5000/images/wineCellarGlassTypes/Clear.png"
                        alt="Clear Glass"
                        height="120px"
                      />
                      <Typography
                        sx={{
                          color: "#212528",
                          lineHeight: "21.86px",
                          opacity: "70%",
                          textAlign: "center",
                        }}
                      >
                        Clear {index + 1}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            </Grid>
          </Box>
          <hr style={{ marginTop: "40px" }} />
          <Box sx={{ pt: 5 }}>
            <Typography
              sx={{
                color: "#212528",
                fontSize: { lg: 16, md: 14 },
                fontWeight: 600,
                lineHeight: "21.86px",
                opacity: "70%",
              }}
            >
              Hardware Finish Options
            </Typography>
            <Grid container sx={{ pt: 2, gap: 2 }}>
              {Array.from({ length: 5 }).map((_, index) => {
                const value = `option${index + 1}`;
                return (
                  <Box
                    key={index}
                    sx={{
                      background: selections.finish === value ? "#F3F5F6" : "",
                      width: "175px",
                      display: "flex",
                      p: 1.5,
                      cursor: "pointer",
                    }}
                    onClick={() => handleChange("finish", value)}
                  >
                    <FormControlLabel
                      value={value}
                      control={
                        <Radio
                          checked={selections.finish === value}
                          onChange={() => handleChange("finish", value)}
                          sx={{
                            color: "#8477DA",
                            "&.Mui-checked": {
                              color: "#8477DA",
                            },
                          }}
                        />
                      }
                    />
                    <Box>
                      <img
                        src="http://3.219.213.248:5000/images/wineCellarFinishes/polished_nickle.jpg"
                        alt="polished_nickle"
                        height="120px"
                      />
                      <Typography
                        sx={{
                          color: "#212528",
                          lineHeight: "21.86px",
                          opacity: "70%",
                          textAlign: "center",
                        }}
                      >
                        Brushed Nickel {index + 1}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            </Grid>
          </Box>
          <hr style={{ marginTop: "40px" }} />
          <Box sx={{ pt: 5 }}>
            <Typography
              sx={{
                color: "#212528",
                fontSize: { lg: 16, md: 14 },
                fontWeight: 600,
                lineHeight: "21.86px",
                opacity: "70%",
              }}
            >
              Handle Type
            </Typography>
            <Grid container sx={{ pt: 2, gap: 2 }}>
              {Array.from({ length: 5 }).map((_, index) => {
                const value = `option${index + 1}`;
                return (
                  <Box
                    key={index}
                    sx={{
                      background: selections.handle === value ? "#F3F5F6" : "",
                      width: "175px",
                      display: "flex",
                      p: 1.5,
                      cursor: "pointer",
                    }}
                    onClick={() => handleChange("handle", value)}
                  >
                    <FormControlLabel
                      value={value}
                      control={
                        <Radio
                          checked={selections.handle === value}
                          onChange={() => handleChange("handle", value)}
                          sx={{
                            color: "#8477DA",
                            "&.Mui-checked": {
                              color: "#8477DA",
                            },
                          }}
                        />
                      }
                    />
                    <Box>
                      <img
                        src="http://3.219.213.248:5000/images/wineCellarHardwares/LP8X8.png"
                        alt="polished_nickle"
                        height="120px"
                      />
                      <Typography
                        sx={{
                          color: "#212528",
                          lineHeight: "21.86px",
                          opacity: "70%",
                          textAlign: "center",
                        }}
                      >
                        8" D-Pull Back to Back Handle {index + 1}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            </Grid>
          </Box>
          <hr style={{ marginTop: "40px" }} />
          <Box sx={{ pt: 5 }}>
            <Typography
              sx={{
                color: "#212528",
                fontSize: { lg: 16, md: 14 },
                fontWeight: 600,
                lineHeight: "21.86px",
                opacity: "70%",
              }}
            >
              Hinge Type
            </Typography>
            <Grid container sx={{ pt: 2, gap: 2 }}>
              {Array.from({ length: 5 }).map((_, index) => {
                const value = `option${index + 1}`;
                return (
                  <Box
                    key={index}
                    sx={{
                      background: selections.hinge === value ? "#F3F5F6" : "",
                      width: "175px",
                      display: "flex",
                      p: 1.5,
                      cursor: "pointer",
                    }}
                    onClick={() => handleChange("hinge", value)}
                  >
                    <FormControlLabel
                      value={value}
                      control={
                        <Radio
                          checked={selections.hinge === value}
                          onChange={() => handleChange("hinge", value)}
                          sx={{
                            color: "#8477DA",
                            "&.Mui-checked": {
                              color: "#8477DA",
                            },
                          }}
                        />
                      }
                    />
                    <Box>
                      <img
                        src="http://3.219.213.248:5000/images/wineCellarHardwares/SRPPH01.png"
                        alt="polished_nickle"
                        height="120px"
                      />
                      <Typography
                        sx={{
                          color: "#212528",
                          lineHeight: "21.86px",
                          opacity: "70%",
                          textAlign: "center",
                        }}
                      >
                        Standard Pivot Hinge {index + 1}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            </Grid>
          </Box>
          <hr style={{ marginTop: "40px" }} />
          <Box sx={{ pt: 5 }}>
            <Typography
              sx={{
                color: "#212528",
                fontSize: { lg: 16, md: 14 },
                fontWeight: 600,
                lineHeight: "21.86px",
                opacity: "70%",
              }}
            >
              Lock
            </Typography>
            <>
              <Grid container sx={{ pt: 2, gap: 2 }}>
                {Array.from({ length: 2 }).map((_, index) => {
                  const value = `option${index + 1}`;
                  return (
                    <Box
                      key={index}
                      sx={{
                        background: selections.lock === value ? "#F3F5F6" : "",
                        width: "175px",
                        display: "flex",
                        p: 1.5,
                        cursor: "pointer",
                      }}
                      onClick={() => handleChange("lock", value)}
                    >
                      <FormControlLabel
                        value={value}
                        control={
                          <Radio
                            checked={selections.lock === value}
                            onChange={() => handleChange("lock", value)}
                            sx={{
                              color: "#8477DA",
                              "&.Mui-checked": {
                                color: "#8477DA",
                              },
                            }}
                          />
                        }
                      />
                      <Box alignSelf="center">
                        <Typography
                          sx={{
                            color: "#212528",
                            lineHeight: "21.86px",
                            opacity: "70%",
                            textAlign: "center",
                          }}
                        >
                          {index === 0 ? "With Lock" : "Without Lock"}
                        </Typography>
                      </Box>
                    </Box>
                  );
                })}
              </Grid>
              <Box sx={{ pt: 2 }}>
                <img
                  src="http://3.219.213.248:5000/images/wineCellarHardwares/Glass-Door-Lock-300x204.png"
                  alt="polished_nickle"
                  height="120px"
                />
              </Box>
            </>
          </Box>
          <hr style={{ marginTop: "40px" }} />
          <Box sx={{ pt: 5 }}>
            <Typography
              sx={{
                fontSize: { lg: 24, md: 20 },
                fontWeight: 600,
                color: "#000000",
                display: "flex",
                lineHeight: "32.78px",
                gap: 1,
              }}
            >
              Dimensions
            </Typography>
            <Stack direction="row" gap={2} pt={2}>
              <Box sx={{ width: "180px" }}>
                <Typography pb={1}>Height:</Typography>
                <CustomInputField
                  fullWidth
                  variant="outlined"
                  type="number"
                  inputProps={{ min: 0, max: inputMaxValue }}
                  name="height"
                  placeholder="Height"
                  value={dimensions.height}
                  onChange={handleInputChange}
                />
              </Box>
              <Box sx={{ width: "180px" }}>
                <Typography pb={1}>Width:</Typography>
                <CustomInputField
                  fullWidth
                  variant="outlined"
                  type="number"
                  inputProps={{ min: 0, max: inputMaxValue }}
                  name="width"
                  placeholder="Width"
                  value={dimensions.width}
                  onChange={handleInputChange}
                />
              </Box>
              <Box sx={{ width: "180px" }}>
                <Typography pb={1}>Depth:</Typography>
                <CustomInputField
                  fullWidth
                  variant="outlined"
                  type="number"
                  inputProps={{ min: 0, max: inputMaxValue }}
                  name="depth"
                  placeholder="Depth"
                  value={dimensions.depth}
                  onChange={handleInputChange}
                />
              </Box>
            </Stack>
          </Box>
          <hr style={{ marginTop: "40px" }} />
        </Box>
      </Stack>
      <Stack
        direction="row"
        sx={{ pt: 3, justifyContent: "space-between", width: "100%" }}
      >
        <Button
          sx={{
            backgroundColor: "#8477DA",
            "&:hover": {
              backgroundColor: "#8477da",
            },
            position: "relative",
            fontWeight: 600,
            fontSize: "16px",
          }}
          variant="contained"
          onClick={back}
        >
          <KeyboardArrowRight sx={{ transform: "rotate(180deg)" }} /> Back
        </Button>
        <Button
          sx={{
            backgroundColor: "#8477DA",
            "&:hover": {
              backgroundColor: "#8477da",
            },
            position: "relative",
            fontWeight: 600,
            fontSize: "16px",
          }}
          variant="contained"
          onClick={next}
          disabled={!isFormValid}
        >
          Next <KeyboardArrowRight />
        </Button>
      </Stack>
    </Box>
  );
};

export default CreateEstimateSection;
