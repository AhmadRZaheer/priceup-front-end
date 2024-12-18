import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import LimitationImg from "../../Assets/CustomerLandingImages/LimitationImg.svg";
import { ArrowDownward } from "@mui/icons-material";
import { ExpandMore, Add, Remove } from "@mui/icons-material";
import "./style.scss";

const accordionData = [
  {
    title: "Products Not Purchased Through GCS Glass & Mirror",
    desc: "GCS does not cover glass or hardware breakage, surface scratches, or scuffs after installation or removal from the building.",
  },
  {
    title: "Damage After Installation",
    desc: "GCS does not cover glass or hardware breakage, surface scratches, or scuffs after installation or removal from the building.",
  },
  {
    title: "Tile Cracks During Installation",
    desc: "GCS does not cover glass or hardware breakage, surface scratches, or scuffs after installation or removal from the building.",
  },
  {
    title: "Frameless Shower Limitations",
    desc: "GCS does not cover glass or hardware breakage, surface scratches, or scuffs after installation or removal from the building.",
  },
  {
    title: "Natural Wear and Tear",
    desc: "GCS does not cover glass or hardware breakage, surface scratches, or scuffs after installation or removal from the building.",
  },
  {
    title: "Third-Party Coatings",
    desc: "GCS does not cover glass or hardware breakage, surface scratches, or scuffs after installation or removal from the building.",
  },
];

const LimitationsSection = () => {
  const [expanded, setExpanded] = useState("panel1");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <Container maxWidth="lg" sx={{ pt: 8, pb: 2 }}>
      <Typography
        sx={{
          fontFamily: '"Poppins" !important',
          fontSize: "48.5px",
          fontWeight: "600",
          lineHeight: "60.53px",
          color: "#000000",
          textAlign: "center",
        }}
      >
        Exclusions & Limitations
      </Typography>
      <Typography
        sx={{
          fontFamily: '"Poppins" !important',
          fontSize: "24px",
          lineHeight: "24px",
          fontWeight: 400,
          color: "rgba(0, 0, 0, 0.65)",
          pt: 2,
          pb: 4,
          textAlign: "center",
        }}
      >
        While we strive for perfection, certain conditions are not covered under
        this warranty:
      </Typography>
      <Box
        sx={{ display: "flex", FlexDirection: "column", width: "100%", gap: 4 }}
      >
        <Box sx={{ width: "50%" }}>
          {accordionData.map((data, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Accordion
                expanded={expanded === `panel${index + 1}`}
                onChange={handleChange(`panel${index + 1}`)}
                sx={{
                  borderRadius: "10px !important",
                  border: "1px solid #D6D6D6",
                  boxShadow: "none",
                  py: "10px",
                  px: "8px",
                }}
              >
                <AccordionSummary
                  expandIcon={
                    expanded === `panel${index + 1}` ? (
                      <Remove sx={{ color: "#0D0D0D" }} />
                    ) : (
                      <Add sx={{ color: "#0D0D0D" }} />
                    )
                  }
                  aria-controls={`panel${index + 1}-content`}
                  id={`panel${index + 1}-header`}
                >
                  <Typography className="limitionAccorHead" sx={{}}>
                    {data.title}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className="limitionAccorDesc">
                    {data.desc}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Box>
          ))}
        </Box>
        <Box sx={{ width: "50%", alignContent: "center" }}>
          <img
            src={LimitationImg}
            alt="not"
            style={{ height: "500px", width: "500px" }}
          />
        </Box>
      </Box>
      <Typography
        sx={{
          fontFamily: '"Poppins" !important',
          fontSize: "18px",
          lineHeight: "24px",
          fontStyle: "italic",
          pt: 0.5,
        }}
      >
        For a complete list of limitations, refer to our{" "}
        <a href="/" style={{ color: "#000000" }}>
          {" "}
          warranty document.
        </a>
      </Typography>
    </Container>
  );
};

export default LimitationsSection;
