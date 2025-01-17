import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import "./style.scss";
import GlassServeice from "../../Assets/CustomerLandingImages/Mantanance.jpeg";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import ManageHistoryOutlinedIcon from "@mui/icons-material/ManageHistoryOutlined";

const ManainanceSection = ({ data }) => {
  const primaryColor = data?.content?.colorSection?.primary;
  const secondaryColor = data?.content?.colorSection?.secondary;
  return (
    <Box
      sx={{
        backgroundImage: { md: `url(${GlassServeice})`, xs: "none" },
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        pt: { md: "100px", xs: 0 },
        pb: { md: "100px", xs: 2 },
        mt: 2,
        display: "flex",
        flexDirection: { md: "row", xs: "column" },
        position: "relative",
      }}
    >
      <Container maxWidth="lg" sx={{}}>
        <Box sx={{ width: "100%", display: "flex", gap: 3 }}>
          <Box sx={{ width: "50%" }}>
            <Box>
              <Typography className="maintainTxt" sx={{color:primaryColor,borderColor:primaryColor}}>Maintenance</Typography>
            </Box>
            <Typography className="maintainHead" sx={{ pt: 0.5,color:secondaryColor }}>
              Glass & shower maintenance
            </Typography>
          </Box>
          <Box sx={{ width: "50%", display: "flex", justifyContent: "end" }}>
            <Box sx={{ width: "75%" }}>
              <Typography className="maintainDesc" sx={{ color:secondaryColor }}>
                Please note, acid etched/frosted glass is extremely susceptible
                to fingerprints and spotting due to the oil on your hands and
                other environmental factors such as steam.
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            gap: 3,
            justifyContent: "center",
            pt: "45px",
          }}
        >
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
              <Box
                sx={{
                  borderRadius: "50%",
                  background:primaryColor,
                  height: "53px",
                  width: "54px",
                  padding: "14px",
                  alignSelf: "center",
                  textAlign: "center",
                }}
              >
                <AccessTimeOutlinedIcon
                  sx={{ fontSize: "50px", color:secondaryColor }}
                />
                {/* <img
                  src={TimerLogo}
                  alt="not"
                  style={{
                    borderRadius: "50%",
                    background:primaryColor,
                    height: "60px",
                    padding: "4px",
                  }}
                /> */}
              </Box>
              <Typography className="maintaainCardTitle" sx={{ px: 4 }}>
                {data?.content?.section7?.card1?.text1 ??
                  "WAIT BEFORE FIRST USE"}
              </Typography>
              <Typography className="maintaainCardDesc">
                {data?.content?.section7?.card1?.text2 ??
                  "If silicone was used on your project, give your silicone at least 24 hours to completely dry before first use"}
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
              <Box
                sx={{
                  borderRadius: "50%",
                  background:primaryColor,
                  height: "53px",
                  width: "54px",
                  padding: "14px",
                  alignSelf: "center",
                  textAlign: "center",
                }}
              >
                <ManageHistoryOutlinedIcon
                  sx={{
                    fontSize: "50px",
                    color:secondaryColor,
                  }}
                />
              </Box>
              <Typography className="maintaainCardTitle" sx={{ px: 4 }}>
                {data?.content?.section7?.card2?.text1 ?? "DAILY MAINTENANCE"}
              </Typography>
              <Typography className="maintaainCardDesc">
                {data?.content?.section7?.card2?.text2 ??
                  "Crack your door after use or keep a squeegee handy to dry the inside of the shower to help with mold/mildew buildup. If your bathroom has a vent fan, use it when showering to keep the area as dry as possible. Wipe away moisture from your mirrors to maximize the life of the silver backing"}
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
              <Box
                sx={{
                  borderRadius: "50%",
                  background:primaryColor,
                  height: "53px",
                  width: "54px",
                  padding: "14px",
                  alignSelf: "center",
                  textAlign: "center",
                }}
              >
               
                <EventAvailableOutlinedIcon
                  sx={{ fontSize: "50px", color:secondaryColor }}
                />
              </Box>
              <Typography className="maintaainCardTitle" sx={{ px: 4 }}>
                {data?.content?.section7?.card3?.text1 ?? "ROUTINE CLEANING"}
              </Typography>
              <Typography className="maintaainCardDesc">
                {data?.content?.section7?.card3?.text2 ??
                  "Never use aggressive cleaning materials (razorblades, steel wool, abrasives, etc.) to clean glass. Always use non-ammonia glass cleaner and/or alcohol to clean glass. Never use products containing hydrofluoric acid, fluorine, chlorine, or ammonia derivatives. They can damage the surface of the glass. Always clean the full surface of the glass. Spot cleaning might create halos. Never try to remove impurities with a dry or dirty cloth, as this may cause scratches or scuffs on the glass surface."}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ManainanceSection;
