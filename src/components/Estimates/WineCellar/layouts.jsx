import {
  Box,
  Button,
  CircularProgress,
  Grid,
  InputAdornment,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { backendURL } from "@/utilities/common";
import { useDispatch, useSelector } from "react-redux";
import { useMemo, useState } from "react";
import CustomInputField from "@/components/ui-components/CustomInput";
import { CheckCircle, Close } from "@mui/icons-material";
import icon from "@/Assets/search-icon.svg";
import { addSelectedWineItem, getWineProjectId, resetNotificationsWineCaller, selectedWineItem, setisCustomWineDoorWidth, setWineDoorWidth, setWineQuoteState, updateWineMeasurements } from "@/redux/wineCellarSlice";

const WineCellarLayouts = [
  {
    "settings": {
      "handles": {
        "handleType": "6602b5d0a4983e276850a4d8",
        "count": 1
      },
      "hinges": {
        "hingesType": "6602b5d0a4983e276850a518",
        "count": 2
      },
      "pivotHingeOption": {
        "pivotHingeType": "6602b5d0a4983e276850a4e8",
        "count": 2
      },
      "heavyDutyOption": {
        "heavyDutyType": "6602b5d0a4983e276850a510",
        "threshold": 85,
        "height": 100
      },
      "heavyPivotOption": {
        "heavyPivotType": null,
        "threshold": 0,
        "height": 0
      },
      "wallClamp": {
        "wallClampType": null,
        "count": 0
      },
      "sleeveOver": {
        "sleeveOverType": null,
        "count": 0
      },
      "glassToGlass": {
        "glassToGlassType": null,
        "count": 0
      },
      "cornerWallClamp": {
        "wallClampType": null,
        "count": 0
      },
      "cornerSleeveOver": {
        "sleeveOverType": null,
        "count": 0
      },
      "cornerGlassToGlass": {
        "glassToGlassType": "6602b5d0a4983e276850a538",
        "count": 1
      },
      "glassType": {
        "type": "6602b5d0a4983e276850a5c4",
        "thickness": "3/8"
      },
      "slidingDoorSystem": {
        "type": null,
        "count": 0
      },
      "other": {
        "people": 2,
        "hours": 3
      },
      "hardwareFinishes": "6602b5d0a4983e276850a4af",
      "channelOrClamps": "Channel",
      "mountingChannel": "6602b5d1a4983e276850a6ea",
      "outages": 3,
      "glassAddon": "6602b5d0a4983e276850a5ca",
      "measurementSides": 3,
      "variant": "doorpanelandreturn",
      "notch": 0,
      "transom": null,
      "header": null
    },
    "_id": "6602b5d1a4983e276850a724",
    "name": "Door Panel & Return",
    "image": "images/layouts/layout_6.png",
    "company_id": "6602b5d0a4983e276850a4a7",
    "createdAt": "2024-03-26T11:47:29.404Z",
    "updatedAt": "2024-03-26T11:47:29.404Z",
    "__v": 0
  },
  {
    "settings": {
      "handles": {
        "handleType": "6602b5d0a4983e276850a4c8",
        "count": 1
      },
      "hinges": {
        "hingesType": "6602b5d0a4983e276850a518",
        "count": 2
      },
      "pivotHingeOption": {
        "pivotHingeType": "6602b5d0a4983e276850a508",
        "count": 2
      },
      "heavyDutyOption": {
        "heavyDutyType": "6602b5d0a4983e276850a510",
        "threshold": 85,
        "height": 100
      },
      "heavyPivotOption": {
        "heavyPivotType": null,
        "threshold": 0,
        "height": 0
      },
      "wallClamp": {
        "wallClampType": null,
        "count": 0
      },
      "sleeveOver": {
        "sleeveOverType": null,
        "count": 0
      },
      "glassToGlass": {
        "glassToGlassType": null,
        "count": 0
      },
      "cornerWallClamp": {
        "wallClampType": null,
        "count": 0
      },
      "cornerSleeveOver": {
        "sleeveOverType": null,
        "count": 0
      },
      "cornerGlassToGlass": {
        "glassToGlassType": null,
        "count": 0
      },
      "glassType": {
        "type": "6602b5d0a4983e276850a5c4",
        "thickness": "3/8"
      },
      "slidingDoorSystem": {
        "type": null,
        "count": 0
      },
      "other": {
        "people": 2,
        "hours": 2
      },
      "hardwareFinishes": "6602b5d0a4983e276850a4af",
      "outages": 2,
      "transom": "6602b5d0a4983e276850a548",
      "measurementSides": 2,
      "variant": "door",
      "channelOrClamps": "",
      "mountingChannel": null,
      "notch": 0,
      "header": null,
      "glassAddon": null
    },
    "_id": "6602b5d1a4983e276850a722",
    "name": "Door",
    "image": "images/layouts/layout_1.png",
    "company_id": "6602b5d0a4983e276850a4a7",
    "createdAt": "2024-03-26T11:47:29.398Z",
    "updatedAt": "2024-03-26T11:47:29.398Z",
    "__v": 0
  },
  {
    "settings": {
      "handles": {
        "handleType": "6602b5d0a4983e276850a4d8",
        "count": 1
      },
      "hinges": {
        "hingesType": "6602b5d0a4983e276850a518",
        "count": 2
      },
      "pivotHingeOption": {
        "pivotHingeType": null,
        "count": 0
      },
      "heavyDutyOption": {
        "heavyDutyType": null,
        "threshold": 0,
        "height": 0
      },
      "heavyPivotOption": {
        "heavyPivotType": null,
        "threshold": 0,
        "height": 0
      },
      "wallClamp": {
        "wallClampType": null,
        "count": 0
      },
      "sleeveOver": {
        "sleeveOverType": null,
        "count": 0
      },
      "glassToGlass": {
        "glassToGlassType": null,
        "count": 0
      },
      "cornerWallClamp": {
        "wallClampType": null,
        "count": 0
      },
      "cornerSleeveOver": {
        "sleeveOverType": "6602b5d0a4983e276850a538",
        "count": 3
      },
      "cornerGlassToGlass": {
        "glassToGlassType": "6602b5d0a4983e276850a538",
        "count": 1
      },
      "glassType": {
        "type": "6602b5d0a4983e276850a5c4",
        "thickness": "3/8"
      },
      "slidingDoorSystem": {
        "type": null,
        "count": 0
      },
      "other": {
        "people": 2,
        "hours": 2
      },
      "hardwareFinishes": "6602b5d0a4983e276850a4af",
      "channelOrClamps": "Clamps",
      "mountingChannel": null,
      "outages": 2,
      "measurementSides": 5,
      "variant": "doornotchedpanelandreturn",
      "notch": 0,
      "transom": null,
      "header": null,
      "glassAddon": null
    },
    "_id": "6602b5d1a4983e276850a719",
    "name": "Door Notched Panel & Return",
    "image": "images/layouts/layout_7.png",
    "company_id": "6602b5d0a4983e276850a4a7",
    "createdAt": "2024-03-26T11:47:29.393Z",
    "updatedAt": "2024-07-03T16:45:55.274Z",
    "__v": 0
  },

]

export const WineCallerLayouts = () => {
  const boxStyles = {
    minHeight: "182px",
    minWidth: "180px",
    margin: "auto",
    borderRadius: "12px",
    boxShadow:
      "0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)",
    border: "1px solid #EAECF0",
    p: 2,
    background: "#D9D9D9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
    flexDirection: "column",
    cursor: "pointer",
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedData = useSelector(selectedWineItem);
  const projectId = useSelector(getWineProjectId);
  const iphoneSe = useMediaQuery("(max-width: 375px)");
  const iphone14Pro = useMediaQuery("(max-width: 430px)");
  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {
    if (WineCellarLayouts) {
      const result = WineCellarLayouts.filter((item) =>
        item.name.toLowerCase().includes(search?.toLowerCase() || "")
      );
      return result;
    }
    return [];
  }, [WineCellarLayouts, search]);

  const handleBoxClick = (layout) => {
    dispatch(setisCustomWineDoorWidth(false));
    dispatch(addSelectedWineItem(layout));
    dispatch(setWineQuoteState("create"));
  };
  const setStorePage = () => {
    dispatch(resetNotificationsWineCaller());
    dispatch(updateWineMeasurements([])); // reset measurement array on shifting layout
    dispatch(setWineDoorWidth(0));
    navigate("/estimates/dimensions");
  };
  // useEffect(() => {
  //   refetch();
  // }, []);
  return (
    <Box
      sx={{
        width: "100%",
        background: { sm: "#F6F5FF", xs: "#08061B" },
      }}
    >
      <Box style={{ paddingBottom: "10px" }}>
        <Box
          sx={{
            backgroundColor: { xs: "#100D24", sm: "#F6F5FF" },
            padding: { xs: "10px", sm: "0px" },
            borderBottomRightRadius: { xs: "16px", sm: "0px" },
            borderBottomLeftRadius: { xs: "16px", sm: "0px" },
            display: "flex",
            alignItems: "center",
            marginTop: { sm: 0, xs: 8 },
          }}
        >
          <NavLink to={`/projects/${projectId}`}>
            <Box
              sx={{
                display: { xs: "block", sm: "none" },
                paddingRight: "20px",
                paddingTop: "4px",
              }}
            >
              {" "}
              <img src="/icons/left_vector.svg" alt="<" />
            </Box>
          </NavLink>
          <Typography
            sx={{
              color: { sm: "black", xs: "white" },
              fontSize: "24px",
              textAlign: { xs: "start", sm: "center" },
              fontWeight: 600,
              mb: { sm: 1 }
            }}
          >
            Create New Estimate
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          height: iphoneSe ? 440 : iphone14Pro ? 670 : "auto",
          overflow: "hidden",
          borderRadius: "12px",
          border: { sm: " 1px solid rgba(208, 213, 221, 1)", xs: "none" },
          background: { sm: "white", xs: "#08061B" },
        }}
      >
        <Box
          px={"25px"}
          py={"19px"}
          bgcolor={"white"}
          sx={{
            borderBottom: " 1px solid rgba(208, 213, 221, 1)",
            display: { sm: "block", xs: "none" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: { md: "#101828", xs: "white" },
                  paddingBottom: 0.5,
                  fontWeight: 700,
                }}
              >
                Select Layout
              </Typography>
              <Typography
                sx={{
                  color: { md: "#667085", xs: "white" },
                  font: "14px",
                  fontWeight: 600,
                }}
              >
                Your new project has been created. Invite colleagues to
                collaborate on this project.
              </Typography>
            </Box>
            <CustomInputField
              id="input-with-icon-textfield"
              placeholder="Search layout"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={icon} alt="search input" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment
                    position="start"
                    onClick={() => setSearch("")}
                    style={{ width: "21px", height: "21px" }}
                  >
                    {search !== "" && <Close sx={{ cursor: "pointer" }} />}
                  </InputAdornment>
                ),
              }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Box>
        </Box>
        <Box sx={{ p: 2, background: "#F6F5FF" }}>
          {false ? (
            <Box
              sx={{
                width: 40,
                m: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 300,
              }}
            >
              <CircularProgress sx={{ color: "#8477DA" }} />
            </Box>
          ) : (
            <Grid
              container
              gap={1}
              sx={{
                minHeight: "55vh",
                overflow: "auto",
                maxHeight: "55vh",
                width: "100%",
                m: "auto",
              }}
            >
              {filteredData.length > 0 ? (
                filteredData.map((layout) => {
                  const isSelected =
                    // layout.name === "Custom"
                    //   ? selectCustom
                    //   : 
                    selectedData?._id === layout._id;
                  const image = `${backendURL}/${layout?.image}`;
                  return (
                    <Box
                      key={layout._id}
                      sx={{
                        ...boxStyles,
                        backgroundColor: isSelected
                          ? "rgba(132, 119, 218, 0.1)"
                          : "white",
                        color: "black",
                        width: "255px",
                        height: "309px",
                        border: isSelected
                          ? "1px solid rgba(132, 119, 218, 1)"
                          : "1px solid rgba(208, 213, 221, 1)",
                        position: "relative",
                      }}
                      onClick={() => handleBoxClick(layout)}
                    >
                      {isSelected && (
                        <Box
                          sx={{
                            position: "absolute",
                            right: "10px",
                            top: "10px",
                          }}
                        >
                          <CheckCircle
                            sx={{
                              color: "rgba(132, 119, 218, 1)",
                              width: "21px",
                              height: "21px",
                            }}
                          />
                        </Box>
                      )}
                      <img
                        style={{
                          position: "relative",
                          zIndex: 1,
                          width: "200px",
                          height: "255px",
                        }}
                        src={image}
                        alt={layout.name}
                      />
                      <Typography sx={{ font: "16px", fontWeight: 600 }}>
                        {layout.name}
                      </Typography>
                    </Box>
                  );
                })
              ) : (
                <Typography
                  className="disabled-text"
                  sx={{
                    fontSize: "14px",
                    display: "flex",
                    height: "60vh",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  No Layout Found
                </Typography>
              )}
            </Grid>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: { sm: "flex-end", xs: "space-between" },
            position: { sm: "static", xs: "fixed" },
            gap: { sm: 2 },
            bottom: 0,
            left: 0,
            width: { sm: "auto", xs: "100%" },
            p: { sm: 0, xs: 2 },
            px: { sm: "25px" },
            py: { sm: "19px" },
            bgcolor: { sm: "white", xs: "#08061B" },
          }}
        >
          <NavLink to={`/projects/${projectId}`}>
            <Button
              sx={{
                width: { xs: 120, sm: 260 },
                color: "rgba(132, 119, 218, 1)",
                fontSize: 16,
                backgroundColor: "white",
                border: "1px solid rgba(132, 119, 218, 1)",
                lineHeight: "21.86px",
                ":hover": {
                  border: "1px solid rgba(132, 119, 218, 1)",
                  background: "white",
                },
              }}
              fullWidth
              variant="outlined"
            >
              Back
            </Button>
          </NavLink>
          <Button
            disabled={selectedData ? false : true}
            sx={{
              width: { xs: 120, sm: 260 },
              backgroundColor: "#8477DA",
              fontSize: 16,
              "&:hover": { backgroundColor: "#8477DA" },
              ":disabled": {
                bgcolor: "#c2c2c2",
              },
              mr: { sm: 0, xs: "30px" },
              color: "white",
              lineHeight: "21.86px",
            }}
            onClick={setStorePage}
            fullWidth
            variant="contained"
          >
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
