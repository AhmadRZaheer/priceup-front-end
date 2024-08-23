import { quoteState } from "@/utilities/constants";
import { useSelector } from "react-redux";
import { SimpleLayoutDimensions } from "./Dimensions/simpleLayoutDimensions";
import { CustomLayoutDimensions } from "./Dimensions/customLayoutDimensions";
import {
  getProjectId,
  getQuoteState,
  selectedItem,
} from "@/redux/estimateCalculations";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { NavLink } from "react-router-dom";
import { ShowerReview } from "./review";
// import Summary from "./summary_dep";
import { useState } from "react";
import Summary from "./summary";

export const ShowerDimensions = () => {
  const activeQuoteState = useSelector(getQuoteState);
  const item = useSelector(selectedItem);
  const projectId = useSelector(getProjectId);
  // const currentQuoteState = useSelector(getQuoteState);
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [step, setStep] = useState(0); // 0 for dimension, 1 for review, 2 for summary
  console.log(step, "step");
  return (
    <Box>
      <Box
        sx={{
          // background: "white",
          background: { sm: "#F6F5FF", xs: "#08061B" },
          padding: 2,
          height: { sm: "auto", xs: "95vh" },
          overflow: { sm: "", xs: "auto" },
        }}
      >
        <Box style={{ paddingBottom: "10px" }}>
          <Box
            sx={{
              backgroundColor: { xs: "#100D24", sm: "#F6F5FF" },
              padding: { xs: "10px", sm: "0px" },
              borderBottomRightRadius: { xs: "16px", sm: "0px" },
              borderBottomLeftRadius: { xs: "16px", sm: "0px" },
              display: "flex",
              alignItems: "center",
              marginTop: { sm: 0, xs: 5 },
            }}
          >
            <NavLink
              to={
                activeQuoteState === quoteState.EDIT
                  ? projectId
                    ? `/projects/${projectId}`
                    : "/estimates"
                  : "/estimates/layouts"
              }
            >
              <Box
                sx={{
                  display: { xs: "block", sm: "none" },
                  paddingRight: "20px",
                  paddingTop: "4px",
                }}
              >
                {" "}
                <img src="/icons/left_vector.svg" alt="<" />
              </Box>
            </NavLink>

            <Box
              sx={{
                color: { sm: "black", xs: "white" },
                fontSize: { xs: "24px", sm: "2.124rem" },
                textAlign: { xs: "start", sm: "center" },
                fontWeight: 500,
                pl: 3.5,
              }}
            >
              <NavLink
                to={
                  activeQuoteState === quoteState.EDIT
                    ? projectId
                      ? `/projects/${projectId}`
                      : "/estimates"
                    : "/estimates/layouts"
                }
                style={{
                  textDecoration: "none",
                  color: "rgba(93, 97, 100, 1)",
                }}
              >
                <span style={{ cursor: "pointer" }}>Projects </span>
              </NavLink>
              <span>
                {activeQuoteState === quoteState.EDIT
                  ? "/ Edit Estimate"
                  : "/ Create New Estimate"}
              </span>
            </Box>
          </Box>
        </Box>
        {!isMobile ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 2,
              paddingY: 3,
              // alignItems: "start",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                // flexWrap: "wrap",
                // flexGrow: 1,
                width: { lg: "60%", md: "50%" },
                gap: 2
              }}
            >
              {activeQuoteState === quoteState.CREATE ||
              (activeQuoteState === quoteState.EDIT &&
                item?.config?.layout_id) ? (
                <SimpleLayoutDimensions />
              ) : activeQuoteState === quoteState.CUSTOM ||
                (activeQuoteState === quoteState.EDIT &&
                  !item?.config?.layout_id) ? (
                <CustomLayoutDimensions />
              ) : null}
              <Summary />
            </Box>
            <Box
              sx={{
                // flexGrow: 1,
                width: { lg: "40%", md: "50%" },
              }}
            >
              <ShowerReview />
            </Box>
          </Box>
        ) : (
          <>
            {step === 0 &&
              (activeQuoteState === quoteState.CREATE ||
                (activeQuoteState === quoteState.EDIT &&
                  item?.config?.layout_id)) && (
                <SimpleLayoutDimensions setStep={setStep} />
              )}
            {step === 0 &&
              (activeQuoteState === quoteState.CUSTOM ||
                (activeQuoteState === quoteState.EDIT &&
                  !item?.config?.layout_id)) && (
                <CustomLayoutDimensions setStep={setStep} />
              )}
            {step === 1 && <ShowerReview setStep={setStep} />}
            {step === 2 && <Summary setStep={setStep} />}
          </>
        )}
      </Box>
    </Box>
  );
};
