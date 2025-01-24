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
import ShowerImg from "@/Assets/CustomerLandingImages/shower.png";
import MirrorImg from "@/Assets/CustomerLandingImages/mirror.png";
import WineCallerImg from "@/Assets/CustomerLandingImages/wineCaller.png";
import { EstimateCategory, statusTypes } from "@/utilities/constants";

const SingleAccordian = ({
  refetchData,
  index,
  expanded,
  handleChangeAccordian,
  data,
  reCalculateTotal,
  locationSettings,
  UpgradeOPtions,
  colorData,
  hardwareList,
  category,
}) => {
  const [totalPrice, setTotalPrice] = useState(data?.totalCost ?? 0);
  const secondaryColor = colorData?.secondary;
  const primaryColor = colorData?.primary;
  const backgroundColor = colorData?.default;
  const chipColor = data?.selectedItem?.status
    ? data?.selectedItem?.status === "pending"
      ? primaryColor
      : "#0FE90D"
    : primaryColor;
  const imageData =
    data?.category === EstimateCategory.SHOWERS
      ? ShowerImg
      : data?.category === EstimateCategory.WINECELLARS
      ? WineCallerImg
      : MirrorImg;
  const discountValue = data?.content?.discount?.value ?? 0;

  return (
    <Accordion
      key={index}
      expanded={expanded === `panel${category}${index + 1}`}
      onChange={handleChangeAccordian(`panel${category}${index + 1}`)}
      sx={{
        borderRadius: "10px !important",
        px: "4px",
        background: backgroundColor,
        color: secondaryColor,
        border: "1px solid #D6D6D6",
        boxShadow: "none",
        mt: index === 0 ? 0 : 2,
      }}
    >
      <AccordionSummary
        expandIcon={
          expanded === `panel${category}${index + 1}` ? (
            <Remove sx={{ color: secondaryColor }} />
          ) : (
            <Add sx={{ color: secondaryColor }} />
          )
        }
        aria-controls={`panel${category}${index + 1}-content`}
        id={`panel${category}${index + 1}-header`}
        sx={{ height: "71px" }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box sx={{ display: "flex", gap: "20px" }}>
            <img src={imageData} alt="not" style={{ height: "32px" }} />
            <Typography
              sx={{
                fontWeight: 700,
                textTransform: "capitalize",
                fontSize: "20px",
              }}
            >
              {data?.category} Estimate -{" "}
              {data?.selectedItem?.settings?.name ?? "Custom"}
              <Chip
                label={
                  data?.selectedItem?.status === statusTypes.CUSTOMER_APPROVED
                    ? "Approve"
                    : "Pending"
                }
                variant="outlined"
                sx={{ color: chipColor, borderColor: chipColor, ml: 2 }}
              />
            </Typography>
          </Box>
          <Typography sx={{ fontWeight: 700, pr: 1, fontSize: "20px" }}>
            Price :{" "}
            <Box
              component="span"
              sx={{
                color: discountValue > 0 ? "#BFBFBD" : primaryColor,
                textDecoration: discountValue > 0 ? "line-through" : "auto",
                fontSize: discountValue > 0 ? "17px" : "20px",
              }}
            >
              ${(data?.totalPrice ?? 0).toFixed(2)}
            </Box>{" "}
            {discountValue > 0 && (
              <Box component="span" sx={{ color: primaryColor }}>
                $ {(data?.content?.discount?.total ?? 0)?.toFixed(2)}
              </Box>
            )}
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ borderBottom: "1ps solid" }}>
        <Box>
          <Box>
            <Box>
              <ShowerSummary
                refetchData={refetchData}
                totalPrice={totalPrice}
                setTotalPrice={setTotalPrice}
                data={data}
                reCalculateTotal={reCalculateTotal}
                locationSettings={locationSettings}
                UpgradeOPtions={UpgradeOPtions}
                colorData={colorData}
                hardwaresList={hardwareList}
              />
            </Box>
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default SingleAccordian;
