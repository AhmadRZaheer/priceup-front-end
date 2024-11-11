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
import { backendURL, getDecryptedToken } from "@/utilities/common";
import { useCreateDocument, useFetchAllDocuments } from "@/utilities/ApiHooks/common";
import CustomizeLandingPage from "@/components/CustomizeLandingPage";

const CustomerInvoicePreview = () => {
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const customer_id = queryParams.get('customer_id');
  const {
    data: selectedData,
    refetch: refetchData,
    isFetching,
    isFetched ,
  } = useFetchAllDocuments(`${backendURL}/projects/all-estimate/${id}`);
  const decodedToken = getDecryptedToken();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedImages = useSelector(getSelectedImages);
  const { mutate: generatePage, isLoading, isSuccess } = useCreateDocument();

  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 15);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const futureDate = currentDate.toLocaleDateString(undefined, options);

  const handleClick = () => {
    const projectId = decodedToken?.company_id;
    const data = {
      company_id: projectId,
      project_id: id,
      customer_id
    };
    generatePage({ data, apiRoute: `${backendURL}/projects/generate-preview` });
  };
  useEffect(() => {
    if (isSuccess) {
      navigate(`/projects/${id}`);
    }
  }, [isSuccess]);
  return (
    <CommonLayout>
      <Box className="econtent-wrapper">
        <Box sx={{ pb: "15px" }}>
          <Box
            sx={{
              backgroundColor: { xs: "#100D24", sm: "#F6F5FF" },
              borderBottomRightRadius: { xs: "16px", sm: "0px" },
              borderBottomLeftRadius: { xs: "16px", sm: "0px" },
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: { sm: 0, xs: 5 },
              position: "fixed",
              width: "80%",
              py: 1.5,
              zIndex: 10000,
            }}
          >
            <Box sx={{ display: "flex" }}>
              <NavLink
                to={id ? `/projects/${id}` : "/projects"}
                style={{ display: "flex", alignSelf: "center" }}
              >
                <Box
                  sx={{
                    color: "black",
                  }}
                >
                  <KeyboardArrowLeftIcon sx={{ fontSize: "35px" }} />
                </Box>
              </NavLink>
              <Box
                sx={{
                  color: { sm: "black", xs: "white" },
                  fontSize: { xs: "24px", sm: "24px" },
                  textAlign: { xs: "start", sm: "center" },
                  fontWeight: 600,
                }}
              >
                Customer Preview
              </Box>
            </Box>
            <Typography
              sx={{
                color: "#212528",
                fontSize: "18px",
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
                  <EngineeringIcon sx={{ pr: 1 }} />
                  Generate
                </>
              )}
            </Button>
          </Box>
        </Box>
        <Box sx={{ mt: "60px" }}>
        <CustomizeLandingPage selectedData={selectedData} refetchData={refetchData}  isFetched={isFetched} isFetching={isFetching} />
        </Box>
      </Box>
    </CommonLayout>
  );
};

export default CustomerInvoicePreview;
