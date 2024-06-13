import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import {
  ChevronRight,
} from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  TextField,
  Typography,
  MenuItem as MuiMenuItem,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import MenuItem from "./menuItem";
import { getSelectedContent, setSelectedContent, setThickness } from "@/redux/mirrorsEstimateSlice";

const MenuList = ({
  menuOptions,
  title,
  type,
  thickness,
  currentItem,
}) => {
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
          pb: 1,
        }}
      >
        <Button
          onClick={openClose}
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
              <MuiMenuItem key="1/4" value="1/4">
                1/4
              </MuiMenuItem>
              <MuiMenuItem key="1/8" value="1/8">
                1/8
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
