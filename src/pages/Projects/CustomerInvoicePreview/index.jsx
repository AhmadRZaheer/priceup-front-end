import CommonLayout from "@/components/CommonLayout";
import CustomLandingPage from "@/pages/CustomLandingPage";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { getSelectedImages } from "@/redux/globalEstimateForm";
import { useDispatch, useSelector } from "react-redux";
import { showSnackbar } from "@/redux/snackBarSlice";
import { backendURL, frontendURL, getDecryptedToken } from "@/utilities/common";
import {
  useCreateDocument,
  useEditDocument,
  useFetchAllDocuments,
  useFetchSingleDocument,
} from "@/utilities/ApiHooks/common";
import CustomizeLandingPage from "@/components/CustomizeLandingPage";
import { SaveOutlined } from "@mui/icons-material";

const CustomerInvoicePreview = () => {
  const { id } = useParams();
  // const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);
  // const customer_id = queryParams.get("customer_id");
  // const {
  //   data: selectedData,
  //   refetch: refetchData,
  //   isFetching,
  //   isFetched,
  // } = useFetchAllDocuments(`${backendURL}/projects/all-estimate/${id}`);

  const {
    data: selectedData,
    refetch: refetchData,
    isFetched,
    isFetching,
  } = useFetchSingleDocument(`${backendURL}/invoices/${id}`);

  const decodedToken = getDecryptedToken();
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const selectedImages = useSelector(getSelectedImages);
  const { mutate: generatePage, isLoading, isSuccess } = useEditDocument();

  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 15);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const futureDate = currentDate.toLocaleDateString(undefined, options);

  const handleClick = () => {
    const projectId = decodedToken?.company_id;
    // Aaj ki date lein
    const currentDate = new Date();
    // 15 din add karein
    currentDate.setDate(currentDate.getDate() + 15);
    // ISO format mein convert karein
    const formattedDate = currentDate.toISOString();

    const customerPayLoad = {
      link: `${frontendURL}/customer-invoice-preview/${id}`,
      expiresAt: formattedDate,
    };    
    generatePage({ data:{customerPreview:customerPayLoad}, apiRoute: `${backendURL}/invoices/${id}` });
  };
  useEffect(() => {
    if (isSuccess) {
      navigate(`/invoices/${id}`);
    }
  }, [isSuccess]);
  return (
    <CommonLayout>
      <Box className="econtent-wrapper">
        <Box
          sx={{
            position: "fixed",
            width: "-webkit-fill-available",
            mr: "21px",
            top: "82px",
            zIndex: 10000,
          }}
        >
          <Box
            sx={{
              backgroundColor: { xs: "#100D24", sm: "#F6F5FF" },
              borderBottomRightRadius: { xs: "16px", sm: "0px" },
              borderBottomLeftRadius: { xs: "16px", sm: "0px" },
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: { sm: 0, xs: 5 },
              py: 1.5,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <NavLink
                to={id ? `/invoices/${id}` : "/invoices"}
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
                  color: { sm: "black", xs: "white" },
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
              This well generate a preview link for customer which will be valid
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
                  Save
                </>
              )}
            </Button>
          </Box>
        </Box>
        <Box sx={{ mt: "60px" }}>
          <CustomizeLandingPage
            selectedData={selectedData}
            refetchData={refetchData}
            isFetched={isFetched}
            isFetching={isFetching}
          />
        </Box>
      </Box>
    </CommonLayout>
  );
};

export default CustomerInvoicePreview;
