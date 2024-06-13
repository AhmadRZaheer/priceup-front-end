import { useMemo, useState } from "react";
import Logo from "@/Assets/bar-chart-2.svg";
import { ChevronRight } from "@mui/icons-material";
import { Box, Typography, MenuItem as MuiMenuItem, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getContent,
  getListData,
  setActiveMounting,
  setContent,
} from "@/redux/estimateCalculations";
import MenuList from "./menuList";
import { showSnackbar } from "@/redux/snackBarSlice";
import { thicknessTypes } from "@/utilities/constants";
import MenuItem from "./menuItem";

const ChannelTypeDesktop = ({ menuOptions, title, type }) => {
  const [anchorEl, setAnchorEl] = useState(false);
  const selectedContent = useSelector(getContent);
  const listData = useSelector(getListData);
  /** Show channel item on base of active thickness fo glass */
  const activeChannel = useMemo(() => {
    let active = null;
    if (selectedContent?.glassType?.thickness === thicknessTypes.ONEBYTWO) {
      active = listData?.mountingChannel?.find(
        (item) => item.slug === "u-channel-1-2"
      );
    } else if (selectedContent?.glassType?.thickness === thicknessTypes.THREEBYEIGHT) {
      active = listData?.mountingChannel?.find(
        (item) => item.slug === "u-channel-3-8"
      );
    }
    return active;
  }, [selectedContent?.glassType?.thickness]);
  /** end */
  const dispatch = useDispatch();
  const handleItemSelect = (item) => {
    if (!["mounting"].includes(type)) {
      dispatch(setContent({ type: type, item: item }));
    } else {
      if (["channel", "clamps"].includes(item.toLowerCase())) {
        // setCornerActive(false);
        dispatch(setActiveMounting(item.toLowerCase()));
      } else {
        setCornerActive(!cornerActive);
      }
    }
  };
  const handleChannelSelect = (item) => {
    dispatch(setContent({ type: "channel", item: item }));
  };
  const opneClose = () => {
    if (
      selectedContent.hardwareFinishes !== null ||
      ["hardwareFinishes"].includes(type)
    )
      setAnchorEl(!anchorEl);
    else
      dispatch(
        showSnackbar({
          message: "Please select 'hardwareFinishes' first",
          severity: "warning",
        })
      );
  };
  const [cornerActive, setCornerActive] = useState(true);
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          width: "50%",
          pb: 1,
        }}
      >
        <Button
          onClick={opneClose}
          id="basic-button"
          sx={{ color: { sm: "#000000 !important ", xs: "white" } }}
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
            height: "250px",
            overflowY: "scroll",
            color: { sm: "#000000", xs: "white" },
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              borderRadius: 2,
              width: "fit-content",
              border: "2px solid #8477DA",
              // pl: 1,
              // pr: 1,
              // gap: 1
            }}
          >
            {["Channel", "Clamps"].map((item, index) => (
              <MuiMenuItem
                sx={{ p: 0.1 }}
                key={index}
                onClick={() => handleItemSelect(item)}
              >
                <Box
                  sx={{
                    width: "200px",
                    borderTopLeftRadius: index === 0 ? "12px" : "0px",
                    borderBottomLeftRadius: index === 0 ? "12px" : "0px",
                    borderTopRightRadius: index === 0 ? "0px" : "12px",
                    borderBottomRightRadius: index === 0 ? "0px" : "12px",
                    color:
                      item.toLowerCase() === selectedContent?.mountingState
                        ? "white"
                        : "#101828",
                    bgcolor:
                      item.toLowerCase() === selectedContent?.mountingState
                        ? "#8477DA"
                        : "",
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
                    <img
                      width={"25px"}
                      height={"25px"}
                      src={Logo}
                      alt="Selected"
                    />
                    <Typography>{item}</Typography>
                  </Box>
                </Box>
              </MuiMenuItem>
            ))}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignContent: "space-between",
            }}
          >
            {selectedContent.mountingState === "clamps" && (
              <>
                <MenuList
                  menuOptions={listData?.wallClamp}
                  title={"Wall Clamps"}
                  type={"wallClamp"}
                />
                <MenuList
                  menuOptions={listData?.sleeveOver}
                  title={"Sleeve Over"}
                  type={"sleeveOver"}
                />
                <MenuList
                  menuOptions={listData?.glassToGlass}
                  title={"Glass to Glass"}
                  type={"glassToGlass"}
                />
              </>
            )}
            {selectedContent.mountingState === "channel" && (
              <MenuItem
                type={'channel'}
                item={activeChannel}
                selectedItem={selectedContent.mountingChannel.item}
                handleItemSelect={handleChannelSelect}
                selectedContent={selectedContent}
              />
              // <MuiMenuItem
              //   key={activeChannel?.id}
              //   onClick={() => handleChannelSelect(activeChannel)}
              // >
              //   <Box
              //     sx={{
              //       width: "200px",
              //       borderRadius: "12px",
              //       border:
              //         activeChannel === selectedContent?.mountingChannel?.item
              //           ? "2px solid blue"
              //           : "1px solid #EAECF0",
              //       boxShadow:
              //         "0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)",
              //       p: 2,
              //       display: "flex",
              //       gap: 2,
              //       alignItems: "center",
              //       width: { md: "100%", xs: "95%" },
              //       justifyContent: "space-between",
              //     }}
              //   >
              //     <Box sx={{ display: "flex", gap: 2 }}>
              //       <img
              //         width={"25px"}
              //         height={"25px"}
              //         src={`${backendURL}/${activeChannel?.image}`}
              //         alt="Selected"
              //       />
              //       <Typography>{activeChannel?.name}</Typography>
              //     </Box>
              //   </Box>
              // </MuiMenuItem>
            )}
          </Box>
          {["Corner Clamps"].map((item, index) => (
            <MuiMenuItem
              sx={{
                borderRadius: "12px",
                padding: "5px",
                width: "fit-content",
                mt: 1,
              }}
              key={index}
              onClick={() => handleItemSelect(item)}
            >
              <Box
                sx={{
                  width: "fit-content",
                  borderRadius: "12px",
                  background:
                    selectedContent?.cornerClamps?.cornerWallClamp?.length ||
                      selectedContent?.cornerClamps?.cornerSleeveOver?.length ||
                      selectedContent?.cornerClamps?.cornerGlassToGlass?.length
                      ? "#8477DA"
                      : "#cccc",
                  // color:
                  //   item.toLowerCase() === selectedContent?.mountingState
                  //     ? "white"
                  //     : "black",
                  color: "white",
                  boxShadow:
                    "0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)",
                  p: 2,
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                  width: { md: "100%", xs: "95%" },
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex" }}>
                  {/* <img
                      width={"25px"}
                      height={"25px"}
                      src={Logo}
                      alt="Selected"
                    /> */}
                  <Typography>{item}</Typography>
                </Box>
              </Box>
            </MuiMenuItem>
          ))}
          {cornerActive && (
            <>
              <MenuList
                menuOptions={listData?.cornerWallClamp}
                title={"Wall Clamps"}
                type={"cornerWallClamp"}
              />
              <MenuList
                menuOptions={listData?.cornerSleeveOver}
                title={"Sleeve Over"}
                type={"cornerSleeveOver"}
              />
              <MenuList
                menuOptions={listData?.cornerGlassToGlass}
                title={"Glass to Glass"}
                type={"cornerGlassToGlass"}
              />
            </>
          )}
        </Box>
      ) : (
        ""
      )}
    </Box>
  );
};

export default ChannelTypeDesktop;
