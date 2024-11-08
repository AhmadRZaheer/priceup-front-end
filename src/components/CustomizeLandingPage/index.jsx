import {
  Box,
  Button,
  Card,  
  CardMedia,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useRef } from "react";
import LogoNavBar from "../../Assets/purplelogo.svg";
import Img from "../../Assets/example.jpg";
import right_headerimage from "../../Assets/header-right-image.svg";
import bg_Header from "../../Assets/bg-Header.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { PDFViewer } from "@react-pdf/renderer";
import PDFFile from "../PDFFile";
import { getDecryptedToken } from "@/utilities/common";
import { Cancel, Close } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { showSnackbar } from "@/redux/snackBarSlice";
import { userRoles } from "@/utilities/constants";
import {
  getSelectedImages,
  removeImage,
  setSelectedImages,
} from "@/redux/globalEstimateForm";

const MAX_FILE_SIZE = 1 * 1024 * 1024;

const CustomizeLandingPage = () => {
  const decodedToken = getDecryptedToken();
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const selectedImages = useSelector(getSelectedImages);

  const handleClick = () => {
    fileInputRef.current.click(); 
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files); 
    const validFiles = files.filter((file) => {
      if (file.size > MAX_FILE_SIZE) {
        dispatch(
          showSnackbar({
            message: `${file.name} is larger than 1MB and will not be added.`,
            severity: "error",
          })
        );
        return false;
      }
      return true;
    });

    const fileUrls = validFiles.map((file) => URL.createObjectURL(file));
    dispatch(setSelectedImages(fileUrls));
  };

  const handleDeleteImage = (index) => {
    dispatch(removeImage(index));
  };

  const authUser =
    decodedToken?.role === userRoles.ADMIN ||
    decodedToken?.role === userRoles.CUSTOM_ADMIN;

  return (
    <>
      <Box sx={{ bgcolor: "black", width: "100%" }}>
        {/* Navigation Bar */}
        <Box
          sx={{
            width: "90%",
            m: "auto",
            display: "flex",
            justifyContent: "center",
            py: 1,
          }}
        >
          <Box>
            <img src={LogoNavBar} alt="logo nav bar" />
          </Box>
         
        </Box>
        {/* Section Header */}
        <Box
          sx={{
            width: { md: "84%", xs: "90%" },
            m: "auto",
            backgroundImage: { md: `url(${bg_Header})`, xs: "none" },
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            pl: { md: 12, xs: 0 },
            pt: { md: 16, xs: 0 },
            pb: { md: 12, xs: 2 },
            mt: 3,
            borderRadius: { md: "77px", xs: "40px" },
            display: "flex",
            flexDirection: { md: "row", xs: "column" },
            gap: 10,
            position: "relative",
          }}
        >
          {/* left side */}
          <Box sx={{ width: { lg: 580, md: 500 } }}>
            <Typography
              sx={{
                fontSize: { lg: "84px", md: "70px", xs: "54px" },
                fontWeight: 500,
                color: "white",
                lineHeight: { md: "101px", xs: "70px" },
              }}
            >
              Supercharge your glass business
            </Typography>
            <Typography
              sx={{
                fontSize: { lg: "18px", md: "16px", xs: "14px" },
                fontWeight: "light",
                color: "white",
                pr: 4,
                mt: 2,
              }}
            >
              We make it easy to estimate, invoice, and organize glass customers
              and their projects all from your phone.
            </Typography>
          </Box>
          {/* right side */}
          <Box
            sx={{
              position: { md: "absolute", xs: "static" },
              right: { lg: 200, md: 60 },
              top: 0,
              textAlign: { md: "end", xs: "center" },
              width: "100%",
            }}
          >
            <img src={right_headerimage} alt="" height="560" />
          </Box>
        </Box>
      </Box>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{ p: 5 }}>
            <Typography
              sx={{
                fontSize: "40px",
                fontWeight: 500,
                lineHeight: "54px",
              }}
            >
              The Highest Quality Residential Glass Services
            </Typography>
            <Typography
              sx={{
                fontSize: { lg: "18px", md: "16px", xs: "14px" },
                fontWeight: "light",
                pr: 4,
                mt: 2,
              }}
            >
              We make it easy to estimate, invoice, and organize glass customers
              and their projects all from your phone.
            </Typography>
          </Box>
        </Box>
        {authUser && (
          <Box sx={{ textAlign: "center", pb: 1 }}>
            <Button
              variant="contained"
              onClick={handleClick}
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
              Upload Images
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
              accept="image/*"
              capture={false}
            />
          </Box>
        )}

        <Box sx={{ pb: 5, px: 4 }}>
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={10}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
            style={{
              "--swiper-navigation-color": "#000",
              "--swiper-navigation-size": "35px",
            }}
          >
            {selectedImages.length > 0 ? (
              selectedImages.map((data, index) => (
                <SwiperSlide>
                  <Card
                    key={index}
                    position="relative"
                    width="150px"
                    height="150px"
                    overflow="hidden"
                  >
                    <CardMedia
                      component="img"
                      alt="green iguana"
                      height="320"
                      image={data}
                    />
                    {authUser && (
                      <IconButton
                        onClick={() => handleDeleteImage(index)}
                        sx={{
                          position: "absolute",
                          top: "5px",
                          right: "5px",
                          backgroundColor: "rgba(0, 0, 0, 0.5)",
                          color: "white",
                          "&:hover": {
                            backgroundColor: "rgba(0, 0, 0, 0.7)",
                          },
                        }}
                      >
                        <Close />
                      </IconButton>
                    )}
                  </Card>
                </SwiperSlide>
              ))
            ) : (
              <Typography
                sx={{
                  fontSize: "18px",
                  fontWeight: 500,
                  lineHeight: "54px",
                  textAlign: "center",
                }}
              >
                No Image Selected!
              </Typography>
            )}
          </Swiper>
        </Box>
        <Box sx={{ px: 4 }}>
          <Box sx={{ p: 5 }}>
            <Typography
              sx={{
                fontSize: "40px",
                fontWeight: 500,
                lineHeight: "54px",
                textAlign: "center",
              }}
            >
              Quotation Pdfs
            </Typography>
          </Box>
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={10}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
            }}
            style={{
              "--swiper-navigation-color": "#000",
              "--swiper-navigation-size": "35px",
            }}
          >
            {Array.from({ length: 5 }).map((data) => (
              <SwiperSlide>
                <PDFViewer width={"100%"} height="1200px">
                  <PDFFile data={{}} key={"pdfFile"} />
                </PDFViewer>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Container>
      <Box sx={{ bgcolor: "#000000", width: "100%" }}>
        <Box
          sx={{
            width: "90%",
            m: "auto",
            display: "flex",
            justifyContent: "center",
            p: 2,
          }}
        >
          <Typography sx={{ color: "white", fontSize: "18px" }}>
            © 2024 | All rights reserved.
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default CustomizeLandingPage;
