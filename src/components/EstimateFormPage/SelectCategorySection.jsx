import { EstimateCategory } from "@/utilities/constants";
import { Box, Button, Stack, Typography, Grid } from "@mui/material";
import React, { useState } from "react";
import DefaultIcon from "@/Assets/columns.svg";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useDispatch, useSelector } from "react-redux";
import { getEstimateCategory, setEstimateCategory } from "@/redux/globalEstimateForm";

const boxStyles = {
  minHeight: "182px",
  minWidth: "180px",
  margin: "auto",
  borderRadius: "12px",
  boxShadow:
    "0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)",
  border: "1px solid #EAECF0",
  p: 2,
  background: "#D9D9D9",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 3,
  flexDirection: "column",
  cursor: "pointer",
};

const SelectCategorySection = ({ next, back }) => {
  const dispatch = useDispatch();
  const getCategory = useSelector(getEstimateCategory)
  const [category, setCategory] = useState(getCategory ?? "");
  const handleBoxClick = (category) => {
    dispatch(setEstimateCategory(category))
    setCategory(category);
    console.log(category)
  };
  return (
    <>
      <Box
        sx={{
          bgcolor: "#FFFFFF",
          p: "24px 16px 24px 16px",
          borderRadius: "12px",
        }}
      >
        <Stack direction="column" gap="4px">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: 700,
                lineHeight: "21.09px",
                fontFamily: '"Roboto",sans-serif !important',
              }}
            >
              Select Category
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 600,
              lineHeight: "21.86px",
              color: "#212528",
              opacity: "70%",
              pb: 1,
            }}
          >
            Select item for estimation
          </Typography>
        </Stack>
        <Box
          sx={{
            background: "#F3F5F6",
            borderRadius: "12px",
            p: "24px 16px",
            height: "calc(93vh - 376px)",
          }}
        >
          <Grid container gap={2} sx={{ height: "100%" }}>
            <Box
              key={"showers-cat"}
              sx={{
                ...boxStyles,
                backgroundColor:
                  category !== EstimateCategory.SHOWERS
                    ? "rgba(184, 184, 185, 1)"
                    : "#8477DA",
                color:
                  category !== EstimateCategory.SHOWERS ? "black" : "white",
                width: "213px",
                height: "243px",
              }}
              onClick={() => handleBoxClick(EstimateCategory.SHOWERS)}
            >
              <img
                style={{
                  position: "relative",
                  zIndex: 1,
                  width: "150px",
                  height: "170px",
                }}
                src={DefaultIcon}
                alt="Selected"
              />
              <Typography
                sx={{
                  fontSize: "16px",
                  color: "#FFFFFF",
                  lineHeight: "21.86px",
                }}
              >
                Showers
              </Typography>
            </Box>
            <Box
              key={"mirrors-cat"}
              sx={{
                ...boxStyles,
                backgroundColor:
                  category !== EstimateCategory.MIRRORS
                    ? "rgba(184, 184, 185, 1)"
                    : "#8477DA",
                color:
                  category !== EstimateCategory.MIRRORS ? "black" : "white",
                width: "213px",
                height: "243px",
              }}
              onClick={() => handleBoxClick(EstimateCategory.MIRRORS)}
            >
              <img
                style={{
                  position: "relative",
                  zIndex: 1,
                  width: "150px",
                  height: "170px",
                }}
                src={DefaultIcon}
                alt="Selected"
              />
              <Typography
                sx={{
                  fontSize: "16px",
                  color: "#FFFFFF",
                  lineHeight: "21.86px",
                }}
              >
                Mirrors
              </Typography>
            </Box>
            <Box
              key={"wineCellar-cat"}
              sx={{
                ...boxStyles,
                backgroundColor:
                  category !== EstimateCategory.WINECELLARS
                    ? "rgba(184, 184, 185, 1)"
                    : "#8477DA",
                color:
                  category !== EstimateCategory.WINECELLARS ? "black" : "white",
                width: "213px",
                height: "243px",
              }}
              onClick={() => handleBoxClick(EstimateCategory.WINECELLARS)}
            >
              <img
                style={{
                  position: "relative",
                  zIndex: 1,
                  width: "150px",
                  height: "170px",
                }}
                src={DefaultIcon}
                alt="Selected"
              />
              <Typography
                sx={{
                  fontSize: "16px",
                  color: "#FFFFFF",
                  lineHeight: "21.86px",
                }}
              >
                Wine Cellar
              </Typography>
            </Box>
          </Grid>
        </Box>
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
            <KeyboardArrowRightIcon sx={{ transform: "rotate(180deg)" }} /> Back
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
            disabled={!category}
          >
            Next <KeyboardArrowRightIcon />
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default SelectCategorySection;
