import { useState } from "react";

import Button from "@mui/material/Button";
import Logo from "../../Assets/bar-chart-2.svg";
import MenuItem from "@mui/material/MenuItem";

import {
  AddCircleOutline,
  ChevronRight,
  RemoveCircleOutline,
} from "@mui/icons-material";

import { Box, TextField, Typography } from "@mui/material";

import { backendURL } from "../../utilities/common";
import { useDispatch, useSelector } from "react-redux";
import {
  getContent,
  setActiveMounting,
  setContent,
  setCounters,
  setThickness,
  updateAddOnCount,
} from "../../redux/estimateCalculations";
import MenuList from "./MenuList";

const ChannelType = ({
  menuOptions,
  title,
  type,
  showSnackbar,
  count,
  thickness,
  estimatesData,
}) => {
  const [anchorEl, setAnchorEl] = useState(false);
  const [countVal, setCountVal] = useState(count || 0);
  const [thicknessVal, setThicknessVal] = useState(thickness || "1/2");
  const [selectedItem, setSelectedItem] = useState("channel");
  const [sleeveOverCount, setSleeveOverCount] = useState(0);
  const [towelBarsCount, setTowelBarsCount] = useState(0);
  const selectedContent = useSelector(getContent);
  console.log(estimatesData, "estimatesData test ");

  // Handle functions for each item
  const handleSleeveOverCount = (count) => {
    if (count >= 0) {
      setSleeveOverCount(count);
      dispatch(updateAddOnCount({ type: "sleeveOverCount", count: count }));
    }
  };

  const handleTowelBarsCount = (count) => {
    if (count >= 0) {
      setTowelBarsCount(count);
      dispatch(updateAddOnCount({ type: "towelBarsCount", count: count }));
    }
  };

  const dispatch = useDispatch();
  const handleItemSelect = (item) => {
    if (!["mounting"].includes(type)) {
      dispatch(setContent({ type: type, activeType: item }));
      setSelectedItem(item);
    } else {
      dispatch(setActiveMounting(item.toLowerCase()));
    }
  };

  const handleCountSet = (value) => {
    if (value >= 0) {
      setCountVal(value);
      dispatch(setCounters({ type: type, value: value }));
    }
  };
  const handleThicknessSet = (thickness) => {
    setThicknessVal(thickness);
    dispatch(setThickness(thickness));
  };
  const opneClose = () => {
    if (
      selectedContent.hardwareFinishes !== null ||
      ["hardwareFinishes"].includes(type)
    )
      setAnchorEl(!anchorEl);
    else showSnackbar("Please select 'hardwareFinishes' first", "warning");
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          pb: 1,
        }}
      >
        <Button
          onClick={opneClose}
          id="basic-button"
          sx={{ color: { md: "#000000 !important ", xs: "white" } }}
        >
          {anchorEl ? (
            <ChevronRight
              sx={{
                display: "flex",
                alignItems: "center",
                transform: "rotate(90deg)",
                color: "#98A2B3 !important",
              }}
            />
          ) : (
            <ChevronRight sx={{ color: "#98A2B3" }} />
          )}
          <Typography>{title}</Typography>
        </Button>
      </Box>
      {anchorEl ? (
        <Box
          sx={{
            height: "180px",
            overflowY: "scroll",
            color: { md: "#000000", xs: "white" },
            display: "flex",
            flexDirection: "column",
            // backgroundColor: "red",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "100%",
              // backgroundColor: "red",
              width: "95vw",
            }}
          >
            {menuOptions?.map((item, index) => (
              <MenuItem key={index} onClick={() => handleItemSelect(item)}>
                <Box
                  sx={{
                    width: "200px",
                    borderRadius: "12px",
                    border:
                      item === selectedContent?.mounting?.activeType
                        ? "2px solid blue"
                        : "1px solid #EAECF0",
                    boxShadow:
                      "0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)",
                    // border: "1px solid #EAECF0",
                    p: 2,
                    display: "flex",
                    gap: 2,
                    alignItems: "center",
                    width: { md: "100%", xs: "95%" },
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <img
                      width={"25px"}
                      height={"25px"}
                      // src={`${backendURL}/${item?.image}`}
                      src={Logo}
                      alt="Selected"
                    />
                    <Typography>{item}</Typography>
                  </Box>
                </Box>
              </MenuItem>
            ))}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignContent: "space-between",
            }}
          >
            {selectedContent.mounting.activeType === "clamps" && (
              <>
                <MenuList
                  menuOptions={estimatesData?.wallClamp}
                  title={"Wall Clamps"}
                  type={"wallClamp"}
                  showSnackbar={showSnackbar}
                  count={selectedContent.mounting.clamps.wallClamp.count}
                />
                <MenuList
                  menuOptions={estimatesData?.sleeveOver}
                  title={"Sleeve Over"}
                  type={"sleeveOver"}
                  showSnackbar={showSnackbar}
                  count={selectedContent.mounting.clamps.sleeveOver.count}
                />
                <MenuList
                  menuOptions={estimatesData?.glassToGlass}
                  title={"Glass to Glass"}
                  type={"glassToGlass"}
                  showSnackbar={showSnackbar}
                  count={selectedContent.mounting.clamps.glassToGlass.count}
                />
              </>
            )}

            {selectedContent.mounting.activeType === "channel" && (
              <MenuList
                menuOptions={estimatesData?.mountingChannel}
                title={"Channel"}
                type={"channel"}
                showSnackbar={showSnackbar}
              />
            )}
          </Box>
        </Box>
      ) : (
        ""
      )}
    </Box>
  );
};

export default ChannelType;
