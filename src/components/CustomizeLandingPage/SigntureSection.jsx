import { Close, CloudUploadOutlined, Info } from "@mui/icons-material";
import {
  Box,
  Button,
  ButtonBase,
  Container,
  Divider,
  InputAdornment,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useMemo, useRef, useState } from "react";
import CustomInputField from "../ui-components/CustomInput";
import SignatureCanvas from "react-signature-canvas";
import PaymentModel from "./PaymentModel";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import LandingPDFFile from "../PDFFile/LandingPagePdf";
import { useEditDocument } from "@/utilities/ApiHooks/common";
import { backendURL, base64ToFile } from "@/utilities/common";
import { useParams } from "react-router-dom";

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

const SigntureSection = ({ data, refetchData, estimatePdfs }) => {
  const { id } = useParams();
  const {
    mutateAsync: customerDecision,
    isLoading,
    isSuccess,
  } = useEditDocument();
  const [openEditModal, setOpenEditModal] = useState(false);
  const handleOpenEditModal = () => setOpenEditModal(true);
  const handleCloseEditModal = () => setOpenEditModal(false);

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

  const generatePDFDocument = async () => {
    const doc = estimatePdfs?.length > 0 && (
      <LandingPDFFile
        controls={{
          ...controls,
        }}
        data={{ quote: estimatePdfs, location: pdfLocationData }}
        key={`pdfFile${1}`}
        signature={signatureURL}
      />
    );
    const blobPdf = await pdf(doc);
    blobPdf.updateContainer(doc);
    const result = await blobPdf.toBlob();
    saveAs(result, "Priceup");
  };

  
  const handleProjectApproved = async () => {
    const formData = new FormData();
    formData.append("status", "approve");
    const imageSignature = base64ToFile(signatureURL,`${Date.now()}.png`);
    formData.append("signature", imageSignature);
    await customerDecision({
      data: formData,
      apiRoute: `${backendURL}/landing-page-preview/${id}`,
    });
    refetchData();
  };
  const estimateStatus = useMemo(() => {
    let status = true;
    data?.estimates?.forEach((item) => {
      if (item?.status !== "approve") {
        status = false;
        return;
      }
    });
    return status;
  }, [data]);

  return (
    <Box
      sx={{
        background: "#000000",
        pb: 3,
        pt: 4,
        borderTop: "5px solid #F95500",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          sx={{
            fontFamily: '"Poppins" !important',
            fontSize: "32px",
            fontWeight: 600,
            lineHeight: "39.94px",
            color: "white",
            pb: 2,
          }}
        >
          Your Signature:
        </Typography>
        <Box sx={{ width: "100%", display: "flex", gap: 7 }}>
          <Box sx={{ width: "50%" }}>
            <Box sx={{ background: "white", borderRadius: 2, p: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
                <Box sx={{ alignContent: "center" }}>
                  <Close sx={{ height: "24px", width: "24px" }} />
                </Box>
              </Box>
              {data?.status === "approve" ? (
                <Box sx={{ pt: 2 }}>
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
                </Box>
              ) : (
                <Box sx={{ pt: 1 }}>
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
                  />
                  <Stack
                    sx={{ marginTop: "5px" }}
                    direction={"row"}
                    justifyContent={"space-between"}
                  >
                    <Button
                      variant="outlined"
                      onClick={handleClearSignature}
                      sx={{
                        border: "1px solid #8477DA",
                        mr: 1,
                        height: "38px",
                        color: "#8477DA",
                      }}
                    >
                      Clear
                    </Button>
                    <Button
                      onClick={handleAddSignature}
                      variant="contained"
                      sx={{
                        background: "#8477DA",
                        height: "38px",
                        ":hover": {
                          background: "#8477DA",
                        },
                      }}
                    >
                      Save
                    </Button>
                  </Stack>
                </Box>
              )}

              {signatureURL && data?.status !== 'approve' && (
                <Box sx={{ pt: 2 }}>
                  <img
                    src={signatureURL}
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
                </Box>
              )}

              {/* <Box sx={{ pt: 2 }}>
                <ButtonBase
                  onClick={handleUploadClick}
                  sx={{
                    width: "100%",
                    border: "1px dashed",
                    borderRadius: 2,
                    cursor: "pointer",
                    backgroundColor: "#F8FAFC",
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                    borderColor: "#1849D6",
                    p: "24px",
                  }}
                >
                  <Stack
                    direction={"column"}
                    sx={{
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                      gap: "12px",
                    }}
                  >
                    <Box>
                      <CloudUploadOutlined
                        sx={{ width: "36px", color: "#1849D6" }}
                      />
                    </Box>
                    <Typography
                      sx={{
                        color: "#0B0B0B",
                        lineHeight: "20px",
                        fontSize: "14px",
                        fontFamily: '"Inter" !important',
                      }}
                    >
                      Drag your file(s) or{" "}
                      <Box
                        component="span"
                        sx={{ color: "#1849D6 !important" }}
                      >
                        browse
                      </Box>
                    </Typography>
                    <Typography
                      sx={{
                        color: "#6D6D6D",
                        lineHeight: "20px",
                        fontSize: "14px",
                        fontFamily: '"Inter" !important',
                      }}
                    >
                      Max 10 MB files are allowed
                    </Typography>
                  </Stack>
                </ButtonBase>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                  // accept=".jpg,.jpeg,.png,.gif,.bmp,.webp"
                  accept="image/*"
                  capture={false}
                />
              </Box> */}
              {/* <Typography
                sx={{
                  py: 2,
                  color: "#6D6D6D",
                  lineHeight: "20px",
                  fontSize: "14px",
                  fontFamily: '"Inter" !important',
                }}
              >
                Only support .jpg, .png and .svg and zip files
              </Typography> */}
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
                  Type in your name
                </Typography>
                <CustomInputField
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
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button
                          variant="outlined"
                          aria-label="toggle password visibility"
                          // onClick={handleClickShowPassword}
                          sx={{
                            fontWeight: `${600} !important`,
                            fontSize: "12px !important",
                            lineHeight: "18px !important",
                            height: "35px",
                            borderRadius: "8px !important",
                            color: "#6D6D6D",
                            borderColor: "#CECECE",
                            fontFamily: '"Inter" !important',
                          }}
                        >
                          {true ? "Done" : "Edit"}
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    color: { sm: "black", xs: "white" },
                    width: "100%",
                  }}
                  // value={formik.values.name}
                  // onChange={formik.handleChange}
                />
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              width: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box sx={{ width: "70%" }}>
              {data?.status === "approve" ? (
                <Typography
                  sx={{
                    fontFamily: '"Poppins" !important',
                    fontSize: "22px",
                    color: "white",
                    fontWeight: 600,
                  }}
                >
                  You have approved this project.
                </Typography>
              ) : (
                <Box>
                  <Typography sx={{ color: "white" }}>
                    <Info sx={{ fontSize: "16px", pt: 0.2 }} /> You must approve
                    all estimate and provide your signature to continue...
                  </Typography>
                  <Button
                    disabled={signatureURL === null || !estimateStatus}
                    onClick={handleProjectApproved}
                    variant="contained"
                    sx={{
                      fontFamily: '"Inter" !important',
                      height: "62px",
                      width: "285px",
                      borderRadius: "12px",
                      fontSize: "24px",
                      fontWeight: 700,
                      backgroundColor: "#8477DA",
                      color: "white",
                      lineHeight: "26px",
                      "&:hover": {
                        backgroundColor: "#8477DA",
                      },
                      "&.Mui-disabled": {
                        background: "#8477DA",
                      },
                      mt: 1,
                    }}
                  >
                    Approve project
                  </Button>
                </Box>
              )}
              {data?.status === "approve" && (
                <Box>
                  <Typography
                    sx={{
                      fontFamily: '"Poppins" !important',
                      fontSize: "32px",
                      color: "white",
                      fontWeight: 700,
                      lineHeight: "39.94px",
                      py: 3,
                    }}
                  >
                    Your Estimate PDF is ready to download!{" "}
                  </Typography>
                  <Tooltip
                    title={
                      signatureURL === null ? "Please signature first!" : ""
                    }
                    placement="top"
                  >
                    <Button
                      // disabled={signatureURL === null}
                      onClick={() => generatePDFDocument()}
                      variant="contained"
                      sx={{
                        fontFamily: '"Inter" !important',
                        height: "62px",
                        width: "285px",
                        borderRadius: "12px",
                        fontSize: "24px",
                        fontWeight: 700,
                        backgroundColor: "#F95500",
                        color: "#0B0B0B",
                        lineHeight: "26px",
                        "&:hover": {
                          backgroundColor: "#F95500",
                        },
                        "&.Mui-disabled": {
                          background: "#F95500",
                        },
                      }}
                    >
                      Download PDF Now
                    </Button>
                  </Tooltip>

                  <Stack
                    sx={{ pt: 3, width: "285px" }}
                    direction={"row"}
                    gap={1.5}
                    justifyContent={"space-between"}
                  >
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={handleOpenEditModal}
                      sx={{
                        backgroundColor: "#8477DA",
                        height: "44px",
                        width: { sm: "100%", xs: "187px" },
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
                      Pay Now
                    </Button>
                    <Button
                      fullWidth
                      // onClick={handleAddSignature}
                      variant="contained"
                      sx={{
                        backgroundColor: "#8477DA",
                        height: "44px",
                        width: { sm: "100%", xs: "187px" },
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
                      Pay Later
                    </Button>
                  </Stack>
                </Box>
              )}
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
