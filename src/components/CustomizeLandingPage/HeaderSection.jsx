import { Box, Button, Container, Typography } from "@mui/material";
import React, { useState } from "react";
import LogoNavBar from "../../Assets/purplelogo.svg";
import GCSLogo from "@/Assets/GCS-logo.png";
import "./style.scss";
import { backendURL } from "@/utilities/common";

const HeaderSection = ({selectedData}) => {
  return (
    <>
      <Box
        sx={{
          bgcolor: "#000000",
          width: "100%",
          display: "flex",
        }}
      >
        <Box
          className="gcs-logo"
          component="a"
          href="https://gcsglassandmirror.com/"
        >
          <img src={selectedData?.content?.section1?.logo? `${backendURL}/${selectedData?.content?.section1?.logo}` : GCSLogo} alt="logo nav bar" style={{ height: "100px" }} />
        </Box>
        <Container
          maxWidth="xl"
          sx={{ display: "flex", justifyContent: "end" }}
        >
          <Box
            component="a"
            href="http://priceup.glass/"
            sx={{ mt: "11px", mb: 1 }}
          >
            <img src={LogoNavBar} alt="logo nav bar" />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default HeaderSection;
