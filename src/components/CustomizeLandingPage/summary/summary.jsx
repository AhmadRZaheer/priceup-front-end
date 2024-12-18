import { EstimateCategory } from "@/utilities/constants";
import {
  Box,
  Divider,
  Grid,
  Typography,
  Stack,
  Container,
  Card,
} from "@mui/material";
import React, { useState } from "react";
import Bulb from "../../../Assets/CustomerLandingImages/blubImg.png";
import CustomImage from "../../../Assets/customlayoutimage.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import MultipleImageUpload from "../MultipleImageUpload";
import { useSelector } from "react-redux";
import { getListData } from "@/redux/estimateCalculations";
import MenuList from "./MenuListOption";
import { backendURL } from "@/utilities/common";

const arr = [1, 2];

const ShowerSummary = ({ data, quoteNumber }) => {
  const listData = useSelector(getListData);
  const [images, setImages] = useState([]);
  const imageData = data?.image !== null ? `${backendURL}/${data?.image}` : null;
  const [selectedGlassType,setSelectedGlassType] = useState();
  return (
    <>
      <Box
        sx={{
          borderRadius: { sm: "12px", xs: 0 },
          boxShadow:
            "0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)",
          border: {
            sm: " 1px solid rgba(212, 219, 223, 1)",
            xs: "none",
          },
          overflow: { sm: "hidden" },
        }}
      >
        <Box
          sx={{
            background: "rgba(243, 245, 246, 1)",
            color: "black",
            paddingY: 2,
            px: 3,
            display: { sm: "flex", xs: "none" },
            borderBottom: "1px solid rgba(212, 219, 223, 1)",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 700,
              fontFamily: '"Roboto", sans-serif !important',
            }}
          >
            Layout & Measurement
          </Typography>
        </Box>
        <Box
          sx={{
            background: "white",
            color: "black",
            p: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 4,
              width: "100%",
            }}
          >
            <Box
              sx={{
                width: "50%",
                mt: 3,
              }}
            >
              <Typography
                sx={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  mb: 1.5,
                }}
              >
                Layout Dimensions:
              </Typography>
              <Stack gap={2}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography className="text-xs-ragular-bold" sx={{}}>
                    Dimensions
                  </Typography>
                  <Typography className="text-xs-ragular">
                    {data?.measurements}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography className="text-xs-ragular-bold">
                    Layout:
                  </Typography>
                  <Typography className="text-xs-ragular">
                    {data?.layout}
                  </Typography>
                </Box>
                {data?.doorWidth ? (
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography className="text-xs-ragular-bold">
                      Door Width:
                    </Typography>
                    <Typography className="text-xs-ragular">
                      {data?.doorWidth}
                    </Typography>
                  </Box>
                ) : (
                  ""
                )}
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography className="text-xs-ragular-bold">
                    Square Foot:
                  </Typography>
                  <Typography className="text-xs-ragular">
                    {data?.sqftArea}
                  </Typography>
                </Box>
                {/* {![undefined].includes(selectedData?.settings?.variant) && ( */}
                {/* <Box>
                    <Typography className="text-xs-ragular-bold">
                      Door Weight:
                    </Typography>
                    <Typography className="text-xs-ragular"> */}
                {/* {doorWeight} */}
                {/* </Typography>
                  </Box> */}
                {/* )} */}
                {/* {![
                  layoutVariants.DOOR,
                  layoutVariants.DOUBLEBARN,
                  layoutVariants.DOUBLEDOOR,
                ].includes(selectedData?.settings?.variant) && ( */}
                {/* <Box>
                    <Typography className="text-xs-ragular-bold">
                      Panel Weight:
                    </Typography>
                    <Typography className="text-xs-ragular"> */}
                {/* {panelWeight} */}
                {/* </Typography>
                  </Box> */}
                <Box>
                  <Divider sx={{ borderColor: "#D4DBDF" }} />
                  <Box
                    sx={{
                      mt: 2,
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography className="text-xs-ragular-bold">
                      Total Price:
                    </Typography>
                    <Typography className="text-xs-ragular">
                      ${data?.pricing?.totalPrice?.toFixed(2) || 0}
                    </Typography>
                  </Box>
                </Box>
                {/* )} */}
              </Stack>
              {/* <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontWeight: "bold" }}>Dimensions:</Typography>
                <Typography>{data?.quote?.measurements}33</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontWeight: "bold" }}>
                  Square Foot:
                </Typography>
                <Typography>{data?.quote?.sqftArea ?? 0}</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontWeight: "bold" }}>Total:</Typography>
                <Typography>
                  ${data?.quote?.cost?.toFixed(2) || "0.00"}
                </Typography>
              </Box> */}
            </Box>
            <Box
              sx={{
                width: "40%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  py: 1,
                }}
              >
                <img
                  src={ imageData ?? CustomImage}
                  alt="not"
                  style={{ height: "320px" }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ width: "100%", display: "flex", gap: 3, mt: 2 }}>
        <Box
          sx={{
            width: "50%",
            paddingBottom: { sm: 0, xs: "80px" },
          }}
        >
          <Box
            sx={{
              borderRadius: "12px",
              overflow: "hidden",
              border: "1px solid #D0D5DD",
              backgroundColor: "white",
              color: "black",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            }}
          >
            <Box
              sx={{
                px: 3,
                py: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 700,
                  lineHeight: "16.41px",
                  fontFamily: '"Roboto", sans-serif !important',
                  color: "",
                }}
              >
                Quotation
                {/* {quoteNumber} */}
              </Typography>
            </Box>
            <Divider sx={{ borderColor: "#D4DBDF" }} />
            <Box sx={{ backgroundColor: "#F3F5F6", px: 3, py: 2 }}>
              <Grid container>
                {/* {Columns[0].active && ( */}
                <Grid item md={7} className="text-xs-samibold">
                  Dimensions
                </Grid>
                <Grid item md={5} className="text-xs-samibold">
                  Summary
                </Grid>
                {/* <Grid item md={4} className="text-xs-samibold">
              Pricing Subcategories
            </Grid> */}
              </Grid>
            </Box>
            <Divider sx={{ borderColor: "#D4DBDF" }} />
            <Box sx={{ px: 3, py: "15px" }}>
              <Grid container spacing={2}>
                <Grid item md={7}>
                  <Stack gap={2}>
                    <Typography
                      className="text-xs-samibold"
                      sx={{ display: { sm: "none", xs: "block" } }}
                    >
                      Dimensions
                    </Typography>
                    <Typography className="text-xs-ragular">
                      {data?.measurements}
                    </Typography>
                    <Box>
                      <Typography className="text-xs-ragular-bold">
                        Layout:
                      </Typography>
                      <Typography className="text-xs-ragular">
                        {data?.layout}
                      </Typography>
                    </Box>
                    {data?.doorWidth ? (
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          Door Width:
                        </Typography>
                        <Typography className="text-xs-ragular">
                          {data?.doorWidth}
                        </Typography>
                      </Box>
                    ) : (
                      ""
                    )}
                    <Box>
                      <Typography className="text-xs-ragular-bold">
                        Square Foot:
                      </Typography>
                      <Typography className="text-xs-ragular">
                        {data?.sqftArea}
                      </Typography>
                    </Box>
                    {/* {![undefined].includes(selectedData?.settings?.variant) && ( */}
                    {/* <Box>
                    <Typography className="text-xs-ragular-bold">
                      Door Weight:
                    </Typography>
                    <Typography className="text-xs-ragular"> */}
                    {/* {doorWeight} */}
                    {/* </Typography>
                  </Box> */}
                    {/* )} */}
                    {/* {![
                  layoutVariants.DOOR,
                  layoutVariants.DOUBLEBARN,
                  layoutVariants.DOUBLEDOOR,
                ].includes(selectedData?.settings?.variant) && ( */}
                    {/* <Box>
                    <Typography className="text-xs-ragular-bold">
                      Panel Weight:
                    </Typography>
                    <Typography className="text-xs-ragular"> */}
                    {/* {panelWeight} */}
                    {/* </Typography>
                  </Box> */}
                    <Box sx={{ width: "60%" }}>
                      <Divider sx={{ borderColor: "#D4DBDF" }} />
                      <Box
                        sx={{
                          mt: 1.5,
                        }}
                      >
                        <Typography
                          className="text-xs-ragular-bold"
                          sx={{ color: "#8477DA", fontSize: "20px !important" }}
                        >
                          Total Price:
                        </Typography>
                        <Typography
                          className="text-xs-ragular"
                          sx={{
                            color: "#8477DA",
                            fontSize: "20px !important",
                            pt: 1,
                          }}
                        >
                          ${data?.pricing?.totalPrice?.toFixed(2) || 0}
                        </Typography>
                      </Box>
                    </Box>
                    {/* )} */}
                  </Stack>
                </Grid>
                <Grid item md={5}>
                  <Stack gap={2}>
                    <Typography
                      className="text-xs-samibold"
                      sx={{ display: { sm: "none", xs: "block" } }}
                    >
                      Summary
                    </Typography>
                    {data?.hardwareFinish && (
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          Finish:
                        </Typography>
                        <Typography className="text-xs-ragular">
                          {data?.hardwareFinish}
                        </Typography>
                      </Box>
                    )}
                    {data?.handle?.type && (
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          Handles:
                        </Typography>
                        <Typography className="text-xs-ragular">
                          {data?.handle?.type} ({data?.handle?.count})
                        </Typography>
                      </Box>
                    )}
                    {data?.hinge?.type && (
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          Hinges:
                        </Typography>
                        <Typography className="text-xs-ragular">
                          {data?.hinge?.type} ({data?.hinge?.count})
                        </Typography>
                      </Box>
                    )}
                    {data?.doorLock?.type && (
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          Door Lock:
                        </Typography>
                        <Typography className="text-xs-ragular">
                          {data?.doorLock?.type} ({data?.doorLock?.count})
                        </Typography>
                      </Box>
                    )}

                    {data?.mountingChannel !== "" &&
                    data?.mountingChannel !== null ? (
                      <>
                        {data?.mountingChannel && (
                          <Box>
                            <Typography className="text-xs-ragular-bold">
                              Channel:
                            </Typography>
                            <Typography className="text-xs-ragular">
                              {data?.mountingChannel}
                            </Typography>
                          </Box>
                        )}{" "}
                      </>
                    ) : (
                      <>
                        {" "}
                        {data?.mountingClamps?.wallClamp?.length ? (
                          <Box>
                            <Typography className="text-xs-ragular-bold">
                              WallClamps:{" "}
                            </Typography>
                            {data?.mountingClamps?.wallClamp?.map((row) => (
                              <Typography className="text-xs-ragular">
                                {row.type} ({row.count}){" "}
                              </Typography>
                            ))}
                          </Box>
                        ) : (
                          ""
                        )}
                        {data?.mountingClamps?.sleeveOver?.length ? (
                          <Box>
                            <Typography className="text-xs-ragular-bold">
                              Sleeve Over:{" "}
                            </Typography>
                            {data?.mountingClamps?.sleeveOver?.map((row) => (
                              <Typography className="text-xs-ragular">
                                {row.type} ({row.count}){" "}
                              </Typography>
                            ))}
                          </Box>
                        ) : (
                          ""
                        )}
                        {data?.mountingClamps?.glassToGlass?.length ? (
                          <Box>
                            <Typography className="text-xs-ragular-bold">
                              Glass To Glass:{" "}
                            </Typography>
                            {data?.mountingClamps?.glassToGlass?.map((row) => (
                              <Typography className="text-xs-ragular">
                                {row.type} ({row.count}){" "}
                              </Typography>
                            ))}
                          </Box>
                        ) : (
                          ""
                        )}{" "}
                      </>
                    )}
                    {data?.cornerClamps?.wallClamp?.length ? (
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          Corner WallClamp:{" "}
                        </Typography>
                        {data?.cornerClamps?.wallClamp?.map((row) => (
                          <Typography className="text-xs-ragular">
                            {row.type} ({row.count}){" "}
                          </Typography>
                        ))}
                      </Box>
                    ) : (
                      ""
                    )}
                    {data?.cornerClamps?.sleeveOver?.length ? (
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          Corner Sleeve Over:{" "}
                        </Typography>
                        {data?.cornerClamps?.sleeveOver?.map((row) => (
                          <Typography className="text-xs-ragular">
                            {row.type} ({row.count}){" "}
                          </Typography>
                        ))}
                      </Box>
                    ) : (
                      ""
                    )}
                    {data?.cornerClamps?.glassToGlass?.length ? (
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          Corner Glass To Glass:{" "}
                        </Typography>
                        {data?.cornerClamps?.glassToGlass?.map((row) => (
                          <Typography className="text-xs-ragular">
                            {row.type} ({row.count}){" "}
                          </Typography>
                        ))}
                      </Box>
                    ) : (
                      ""
                    )}
                    {data?.glassType?.type && (
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          Glass Type:
                        </Typography>
                        <Typography className="text-xs-ragular">
                          {data?.glassType?.type} ({data?.glassType?.thickness})
                        </Typography>
                      </Box>
                    )}
                    {data?.edgeWork?.type && (
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          Edge Work:
                        </Typography>
                        <Typography className="text-xs-ragular">
                          {data?.edgeWork?.type} ({data?.edgeWork?.thickness})
                        </Typography>
                      </Box>
                    )}
                    {data?.slidingDoorSystem?.type && (
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          Sliding Door System:
                        </Typography>
                        <Typography className="text-xs-ragular">
                          {data?.slidingDoorSystem?.type} (
                          {data?.slidingDoorSystem?.count})
                        </Typography>
                      </Box>
                    )}
                    {data?.transom && (
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          Transom:{" "}
                        </Typography>
                        <Typography className="text-xs-ragular"></Typography>
                      </Box>
                    )}
                    {data?.header?.type && (
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          Header:
                        </Typography>
                        <Typography className="text-xs-ragular">
                          {data?.header?.type} ({data?.header?.count})
                        </Typography>
                      </Box>
                    )}
                    {data?.glassAddons?.length ? (
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          Glass Addons:
                        </Typography>
                        {data?.glassAddons?.map((item) => (
                          <Typography className="text-xs-ragular">{`${item} `}</Typography>
                        ))}
                      </Box>
                    ) : (
                      ""
                    )}
                    {data?.hardwareAddons?.length > 0 && (
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          {data?.category === EstimateCategory?.MIRRORS
                            ? "Hardwares:"
                            : "Add ons:"}
                        </Typography>
                        <Typography className="text-xs-ragular">
                          {data?.hardwareAddons?.map(
                            (row) => ` ${row?.type} (${row?.count}),`
                          )}{" "}
                        </Typography>
                      </Box>
                    )}
                    <Box
                      sx={{
                        display: "flex",
                        textAlign: "baseline",
                        gap: 0.6,
                      }}
                    >
                      <Typography className="text-xs-ragular-bold">
                        People:{" "}
                      </Typography>
                      <Typography className="text-xs-ragular">
                        {data?.people}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        textAlign: "baseline",
                        gap: 0.6,
                      }}
                    >
                      <Typography className="text-xs-ragular-bold">
                        {data?.category === EstimateCategory.WINECELLARS
                          ? "Hours for layout"
                          : "Hours"}{" "}
                        :{" "}
                      </Typography>
                      <Typography className="text-xs-ragular">
                        {data?.hours}
                      </Typography>
                    </Box>
                    {data?.category === EstimateCategory.WINECELLARS && (
                      <Box
                        sx={{
                          display: "flex",
                          textAlign: "baseline",
                          gap: 0.6,
                        }}
                      >
                        <Typography className="text-xs-ragular-bold">
                          Hours for door:{" "}
                        </Typography>
                        <Typography className="text-xs-ragular">
                          {data?.laborHoursForDoor}
                        </Typography>
                      </Box>
                    )}
                  </Stack>
                </Grid>
                {/* <Grid item md={4}>
                <Stack gap={2}>
                  <Typography
                    className="text-xs-samibold"
                    sx={{ display: { sm: "none", xs: "block" } }}
                  >
                    Pricing Subcategories
                  </Typography>
                  <Box>
                    <Typography className="text-xs-ragular-bold">
                      Hardware Price:
                    </Typography>
                    <Typography className="text-xs-ragular">
                      ${data?.pricing?.hardwarePrice?.toFixed(2) || 0}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography className="text-xs-ragular-bold">
                      Glass Price:
                    </Typography>
                    <Typography className="text-xs-ragular">
                      ${data?.pricing?.glassPrice?.toFixed(2) || 0}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography className="text-xs-ragular-bold">
                      Glass Addons Price:
                    </Typography>
                    <Typography className="text-xs-ragular">
                      ${data?.pricing?.glassAddonPrice?.toFixed(2) || 0}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography className="text-xs-ragular-bold">
                      Fabrication Price:
                    </Typography>
                    <Typography className="text-xs-ragular">
                      ${data?.pricing?.fabricationPrice?.toFixed(2) || 0}
                    </Typography>
                  </Box> */}
                {/* <Box>
                  <Typography className="text-xs-ragular-bold">
                    Hardware Addons Price:
                  </Typography>
                  <Typography className="text-xs-ragular">
                    ${data?.hardwareAddonsPrice?.toFixed(2) || 0}
                  </Typography>
                </Box> */}
                {/* <Box>
                    <Typography className="text-xs-ragular-bold">
                      {data?.category === EstimateCategory.WINECELLARS
                        ? "Layout Labor Price"
                        : "Labor Price"}{" "}
                      :
                    </Typography>
                    <Typography className="text-xs-ragular">
                      ${data?.pricing?.laborPrice?.toFixed(2) || 0}
                    </Typography>
                  </Box>
                  {data?.category === EstimateCategory.WINECELLARS && (
                    <Box>
                      <Typography className="text-xs-ragular-bold">
                        Door Labor Price:
                      </Typography>
                      <Typography className="text-xs-ragular">
                        ${data?.pricing?.doorLaborPrice?.toFixed(2) || 0}
                      </Typography>
                    </Box>
                  )}
                </Stack>
              </Grid> */}
              </Grid>
            </Box>
          </Box>
        </Box>
        <Box sx={{ width: "50%", pt: 4 }}>
          <Typography
            sx={{
              fontFamily: '"Poppins" !important',
              fontSize: "32px",
              fontWeight: 600,
              lineHeight: "35px",
              width: "80%",
            }}
          >
            <Box component="span" sx={{ color: "#F95500" }}>
              Recommended
            </Box>{" "}
            Modifications from our experts:
          </Typography>
          <Box sx={{pt:2}}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                py: "6px",
              }}
            >
              <Box
                sx={{ width: "80%", background: "white", borderRadius: "11px" }}
              >
                <MenuList
                  menuOptions={listData?.glassAddons}
                  title={"Glass Addons"}
                  type={"glassAddons"}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                py: "6px",
              }}
            >
              <Box
                sx={{ width: "80%", background: "white", borderRadius: "11px" }}
              >
                <MenuList
                  menuOptions={listData?.hardwareAddons}
                  title={"Hardware Addons"}
                  type={"hardwareAddons"}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                py: "6px",
              }}
            >
              <Box
                sx={{ width: "80%", background: "white", borderRadius: "11px" }}
              >
                <MenuList
                  menuOptions={listData?.glassType}
                  title={" Glass type"}
                  type={"glassType"}
                  // thickness={selectedContent.glassType.thickness}
                  // currentItem={selectedContent?.glassType?.item}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      {images.length > 0 ? (
        <Box>
          <Box sx={{ display: "flex", py: 4, justifyContent: "center" }}>
            <img src={Bulb} alt="not" style={{ height: "50px" }} />
            <Typography
              sx={{
                fontFamily: '"Poppins" !important',
                fontSize: "32px",
                fontWeight: 600,
                lineHeight: "35px",
                alignSelf: "end",
                borderBottom: "1px solid #F95500",
              }}
            >
              <Box component="span" sx={{ color: "#F95500" }}>
                Similar
              </Box>{" "}
              projects that we’ve worked on:
            </Typography>
          </Box>
          <Container>
            {" "}
            <Swiper
              modules={[Navigation]}
              navigation
              spaceBetween={10}
              slidesPerView={3}
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
                // height: "500px", // Add height for the swiper container
              }}
            >
              {images.length > 0 ? (
                images.map((data, index) => (
                  <SwiperSlide key={index}>
                    <Card sx={{}}>
                      <img
                        src={data}
                        alt="not"
                        style={{ height: "400px", width: "300px" }}
                      />
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
          </Container>
        </Box>
      ) : (
        <Box sx={{ pt: 4 }}>
          <MultipleImageUpload images={images} setImages={setImages} />
        </Box>
      )}
    </>
  );
};

export default ShowerSummary;
