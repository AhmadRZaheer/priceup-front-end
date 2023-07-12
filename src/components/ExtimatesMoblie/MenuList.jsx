import { useState } from "react";

import Button from "@mui/material/Button";

import MenuItem from "@mui/material/MenuItem";

import { AddCircleOutline, ChevronRight, RemoveCircleOutline } from "@mui/icons-material";

import { Box, CircularProgress, TextField, Typography } from "@mui/material";

import { backendURL } from "../../utilities/common";
import { useDispatch } from "react-redux";
import { setContent, setCounters, setThickness } from "../../redux/estimateCalculations";

const MenuList = ({ menuOptions, title, type, setSelectedContent, count, thickness }) => {
  const [anchorEl, setAnchorEl] = useState(false);
  const [countVal, setCountVal] = useState(count || 0);
  const [thicknessVal, setThicknessVal] = useState(thickness || '1/2');
  const dispatch = useDispatch();
  const handleItemSelect = (item) => {
    dispatch(setContent({ type: type, item: item }));
  };

  const handleCountSet = (value) => {
    if (value >= 0) {
      setCountVal(value);
      dispatch(setCounters({ type: type, value: value }))
    }
  }
  const handleThicknessSet = (thickness) => {
    setThicknessVal(thickness);
    dispatch(setThickness(thickness));
  }
  return (
    <Box>
      <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
        <Button
          onClick={() => setAnchorEl(!anchorEl)}
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
          <Typography>{title}</Typography>
        </Button>
        {!['hardwareFinishes', 'channel', 'glassTreatment', 'glassType', 'addOns'].includes(type) && <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            color: { md: "#000000  ", xs: "white" },
            alignSelf: 'flex-end'
          }}
        >
          <AddCircleOutline onClick={() => handleCountSet(countVal + 1)} sx={{ color: "#98A2B3" }} />
          <Typography>{countVal}</Typography>
          <RemoveCircleOutline onClick={() => handleCountSet(countVal - 1)} sx={{ color: "#98A2B3" }} />
        </Box>}
        {['glassType'].includes(type) && <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            color: { md: "#000000  ", xs: "white" },
            alignSelf: 'flex-end'
          }}
        >
          <TextField
            select
            size="small"
            variant="outlined"
            style={{ width: "100%", background: 'white' }}
            value={thicknessVal}
            onChange={(event) => handleThicknessSet(event.target.value)}
          // onChange={formik.handleChange} ()=>handleThicknessSet()
          // onBlur={formik.handleBlur}
          >
            <MenuItem
              key="1/2"
              // selected={thickness === "1/2"}
              value="1/2"
            >
              1/2
            </MenuItem>
            <MenuItem
              key="3/8"
              // selected={thickness === "3/8"}
              // selected={
              //   singleDefault?.layoutData?.settings
              //     ?.hardwareFinishes === option?._id
              // }
              value="3/8"
            >
              3/8
            </MenuItem>

          </TextField>
        </Box>}
      </Box>
      {anchorEl ? (
        <Box
          sx={{
            height: "150px",
            overflowY: "scroll",
            color: { md: "#000000", xs: "white" },
          }}
        >
          {menuOptions?.map((item) => (
            <MenuItem key={item.id} onClick={() => handleItemSelect(item)}>
              <Box
                sx={{
                  width: "200px",
                  borderRadius: "12px",
                  boxShadow:
                    "0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)",
                  border: "1px solid #EAECF0",
                  p: 2,
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                  width: { md: "100%", xs: "95%" },
                }}
              >
                <img
                  width={"25px"}
                  height={"25px"}
                  src={`${backendURL}/${item?.image}`}
                  alt="Selected"
                />
                <Box sx={{ color: { md: "#000000 ", xs: "white" } }}>
                  <Typography>{item?.name}</Typography>
                  {/* <Typography>{item.price}</Typography> */}
                </Box>
              </Box>
            </MenuItem>
          ))}
        </Box>
      ) : (
        ""
      )}
    </Box>
  );
};

export default MenuList;
