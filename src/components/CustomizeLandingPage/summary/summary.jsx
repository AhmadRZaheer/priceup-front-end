import { EstimateCategory } from "@/utilities/constants";
import {
  Box,
  Divider,
  Grid,
  Typography,
  Stack,
  Container,
  Card,
  Button,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import Bulb from "../../../Assets/CustomerLandingImages/blubImg.png";
import CustomImage from "../../../Assets/customlayoutimage.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import MultipleImageUpload from "../MultipleImageUpload";
import { useSelector } from "react-redux";
import { getContent, getListData } from "@/redux/estimateCalculations";
import MenuList from "./MenuListOption";
import { backendURL } from "@/utilities/common";
import { getLocationShowerSettings } from "@/redux/locationSlice";
import { getHardwareSpecificFabrication as getShowersHardwareSpecificFabrication } from "@/utilities/hardwarefabrication";
import { getHardwareSpecificFabrication as getWineCellarHardwareSpecificFabrication } from "@/utilities/WineCellarEstimate";

const arr = [1, 2];

const ShowerSummary = ({ data, hardwaresList }) => {
  const showersLocationSettings = useSelector(getLocationShowerSettings);
  const selectedContent = useSelector(getContent);
  console.log(data, "asdfghsdfghasdf");
  // const hardwaresList = useSelector(getListData);
  const [images, setImages] = useState([]);
  const imageData =
    data?.image !== null ? `${backendURL}/${data?.image}` : null;

  const [selectedHardware, setSelectedHardware] = useState(data);
  const [fabricationsCount,setFabricationsCount] = useState({
      oneInchHoles: 0,
      hingeCut: 0,
      clampCut: 0,
      notch: 0,
      outages: 0,
  });
  useEffect(()=>{
    if(data){
      let fabrication = {
        oneInchHoles: 0,
        hingeCut: 0,
        clampCut: 0,
        notch: 0,
        outages: 0,
      }
    data?.hardwareAddons?.forEach((item)=>{
      const record = hardwaresList?.hardwareAddons?.find((_item)=>_item._id === item.type);
      if(record){
        if(data?.category === EstimateCategory.SHOWERS){
         fabrication.oneInchHoles +=  record.oneInchHoles ?? 0;
         fabrication.hingeCut +=  record.hingeCut ?? 0;
         fabrication.clampCut +=  record.clampCut ?? 0;
         fabrication.notch +=  record.notch ?? 0;
         fabrication.outages +=  record.outages ?? 0;
        }else if(data?.category === EstimateCategory.WINECELLARS){
          fabrication.oneInchHoles +=  record?.fabrication?.oneInchHoles ?? 0;
          fabrication.hingeCut +=  record?.fabrication?.hingeCut ?? 0;
          fabrication.clampCut +=  record?.fabrication?.clampCut ?? 0;
          fabrication.notch +=  record?.fabrication?.notch ?? 0;
          fabrication.outages +=  record?.fabrication?.outages ?? 0;
        }
      }
    })
    setFabricationsCount(fabrication)
  }
  },[data]);
  const [selectedGlassType,setSelectedGlassType] = useState('');

  const handleChangeHardware = (type, value) => {
     if(type === 'glassType'){
      setSelectedHardware((prev) => ({
        ...prev,
        glassType: {type:value?._id,name:value?.name,thickness:selectedHardware?.glassType?.thickness},
      }));
      console.log(value,'glassType');
     }else if(type === 'glassAddons'){
      const itemFound = hardwaresList.glassAddons?.find((item)=>item._id === value?._id);
      if (itemFound?.slug === "no-treatment") {
        setSelectedHardware((prev) => ({
          ...prev,
          glassAddons: [{type:itemFound?._id,name:itemFound?.name}],
        }));
      } else {
       
        if (itemFound && selectedHardware?.glassAddons?.some(item => item.type === itemFound?._id)) {
          const arrayFilter = selectedHardware?.glassAddons?.filter((item)=>item.type !== itemFound?._id);
        console.log(itemFound,'item found',arrayFilter)
          if(arrayFilter?.length > 0){
            setSelectedHardware((prev) => ({
              ...prev,
              glassAddons: arrayFilter,
            }));
          }
          else{ // set no-treatment
            const noTreatment = hardwaresList?.glassAddons?.find(
              (row) => row.slug === "no-treatment"
            );
            if(noTreatment){
              setSelectedHardware((prev) => ({
                ...prev,
                glassAddons: [{type:noTreatment?._id,name:noTreatment?.name}],
              }));
            }
            
          }
        } else {
          const noTreatment = hardwaresList?.glassAddons?.find(
            (row) => row.slug === "no-treatment"
          );
          const arrayOld = selectedHardware?.glassAddons?.filter((item)=>item.type !== noTreatment?._id);
          arrayOld.push({type:value?._id,name:value?.name});
          setSelectedHardware((prev) => ({
            ...prev,
            glassAddons: arrayOld,
          }));
        }
       
      }
      console.log(value,'glassAddons');
     }else if(type === 'hardwareAddons'){
      const fabricationCounter = data?.category === EstimateCategory.SHOWERS ? getShowersHardwareSpecificFabrication : getWineCellarHardwareSpecificFabrication
      const itemExistIndex = selectedHardware?.hardwareAddons?.findIndex(item => item.type === value?.item?._id)
      if(itemExistIndex !== -1){
        if(value.counter > 0) {
            const array = selectedHardware?.hardwareAddons;
            const hardwareFabrication = fabricationCounter(
              type,
              fabricationsCount,
              {item:value?.item,count:array[itemExistIndex].count},
              {item:value?.item,count:value.counter}
            );
            array[itemExistIndex].count = value.counter;
            setFabricationsCount(hardwareFabrication);
            setSelectedHardware((prev) => ({
              ...prev,
              hardwareAddons: array,
            }));
        }else{
          const hardwareFabrication = fabricationCounter(
            type,
            fabricationsCount,
            {item:value?.item,count:selectedHardware?.hardwareAddons[itemExistIndex].count},
            null
          );
          setFabricationsCount(hardwareFabrication);
          const array = selectedHardware?.hardwareAddons?.filter((_item)=>_item.type !==  value?.item?._id);
          setSelectedHardware((prev) => ({
            ...prev,
            hardwareAddons: array,
          }));
        }
      }else{
        const hardwareFabrication = fabricationCounter(
          type,
          fabricationsCount,
          null,
          {item:value?.item,count:value.counter},
        );
        setFabricationsCount(hardwareFabrication);
        const array = selectedHardware?.hardwareAddons;
        array.push({type:value?.item?._id,name:value?.item?.name,count:value.counter});
        setSelectedHardware((prev) => ({
          ...prev,
          hardwareAddons: array,
        }));
      }
      console.log(value,'hardwareAddons')
     }
  }

  function getCostByThickness(data, selectedThickness) {
    const option = data?.options?.find(
      (opt) => opt.thickness === selectedThickness
    );
    if (option) {
      return {
        name: data.name, // Include the name from the parent object
        cost: option.cost,
      };
    }
    return null; // Return null if no matching thickness is found
  }

  const glassAddonsList = useMemo(() => {
    const result = selectedContent.glassAddons
      .map((item) =>
        item.options.map((option) => ({
          name: item.name,
          cost: option.cost,
        }))
      )
      .flat();
    return result ? result : [];
  }, [selectedContent.glassAddons]);

  const glassPrice = useMemo(() => {
    const price = getCostByThickness(
      selectedGlassType,
      data?.glassType?.thickness
    );
    const calc =
      (data?.pricing?.totalPrice - data?.pricing?.laborPrice) /
        showersLocationSettings?.miscPricing?.pricingFactor -
      data?.pricing?.glassPrice;

    const totalAmount =
      (calc + price?.cost * data?.sqftArea) *
        (showersLocationSettings?.miscPricing?.pricingFactorStatus
          ? showersLocationSettings?.miscPricing?.pricingFactor
          : 1) +
      data?.pricing?.laborPrice;

    return {
      cost: price?.cost * data?.sqftArea,
      name: price?.name,
      totalAmount,
    };
  }, [selectedGlassType]);

  // console.log(glassAddonsList, "glassPriceglassPrice");
  console.log(data?.category,'category',selectedHardware)
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
                      $
                      {isNaN(glassPrice?.totalAmount) ||
                      glassPrice?.totalAmount === null
                        ? (data?.pricing?.totalPrice ?? 0).toFixed(2)
                        : (glassPrice?.totalAmount ?? 0).toFixed(2)}
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
                  src={imageData ?? CustomImage}
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
                          $
                          {isNaN(glassPrice?.totalAmount) ||
                          glassPrice?.totalAmount === null
                            ? (data?.pricing?.totalPrice ?? 0).toFixed(2)
                            : (glassPrice?.totalAmount ?? 0).toFixed(2)}
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
                          {data?.hardwareFinish?.name}
                        </Typography>
                      </Box>
                    )}
                    {data?.handle?.type && (
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          Handles:
                        </Typography>
                        <Typography className="text-xs-ragular">
                          {data?.handle?.name} ({data?.handle?.count})
                        </Typography>
                      </Box>
                    )}
                    {data?.hinge?.type && (
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          Hinges:
                        </Typography>
                        <Typography className="text-xs-ragular">
                          {data?.hinge?.name} ({data?.hinge?.count})
                        </Typography>
                      </Box>
                    )}
                    {data?.doorLock?.type && (
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          Door Lock:
                        </Typography>
                        <Typography className="text-xs-ragular">
                          {data?.doorLock?.name} ({data?.doorLock?.count})
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
                              {data?.mountingChannel?.name}
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
                                {row.name} ({row.count}){" "}
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
                                {row.name} ({row.count}){" "}
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
                                {row.name} ({row.count}){" "}
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
                            {row.name} ({row.count}){" "}
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
                            {row.name} ({row.count}){" "}
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
                            {row.name} ({row.count}){" "}
                          </Typography>
                        ))}
                      </Box>
                    ) : (
                      ""
                    )}
                    {selectedHardware?.glassType?.type && (
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          Glass Type:
                        </Typography>
                        <Typography className="text-xs-ragular">
                          {selectedHardware?.glassType?.name} (
                          {data?.glassType?.thickness})
                        </Typography>
                      </Box>
                    )}
                    {data?.edgeWork?.type && (
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          Edge Work:
                        </Typography>
                        <Typography className="text-xs-ragular">
                          {data?.edgeWork?.name} ({data?.edgeWork?.thickness})
                        </Typography>
                      </Box>
                    )}
                    {data?.slidingDoorSystem?.type && (
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          Sliding Door System:
                        </Typography>
                        <Typography className="text-xs-ragular">
                          {data?.slidingDoorSystem?.name} (
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
                          {data?.header?.name} ({data?.header?.count})
                        </Typography>
                      </Box>
                    )}
                    {selectedHardware?.glassAddons?.length > 0 ? (
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          Glass Addons:
                        </Typography>
                        {(selectedHardware?.glassAddons
                        )?.map((item, index) => (
                          <Typography key={index} className="text-xs-ragular">
                            {item?.name},                         
                          </Typography>
                        ))}
                      </Box>
                    ) : (
                      ""
                    )}
                    {selectedHardware?.hardwareAddons?.length > 0 && (
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          {data?.category === EstimateCategory?.MIRRORS
                            ? "Hardwares:"
                            : "Add ons:"}
                        </Typography>
                        <Typography className="text-xs-ragular">
                          {selectedHardware?.hardwareAddons?.map(
                            (row) => ` ${row?.name} (${row?.count}),`
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
          <Box sx={{ pt: 2 }}>
            <Button
              fullWidth
              variant="contained"
              // onClick={handleOpenEditModal}
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
              I approve
            </Button>
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
          <Box sx={{ pt: 2 }}>
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
                  menuOptions={hardwaresList?.glassAddons}
                  title={"Glass Addons"}
                  type={"glassAddons"}
                  selectedContent={selectedHardware}
                  handleChange={handleChangeHardware}
                  // selectedContent={}
                />
              </Box>
            </Box>
            {[EstimateCategory.SHOWERS,EstimateCategory.WINECELLARS].includes(data?.category) && <Box
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
                  menuOptions={hardwaresList?.hardwareAddons}
                  title={"Hardware Addons"}
                  type={"hardwareAddons"}
                  selectedContent={selectedHardware}
                  handleChange={handleChangeHardware}
                />
              </Box>
            </Box>}
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
                  menuOptions={hardwaresList?.glassType}
                  title={"Glass type"}
                  type={"glassType"}
                  thickness={selectedHardware?.glassType?.thickness}
                  currentItem={selectedHardware?.glassType}
                  selectedContent={selectedHardware}
                  handleChange={handleChangeHardware}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      {data?.gallery?.length > 0 ? (
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
              {data?.gallery?.length > 0 ? (
                data?.gallery.map((data, index) => (
                  <SwiperSlide key={index}>
                    <Card sx={{}}>
                      <img
                        src={`${backendURL}/${data}`}
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
        ""
        // <Box sx={{ pt: 4 }}>
        //   <MultipleImageUpload images={images} setImages={setImages} />
        // </Box>
      )}
    </>
  );
};

export default ShowerSummary;
