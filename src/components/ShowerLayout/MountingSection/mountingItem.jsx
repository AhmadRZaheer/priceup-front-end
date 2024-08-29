import { backendURL } from "@/utilities/common";
import { hardwareTypes } from "@/utilities/constants";
import { Box, MenuItem, Typography } from "@mui/material";
import { useState } from "react";
import ActionButtons from "./actionButtons";

const MountingItem = ({ item, type, handleSetMounting, selectedItem }) => {
  const handleMountingChannelClick = () => {
    handleSetMounting(type, item._id === selectedItem ? null : item._id);
  };
  const handleOtherMountingClick = () => {
    switch (type) {
      case hardwareTypes.WALLCLAMP:
        handleSetMounting(type, {
          ...selectedItem,
          wallClampType:
            item._id === selectedItem?.wallClampType ? null : item._id,
        });
        break;
      case hardwareTypes.SLEEVEOVER:
        handleSetMounting(type, {
          ...selectedItem,
          sleeveOverType:
            item._id === selectedItem?.sleeveOverType ? null : item._id,
        });
        break;
      case hardwareTypes.GLASSTOGLASS:
        handleSetMounting(type, {
          ...selectedItem,
          glassToGlassType:
            item._id === selectedItem?.glassToGlassType ? null : item._id,
        });
        break;
      case hardwareTypes.CORNERWALLCLAMP:
        handleSetMounting(type, {
          ...selectedItem,
          wallClampType:
            item._id === selectedItem?.wallClampType ? null : item._id,
        });
        break;
      case hardwareTypes.CORNERSLEEVEOVER:
        handleSetMounting(type, {
          ...selectedItem,
          sleeveOverType:
            item._id === selectedItem?.sleeveOverType ? null : item._id,
        });
        break;
      case hardwareTypes.CORNERGLASSTOGLASS:
        handleSetMounting(type, {
          ...selectedItem,
          glassToGlassType:
            item._id === selectedItem?.glassToGlassType ? null : item._id,
        });
        break;
      default:
        break;
    }
  };
  const [count, setCount] = useState(selectedItem?.count);
  const handleCountSet = (newVal, event) => {
    event.stopPropagation();
    if (newVal >= 0) {
      setCount(newVal);
      handleSetMounting(type, { ...selectedItem, count: newVal });
    }
  };
  const isSelected =
    type === hardwareTypes.WALLCLAMP
      ? selectedItem.wallClampType
      : type === hardwareTypes.SLEEVEOVER
      ? selectedItem.sleeveOverType
      : type === hardwareTypes.GLASSTOGLASS
      ? selectedItem.glassToGlassType
      : type === hardwareTypes.CORNERWALLCLAMP
      ? selectedItem.wallClampType
      : type === hardwareTypes.CORNERSLEEVEOVER
      ? selectedItem.sleeveOverType
      : type === hardwareTypes.CORNERGLASSTOGLASS
      ? selectedItem.glassToGlassType
      : selectedItem;
  return (
    <MenuItem
      key={item.id}
      onClick={
        type === hardwareTypes.CHANNEL
          ? handleMountingChannelClick
          : handleOtherMountingClick
      }
      sx={{ padding: 0 }}
    >
      <Box
        sx={{
          width: "100%",
          borderRadius: "8px",
          height: "46px",
          border: isSelected ? "1px solid #8477DA" : "1px solid #D4DBDF",
          background: isSelected ? "#8477DA0F" : "white",
          px: "8px",
          display: "flex",
          gap: 2,
          alignItems: "center",
          width: { sm: "100%", xs: "95%" },
          justifyContent: "space-between",
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
          {[
            "wallClamp",
            "sleeveOver",
            "glassToGlass",
            "cornerWallClamp",
            "cornerSleeveOver",
            "cornerGlassToGlass",
          ].includes(type) && (
            <ActionButtons
              key={`${type}-${item.slug}`}
              handleCountSet={handleCountSet}
              count={count}
            />
          )}
        </Box>
      </Box>
    </MenuItem>
  );
};
export default MountingItem;
