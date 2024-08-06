import { backendURL } from "@/utilities/common";
import { hardwareTypes } from "@/utilities/constants";
import { Box, MenuItem, Typography } from "@mui/material";
import { useState } from "react";
import ActionButtons from "./actionButtons";

const MountingItem = ({ item, type, handleSetMounting, selectedItem }) => {
   
    const handleMountingChannelClick = () => {
        handleSetMounting(type, item._id === selectedItem ? null : item._id);
    }
    const handleOtherMountingClick = () => {
        switch (type) {
            case hardwareTypes.WALLCLAMP:
                handleSetMounting(type, { ...selectedItem, wallClampType: item._id === selectedItem?.wallClampType ? null : item._id });
                break;
            case hardwareTypes.SLEEVEOVER:
                handleSetMounting(type, { ...selectedItem, sleeveOverType: item._id === selectedItem?.sleeveOverType ? null : item._id });
                break;
            case hardwareTypes.GLASSTOGLASS:
                handleSetMounting(type, { ...selectedItem, glassToGlassType: item._id === selectedItem?.glassToGlassType ? null : item._id });
                break;
            case hardwareTypes.CORNERWALLCLAMP:
                handleSetMounting(type, { ...selectedItem, wallClampType: item._id === selectedItem?.wallClampType ? null : item._id });
                break;
            case hardwareTypes.CORNERSLEEVEOVER:
                handleSetMounting(type, { ...selectedItem, sleeveOverType: item._id === selectedItem?.sleeveOverType ? null : item._id });
                break;
            case hardwareTypes.CORNERGLASSTOGLASS:
                handleSetMounting(type, { ...selectedItem, glassToGlassType: item._id === selectedItem?.glassToGlassType ? null : item._id });
                break;
            default:
                break;
        }
    }
    const [count, setCount] = useState(selectedItem?.count);
    const handleCountSet = (newVal, event) => {
        event.stopPropagation();
        if (newVal >= 0) {
            setCount(newVal)
            handleSetMounting(type, { ...selectedItem, count: newVal });
        }
    }
    return (<MenuItem
        key={item.id}
        onClick={type === hardwareTypes.CHANNEL ? handleMountingChannelClick : handleOtherMountingClick}
        sx={{padding:0}}
    >
        <Box
            sx={{
                width: "100%",
                borderRadius: "12px",
                border: (type === hardwareTypes.WALLCLAMP ? selectedItem.wallClampType :
                    type === hardwareTypes.SLEEVEOVER ? selectedItem.sleeveOverType :
                        type === hardwareTypes.GLASSTOGLASS ? selectedItem.glassToGlassType :
                            type === hardwareTypes.CORNERWALLCLAMP ? selectedItem.wallClampType :
                                type === hardwareTypes.CORNERSLEEVEOVER ? selectedItem.sleeveOverType :
                                    type === hardwareTypes.CORNERGLASSTOGLASS ? selectedItem.glassToGlassType :
                                        selectedItem)
                    ? "2px solid blue"
                    : "1px solid #EAECF0",
                boxShadow:
                    "0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)",
                p: 2,
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
                {["wallClamp", "sleeveOver", "glassToGlass", "cornerWallClamp",
                    "cornerSleeveOver",
                    "cornerGlassToGlass",].includes(type) && (
                        <ActionButtons
                            key={`${type}-${item.slug}`}
                            handleCountSet={handleCountSet}
                            count={count}
                        />
                    )}
            </Box>
        </Box>
    </MenuItem>)
}
export default MountingItem;