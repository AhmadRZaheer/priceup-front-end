import { setEstimateCategory, setEstimateState } from "@/redux/estimateSlice";
import { EstimateCategory, mirrorHardwareTypes, notificationsVariant, quoteState } from "./constants";
import {
  resetMirrorEstimateState,
  resetNotifications,
  setEstimateMeasurements,
  setMirrorProjectId,
  setSelectedItem,
} from "@/redux/mirrorsEstimateSlice";

export const getAreaSqft = (measurements) => {
  let totalSqft = 0;
  let totalPerimeter = 0;

  Object.entries(measurements).forEach(([key, value]) => {
    const count = value["count"];
    const width = value["width"];
    const height = value["height"];
    for (let i = 0; i < count; i++) {
      const panel = calculatePanel(width, height);
      totalSqft += panel.sqft;
      totalPerimeter += panel.perimeter;
    }
  });

  return {
    areaSqft: Math.round((totalSqft + Number.EPSILON) * 100) / 100,
    perimeter: totalPerimeter,
  };
};

const calculatePanel = (width, height) => {
  let panelWidth = (width || 0) * 2;
  let panelHeight = (height || 0) * 2;
  let panelSqft = ((width || 0) * (height || 0)) / 144;
  panelSqft = Math.round((panelSqft + Number.EPSILON) * 100) / 100;
  let panelPerimeter = panelWidth + panelHeight;
  return { sqft: panelSqft, perimeter: panelPerimeter };
};

export const getSandBlasting = (measurements, sandBlastingMultiplier) => {
  let totalSandBalsting = 0;

  Object.entries(measurements).forEach(([key, value]) => {
    const count = value["count"];
    const width = value["width"];
    const height = value["height"];
    for (let i = 0; i < count; i++) {
      const value = ((width * height) / 144) * sandBlastingMultiplier;
      totalSandBalsting += value;
    }
  });
  return totalSandBalsting;
};

export const renderMeasurementSides = (measurements) => {
  let result = "";
  Object.entries(measurements).forEach(([key, value]) => {
    const { count, width, height } = value;

    // Iterate until the count value of the current element is reached
    for (let i = 1; i <= count; i++) {
      result += `${width}'' / ${height}'' `;
      // Perform any other operations with the current element and count value

      if (i === count) {
        break; // Exit the loop when the count value is reached
      }
    }
  });
  return result;
};

const getFloatingPrice = (size, mirrorLocationSettings) => {
  switch (size) {
    case "Small":
      return mirrorLocationSettings.floatingSmall;
    case "Medium":
      return mirrorLocationSettings.floatingMedium;
    case "Large":
      return mirrorLocationSettings.floatingLarge;
    default:
      return 0;
  }
};

export const calculateTotal = (
  selectedContent,
  sqftArea,
  mirrorLocationSettings,
  measurements
) => {
  //glass
  let glassPrice = 0;
  if (selectedContent.glassType?.item) {
    glassPrice =
      (selectedContent?.glassType?.item?.options?.find(
        (glass) => glass.thickness === selectedContent?.glassType?.thickness
      )?.cost || 0) * sqftArea;
  }

  //edgeWork
  let edgeWorkPrice = 0;
  if (selectedContent.edgeWork?.item) {
    const edgeWork =
      selectedContent?.edgeWork?.item?.options?.find(
        (polish) => polish.thickness === selectedContent?.edgeWork?.thickness
      )?.cost || 0;
    Object.entries(measurements).forEach(([key, value]) => {
      const count = value["count"];
      const width = value["width"];
      const height = value["height"];
      for (let i = 0; i < count; i++) {
        const value = edgeWork * (width * 2 + height * 2) * 1;
        edgeWorkPrice += value;
      }
    });
  }

  console.log(edgeWorkPrice, "edgeWork Price");

  // let floatingPrice = 0;
  // if (selectedContent.floatingSize?.length) {
  //   floatingPrice = getFloatingPrice(
  //     selectedContent.floatingSize,
  //     mirrorLocationSettings
  //   );
  // }

  //glassAddons
  let glassAddonsPrice = 0;
  selectedContent?.glassAddons?.forEach((item) => {
    let price = 0;
    if (item?.options?.length) {
      price = item?.options[0]?.cost || 0;
    }
    glassAddonsPrice = glassAddonsPrice + price * sqftArea;
  });

  console.log(glassAddonsPrice, "glass Addons price");

  // let bevelStripPrice = 0;
  // if (selectedContent.bevelStrip) {
  //   Object.entries(measurements).forEach(([key, value]) => {
  //     const count = value["count"];
  //     const width = value["width"];
  //     const height = value["height"];
  //     // for (let i = 0; i < count; i++) {
  //     const price =
  //       mirrorLocationSettings.bevelStrip *
  //       ((Number(width) + Number(height)) * 2);
  //     bevelStripPrice += price;
  //     // }
  //   });
  // }
  
  const measurementsArray = Object.values(measurements);
  //hardwares
   let hardwaresPrice = 0;
  selectedContent?.hardwares?.forEach((row) => {
    if(row?.item?.options?.length && measurementsArray?.length){
      const price = row?.item?.options[0]?.cost || 0;
      hardwaresPrice = hardwaresPrice + price * row?.count;
    }
    //  * priceBySqft;  // hardwares are not calculated by price by sqft
  });

  // selectedContent?.hardwares?.forEach((item) => {
  //   let price = 0;
  //   console.log(item, "item");
  //   if (item?.options?.length && measurementsArray?.length) {
  //     console.log(item?.options?.length, measurementsArray?.length, "eeee");
  //     price =
  //       (item?.options[0]?.cost || 0) *
  //       ((Number(measurementsArray[0]?.width ?? 0) +
  //         Number(measurementsArray[0]?.height ?? 0)) *
  //         2);
  //   }
  //   hardwaresPrice = hardwaresPrice + price;
  // });

  console.log(hardwaresPrice, "hardwares price");

  // let safetyBackingPrice = 0;
  // if (selectedContent.safetyBacking) {
  //   safetyBackingPrice = mirrorLocationSettings.safetyBacking * sqftArea;
  // }

  // console.log(safetyBackingPrice, "safety backing price");

  // console.log(selectedContent.sandBlasting, "sandBlasting price");

  let fabricationPrice = 0;
  fabricationPrice =
    selectedContent.simpleHoles * mirrorLocationSettings.holeMultiplier +
    // selectedContent.outlets * mirrorLocationSettings.outletMultiplier +
    selectedContent.lightHoles * mirrorLocationSettings.lightHoleMultiplier +
    selectedContent.notch * mirrorLocationSettings.notchMultiplier +
    selectedContent.singleOutletCutout *
      mirrorLocationSettings.singleOutletCutoutMultiplier +
    selectedContent.doubleOutletCutout *
      mirrorLocationSettings.doubleOutletCutoutMultiplier +
    selectedContent.tripleOutletCutout *
      mirrorLocationSettings.tripleOutletCutoutMultiplier +
    selectedContent.quadOutletCutout *
      mirrorLocationSettings.quadOutletCutoutMultiplier;
  // selectedContent.singleDuplex *
  //   mirrorLocationSettings.singleDuplexMultiplier +
  // selectedContent.doubleDuplex *
  //   mirrorLocationSettings.doubleDuplexMultiplier +
  // selectedContent.tripleDuplex *
  //   mirrorLocationSettings.tripleDuplexMultiplier;

  fabricationPrice +=
    edgeWorkPrice +
    glassAddonsPrice +
    // selectedContent.sandBlasting +
    // safetyBackingPrice +
    // floatingPrice +
    // bevelStripPrice
    hardwaresPrice;

  console.log(fabricationPrice, "fabrication price");

  //additionalField price
  let additionalFieldPrice = 0;
  selectedContent?.additionalFields?.forEach((item) => {
    additionalFieldPrice += Number(
      item.cost 
      // *
      //   (mirrorLocationSettings.pricingFactorStatus
      //     ? mirrorLocationSettings.pricingFactor
      //     : 1)
    );
  });

  //labor price
  const laborPrice =
    selectedContent?.people *
    selectedContent?.hours *
    mirrorLocationSettings?.hourlyRate;

  const misc = 0;

  const cost = glassPrice + fabricationPrice + misc + additionalFieldPrice;

  let totalPrice =
    (glassPrice + fabricationPrice + misc) *
      (mirrorLocationSettings.pricingFactorStatus
        ? mirrorLocationSettings.pricingFactor
        : 1) +
    laborPrice;
    // + additionalFieldPrice;
    // additonal fields sum
  if (selectedContent.additionalFields.length > 0) {
    totalPrice += selectedContent.additionalFields.reduce(
      (acc, item) =>
        acc +
        Number(
          item.cost *
            (mirrorLocationSettings?.pricingFactorStatus
              ? mirrorLocationSettings?.pricingFactor
              : 1)
        ),
      0
    );
  }

  if (
    selectedContent.modifiedProfitPercentage > 0 &&
    selectedContent.modifiedProfitPercentage < 100
  ) {
    totalPrice =
      ((cost * 100) / (selectedContent.modifiedProfitPercentage - 100)) * -1;
  }

  return {
    glass: glassPrice,
    labor: laborPrice,
    fabrication: fabricationPrice,
    additionalFields: additionalFieldPrice,
    misc: misc,
    cost: cost,
    total: totalPrice,
    profitPercentage: ((totalPrice - cost) * 100) / totalPrice,
  };
};

export const setStateForMirrorEstimate = (item, dispatch, navigate) => {
  dispatch(resetNotifications());
  dispatch(setEstimateCategory(EstimateCategory.MIRRORS));
  dispatch(setEstimateState(quoteState.EDIT));
  dispatch(resetMirrorEstimateState());
  dispatch(setSelectedItem(item));
  dispatch(setMirrorProjectId(item?.project_id));
  dispatch(setEstimateMeasurements(item.config.measurements));
  // console.log("mirror edit", item);
  navigate("/estimates/dimensions");
};


export const getActiveStatus = (selectedItem,activeFinishOrThickness = null,type) => {
  switch(type){
     case mirrorHardwareTypes.HARDWARES:
       return selectedItem?.options?.[0]?.status;
     case mirrorHardwareTypes.GLASSADDONS:
       return selectedItem?.options?.[0]?.status;
     case mirrorHardwareTypes.GLASSTYPE:
       return selectedItem?.options?.find((item)=>item.thickness===activeFinishOrThickness)?.status;
     case mirrorHardwareTypes.EDGEWORK:
       return selectedItem?.options?.find((item)=>item.thickness===activeFinishOrThickness)?.status;
     default:
       return true;
  }
 }

 export const getEstimateErrorStatus = (selectedContent) => {
  if (selectedContent.glassType?.item) {
    if(!getActiveStatus(selectedContent.glassType?.item,selectedContent.glassType.thickness,mirrorHardwareTypes.GLASSTYPE)){
     return false;
    }
  }
  if (selectedContent.edgeWork?.item) {
    if(!getActiveStatus(selectedContent.edgeWork?.item,selectedContent.edgeWork.thickness,mirrorHardwareTypes.EDGEWORK)){
     return false;
    }
  }
  if (selectedContent.glassAddons.length) {
    let noSelectedDisableFound = true;
    selectedContent.glassAddons.forEach(element => {
      if(!getActiveStatus(element,null,mirrorHardwareTypes.GLASSADDONS)){
        noSelectedDisableFound = false;
        return;
      }
    });
    if(!noSelectedDisableFound){
     return false;
    }
   }
   if (selectedContent.hardwares?.length) {
    let noSelectedDisableFound = true;
    selectedContent.hardwares.forEach(element => {
      if(!getActiveStatus(element.item,null,mirrorHardwareTypes.HARDWARES)){
        noSelectedDisableFound = false;
        return;
      }
    });
    if(!noSelectedDisableFound){
     return false;
    }
   }
  return true;
}

export const getSelectedContentErrorMsgs = (selectedContent) => {
  let errors = null;
  if (selectedContent.glassType?.item) {
    const status = getActiveStatus(selectedContent.glassType?.item,selectedContent.glassType.thickness,mirrorHardwareTypes.GLASSTYPE);
     if(status === false){
      errors = {
        ...errors,
        glassType:{
          status:false,
          message:`"${selectedContent.glassType.item?.name}" is not available in thickness "${selectedContent.glassType.thickness}".`
        }
      }
     } 
  }
  if (selectedContent.edgeWork?.item) {
    const status = getActiveStatus(selectedContent.edgeWork?.item,selectedContent.edgeWork.thickness,mirrorHardwareTypes.EDGEWORK);
     if(status === false){
      errors = {
        ...errors,
        edgeWork:{
          status:false,
          message:`"${selectedContent.edgeWork.item?.name}" is not available in thickness "${selectedContent.edgeWork.thickness}".`
        }
      }
     } 
  }
  if(selectedContent.glassAddons.length){
    let selectedDisableNames = '';
  selectedContent.glassAddons.forEach(element => {
    if(!getActiveStatus(element,null,mirrorHardwareTypes.GLASSADDONS)){
      selectedDisableNames += `${element.name}, `;
    }
  });
  if(selectedDisableNames.length){
    errors = {
      ...errors,
      glassAddons:{
        status:false,
        message:`"${selectedDisableNames.trim().replace(/,\s*$/, '')}" are not available.`
      }
    }
  }
  }
  if(selectedContent.hardwares?.length){
    let selectedDisableNames = '';
  selectedContent.hardwares.forEach(element => {
    if(!getActiveStatus(element.item,null,mirrorHardwareTypes.HARDWARES)){
      selectedDisableNames += `${element?.item?.name}, `;
    }
  });
  if(selectedDisableNames.length){
    errors = {
      ...errors,
      hardwares:{
        status:false,
        message:`"${selectedDisableNames.trim().replace(/,\s*$/, '')}" are not available".`
      }
    }
  }
  }
return errors;
}

export const generateNotificationsForCurrentEstimate = (
  selectedContentFromRedux,
  notificationsFromRedux
) => {
  
  let selectedContent = { ...selectedContentFromRedux };
  let notifications = { ...notificationsFromRedux };

    if (selectedContent.glassType?.item) {
      // generate glass type not available notification in current thickness
      const status = getActiveStatus(selectedContent.glassType?.item,selectedContent.glassType.thickness,mirrorHardwareTypes.GLASSTYPE);
      if (!status)
        notifications.glassTypeNotAvailable = {
          status: true,
          variant: notificationsVariant.WARNING,
          message: `Glass Type "${selectedContent.glassType.item?.name}" is not available in thickness "${selectedContent.glassType.thickness}".`,
        };
    }
    if (selectedContent.edgeWork?.item) {
      // generate glass type not available notification in current thickness
      const status = getActiveStatus(selectedContent.edgeWork?.item,selectedContent.edgeWork.thickness,mirrorHardwareTypes.EDGEWORK);
      if (!status)
        notifications.edgeWorkNotAvailable = {
          status: true,
          variant: notificationsVariant.WARNING,
          message: `Edge Work "${selectedContent.edgeWork.item?.name}" is not available in thickness "${selectedContent.edgeWork.thickness}".`,
        };
    }
    if(selectedContent.glassAddons.length){
      let glassAddonsNotAvailable = [];
      selectedContent.glassAddons.forEach(element => {
        if(!getActiveStatus(element,null,mirrorHardwareTypes.GLASSADDONS)){
          glassAddonsNotAvailable.push({
          status: true,
          variant: notificationsVariant.WARNING,
          message: `Glass Addon "${element.name}" is not available.`,
          });
        }
      });
      if(glassAddonsNotAvailable.length){
        notifications.glassAddonsNotAvailable = glassAddonsNotAvailable;
      }
    }
    if(selectedContent.hardwares?.length){
      let hardwaresNotAvailable = [];
      selectedContent.hardwares.forEach(element => {
        if(!getActiveStatus(element.item,null,mirrorHardwareTypes.HARDWARES)){
          hardwaresNotAvailable.push({
          status: true,
          variant: notificationsVariant.WARNING,
          message: `Hardware "${element.item?.name}" is not available.`,
          });
        }
      });
      if(hardwaresNotAvailable.length){
        notifications.hardwaresNotAvailable = hardwaresNotAvailable;
      }
    }
 return notifications;
}

export const generateObjectForPDFPreview = (
  listData,
  estimateData,
  mirrorMiscPricing
) => {
  let estimateInfoObject;

  let glassTypee = null;
  glassTypee = listData?.glassTypes?.find(
    (item) => item._id === estimateData?.config?.glassType?.type
  );

  let edgeWork = null;
  edgeWork = listData?.edgeWorks?.find(
    (item) => item._id === estimateData?.config?.edgeWork?.type
  );

  let glassAddons = [];
  glassAddons = estimateData?.config?.glassAddons?.map((item) => {
    const record = listData?.glassAddons.find((addon) => addon._id === item);
    return record;
  });

  let hardwares = [];
  hardwares = estimateData?.config?.hardwares?.map((row) => {
    const record = listData?.hardwares.find((addon) => addon?._id === row?.type);
    return {item:record,count:row?.count};
  });

  estimateInfoObject = {
    name: estimateData?.name,
    projectId: estimateData?.project_id,
    category: estimateData?.category,
    cost: estimateData?.cost,
    creatorData: estimateData?.creatorData,
    creator_type: estimateData?.creator_type,
    customerData: estimateData?.customerData,
    settings: estimateData?.settings,
    status: estimateData?.status,
    updatedAt: estimateData?.updatedAt,
    additionalFields: estimateData?.config?.additionalFields,
    glassType: {
      item: glassTypee,
      thickness: estimateData?.config?.glassType?.thickness,
    },
    edgeWork: {
      item: edgeWork,
      thickness: estimateData?.config?.edgeWork?.thickness
    },
    glassAddons: glassAddons?.length ? [...glassAddons] : [],
    hardwares: hardwares?.length ? [...hardwares] : [],
    simpleHoles: estimateData?.config?.simpleHoles,
    lightHoles: estimateData?.config?.lightHoles,
    singleOutletCutout: estimateData?.config?.singleOutletCutout,
    doubleOutletCutout: estimateData?.config?.doubleOutletCutout,
    tripleOutletCutout: estimateData?.config?.tripleOutletCutout,
    quadOutletCutout: estimateData?.config?.quadOutletCutout,
    notch: estimateData?.config?.notch,
    people: estimateData?.config?.people,
    hours: estimateData?.config?.hours,
    perimeter: estimateData?.config?.perimeter,
    sqftArea: estimateData?.config?.sqftArea,
    userProfitPercentage: estimateData?.config?.userProfitPercentage,
    label: estimateData?.config?.label,
    layout_id: estimateData?.config?.layout_id,
    measurements: estimateData?.config?.measurements,
    pricingFactor: mirrorMiscPricing?.pricingFactorStatus
      ? mirrorMiscPricing?.pricingFactor
      : 1,
  };
  return estimateInfoObject;
};