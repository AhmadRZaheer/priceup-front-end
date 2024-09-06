import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { ChevronRight } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  TextField,
  Typography,
  MenuItem as MuiMenuItem,
  Select,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import MenuItem from "./menuItem";
import {
  getSelectedContent,
  setSelectedContent,
  setThickness,
} from "@/redux/mirrorsEstimateSlice";

const MenuList = ({ menuOptions, title, type, thickness, currentItem }) => {
  const selectedContent = useSelector(getSelectedContent);
  const [anchorEl, setAnchorEl] = useState(false);
  const [thicknessVal, setThicknessVal] = useState(thickness || "1/4");
  const [selectedItem, setSelectedItem] = useState(null);
  useEffect(() => {
    setSelectedItem(currentItem);
  }, [currentItem]);
  const dispatch = useDispatch();
  const handleItemSelect = (item) => {
    dispatch(setSelectedContent({ type: type, item: item }));
    setSelectedItem(item);
  };

  const handleThicknessSet = (thickness) => {
    setThicknessVal(thickness);
    dispatch(setThickness({ thickness: thickness, type: type }));
  };
  const openClose = () => {
    setAnchorEl(!anchorEl);
  };
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          // pb: 1,
        }}
      >
        <Box
          onClick={openClose}
          // id="basic-button"
          sx={{
            color: {
              sm: anchorEl ? "#8477DA" : "#000000 !important ",
              xs: "white",
            },
            paddingLeft: "0px !important",
            paddingY: "16px !important",
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
                color: anchorEl ? "#8477DA" : "#98A2B3",
              }}
            />
          ) : (
            <ChevronRight sx={{ color: "#98A2B3" }} />
          )}
          <Typography sx={{ fontSize: "14px", fontWeight: 500, fontFamily: '"Roboto", sans-serif !important', }}>
            {title}
          </Typography>
        </Box>
        {["glassType", "edgeWork"].includes(type) && (
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
                  height: "38px",
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
                // borderRadius: { sm: 0, xs: 2 },
                color: { sm: "#000000", xs: "white" },
                fontSize:'12px',fontFamily:'"Roboto", sans-serif !important',lineHeight:'14.06px',
                width: "63px",
                mb: 1,
                '.MuiOutlinedInput-input':{
                  display:'flex',alignItems:'end'
                }
              }}
              value={thicknessVal}
              onChange={(event) => handleThicknessSet(event.target.value)}
            >
              <MuiMenuItem key="1/4" value="1/4">
                1/4
              </MuiMenuItem>
              <MuiMenuItem key="1/8" value="1/8">
                1/8
              </MuiMenuItem>
            </Select>
          </Box>
        )}
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
