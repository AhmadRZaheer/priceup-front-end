import './style.scss';

import React from 'react';

import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import EventAvailableOutlinedIcon
  from '@mui/icons-material/EventAvailableOutlined';
import ManageHistoryOutlinedIcon
  from '@mui/icons-material/ManageHistoryOutlined';
import {
  Box,
  Container,
  Typography,
} from '@mui/material';

import GlassServeice from '../../Assets/CustomerLandingImages/Mantanance.jpeg';

const ManainanceSection = ({ data }) => {
  const primaryColor = data?.content?.colorSection?.primary;
  const secondaryColor = data?.content?.colorSection?.secondary;
  return (
    <Box
      sx={{
        backgroundImage: `url(${GlassServeice})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        pt: { md: "100px", xs: 2 },
        pb: { md: "100px", xs: 2 },
        mt: 2,
        display: "flex",
        flexDirection: { md: "row", xs: "column" },
        position: "relative",
      }}
    >
      <Container maxWidth="lg" sx={{}}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            gap: { sm: 3, xs: 1.5 },
            flexWrap: { sm: "nowrap", xs: "wrap" },
          }}
        >
          <Box sx={{ width: { sm: "50%", xs: "100%" } }}>
            <Box>
              <Typography
                className="maintainTxt"
                sx={{ color: primaryColor, borderColor: primaryColor }}
              >
                Maintenance
              </Typography>
            </Box>
            <Typography
              className="maintainHead"
              sx={{ pt: 0.5, color: secondaryColor }}
            >
              {data?.content?.section7?.heading ?? "Glass & shower maintenance"}
            </Typography>
          </Box>
          <Box
            sx={{
              width: { sm: "50%", xs: "100%" },
              display: "flex",
              justifyContent: "end",
            }}
          >
            <Box sx={{ width: { sm: "75%", xs: "99%" } }}>
              <Typography
                className="maintainDesc"
                sx={{ color: secondaryColor }}
              >
                {data?.content?.section7?.description ??
                  "Please note, acid etched/frosted glass is extremely susceptible  to fingerprints and spotting due to the oil on your hands and other environmental factors such as steam."}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            gap: { sm: 3, xs: 1 },
            justifyContent: "center",
            pt: "45px",
            flexWrap: { sm: "nowrap", xs: "wrap" },
          }}
        >
          <Box sx={{ width: { sm: "30%", xs: "98%" }, alignSelf: "center" }}>
            <Box
              sx={{
                background: "white",
                borderRadius: { sm: "30px", xs: 3 },
                py:  {sm:4,xs:2},
                px:  "20px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <Box
                sx={{
                  borderRadius: "50%",
                  background: primaryColor,
                  height:  "53px",
                  width:  "54px",
                  padding: { sm: "14px", xs: 1 },
                  alignSelf: "center",
                  textAlign: "center",
                }}
              >
                <AccessTimeOutlinedIcon
                  sx={{
                    fontSize: "50px",
                    color: secondaryColor,
                  }}
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
              <Typography
                className="maintaainCardTitle"
                sx={{ px: { sm: 4, xs: 1 } }}
              >
                {data?.content?.section7?.card1?.text1 ??
                  "WAIT BEFORE FIRST USE"}
              </Typography>
              <Typography className="maintaainCardDesc">
                {data?.content?.section7?.card1?.text2 ??
                  "If silicone was used on your project, give your silicone at least 24 hours to completely dry before first use"}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ width: { sm: "30%", xs: "98%" }, alignSelf: "center" }}>
            <Box
              sx={{
                background: "white",
                borderRadius: { sm: "30px", xs: 3 },
                py:  {sm:4,xs:2},
                px:  "20px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <Box
                sx={{
                  borderRadius: "50%",
                  background: primaryColor,
                  height:  "53px",
                  width:  "54px",
                  padding: { sm: "14px", xs: 1 },
                  alignSelf: "center",
                  textAlign: "center",
                }}
              >
                <ManageHistoryOutlinedIcon
                  sx={{
                    fontSize: "50px",
                    color: secondaryColor,
                  }}
                />
              </Box>
              <Typography
                className="maintaainCardTitle"
                sx={{ px: { sm: 4, xs: 1 } }}
              >
                {data?.content?.section7?.card2?.text1 ?? "DAILY MAINTENANCE"}
              </Typography>
              <Typography className="maintaainCardDesc">
                {data?.content?.section7?.card2?.text2 ??
                  "Crack your door after use or keep a squeegee handy to dry the inside of the shower to help with mold/mildew buildup. If your bathroom has a vent fan, use it when showering to keep the area as dry as possible. Wipe away moisture from your mirrors to maximize the life of the silver backing"}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ width: { sm: "30%", xs: "98%" }, alignSelf: "center" }}>
            <Box
              sx={{
                background: "white",
                borderRadius: { sm: "30px", xs: 3 },
                py:  {sm:4,xs:2},
                px:  "20px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <Box
                sx={{
                  borderRadius: "50%",
                  background: primaryColor,
                  height:  "53px",
                  width:  "54px",
                  padding: { sm: "14px", xs: 1 },
                  alignSelf: "center",
                  textAlign: "center",
                }}
              >
                <EventAvailableOutlinedIcon
                  sx={{
                    fontSize:  "50px",
                    color: secondaryColor,
                  }}
                />
              </Box>
              <Typography
                className="maintaainCardTitle"
                sx={{ px: { sm: 4, xs: 1 } }}
              >
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
