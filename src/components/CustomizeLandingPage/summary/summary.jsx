import {
  EstimateCategory,
  hardwareTypes,
  logActions,
  quoteState,
} from "@/utilities/constants";
import {
  Box,
  Divider,
  Grid,
  Typography,
  Stack,
  Container,
  Card,
  Button,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import Bulb from "../../../Assets/CustomerLandingImages/blubImg.png";
import CustomImage from "@/Assets/customlayoutimage.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import MultipleImageUpload from "../MultipleImageUpload";
import { useDispatch, useSelector } from "react-redux";
import { getContent, getListData } from "@/redux/estimateCalculations";
import MenuList from "./MenuListOption";
import { backendURL, calculateDiscount, calculateTotal as calculateTotalForShower } from "@/utilities/common";
import { getLocationShowerSettings } from "@/redux/locationSlice";
import { getHardwareSpecificFabrication as getShowersHardwareSpecificFabrication } from "@/utilities/hardwarefabrication";
import { getHardwareSpecificFabrication as getWineCellarHardwareSpecificFabrication } from "@/utilities/WineCellarEstimate";
import {
  useCreateDocument,
  useEditDocument,
} from "@/utilities/ApiHooks/common";
import { useParams } from "react-router-dom";
import "../style.scss";
import { renderMeasurementSides as renderShowerMeasurementSides } from "@/utilities/estimates";
import { calculateTotal as calculateTotalForMirror, renderMeasurementSides as renderMirrorMeasurementSides } from "@/utilities/mirrorEstimates";
import { setContent, setCounter, setEstimateTotal } from "@/redux/customerEstimateCalculation";

const arr = [1, 2];

const ShowerSummary = ({
  refetchData,
  totalPrice,
  setTotalPrice,
  data,
  hardwaresList,
  locationSettings,
  UpgradeOPtions,
  reCalculateTotal,
}) => {
  console.log(data, "datadatadata123");
  const { id } = useParams();
  const dispatch = useDispatch();
  const userProfitPercentage =
    data?.category === EstimateCategory.MIRRORS
      ? data?.content?.modifiedProfitPercentage
      : data?.content?.userProfitPercentage;
  const [totalCost, setTotalCost] = useState(data?.totalPrice ?? 0);
  const newDate = new Date();
  const formattedDateTime = newDate.toLocaleString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  const discountValue = data?.content?.discount?.value ?? 0;
  const discountUnit = data?.content?.discount?.unit ?? "%";
  const laborPrice =
    data?.category === EstimateCategory.WINECELLARS
      ? data?.pricing?.laborPrice + (data?.pricing?.doorLaborPrice ?? 0)
      : data?.pricing?.laborPrice;
  // const hardwaresList = useSelector(getListData);
  const { mutate: customerDecision, isLoading, isSuccess } = useEditDocument();
  const { mutate: activityLog } = useCreateDocument();
  const [images, setImages] = useState([]);
  const imageData = data?.selectedItem?.settings !== null ? `${backendURL}/${data?.selectedItem?.settings?.image}` : null;

  const [selectedHardware, setSelectedHardware] = useState(null);
  const [fabricationsCount, setFabricationsCount] = useState({
    oneInchHoles: 0,
    hingeCut: 0,
    clampCut: 0,
    notch: 0,
    outages: 0,
  });
  const factorPrice =
    data?.category === EstimateCategory.MIRRORS
      ? locationSettings?.pricingFactorStatus
        ? locationSettings?.pricingFactor
        : 1
      : locationSettings?.miscPricing?.pricingFactorStatus
        ? locationSettings?.miscPricing?.pricingFactor
        : 1;

  // useEffect(() => {
  //   if (data) {
  //     if (data?.category === EstimateCategory.MIRRORS) {
  //       setSelectedHardware({
  //         ...data,
  //         glassType: {
  //           ...data.glassType,
  //           thickness: data?.glassType?.thickness ?? "1/4",
  //         },
  //       });
  //     } else {
  //       setSelectedHardware(data);
  //     }
  //   }
  // }, [data]);
  const glasstypeList = useMemo(() => {
    const upgradeGlassList =
      hardwaresList?.glassType
        ?.filter((obj) => UpgradeOPtions?.glassTypes?.includes(obj._id) && obj.options.some(
          (option) =>
            option.thickness === data?.content?.glassType?.thickness &&
            option.status === true
        ))
      // ?.filter((obj) =>
      //   obj.options.some(
      //     (option) =>
      //       option.thickness === data?.content?.glassType?.thickness &&
      //       option.status === true
      //   )
      // )
      ?? [];
    if (
      upgradeGlassList?.length === 0 ||
      !upgradeGlassList?.some((glass) => glass._id === data?.content?.glassType?.item?._id)
    ) {
      const item = hardwaresList?.glassType?.find(
        (item) => item._id === data?.content?.glassType?.item?._id
      );
      if (item) {
        upgradeGlassList.push(item);
      }
    }
    const glassTypedata = upgradeGlassList?.map((item) => {
      const price = item?.options?.find(
        (option) => option.thickness === data?.content?.glassType?.thickness
      )?.cost;
      // const itemPrice = (data?.sqftArea * price ?? 0) * factorPrice;
      const costDifference =
        upgradeGlassList
          ?.filter((item) => item._id === data?.content?.glassType?.item?._id)
          ?.map((item) =>
            item?.options?.find(
              (option) =>
                option.thickness === data?.content?.glassType?.thickness
            )
          )
          ?.find((option) => option)?.cost || 0;

      // let totalDiference =
      //   itemPrice -
      //   (selectedHardware?.sqftArea * costDifference ?? 0) * factorPrice;

      const currentItemCost =
        totalCost -
        data?.sqftArea * costDifference +
        data?.sqftArea * price;
      let singleItemCost = currentItemCost * factorPrice + laborPrice;

      if (userProfitPercentage > 0 && userProfitPercentage < 100) {
        singleItemCost =
          ((currentItemCost * 100) / (userProfitPercentage - 100)) * -1;
      }
      const itemDifference = singleItemCost - totalPrice;
      const singleGlassCost =
        discountValue > 0 && discountUnit === "%"
          ? itemDifference - (itemDifference * Number(discountValue)) / 100
          : itemDifference;

      return {
        ...item,
        modifiedName: (
          <span>
            {item?._id === data?.content?.glassType?.item?._id ? (
              item?.name
            ) : (
              <>
                {item?.name} cost{" "}
                <b style={{ color: singleGlassCost > 0 ? "#28A745" : "red" }}>
                  {singleGlassCost > 0 ? "+" : "-"} $
                  {Math.abs(singleGlassCost ?? 0).toFixed(2)}
                </b>
              </>
            )}
          </span>
        ),
      };
    });
    return glassTypedata ?? [];
  }, [data?.content?.glassType, hardwaresList?.glassType, UpgradeOPtions]);

  const glassAddonsList = useMemo(() => {
    const upgradeGlassAddonsList =
      hardwaresList?.glassAddons
        ?.filter((obj) => UpgradeOPtions?.glassAddons?.includes(obj._id) && obj.options.some((option) => option.status === true))
        // ?.filter((obj) =>
        //   obj.options.some((option) => option.status === true)
        // ) 
        ?? [];

    if (data?.category !== EstimateCategory.MIRRORS) {
      const noTreatment = hardwaresList?.glassAddons?.find(
        (item) => item?.slug === "no-treatment"
      );
      if (
        noTreatment &&
        !upgradeGlassAddonsList?.some((addon) => addon._id === noTreatment._id)
      ) {
        upgradeGlassAddonsList.push(noTreatment);
      }
    }

    data?.content?.glassAddons?.forEach((glassAddon) => {
      if (
        upgradeGlassAddonsList?.length === 0 ||
        !upgradeGlassAddonsList.some((addon) => addon._id === glassAddon?._id)
      ) {
        const item = hardwaresList?.glassAddons?.find(
          (item) => item._id === glassAddon?._id
        );
        if (item) {
          upgradeGlassAddonsList.push(item);
        }
      }
    });

    const glassAddonsData = upgradeGlassAddonsList?.map((item) => {
      const price = item?.options?.[0]?.cost;
      const costDifference =
        data?.content?.glassAddons
          ?.map((addon) => {
            const matchedItem = upgradeGlassAddonsList?.find(
              (firstItem) => firstItem._id === addon?._id
            );
            if (matchedItem && matchedItem.options?.length > 0) {
              return matchedItem.options[0].cost;
            }
            return null;
          })
          ?.filter((cost) => cost !== null) ?? [];
      const priceToDiffer = costDifference?.reduce((acc, arr) => acc + arr, 0);

      let totalItemPrice =
        data?.sqftArea *
        (item?.slug !== "no-treatment" ? price : priceToDiffer * -1) ?? 0;
      let itemPrice = totalItemPrice * factorPrice;

      if (userProfitPercentage > 0 && userProfitPercentage < 100) {
        itemPrice =
          ((totalItemPrice * 100) / (userProfitPercentage - 100)) * -1;
      }

      const singleGlassAddonCost =
        discountValue > 0 && discountUnit === "%"
          ? itemPrice - (itemPrice * Number(discountValue)) / 100
          : itemPrice;

      return {
        ...item,
        modifiedName: (
          <span>
            {data?.content?.glassAddons?.some(
              (hardware) => hardware?.type === item._id
            ) ? (
              item?.name
            ) : (
              <>
                {item?.name} cost{" "}
                <b
                  style={{
                    color: singleGlassAddonCost > 0 ? "#28A745" : "red",
                  }}
                >
                  {singleGlassAddonCost > 0 ? "+" : "-"} $
                  {Math.abs(singleGlassAddonCost ?? 0).toFixed(2)}
                </b>
              </>
            )}
          </span>
        ),
      };
    });
    return glassAddonsData ?? [];
  }, [data?.content?.glassAddons, hardwaresList?.glassAddons, UpgradeOPtions]);

  // useEffect(() => {
  //   if (data) {
  //     let fabrication = {
  //       oneInchHoles: 0,
  //       hingeCut: 0,
  //       clampCut: 0,
  //       notch: 0,
  //       outages: 0,
  //     };
  //     data?.hardwareAddons?.forEach((item) => {
  //       const record = hardwaresList?.hardwareAddons?.find(
  //         (_item) => _item._id === item.type
  //       );
  //       if (record && record._id === item.type) {
  //         if (data?.category === EstimateCategory.SHOWERS) {
  //           fabrication.oneInchHoles +=
  //             record.oneInchHoles * (item.count ?? 0) ?? 0;
  //           fabrication.hingeCut += record.hingeCut * (item.count ?? 0) ?? 0;
  //           fabrication.clampCut += record.clampCut * (item.count ?? 0) ?? 0;
  //           fabrication.notch += record.notch * (item.count ?? 0) ?? 0;
  //           fabrication.outages += record.outages ?? 0;
  //         } else if (data?.category === EstimateCategory.WINECELLARS) {
  //           fabrication.oneInchHoles +=
  //             record?.fabrication?.oneInchHoles * (item.count ?? 0) ?? 0;
  //           fabrication.hingeCut +=
  //             record?.fabrication?.hingeCut * (item.count ?? 0) ?? 0;
  //           fabrication.clampCut +=
  //             record?.fabrication?.clampCut * (item.count ?? 0) ?? 0;
  //           fabrication.notch +=
  //             record?.fabrication?.notch * (item.count ?? 0) ?? 0;
  //           fabrication.outages +=
  //             record?.fabrication?.outages * (item.count ?? 0) ?? 0;
  //         }
  //       }
  //     });
  //     setFabricationsCount(fabrication);
  //   }
  // }, [data]);
  // const [totalPrice, setTotalPrice] = useState(data?.pricing?.totalPrice);

  // const handleChangeHardware = (type, value) => {
  //   const pricingFactor =
  //     data?.category === EstimateCategory.MIRRORS
  //       ? locationSettings?.pricingFactor
  //       : locationSettings?.miscPricing?.pricingFactor;
  //   const pricingFactorStatus =
  //     data?.category === EstimateCategory.MIRRORS
  //       ? locationSettings?.pricingFactorStatus
  //       : locationSettings?.miscPricing?.pricingFactorStatus;
  //   const laborPrice =
  //     data?.category === EstimateCategory.WINECELLARS
  //       ? data?.pricing?.laborPrice + (data?.pricing?.doorLaborPrice ?? 0)
  //       : data?.pricing?.laborPrice;
  //   if (type === "glassType") {
  //     const oldGlassPrice = getCostByThickness(
  //       selectedHardware?.glassType,
  //       selectedHardware?.glassType?.thickness
  //     );
  //     const newGlassPrice = getCostByThickness(
  //       {
  //         type: value?._id,
  //         name: value?.name,
  //         thickness: selectedHardware?.glassType?.thickness,
  //       },
  //       selectedHardware?.glassType?.thickness
  //     );

  //     const calc =
  //       (totalPrice - laborPrice) / (pricingFactorStatus ? pricingFactor : 1) -
  //       oldGlassPrice * data?.sqftArea;
  //     const glassPricing =
  //       data?.sqftArea !== 0
  //         ? (calc + data?.sqftArea * newGlassPrice) *
  //             (pricingFactorStatus ? pricingFactor : 1) +
  //           laborPrice
  //         : 0;

  //     const costOfItem =
  //       totalCost -
  //       oldGlassPrice * data?.sqftArea +
  //       data?.sqftArea * newGlassPrice;
  //     let costOfItems =
  //       costOfItem * (pricingFactorStatus ? pricingFactor : 1) + laborPrice ??
  //       0;

  //     if (userProfitPercentage > 0 && userProfitPercentage < 100) {
  //       costOfItems = ((costOfItem * 100) / (userProfitPercentage - 100)) * -1;
  //     }
  //     reCalculateTotal(totalPrice, glassPricing);
  //     setTotalPrice(costOfItems);
  //     setTotalCost(costOfItem);
  //     setSelectedHardware((prev) => ({
  //       ...prev,
  //       glassType: {
  //         type: value?._id,
  //         name: value?.name,
  //         thickness: selectedHardware?.glassType?.thickness,
  //       },
  //     }));
  //   } else if (type === "glassAddons") {
  //     const itemFound = hardwaresList.glassAddons?.find(
  //       (item) => item._id === value?._id
  //     );
  //     const actualCost =
  //       (totalPrice - laborPrice) / (pricingFactorStatus ? pricingFactor : 1);
  //     if (itemFound?.slug === "no-treatment") {
  //       const priceToRemove = getGlassAddonsCost(selectedHardware?.glassAddons);
  //       const remainingCost = actualCost - priceToRemove;
  //       const newGeneratedTotal =
  //         remainingCost * (pricingFactorStatus ? pricingFactor : 1) +
  //         laborPrice;

  //       const remainingCost11 = totalCost - priceToRemove;
  //       let newGeneratedTotal11 =
  //         remainingCost11 * (pricingFactorStatus ? pricingFactor : 1) +
  //         laborPrice;
  //       if (userProfitPercentage > 0 && userProfitPercentage < 100) {
  //         newGeneratedTotal11 =
  //           ((remainingCost11 * 100) / (userProfitPercentage - 100)) * -1;
  //       }
  //       reCalculateTotal(totalPrice, newGeneratedTotal);
  //       setTotalPrice(newGeneratedTotal11);
  //       setTotalCost(remainingCost11);
  //       setSelectedHardware((prev) => ({
  //         ...prev,
  //         glassAddons: [{ type: itemFound?._id, name: itemFound?.name }],
  //       }));
  //     } else {
  //       if (
  //         itemFound &&
  //         selectedHardware?.glassAddons?.some(
  //           (item) => item.type === itemFound?._id
  //         )
  //       ) {
  //         const arrayFilter = selectedHardware?.glassAddons?.filter(
  //           (item) => item.type !== itemFound?._id
  //         );
  //         const priceToRemove = getGlassAddonsCost(
  //           selectedHardware?.glassAddons
  //         );
  //         if (
  //           arrayFilter?.length > 0 ||
  //           data?.category === EstimateCategory.MIRRORS
  //         ) {
  //           const remainingCost = actualCost - priceToRemove;
  //           const priceToAdd = getGlassAddonsCost(arrayFilter);
  //           const remainingCost2 = remainingCost + priceToAdd;
  //           const newGeneratedTotal =
  //             remainingCost2 * (pricingFactorStatus ? pricingFactor : 1) +
  //             laborPrice;

  //           const remainingCost21 = totalCost - priceToRemove;
  //           const remainingCost22 = remainingCost21 + priceToAdd;
  //           let newGeneratedTotal11 =
  //             remainingCost22 * (pricingFactorStatus ? pricingFactor : 1) +
  //             laborPrice;
  //           if (userProfitPercentage > 0 && userProfitPercentage < 100) {
  //             newGeneratedTotal11 =
  //               ((remainingCost22 * 100) / (userProfitPercentage - 100)) * -1;
  //           }

  //           reCalculateTotal(totalPrice, newGeneratedTotal);
  //           setTotalCost(remainingCost22);
  //           setTotalPrice(newGeneratedTotal11);
  //           setSelectedHardware((prev) => ({
  //             ...prev,
  //             glassAddons: arrayFilter,
  //           }));
  //         } else {
  //           // set no-treatment
  //           const noTreatment = hardwaresList?.glassAddons?.find(
  //             (row) => row.slug === "no-treatment"
  //           );
  //           if (noTreatment) {
  //             const remainingCost = actualCost - priceToRemove;
  //             const newGeneratedTotal =
  //               remainingCost * (pricingFactorStatus ? pricingFactor : 1) +
  //               laborPrice;

  //             const remainingCost22 = totalCost - priceToRemove;
  //             let newGeneratedTotal21 =
  //               remainingCost22 * (pricingFactorStatus ? pricingFactor : 1) +
  //               laborPrice;
  //             if (userProfitPercentage > 0 && userProfitPercentage < 100) {
  //               newGeneratedTotal21 =
  //                 ((remainingCost22 * 100) / (userProfitPercentage - 100)) * -1;
  //             }

  //             reCalculateTotal(totalPrice, newGeneratedTotal);
  //             setTotalPrice(newGeneratedTotal21);
  //             setTotalCost(remainingCost22);
  //             setSelectedHardware((prev) => ({
  //               ...prev,
  //               glassAddons: [
  //                 { type: noTreatment?._id, name: noTreatment?.name },
  //               ],
  //             }));
  //           }
  //         }
  //       } else {
  //         const noTreatment = hardwaresList?.glassAddons?.find(
  //           (row) => row.slug === "no-treatment"
  //         );
  //         const arrayOld = selectedHardware?.glassAddons?.filter(
  //           (item) => item.type !== noTreatment?._id
  //         );
  //         arrayOld.push({ type: value?._id, name: value?.name });
  //         const priceToRemove = getGlassAddonsCost(
  //           selectedHardware?.glassAddons
  //         );
  //         const remainingCost = actualCost - priceToRemove;
  //         const priceToAdd = getGlassAddonsCost(arrayOld);
  //         const remainingCost2 = remainingCost + priceToAdd;
  //         const newGeneratedTotal =
  //           remainingCost2 * (pricingFactorStatus ? pricingFactor : 1) +
  //           laborPrice;

  //         const remainingCost23 = totalCost - priceToRemove;
  //         const remainingCost24 = remainingCost23 + priceToAdd;
  //         let newGeneratedTotal22 =
  //           remainingCost24 * (pricingFactorStatus ? pricingFactor : 1) +
  //           laborPrice;
  //         if (userProfitPercentage > 0 && userProfitPercentage < 100) {
  //           newGeneratedTotal22 =
  //             ((remainingCost24 * 100) / (userProfitPercentage - 100)) * -1;
  //         }

  //         reCalculateTotal(totalPrice, newGeneratedTotal);
  //         setTotalPrice(newGeneratedTotal22);
  //         setTotalCost(remainingCost24);
  //         setSelectedHardware((prev) => ({
  //           ...prev,
  //           glassAddons: arrayOld,
  //         }));
  //       }
  //     }
  //   } else if (type === "hardwareAddons") {
  //     const fabricationCounter =
  //       data?.category === EstimateCategory.SHOWERS
  //         ? getShowersHardwareSpecificFabrication
  //         : getWineCellarHardwareSpecificFabrication;

  //     const itemExistIndex = selectedHardware?.hardwareAddons?.findIndex(
  //       (item) => item.type === value?.item?._id
  //     );
  //     const actualCost =
  //       (totalPrice - laborPrice) / (pricingFactorStatus ? pricingFactor : 1);
  //     const addonsPriceToRemove = getHardwareAddonsCost(
  //       selectedHardware?.hardwareAddons
  //     );
  //     const fabricationPriceToRemove = getFabricationsCost(fabricationsCount);
  //     const remainingCost =
  //       actualCost - (addonsPriceToRemove + fabricationPriceToRemove);

  //     const remainingTotalCost =
  //       totalCost - (addonsPriceToRemove + fabricationPriceToRemove);
  //     if (itemExistIndex !== -1) {
  //       if (value.counter > 0) {
  //         const array = selectedHardware?.hardwareAddons;
  //         const hardwareFabrication = fabricationCounter(
  //           type,
  //           fabricationsCount,
  //           { item: value?.item, count: array[itemExistIndex].count },
  //           { item: value?.item, count: value.counter }
  //         );
  //         array[itemExistIndex].count = value.counter;
  //         const addonsPriceToAdd = getHardwareAddonsCost(array);
  //         const fabricationPriceToAdd =
  //           getFabricationsCost(hardwareFabrication);
  //         const remainingCost2 =
  //           remainingCost + (addonsPriceToAdd + fabricationPriceToAdd);
  //         const newGeneratedTotal =
  //           remainingCost2 * (pricingFactorStatus ? pricingFactor : 1) +
  //           laborPrice;

  //         const remainingTotalCost2 =
  //           remainingTotalCost + (addonsPriceToAdd + fabricationPriceToAdd);
  //         let newGeneratedTotal2 =
  //           remainingTotalCost2 * (pricingFactorStatus ? pricingFactor : 1) +
  //           laborPrice;
  //         if (userProfitPercentage > 0 && userProfitPercentage < 100) {
  //           newGeneratedTotal2 =
  //             ((remainingTotalCost2 * 100) / (userProfitPercentage - 100)) * -1;
  //         }

  //         reCalculateTotal(totalPrice, newGeneratedTotal);
  //         setTotalPrice(newGeneratedTotal2);
  //         setTotalCost(remainingTotalCost2);
  //         setFabricationsCount(hardwareFabrication);
  //         setSelectedHardware((prev) => ({
  //           ...prev,
  //           hardwareAddons: array,
  //         }));
  //       } else {
  //         const hardwareFabrication = fabricationCounter(
  //           type,
  //           fabricationsCount,
  //           {
  //             item: value?.item,
  //             count: selectedHardware?.hardwareAddons[itemExistIndex].count,
  //           },
  //           null
  //         );
  //         const array = selectedHardware?.hardwareAddons?.filter(
  //           (_item) => _item.type !== value?.item?._id
  //         );
  //         const addonsPriceToAdd = getHardwareAddonsCost(array);
  //         const fabricationPriceToAdd =
  //           getFabricationsCost(hardwareFabrication);
  //         const remainingCost2 =
  //           remainingCost + (addonsPriceToAdd + fabricationPriceToAdd);
  //         const newGeneratedTotal =
  //           remainingCost2 * (pricingFactorStatus ? pricingFactor : 1) +
  //           laborPrice;

  //         const remainingTotalCost2 =
  //           remainingTotalCost + (addonsPriceToAdd + fabricationPriceToAdd);
  //         let newGeneratedTotal2 =
  //           remainingTotalCost2 * (pricingFactorStatus ? pricingFactor : 1) +
  //           laborPrice;
  //         if (userProfitPercentage > 0 && userProfitPercentage < 100) {
  //           newGeneratedTotal2 =
  //             ((remainingTotalCost2 * 100) / (userProfitPercentage - 100)) * -1;
  //         }

  //         reCalculateTotal(totalPrice, newGeneratedTotal);
  //         setTotalPrice(newGeneratedTotal2);
  //         setTotalCost(remainingTotalCost2);
  //         setFabricationsCount(hardwareFabrication);
  //         setSelectedHardware((prev) => ({
  //           ...prev,
  //           hardwareAddons: array,
  //         }));
  //       }
  //     } else {
  //       const hardwareFabrication = fabricationCounter(
  //         type,
  //         fabricationsCount,
  //         null,
  //         { item: value?.item, count: value.counter }
  //       );
  //       const array = selectedHardware?.hardwareAddons;
  //       array.push({
  //         type: value?.item?._id,
  //         name: value?.item?.name,
  //         count: value.counter,
  //       });
  //       const addonsPriceToAdd = getHardwareAddonsCost(array);
  //       const fabricationPriceToAdd = getFabricationsCost(hardwareFabrication);
  //       const remainingCost2 =
  //         remainingCost + (addonsPriceToAdd + fabricationPriceToAdd);
  //       const newGeneratedTotal =
  //         remainingCost2 * (pricingFactorStatus ? pricingFactor : 1) +
  //         laborPrice;

  //       const remainingTotalCost2 =
  //         remainingTotalCost + (addonsPriceToAdd + fabricationPriceToAdd);
  //       let newGeneratedTotal2 =
  //         remainingTotalCost2 * (pricingFactorStatus ? pricingFactor : 1) +
  //         laborPrice;
  //       if (userProfitPercentage > 0 && userProfitPercentage < 100) {
  //         newGeneratedTotal2 =
  //           ((remainingTotalCost2 * 100) / (userProfitPercentage - 100)) * -1;
  //       }

  //       reCalculateTotal(totalPrice, newGeneratedTotal);
  //       setTotalPrice(newGeneratedTotal2);
  //       setTotalCost(remainingTotalCost2);
  //       setFabricationsCount(hardwareFabrication);
  //       setSelectedHardware((prev) => ({
  //         ...prev,
  //         hardwareAddons: array,
  //       }));
  //     }
  //   }
  // };
  // const getCostByThickness = (item) => {
  //   const glassType = hardwaresList?.glassType.find(
  //     (_item) => _item?._id === item.type
  //   );
  //   if (glassType) {
  //     const option = glassType.options.find(
  //       (_item) => _item.thickness === item.thickness
  //     );
  //     return option?.cost ?? 0;
  //   }
  //   return 0; // Return null if no matching thickness is found
  // };
  // const getGlassAddonsCost = (items) => {
  //   let glassAddonsPrice = 0;
  //   items?.forEach((_item) => {
  //     const fullItem = hardwaresList?.glassAddons?.find(
  //       (glassAddon) => glassAddon?._id === _item.type
  //     );
  //     let price = 0;
  //     if (fullItem?.options?.length) {
  //       price = fullItem?.options[0]?.cost || 0;
  //     }
  //     glassAddonsPrice = glassAddonsPrice + price * data?.sqftArea;
  //   });
  //   return glassAddonsPrice;
  // };
  // const getHardwareAddonsCost = (items) => {
  //   let hardwareAddonsPrice = 0;
  //   items?.forEach((row) => {
  //     const fullItem = hardwaresList?.hardwareAddons?.find(
  //       (_hardwareAddon) => _hardwareAddon?._id === row.type
  //     );
  //     let price = 0;
  //     if (fullItem) {
  //       price =
  //         fullItem?.finishes?.find(
  //           (finish) =>
  //             finish?.finish_id === selectedHardware?.hardwareFinish?.type
  //         )?.cost || 0;
  //     }
  //     hardwareAddonsPrice = hardwareAddonsPrice + price * row?.count;
  //   });
  //   return hardwareAddonsPrice;
  // };

  const getFabricationsCost = (selectedFabrication) => {
    let fabricationPrice = 0;
    if (selectedHardware?.glassType?.thickness === "1/2") {
      fabricationPrice =
        Number(selectedFabrication?.oneInchHoles ?? 0) *
        (locationSettings?.fabricatingPricing?.oneHoleOneByTwoInchGlass ??
          0) +
        Number(selectedFabrication?.hingeCut ?? 0) *
        (locationSettings?.fabricatingPricing?.hingeCutoutOneByTwoInch ?? 0) +
        Number(selectedFabrication?.clampCut ?? 0) *
        (locationSettings?.fabricatingPricing?.clampCutoutOneByTwoInch ?? 0) +
        Number(selectedFabrication?.notch ?? 0) *
        (locationSettings?.fabricatingPricing?.notchOneByTwoInch ?? 0) +
        Number(selectedFabrication?.outages ?? 0) *
        (locationSettings?.fabricatingPricing?.outageOneByTwoInch ?? 0) +
        Number(selectedFabrication?.mitre ?? 0) *
        (locationSettings?.fabricatingPricing?.miterOneByTwoInch ?? 0) +
        Number(selectedFabrication?.polish ?? 0) *
        (locationSettings?.fabricatingPricing?.polishPricePerOneByTwoInch ??
          0);
    } else if (selectedHardware?.glassType?.thickness === "3/8") {
      fabricationPrice =
        Number(selectedFabrication?.oneInchHoles ?? 0) *
        (locationSettings?.fabricatingPricing?.oneHoleThreeByEightInchGlass ??
          0) +
        Number(selectedFabrication?.hingeCut ?? 0) *
        (locationSettings?.fabricatingPricing?.hingeCutoutThreeByEightInch ??
          0) +
        Number(selectedFabrication?.clampCut ?? 0) *
        (locationSettings?.fabricatingPricing?.clampCutoutThreeByEightInch ??
          0) +
        Number(selectedFabrication?.notch ?? 0) *
        (locationSettings?.fabricatingPricing?.notchThreeByEightInch ?? 0) +
        Number(selectedFabrication?.outages ?? 0) *
        (locationSettings?.fabricatingPricing?.outageThreeByEightInch ?? 0) +
        Number(selectedFabrication?.mitre ?? 0) *
        (locationSettings?.fabricatingPricing?.miterThreeByEightInch ?? 0) +
        Number(selectedFabrication?.polish ?? 0) *
        (locationSettings?.fabricatingPricing
          ?.polishPricePerThreeByEightInch ?? 0);
    }
    return fabricationPrice;
  };
  const handleChangeHardware = (type, value) => {
    if (type === hardwareTypes.HARDWAREADDONS) {
      const item = { ...value.item };
      if ('modifiedName' in item) delete item.modifiedName;
      dispatch(setCounter({ type, item, counter: value.counter, estimateId: data?.selectedItem?._id }));
    } else {
      const item = { ...value };
      if ('modifiedName' in item) delete item.modifiedName;
      dispatch(setContent({ type, item, hardwaresList, estimateId: data?.selectedItem?._id }));
    }
  }
  const handleApprove = () => {
    let Estimatedata = {
      ...selectedHardware,
      pricing: { ...selectedHardware.pricing, totalPrice: totalPrice },
      status: "approve",
    };
    Estimatedata.config.cost = totalPrice;
    if (selectedHardware?.glassType) {
      Estimatedata.config.config.glassType = {
        type: selectedHardware.glassType.type,
        thickness: selectedHardware.glassType.thickness,
      };
    }
    let selectedGlassAddons = [];
    selectedHardware.glassAddons.forEach((item) =>
      selectedGlassAddons.push(item.type)
    );
    Estimatedata.config.config.glassAddons = selectedGlassAddons;

    if (data?.category !== EstimateCategory.MIRRORS) {
      let selectedHardwareAddons = [];
      selectedHardware.hardwareAddons.forEach((item) =>
        selectedHardwareAddons.push({ type: item.type, count: item.count })
      );
      Estimatedata.config.config.hardwareAddons = selectedHardwareAddons;
      Estimatedata.config.config.oneInchHoles = fabricationsCount.oneInchHoles;
      Estimatedata.config.config.hingeCut = fabricationsCount.hingeCut;
      Estimatedata.config.config.clampCut = fabricationsCount.clampCut;
      Estimatedata.config.config.notch = fabricationsCount.notch;
      Estimatedata.config.config.outages = fabricationsCount.outages;

      Estimatedata.oneInchHoles = fabricationsCount.oneInchHoles;
      Estimatedata.hingeCut = fabricationsCount.hingeCut;
      Estimatedata.clampCut = fabricationsCount.clampCut;
      Estimatedata.notch = fabricationsCount.notch;
      Estimatedata.outages = fabricationsCount.outages;
    }

    customerDecision({
      data: {
        approveEstimate: Estimatedata,
      },
      apiRoute: `${backendURL}/landing-page-preview/${id}`,
    });

    const logData = {
      title: `${data?.customerData?.name} approved the project on ${formattedDateTime}.`,
      performer_id: data?.customerData?._id,
      performer_name: data?.customerData?.name,
      action: logActions.APPROVEESTIMATE,
      resource_id: id,
      company_id: data?.customerData?.company_id,
    };
    activityLog({
      data: logData,
      apiRoute: `${backendURL}/logs/save`,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      refetchData();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (data && data?.category === EstimateCategory.SHOWERS || data?.category === EstimateCategory.WINECELLARS) {
      const prices = calculateTotalForShower(
        data?.content,
        data?.sqftArea,
        locationSettings
      );
      dispatch(setEstimateTotal({ prices, estimateId: data?.selectedItem?._id, category: data?.category }));
    } else if (data && data?.category === EstimateCategory.MIRRORS) {
      const prices = calculateTotalForMirror(
        data?.content,
        data?.sqftArea,
        locationSettings,
        data?.measurements
      );
      dispatch(setEstimateTotal({ prices, estimateId: data?.selectedItem?._id, category: data?.category }));
    }
  }, [data?.content])

  const hardwareAddonsList = useMemo(() => {
    const upgradeHardwareAddonList =
      hardwaresList?.hardwareAddons
        ?.filter((obj) => UpgradeOPtions?.hardwareAddons?.includes(obj._id) && obj.finishes.some(
          (option) =>
            option.finish_id === data?.content?.hardwareFinishes?._id &&
            option.status === true
        ))
        // ?.filter((obj) =>
        //   obj.finishes.some(
        //     (option) =>
        //       option.finish_id === data?.content?.hardwareFinishes?._id &&
        //       option.status === true
        //   )
        // ) 
        ?? [];
    data?.content?.hardwareAddons?.forEach((data) => {
      // Check if upgradeHardwareAddonList is empty
      if (
        upgradeHardwareAddonList?.length === 0 ||
        !upgradeHardwareAddonList.some((addon) => addon._id === data?.item?._id)
      ) {
        const item = hardwaresList?.hardwareAddons?.find(
          (item) => item._id === data?.item?._id
        );
        if (item) {
          upgradeHardwareAddonList.push(item);
        }
      }
    });

    const glassAddonsData = upgradeHardwareAddonList?.map((item) => {
      const price = item?.finishes?.find(
        (option) => option.finish_id === data?.content?.hardwareFinishes?._id
      )?.cost;

      let fabricationsCount = {};
      if (data?.category === EstimateCategory.SHOWERS) {
        fabricationsCount.oneInchHoles = item?.oneInchHoles || 0;
        fabricationsCount.hingeCut = item?.hingeCut || 0;
        fabricationsCount.clampCut = item?.clampCut || 0;
        fabricationsCount.notch = item?.notch || 0;
        fabricationsCount.outages = item?.outages || 0;
      } else if (data?.category === EstimateCategory.WINECELLARS) {
        fabricationsCount = item?.fabrication;
      }
      const fabricationPrice = getFabricationsCost(fabricationsCount);
      let itemPrice = (price + fabricationPrice) * factorPrice;

      if (userProfitPercentage > 0 && userProfitPercentage < 100) {
        itemPrice =
          (((price + fabricationPrice) * 100) / (userProfitPercentage - 100)) *
          -1;
      }

      const singleGlassAddonCost =
        discountValue > 0 && discountUnit === "%"
          ? itemPrice - (itemPrice * Number(discountValue)) / 100
          : itemPrice;
      return {
        ...item,
        modifiedName: (
          <span>
            {item?.name} cost{" "}
            <b style={{ color: "#28A745" }}>
              {"+"} ${Math.abs(singleGlassAddonCost ?? 0).toFixed(2)}
            </b>
          </span>
        ),
      };
    });
    return glassAddonsData ?? [];
  }, [data?.content?.hardwareAddons, hardwaresList?.hardwareAddons]);
  const renderDimensions = data?.category === EstimateCategory.SHOWERS || data?.category === EstimateCategory.WINECELLARS ? renderShowerMeasurementSides : data?.category === EstimateCategory.MIRRORS ? renderMirrorMeasurementSides : () => { };
  return (
    <>
      <Box
        sx={{
          borderRadius: { sm: "14px", xs: 0 },
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
            paddingY: "17px",
            px: 3,
            display: { sm: "flex", xs: "none" },
            borderBottom: "1px solid rgba(212, 219, 223, 1)",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: "16.34px",
              fontWeight: 700,
              fontFamily: '"Roboto", sans-serif !important',
              lineHeight: "24.51px",
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
                    {renderDimensions(quoteState.EDIT, data?.measurements, data?.selectedItem?.config?.layout_id)}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography className="text-xs-ragular-bold">
                    Layout:
                  </Typography>
                  <Typography className="text-xs-ragular">
                    {data?.selectedItem?.settings?.name ?? 'Custom'}
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
                {discountValue > 0 && (
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography className="text-xs-ragular-bold">
                        Sub Total:
                      </Typography>
                      <Typography className="text-xs-ragular">
                        $ {(totalPrice ?? 0)?.toFixed(2)}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography className="text-xs-ragular-bold">
                        Discount:
                      </Typography>
                      <Typography className="text-xs-ragular">
                        {data?.content?.discount?.unit === "$" && "$"}{" "}
                        {discountValue}{" "}
                        {data?.content?.discount?.unit === "%" && "%"}
                      </Typography>
                    </Box>
                  </>
                )}

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
                      ${(data?.totalPrice ?? 0).toFixed(2)}
                      {/* {calculateDiscount(
                        totalPrice,
                        discountValue,
                        data?.content?.discount?.unit
                      ).toFixed(2)} */}
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
                Estimate Details
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
                      {renderDimensions(quoteState.EDIT, data?.measurements, data?.selectedItem?.config?.layout_id)}
                    </Typography>
                    <Box>
                      <Typography className="text-xs-ragular-bold">
                        Layout:
                      </Typography>
                      <Typography className="text-xs-ragular">
                        {data?.selectedItem?.settings?.name ?? 'Custom'}
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
                          sx={{
                            color: "#F95500",
                            fontSize: "20px !important",
                            fontWeight: "bold !important",
                          }}
                        >
                          Total Price:
                        </Typography>
                        <Typography
                          className="text-xs-ragular"
                          sx={{
                            color: discountValue > 0 ? "#BFBFBD" : "#F95500",
                            fontSize:
                              discountValue > 0
                                ? "17px !important"
                                : "20px !important",
                            pt: 1,
                            fontWeight: "bold !important",
                            textDecoration:
                              discountValue > 0 ? "line-through" : "auto",
                          }}
                        >
                          $ {(data?.totalPrice ?? 0)?.toFixed(2)}
                        </Typography>
                        {discountValue > 0 && (
                          <Typography
                            className="text-xs-ragular"
                            sx={{
                              color: "#F95500",
                              fontSize: "20px !important",
                              pt: 1,
                              fontWeight: "bold !important",
                            }}
                          >
                            $
                            {calculateDiscount(
                              totalPrice,
                              discountValue,
                              data?.config?.config?.discount?.unit
                            ).toFixed(2)}
                          </Typography>
                        )}
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
                    {data?.content?.hardwareFinishes && (
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          Finish:
                        </Typography>
                        <Typography className="text-xs-ragular">
                          {data?.content?.hardwareFinishes?.name}
                        </Typography>
                      </Box>
                    )}
                    {data?.content?.handles?.item && (
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          Handles:
                        </Typography>
                        <Typography className="text-xs-ragular">
                          {data?.content?.handles?.item?.name} ({data?.content?.handles?.count})
                        </Typography>
                      </Box>
                    )}
                    {data?.content?.hinges?.item && (
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          Hinges:
                        </Typography>
                        <Typography className="text-xs-ragular">
                          {data?.content?.hinges?.item?.name} ({data?.content?.hinges?.count})
                        </Typography>
                      </Box>
                    )}
                    {data?.content?.doorLock?.item && (
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          Door Lock:
                        </Typography>
                        <Typography className="text-xs-ragular">
                          {data?.content?.doorLock?.item?.name} ({data?.content?.doorLock?.count})
                        </Typography>
                      </Box>
                    )}

                    {["channel"].includes(data?.content?.mountingState) && data?.content?.mountingChannel?.item ? (
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          Channel:
                        </Typography>
                        <Typography className="text-xs-ragular">
                          {data?.content?.mountingChannel?.item?.name}
                        </Typography>
                      </Box>
                    ) : (
                      <>
                        {" "}
                        {data?.content?.mountingClamps?.wallClamp?.length ? (
                          <Box>
                            <Typography className="text-xs-ragular-bold">
                              WallClamps:{" "}
                            </Typography>
                            {data?.content?.mountingClamps?.wallClamp?.map((row) => (
                              <Typography className="text-xs-ragular">
                                {row.name} ({row.count}){" "}
                              </Typography>
                            ))}
                          </Box>
                        ) : (
                          ""
                        )}
                        {data?.content?.mountingClamps?.sleeveOver?.length ? (
                          <Box>
                            <Typography className="text-xs-ragular-bold">
                              Sleeve Over:{" "}
                            </Typography>
                            {data?.content?.mountingClamps?.sleeveOver?.map((row) => (
                              <Typography className="text-xs-ragular">
                                {row.name} ({row.count}){" "}
                              </Typography>
                            ))}
                          </Box>
                        ) : (
                          ""
                        )}
                        {data?.content?.mountingClamps?.glassToGlass?.length ? (
                          <Box>
                            <Typography className="text-xs-ragular-bold">
                              Glass To Glass:{" "}
                            </Typography>
                            {data?.content?.mountingClamps?.glassToGlass?.map((row) => (
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
                    {data?.content?.cornerClamps?.wallClamp?.length ? (
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          Corner WallClamp:{" "}
                        </Typography>
                        {data?.content?.cornerClamps?.wallClamp?.map((row) => (
                          <Typography className="text-xs-ragular">
                            {row.name} ({row.count}){" "}
                          </Typography>
                        ))}
                      </Box>
                    ) : (
                      ""
                    )}
                    {data?.content?.cornerClamps?.sleeveOver?.length ? (
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          Corner Sleeve Over:{" "}
                        </Typography>
                        {data?.content?.cornerClamps?.sleeveOver?.map((row) => (
                          <Typography className="text-xs-ragular">
                            {row.name} ({row.count}){" "}
                          </Typography>
                        ))}
                      </Box>
                    ) : (
                      ""
                    )}
                    {data?.content?.cornerClamps?.glassToGlass?.length ? (
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          Corner Glass To Glass:{" "}
                        </Typography>
                        {data?.content?.cornerClamps?.glassToGlass?.map((row) => (
                          <Typography className="text-xs-ragular">
                            {row.name} ({row.count}){" "}
                          </Typography>
                        ))}
                      </Box>
                    ) : (
                      ""
                    )}
                    {data?.content?.glassType?.item && (
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          Glass Type:
                        </Typography>
                        <Typography className="text-xs-ragular">
                          {data?.content?.glassType?.item?.name} (
                          {data?.content?.glassType?.thickness})
                        </Typography>
                      </Box>
                    )}
                    {data?.content?.edgeWork?.item && (
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          Edge Work:
                        </Typography>
                        <Typography className="text-xs-ragular">
                          {data?.content?.edgeWork?.item?.name} ({data?.content?.edgeWork?.thickness})
                        </Typography>
                      </Box>
                    )}
                    {data?.content?.slidingDoorSystem?.item && (
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          Sliding Door System:
                        </Typography>
                        <Typography className="text-xs-ragular">
                          {data?.content?.slidingDoorSystem?.item?.name} (
                          {data?.content?.slidingDoorSystem?.count})
                        </Typography>
                      </Box>
                    )}
                    {data?.content?.transom && (
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          Transom:{" "}
                        </Typography>
                        <Typography className="text-xs-ragular"></Typography>
                      </Box>
                    )}
                    {data?.content?.header?.item && (
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          Header:
                        </Typography>
                        <Typography className="text-xs-ragular">
                          {data?.content?.header?.item?.name} ({data?.content?.header?.count})
                        </Typography>
                      </Box>
                    )}
                    {data?.content?.glassAddons?.length > 0 ? (
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          Glass Addons:
                        </Typography>
                        {data?.content?.glassAddons?.map((item, index) => (
                          <Typography key={index} className="text-xs-ragular">
                            {item?.name},
                          </Typography>
                        ))}
                      </Box>
                    ) : (
                      ""
                    )}
                    {data?.content?.hardwareAddons?.length > 0 && (
                      <Box>
                        <Typography className="text-xs-ragular-bold">
                          {data?.category === EstimateCategory?.MIRRORS
                            ? "Hardwares:"
                            : "Add ons:"}
                        </Typography>
                        <Typography className="text-xs-ragular">
                          {data?.content?.hardwareAddons?.map(
                            (row) => ` ${row?.item?.name} (${row?.count}),`
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
                        {data?.content?.people}
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
                        {data?.content?.hours}
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
                          {data?.content?.laborHoursForDoor}
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
          {data?.status !== "approve" && (
            <Box sx={{ pt: 2 }}>
              <Button
                fullWidth
                variant="contained"
                disabled
                onClick={handleApprove}
                sx={{
                  backgroundColor: "#F95500",
                  color: "#0B0B0B",
                  height: "44px",
                  width: { sm: "100%", xs: "187px" },
                  "&:hover": { backgroundColor: "#F95500" },
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
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                  "I approve"
                )}
              </Button>
            </Box>
          )}
        </Box>
        <Box sx={{ width: "50%", pt: 1 }}>
          {(glassAddonsList?.length >
            (data?.category !== EstimateCategory.MIRRORS ? 1 : 0) ||
            hardwareAddonsList?.length > 0 ||
            glasstypeList?.length > 0) && (
              <Typography
                sx={{
                  fontFamily: '"Poppins" !important',
                  fontSize: "32px",
                  fontWeight: 600,
                  lineHeight: "35px",
                  width: "80%",
                }}
              >
                {/* <Box component="span" sx={{ color: "#F95500" }}>
              Recommended
            </Box>{" "} */}
                Available Upgrades:
              </Typography>
            )}

          <Box sx={{ pt: 1 }}>
            {glassAddonsList?.length >
              (data?.category !== EstimateCategory.MIRRORS ? 1 : 0) && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    py: "6px",
                  }}
                >
                  <Box
                    sx={{
                      width: "80%",
                      background: "white",
                      borderRadius: "11px",
                      pointerEvents: data?.status === "approve" ? "none" : "auto", // Disable interaction
                      opacity: data?.status === "approve" ? 0.5 : 1,
                    }}
                  >
                    <MenuList
                      menuOptions={glassAddonsList ?? []}
                      title={"Glass Addons"}
                      type={"glassAddons"}
                      selectedContent={data?.content}
                      handleChange={handleChangeHardware}
                    // selectedContent={}
                    />
                  </Box>
                </Box>
              )}
            {[EstimateCategory.SHOWERS, EstimateCategory.WINECELLARS].includes(
              data?.category
            ) &&
              hardwareAddonsList?.length > 0 && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    py: "6px",
                  }}
                >
                  <Box
                    sx={{
                      width: "80%",
                      background: "white",
                      borderRadius: "11px",
                      pointerEvents:
                        data?.status === "approve" ? "none" : "auto", // Disable interaction
                      opacity: data?.status === "approve" ? 0.5 : 1,
                    }}
                  >
                    <MenuList
                      menuOptions={hardwareAddonsList ?? []}
                      title={"Hardware Addons"}
                      type={"hardwareAddons"}
                      selectedContent={data?.content}
                      handleChange={handleChangeHardware}
                    />
                  </Box>
                </Box>
              )}
            {glasstypeList?.length > 0 && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  py: "6px",
                }}
              >
                <Box
                  sx={{
                    width: "80%",
                    background: "white",
                    borderRadius: "11px",
                    pointerEvents: data?.status === "approve" ? "none" : "auto", // Disable interaction
                    opacity: data?.status === "approve" ? 0.5 : 1,
                  }}
                >
                  <MenuList
                    menuOptions={glasstypeList ?? []}
                    title={"Glass type"}
                    type={"glassType"}
                    thickness={data?.content?.glassType?.thickness}
                    currentItem={data?.content?.glassType?.item}
                    selectedContent={data?.content}
                    locationSettings={locationSettings}
                    handleChange={handleChangeHardware}
                  />
                </Box>
              </Box>
            )}
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
          <Container sx={{ px: "0px !important" }}>
            <Swiper
              modules={[Navigation]}
              navigation
              spaceBetween={20}
              slidesPerView={3}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
              }}
              style={{
                "--swiper-navigation-color": "#fff !important",
                "--swiper-pagination-color": "#fff !important",
                "--swiper-navigation-size": "28px",
                paddingLeft: "40px",
                paddingRight: "40px",
              }}
            >
              {data?.gallery?.length > 0 ? (
                data?.gallery.map((data, index) => (
                  <SwiperSlide key={index}>
                    <Card sx={{}}>
                      <img
                        src={`${backendURL}/${data}`}
                        alt="not"
                        style={{
                          height: "400px",
                          width: "100%",
                          objectFit: "fill",
                        }}
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
