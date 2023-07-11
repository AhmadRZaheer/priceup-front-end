import { Box, Button, TextField, Typography } from "@mui/material";
import door from "../../Assets/estimates/layout1.svg";

import MenuList from "./MenuList";
import { menuOptions } from "../../data/data";
import {
  AddCircleOutline,
  ChevronLeftOutlined,
  RemoveCircleOutline,
} from "@mui/icons-material";
import { useFetchDataEstimate } from "../../utilities/ApiHooks/Estimate";
import { useState } from "react";

const LayoutReview = ({ setHandleEstimatesPages }) => {
  const { data: estimatesData, refetch: estimatesRefetch } =
    useFetchDataEstimate();
  // const estimatesData = [];
  const [selectedContent, setSelectedContent] = useState({
    hardwareFinishes: null,
    handles: {
      item: null,
      count: 0
    },
    hinges: {
      item: null,
      count: 0
    },
    mounting: {
      clamps: {
        wallClamp: {
          item: null,
          count: 0
        },
        sleeveOver: {
          item: null,
          count: 0
        },
        glassToGlass: {
          item: null,
          count: 0
        },
      },
      channel: {
        item: null,
        count: 0
      }
    },
    header: {
      item: null,
      count: 0
    },
    slidingDoorSystem: {
      item: null,
      count: 0
    },
    glassType: {
      item: null,
      thickness: "1/2"
    },
    glassTreatment: null,
    oneInchHoles: '',
    hingeCut: '',
    clampCut: '',
    notch: '',
    outages: '',
    mitre: '',
    polish: '',
    people: 0,
    hours: 0,
    addOns: []
  })
  console.log(estimatesData, "estimatesData", selectedContent, 'selected items');
  return (
    <>
      <Box
        sx={{
          width: { md: "70%", sm: "100%", sx: "100%" },
          margin: { md: "auto", xs: 0 },

          display: "flex",
          alignItems: { md: "center", xs: "start" },
          //   background: "blue",
          // marginTop: { md: 15, sx: 0 },
          flexDirection: "column",
          p: { md: 2, sx: 0 },
          gap: { md: 4, xs: 0 },
        }}
      >
        <Box
          sx={{
            display: { md: "none", xs: "flex" },
            zIndex: 1,
            justifyContent: { md: "center", xs: "start" },
            background: "#18133b",
            width: "100%",
            color: "white",
            paddingY: 1.2,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            marginTop: 7.6,
          }}
        >
          <Box sx={{ display: { md: "none", xs: "block" } }}>
            <ChevronLeftOutlined
              onClick={() => {
                setHandleEstimatesPages("measurements");
              }}
              sx={{ fontSize: 34, paddingTop: 0.4 }}
            />
          </Box>
          <Typography textAlign={"center"} variant="h4">
            Create New Quote
          </Typography>
        </Box>
        <Typography
          sx={{ display: { md: "block", xs: "none" } }}
          textAlign={"center"}
          variant="h4"
        >
          Create New Qoute
        </Typography>
        <Box
          sx={{
            width: { md: "94%", sm: "100%", xs: "100%" },
            margin: "auto",
            borderRadius: { md: "12px", xs: 0 },
            boxShadow:
              "0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)",
            border: { md: "1px solid #EAECF0", xs: "none" },
            paddingX: { md: 2, xs: 0 },
            paddingY: 4,
            rowGap: 4,
            background: { md: "white", xs: "#100D24" },
            display: "flex",
            flexDirection: "column",
            paddingTop: { md: 0, xs: 6 },
            marginTop: { md: 0, xs: -3 },
            marginBottom: 4.6,
          }}
        >
          <Box sx={{ width: { md: "100%", xs: "90%" }, margin: "auto" }}>
            <Typography
              sx={{
                fontSize: { md: "18px", xs: "18px" },
                color: { md: "black", xs: "white" },
                paddingBottom: 1,
              }}
            >
              Review
            </Typography>
            <Typography
              sx={{ color: { md: "#667085", xs: "white" }, font: "14px" }}
            >
              Your new project has been created. Invite colleagues to
              collaborate on this project.
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              width: { md: "96.5%", xs: "94%" },
              paddingY: { md: 4, xs: 0 },
              paddingX: { md: 2, xs: 0 },
              background: { md: "rgba(217, 217, 217, 0.3)", xs: "#100D24" },
              gap: 4,
              borderRadius: "8px",
              justifyContent: "space-between",
              flexDirection: { md: "row", xs: "column" },
              margin: { md: 0, xs: "auto" },
            }}
          >
            {/* LeftSide */}

            <Box
              sx={{
                display: "flex",
                width: { md: "40.5%", xs: "100%" },
                flexDirection: "column",

                // background: "red",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",

                  gap: 1,
                }}
              >
                {/* <MenuList /> */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    // gap: 4,
                    justifyContent: "space-between",
                    borderBottom: {
                      md: "2px solid #D0D5DD",
                      xs: "2px solid #423f57",
                    },
                    color: { md: "black", xs: "white" },
                  }}
                >
                  <Box sx={{ width: "100%" }}>
                    <MenuList
                      menuOptions={estimatesData?.hardwareFinishes}
                      title={"Hardware Finishes"}
                      type={"hardwareFinishes"}
                      setSelectedContent={setSelectedContent}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    // gap: 4,
                    justifyContent: "space-between",
                    borderBottom: {
                      md: "2px solid #D0D5DD",
                      xs: "2px solid #423f57",
                    },
                  }}
                >
                  <Box sx={{ width: "100%" }}>
                    <MenuList
                      menuOptions={estimatesData?.handles}
                      title={"Handles"}
                      type={"handles"}
                      setSelectedContent={setSelectedContent}
                      count={selectedContent.handles.count}
                    />
                  </Box>

                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    // gap: 4,
                    justifyContent: "space-between",
                    borderBottom: {
                      md: "2px solid #D0D5DD",
                      xs: "2px solid #423f57",
                    },
                  }}
                >
                  <Box sx={{ width: "100%" }}>
                    <MenuList
                      menuOptions={estimatesData?.hinges}
                      title={"Hinges"}
                      type={"hinges"}
                      setSelectedContent={setSelectedContent}
                      count={selectedContent.hinges.count}
                    />
                  </Box>

                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    // gap: 4,
                    justifyContent: "space-between",
                    borderBottom: {
                      md: "2px solid #D0D5DD",
                      xs: "2px solid #423f57",
                    },
                  }}
                >
                  {/* mouting channel */}
                  <Box sx={{ width: "100%", display: "flex" }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <MenuList
                        menuOptions={estimatesData?.wallClamp}
                        title={"Wall Clamps"}
                        type={"wallClamp"}
                        setSelectedContent={setSelectedContent}
                        count={selectedContent.mounting.clamps.wallClamp.count}

                      />
                      <MenuList
                        menuOptions={estimatesData?.sleeveOver}
                        title={"Sleeve Over"}
                        type={"sleeveOver"}
                        setSelectedContent={setSelectedContent}
                        count={selectedContent.mounting.clamps.sleeveOver.count}
                      />
                      <MenuList
                        menuOptions={estimatesData?.glassToGlass}
                        title={"Glass to Glass"}
                        type={"glassToGlass"}
                        setSelectedContent={setSelectedContent}
                        count={selectedContent.mounting.clamps.glassToGlass.count}

                      />
                    </Box>
                    <MenuList
                      menuOptions={estimatesData?.mountingChannel}
                      title={"Channel"}
                      type={"channel"}
                      setSelectedContent={setSelectedContent}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    // gap: 4,
                    justifyContent: "space-between",
                    borderBottom: {
                      md: "2px solid #D0D5DD",
                      xs: "2px solid #423f57",
                    },
                  }}
                >
                  <Box sx={{ width: "100%" }}>
                    <MenuList
                      menuOptions={estimatesData?.glassType}
                      title={" Glass type"}
                      type={"glassType"}
                      setSelectedContent={setSelectedContent}
                      thickness={selectedContent.glassType.thickness}
                    />
                  </Box>

                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    // gap: 4,
                    justifyContent: "space-between",
                    borderBottom: {
                      md: "2px solid #D0D5DD",
                      xs: "2px solid #423f57",
                    },
                  }}
                >
                  <Box sx={{ width: "100%" }}>
                    <MenuList
                      menuOptions={estimatesData?.slidingDoorSystem}
                      title={"Sliding Door System"}
                      type={"slidingDoorSystem"}
                      setSelectedContent={setSelectedContent}
                      count={selectedContent.slidingDoorSystem.count}

                    />
                  </Box>

                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    // gap: 4,
                    justifyContent: "space-between",
                    borderBottom: {
                      md: "2px solid #D0D5DD",
                      xs: "2px solid #423f57",
                    },
                  }}
                >
                  <Box sx={{ width: "100%" }}>
                    <MenuList
                      menuOptions={estimatesData?.header}
                      title={"Header"}
                      type={"header"}
                      setSelectedContent={setSelectedContent}
                      count={selectedContent.header.count}

                    />
                  </Box>

                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    // gap: 4,
                    justifyContent: "space-between",
                    borderBottom: {
                      md: "2px solid #D0D5DD",
                      xs: "2px solid #423f57",
                    },
                  }}
                >
                  <Box sx={{ width: "100%" }}>
                    <MenuList
                      menuOptions={estimatesData?.glassTreatment}
                      title={"Glass treatment"}
                      type={"glassTreatment"}
                      setSelectedContent={setSelectedContent}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    // gap: 4,
                    justifyContent: "space-between",
                    borderBottom: {
                      md: "2px solid #D0D5DD",
                      xs: "2px solid #423f57",
                    },
                  }}
                >
                  <Box sx={{ width: "100%" }}>
                    <MenuList
                      menuOptions={estimatesData?.addOns}
                      title={"Add ons:"}
                    />
                  </Box>

                </Box>
                {/* holes onword */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    // gap: 4,
                    justifyContent: "space-between",
                    borderBottom: {
                      md: "2px solid #D0D5DD",
                      xs: "2px solid #423f57",
                    },
                    paddingLeft: 3,
                    paddingBottom: 1,
                    color: { md: "#000000  ", xs: "white" },
                  }}
                >
                  <Typography>1" Holes</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      width: "120px",
                      padddingY: 4,
                    }}
                  >
                    <TextField
                      sx={{
                        border: { md: "none", xs: "2px solid #423f57" },
                        borderRadius: { md: 0, xs: 2 },
                        color: { md: "black", xs: "white" },
                        background: 'white'
                      }}
                      variant="outlined"
                      size="small"
                      value={selectedContent.oneInchHoles}
                      onChange={(event) => setSelectedContent((prevState) => ({ ...prevState, oneInchHoles: event.target.value }))}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    // gap: 4,
                    justifyContent: "space-between",
                    borderBottom: {
                      md: "2px solid #D0D5DD",
                      xs: "2px solid #423f57",
                    },
                    paddingLeft: 3,
                    paddingBottom: 1,
                    color: { md: "#000000  ", xs: "white" },
                  }}
                >
                  <Typography>Hinges Cut</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      width: "120px",
                      padddingY: 4,
                    }}
                  >
                    <TextField
                      sx={{
                        border: { md: "none", xs: "2px solid #423f57" },
                        borderRadius: { md: 0, xs: 2 },
                        color: { md: "black", xs: "white" },
                        background: 'white'
                      }}
                      variant="outlined"
                      size="small"
                      value={selectedContent.hingeCut}
                      onChange={(event) => setSelectedContent((prevState) => ({ ...prevState, hingeCut: event.target.value }))}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    // gap: 4,
                    justifyContent: "space-between",
                    borderBottom: {
                      md: "2px solid #D0D5DD",
                      xs: "2px solid #423f57",
                    },
                    paddingLeft: 3,
                    paddingBottom: 1,
                    color: { md: "#000000  ", xs: "white" },
                  }}
                >
                  <Typography>ClampCut</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      width: "120px",
                      padddingY: 4,
                    }}
                  >
                    <TextField
                      sx={{
                        border: { md: "none", xs: "2px solid #423f57" },
                        borderRadius: { md: 0, xs: 2 },
                        color: { md: "black", xs: "white" },
                        background: 'white'
                      }}
                      variant="outlined"
                      size="small"
                      value={selectedContent.clampCut}
                      onChange={(event) => setSelectedContent((prevState) => ({ ...prevState, clampCut: event.target.value }))}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    // gap: 4,
                    justifyContent: "space-between",
                    borderBottom: {
                      md: "2px solid #D0D5DD",
                      xs: "2px solid #423f57",
                    },
                    paddingLeft: 3,
                    paddingBottom: 1,
                    color: { md: "#000000  ", xs: "white" },
                  }}
                >
                  <Typography>Notch</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      width: "120px",
                      padddingY: 4,
                    }}
                  >
                    <TextField
                      sx={{
                        border: { md: "none", xs: "2px solid #423f57" },
                        borderRadius: { md: 0, xs: 2 },
                        color: { md: "black", xs: "white" },
                        background: 'white'
                      }}
                      variant="outlined"
                      size="small"
                      value={selectedContent.notch}
                      onChange={(event) => setSelectedContent((prevState) => ({ ...prevState, notch: event.target.value }))}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    // gap: 4,
                    justifyContent: "space-between",
                    borderBottom: {
                      md: "2px solid #D0D5DD",
                      xs: "2px solid #423f57",
                    },
                    paddingLeft: 3,
                    paddingBottom: 1,
                    color: { md: "#000000  ", xs: "white" },
                  }}
                >
                  <Typography>Outages</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      width: "120px",
                      padddingY: 4,
                    }}
                  >
                    <TextField
                      sx={{
                        border: { md: "none", xs: "2px solid #423f57" },
                        borderRadius: { md: 0, xs: 2 },
                        color: { md: "black", xs: "white" },
                        background: 'white'
                      }}
                      variant="outlined"
                      size="small"
                      value={selectedContent.outages}
                      onChange={(event) => setSelectedContent((prevState) => ({ ...prevState, outages: event.target.value }))}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    // gap: 4,
                    justifyContent: "space-between",
                    borderBottom: {
                      md: "2px solid #D0D5DD",
                      xs: "2px solid #423f57",
                    },
                    paddingLeft: 3,
                    paddingBottom: 1,
                    color: { md: "#000000  ", xs: "white" },
                  }}
                >
                  <Typography>Mitre</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      width: "120px",
                      padddingY: 4,
                    }}
                  >
                    <TextField
                      sx={{
                        border: { md: "none", xs: "2px solid #423f57" },
                        borderRadius: { md: 0, xs: 2 },
                        color: { md: "black", xs: "white" },
                        background: 'white'
                      }}
                      variant="outlined"
                      size="small"
                      value={selectedContent.mitre}
                      onChange={(event) => setSelectedContent((prevState) => ({ ...prevState, mitre: event.target.value }))}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    // gap: 4,
                    justifyContent: "space-between",
                    borderBottom: {
                      md: "2px solid #D0D5DD",
                      xs: "2px solid #423f57",
                    },
                    paddingLeft: 3,
                    paddingBottom: 1,
                    color: { md: "#000000  ", xs: "white" },
                  }}
                >
                  <Typography>Polish</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      width: "120px",
                      padddingY: 4,
                    }}
                  >
                    <TextField
                      sx={{
                        border: { md: "none", xs: "2px solid #423f57" },
                        borderRadius: { md: 0, xs: 2 },
                        color: { md: "black", xs: "white" },
                        background: 'white'
                      }}
                      variant="outlined"
                      size="small"
                      value={selectedContent.polish}
                      onChange={(event) => setSelectedContent((prevState) => ({ ...prevState, polish: event.target.value }))}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    // gap: 4,
                    justifyContent: "space-between",
                    borderBottom: {
                      md: "2px solid #D0D5DD",
                      xs: "2px solid #423f57",
                    },
                    paddingLeft: 3,
                    paddingBottom: 1,
                    color: { md: "#000000  ", xs: "white" },
                  }}
                >
                  <Typography>People:</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      width: "120px",
                      padddingY: 4,
                    }}
                  >
                    <TextField
                      type="number"
                      sx={{
                        border: { md: "none", xs: "2px solid #423f57" },
                        borderRadius: { md: 0, xs: 2 },
                        color: { md: "black", xs: "white" },
                        background: 'white'
                      }}
                      variant="outlined"
                      size="small"
                      value={selectedContent.people}
                      onChange={(event) => setSelectedContent((prevState) => ({ ...prevState, people: event.target.value }))}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    // gap: 4,
                    justifyContent: "space-between",
                    borderBottom: {
                      md: "2px solid #D0D5DD",
                      xs: "2px solid #423f57",
                    },
                    paddingLeft: 3,
                    paddingBottom: 1,
                    color: { md: "#000000  ", xs: "white" },
                  }}
                >
                  <Typography>Hours:</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      width: "120px",
                      padddingY: 4,
                    }}
                  >
                    <TextField
                      type="number"
                      sx={{
                        border: { md: "none", xs: "2px solid #423f57" },
                        borderRadius: { md: 0, xs: 2 },
                        color: { md: "black", xs: "white" },
                        background: 'white'
                      }}
                      variant="outlined"
                      size="small"
                      value={selectedContent.hours}
                      onChange={(event) => setSelectedContent((prevState) => ({ ...prevState, hours: event.target.value }))}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
            {/* rightSide */}
            {/* <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: {md:"45.5%", xs: "100%"},
                background: {md:"#ffff", xs: "#100d24"},
                p: {md: 3, xs: 0},
                borderRadius: "8px",
                color: {md: "black", xs: "white"}
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  width: "89%",
                  justifyContent: "center",
                  background: "#D9D9D9",
                  borderRadius: "8px",
                  p: 3,
                  // height: "250px",
                }}
              >
                <img
                  // width={"350px"}
                  // height={"250px"}
                  src={door}
                  alt="Selected"
                />
              </Box>
              <Box
                sx={{
                  width: "89%",

                  borderRadius: "8px",
                  p: 3,
                  // height: "250px",
                }}
              >
                <Typography>12’’/ 12’’/ 12’’ </Typography>
                <Typography variant="h6">Summary </Typography>
                <Typography> Finish: Polished Chrome</Typography>
                <Typography>Handles: 8 by 8 D-Pull </Typography>
                <Typography>Hinges: STD Bevel </Typography>
                <Typography> Channel </Typography>
                <Typography>Glass Type:Clear (3/8)</Typography>
                <Typography> Bars</Typography>
                <Typography>Transom </Typography>
                <Typography>Header </Typography>
                <Typography>Glass Treatment </Typography>
                <Typography variant="h6">Add ons </Typography>
                <Typography> People: 2</Typography>
                <Typography> Hours: 2 </Typography>
                <Typography> </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    // gap: 4,
                    justifyContent: "space-between",
                    borderTop: "2px solid #D0D5DD",
                    marginTop: 1,
                    paddingY: 1,
                  }}
                >
                  <Typography>Price</Typography>
                  <Typography variant="h6">$895</Typography>
                </Box>{" "}
              </Box>
            </Box> */}
          </Box>
        </Box>
        <Box
          sx={{
            display: { md: "none", xs: "flex" },
            gap: 2,
            justifyContent: "center",
            width: "93%",
            paddingX: 2,
            paddingY: 2,
            position: "fixed",
            bottom: 0,
            backgroundColor: "#100d24",
            borderTop: "1px solid #423f57",
          }}
        >
          <Box sx={{ width: { md: "150px", xs: "50%" } }}>
            <Button
              fullWidth
              onClick={() => setHandleEstimatesPages("measurements")}
              sx={{
                boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
                color: "#344054",
                textTransform: "initial",
                border: "1px solid #D0D5DD",
                backgroundColor: { md: "transparent", xs: "white" },
              }}
            >
              {" "}
              Back
            </Button>
          </Box>

          <Box sx={{ width: { md: "150px", xs: "50%" } }}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => setHandleEstimatesPages("summary")}
            >
              {" "}
              Next
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default LayoutReview;
