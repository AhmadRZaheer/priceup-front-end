import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import HeaderSection from "./HeaderSection";
import LogoNavBar from "../../../Assets/purplelogo.svg";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import FooterSection from "./FooterSection";

const headerData = [
  { title: "Home", url: "/custom-landing-invoice" },
  { title: "Terms & Condition", url: "/terms" },
];

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return children
    ? React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
      })
    : null;
}

ElevationScroll.propTypes = {
  children: PropTypes.element,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const CreateLandingInvoice = ({ islanding }) => {
  const pathname = useLocation();
  const handleButton = (data) => {
    // route.push(data.url);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll>
        <AppBar
          sx={{
            backgroundColor: "#f5f9f9",
            color: "#021323",
          }}
          {...(islanding ? {} : { position: "static" })}
        >
          <Container maxWidth="xl">
            <Toolbar sx={{ display: "block", alignContent: "center" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", gap: 5 }}>
                  <img src={LogoNavBar} alt="logo nav bar" />
                  <Box sx={{ alignContent: "center" }}>
                    {headerData.map((data, index) => (
                      <Button
                        key={index}
                        onClick={() => handleButton(data)}
                        variant="text"
                        size="small"
                        sx={{
                          minWidth: "42px !important",
                          height: "40px !important",
                          px: "12px",
                          color: data.url === pathname ? "#012332" : "#012332",
                          backgroundColor:
                            data.url === pathname
                              ? "rgba(79, 53, 223, 0.1)"
                              : "",
                          borderRadius: "8px",
                          mr: "8px",
                          fontFamily: "Product Sans, sans-serif !important",
                          fontSize: "16px !important",
                          lineHeight: "24px !important",
                          fontWeight:
                            data.url === pathname
                              ? "700 !important"
                              : "600 !important",
                          ":hover": {
                            color: "#012332",
                            backgroundColor: "rgba(79, 53, 223, 0.2)",
                          },
                        }}
                      >
                        {data.title}
                      </Button>
                    ))}
                  </Box>
                </Box>
                <Link to="/login">
                  <Button
                    // size="medium"
                    sx={{
                      bgcolor: "#8477DA",
                      color: "white",
                      textTransform: "capitalize",
                      ":hover": {
                        bgcolor: "#8477DA",
                      },
                    }}
                  >
                    Login
                  </Button>
                </Link>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
      <HeaderSection />
      <Container maxWidth="xl">
        <Box sx={{ my: 2 }}>
          {[...new Array(122)]
            .map(
              () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
            )
            .join("\n")}
        </Box>
      </Container>
      <FooterSection />
    </React.Fragment>
  );
};

export default CreateLandingInvoice;
