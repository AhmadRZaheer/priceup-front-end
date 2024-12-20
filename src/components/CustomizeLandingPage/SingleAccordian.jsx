import { Add, Remove } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ShowerSummary from "./summary/summary";
import { EstimateCategory } from "@/utilities/constants";

const SingleAccordian = ({
    refetchData,
  index,
  expanded,
  handleChangeAccordian,
  data,
  reCalculateTotal,
  showersLocationSettings,
  mirrorsLocationSettings,
  wineCellarLocationSettings,
  showerHardwaresList,
  mirrorHardwaresList,
  wineCellarHardwaresList,
  category,
}) => {
  const [totalPrice, setTotalPrice] = useState(data?.pricing?.totalPrice);
  const chipColor = data?.status ? data?.status === "pending" ? "#F95500" : "#0FE90D" :'#F95500';

  return (
    <Accordion
      key={index}
      expanded={expanded === `panel${category}${index + 1}`}
      onChange={handleChangeAccordian(`panel${category}${index + 1}`)}
      sx={{
        borderRadius: "10px !important",
        py: "3px",
        px: "4px",
        background: "#000000",
        color: "white",
        border: "1px solid #D6D6D6",
        boxShadow: "none",
        mt: 2,
      }}
    >
      <AccordionSummary
        expandIcon={
          expanded === `panel${category}${index + 1}` ? (
            <Remove sx={{ color: "white" }} />
          ) : (
            <Add sx={{ color: "white" }} />
          )
        }
        aria-controls={`panel${category}${index + 1}-content`}
        id={`panel${category}${index + 1}-header`}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              textTransform: "capitalize",
            }}
          >
            {data?.category} Estimate -{" "}
            {data?.layout === "Mirror" ? "Custom" : data?.layout}
            <Chip
              label={data?.status ? data?.status : "Pending"}
              variant="outlined"
              sx={{ color: chipColor, borderColor: chipColor, ml: 2 }}
            />
          </Typography>

          <Typography sx={{ fontWeight: 700, pr: 1 }}>
            Price :{" "}
            <Box component="span" sx={{ color: "#F95500" }}>
              ${totalPrice.toFixed(2)}
            </Box>
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ borderBottom: "1ps solid " }}>
        <Box>
          <Box>
            <Box>
              <ShowerSummary
              refetchData={refetchData}
                totalPrice={totalPrice}
                setTotalPrice={setTotalPrice}
                data={data}
                reCalculateTotal={reCalculateTotal}
                locationSettings={
                  data?.category === EstimateCategory.SHOWERS
                    ? showersLocationSettings
                    : data?.category === EstimateCategory.MIRRORS
                    ? mirrorsLocationSettings
                    : wineCellarLocationSettings
                }
                hardwaresList={
                  data?.category === EstimateCategory.SHOWERS
                    ? showerHardwaresList
                    : data?.category === EstimateCategory.MIRRORS
                    ? {
                        ...mirrorHardwaresList,
                        glassType: mirrorHardwaresList?.glassTypes ?? [],
                      }
                    : wineCellarHardwaresList
                }
              />
            </Box>
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default SingleAccordian;
