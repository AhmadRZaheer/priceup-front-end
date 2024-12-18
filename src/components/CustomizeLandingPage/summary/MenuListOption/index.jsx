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
  Select,
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
import CustomInputField from "@/components/ui-components/CustomInput";

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
  const [countVal, setCountVal] = useState(0);
  const [thicknessVal, setThicknessVal] = useState("1/2");
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    setThicknessVal(thickness);
  }, [thickness]);
  useEffect(() => {
    setCountVal(count);
  }, [count]);
  useEffect(() => {
    setSelectedItem(currentItem);
  }, [currentItem]);
  const dispatch = useDispatch();
  const handleItemSelect = (item) => {
    dispatch(setContent({ type: type, item: item }));
    setSelectedItem(item);
  };
  const handleCountSet = (value) => {
    if (value >= 0 && value <= 100) {
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
      selectedContent.hardwareFinishes ||
      ["hardwareFinishes"].includes(type)
    ) {
      setAnchorEl(!anchorEl);
    } else {
      setAnchorEl(!anchorEl);
    }
  };
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          background: "white",
          borderRadius: "11px",
          color: "black",
          // pb: 1,
        }}
      >
        <Box
          onClick={opneClose}
          // id="basic-button"
          sx={{
            color: {
              sm: anchorEl ? "black" : "black !important ",
              xs: "black",
            },
            paddingLeft: "0px !important",
            paddingY: "12px !important",
            px:2,
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          {anchorEl ? (
            <ChevronRight
              sx={{
                display: "flex",
                alignItems: "center",
                transform: "rotate(90deg)",
                color: "black !important",
                mr: 2,
              }}
            />
          ) : (
            <ChevronRight sx={{ color: "black !important", mr: 2 }} />
          )}
          <Typography
            sx={{
              fontSize: "24px",
              lineHeight: "36px",
              fontWeight: 500,
              fontFamily: '"Poppins" !important',
            }}
          >
            {title}
          </Typography>
        </Box>
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
              gap: 1,
              color: { sm: "#000000  ", xs: "white" },
              // alignSelf: "flex-end",
              // py: 1.5,
            }}
          >
            <AddCircleOutline
              onClick={() => handleCountSet(countVal + 1)}
              sx={{ color: "#5D6164", cursor: "pointer" }}
            />
            <Typography
              className="counter-txt"
              sx={{
                fontWeight: 500,
                fontSize: "14px",
                fontFamily: '"Roboto", sans-serif !important',
              }}
            >
              {countVal}
            </Typography>
            <RemoveCircleOutline
              onClick={() => handleCountSet(countVal - 1)}
              sx={{ color: "#5D6164", cursor: "pointer" }}
            />
          </Box>
        )}
        {/* {["glassType"].includes(type) && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              color: { sm: "#000000  ", xs: "white" },
              alignSelf: "flex-end",
            }}
          >
            <Select
              select
              size="small"
              variant="outlined"
              className="custom-textfield"
              InputProps={{
                style: {
                  borderRadius: "4px",
                  // paddingTop: "10.5px",
                  // paddingBottom: " 10.5px",
                  height: "38px",
                },
                inputProps: { min: 0, max: 50 },
              }}
              sx={{
                border: { sm: "none", xs: "2px solid #423f57" },
                // borderRadius: { sm: 0, xs: 2 },
                color: { sm: "#000000", xs: "white" },
                fontSize: "12px",
                fontFamily: '"Roboto", sans-serif !important',
                lineHeight: "14.06px",
                width: "63px",
                mb: 1,
                ".MuiOutlinedInput-input": {
                  display: "flex",
                  alignItems: "end",
                },
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
            </Select>
          </Box>
        )} */}
      </Box>
      {anchorEl ? (
        <Box
          sx={{
            maxHeight: "250px",
            // minHeight: "80px",
            overflowY: "scroll",
            color: { sm: "#000000", xs: "white" },
            backgroundColor: "#F3F5F6",
            border: "1px solid #D4DBDF",
            borderRadius: "8px",
            padding: "6px",
            m: "6px",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
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
