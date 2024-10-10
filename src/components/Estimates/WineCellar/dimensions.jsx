import { quoteState } from "@/utilities/constants";
import { useDispatch, useSelector } from "react-redux";
// import { CustomLayoutDimensions } from "./Dimensions/customLayoutDimensions";
import { Box, useMediaQuery } from "@mui/material";
import { NavLink, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  // getWineProjectId,
  // getWineQuoteState,
  selectedItem,
} from "@/redux/wineCellarEstimateSlice";
import Summary from "./summary";
import Review from "./review";
import {
  getEstimateState,
  getProjectId,
  getSkeltonState,
  setSkeltonState,
} from "@/redux/estimateSlice";
import { SimpleLayoutDimensions } from "./Dimensions/simpleLayoutDimensions";
import {
  useFetchAllDocuments,
  useFetchSingleDocument,
} from "@/utilities/ApiHooks/common";
import { backendURL } from "@/utilities/common";
import ModificationSkeleton from "@/components/estimateSkelton/ModificationSkeleton";
import EstimateDetailSkeleton from "@/components/estimateSkelton/EstimateDetailSkeleton";

export const WineCellarDimensions = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const activeQuoteState = searchParams.get("estimateState");
  // const activeQuoteState = useSelector(getEstimateState);
  const item = useSelector(selectedItem);
  const projectId = searchParams.get("projectId");
  const layoutId = searchParams.get("layoutId");
  const category = searchParams.get("category");
  // const projectId = useSelector(getProjectId);
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [step, setStep] = useState(0); // 0 for dimension, 1 for review, 2 for summary
  const estimateId = searchParams.get("estimateId");
  const skeltonState = useSelector(getSkeltonState);

  const {
    data: layouts,
    refetch,
    isSuccess: layoutSuccess,
    isFetching,
  } = useFetchAllDocuments(`${backendURL}/wineCellars/layouts/for-estimate`);

  const {
    data: record,
    refetch: refetchRecord,
    isSuccess: estimateSuccess,
    isFetching: estimateFetcing,
  } = useFetchSingleDocument(`${backendURL}/estimates/${estimateId}`);

  useEffect(() => {
    if (estimateSuccess || layoutSuccess) {
      dispatch(setSkeltonState());
    }
  }, [estimateSuccess, layoutSuccess]);

  return (
    <Box>
      <Box
        sx={{
          background: { sm: "#F6F5FF", xs: "#08061B" },
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
                    ? `/projects/${projectId}?category=${category}`
                    : "/estimates"
                  : `/estimates/layouts?category=${category}&projectId=${projectId}`
              }
            >
              <Box
                sx={{
                  display: { xs: "block", sm: "none" },
                  paddingRight: "20px",
                  paddingTop: "4px",
                }}
              >
                <img src="/icons/left_vector.svg" alt="<" />
              </Box>
            </NavLink>
            <Box
              sx={{
                color: { sm: "black", xs: "white" },
                fontSize: { xs: "24px", sm: "24px" },
                textAlign: { xs: "start", sm: "center" },
                fontWeight: 600,
                pl: { sm: 0, xs: 3.5 },
              }}
            >
              <NavLink
                to={
                  activeQuoteState === quoteState.EDIT
                    ? projectId
                      ? `/projects/${projectId}`
                      : "/estimates"
                    : `/estimates/layouts?category=${category}&projectId=${projectId}`
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
              gap: 1,
              pt: 3,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: { lg: "60%", md: "50%" },
                gap: 2,
              }}
            >
              {activeQuoteState === quoteState.CREATE ||
              (activeQuoteState === quoteState.EDIT &&
                layoutId &&
                layoutId !== "null") ? (
                <SimpleLayoutDimensions
                  layoutData={{ layouts, refetch, isFetching }}
                  recordData={{ record, refetchRecord, estimateFetcing }}
                />
              ) : //  activeQuoteState === quoteState.CUSTOM ||
              //   (activeQuoteState === quoteState.EDIT &&
              //     !item?.config?.layout_id) ? (
              //   <CustomLayoutDimensions />
              // ) :
              null}
              {skeltonState || estimateFetcing || isFetching
              ? (
                <EstimateDetailSkeleton />
              ) : (
                <Summary />
              )}
            </Box>
            <Box
              sx={{
                width: { lg: "40%", md: "50%" },
              }}
            >
              {skeltonState || estimateFetcing || isFetching ? (
                <ModificationSkeleton />
              ) : (
                <Review />
              )}
            </Box>
          </Box>
        ) : (
          <>
            {step === 0 &&
              (activeQuoteState === quoteState.CREATE ||
                (activeQuoteState === quoteState.EDIT &&
                  layoutId &&
                  layoutId !== "null")) && (
                <SimpleLayoutDimensions
                  setStep={setStep}
                  layoutData={{ layouts, refetch, isFetching }}
                  recordData={{ record, refetchRecord, estimateFetcing }}
                />
              )}
            {/* {step === 0 &&
              (activeQuoteState === quoteState.CUSTOM ||
                (activeQuoteState === quoteState.EDIT &&
                  !item?.config?.layout_id)) && (
                <CustomLayoutDimensions setStep={setStep} />
              )} */}
            {step === 1 && <Review setStep={setStep} />}
            {step === 2 && <Summary setStep={setStep} />}
          </>
        )}
      </Box>
    </Box>
  );
};
