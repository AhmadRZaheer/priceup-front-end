import { MenuItem as MuiMenuItem, Tooltip } from "@mui/material";
import { backendURL } from "@/utilities/common";
import { Box, Typography } from "@mui/material";
import OptionWithCounter from "./optionWithCounter";
import { getActiveStatus } from "@/utilities/estimatorHelper";
import { useState } from "react";
import { hardwareTypes } from "@/utilities/constants";
import { CheckCircle } from "@mui/icons-material";

const MenuItem = ({
  item,
  handleItemSelect,
  type,
  selectedItem,
  selectedContent,
  handleChange
}) => {
  const activeFinishOrThickness =
    type === hardwareTypes.GLASSTYPE
      ? selectedContent.glassType.thickness
      : type === hardwareTypes.GLASSADDONS
      ? null
      : selectedContent?.hardwareFinishes;
  const status = getActiveStatus(item, activeFinishOrThickness, type);
  const [showToolTip, setShowTooltip] = useState(false);
  const handleItemClick = () => {
    if (status || type === hardwareTypes.GLASSADDONS) {
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
    type === "hardwareAddons"
      ? selectedContent?.hardwareAddons.some(
          (row) => row?.type === item?._id
        )
      : type === "glassAddons"
      ? selectedContent?.glassAddons.some(
          (selectedItem) => selectedItem?.type === item?._id
        )
      : type === "wallClamp"
      ? selectedContent?.mountingClamps?.wallClamp.some(
          (selectedItem) => selectedItem?.item?._id === item?._id
        )
      : type === "sleeveOver"
      ? selectedContent?.mountingClamps?.sleeveOver.some(
          (selectedItem) => selectedItem?.item?._id === item?._id
        )
      : type === "glassToGlass"
      ? selectedContent?.mountingClamps?.glassToGlass.some(
          (selectedItem) => selectedItem?.item?._id === item?._id
        )
      : type === "cornerWallClamp"
      ? selectedContent?.cornerClamps?.cornerWallClamp.some(
          (selectedItem) => selectedItem?.item?._id === item?._id
        )
      : type === "cornerSleeveOver"
      ? selectedContent?.cornerClamps?.cornerSleeveOver.some(
          (selectedItem) => selectedItem?.item?._id === item?._id
        )
      : type === "cornerGlassToGlass"
      ? selectedContent?.cornerClamps?.cornerGlassToGlass.some(
          (selectedItem) => selectedItem?.item?._id === item?._id
        )
      : ["handles", "hinges", "slidingDoorSystem", "header"].includes(type)
      ? item === selectedItem
      : ["glassType"].includes(type) 
      ? item?._id === selectedItem?.type
      : item === selectedItem;
        console.log(isSelected,'sssss',selectedContent)
  return (
    <Tooltip
      title={
        <h3 style={{ color: "white" }}>
          This{" "}
          {type === hardwareTypes.GLASSTYPE
            ? "glass type"
            : type === hardwareTypes.GLASSADDONS
            ? "glass Addon"
            : "hardware"}{" "}
          is not availabe{" "}
          {type === hardwareTypes.GLASSTYPE
            ? "in current selected thickness"
            : type === hardwareTypes.GLASSADDONS
            ? ""
            : "in current selected finish"}
          .
        </h3>
      }
      sx={{ fontSize: "20px" }}
      open={showToolTip}
      onMouseEnter={() => captureMouseInteraction("enter")}
      onMouseLeave={() => captureMouseInteraction("leave")}
    >
      <MuiMenuItem
        key={item?._id}
        onClick={handleItemClick}
        sx={{ cursor: status ? "pointer" : "default", p: 0 }}
      >
        <Box
          sx={{
            // width: "100%",
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
            {type === "hardwareAddons" ? (
              <OptionWithCounter
                status={true}
                key={`${type}-${item.slug}`}
                item={item}
                type={type}
                counter={
                  selectedContent?.hardwareAddons?.find(
                    (row) => row?.type === item?._id
                  )?.count
                }
                handleChange={handleChange}
              />
            ) : ["wallClamp", "sleeveOver", "glassToGlass"].includes(type) ? (
              <OptionWithCounter
                status={status}
                key={`${type}-${item.slug}`}
                item={item}
                type={type}
                counter={
                  selectedContent?.mountingClamps?.[type]?.find(
                    (row) => row?.item?.slug === item?.slug
                  )?.count
                }
                handleChange={handleChange}
              />
            ) : [
                "cornerWallClamp",
                "cornerSleeveOver",
                "cornerGlassToGlass",
              ].includes(type) ? (
              <OptionWithCounter
                status={status}
                key={`${type}-${item.slug}`}
                item={item}
                type={type}
                counter={
                  selectedContent?.cornerClamps?.[type]?.find(
                    (row) => row?.item?.slug === item?.slug
                  )?.count
                }
                handleChange={handleChange}
              />
            ) : (
              isSelected && (
                <CheckCircle
                  sx={{
                    color: "rgba(132, 119, 218, 1)",
                    width: "21px",
                    height: "21px",
                    mb: "-3.9px",
                  }}
                />
              )
            )}
          </Box>
        </Box>
      </MuiMenuItem>
    </Tooltip>
  );
};

export default MenuItem;