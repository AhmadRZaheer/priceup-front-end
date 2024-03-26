import { useMemo } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";
import { getContent } from "../../redux/estimateCalculations";
import { getSelectedContentErrorMsgs } from "../../utilities/estimatorHelper";
import { AddAlertOutlined, ErrorOutline } from "@mui/icons-material";

const style = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  gap: 0.5,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  //   width: 950,
  bgcolor: "#ffff",
  borderRadius: "4px",
  p: 3,
};

export default function HardwareMissingAlert({ open, handleClose }) {
  const selectedContent = useSelector(getContent);
  const hardwareDisable = useMemo(() => {
    const getErrors = getSelectedContentErrorMsgs(selectedContent);
    return getErrors;
  }, [selectedContent]);
  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{...style, maxWidth: "900px", width: {sm: "auto", xs: "80%"}}}>
          <Typography sx={{ fontWeight: "bold", fontSize: 22 }}> <ErrorOutline sx={{ fontSize: 22, mb: '-3px' }} /> Missing Hardware Alert</Typography>
          <Typography>Following are some errors in current selected hardware,
                        Please try changing your hardware...</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection:'column'
            }}
          >
            {/** Handle not available */}
            {hardwareDisable?.handle && <Box
                sx={{
                  display: "flex",
                  textAlign: "baseline",
                  gap: 0.6,
                }}
              >
                <Typography sx={{ fontWeight: "bold" }}>
                                Handle:
                            </Typography>
                <Typography>
                                {hardwareDisable?.handle?.message}
                            </Typography>
              </Box>}
            {/** Hinge not available */}
            {hardwareDisable?.hinge && <Box
                sx={{
                  display: "flex",
                  textAlign: "baseline",
                  gap: 0.6,
                }}
              >
                <Typography sx={{ fontWeight: "bold" }}>
                                Hinge:
                            </Typography>
                <Typography>
                                {hardwareDisable?.hinge?.message}
                            </Typography>
              </Box>}
            {/** Sliding Door System not available */}
            {hardwareDisable?.slidingDoorSystem && <Box
                sx={{
                  display: "flex",
                  textAlign: "baseline",
                  gap: 0.6,
                }}
              >
                <Typography sx={{ fontWeight: "bold" }}>
                  Sliding Door System:
                </Typography>
                <Typography>
                  {hardwareDisable?.slidingDoorSystem?.message}
                </Typography>
              </Box>}
            {/** Header not available */}
            {hardwareDisable?.header && <Box
                sx={{
                  display: "flex",
                  textAlign: "baseline",
                  gap: 0.6,
                }}
              >
                <Typography sx={{ fontWeight: "bold" }}>
                                Header:
                            </Typography>
                <Typography>
                                {hardwareDisable?.header?.message}
                            </Typography>
              </Box>}
            {/** Hardware addons not available */}
            {hardwareDisable?.hardwareAddons && <Box
                sx={{
                  display: "flex",
                  textAlign: "baseline",
                  gap: 0.6,
                }}
              >
                <Typography sx={{ fontWeight: "bold" }}>
                  Hardware Addons:
                </Typography>
                <Typography>
                  {hardwareDisable?.hardwareAddons?.message}
                </Typography>
              </Box>}
            {/** Glass type not available */}
            {hardwareDisable?.glassType && <Box
                sx={{
                  display: "flex",
                  textAlign: "baseline",
                  gap: 0.6,
                }}
              >
                <Typography sx={{ fontWeight: "bold" }}>
                                Glass Type:
                            </Typography>
                <Typography>
                                {hardwareDisable?.glassType?.message}
                            </Typography>
              </Box>}
            {/** Glass addons not available */}
            {hardwareDisable?.glassAddons && <Box
                sx={{
                  display: "flex",
                  textAlign: "baseline",
                  gap: 0.6,
                }}
              >
                <Typography sx={{ fontWeight: "bold" }}>
                  Glass Addons:
                </Typography>
                <Typography>
                                {hardwareDisable?.glassAddons?.message}
                            </Typography>
              </Box>}
            {/** Mounting Channel not available */}
            {hardwareDisable?.mountingChannel && selectedContent.mountingState === 'channel' && <Box
                  sx={{
                    display: "flex",
                    textAlign: "baseline",
                    gap: 0.6,
                  }}
                >
                  <Typography sx={{ fontWeight: "bold" }}>
                    Mounting Channel:
                  </Typography>
                  <Typography>
                    {hardwareDisable?.mountingChannel?.message}
                  </Typography>
                </Box>}
            {/** Mounting Wall Clamp not available */}
            {hardwareDisable?.wallClamp && selectedContent.mountingState === 'clamps' && <Box
                  sx={{
                    display: "flex",
                    textAlign: "baseline",
                    gap: 0.6,
                  }}
                >
                  <Typography sx={{ fontWeight: "bold" }}>
                    Mounting Wall Clamp:
                  </Typography>
                  <Typography>
                                {hardwareDisable?.wallClamp?.message}
                            </Typography>
                </Box>}
            {/** Mounting Sleeve Over not available */}
            {hardwareDisable?.sleeveOver && selectedContent.mountingState === 'clamps' && <Box
                  sx={{
                    display: "flex",
                    textAlign: "baseline",
                    gap: 0.6,
                  }}
                >
                  <Typography sx={{ fontWeight: "bold" }}>
                    Mounting Sleeve Over:
                  </Typography>
                  <Typography>
                    {hardwareDisable?.sleeveOver?.message}
                  </Typography>
                </Box>}
            {/** Mounting Glass to Glass not available */}
            {hardwareDisable?.glassToGlass && selectedContent.mountingState === 'clamps' && <Box
                  sx={{
                    display: "flex",
                    textAlign: "baseline",
                    gap: 0.6,
                  }}
                >
                  <Typography sx={{ fontWeight: "bold" }}>
                    Mounting Glass to Glass:
                  </Typography>
                  <Typography>
                    {hardwareDisable?.glassToGlass?.message}
                  </Typography>
                </Box>}
            {/** Corner Wall Clamp not available */}
            {hardwareDisable?.cornerWallClamp && <Box
                sx={{
                  display: "flex",
                  textAlign: "baseline",
                  gap: 0.6,
                }}
              >
                <Typography sx={{ fontWeight: "bold" }}>
                  Corner Wall Clamp:
                </Typography>
                <Typography>
                  {hardwareDisable?.cornerWallClamp?.message}
                </Typography>
              </Box>}
            {/** Corner Sleeve Over not available */}
            {hardwareDisable?.cornerSleeveOver && <Box
                sx={{
                  display: "flex",
                  textAlign: "baseline",
                  gap: 0.6,
                }}
              >
                <Typography sx={{ fontWeight: "bold" }}>
                  Corner Sleeve Over:
                </Typography>
                <Typography>
                  {hardwareDisable?.cornerSleeveOver?.message}
                </Typography>
              </Box>}
            {/** Corner Glass to Glass not available */}
            {hardwareDisable?.cornerGlassToGlass && <Box
                sx={{
                  display: "flex",
                  textAlign: "baseline",
                  gap: 0.6,
                }}
              >
                <Typography sx={{ fontWeight: "bold" }}>
                  Corner Glass to Glass:
                </Typography>
                <Typography>
                  {hardwareDisable?.cornerGlassToGlass?.message}
                </Typography>
              </Box>}
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 1,
              marginTop: 2,
              justifyContent: "end",
            }}
          >
            <Button

              sx={{
                boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
                color: "#344054",
                textTransform: "initial",
                border: "1px solid #D0D5DD",
              }}
              onClick={handleClose}
            >
              Close
            </Button>
            {/* <Button
              href="/login"
              onClick={logout}
              sx={{
                textTransform: "initial",
                backgroundColor: "#8477da",
                "&:hover": {
                  backgroundColor: "#8477da"
                }
              }}
              fullWidth
              variant="contained"
            >
              Logout
            </Button> */}
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
