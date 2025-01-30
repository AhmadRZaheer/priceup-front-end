import {
  useEffect,
  useState,
} from 'react';

import { useDispatch } from 'react-redux';

import { setCounters } from '@/redux/estimateCalculations';
import {
  AddCircleOutline,
  RemoveCircleOutline,
} from '@mui/icons-material';
import {
  Box,
  CircularProgress,
  Typography,
} from '@mui/material';

import MenuItem from './menuItem';

const MenuList = ({
  menuOptions,
  title,
  type,
  count,
  thickness,
  currentItem,
  selectedContent,
  handleChange,
  locationSettings,
  colorData,
}) => {
  const [anchorEl, setAnchorEl] = useState(true);
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
    handleChange(type, item);
    setSelectedItem(item);
  };
  const handleCountSet = (value) => {
    if (value >= 0 && value <= 100) {
      setCountVal(value);
      dispatch(setCounters({ item: selectedItem, type: type, value: value }));
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
        }}
      >
        <Box
          sx={{
            color: {
              sm: anchorEl ? "black" : "black !important ",
              xs: "black",
            },
            paddingLeft: "0px !important",
            pt: {sm:"2px !important",xs:"5px !important"},
            pb:  {sm:"1px !important",xs:"4px !important"},
            px: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: {sm:"24px",xs:'18px'},
              lineHeight: {sm:"36px",xs:'24px'},
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
              color: { sm: "#000000", xs: "white" },
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
      </Box>
      {anchorEl ? (
        <Box
          sx={{
            maxHeight: "220px",
            overflowY: "scroll",
            color: { sm: "#000000", xs: "white" },
            backgroundColor: "#F3F5F6",
            border: "1px solid #D4DBDF",
            borderRadius: "8px",
            padding: "6px",
            mx: "6px",
            mb: "6px",
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
                thickness={thickness}
                selectedItem={selectedItem}
                handleItemSelect={handleItemSelect}
                selectedContent={selectedContent}
                handleChange={handleChange}
                locationSettings={locationSettings}
                colorData={colorData}
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
