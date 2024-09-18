import { useMemo, useState } from "react";
import Logo from "@/Assets/bar-chart-2.svg";
import { ChevronRight } from "@mui/icons-material";
import {
  Box,
  Typography,
  MenuItem as MuiMenuItem,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { showSnackbar } from "@/redux/snackBarSlice";
import { thicknessTypes } from "@/utilities/constants";
import MenuItem from "./menuItem";
import { getWineContent, getWineListData, setWineActiveMounting, setWineContent } from "@/redux/wineCellarSlice";

const WineChannelTypeDesktop = ({ menuOptions, title, type }) => {
  const [anchorEl, setAnchorEl] = useState(false);
  const selectedContent = useSelector(getWineContent);
  const listData = useSelector(getWineListData);
  /** Show channel item on base of active thickness fo glass */
  const activeChannel = useMemo(() => {
    let active = 'u-channel-3-8';
    if (selectedContent?.glassType?.thickness === thicknessTypes.ONEBYTWO) {
      active = listData?.mountingChannel?.find(
        (item) => item.slug === "u-channel-1-2"
      );
    } else if (
      selectedContent?.glassType?.thickness === thicknessTypes.THREEBYEIGHT
    ) {
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
      dispatch(setWineContent({ type: type, item: item }));
    } else {
      if (["channel"].includes(item.toLowerCase())) {
        dispatch(setWineActiveMounting(item.toLowerCase()));
      } else {
        setCornerActive(!cornerActive);
      }
    }
  };
  const handleChannelSelect = (item) => {
    dispatch(setWineContent({ type: "channel", item: item }));
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
        }}
      >
        <Button
          onClick={opneClose}
          id="basic-button"
          sx={{
            color: {
              sm: anchorEl ? "#8477DA" : "#000000 !important ",
              xs: "white",
            },
            pl: "0px !important",
            paddingY: "16px !important",
          }}
        >
          {anchorEl ? (
            <ChevronRight
              sx={{
                display: "flex",
                alignItems: "center",
                transform: "rotate(90deg)",
                color: anchorEl ? "#8477DA" : "#98A2B3 !important",
                mr: 2,
              }}
            />
          ) : (
            <ChevronRight sx={{ color: "#98A2B3", mr: 2 }} />
          )}
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 500,
              fontFamily: '"Roboto", sans-serif !important',
            }}
          >
            {title}
          </Typography>
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
            }}
          >
            {["Channel"].map((item, index) => (
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
            {selectedContent.mountingState === "channel" && (
              <Box py={1}>
                <MenuItem
                  type={"channel"}
                  item={activeChannel}
                  selectedItem={selectedContent.mountingChannel.item}
                  handleItemSelect={handleChannelSelect}
                  selectedContent={selectedContent}
                />
              </Box>
            )}
          </Box>
        </Box>
      ) : (
        ""
      )}
    </Box>
  );
};

export default WineChannelTypeDesktop;
