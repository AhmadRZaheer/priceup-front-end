import { Box, Container, Typography } from "@mui/material";
import React from "react";
import "./style.scss";
import GlassServeice from "../../Assets/CustomerLandingImages/CustomerLanding01.jpg";
import Diamond from "../../Assets/CustomerLandingImages/Diamond-Icon.png";
import EyeIcon from "../../Assets/CustomerLandingImages/Eye-Icon.png";
import PersonHeart from "../../Assets/CustomerLandingImages/Person-with-Heart-Icon.png";
import StopWatch from "../../Assets/CustomerLandingImages/Stopwatch-Icon.png";

const ServiceSection = () => {
  return (
    <Container maxWidth="xl" sx={{ pt: 6, position: "relative",  }}>
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
            <Typography sx={{ fontSize: "18px" }} className="font-bold">
              Homeowners Nationwide Choose GCS
            </Typography>
            <Typography sx={{ fontSize: "32px" }} className="font-bold">
              The Highest Quality Residential Glass Services
            </Typography>
            <Typography sx={{ pr: 2 }}>
              Founded in 2013 in Phoenix Arizona, GCS has had a tremendous
              amount of success due to our “can do it” attitude along with our
              innovative approach to every aspect of the business.
            </Typography>
          </Box>
          <Box className="width-lg" sx={{ pl: 5 }}>
            <Box sx={{width:'100%',display:'flex',justifyContent:'space-between',gap:3}}>
                <Box sx={{width:'25%', background: "rgba(237,237,237,1)", p: "20px" }}>
                  <img src={Diamond} alt="not" style={{height:'40px',width:'40px'}}/>
                  <Typography
                    variant="h3"
                    sx={{ fontSize: "20px", pb: 1 }}
                    className="font-bold"
                  >
                    Lasting Impressions
                  </Typography>
                  <Typography sx={{ pb: 2 }}>
                    Replacing just the glass in your shower will give your
                    bathroom a million-dollar look.
                  </Typography>
                </Box>
                <Box sx={{width:'25%', background: "rgba(237,237,237,1)", p: "20px" }}>
                <img src={PersonHeart} alt="not" style={{height:'40px',width:'40px'}}/>
                  <Typography
                    variant="h3"
                    sx={{ fontSize: "20px", pb: 1 }}
                    className="font-bold"
                  >
                    Customer Care
                  </Typography>
                  <Typography sx={{ pb: 2 }}>
                    When you work with us, it’s an experience you will love from
                    the initial contact to the final install.
                  </Typography>
                </Box>
                <Box sx={{width:'25%', background: "rgba(237,237,237,1)", p: "20px" }}>
                <img src={EyeIcon} alt="not" style={{height:'40px',width:'40px'}}/>
                  <Typography
                    variant="h3"
                    sx={{ fontSize: "20px", pb: 1 }}
                    className="font-bold"
                  >
                    High Clarity
                  </Typography>
                  <Typography sx={{ pb: 2 }}>
                    Don’t forget to ask about our starphire ultra-clear glass.
                    It will change your life.
                  </Typography>
                </Box>
                <Box sx={{width:'25%', background: "rgba(237,237,237,1)", p: "20px" }}>
                <img src={StopWatch} alt="not" style={{height:'40px',width:'40px'}}/>
                  <Typography
                    variant="h3"
                    sx={{ fontSize: "20px", pb: 1 }}
                    className="font-bold"
                  >
                    Fast Response
                  </Typography>
                  <Typography sx={{ pb: 2 }}>
                    Schedule today and let us help you design and install your
                    next project.
                  </Typography>
                </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ServiceSection;
