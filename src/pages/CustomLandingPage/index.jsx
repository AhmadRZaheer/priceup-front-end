import CustomizeLandingPage from "@/components/CustomizeLandingPage";
import { setListData } from "@/redux/estimateCalculations";
import { setLocationInfo } from "@/redux/locationSlice";
import { setMirrorsHardware } from "@/redux/mirrorsHardwareSlice";
import { setWineCellarsHardware } from "@/redux/wineCellarsHardwareSlice";
import {
  useFetchAllDocuments,
  useFetchSingleDocument,
} from "@/utilities/ApiHooks/common";
import { backendURL, frontendURL } from "@/utilities/common";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

const CustomLandingPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    data,
    refetch: refetchData,
    isFetching,
    isFetched,
  } = useFetchSingleDocument(`${backendURL}/landing-page-preview/${id}`);
  const {
    data:hardwareData,
    refetch: refetchhardwareData,
    isFetching: fetchingHardwareData,
    isFetched: fetchedHardwareData,
  } = useFetchSingleDocument(
    `${backendURL}/landing-page-preview-additional-hardware/${data?.company_id}`
  );

  useEffect(() => {
    if (id) {
      refetchData();
    }
  }, [id]);
  useEffect(() => {
    if (data) {
      refetchhardwareData();
    }
  }, [data]);

  const hardwareAndSettings = useMemo(() => {
    return {
      showerHardware: hardwareData?.showersHardware,
      mirrorHardware: hardwareData?.mirrorsHardware ?? {},
      wineCellarHardware: hardwareData?.wineCellarsHardware ?? {},
      wineCallerSetting: hardwareData?.locationSettings?.wineCellars ?? {},
      mirrorSetting: hardwareData?.locationSettings?.mirrors ?? {},
      showerSetting: hardwareData?.locationSettings?.showers ?? {},
      pdfSetting: hardwareData?.locationSettings?.pdfSettings ?? {},
    };
  }, [hardwareData]);

  console.log(
    data,
    "datadatadatadatadatadatadatadatadatadatadata",
    hardwareData
  );
  // useEffect(() => {
  //   if (data?.location) {
  //     dispatch(setLocationInfo(data?.location));
  //   }
  //   if (data?.mirrorsHardware) {
  //     dispatch(setMirrorsHardware(data?.mirrorsHardware));
  //   }
  //   if (data?.showersHardware) {
  //     dispatch(setListData(data?.showersHardware));
  //   }
  //   if (data?.wineCellarsHardware) {
  //     dispatch(setWineCellarsHardware(data?.wineCellarsHardware));
  //   }
  // }, [
  //   data?.location,
  //   data?.mirrorsHardware,
  //   data?.showersHardware,
  //   data?.wineCellarsHardware,
  // ]);

  const handleBack = () => {
    window.location.href = `${frontendURL}:3005`;
  };
  return !isFetched ? (
    <Box
      sx={{
        p: "24px 16px",
        height: "calc(100vh - 150px)",
        alignContent: "center",
        textAlign: "center",
      }}
    >
      <CircularProgress size={64} sx={{ color: "#8477DA" }} />
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
        showerHardwaresList={hardwareAndSettings?.showerHardware}
        mirrorHardwaresList={hardwareAndSettings?.mirrorHardware}
        wineCellarHardwaresList={hardwareAndSettings?.wineCellarHardware}
        wineCellarLocationSettings={hardwareAndSettings?.wineCallerSetting}
        mirrorsLocationSettings={hardwareAndSettings?.mirrorSetting}
        showersLocationSettings={hardwareAndSettings?.showerSetting}
        pdfSettings={hardwareAndSettings?.pdfSetting}
      />
    </Box>
  );
};

export default CustomLandingPage;
