import React, {
  useMemo,
  useRef,
  useState,
} from 'react';

import { saveAs } from 'file-saver';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import SignatureCanvas from 'react-signature-canvas';

import { getEstimatesList } from '@/redux/customerEstimateCalculation';
import {
  useCreateDocument,
  useEditDocument,
} from '@/utilities/ApiHooks/common';
import {
  backendURL,
  base64ToFile,
} from '@/utilities/common';
import {
  logActions,
  logResourceType,
} from '@/utilities/constants';
import { Info } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { pdf } from '@react-pdf/renderer';

import LandingPDFFile from '../PDFFile/LandingPagePdf';
import CustomInputField from '../ui-components/CustomInput';
import PaymentModel from './PaymentModel';

const controls = {
  viewPricingSubCategory: true,
  viewGrossProfit: true,
  viewSummary: true,
  viewLayoutImage: true,
  viewFabrication: true,
  viewAdditionalFields: true,
};

const pdfLocationData = {
  name: "GCS Glass & Mirror",
  street: "20634 N. 28th Street, Suite 150",
  state: "Phoenix",
  zipCode: "AZ 85050",
  website: "www.gcs.glass",
};

const SigntureSection = ({
  data,
  refetchData,
  estimatePdfs,
  acceptTerms,
  totalSum,
}) => {
  const estimatesList = useSelector(getEstimatesList);
  console.log(data, "sdfsdddfgfweefvcddd", estimatesList);
  const primaryColor = data?.content?.colorSection?.primary;
  const secondaryColor = data?.content?.colorSection?.secondary;
  const backgroundColor = data?.content?.colorSection?.default;
  const newDate = new Date();
  const formattedDateTime = newDate.toLocaleString("en-US", {
    weekday: "long", // Full weekday name
    month: "long", // Full month name
    day: "numeric", // Numeric day
    year: "numeric", // Full year
    hour: "numeric", // Hour
    minute: "2-digit", // Minute
    hour12: true, // 12-hour format
  });
  const { id } = useParams();
  const {
    mutateAsync: customerDecision,
    isLoading,
    isSuccess,
  } = useEditDocument();
  const { mutate: activityLog, isLoading: activityLogLoading } =
    useCreateDocument();
  const [openEditModal, setOpenEditModal] = useState(false);
  const handleOpenEditModal = () => setOpenEditModal(true);
  const handleCloseEditModal = () => setOpenEditModal(false);
  const [customerName, setCustomerName] = useState(data?.customer?.name ?? "");

  const handleNameChange = (event) => {
    setCustomerName(event.target.value);
  };

  const MAX_FILE_SIZE = 1 * 1024 * 1024;
  const fileInputRef = useRef(null);
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (
      file &&
      ![
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/bmp",
        "image/webp",
      ].includes(file.type)
    ) {
      console.error("Please select a valid image file.");
      return;
    }
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        console.error(
          "File is too large. Please select a file less than 1 MB."
        );
        return;
      }
    }
  };

  const signaturePadRef = useRef(null);
  const [signatureURL, setSignatureURL] = useState(null);
  const [isPadOpen, setIsPadOpen] = useState(false);

  const handleAddSignature = () => {
    // Get the trimmed canvas URL
    const url = signaturePadRef.current
      .getTrimmedCanvas()
      .toDataURL("image/png");
    setSignatureURL(url);
    setIsPadOpen(true);
  };
  const handleClearSignature = () => {
    signaturePadRef.current.clear();
    setSignatureURL(null); // Reset the signature URL
    setIsPadOpen(false);
  };
  const [loading, setLoading] = useState(false);
  console.log(estimatePdfs,pdfLocationData,data,totalSum,'totalSumtotalSumtotalSum')
  const generatePDFDocument = async () => {
    try {
      setLoading(true);
      const doc = estimatePdfs?.length > 0 && (
        <LandingPDFFile
          controls={{
            ...controls,
          }}
          data={{
            quote: estimatePdfs,
            location: pdfLocationData,
            estimateData: data,
            totalSum: totalSum,
            signature : {
              image : signatureURL
            }
          }}
          key={`pdfFile${1}`}
        />
      );
      const blobPdf = await pdf(doc);
      blobPdf.updateContainer(doc);
      const result = await blobPdf.toBlob();
      saveAs(result, "Priceup");
      const logData = {
        action: logActions.DOWNLOADPDF,
        resource_id: id,
        resource_type: logResourceType.PREVIEWLINK,
      };
      activityLog({
        data: logData,
        apiRoute: `${backendURL}/logs/customer`,
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleProjectApproved = async () => {
    const formData = new FormData();
    formData.append("status", "approve");
    formData.append("customer.name", customerName);
    if (signatureURL) {
      const imageSignature = base64ToFile(signatureURL, `${Date.now()}.png`);
      formData.append("signature", imageSignature);
    }
    await customerDecision({
      data: formData,
      apiRoute: `${backendURL}/landing-page-preview/${id}`,
    });
    refetchData();

    const logData = {
      action: logActions.APPROVEPROJECT,
      resource_id: id,
      resource_type: logResourceType.PREVIEWLINK,
    };
    activityLog({
      data: logData,
      apiRoute: `${backendURL}/logs/customer`,
    });
  };
  const estimateStatus = useMemo(() => {
    let status = true;
    estimatesList?.forEach((item) => {
      if (item?.selectedItem?.status !== "customer_approved") {
        status = false;
        return;
      }
    });
    return status;
  }, [data,estimatesList]);

  return (
    <Box
      sx={{
        background: backgroundColor,
        pb: 3,
        pt: {sm:4,xs:3},
        borderTop: "5px solid",
        borderColor:primaryColor,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          sx={{
            fontFamily: '"Poppins" !important',
            fontSize: {sm:"32px",xs:'20px'},
            fontWeight: 600,
            lineHeight: {sm:"39.94px",xs:'20px'},
            color: secondaryColor,
            pb: 2,
          }}
        >
          Your Signature:
        </Typography>
        <Box sx={{ width: "100%", display: "flex", gap: {sm:7,xs:2},flexWrap:{sm:'nowrap',xs:'wrap'} }}>
          <Box sx={{ width: {sm:"50%",xs:'100%'} }}>
            <Box sx={{ background: 'white', borderRadius: 2, p: {sm:3,xs:1.5} }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  pb: 1.2,
                }}
              >
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}
                >
                  <Typography
                    sx={{
                      fontFamily: '"Inter" !important',
                      color: "#0B0B0B",
                      fontWeight: 700,
                      fontSize: "18px",
                      lineHeight: "26px",
                    }}
                  >
                    Write Signature
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: '"Inter" !important',
                      color: "#6D6D6D",
                      lineHeight: "20px",
                      fontSize: "14px",
                    }}
                  >
                    Write your E-Signature here:
                  </Typography>
                </Box>
                {data?.status !== "approve" && (
                  <Box sx={{ alignContent: "center" }}>
                    <Button
                      variant="outlined"
                      onClick={handleClearSignature}
                      sx={{
                        border: "1px solid #8477DA",
                        // mr: 1,
                        height: "38px",
                        color: "#8477DA",
                      }}
                    >
                      Clear
                    </Button>
                  </Box>
                )}
              </Box>
              {data?.status === "approve" ? (
                <Box sx={{ pt: 2 }}>
                  {data?.signature ? (
                    <img
                      src={`${backendURL}/${data?.signature}`}
                      alt="Signature"
                      width="100%"
                      height={150}
                      style={{
                        objectFit: "contain",
                        maxWidth: "100%",
                        maxHeight: "100%",
                        border: "1px solid #E3E8EF",
                        borderRadius: "4px",
                      }}
                    />
                  ) : (
                    <Typography sx={{ pb: 0.6, textAlign: "center" }}>
                      No Signature Image!
                    </Typography>
                  )}
                </Box>
              ) : (
                <Box>
                  <SignatureCanvas
                    ref={signaturePadRef}
                    penColor="darkblue"
                    canvasProps={{
                      height: 170,
                      className: "signature-canvas",
                      style: {
                        border: "1px solid #E3E8EF",
                        width: "-webkit-fill-available",
                      },
                    }}
                    onBegin={console.log("start of sign")}
                    onEnd={handleAddSignature}
                  />
                </Box>
              )}
            
              <Divider sx={{ color: "#6D6D6D" }}>OR</Divider>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.4,
                  pt: 2,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: 700,
                    lineHeight: "24px",
                    color: "#0B0B0B",
                    fontFamily: '"Inter" !important',
                  }}
                >
                  {data?.customer?.name && data?.status === 'approve' ? "Your Name" : "Type in your name"}
                </Typography>
                <CustomInputField
                  disabled={data?.customer?.name && data?.status === 'approve' ? true : false}
                  id="name"
                  name="name"
                  size="small"
                  variant="outlined"
                  placeholder="Name"
                  InputProps={{
                    style: {
                      color: "black",
                      borderRadius: 4,
                      backgroundColor: "white",
                      height: "52px",
                    },
                  }}
                  sx={{
                    color: { sm: "black", xs: "white" },
                    width: "100%",
                  }}
                  value={customerName}
                  onChange={handleNameChange}
                />
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              width:  {sm:"50%",xs:'100%'},
              display: "flex",
              justifyContent:"center",
              alignItems: "center",
            }}
          >
            <Box sx={{ width: {sm:"70%",xs:'98%'},textAlignLast :{sm:'none',xs:'center'} }}>
              {data?.status === "approve" ? (
                <Typography
                  sx={{
                    fontFamily: '"Poppins" !important',
                    fontSize: {sm:"22px",xs:'16px'},
                    color: secondaryColor,
                    fontWeight: 600,
                  }}
                >
                  You have approved this project.
                </Typography>
              ) : (
                <Box>
                  <Typography sx={{ color:secondaryColor }}>
                    <Info
                      sx={{ fontSize: "16px", pt: 0.2, color:primaryColor }}
                    />{" "}
                    You must approve all estimate and provide your signature to
                    continue...
                  </Typography>
                  <Button
                    disabled={
                      (signatureURL === null && customerName === "") ||
                      !estimateStatus ||
                      !acceptTerms
                    }
                    onClick={handleProjectApproved}
                    variant="contained"
                    sx={{
                      fontFamily: '"Inter" !important',
                      height: {sm:"62px",xs:'52px'},
                      width: {sm:"285px",xs:'235px'},
                      borderRadius: "12px",
                      fontSize: {sm:"24px",xs:'16px'},
                      fontWeight: {sm:700,xs:500},
                      backgroundColor: primaryColor,
                      color: secondaryColor,
                      lineHeight: "26px",
                      "&:hover": { backgroundColor: primaryColor, color: secondaryColor,},
                        "&.Mui-disabled": {
                          background: primaryColor,
                        },
                      mt: 1,
                    }}
                  >
                    {isLoading ? (
                      <CircularProgress size={24} sx={{ color: "white" }} />
                    ) : (
                      "Approve project"
                    )}
                  </Button>
                </Box>
              )}
              <Box>
                <Typography
                  sx={{
                    fontFamily: '"Poppins" !important',
                    fontSize: {sm:"32px",xs:'24px'},
                    color:secondaryColor,
                    fontWeight: 700,
                    lineHeight: {sm:"39.94px",xs:'32px'},
                    py: {sm:3,xs:1.5},
                    textAlign:'center'
                  }}
                >
                  Your Estimate PDF is ready to download!{" "}
                </Typography>

                {!data?.invoice_id && (
                  <Stack
                    direction={"row"}
                    gap={1.5}
                    sx={{justifyContent:{sm:'space-between',xs:'center'}, pb: 2.5, width:{sm:"285px",xs:'100%'}}}
                  >
                    <Button
                      fullWidth
                      disabled={!estimateStatus}
                      variant="contained"
                      onClick={handleOpenEditModal}
                      sx={{
                        backgroundColor: primaryColor,
                        color: secondaryColor,
                        height: "44px",
                        width: { sm: "100%", xs: "110px" },
                        "&:hover": { backgroundColor: primaryColor, color: secondaryColor,},
                        "&.Mui-disabled": {
                          background: primaryColor, 
                        },
                        textTransform: "capitalize",
                        borderRadius: 1,
                        fontSize: { lg: 16, md: 15, xs: 12 },
                        fontWeight: "bold !important",
                        padding: {
                          sm: "10px 16px  !important",
                          xs: "5px 5px !important",
                        },
                      }}
                    >
                      Pay Now
                    </Button>
                    <Button
                      fullWidth
                      disabled={!estimateStatus}
                      variant="contained"
                      sx={{
                        backgroundColor: primaryColor,
                        color: secondaryColor,
                        height: "44px",
                        width: { sm: "100%", xs: "110px" },
                        "&:hover": { backgroundColor: primaryColor, color: secondaryColor,},
                        "&.Mui-disabled": {
                          background: primaryColor, 
                        },
                        textTransform: "capitalize",
                        borderRadius: 1,
                        fontSize: { lg: 16, md: 15, xs: 12 },
                        fontWeight: "bold !important",
                        padding: {
                          sm: "10px 16px  !important",
                          xs: "5px 5px !important",
                        },
                      }}
                    >
                      Pay Later
                    </Button>
                  </Stack>
                )}
                <Button
                  disabled={loading || !estimateStatus} // Disable button when loading
                  onClick={() => generatePDFDocument()}
                  variant="outlined"
                  sx={{
                    fontFamily: '"Inter" !important',
                    height: {sm:"62px",xs:'52px'},
                    width: {sm:"285px",xs:'235px'},
                    borderRadius: "12px",
                    fontSize: {sm:"24px",xs:'16px'},
                    fontWeight: {sm:700,xs:500},
                    color: primaryColor,
                    lineHeight: "26px",
                    borderColor: primaryColor,
                    "&:hover": {
                      backgroundColor: primaryColor,
                      color: secondaryColor,
                      borderColor: primaryColor,
                    },
                    "&.Mui-disabled": {
                      background: primaryColor,
                    },
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} sx={{ color: "black" }} />
                  ) : (
                    "Download PDF Now"
                  )}
                </Button>
              </Box>
              {/* )} */}
            </Box>
          </Box>
        </Box>
      </Container>
      <PaymentModel
        open={openEditModal}
        handleClose={handleCloseEditModal}
        refetchData={refetchData}
      />
    </Box>
  );
};

export default SigntureSection;
