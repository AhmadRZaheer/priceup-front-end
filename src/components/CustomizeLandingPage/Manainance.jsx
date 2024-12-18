import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import "./style.scss";
import GlassServeice from "../../Assets/CustomerLandingImages/Mantanance.jpeg";
import TimerLogo from "@/Assets/CustomerLandingImages/12.png";
import DailyLog from "@/Assets/CustomerLandingImages/13.png";
import Routine from "@/Assets/CustomerLandingImages/14.png";

const ManainanceSection = () => {
  return (
    <Box
      sx={{
        // width: { md: "89%", xs: "90%" },
        // m: "auto",
        backgroundImage: { md: `url(${GlassServeice})`, xs: "none" },
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        // px: { md: 12, xs: 0 },
        pt: { md: "100px", xs: 0 },
        pb: { md: "100px", xs: 2 },
        mt: 2,
        display: "flex",
        flexDirection: { md: "row", xs: "column" },
        //   gap: 10,
        position: "relative",
        // justifyContent: "space-around",
        // height: "80vh",
      }}
    >
      <Container maxWidth="lg" sx={{}}>
        <Box sx={{ width: "100%", display: "flex", gap: 3 }}>
          <Box sx={{ width: "50%" }}>
            <Box>
              <Typography className="maintainTxt">Maintenance</Typography>
            </Box>
            <Typography className="maintainHead" sx={{ pt: 0.5 }}>
              Glass & shower maintenance
            </Typography>
          </Box>
          <Box sx={{ width: "50%", display: "flex", justifyContent: "end" }}>
            <Box sx={{ width: "75%" }}>
              <Typography className="maintainDesc">
                Please note, acid etched/frosted glass is extremely susceptible
                to fingerprints and spotting due to the oil on your hands and
                other environmental factors such as steam.
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ width: "100%", display: "flex", gap: 3,justifyContent:'center',pt:'45px' }}>
          <Box sx={{ width: "30%", alignSelf: "center" }}>
            <Box
              sx={{
                background: "white",
                borderRadius: "30px",
                py: 4,
                px: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <Box sx={{ textAlign: "center" }}>
                <img
                  src={TimerLogo}
                  alt="not"
                  style={{
                    borderRadius: "50%",
                    background: "#F95500",
                    height: "60px",
                    padding: "4px",
                  }}
                />
              </Box>
              <Typography className="maintaainCardTitle" sx={{ px: 4 }}>
                WAIT BEFORE FIRST USE
              </Typography>
              <Typography className="maintaainCardDesc">
                If silicone was used on your project, give your silicone at
                least 24 hours to completely dry before first use
              </Typography>
            </Box>
          </Box>
          <Box sx={{ width: "30%", alignSelf: "center" }}>
            <Box
              sx={{
                background: "white",
                borderRadius: "30px",
                py: 4,
                px: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <Box sx={{ textAlign: "center" }}>
                <img
                  src={DailyLog}
                  alt="not"
                  style={{
                    borderRadius: "50%",
                    background: "#F95500",
                    height: "60px",
                    padding: "14px",
                  }}
                />
              </Box>
              <Typography className="maintaainCardTitle" sx={{ px: 4 }}>
                DAILY MAINTENANCE
              </Typography>
              <Typography className="maintaainCardDesc">
                Crack your door after use or keep a squeegee handy to dry the
                inside of the shower to help with mold/mildew buildup. If your
                bathroom has a vent fan, use it when showering to keep the area
                as dry as possible. Wipe away moisture from your mirrors to
                maximize the life of the silver backing
              </Typography>
            </Box>
          </Box>
          <Box sx={{ width: "30%", alignSelf: "center" }}>
            <Box
              sx={{
                background: "white",
                borderRadius: "30px",
                py: 4,
                px: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <Box sx={{ textAlign: "center" }}>
                <img
                  src={Routine}
                  alt="not"
                  style={{
                    borderRadius: "50%",
                    background: "#F95500",
                    height: "60px",
                    padding: "14px",
                  }}
                />
              </Box>
              <Typography className="maintaainCardTitle" sx={{ px: 4 }}>
              ROUTINE CLEANING
              </Typography>
              <Typography className="maintaainCardDesc">
                Never use aggressive cleaning materials (razorblades, steel
                wool, abrasives, etc.) to clean glass. Always use non-ammonia
                glass cleaner and/or alcohol to clean glass. Never use products
                containing hydrofluoric acid, fluorine, chlorine, or ammonia
                derivatives. They can damage the surface of the glass. Always
                clean the full surface of the glass. Spot cleaning might create
                halos. Never try to remove impurities with a dry or dirty cloth,
                as this may cause scratches or scuffs on the glass surface.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ManainanceSection;

{
  /* <Box
        sx={{ width: "min(100%, 1400px)", position: "relative", p: 4 }}
        className="block-div"
      >
        <img src={GlassServeice} alt="Not" className="service-image" />
        <Box sx={{ gap: 2, zIndex: 3 }} className="block-div">
          <Box
            sx={{
              background: "rgba(255,255,255,.7)",
              backdropFilter: "blur(10px)",
              p: 5,
              gap: 1,
              display: "flex",
              flexDirection: "column",
            }}
            className="width-md"
          >
            <Typography sx={{ fontSize: "32px" }} className="font-bold">
              Glass & shower maintenance
            </Typography>
            <Typography sx={{ pr: 2 }}>
              Please note, acid etched/frosted glass is extremely susceptible to
              fingerprints and spotting due to the oil on your hands and other
              environmental factors such as steam.
            </Typography>
          </Box>
          <Box className="width-lg" sx={{ pl: 5 }}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                gap: 3,
              }}
            >
              <Box
                sx={{
                  width: "25%",
                  background: "rgba(237,237,237,1)",
                  p: "20px",
                }}
              >
                <img
                  src={TimerLogo}
                  alt="not"
                  style={{ height: "45px", width: "45px" }}
                />
                <Typography
                  variant="h3"
                  sx={{ fontSize: "20px", py: 1 }}
                  className="font-bold"
                >
                  WAIT BEFORE FIRST USE
                </Typography>
                <Typography sx={{ pb: 2 }}>
                  If silicone was used on your project, give your silicone at
                  least 24 hours to completely dry before first use.
                </Typography>
              </Box>
              <Box
                sx={{
                  width: "25%",
                  background: "rgba(237,237,237,1)",
                  p: "20px",
                }}
              >
                <img
                  src={DailyLog}
                  alt="not"
                  style={{ height: "45px", width: "45px" }}
                />
                <Typography
                  variant="h3"
                  sx={{ fontSize: "20px", py: 1 }}
                  className="font-bold"
                >
                  DAILY MAINTENANCE
                </Typography>
                <Typography sx={{ pb: 2 }}>
                  Crack your door after use or keep a squeegee handy to dry the
                  inside of the shower to help with mold/mildew buildup.
                </Typography>
              </Box>
              <Box
                sx={{
                  width: "25%",
                  background: "rgba(237,237,237,1)",
                  p: "20px",
                }}
              >
                <img
                  src={Routine}
                  alt="not"
                  style={{ height: "45px", width: "45px" }}
                />
                <Typography
                  variant="h3"
                  sx={{ fontSize: "20px", py: 1 }}
                  className="font-bold"
                >
                  ROUTINE CLEANING
                </Typography>
                <Typography sx={{ pb: 2 }}>
                  Never use aggressive cleaning materials (razorblades, steel
                  wool, abrasives, etc.) to clean glass.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box> */
}
