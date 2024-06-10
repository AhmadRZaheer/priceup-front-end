import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import {
  AddCircleOutline,
  ChevronRight,
  RemoveCircleOutline,
} from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  TextField,
  Typography,
  MenuItem as MuiMenuItem,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getContent,
  setContent,
  setCounters,
  setThickness,
} from "@/redux/estimateCalculations";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { showSnackbar } from "@/redux/snackBarSlice";
import MenuItem from "./menuItem";

const MenuList = ({
  menuOptions,
  title,
  type,
  count,
  thickness,
  currentItem,
}) => {
  const selectedContent = useSelector(getContent);
  const [anchorEl, setAnchorEl] = useState(false);
  const [countVal, setCountVal] = useState(count || 0);
  const [thicknessVal, setThicknessVal] = useState(thickness || "1/2");
  const [selectedItem, setSelectedItem] = useState(null);
  useEffect(() => {
    setSelectedItem(currentItem);
  }, [currentItem]);
  const dispatch = useDispatch();
  const handleItemSelect = (item) => {
    dispatch(setContent({ type: type, item: item }));
    setSelectedItem(item);
  };
  const handleCountSet = (value) => {
    if (value >= 0) {
      setCountVal(value);
      dispatch(setCounters({ item: selectedItem, type: type, value: value }));
    }
  };
  const handleThicknessSet = (thickness) => {
    setThicknessVal(thickness);
    dispatch(setThickness(thickness));
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
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
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
        {![
          "hardwareFinishes",
          "channel",
          "wallClamp",
          "sleeveOver",
          "glassToGlass",
          "cornerWallClamp",
          "cornerSleeveOver",
          "cornerGlassToGlass",
          "glassAddons",
          "glassType",
          "hardwareAddons",
        ].includes(type) && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                color: { sm: "#000000  ", xs: "white" },
                alignSelf: "flex-end",
                py: 1.5,
              }}
            >
              <AddCircleOutline
                onClick={() => handleCountSet(countVal + 1)}
                sx={{ color: "#98A2B3" }}
              />
              <Typography>{countVal}</Typography>
              <RemoveCircleOutline
                onClick={() => handleCountSet(countVal - 1)}
                sx={{ color: "#98A2B3" }}
              />
            </Box>
          )}
        {["glassType"].includes(type) && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              color: { sm: "#000000  ", xs: "white" },
              alignSelf: "flex-end",
            }}
          >
            <TextField
              select
              size="small"
              variant="outlined"
              InputProps={{
                style: {
                  color: "black",
                  borderRadius: 10,
                  border: "1px solid #cccccc",
                  backgroundColor: "white",
                },
                inputProps: { min: 0, max: 50 },
              }}
              InputLabelProps={{
                style: {
                  color: "rgba(255, 255, 255, 0.5)",
                },
              }}
              sx={{
                border: { sm: "none", xs: "2px solid #423f57" },
                borderRadius: { sm: 0, xs: 2 },
                color: { sm: "black", xs: "white" },
                width: "100%",
                mb: 1,
              }}
              value={thicknessVal}
              onChange={(event) => handleThicknessSet(event.target.value)}
            >
              <MuiMenuItem key="1/2" value="1/2">
                1/2
              </MuiMenuItem>
              <MuiMenuItem key="3/8" value="3/8">
                3/8
              </MuiMenuItem>
            </TextField>
          </Box>
        )}
      </Box>
      {anchorEl ? (
        <Box
          sx={{
            maxHeight: "250px",
            minHeight: "80px",
            overflowY: "scroll",
            color: { sm: "#000000", xs: "white" },
          }}
        >
          {menuOptions === undefined ? (
            <Box
              sx={{
                width: 40,
                m: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 150,
              }}
            >
              <CircularProgress sx={{ color: "#8477DA" }} />
            </Box>
          ) : (
            menuOptions?.map((item) => (
              <MenuItem
                type={type}
                item={item}
                selectedItem={selectedItem}
                handleItemSelect={handleItemSelect}
                selectedContent={selectedContent}
              />
            ))
          )}
        </Box>
      ) : (
        ""
      )}
    </Box>
  );
};

export default MenuList;
