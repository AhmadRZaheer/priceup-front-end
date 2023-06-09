import { Box, TextField, Typography } from "@mui/material";
import door from "../../Assets/estimates/layout1.svg";

import MenuList from "./MenuList";
import { menuOptions } from "../../data/data";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";

const LayoutReview = () => {
  return (
    <>
      <Box
        sx={{
          width: "70%",
          margin: "auto",

          display: "flex",
          alignItems: "center",
          //   background: "blue",
          // marginTop: 4,
          flexDirection: "column",
          p: 2,
          gap: 4,
        }}
      >
        <Typography textAlign={"center"} variant="h4">
          Create New Qoute
        </Typography>
        <Box
          sx={{
            width: "94%",
            margin: "auto",
            borderRadius: "12px",
            boxShadow:
              "0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)",
            border: "1px solid #EAECF0",
            paddingX: 2,
            paddingY: 4,
            rowGap: 4,
            // background: "green",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box>
            <Typography sx={{ font: "18px" }}>Review</Typography>
            <Typography sx={{ color: "#667085", font: "14px" }}>
              Your new project has been created. Invite colleagues to
              collaborate on this project.
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "96.5%",
              paddingY: 4,
              paddingX: 2,
              background: "rgba(217, 217, 217, 0.3)",
              gap: 4,
              borderRadius: "8px",
              justifyContent: "space-between",
            }}
          >
            {/* LeftSide */}

            <Box
              sx={{
                display: "flex",
                width: "40.5%",
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
                    borderBottom: "2px solid #D0D5DD",
                  }}
                >
                  <MenuList
                    menuOptions={menuOptions}
                    title={" Hardware Finishes"}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    // gap: 4,
                    justifyContent: "space-between",
                    borderBottom: "2px solid #D0D5DD",
                  }}
                >
                  <MenuList menuOptions={menuOptions} title={"Handles"} />
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <AddCircleOutline sx={{ color: "#98A2B3" }} />
                    <Typography> 1</Typography>
                    <RemoveCircleOutline sx={{ color: "#98A2B3" }} />
                  </Box>
                </Box>{" "}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    // gap: 4,
                    justifyContent: "space-between",
                    borderBottom: "2px solid #D0D5DD",
                  }}
                >
                  <MenuList menuOptions={menuOptions} title={" Hinges"} />
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <AddCircleOutline sx={{ color: "#98A2B3" }} />
                    <Typography> 1</Typography>
                    <RemoveCircleOutline sx={{ color: "#98A2B3" }} />
                  </Box>
                </Box>{" "}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    // gap: 4,
                    justifyContent: "space-between",
                    borderBottom: "2px solid #D0D5DD",
                  }}
                >
                  <MenuList menuOptions={menuOptions} title={"Mounting"} />
                </Box>{" "}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    // gap: 4,
                    justifyContent: "space-between",
                    borderBottom: "2px solid #D0D5DD",
                  }}
                >
                  <MenuList menuOptions={menuOptions} title={" Glass type"} />
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <AddCircleOutline sx={{ color: "#98A2B3" }} />
                    <Typography> 1</Typography>
                    <RemoveCircleOutline sx={{ color: "#98A2B3" }} />
                  </Box>
                </Box>{" "}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    // gap: 4,
                    justifyContent: "space-between",
                    borderBottom: "2px solid #D0D5DD",
                  }}
                >
                  <MenuList menuOptions={menuOptions} title={"Bars"} />
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <AddCircleOutline sx={{ color: "#98A2B3" }} />
                    <Typography> 1</Typography>
                    <RemoveCircleOutline sx={{ color: "#98A2B3" }} />
                  </Box>
                </Box>{" "}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    // gap: 4,
                    justifyContent: "space-between",
                    borderBottom: "2px solid #D0D5DD",
                  }}
                >
                  <MenuList menuOptions={menuOptions} title={"Header"} />
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <AddCircleOutline sx={{ color: "#98A2B3" }} />
                    <Typography> 1</Typography>
                    <RemoveCircleOutline sx={{ color: "#98A2B3" }} />
                  </Box>
                </Box>{" "}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    // gap: 4,
                    justifyContent: "space-between",
                    borderBottom: "2px solid #D0D5DD",
                  }}
                >
                  <MenuList
                    menuOptions={menuOptions}
                    title={"Glass treatment"}
                  />
                </Box>{" "}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    // gap: 4,
                    justifyContent: "space-between",
                    borderBottom: "2px solid #D0D5DD",
                  }}
                >
                  <MenuList menuOptions={menuOptions} title={"Add ons:"} />
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <AddCircleOutline sx={{ color: "#98A2B3" }} />
                    <Typography> 1</Typography>
                    <RemoveCircleOutline sx={{ color: "#98A2B3" }} />
                  </Box>
                </Box>{" "}
                {/* holes onword */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    // gap: 4,
                    justifyContent: "space-between",
                    borderBottom: "2px solid #D0D5DD",
                    paddingLeft: 3,
                    paddingBottom: 1,
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
                    <TextField variant="outlined" size="small" />
                  </Box>
                </Box>{" "}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    // gap: 4,
                    justifyContent: "space-between",
                    borderBottom: "2px solid #D0D5DD",
                    paddingLeft: 3,
                    paddingBottom: 1,
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
                    <TextField variant="outlined" size="small" />
                  </Box>
                </Box>{" "}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    // gap: 4,
                    justifyContent: "space-between",
                    borderBottom: "2px solid #D0D5DD",
                    paddingLeft: 3,
                    paddingBottom: 1,
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
                    <TextField variant="outlined" size="small" />
                  </Box>
                </Box>{" "}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    // gap: 4,
                    justifyContent: "space-between",
                    borderBottom: "2px solid #D0D5DD",
                    paddingLeft: 3,
                    paddingBottom: 1,
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
                    <TextField variant="outlined" size="small" />
                  </Box>
                </Box>{" "}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    // gap: 4,
                    justifyContent: "space-between",
                    borderBottom: "2px solid #D0D5DD",
                    paddingLeft: 3,
                    paddingBottom: 1,
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
                    <TextField variant="outlined" size="small" />
                  </Box>
                </Box>{" "}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    // gap: 4,
                    justifyContent: "space-between",
                    borderBottom: "2px solid #D0D5DD",
                    paddingLeft: 3,
                    paddingBottom: 1,
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
                    <TextField variant="outlined" size="small" />
                  </Box>
                </Box>{" "}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    // gap: 4,
                    justifyContent: "space-between",
                    borderBottom: "2px solid #D0D5DD",
                    paddingLeft: 3,
                    paddingBottom: 1,
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
                    <TextField variant="outlined" size="small" />
                  </Box>
                </Box>{" "}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    // gap: 4,
                    justifyContent: "space-between",
                    borderBottom: "2px solid #D0D5DD",
                    paddingLeft: 3,
                    paddingBottom: 1,
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
                    <TextField variant="outlined" size="small" />
                  </Box>
                </Box>{" "}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    // gap: 4,
                    justifyContent: "space-between",
                    borderBottom: "2px solid #D0D5DD",
                    paddingLeft: 3,
                    paddingBottom: 1,
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
                    <TextField variant="outlined" size="small" />
                  </Box>
                </Box>{" "}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    // gap: 4,
                    justifyContent: "space-between",
                    borderBottom: "2px solid #D0D5DD",
                    paddingLeft: 3,
                    paddingBottom: 1,
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
                    <TextField variant="outlined" size="small" />
                  </Box>
                </Box>{" "}
              </Box>
            </Box>
            {/* rightSide */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "45.5%",
                background: "#ffff",
                p: 3,
                borderRadius: "8px",
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
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default LayoutReview;
