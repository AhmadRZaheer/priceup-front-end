import { MenuItem as MuiMenuItem, Tooltip } from "@mui/material";
import { backendURL } from "@/utilities/common";
import { Box, Typography } from "@mui/material";
import { mirrorHardwareTypes } from "@/utilities/constants";
import { getActiveStatus } from "@/utilities/mirrorEstimates";
import { useState } from "react";
import { CheckCircle } from "@mui/icons-material";

const MenuItem = ({
  item,
  handleItemSelect,
  type,
  selectedItem,
  selectedContent,
}) => {
  const activeFinishOrThickness =
    type === mirrorHardwareTypes.GLASSTYPE
      ? selectedContent.glassType.thickness
      : type === mirrorHardwareTypes.EDGEWORK
      ? selectedContent.edgeWork.thickness
      : null;
  const status = getActiveStatus(item, activeFinishOrThickness, type);
  const [showToolTip, setShowTooltip] = useState(false);
  const handleItemClick = () => {
    if (status) {
      handleItemSelect(item);
    }
  };
  const captureMouseInteraction = (interaction) => {
    switch (interaction) {
      case "enter":
        if (status === false) {
          setShowTooltip(true);
        }
        break;
      case "leave":
        setShowTooltip(false);
        break;
      default:
        break;
    }
  };
  const isSelected =
    type === "glassAddons"
      ? selectedContent?.glassAddons.some(
          (selectedItem) => selectedItem?._id === item?._id
        )
      : type === "hardwares"
      ? selectedContent?.hardwares.some(
          (selectedItem) => selectedItem?._id === item?._id
        )
      : item === selectedItem;
  return (
    <Tooltip
      title={
        <h3 style={{ color: "white" }}>
          This {type} is not availabe
          {[
            mirrorHardwareTypes.GLASSTYPE,
            mirrorHardwareTypes.EDGEWORK,
          ].includes(type)
            ? " in current selected thickness"
            : ""}
          .
        </h3>
      }
      sx={{ fontSize: "20px" }}
      open={showToolTip}
      onMouseEnter={() => captureMouseInteraction("enter")}
      onMouseLeave={() => captureMouseInteraction("leave")}
    >
      <MuiMenuItem
        key={item.id}
        onClick={handleItemClick}
        sx={{ cursor: status ? "pointer" : "default", p: 0 }}
        // sx={{ cursor: "pointer" }}
      >
        <Box
          sx={{
            // width: "200px",
            borderRadius: "4px",
            border: isSelected ? "1px solid #8477DA" : "1px solid #D4DBDF",
            // boxShadow:
            //   "0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)",
            py: "9px",
            px: "20px",
            display: "flex",
            gap: 2,
            alignItems: "center",
            width: { sm: "100%", xs: "95%" },
            justifyContent: "space-between",
            backgroundColor: status
              ? isSelected
                ? "rgba(132, 119, 218, 0.06)"
                : "white"
              : "#f3f5f6",
            color: status ? "#5D6164" : "#BABABA",
            // backgroundColor: "auto"
          }}
        >
          <Box sx={{ display: "flex", gap: 2 }}>
            <img
              width={"25px"}
              height={"25px"}
              src={`${backendURL}/${item?.image}`}
              alt="Selected"
            />
            <Typography>{item?.name}</Typography>
          </Box>
          <Box>
            {isSelected && (
              <CheckCircle
                sx={{
                  color: "rgba(132, 119, 218, 1)",
                  width: "21px",
                  height: "21px",
                  mb: "-3.9px",
                }}
              />
            )}
          </Box>
        </Box>
      </MuiMenuItem>
    </Tooltip>
  );
};

export default MenuItem;
