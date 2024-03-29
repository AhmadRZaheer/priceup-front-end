import { useState } from "react";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import {
  AddCircleOutline,
  ChevronRight,
  RemoveCircleOutline,
} from "@mui/icons-material";
import { Box, CircularProgress, TextField, Typography } from "@mui/material";
import { backendURL } from "../../utilities/common";
import { useDispatch, useSelector } from "react-redux";
import {
  getContent,
  setContent,
  setCounters,
  setThickness,
  updateAddOnCount,
} from "../../redux/estimateCalculations";

const MenuList = ({
  menuOptions,
  title,
  type,
  showSnackbar,
  count,
  thickness,
  currentItem,
}) => {
  const selectedContent = useSelector(getContent);
  const [anchorEl, setAnchorEl] = useState(false);
  const [countVal, setCountVal] = useState(count || 0);
  const [thicknessVal, setThicknessVal] = useState(thickness || "1/2");
  const [selectedItem, setSelectedItem] = useState(currentItem || null);
  const [sleeveOverCount, setSleeveOverCount] = useState(
    selectedContent?.sleeveOverCount || 0
  );
  const [towelBarsCount, setTowelBarsCount] = useState(
    selectedContent?.towelBarsCount || 0
  );
  const handleSleeveOverCount = (count) => {
    if (count >= 0) {
      setSleeveOverCount(count);
      dispatch(updateAddOnCount({ type: "sleeveOverCount", count: count }));
    }
  };
  const handleTowelBarsCount = (count) => {
    if (count >= 0) {
      setTowelBarsCount(count);
      dispatch(updateAddOnCount({ type: "towelBarsCount", count: count }));
    }
  };
  const dispatch = useDispatch();
  const handleItemSelect = (item) => {
    dispatch(setContent({ type: type, item: item }));
    setSelectedItem(item);
  };

  const handleCountSet = (value) => {
    if (value >= 0) {
      setCountVal(value);
      dispatch(setCounters({ type: type, value: value }));
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
    else showSnackbar("Please select 'hardwareFinishes' first", "warning");
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
        {![
          "hardwareFinishes",
          "channel",
          "glassTreatment",
          "glassType",
          "addOns",
        ].includes(type) && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              color: { md: "#000000  ", xs: "white" },
              alignSelf: "flex-end",
              py: 1.5,
            }}
          >
            <RemoveCircleOutline
              onClick={() => handleCountSet(countVal - 1)}
              sx={{ color: "#98A2B3" }}
            />
            <Typography>{countVal}</Typography>

            <AddCircleOutline
              onClick={() => handleCountSet(countVal + 1)}
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
              color: { md: "#000000  ", xs: "white" },
              alignSelf: "flex-end",
            }}
          >
            <TextField
              select
              size="small"
              variant="outlined"
              InputProps={{
                style: {
                  color: "white",
                },
                inputProps: { min: 0, max: 50 },
              }}
              InputLabelProps={{
                style: {
                  color: "rgba(255, 255, 255, 0.5)",
                },
              }}
              sx={{
                border: { md: "none", xs: "2px solid #423f57" },
                borderRadius: { md: 0, xs: 2 },
                color: { md: "black", xs: "white" },
                background: "#14112c",
                width: "100%",
                mb: 1,
              }}
              value={thicknessVal}
              onChange={(event) => handleThicknessSet(event.target.value)}
            >
              <MenuItem key="1/2" value="1/2">
                1/2
              </MenuItem>
              <MenuItem key="3/8" value="3/8">
                3/8
              </MenuItem>
            </TextField>
          </Box>
        )}
      </Box>
      {anchorEl ? (
        <Box
          sx={{
            height: "150px",
            overflowY: "scroll",
            color: { md: "#000000", xs: "white" },
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
              <CircularProgress />
            </Box>
          ) : (
            menuOptions?.map((item) => (
              <MenuItem key={item.id} onClick={() => handleItemSelect(item)}>
                <Box
                  sx={{
                    width: "200px",
                    borderRadius: "12px",
                    border: (
                      type === "addOns"
                        ? selectedContent?.addOns.some(
                            (selectedItem) => selectedItem?._id === item?._id
                          )
                        : item === selectedItem
                    )
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
                      src={`${backendURL}/${item?.image}`}
                      alt="Selected"
                    />
                    <Typography>{item?.name}</Typography>
                  </Box>
                  <Box>
                    {item?.slug === "sleeve-over" && (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-around",
                          gap: 2,
                          color: { md: "#000000  ", xs: "white" },
                          alignSelf: "flex-end",
                        }}
                      >
                        <AddCircleOutline
                          onClick={() =>
                            handleSleeveOverCount(sleeveOverCount + 1)
                          }
                          sx={{ color: "#98A2B3" }}
                        />
                        <Typography>{sleeveOverCount}</Typography>
                        <RemoveCircleOutline
                          onClick={() =>
                            handleSleeveOverCount(sleeveOverCount - 1)
                          }
                          sx={{ color: "#98A2B3" }}
                        />
                      </Box>
                    )}
                    <Box>
                      {item?.slug === "towel-bars" && (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            color: { md: "#000000  ", xs: "white" },
                            alignSelf: "flex-end",
                          }}
                        >
                          <AddCircleOutline
                            onClick={() =>
                              handleTowelBarsCount(towelBarsCount + 1)
                            }
                            sx={{ color: "#98A2B3" }}
                          />
                          <Typography>{towelBarsCount}</Typography>
                          <RemoveCircleOutline
                            onClick={() =>
                              handleTowelBarsCount(towelBarsCount - 1)
                            }
                            sx={{ color: "#98A2B3" }}
                          />
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Box>
              </MenuItem>
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
