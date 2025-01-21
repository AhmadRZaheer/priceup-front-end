import { Box, Button, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useDispatch, useSelector } from "react-redux";
import { backendURL, frontendURL, getDecryptedToken } from "@/utilities/common";
import {
  useEditDocument,
  useFetchSingleDocument,
} from "@/utilities/ApiHooks/common";
import CustomizeLandingPage from "@/components/CustomizeLandingPage";
import { SaveOutlined } from "@mui/icons-material";
import { userRoles } from "@/utilities/constants";
import { getListData } from "@/redux/estimateCalculations";
import { getMirrorsHardware } from "@/redux/mirrorsHardwareSlice";
import { getWineCellarsHardware } from "@/redux/wineCellarsHardwareSlice";
import { initializeState } from "@/redux/customerEstimateCalculation";

const CustomerInvoicePreview = () => {
  const { id } = useParams();
  const decodedToken = getDecryptedToken();
  const showerHardwaresList = useSelector(getListData);
  const mirrorHardwaresList = useSelector(getMirrorsHardware);
  const wineCellarHardwaresList = useSelector(getWineCellarsHardware);
  const [selectedDataLoading, setSelectedDataLoading] = useState(true);
  const dispatch = useDispatch();
  const authUser =
    decodedToken?.role === userRoles.ADMIN ||
    decodedToken?.role === userRoles.CUSTOM_ADMIN;
  const {
    data: selectedData,
    refetch: refetchData,
    isFetched,
    isFetching,
  } = useFetchSingleDocument(
    `${backendURL}/projects/landing-page-preview/${id}`
  );
  const navigate = useNavigate();
  const { mutateAsync: generatePage, isLoading, isSuccess } = useEditDocument();

  const options = { year: "numeric", month: "long", day: "numeric" };
  const expiresAt = selectedData?.customerPreview?.expiresAt;
  const futureDate = expiresAt
    ? new Date(expiresAt).toLocaleDateString(undefined, options)
    : null;

  const handleClick = async () => {
    const customerPayLoad = {
      ...selectedData?.customerPreview,
      link: `${frontendURL}/customer-landing-page-preview/${id}`,
    };

    try {
      const response = await generatePage({
        data: { customerPreview: customerPayLoad },
        apiRoute: `${backendURL}/projects/landing-page-preview/${id}`,
      });
      if (response) {
        navigate(`/projects/${response.project_id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    refetchData();
  }, []);

  useEffect(() => {
    if (isFetched) {
      setSelectedDataLoading(false);
    }
  }, [isFetched, selectedData, refetchData]);

  useEffect(() => {
    if (
      selectedData &&
      showerHardwaresList &&
      mirrorHardwaresList &&
      wineCellarHardwaresList
    ) {
      // Abstract repeated dispatch logic into a helper function
      const initializeHardware = () => {
        if (selectedData?.estimateDetailArray?.length) {
          console.log(wineCellarHardwaresList, "sssssss");
          dispatch(
            initializeState({
              estimates: selectedData.estimateDetailArray,
              showerHardwaresList,
              mirrorHardwaresList,
              wineCellarHardwaresList,
            })
          );
        }
      };
      initializeHardware();
    }
  }, [
    selectedData,
    dispatch,
    showerHardwaresList,
    mirrorHardwaresList,
    wineCellarHardwaresList,
  ]);

  return (
    <Box className="econtent-wrapper">
      <Box
        sx={{
          position: "fixed",
          width: "-webkit-fill-available",
          zIndex: 10000,
        }}
      >
        <Box
          sx={{
            backgroundColor: {
              xs: "white",
              sm: "white",
            },
            borderBottomRightRadius: { xs: "16px", sm: "0px" },
            borderBottomLeftRadius: { xs: "16px", sm: "0px" },
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: { sm: 0, xs: 0 },
            py: 1.5,
            pr: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <NavLink
              to={
                selectedData?.project_id
                  ? `/projects/${selectedData?.project_id}`
                  : "/projects"
              }
              style={{ display: "flex", alignSelf: "center" }}
            >
              <Box
                sx={{
                  color: "black",
                  display: "flex",
                }}
              >
                <KeyboardArrowLeftIcon sx={{ fontSize: "35px" }} />
              </Box>
            </NavLink>
            <Box
              sx={{
                color: "black",
                fontSize: { xs: "20px", sm: "20px" },
                textAlign: { xs: "start", sm: "center" },
                fontWeight: 600,
              }}
            >
              Quoted Landing Page
            </Box>
          </Box>
          <Typography
            sx={{
              color: "#212528",
              fontSize: "16px",
              fontWeight: 600,
              lineHeight: "21.86px",
            }}
          >
            This will generate a preview link for customer which will be valid
            till {futureDate}.
          </Typography>
          <Button
            disabled={isLoading}
            onClick={handleClick}
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#8477DA",
              height: "44px",
              width: { sm: "auto", xs: "187px" },
              "&:hover": { backgroundColor: "#8477DA" },
              color: "white",
              textTransform: "capitalize",
              borderRadius: 1,
              fontSize: { lg: 16, md: 15, xs: 12 },
              padding: {
                sm: "10px 16px  !important",
                xs: "5px 5px !important",
              },
            }}
          >
            {isLoading ? (
              <CircularProgress size={24} sx={{ color: "#8477DA" }} />
            ) : (
              <>
                <SaveOutlined sx={{ pr: 1 }} />
                Publish
              </>
            )}
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          // mt: "60px",
          overflowX: "hidden",
          background: "white",
          pt: authUser ? "68px" : "0px",
        }}
      >
        {selectedDataLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "90vh",
            }}
          >
            <CircularProgress size={24} />
          </Box>
        ) : (
          <CustomizeLandingPage
            selectedData={selectedData}
            refetchData={refetchData}
            isFetched={isFetched}
            isFetching={isFetching}
          />
        )}
      </Box>
    </Box>
  );
};

export default CustomerInvoicePreview;
