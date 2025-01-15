import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import WarrantySectionImg from "../../Assets/CustomerLandingImages/WrrantyImg.svg";
import Warranty2 from "../../Assets/CustomerLandingImages/CustomerLanding03.jpg";
import Warranty3 from "../../Assets/CustomerLandingImages/CustomerLanding02.jpg";
import "./style.scss";

const WarrantySection = ({ data }) => {
  return (
    <Container maxWidth="lg" sx={{ pt: 7 }}>
      <Box
        sx={{
          background: "#F95500",
          borderRadius: "9px",
          pl: 5,
          pr: 1.5,
          pt: 4,
          pb: 7,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <Typography className="warrantyHead">
              {data?.content?.section4?.heading ??
                "Lifetime Craftsmanship Warranty – Our Promise to You"}
            </Typography>
            <Typography className="warrantySubHead" sx={{ pt: 3 }}>
              {data?.content?.section4?.subheading ??
                "At GCS Glass & Mirror, we stand by our commitment to superior craftsmanship, customized design, and unparalleled customer satisfaction."}
            </Typography>
          </Grid>
          <Grid item xs={3} sx={{ display: "flex", justifyContent: "end" }}>
            <img src={WarrantySectionImg} alt="not" />
          </Grid>
        </Grid>
        <Box sx={{ width: "84%" }}>
          <Typography className="wrantyText" sx={{ pb: 4, pt: 5 }}>
            What Our Warranty Covers
          </Typography>
          <Typography className="warrantySubHead">
            At GCS Glass & Mirror, we are dedicated to ensuring your peace of
            mind. That’s why we offer a Limited Lifetime Craftsmanship Warranty.
            This warranty guarantees:
          </Typography>
          <Box sx={{ pt: 1.6 }}>
            <ul
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <li className="warrantySubHead">
                Protection against defects in materials and workmanship under
                normal use for as long as you own the product.
              </li>
              <li className="warrantySubHead">
                A promise to repair or replace defective products free of charge
                if your claim is valid.
              </li>
              <li className="warrantySubHead">
                Assurance that we stand behind our superior products and
                services.
              </li>
            </ul>
          </Box>
          <Typography
            sx={{
              fontFamily: '"Poppins" !important',
              fontSize: "24px",
              lineHeight: "24px",
              fontWeight: 700,
              color: "white",
              pt: 2,
            }}
          >
            Note: This warranty is non-transferable unless otherwise specified.
          </Typography>
        </Box>
      </Box>
    </Container>
    //   <Container
    //   maxWidth="xl"
    //   sx={{
    //     pb: 4,
    //     minHeight: "60vh",
    //     mt: 25,
    //     display: "flex",
    //     justifyContent: "center",
    //   }}
    // >
    //   <Box className="block-div wranty-section">
    //     <Box
    //       sx={{
    //         my: "80px",
    //         background: "rgba(255,255,255,.7)",
    //         backdropFilter: "blur(10px)",
    //         py: 5,
    //         px: 7.5,
    //         zIndex: 5,
    //       }}
    //       className="width-md block-div"
    //     >
    //       <Typography
    //         sx={{
    //           fontSize: "2.2rem",
    //           mb: "10px",
    //           mt: "5px",
    //           fontWeight: 600,
    //           lineHeight: 1.1,
    //           pr: 3.1,
    //         }}
    //         variant="h2"
    //       >
    //         Limited Lifetime Craftsmanship Warranty
    //       </Typography>
    //       <Typography component="p" sx={{ mb: 2, pr: 2 }}>
    //         GCS Glass warrants our products against defects in materials and
    //         workmanship under normal use for as long as it is owned by the
    //         original purchasing business or consumer. If a claim is deemed
    //         valid, the decision whether to repair or replace is determined by
    //         GCS Glass.
    //       </Typography>
    //     </Box>
    //     <Box className="wranty-image-box block-div">
    //       <Grid container spacing={6} sx={{ height: "100%" }}>
    //         <Grid item xs={4} className="warranty-image block-div">
    //           <img
    //             src={Warranty1}
    //             alt="not"
    //             className="single-wranty-image"
    //           />
    //         </Grid>
    //         <Grid
    //           item
    //           xs={4}
    //           className="warranty-image block-div"
    //           sx={{ transform: "translateY(-100px)" }}
    //         >
    //           <img
    //             src={Warranty2}
    //             alt="not"
    //             className="single-wranty-image"
    //           />
    //         </Grid>
    //         <Grid
    //           item
    //           xs={4}
    //           className="warranty-image block-div"
    //           sx={{ transform: "translateY(50px)" }}
    //         >
    //           <img
    //             src={Warranty3}
    //             alt="not"
    //             className="single-wranty-image"
    //           />
    //         </Grid>
    //       </Grid>
    //     </Box>
    //   </Box>
    // </Container>
  );
};

export default WarrantySection;
