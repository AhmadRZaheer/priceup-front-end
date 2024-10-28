import {
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  Typography,
  Grid,
  Stack,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import { CheckCircle, Close, KeyboardArrowRight } from "@mui/icons-material";
import bgCustom from "@/Assets/customlayoutimage.svg";
import { backendURL } from "@/utilities/common";
import CustomInputField from "../ui-components/CustomInput";
import icon from "@/Assets/search-icon.svg";

const layouts = [
  {
    _id: "65f29fcf47357207b5f19f7a",
    name: "Door Panel & Return",
    image: "images/layouts/layout_6.png",
    company_id: "65f29fce47357207b5f19cd1",
    createdAt: "2024-03-14T06:57:19.058Z",
    updatedAt: "2024-09-06T06:49:48.093Z",
    __v: 0,
    settings: {
      handles: { handleType: "65f29fce47357207b5f19cea", count: 1 },
      hinges: { hingesType: "65f29fce47357207b5f19d42", count: 2 },
      pivotHingeOption: {
        pivotHingeType: "65f29fce47357207b5f19d12",
        count: 2,
      },
      heavyDutyOption: {
        heavyDutyType: "65f29fce47357207b5f19d3a",
        threshold: 85,
        height: 84,
      },
      heavyPivotOption: { heavyPivotType: null, threshold: 0, height: 0 },
      wallClamp: { wallClampType: "66d984aaa82554091c411279", count: 5 },
      sleeveOver: { sleeveOverType: null, count: 0 },
      glassToGlass: { glassToGlassType: null, count: 0 },
      cornerWallClamp: { wallClampType: null, count: 0 },
      cornerSleeveOver: {
        sleeveOverType: "65f29fce47357207b5f19d62",
        count: 0,
      },
      cornerGlassToGlass: {
        glassToGlassType: "65f29fce47357207b5f19d62",
        count: 0,
      },
      glassType: { type: "65f29fce47357207b5f19dee", thickness: "3/8" },
      slidingDoorSystem: { type: null, count: 0 },
      other: { people: 2, hours: 3 },
      hardwareFinishes: "65f29fce47357207b5f19cd7",
      channelOrClamps: "Clamps",
      mountingChannel: null,
      outages: 3,
      glassAddon: "65f29fce47357207b5f19df4",
      measurementSides: 3,
      variant: "doorpanelandreturn",
      notch: 0,
      transom: null,
      header: null,
    },
  },
  {
    _id: "65f29fcf47357207b5f19f78",
    name: "Double Door",
    image: "images/layouts/layout_3.png",
    company_id: "65f29fce47357207b5f19cd1",
    createdAt: "2024-03-14T06:57:19.055Z",
    updatedAt: "2024-09-01T14:49:38.672Z",
    __v: 0,
    settings: {
      handles: { handleType: "65f29fce47357207b5f19cea", count: 2 },
      hinges: { hingesType: "65f29fce47357207b5f19d2a", count: 2 },
      pivotHingeOption: {
        pivotHingeType: "65f29fce47357207b5f19d12",
        count: 2,
      },
      heavyDutyOption: {
        heavyDutyType: "65f29fce47357207b5f19d3a",
        threshold: 85,
        height: 85,
      },
      heavyPivotOption: { heavyPivotType: null, threshold: 0, height: 0 },
      wallClamp: { wallClampType: null, count: 0 },
      sleeveOver: { sleeveOverType: null, count: 0 },
      glassToGlass: { glassToGlassType: null, count: 0 },
      cornerWallClamp: { wallClampType: null, count: 0 },
      cornerSleeveOver: { sleeveOverType: null, count: 0 },
      cornerGlassToGlass: { glassToGlassType: null, count: 0 },
      glassType: { type: "65f29fce47357207b5f19dee", thickness: "3/8" },
      slidingDoorSystem: { type: null, count: 0 },
      other: { people: 2, hours: 2 },
      hardwareFinishes: "65f29fce47357207b5f19cd3",
      outages: 2,
      measurementSides: 2,
      variant: "doubledoor",
      channelOrClamps: "Channel",
      mountingChannel: null,
      notch: 0,
      transom: null,
      header: null,
      glassAddon: null,
    },
  },
  {
    _id: "65f29fcf47357207b5f19f54",
    name: "Door",
    image: "images/layouts/layout_1.png",
    company_id: "65f29fce47357207b5f19cd1",
    createdAt: "2024-03-14T06:57:19.041Z",
    updatedAt: "2024-09-01T14:29:08.337Z",
    __v: 0,
    settings: {
      handles: { handleType: "65f29fce47357207b5f19d02", count: 1 },
      hinges: { hingesType: "65f29fce47357207b5f19d3a", count: 2 },
      pivotHingeOption: {
        pivotHingeType: "65f29fce47357207b5f19d32",
        count: 2,
      },
      heavyDutyOption: {
        heavyDutyType: "65f29fce47357207b5f19d3a",
        threshold: 85,
        height: 85,
      },
      heavyPivotOption: { heavyPivotType: null, threshold: 0, height: 0 },
      wallClamp: { wallClampType: null, count: 0 },
      sleeveOver: { sleeveOverType: null, count: 0 },
      glassToGlass: { glassToGlassType: null, count: 0 },
      cornerWallClamp: { wallClampType: null, count: 0 },
      cornerSleeveOver: { sleeveOverType: null, count: 0 },
      cornerGlassToGlass: { glassToGlassType: null, count: 0 },
      glassType: { type: "65f29fce47357207b5f19dee", thickness: "3/8" },
      slidingDoorSystem: { type: null, count: 0 },
      other: { people: 2, hours: 2 },
      hardwareFinishes: "65f29fce47357207b5f19cd9",
      outages: 2,
      transom: null,
      measurementSides: 2,
      variant: "door",
      channelOrClamps: "Channel",
      mountingChannel: null,
      notch: 0,
      header: null,
      glassAddon: null,
    },
  },
  {
    _id: "65f29fcf47357207b5f19f4b",
    name: "Door & Panel",
    image: "images/layouts/layout_2.png",
    company_id: "65f29fce47357207b5f19cd1",
    createdAt: "2024-03-14T06:57:19.037Z",
    updatedAt: "2024-09-01T14:47:30.615Z",
    __v: 0,
    settings: {
      handles: { handleType: "65f29fce47357207b5f19ce2", count: 1 },
      hinges: { hingesType: "65f29fce47357207b5f19d42", count: 2 },
      pivotHingeOption: {
        pivotHingeType: "65f29fce47357207b5f19d12",
        count: 2,
      },
      heavyDutyOption: {
        heavyDutyType: "65f29fce47357207b5f19d3a",
        threshold: 85,
        height: 85,
      },
      heavyPivotOption: { heavyPivotType: null, threshold: 0, height: 0 },
      wallClamp: { wallClampType: null, count: 0 },
      sleeveOver: { sleeveOverType: null, count: 0 },
      glassToGlass: { glassToGlassType: null, count: 0 },
      cornerWallClamp: { wallClampType: null, count: 0 },
      cornerSleeveOver: { sleeveOverType: null, count: 0 },
      cornerGlassToGlass: { glassToGlassType: null, count: 0 },
      glassType: { type: "65f29fce47357207b5f19dee", thickness: "3/8" },
      slidingDoorSystem: { type: null, count: 0 },
      other: { people: 2, hours: 2 },
      hardwareFinishes: "65f29fce47357207b5f19cd9",
      channelOrClamps: "Channel",
      mountingChannel: "65f29fce47357207b5f19d52",
      outages: 2,
      measurementSides: 2,
      variant: "doorandpanel",
      notch: 0,
      transom: null,
      header: null,
      glassAddon: null,
    },
  },
];

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

const SelectLayoutSection = ({ next, back }) => {
  const [selectCustom, setSelectCustom] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedData, setSelectedData] = useState("");

  const filteredData = useMemo(() => {
    const data = [...layouts, { _id: "custom", name: "Custom" }];
    return data.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const handleBoxClick = (layout) => {
    if (layout._id === "custom") {
      setSelectCustom(true);
      setSelectedData("custom");
    } else {
      setSelectCustom(false);
      setSelectedData(layout._id);
    }
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          background: { sm: "#F6F5FF", xs: "#08061B" },
        }}
      >
        <Box
          sx={{
            height: "auto",
            overflow: "hidden",
            borderRadius: "12px",
            border: { sm: " 1px solid rgba(208, 213, 221, 1)", xs: "none" },
          }}
        >
          <Box
            px={"25px"}
            py={"19px"}
            bgcolor={"white"}
            sx={{
              borderBottom: " 1px solid rgba(208, 213, 221, 1)",
              display: { sm: "block", xs: "none" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: 700,
                    lineHeight: "21.09px",
                    fontFamily: '"Roboto",sans-serif !important',
                  }}
                >
                  Select Layout
                </Typography>
                <Typography
                  sx={{
                    color: { md: "#667085", xs: "white" },
                    font: "14px",
                    fontWeight: 600,
                  }}
                >
                  Your new project has been created. Invite colleagues to
                  collaborate on this project.
                </Typography>
              </Box>

              <CustomInputField
                id="input-with-icon-textfield"
                placeholder="Search layout"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <img src={icon} alt="search input" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment
                      position="start"
                      onClick={() => setSearch("")}
                      style={{ width: "21px", height: "21px" }}
                    >
                      {search !== "" && <Close sx={{ cursor: "pointer" }} />}
                    </InputAdornment>
                  ),
                }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Box>
          </Box>
          <Box sx={{ p: 2, background: "#F6F5FF" }}>
            {false ? (
              <Box
                sx={{
                  width: 40,
                  m: "auto",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 300,
                }}
              >
                <CircularProgress sx={{ color: "#8477DA" }} />
              </Box>
            ) : (
              <Grid
                container
                gap={1}
                sx={{
                  minHeight: "calc(94vh - 376px)",
                  overflow: "auto",
                  maxHeight: "calc(91vh - 376px)",
                  width: "100%",
                  m: "auto",
                }}
              >
                {filteredData.length > 0 ? (
                  filteredData.map((layout) => {
                    const isSelected =
                      layout._id === "custom"
                        ? selectCustom
                        : selectedData === layout._id;
                    const image =
                      layout._id === "custom"
                        ? bgCustom
                        : `${backendURL}/${layout?.image}`;

                    return (
                      <Box
                        key={layout._id}
                        sx={{
                          ...boxStyles,
                          backgroundColor: isSelected
                            ? "rgba(132, 119, 218, 0.1)"
                            : "white",
                          color: "black",
                          width: "255px",
                          height: "309px",
                          border: isSelected
                            ? "1px solid rgba(132, 119, 218, 1)"
                            : "1px solid rgba(208, 213, 221, 1)",
                          position: "relative",
                        }}
                        onClick={() => handleBoxClick(layout)}
                      >
                        {isSelected && (
                          <Box
                            sx={{
                              position: "absolute",
                              right: "10px",
                              top: "10px",
                            }}
                          >
                            <CheckCircle
                              sx={{
                                color: "rgba(132, 119, 218, 1)",
                                width: "21px",
                                height: "21px",
                              }}
                            />
                          </Box>
                        )}

                        <img
                          style={{
                            position: "relative",
                            zIndex: 1,
                            width: "200px",
                            height: "255px",
                          }}
                          src={image}
                          alt={layout.name}
                        />
                        <Typography sx={{ font: "16px", fontWeight: 600 }}>
                          {layout.name}
                        </Typography>
                      </Box>
                    );
                  })
                ) : (
                  <Typography
                    className="disabled-text"
                    sx={{
                      fontSize: "14px",
                      display: "flex",
                      height: "60vh",
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    No Layout Found
                  </Typography>
                )}
              </Grid>
            )}
          </Box>
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              position: { sm: "static", xs: "fixed" },
              gap: { sm: 2 },
              bottom: 0,
              left: 0,
              width: { sm: "auto", xs: "100%" },
              p: { sm: 0, xs: 2 },
              px: { sm: "25px" },
              py: { sm: "19px" },
              bgcolor: { sm: "white", xs: "#08061B" },
            }}
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
              disabled={!selectedData}
            >
              Next <KeyboardArrowRight />
            </Button>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default SelectLayoutSection;
