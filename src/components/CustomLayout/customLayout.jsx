import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import CustomImage from "../../Assets/customlayoutimage.svg";
import { KeyboardArrowLeft } from "@mui/icons-material";
import { setNavigation, setNavigationDesktop } from "../../redux/estimateCalculations";
import { useDispatch } from "react-redux";
const customInitalValues = {
  aWidth: '',
  aHeight: '',
  bWidth: '',
  bHeight: '',
  cWidth: '',
  cHeight: '',
  dWidth: '',
  dHeight: '',
  eWidth: '',
  eHeight: '',
  fWidth: '',
  fHeight: '',
  gWidth: '',
  gHeight: '',
  hWidth: '',
  hHeight: '',
}
const CustomLayout = () => {
  const formik = useFormik({
    initialValues: { ...customInitalValues },
    onSubmit: async (values, resetForm) => {
      console.log(values)
      // dispatch(setNavigation("review"));
      // dispatch(setNavigationDesktop("review"));
    },
  });
  const dispatch = useDispatch()
  const handleback = () => {
    dispatch(setNavigation("layouts"));
    dispatch(setNavigationDesktop("layouts"));
  }
  const handleReset = () => {
    formik.resetForm({
      values: { ...customInitalValues },
    });
  }
  return (
    <>
      <Box
        sx={{
          width: { lg: "90%", md: "78%", sm: "100%", sx: "100%" },
          marginX: "auto",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          p: { lg: 4, md: 2, sx: 0 },
          gap: { md: 4, xs: 0 },
          height: "100vh",
          m: "auto",
          background: { md: "white", xs: "#08061B" },
        }}
      >
        <Box
          sx={{
            display: { md: "none", xs: "flex" },
            zIndex: 1,
            justifyContent: { md: "center", xs: "start" },
            background: "#18133b",
            width: "100%",
            color: "white",
            paddingY: 1,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,

            marginTop: 7.9,
          }}
        >
          <Typography
            textAlign={"center"}
            sx={{ fontSize: { md: 42, xs: 30 } }}
          >
            <KeyboardArrowLeft onClick={() => {
              dispatch(setNavigation('layouts'));
            }} sx={{ fontSize: 30, mb: -0.6 }} />
            Create New Estimate
          </Typography>
        </Box>
        <Typography
          sx={{ display: { md: "block", xs: "none" } }}
          textAlign={"center"}
          variant="h4"
        >
          Create New Estimate
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Box
            sx={{
              height: "100%",
              borderRadius: { md: "12px", xs: 0 },
              boxShadow:
                "0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)",
              border: { md: "1px solid #EAECF0", xs: "none" },
              paddingX: { md: 2, xs: 0 },
              paddingY: { md: 4, xs: 0 },
              rowGap: 4,
              background: { md: "white", xs: "#08061B" },
              display: "flex",
              flexDirection: "column",

              minWidth: { md: 700, xs: "100%" },
              maxWidth: { md: 1000, xs: "100%" },
            }}
          >
            <Box
              sx={{
                paddingLeft: { md: 0, xs: 3 },
                paddingTop: { md: 2, xs: 2 },
              }}
            >
              <Typography
                sx={{
                  fontSize: { md: "18px", xs: "18px" },
                  color: { md: "black", xs: "white" },
                  paddingBottom: 1,
                }}
              >
                Enter Measurements
              </Typography>
              <Typography
                sx={{ color: { md: "#667085", xs: "white" }, font: "14px" }}
              >
                Your new project has been created. Invite colleagues to
                collaborate on this project.
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: { md: "row", xs: "column-reverse" },
                width: { md: "96.5%", xs: "100%" },
                paddingY: { md: 4, xs: 0 },
                paddingX: { md: 2, xs: 0 },
                height: "100%",
                background: { md: "#D9D9D9", xs: "#08061B" },
                gap: 4,
                borderRadius: "8px",
                overflow: "auto",
                mb: { md: 0, xs: 9 },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  width: { md: "48.5%", xs: "91.6%" },
                  maxHeight: "100%",
                  minHeight: 100,
                  flexDirection: "column",
                  gap: { md: 1, xs: 2 },
                  color: { md: "black", xs: "white" },
                  background: {
                    md: "none",
                    xs: "linear-gradient(to top right, #100d24 35%, #312969 , #100d24 82%)",
                  },
                  borderTopLeftRadius: { md: 0, xs: 30 },
                  borderTopRightRadius: { md: 0, xs: 30 },
                  borderTop: { md: 0, xs: "1px solid #667085" },
                  paddingX: { md: 0, xs: 2 },
                  paddingY: { md: 0, xs: 2 },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: { md: 13, xs: 16 },
                    ml: 2,
                    justifyContent: "center",
                    width: { md: 315, xs: "100%" },
                  }}
                >
                  <Typography sx={{ fontSize: 18, color: "#9c9c9c" }}>
                    Width
                  </Typography>

                  <Typography sx={{ fontSize: 18, color: "#9c9c9c" }}>
                    Height
                  </Typography>
                </Box>
                {/* a */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  <Typography sx={{ mr: 2, width: 9 }}>a</Typography>
                  <TextField
                    type="number"
                    size="small"
                    variant="outlined"
                    name="aWidth"
                    placeholder="0"
                    style={{
                      background: "white",
                      borderRadius: "8px",
                      border: "1px solid #D0D5DD",
                      width: { md: "28%", xs: "50%" },
                    }}
                    value={formik.values.aWidth}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <TextField
                    type="number"
                    size="small"
                    variant="outlined"
                    name="aHeight"
                    placeholder="0"
                    style={{
                      background: "white",
                      borderRadius: "8px",
                      border: "1px solid #D0D5DD",
                      width: { md: "28%", xs: "50%" },
                    }}
                    value={formik.values.aHeight}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Box>
                {/* b */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  <Typography sx={{ mr: 2, width: 9 }}>b</Typography>
                  <TextField
                    type="number"
                    size="small"
                    variant="outlined"
                    name="bWidth"
                    placeholder="0"
                    style={{
                      background: "white",
                      borderRadius: "8px",
                      border: "1px solid #D0D5DD",
                      width: { md: "28%", xs: "50%" },
                    }}
                    value={formik.values.bWidth}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <TextField
                    type="number"
                    size="small"
                    variant="outlined"
                    name="bHeight"
                    placeholder="0"
                    style={{
                      background: "white",
                      borderRadius: "8px",
                      border: "1px solid #D0D5DD",
                      width: { md: "28%", xs: "50%" },
                    }}
                    value={formik.values.bHeight}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Box>
                {/* c */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  <Typography sx={{ mr: 2, width: 9 }}>c</Typography>
                  <TextField
                    type="number"
                    size="small"
                    variant="outlined"
                    name="cWidth"
                    placeholder="0"
                    style={{
                      background: "white",
                      borderRadius: "8px",
                      border: "1px solid #D0D5DD",
                      width: { md: "28%", xs: "50%" },
                    }}
                    value={formik.values.cWidth}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <TextField
                    type="number"
                    size="small"
                    variant="outlined"
                    name="cHeight"
                    placeholder="0"
                    style={{
                      background: "white",
                      borderRadius: "8px",
                      border: "1px solid #D0D5DD",
                      width: { md: "28%", xs: "50%" },
                    }}
                    value={formik.values.cHeight}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Box>
                {/* d */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  <Typography sx={{ mr: 2, width: 9 }}>d</Typography>
                  <TextField
                    type="number"
                    size="small"
                    variant="outlined"
                    name="dWidth"
                    placeholder="0"
                    style={{
                      background: "white",
                      borderRadius: "8px",
                      border: "1px solid #D0D5DD",
                      width: { md: "28%", xs: "50%" },
                    }}
                    value={formik.values.dWidth}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <TextField
                    type="number"
                    size="small"
                    variant="outlined"
                    name="dHeight"
                    placeholder="0"
                    style={{
                      background: "white",
                      borderRadius: "8px",
                      border: "1px solid #D0D5DD",
                      width: { md: "28%", xs: "50%" },
                    }}
                    value={formik.values.dHeight}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Box>
                {/* e */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  <Typography sx={{ mr: 2, width: 9 }}>e</Typography>
                  <TextField
                    type="number"
                    size="small"
                    variant="outlined"
                    name="eWidth"
                    placeholder="0"
                    style={{
                      background: "white",
                      borderRadius: "8px",
                      border: "1px solid #D0D5DD",
                      width: { md: "28%", xs: "50%" },
                    }}
                    value={formik.values.eWidth}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <TextField
                    type="number"
                    size="small"
                    variant="outlined"
                    name="eHeight"
                    placeholder="0"
                    style={{
                      background: "white",
                      borderRadius: "8px",
                      border: "1px solid #D0D5DD",
                      width: { md: "28%", xs: "50%" },
                    }}
                    value={formik.values.eHeight}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Box>
                {/* f */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  <Typography sx={{ mr: 2, width: 9 }}>f</Typography>
                  <TextField
                    type="number"
                    size="small"
                    variant="outlined"
                    name="fWidth"
                    placeholder="0"
                    style={{
                      background: "white",
                      borderRadius: "8px",
                      border: "1px solid #D0D5DD",
                      width: { md: "28%", xs: "50%" },
                    }}
                    value={formik.values.fWidth}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <TextField
                    type="number"
                    size="small"
                    variant="outlined"
                    name="fHeight"
                    placeholder="0"
                    style={{
                      background: "white",
                      borderRadius: "8px",
                      border: "1px solid #D0D5DD",
                      width: { md: "28%", xs: "50%" },
                    }}
                    value={formik.values.fHeight}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Box>
                {/* g */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  <Typography sx={{ mr: 2, width: 9 }}>g</Typography>
                  <TextField
                    type="number"
                    size="small"
                    variant="outlined"
                    name="gWidth"
                    placeholder="0"
                    style={{
                      background: "white",
                      borderRadius: "8px",
                      border: "1px solid #D0D5DD",
                      width: { md: "28%", xs: "50%" },
                    }}
                    value={formik.values.gWidth}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <TextField
                    type="number"
                    size="small"
                    variant="outlined"
                    name="gHeight"
                    placeholder="0"
                    style={{
                      background: "white",
                      borderRadius: "8px",
                      border: "1px solid #D0D5DD",
                      width: { md: "28%", xs: "50%" },
                    }}
                    value={formik.values.gHeight}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Box>
                {/* h */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  <Typography sx={{ mr: 2, width: 9 }}>h</Typography>
                  <TextField
                    type="number"
                    size="small"
                    variant="outlined"
                    name="hWidth"
                    placeholder="0"
                    style={{
                      background: "white",
                      borderRadius: "8px",
                      border: "1px solid #D0D5DD",
                      width: { md: "28%", xs: "50%" },
                    }}
                    value={formik.values.hWidth}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <TextField
                    type="number"
                    size="small"
                    variant="outlined"
                    name="hHeight"
                    placeholder="0"
                    style={{
                      background: "white",
                      borderRadius: "8px",
                      border: "1px solid #D0D5DD",
                      width: { md: "28%", xs: "50%" },
                    }}
                    value={formik.values.hHeight}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  width: { md: "48.5%", xs: "100%" },
                  justifyContent: "center",
                  alignItems: "center",
                  maxHeight: "fit-contant",
                  minHeight: 100,
                }}
              >
                <img
                  width="300px"
                  height="340px"
                  src={CustomImage}
                  alt="Selected"
                />
              </Box>
            </Box>

            <Box
              sx={{
                position: { md: "static", xs: "fixed" },
                bottom: { md: 100, xs: 0 },
                background: { md: "transparent", xs: "#100d24" },
                py: 2,
                display: "flex",
                justifyContent: { md: "space-between", xs: "center" },
                width: "100%",
                borderTop: { md: "0px", xs: "1px solid white" },
              }}
            >
              <Box
                sx={{
                  width: { md: "160px", xs: "50%" },
                  display: { md: "block", xs: "none" },
                }}
              >
                <Button
                  fullWidth
                  onClick={handleReset}
                  sx={{
                    boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
                    color: "#344054",
                    textTransform: "initial",
                    border: "1px solid #D0D5DD",
                    backgroundColor: { md: "transparent", xs: "white" },
                    height: 40,
                    fontSize: 20,
                  }}
                >
                  Reset
                </Button>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  justifyContent: { md: "end", xs: "space-between" },
                  width: "92%",
                }}
              >
                <Box sx={{ width: { md: "150px", xs: "50%" } }}>
                  <Button
                    fullWidth
                    onClick={handleback}
                    sx={{
                      boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
                      color: "#344054",
                      textTransform: "initial",
                      border: "1px solid #D0D5DD",
                      backgroundColor: { md: "transparent", xs: "white" },
                      height: 40,
                      fontSize: 20,
                    }}
                  >
                    {" "}
                    Back
                  </Button>
                </Box>
                <Box sx={{ width: { md: "150px", xs: "50%" } }}>
                  <Button
                    type="submit"
                    fullWidth
                    // disabled={Object.keys(formik.values).some(
                    //   (key) => !formik.values[key]
                    // )}
                    sx={{
                      height: 40,
                      fontSize: 20,
                      backgroundColor: "#8477da",
                      "&:hover": {
                        backgroundColor: "#8477da",
                      },
                    }}
                    variant="contained"
                  >
                    Next
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default CustomLayout;
