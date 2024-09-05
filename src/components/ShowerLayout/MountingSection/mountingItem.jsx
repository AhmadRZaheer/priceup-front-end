import { backendURL } from "@/utilities/common";
import { hardwareTypes } from "@/utilities/constants";
import { Box, MenuItem, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ActionButtons from "./actionButtons";

const MountingItem = ({ item, type, handleSetMounting, selectedItem }) => {
  const [count, setCount] = useState(0);
  const handleMountingChannelClick = () => {
    handleSetMounting(type, item._id === selectedItem ? null : item._id);
  };
  const handleOtherMountingValueOnCounterChange = (counterVal) => {

    switch (type) {
      case hardwareTypes.WALLCLAMP:
        return { wallClampType: counterVal > 0 ? item._id : null, count: counterVal }
      case hardwareTypes.SLEEVEOVER:
        return { sleeveOverType: counterVal > 0 ? item._id : null, count: counterVal }
      case hardwareTypes.GLASSTOGLASS:
        return { glassToGlassType: counterVal > 0 ? item._id : null, count: counterVal }
      case hardwareTypes.CORNERWALLCLAMP:
        return { wallClampType: counterVal > 0 ? item._id : null, count: counterVal }
      case hardwareTypes.CORNERSLEEVEOVER:
        return { sleeveOverType: counterVal > 0 ? item._id : null, count: counterVal }
      case hardwareTypes.CORNERGLASSTOGLASS:
        return { glassToGlassType: counterVal > 0 ? item._id : null, count: counterVal }
      default:
        return null;
    }
  };
  const handleCountSet = (newVal, event) => {
    event.stopPropagation();
    if (newVal >= 0) {
      const updatedObject = handleOtherMountingValueOnCounterChange(newVal);
      setCount(newVal);
      handleSetMounting(type, updatedObject);
    }
  };
  const isSelected =
    type === hardwareTypes.WALLCLAMP
      ? selectedItem.wallClampType === item._id
      : type === hardwareTypes.SLEEVEOVER
        ? selectedItem.sleeveOverType === item._id
        : type === hardwareTypes.GLASSTOGLASS
          ? selectedItem.glassToGlassType === item._id
          : type === hardwareTypes.CORNERWALLCLAMP
            ? selectedItem.wallClampType === item._id
            : type === hardwareTypes.CORNERSLEEVEOVER
              ? selectedItem.sleeveOverType === item._id
              : type === hardwareTypes.CORNERGLASSTOGLASS
                ? selectedItem.glassToGlassType === item._id
                : selectedItem === item._id;
  useEffect(() => {
    if (isSelected) {
      setCount(selectedItem.count)
    } else {
      setCount(0)
    }
  }, [isSelected]);
  return (
    <MenuItem
      key={item.id}
      onClick={
        type === hardwareTypes.CHANNEL
          ? handleMountingChannelClick
          : () => { }
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
