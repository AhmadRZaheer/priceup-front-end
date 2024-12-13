import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import "./style.scss";
import GlassServeice from "../../Assets/CustomerLandingImages/CustomerLanding01.jpg";
// import Diamond from "../../Assets/CustomerLandingImages/Diamond-Icon.png";
// import EyeIcon from "../../Assets/CustomerLandingImages/Eye-Icon.png";
// import PersonHeart from "../../Assets/CustomerLandingImages/Person-with-Heart-Icon.png";
// import StopWatch from "../../Assets/CustomerLandingImages/Stopwatch-Icon.png";
import TimerLogo from "@/Assets/timer-removebg-preview.png";
import DailyLog from "@/Assets/MAINTENANCE_Image-removebg-preview.png";
import Routine from "@/Assets/sop-image-removebg-preview.png";

const ManainanceSection = () => {
  return (
    <Container maxWidth="xl" sx={{ pt: 6, position: "relative" }}>
      <Box
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
            {/* <Typography sx={{ fontSize: "18px" }} className="font-bold">
              Homeowners Nationwide Choose GCS
            </Typography> */}
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
              {/* <Box
                sx={{
                  width: "25%",
                  background: "rgba(237,237,237,1)",
                  p: "20px",
                }}
              >
                <img
                  src={StopWatch}
                  alt="not"
                  style={{ height: "45px", width: "45px" }}
                />
                <Typography
                  variant="h3"
                  sx={{ fontSize: "20px", py: 1 }}
                  className="font-bold"
                >
                  Fast Response
                </Typography>
                <Typography sx={{ pb: 2 }}>
                  Schedule today and let us help you design and install your
                  next project.
                </Typography>
              </Box> */}
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ManainanceSection;
