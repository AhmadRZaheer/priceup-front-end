import { useState } from 'react';

import { hexToRgba } from '@/utilities/common';
import { hardwareTypes } from '@/utilities/constants';
import { getActiveStatus } from '@/utilities/estimatorHelper';
import { CheckCircle } from '@mui/icons-material';
import {
  Box,
  MenuItem as MuiMenuItem,
  Tooltip,
  Typography,
} from '@mui/material';

import OptionInfoModel from './optionInfoModel';
import OptionWithCounter from './optionWithCounter';

const MenuItem = ({
  item,
  handleItemSelect,
  type,
  thickness,
  selectedItem,
  selectedContent,
  handleChange,
  locationSettings,
  colorData,
}) => {
  const primaryColor = colorData?.primary;
  const activeFinishOrThickness =
    type === hardwareTypes.GLASSTYPE
      ? selectedContent?.glassType?.thickness
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
          (row) => row?.item?._id === item?._id
        )
      : type === "glassAddons"
      ? selectedContent?.glassAddons.some(
          (selectedItem) => selectedItem?.item?._id === item?._id
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
      : item?._id === selectedItem?._id;
  const primaryRgba = hexToRgba(primaryColor,0.06);

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
            borderRadius: "4px",
            border: isSelected ? `1px solid ${primaryColor}` : "1px solid #D4DBDF",
            py: "3px",
            px: "10px",
            display: "flex",
            gap: 1,
            alignItems: "center",
            width: { sm: "100%", xs: "95%" },
            justifyContent: "space-between",
            backgroundColor:
              // status ?
              isSelected ? primaryRgba : "white",
            // : "#f3f5f6",
            color:
              // status ?
              isSelected ? "black" : "#5D6164",
            //  : "#BABABA",
          }}
        >
          <Box sx={{ display: "flex", gap: 1 }}>
            <Typography>
              {item?.modifiedName ?? item?.name}
            </Typography>
            <OptionInfoModel itemData={item} colorData={colorData} />
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
                    (row) => row?.item?._id === item?._id
                  )?.count ?? 0
                }
                handleChange={handleChange}
                isSelected={isSelected}
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
                    color: primaryColor,
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
