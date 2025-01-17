import { Add, Remove } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ShowerSummary from "./summary/summary";
import ShowerImg from "@/Assets/CustomerLandingImages/shower.png";
import MirrorImg from "@/Assets/CustomerLandingImages/mirror.png";
import WineCallerImg from "@/Assets/CustomerLandingImages/wineCaller.png";
import { backendURL, calculateDiscount } from "@/utilities/common";
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
  // showersLocationSettings,
  // mirrorsLocationSettings,
  // wineCellarLocationSettings,
  hardwareList,
  // showerHardwaresList,
  // mirrorHardwaresList,
  // wineCellarHardwaresList,
  category,
}) => {
  const [totalPrice, setTotalPrice] = useState(data?.totalCost ?? 0);
  const secondaryColor = colorData?.secondary;
  const primaryColor = colorData?.primary;
  const backgroundColor = colorData?.default;
  console.log(data, "sdfgqwfgqwfwqvd", totalPrice);
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

  // useEffect(() => {
  //   const discountPrice = calculateDiscount(
  //     data?.pricing?.totalPrice,
  //     data?.config?.config?.discount.value,
  //     data?.config?.config?.discount.unit
  //   );
  //   setTotalPrice(discountPrice);
  // }, [data]);

  const discountValue = data?.content?.discount?.value ?? 0;

  return (
    <Accordion
      key={index}
      expanded={expanded === `panel${category}${index + 1}`}
      onChange={handleChangeAccordian(`panel${category}${index + 1}`)}
      sx={{
        borderRadius: "10px !important",
        // py: "3px",
        px: "4px",
        background: backgroundColor,
        color: secondaryColor,
        border: "1px solid #D6D6D6",
        boxShadow: "none",
        mt: 2,
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
              <Box component="span" sx={{ color:primaryColor }}>
                $ {(data?.content?.discount?.total ?? 0)?.toFixed(2)}
                {/* {calculateDiscount(
                  totalPrice,
                  discountValue,
                  data?.content?.discount?.unit
                ).toFixed(2)} */}
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
                // locationSettings={
                //   data?.category === EstimateCategory.SHOWERS
                //     ? showersLocationSettings
                //     : data?.category === EstimateCategory.MIRRORS
                //     ? mirrorsLocationSettings
                //     : wineCellarLocationSettings
                // }
                hardwaresList={hardwareList}
                // hardwaresList={
                //   data?.category === EstimateCategory.SHOWERS
                //     ? showerHardwaresList
                //     : data?.category === EstimateCategory.MIRRORS
                //     ? {
                //         ...mirrorHardwaresList,
                //         glassType: mirrorHardwaresList?.glassTypes ?? [],
                //       }
                //     : wineCellarHardwaresList
                // }
              />
            </Box>
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default SingleAccordian;
