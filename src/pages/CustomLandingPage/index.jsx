import React, {
  useEffect,
  useState,
} from 'react';

import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import CustomizeLandingPage from '@/components/CustomizeLandingPage';
import { initializeState } from '@/redux/customerEstimateCalculation';
import { setListData } from '@/redux/estimateCalculations';
import { setLocationInfo } from '@/redux/locationSlice';
import { setMirrorsHardware } from '@/redux/mirrorsHardwareSlice';
import { setWineCellarsHardware } from '@/redux/wineCellarsHardwareSlice';
import { useFetchSingleDocument } from '@/utilities/ApiHooks/common';
import { backendURL } from '@/utilities/common';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from '@mui/material';

const CustomLandingPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selectedDataLoading, setSelectedDataLoading] = useState(true);
  const {
    data,
    refetch: refetchData,
    isFetching,
    isFetched,
  } = useFetchSingleDocument(`${backendURL}/landing-page-preview/${id}`);
  const { data: hardwareData, refetch: refetchHardwareData } =
    useFetchSingleDocument(
      `${backendURL}/landing-page-preview-additional-hardware/${data?.company_id}`
    );
  useEffect(() => {
    if (id) {
      refetchData();
    }
  }, [id, refetchData]);

  useEffect(() => {
    if (isFetched) {
      if (data) {
        refetchHardwareData();
      }
      setSelectedDataLoading(false);
    }
  }, [data, refetchHardwareData, isFetched]);

  useEffect(() => {
    if (hardwareData) {
      const initializeHardware = () => {
        if (data?.estimateDetailArray?.length) {
          dispatch(
            initializeState({
              estimates: data.estimateDetailArray,
              showerHardwaresList: hardwareData.showersHardware,
              mirrorHardwaresList: hardwareData.mirrorsHardware,
              wineCellarHardwaresList: hardwareData.wineCellarsHardware,
            })
          );
        }
        dispatch(setListData(hardwareData.showersHardware ?? {}));
        dispatch(setMirrorsHardware(hardwareData.mirrorsHardware ?? {}));
        dispatch(
          setWineCellarsHardware(hardwareData.wineCellarsHardware ?? {})
        );
        dispatch(setLocationInfo(hardwareData.locationSettings ?? {}));
      };
      initializeHardware();
    }
  }, [hardwareData, data, dispatch]);

  const primaryColor = data?.content?.colorSection?.primary ?? '#F95500';

  const handleBack = () => {
    window.location.href = `http://3.219.213.248:3005`;
  };
  return selectedDataLoading ? (
    <Box
      sx={{
        p: "24px 16px",
        height: "calc(100vh - 150px)",
        alignContent: "center",
        textAlign: "center",
      }}
    >
      <CircularProgress size={40} sx={{ color: primaryColor }} />
    </Box>
  ) : data === null || data === undefined ? (
    <Container maxWidth="xl" sx={{ pt: 2.5 }}>
      <Box
        sx={{
          bgcolor: "#FFFFFF",
          p: "24px 16px 24px 16px",
          borderRadius: "12px",
        }}
      >
        <Box
          sx={{
            p: "24px 16px",
            height: "calc(100vh - 150px)",
            alignContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <Typography variant="h3">Oops! This Link Has Expired</Typography>
            <Typography variant="h5">
              {" "}
              The link you used to access this page has expired or is no longer
              valid.
            </Typography>
            <Box>
              <Button
                sx={{
                  backgroundColor: "#8477DA",
                  "&:hover": {
                    backgroundColor: "#8477da",
                  },
                  position: "relative",
                  fontWeight: 600,
                  fontSize: "16px",
                }}
                variant="contained"
                onClick={handleBack}
              >
                generate another request
                <ArrowRightAltIcon sx={{ pl: 1 }} />
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  ) : (
    <Box sx={{ background: "#FFFFFF" }}>
      <CustomizeLandingPage
        selectedData={data}
        refetchData={refetchData}
        isFetched={isFetched}
        isFetching={isFetching}
      />
    </Box>
  );
};

export default CustomLandingPage;
