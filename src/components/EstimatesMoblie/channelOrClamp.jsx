import { useMemo, useState } from "react";
import Button from "@mui/material/Button";
import Logo from "../../Assets/bar-chart-2.svg";
import MenuItem from "@mui/material/MenuItem";
import {
  ChevronRight,
} from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getContent,
  getListData,
  setActiveMounting,
  setContent,
} from "../../redux/estimateCalculations";
import MenuList from "./menuList";
import { backendURL } from "../../utilities/common";
import InfoIcon from '@mui/icons-material/Info';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

const ChannelType = ({
  menuOptions,
  title,
  type,
  showSnackbar,
  estimatesData,
}) => {
  const [anchorEl, setAnchorEl] = useState(false);
  const selectedContent = useSelector(getContent);
  const listData = useSelector(getListData);
  /** Show channel item on base of active thickness fo glass */
  const activeChannel = useMemo(() => {
    let active = null;
    if (selectedContent?.glassType?.thickness === '1/2') {
      active = listData?.mountingChannel?.find((item) => item.slug === 'u-channel-1-2');
    } else if (selectedContent?.glassType?.thickness === '3/8') {
      active = listData?.mountingChannel?.find((item) => item.slug === 'u-channel-3-8');
    }
    return active;
  }, [selectedContent?.glassType?.thickness]);
  /** end */
  const dispatch = useDispatch();
  const handleItemSelect = (item) => {
    if (!["mounting"].includes(type)) {
      dispatch(setContent({ type: type, item: item }));
    } else {
      dispatch(setActiveMounting(item.toLowerCase()));
    }
  };
  const handleChannelSelect = (item) => {
    dispatch(setContent({ type: 'channel', item: item }));
  }
  const opneClose = () => {
    if (
      selectedContent.hardwareFinishes !== null ||
      ["hardwareFinishes"].includes(type)
    )
      setAnchorEl(!anchorEl);
    else showSnackbar("Please select 'hardwareFinishes' first", "warning");
  };

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
          sx={{ color: { md: "#000000 !important ", xs: "white" } }}
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
                      <Tooltip title={title}>
                        <IconButton color="primary">
                          <InfoIcon />
                        </IconButton>
                      </Tooltip>
          <Typography>{title}</Typography>
        </Button>
      </Box>
      {anchorEl ? (
        <Box
          sx={{
            height: "250px",
            overflowY: "scroll",
            color: { md: "#000000", xs: "white" },
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "100%",
              width: "95vw",
            }}
          >
            {menuOptions?.map((item, index) => (
              <MenuItem key={index} onClick={() => handleItemSelect(item)}>
                <Box
                  sx={{
                    width: "200px",
                    borderRadius: "12px",
                    border:
                      item.toLowerCase() === selectedContent?.mountingState
                        ? "2px solid #8477da"
                        : "1px solid #EAECF0",
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
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <img
                      width={"25px"}
                      height={"25px"}
                      src={Logo}
                      alt="Selected"
                    />
                    <Typography>{item}</Typography>
                  </Box>
                </Box>
              </MenuItem>
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
                  menuOptions={estimatesData?.wallClamp}
                  title={"Wall Clamps"}
                  type={"wallClamp"}
                  showSnackbar={showSnackbar}
                />
                <MenuList
                  menuOptions={estimatesData?.sleeveOver}
                  title={"Sleeve Over"}
                  type={"sleeveOver"}
                  showSnackbar={showSnackbar}
                />
                <MenuList
                  menuOptions={estimatesData?.glassToGlass}
                  title={"Glass to Glass"}
                  type={"glassToGlass"}
                  showSnackbar={showSnackbar}
                />
              </>
            )}

            {selectedContent.mountingState === "channel" && (
              <MenuItem key={activeChannel?.id} onClick={() => handleChannelSelect(activeChannel)}>
              <Box
                sx={{
                  width: "200px",
                  borderRadius: "12px",
                  border: (activeChannel === selectedContent?.mountingChannel?.item)
                    ? "2px solid blue"
                    : "1px solid #EAECF0",
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
                <Box sx={{ display: "flex", gap: 2 }}>
                  <img
                    width={"25px"}
                    height={"25px"}
                    src={`${backendURL}/${activeChannel?.image}`}
                    alt="Selected"
                  />
                  <Typography>{activeChannel?.name}</Typography>
                </Box>
              </Box>
            </MenuItem>
            )}
          </Box>
        </Box>
      ) : (
        ""
      )}
    </Box>
  );
};

export default ChannelType;
