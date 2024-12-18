import { Close, CloudUploadOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  ButtonBase,
  Container,
  Divider,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import React, { useRef } from "react";
import CustomInputField from "../ui-components/CustomInput";

const SigntureSection = () => {
  const MAX_FILE_SIZE = 1 * 1024 * 1024;
  const fileInputRef = useRef(null);
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (
      file &&
      ![
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/bmp",
        "image/webp",
      ].includes(file.type)
    ) {
      console.error("Please select a valid image file.");
      return;
    }
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        console.error(
          "File is too large. Please select a file less than 1 MB."
        );
        return;
      }
    }
  };
  return (
    <Box sx={{ background: "#000000", pb: 3,pt:4,borderTop:'5px solid #F95500' }}>
      <Container maxWidth="lg">
        <Typography
          sx={{
            fontFamily: '"Poppins" !important',
            fontSize: "32px",
            fontWeight: 600,
            lineHeight: "39.94px",
            color: "white",
            pb: 2,
          }}
        >
          Your Signature:
        </Typography>
        <Box sx={{ width: "100%", display: "flex", gap: 7 }}>
          <Box sx={{ width: "50%" }}>
            <Box sx={{ background: "white", borderRadius: 2, p: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}
                >
                  <Typography
                    sx={{
                      fontFamily: '"Inter" !important',
                      color: "#0B0B0B",
                      fontWeight: 700,
                      fontSize: "18px",
                      lineHeight: "26px",
                    }}
                  >
                    Media Upload
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: '"Inter" !important',
                      color: "#6D6D6D",
                      lineHeight: "20px",
                      fontSize: "14px",
                    }}
                  >
                    Upload your E-Signature here:
                  </Typography>
                </Box>
                <Box sx={{ alignContent: "center" }}>
                  <Close sx={{ height: "24px", width: "24px" }} />
                </Box>
              </Box>

              <Box sx={{ pt: 2 }}>
                <ButtonBase
                  onClick={handleUploadClick}
                  sx={{
                    width: "100%",
                    border: "1px dashed",
                    borderRadius: 2,
                    cursor: "pointer",
                    backgroundColor: "#F8FAFC",
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                    borderColor: "#1849D6",
                    p: "24px",
                  }}
                >
                  <Stack
                    direction={"column"}
                    sx={{
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                      gap: "12px",
                    }}
                  >
                    <Box>
                      <CloudUploadOutlined
                        sx={{ width: "36px", color: "#1849D6" }}
                      />
                    </Box>
                    <Typography
                      sx={{
                        color: "#0B0B0B",
                        lineHeight: "20px",
                        fontSize: "14px",
                        fontFamily: '"Inter" !important',
                      }}
                    >
                      Drag your file(s) or{" "}
                      <Box
                        component="span"
                        sx={{ color: "#1849D6 !important" }}
                      >
                        browse
                      </Box>
                    </Typography>
                    <Typography
                      sx={{
                        color: "#6D6D6D",
                        lineHeight: "20px",
                        fontSize: "14px",
                        fontFamily: '"Inter" !important',
                      }}
                    >
                      Max 10 MB files are allowed
                    </Typography>
                  </Stack>
                </ButtonBase>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                  // accept=".jpg,.jpeg,.png,.gif,.bmp,.webp"
                  accept="image/*"
                  capture={false}
                />
              </Box>
              <Typography sx={{ py: 2, color: "#6D6D6D", lineHeight: "20px",  fontSize: "14px",
                        fontFamily: '"Inter" !important', }}>
                Only support .jpg, .png and .svg and zip files
              </Typography>
              <Divider sx={{ color: "#6D6D6D" }}>OR</Divider>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.4,
                  pt: 2,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: 700,
                    lineHeight: "24px",
                    color: "#0B0B0B",
                    fontFamily: '"Inter" !important',
                  }}
                >
                  Type in your name
                </Typography>
                <CustomInputField
                  id="name"
                  name="name"
                  size="small"
                  variant="outlined"
                  placeholder="Name"
                  InputProps={{
                    style: {
                      color: "black",
                      borderRadius: 4,
                      backgroundColor: "white",
                      height: "52px",
                    },
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button
                          variant="outlined"
                          aria-label="toggle password visibility"
                          // onClick={handleClickShowPassword}
                          sx={{
                            fontWeight:`${600} !important`,
                            fontSize:'12px !important',
                            lineHeight:'18px !important',
                            height: "35px",
                            borderRadius: "8px !important",
                            color: "#6D6D6D",
                            borderColor: "#CECECE",
                            fontFamily: '"Inter" !important',
                          }}
                        >
                          {true ? "Done" : "Edit"}
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    color: { sm: "black", xs: "white" },
                    width: "100%",
                  }}
                  // value={formik.values.name}
                  // onChange={formik.handleChange}
                />
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              width: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box sx={{ width: "70%" }}>
              <Typography
                sx={{
                  fontFamily: '"Poppins" !important',
                  fontSize: "32px",
                  color: "white",
                  fontWeight: "700",
                  lineHeight: "39.94px",
                  pb: 3,
                }}
              >
                Your Estimate PDF is ready to download!{" "}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  fontFamily: '"Inter" !important',
                  height: "62px",
                  width: "285px",
                  borderRadius: "12px",
                  fontSize: "24px",
                  fontWeight: 700,
                  backgroundColor: "#F95500",
                  color: "#0B0B0B",
                  lineHeight: "26px",
                  "&:hover": {
                    backgroundColor: "#F95500",
                  },
                }}
              >
                Download PDF Now
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default SigntureSection;
