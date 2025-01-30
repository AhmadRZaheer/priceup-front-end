import './style.scss';

import React, {
  useMemo,
  useState,
} from 'react';

import { backendURL } from '@/utilities/common';
import {
  Add,
  Remove,
} from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Typography,
} from '@mui/material';

import LimitationImg
  from '../../Assets/CustomerLandingImages/LimitationImg.svg';

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

const LimitationsSection = ({ data }) => {
  const [expanded, setExpanded] = useState("panel1");

  const FAQSData = useMemo(() => {
    const Faqs = data?.content?.section5?.faqs ?? accordionData;
    return Faqs;
  }, [data]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container maxWidth="lg" sx={{ pt: {sm:8,xs:3}, pb: 2 }}>
      <Typography
        sx={{
          fontFamily: '"Poppins" !important',
          fontSize: {sm:"48.5px",xs:'24px'},
          fontWeight: 600,
          lineHeight: {sm:"60.53px",xs:'30px'},
          color: "#000000",
          textAlign: "center",
        }}
      >
        Exclusions & Limitations
      </Typography>
      <Typography
        sx={{
          fontFamily: '"Poppins" !important',
          fontSize: {sm:"24px",xs:'16px'},
          lineHeight: {sm:"24px",xs:'16px'},
          fontWeight: 400,
          color: "rgba(0, 0, 0, 0.65)",
          pt: 2,
          pb: {sm:4,xs:1.5},
          textAlign: "center",
        }}
      >
        While we strive for perfection, certain conditions are not covered under
        this warranty:
      </Typography>
      <Box
        sx={{ display: "flex", width: "100%", gap: 4,flexWrap : {sm:'nowrap',xs:'wrap'} }}
      >
        <Box sx={{ width: {sm:"50%",xs:'100%'}, }}>
          {FAQSData?.map((data, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Accordion
                expanded={expanded === `panel${index + 1}`}
                onChange={handleChange(`panel${index + 1}`)}
                sx={{
                  borderRadius: "10px !important",
                  border: "1px solid #D6D6D6",
                  boxShadow: "none",
                  py: {sm: "10px",xs:'0px'},
                  px: {sm: "8px",xs:'0px'},
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
        <Box sx={{ width: {sm:"50%",xs:'100%'}, alignContent: "center" }}>
          <img
            src={
              data?.content?.section5?.image
                ? `${backendURL}/${data?.content?.section5?.image}`
                : LimitationImg
            }
            alt="not"
            className='faqsLogo'
          />
        </Box>
      </Box>
      <Typography
        sx={{
          fontFamily: '"Poppins" !important',
          fontSize: {sm:"18px",xs:'14px'},
          lineHeight: {sm:"24px",xs:'16px'},
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
