import Logo from "@/Assets/bar-chart-2.svg";
import { useMemo, useState } from "react";
import MountingItem from "./mountingItem";
import { hardwareTypes, thicknessTypes } from "@/utilities/constants";
import MountingList from "./mountingList";
import { AddCircle, RemoveCircle } from "@mui/icons-material";
const { MenuItem, Box, Typography } = require("@mui/material");

const MountingSection = ({
  mounting,
  setMounting,
  list,
  activeGlassThickness,
}) => {
  const [activeMounting, setActiveMounting] = useState(
    mounting?.channelOrClamps || "Channel"
  );
  const [showCornerClamps, setShowCornerClamps] = useState(false);
  const handleActiveMounting = (val) => {
    setActiveMounting(val);
    if (val === "Channel") {
      setMounting((prev) => ({
        ...prev,
        channelOrClamps: val,
        wallClamp: { wallClampType: null, count: 0 },
        sleeveOver: { sleeveOverType: null, count: 0 },
        glassToGlass: { glassToGlassType: null, count: 0 },
      }));
    } else {
      setMounting((prev) => ({
        ...prev,
        channelOrClamps: val,
        mountingChannel: null,
      }));
    }
  };
  const handleSetMounting = (type, val) => {
    if (type === hardwareTypes.CHANNEL) {
      setMounting((prev) => ({ ...prev, mountingChannel: val }));
    } else {
      setMounting((prev) => ({ ...prev, [type]: val }));
    }
  };
  const mountingChannelsAccordingToGlassThickness = useMemo(() => {
    let item = null;
    if (activeGlassThickness === thicknessTypes.ONEBYTWO) {
      item = list?.mountingChannel?.find(
        (item) => item.slug === "u-channel-1-2"
      );
    } else if (activeGlassThickness === thicknessTypes.THREEBYEIGHT) {
      item = list?.mountingChannel?.find(
        (item) => item.slug === "u-channel-3-8"
      );
    } else {
      // if returns empty value 0
      item = list?.mountingChannel?.find(
        (item) => item.slug === "u-channel-3-8"
      );
    }
    return item ? [item] : [];
  }, [activeGlassThickness, list]);

  const cornerActive =
    mounting?.cornerWallClamp?.wallClampType ||
    mounting?.cornerSleeveOver?.sleeveOverType ||
    mounting?.cornerGlassToGlass?.glassToGlassType;
  return (
    <>
      <Box
        sx={{
          display: "flex",
          borderRadius: 2,
          width: "fit-content",
          border: "2px solid #8477DA",
          marginBottom: 1,
        }}
      >
        {["Channel", "Clamps"].map((item, index) => (
          /** Mounting Header */
          <MenuItem
            sx={{ p: 0.1 }}
            key={index}
            onClick={() => handleActiveMounting(item)}
          >
            <Box
              sx={{
                width: "200px",
                borderTopLeftRadius: index === 0 ? "12px" : "0px",
                borderBottomLeftRadius: index === 0 ? "12px" : "0px",
                borderTopRightRadius: index === 0 ? "0px" : "12px",
                borderBottomRightRadius: index === 0 ? "0px" : "12px",
                color: item === activeMounting ? "white" : "#101828",
                bgcolor: item === activeMounting ? "#8477DA" : "",
                boxShadow:
                  "0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)",
                padding: "10px",
                display: "flex",
                gap: 0,
                alignItems: "center",
                width: { md: "100%", xs: "95%" },
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", gap: 1 }}>
                <img width={"25px"} height={"25px"} src={Logo} alt="Selected" />
                <Typography>{item}</Typography>
              </Box>
            </Box>
          </MenuItem>
        ))}
      </Box>
      {activeMounting === "Channel" &&
        mountingChannelsAccordingToGlassThickness?.map((item) => (
          <MountingItem
            item={item}
            type={hardwareTypes.CHANNEL}
            handleSetMounting={handleSetMounting}
            selectedItem={mounting?.mountingChannel}
          />
        ))}
      {activeMounting === "Clamps" && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            alignItems: "flex-start",
          }}
        >
          {/** Wall Clamp */}
          <MountingList
            type={hardwareTypes.WALLCLAMP}
            mounting={mounting}
            handleSetMounting={handleSetMounting}
            list={list}
          />
          {/** Sleeve Over */}
          <MountingList
            type={hardwareTypes.SLEEVEOVER}
            mounting={mounting}
            handleSetMounting={handleSetMounting}
            list={list}
          />
          {/** Glass To Glass */}
          <MountingList
            type={hardwareTypes.GLASSTOGLASS}
            mounting={mounting}
            handleSetMounting={handleSetMounting}
            list={list}
          />
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          alignItems: "flex-start",
        }}
      >
        <MenuItem
          sx={{
            borderRadius: "12px",
            padding: "5px",
            width: "fit-content",
            mt: 1,
          }}
          key={"corner-clamp-button"}
          onClick={() => setShowCornerClamps(!showCornerClamps)}
        >
          <Box
            sx={{
              width: "fit-content",
              borderRadius: "12px",
              background: cornerActive ? "#8477DA" : "#cccc",
              color: cornerActive ? "white" : "black",
              boxShadow:
                "0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)",
              padding: "10px",
              display: "flex",
              gap: 7,
              alignItems: "center",
              width: { md: "100%", xs: "95%" },
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ textTransform: "capitalize" }}>
              Corner Clamps
            </Typography>
            {showCornerClamps ? (
              <RemoveCircle
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: cornerActive ? "white" : "black",
                }}
              />
            ) : (
              <AddCircle
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: cornerActive ? "white" : "black",
                }}
              />
            )}
          </Box>
        </MenuItem>
        {showCornerClamps && (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 1,
              alignItems: "flex-start",
            }}
          >
            {/** Corner Wall Clamp */}
            <MountingList
              type={hardwareTypes.CORNERWALLCLAMP}
              mounting={mounting}
              handleSetMounting={handleSetMounting}
              list={list}
            />
            {/** Corner Sleeve Over */}
            <MountingList
              type={hardwareTypes.CORNERSLEEVEOVER}
              mounting={mounting}
              handleSetMounting={handleSetMounting}
              list={list}
            />
            {/** Corner Glass To Glass */}
            <MountingList
              type={hardwareTypes.CORNERGLASSTOGLASS}
              mounting={mounting}
              handleSetMounting={handleSetMounting}
              list={list}
            />
          </Box>
        )}
      </Box>
    </>
  );
};

export default MountingSection;
