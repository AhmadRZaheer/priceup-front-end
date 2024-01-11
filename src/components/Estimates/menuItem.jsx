import { MenuItem as MuiMenuItem, Tooltip } from "@mui/material";
import { backendURL } from "../../utilities/common";
import { Box, Typography } from "@mui/material";
import OptionWithCounter from "./optionWithCounter";
import { getActiveStatus } from "../../utilities/estimatorHelper";
import { useState } from "react";

const MenuItem = ({ item, handleItemSelect, type, selectedItem, selectedContent }) => {
    const status = getActiveStatus(item, selectedContent?.hardwareFinishes, type);
    const [showToolTip, setShowTooltip] = useState(false);
    const handleItemClick = () => {
        if (status) {
            handleItemSelect(item);
        }
    }
    const captureMouseInteraction = (interaction) => {
        switch (interaction) {
            case 'enter':
                if (status === false) {
                    setShowTooltip(true);
                }
                break;
            case 'leave':
                setShowTooltip(false);
                break;
            default:
                break;
        }
    }
    return (<Tooltip title={<h3 style={{ color: "white" }}>This hardware is not availabe in current selcted finish.</h3>} sx={{ fontSize: '20px' }} open={showToolTip} onMouseEnter={() => captureMouseInteraction('enter')} onMouseLeave={() => captureMouseInteraction('leave')}><MuiMenuItem key={item.id} onClick={handleItemClick} sx={{ cursor: status ? 'pointer' : 'default' }}>
        <Box
            sx={{
                width: "200px",
                borderRadius: "12px",
                border: (
                    type === "hardwareAddons"
                        ? selectedContent?.hardwareAddons.some(
                            (row) => row?.item?._id === item?._id
                        )
                        : type === "glassAddons"
                            ? selectedContent?.glassAddons.some(
                                (selectedItem) => selectedItem?._id === item?._id
                            )
                            : type === "wallClamp"
                                ? selectedContent?.mountingClamps?.wallClamp.some(
                                    (selectedItem) =>
                                        selectedItem?.item?._id === item?._id
                                )
                                : type === "sleeveOver"
                                    ? selectedContent?.mountingClamps?.sleeveOver.some(
                                        (selectedItem) =>
                                            selectedItem?.item?._id === item?._id
                                    )
                                    : type === "glassToGlass"
                                        ? selectedContent?.mountingClamps?.glassToGlass.some(
                                            (selectedItem) =>
                                                selectedItem?.item?._id === item?._id
                                        )
                                        : type === "cornerWallClamp"
                                            ? selectedContent?.cornerClamps?.cornerWallClamp.some(
                                                (selectedItem) =>
                                                    selectedItem?.item?._id === item?._id
                                            )
                                            : type === "cornerSleeveOver"
                                                ? selectedContent?.cornerClamps?.cornerSleeveOver.some(
                                                    (selectedItem) =>
                                                        selectedItem?.item?._id === item?._id
                                                )
                                                : type === "cornerGlassToGlass"
                                                    ? selectedContent?.cornerClamps?.cornerGlassToGlass.some(
                                                        (selectedItem) =>
                                                            selectedItem?.item?._id === item?._id
                                                    )
                                                : ["handles","hinges","slidingDoorSystem","header"].includes(type) ? status && item === selectedItem
                                                    : item === selectedItem
                )
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
                backgroundColor: status ? 'auto' : 'darkgray',
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
                {type === "hardwareAddons" && (
                    <OptionWithCounter
                        key={`${type}-${item.slug}`}
                        item={item}
                        type={type}
                        counter={
                            selectedContent?.hardwareAddons?.find(
                                (row) => row?.item?.slug === item.slug
                            )?.count
                        }
                    />
                )}
                {["wallClamp", "sleeveOver", "glassToGlass"].includes(
                    type
                ) && (
                        <OptionWithCounter
                            key={`${type}-${item.slug}`}
                            item={item}
                            type={type}
                            counter={
                                selectedContent?.mountingClamps?.[type]?.find(
                                    (row) => row?.item?.slug === item?.slug
                                )?.count
                            }
                        />
                    )}
                {[
                    "cornerWallClamp",
                    "cornerSleeveOver",
                    "cornerGlassToGlass",
                ].includes(type) && (
                        <OptionWithCounter
                            key={`${type}-${item.slug}`}
                            item={item}
                            type={type}
                            counter={
                                selectedContent?.cornerClamps?.[type]?.find(
                                    (row) => row?.item?.slug === item?.slug
                                )?.count
                            }
                        />
                    )}
            </Box>
        </Box>
    </MuiMenuItem></Tooltip>);
}

export default MenuItem;