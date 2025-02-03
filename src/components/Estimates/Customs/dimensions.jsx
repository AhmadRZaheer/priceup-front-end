import {
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import {
  NavLink,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

import EstimateDetailSkeleton
  from '@/components/estimateSkelton/EstimateDetailSkeleton';
import ModificationSkeleton
  from '@/components/estimateSkelton/ModificationSkeleton';
import {
  getContent,
  getListData,
  setSufferCostDifference,
} from '@/redux/estimateCalculations';
import {
  getSkeltonState,
  setSkeltonState,
} from '@/redux/estimateSlice';
import { getWineCellarsHardware } from '@/redux/wineCellarsHardwareSlice';
import {
  useFetchAllDocuments,
  useFetchSingleDocument,
} from '@/utilities/ApiHooks/common';
import { backendURL } from '@/utilities/common';
import {
  EstimateCategory,
  quoteState,
} from '@/utilities/constants';
import {
  Alert,
  Box,
  Button,
  Collapse,
  Typography,
  useMediaQuery,
} from '@mui/material';

import { CustomLayoutDimensions } from './Dimensions/customLayoutDimensions';
import { CustomReview } from './review';
import Summary from './summary';

export const CustomsDimensions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeQuoteState = searchParams.get("estimateState");
  // const activeEstimateState = searchParams.get("estimateState");
  const layoutId = searchParams.get("layoutId");
  const projectId = searchParams.get("projectId");
  const category = searchParams.get("category");
  const estimateId = searchParams.get("estimateId");
  const isMobile = useMediaQuery("(max-width: 600px)");
  const skeltonState = useSelector(getSkeltonState);
  const selectedContent = useSelector(getContent);
  const [step, setStep] = useState(0);
  const [openAlert, setOpenAlert] = useState(true);
  const listWineCallerData = useSelector(getWineCellarsHardware);
  const listShowerData = useSelector(getListData);

  const {
    data: layouts,
    refetch,
    isSuccess: layoutSuccess,
    isFetching,
  } = useFetchAllDocuments(`${backendURL}/layouts/for-estimate`);

  const {
    data: record,
    refetch: refetchRecord,
    isSuccess: estimateSuccess,
    isFetching: estimateFetcing,
  } = useFetchSingleDocument(`${backendURL}/estimates/${estimateId}`);
  console.log(record,'recordrecordrecord');

  useEffect(() => {
    if (estimateSuccess || layoutSuccess) {
      dispatch(setSkeltonState());
    }
  }, [estimateSuccess, layoutSuccess]);

  const handleSufferCost = () => {
    dispatch(setSufferCostDifference());
  };
  // const customActiveState =
  //   category === EstimateCategory.WINECELLARS
  //     ? activeQuoteState
  //     : activeQuoteState;

  const sufferStatus =
    selectedContent.sufferCostDifference &&
    activeQuoteState === quoteState.EDIT;

  const listData = useMemo(() => {
    if (category) {
      const data =
      category === EstimateCategory.SHOWERS
          ? listShowerData
          : category === EstimateCategory.WINECELLARS
          ? listWineCallerData
          : null;
      return data;
    } else {
      navigate(
        `/estimates/layouts?projectId=${projectId}`
      );
    }
  }, [category]);

  return (
    <Box>
      {sufferStatus && (
        <Box sx={{ width: "100%" }}>
          <Collapse in={openAlert}>
            <Alert
              icon={false}
              sx={{
                mb: 1,
                border: "2px solid #DC3545",
                color: "#DC3545",
                px: "12px",
                py: "6px",
                width: "-webkit-fill-available",
                background: "transparent",
                display: "block",
                ".MuiAlert-message": {
                  p: "0px",
                },
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ alignSelf: "center", fontWeight: "bold" }}>
                  This estimate has a cost discrepancy. Would you like to apply
                  the updated cost?
                </Typography>
                <Button
                  onClick={handleSufferCost}
                  variant="contained"
                  sx={{
                    display: "flex",
                    boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
                    color: "white",
                    textTransform: "initial",
                    fontSize: 14,
                    backgroundColor: "#8477da",
                    p: "8px 16px 8px 16px !important",
                    "&:hover": {
                      backgroundColor: "#8477da",
                    },
                  }}
                >
                  Apply Cost
                </Button>
              </Box>
            </Alert>
          </Collapse>
        </Box>
      )}
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
                {" "}
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
              pointerEvents: sufferStatus ? "none" : "auto",
              opacity: sufferStatus ? 0.5 : 1,
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
              <>
                {activeQuoteState === quoteState.CUSTOM ||
                (activeQuoteState === quoteState.EDIT &&
                  layoutId === "null") ? (
                  <CustomLayoutDimensions
                    recordData={{ record, refetchRecord, estimateFetcing }}
                    listData={listData}
                  />
                ) : null}
                {skeltonState || estimateFetcing || isFetching ? (
                  <EstimateDetailSkeleton />
                ) : (
                  <Summary listData={listData} />
                )}
              </>
            </Box>
            <Box
              sx={{
                width: { lg: "40%", md: "50%" },
              }}
            >
              {skeltonState || estimateFetcing || isFetching ? (
                <ModificationSkeleton />
              ) : (
                <CustomReview listData={listData} />
              )}
            </Box>
          </Box>
        ) : (
          <>
            {step === 0 &&
              (activeQuoteState === quoteState.CUSTOM ||
                (activeQuoteState === quoteState.EDIT &&
                  layoutId === "null")) && (
                <CustomLayoutDimensions
                  setStep={setStep}
                  recordData={{ record, refetchRecord, estimateFetcing }}
                  listData={listData}
                />
              )}
            {step === 1 && (
              <CustomReview setStep={setStep} listData={listData} />
            )}
            {step === 2 && <Summary setStep={setStep} listData={listData} />}
          </>
        )}
      </Box>
    </Box>
  );
};
