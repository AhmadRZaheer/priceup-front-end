import { convertArrayKeysToObject } from './common';
import {
  defaultNotificationState,
  hardwareTypes,
  notificationsVariant,
  panelOverWeightAmount,
  standardDoorWidth,
  thicknessTypes,
} from './constants';

export const getActiveStatus = (selectedItem,activeFinishOrThickness = null,type) => {
 switch(type){
    case hardwareTypes.HANDLES:
      return selectedItem?.finishes?.find((item)=>item.finish_id===activeFinishOrThickness?._id)?.status;
    case hardwareTypes.HINGES:
      return selectedItem?.finishes?.find((item)=>item.finish_id===activeFinishOrThickness?._id)?.status;
    case hardwareTypes.DOORLOCK:
      return selectedItem?.finishes?.find((item)=>item.finish_id===activeFinishOrThickness?._id)?.status;
    case hardwareTypes.SLIDINGDOORSYSTEM:
      return selectedItem?.finishes?.find((item)=>item.finish_id===activeFinishOrThickness?._id)?.status;
    case hardwareTypes.HEADER:
      return selectedItem?.finishes?.find((item)=>item.finish_id===activeFinishOrThickness?._id)?.status;
    case hardwareTypes.HARDWAREADDONS:
      return selectedItem?.finishes?.find((item)=>item.finish_id===activeFinishOrThickness?._id)?.status;
    case hardwareTypes.GLASSTYPE:
      return selectedItem?.options?.find((item)=>item.thickness===activeFinishOrThickness)?.status;
    case hardwareTypes.GLASSADDONS:
      return selectedItem?.slug === 'no-treatment' ? true : selectedItem?.options?.[0]?.status;
    case hardwareTypes.CHANNEL:
      return selectedItem?.finishes?.find((item)=>item.finish_id===activeFinishOrThickness?._id)?.status;
    case hardwareTypes.WALLCLAMP:
      return selectedItem?.finishes?.find((item)=>item.finish_id===activeFinishOrThickness?._id)?.status;
    case hardwareTypes.SLEEVEOVER:
      return selectedItem?.finishes?.find((item)=>item.finish_id===activeFinishOrThickness?._id)?.status;
    case hardwareTypes.GLASSTOGLASS:
      return selectedItem?.finishes?.find((item)=>item.finish_id===activeFinishOrThickness?._id)?.status;
    case hardwareTypes.CORNERWALLCLAMP:
      return selectedItem?.finishes?.find((item)=>item.finish_id===activeFinishOrThickness?._id)?.status;
    case hardwareTypes.CORNERSLEEVEOVER:
      return selectedItem?.finishes?.find((item)=>item.finish_id===activeFinishOrThickness?._id)?.status;
    case hardwareTypes.CORNERGLASSTOGLASS:
      return selectedItem?.finishes?.find((item)=>item.finish_id===activeFinishOrThickness?._id)?.status;
    default:
      return true;
 }
}

export const getEstimateErrorStatus = (selectedContent) => {
  if (!selectedContent.hardwareFinishes) {
     return false;
  }
   if (selectedContent.handles?.item) {
     if(!getActiveStatus(selectedContent.handles?.item,selectedContent.hardwareFinishes,hardwareTypes.HANDLES)){
      return false;
     }
   }
   if (selectedContent.hinges?.item) {
     if(!getActiveStatus(selectedContent.hinges?.item,selectedContent.hardwareFinishes,hardwareTypes.HINGES)){
      return false;
     }
   }
   if (selectedContent.doorLock?.item) {
    if(!getActiveStatus(selectedContent.doorLock?.item,selectedContent.hardwareFinishes,hardwareTypes.DOORLOCK)){
     return false;
    }
  }
   if (selectedContent.slidingDoorSystem?.item) {
    if(!getActiveStatus(selectedContent.slidingDoorSystem?.item,selectedContent.hardwareFinishes,hardwareTypes.SLIDINGDOORSYSTEM)){
      return false;
    }
   }
   if (selectedContent.header?.item) {
    if(!getActiveStatus(selectedContent.header?.item,selectedContent.hardwareFinishes,hardwareTypes.HEADER)){
      return false;
    }
   }
   if (selectedContent.hardwareAddons?.length) {
    let noSelectedDisableFound = true;
    selectedContent.hardwareAddons.forEach(element => {
      if(!getActiveStatus(element.item,selectedContent.hardwareFinishes,hardwareTypes.HARDWAREADDONS)){
        noSelectedDisableFound = false;
        return;
      }
    });
    if(!noSelectedDisableFound){
     return false;
    }
   }
   if (selectedContent.glassType?.item) {
    if(!getActiveStatus(selectedContent.glassType?.item,selectedContent.glassType.thickness,hardwareTypes.GLASSTYPE)){
      return false;
    }
   }
   if (selectedContent.glassAddons?.length) {
    let noSelectedDisableFound = true;
    selectedContent.glassAddons.forEach(element => {
      if(!getActiveStatus(element?.item,null,hardwareTypes.GLASSADDONS)){
        noSelectedDisableFound = false;
        return;
      }
    });
    if(!noSelectedDisableFound){
     return false;
    }
   }
   if (selectedContent.mountingState === 'channel' && selectedContent.mountingChannel?.item) {
    if(!getActiveStatus(selectedContent.mountingChannel?.item,selectedContent.hardwareFinishes,hardwareTypes.CHANNEL)){
      return false;
    }
   }
   if (selectedContent.mountingState === 'clamps' && selectedContent.mountingClamps?.wallClamp?.length) {
    let noSelectedDisableFound = true;
    selectedContent.mountingClamps.wallClamp.forEach(element => {
      if(!getActiveStatus(element.item,selectedContent.hardwareFinishes,hardwareTypes.WALLCLAMP)){
        noSelectedDisableFound = false;
        return;
      }
    });
    if(!noSelectedDisableFound){
     return false;
    }
   }
   if (selectedContent.mountingState === 'clamps' && selectedContent.mountingClamps?.sleeveOver?.length) {
    let noSelectedDisableFound = true;
    selectedContent.mountingClamps.sleeveOver.forEach(element => {
      if(!getActiveStatus(element.item,selectedContent.hardwareFinishes,hardwareTypes.SLEEVEOVER)){
        noSelectedDisableFound = false;
        return;
      }
    });
    if(!noSelectedDisableFound){
     return false;
    }
   }
   if (selectedContent.mountingState === 'clamps' && selectedContent.mountingClamps?.glassToGlass?.length) {
    let noSelectedDisableFound = true;
    selectedContent.mountingClamps.glassToGlass.forEach(element => {
      if(!getActiveStatus(element.item,selectedContent.hardwareFinishes,hardwareTypes.GLASSTOGLASS)){
        noSelectedDisableFound = false;
        return;
      }
    });
    if(!noSelectedDisableFound){
     return false;
    }
   }
   if (selectedContent.cornerClamps?.cornerWallClamp?.length) {
    let noSelectedDisableFound = true;
    selectedContent.cornerClamps.cornerWallClamp.forEach(element => {
      if(!getActiveStatus(element.item,selectedContent.hardwareFinishes,hardwareTypes.CORNERWALLCLAMP)){
        noSelectedDisableFound = false;
        return;
      }
    });
    if(!noSelectedDisableFound){
     return false;
    }
   }
   if (selectedContent.cornerClamps?.cornerSleeveOver?.length) {
    let noSelectedDisableFound = true;
    selectedContent.cornerClamps.cornerSleeveOver.forEach(element => {
      if(!getActiveStatus(element.item,selectedContent.hardwareFinishes,hardwareTypes.CORNERSLEEVEOVER)){
        noSelectedDisableFound = false;
        return;
      }
    });
    if(!noSelectedDisableFound){
     return false;
    }
   }
   if (selectedContent.cornerClamps?.cornerGlassToGlass?.length) {
    let noSelectedDisableFound = true;
    selectedContent.cornerClamps.cornerGlassToGlass.forEach(element => {
      if(!getActiveStatus(element.item,selectedContent.hardwareFinishes,hardwareTypes.CORNERGLASSTOGLASS)){
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
  console.log(selectedContent,'selectedContent12qwas')
    let errors = null;
    if (!selectedContent.hardwareFinishes) {
        errors = {
          ...errors,
          hardwareFinish:{
            status:false,
            message:`No hardware finish is selected.`
          }
        }
    }
    if (selectedContent.handles?.item && selectedContent.hardwareFinishes) {
      const status = getActiveStatus(selectedContent.handles?.item,selectedContent.hardwareFinishes,hardwareTypes.HANDLES);
       if(status === false){
        errors = {
          ...errors,
          handle:{
            status:false,
            message:`"${selectedContent.handles.item?.name}" is not available in finish "${selectedContent.hardwareFinishes?.name}".`
          }
        }
       } 
    }
    if (selectedContent.doorLock?.item && selectedContent.hardwareFinishes) {
      const status = getActiveStatus(selectedContent.doorLock?.item,selectedContent.hardwareFinishes,hardwareTypes.DOORLOCK);
       if(status === false){
        errors = {
          ...errors,
          doorLock:{
            status:false,
            message:`"${selectedContent.doorLock.item?.name}" is not available in finish "${selectedContent.hardwareFinishes?.name}".`
          }
        }
       } 
    }
    if (selectedContent.hinges?.item && selectedContent.hardwareFinishes) {
      const status = getActiveStatus(selectedContent.hinges?.item,selectedContent.hardwareFinishes,hardwareTypes.HINGES);
       if(status === false){
        errors = {
          ...errors,
          hinge:{
            status:false,
            message:`"${selectedContent.hinges.item?.name}" is not available in finish "${selectedContent.hardwareFinishes?.name}".`
          }
        }
       } 
    }
    if (selectedContent.slidingDoorSystem?.item && selectedContent.hardwareFinishes) {
      const status = getActiveStatus(selectedContent.slidingDoorSystem?.item,selectedContent.hardwareFinishes,hardwareTypes.SLIDINGDOORSYSTEM);
       if(status === false){
        errors = {
          ...errors,
          slidingDoorSystem:{
            status:false,
            message:`"${selectedContent.slidingDoorSystem.item?.name}" is not available in finish "${selectedContent.hardwareFinishes?.name}".`
          }
        }
       } 
    }
    if (selectedContent.header?.item && selectedContent.hardwareFinishes) {
      const status = getActiveStatus(selectedContent.header?.item,selectedContent.hardwareFinishes,hardwareTypes.HEADER);
       if(status === false){
        errors = {
          ...errors,
          header:{
            status:false,
            message:`"${selectedContent.header.item?.name}" is not available in finish "${selectedContent.hardwareFinishes?.name}".`
          }
        }
       } 
    }
    if(selectedContent.hardwareAddons?.length && selectedContent.hardwareFinishes){
      let selectedDisableNames = '';
    selectedContent.hardwareAddons.forEach(element => {
      if(!getActiveStatus(element.item,selectedContent.hardwareFinishes,hardwareTypes.HARDWAREADDONS)){
        selectedDisableNames += `${element.item.name}, `;
      }
    });
    if(selectedDisableNames.length){
      errors = {
        ...errors,
        hardwareAddons:{
          status:false,
          message:`"${selectedDisableNames.trim().replace(/,\s*$/, '')}" are not available in finish "${selectedContent.hardwareFinishes?.name}".`
        }
      }
    }
    }
    if (selectedContent.glassType?.item) {
      const status = getActiveStatus(selectedContent.glassType?.item,selectedContent.glassType.thickness,hardwareTypes.GLASSTYPE);
       if(status === false){
        errors = {
          ...errors,
          glassType:{
            status:false,
            message:`"${selectedContent.glassType.item?.name}" is not available in thickness "${selectedContent.glassType?.thickness}".`
          }
        }
       } 
    }
    if(selectedContent.glassAddons?.length){
      let selectedDisableNames = '';
    selectedContent.glassAddons.forEach(element => {
      if(!getActiveStatus(element?.item,null,hardwareTypes.GLASSADDONS)){
        selectedDisableNames += `${element?.item?.name}, `;
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
    if (selectedContent.mountingState === 'channel' && selectedContent.mountingChannel?.item && selectedContent.hardwareFinishes) {
      const status = getActiveStatus(selectedContent.mountingChannel?.item,selectedContent.hardwareFinishes,hardwareTypes.CHANNEL);
       if(status === false){
        errors = {
          ...errors,
          mountingChannel:{
            status:false,
            message:`"${selectedContent.mountingChannel.item?.name}" is not available in finish "${selectedContent.hardwareFinishes?.name}".`
          }
        }
       } 
    }
    if(selectedContent.mountingState === 'clamps' && selectedContent.mountingClamps?.wallClamp?.length && selectedContent.hardwareFinishes){
      let selectedDisableNames = '';
    selectedContent.mountingClamps.wallClamp.forEach(element => {
      if(!getActiveStatus(element.item,selectedContent.hardwareFinishes,hardwareTypes.WALLCLAMP)){
        selectedDisableNames += `${element.item.name}, `;
      }
    });
    if(selectedDisableNames.length){
      errors = {
        ...errors,
        wallClamp:{
          status:false,
          message:`"${selectedDisableNames.trim().replace(/,\s*$/, '')}" are not available in finish "${selectedContent.hardwareFinishes?.name}.`
        }
      }
    }
    }
    if(selectedContent.mountingState === 'clamps' && selectedContent.mountingClamps?.sleeveOver?.length && selectedContent.hardwareFinishes){
      let selectedDisableNames = '';
    selectedContent.mountingClamps.sleeveOver.forEach(element => {
      if(!getActiveStatus(element.item,selectedContent.hardwareFinishes,hardwareTypes.SLEEVEOVER)){
        selectedDisableNames += `${element.item.name}, `;
      }
    });
    if(selectedDisableNames.length){
      errors = {
        ...errors,
        sleeveOver:{
          status:false,
          message:`"${selectedDisableNames.trim().replace(/,\s*$/, '')}" are not available in finish "${selectedContent.hardwareFinishes?.name}.`
        }
      }
    }
    }
    if(selectedContent.mountingState === 'clamps' && selectedContent.mountingClamps?.glassToGlass?.length && selectedContent.hardwareFinishes){
      let selectedDisableNames = '';
    selectedContent.mountingClamps.glassToGlass.forEach(element => {
      if(!getActiveStatus(element.item,selectedContent.hardwareFinishes,hardwareTypes.GLASSTOGLASS)){
        selectedDisableNames += `${element.item.name}, `;
      }
    });
    if(selectedDisableNames.length){
      errors = {
        ...errors,
        glassToGlass:{
          status:false,
          message:`"${selectedDisableNames.trim().replace(/,\s*$/, '')}" are not available in finish "${selectedContent.hardwareFinishes?.name}.`
        }
      }
    }
    }
    if(selectedContent.cornerClamps?.cornerWallClamp?.length && selectedContent.hardwareFinishes){
      let selectedDisableNames = '';
    selectedContent.cornerClamps.cornerWallClamp.forEach(element => {
      if(!getActiveStatus(element.item,selectedContent.hardwareFinishes,hardwareTypes.CORNERWALLCLAMP)){
        selectedDisableNames += `${element.item.name}, `;
      }
    });
    if(selectedDisableNames.length){
      errors = {
        ...errors,
        cornerWallClamp:{
          status:false,
          message:`"${selectedDisableNames.trim().replace(/,\s*$/, '')}" are not available in finish "${selectedContent.hardwareFinishes?.name}.`
        }
      }
    }
    }
    if(selectedContent.cornerClamps?.cornerSleeveOver?.length && selectedContent.hardwareFinishes){
      let selectedDisableNames = '';
    selectedContent.cornerClamps.cornerSleeveOver.forEach(element => {
      if(!getActiveStatus(element.item,selectedContent.hardwareFinishes,hardwareTypes.CORNERSLEEVEOVER)){
        selectedDisableNames += `${element.item.name}, `;
      }
    });
    if(selectedDisableNames.length){
      errors = {
        ...errors,
        cornerSleeveOver:{
          status:false,
          message:`"${selectedDisableNames.trim().replace(/,\s*$/, '')}" are not available in finish "${selectedContent.hardwareFinishes?.name}.`
        }
      }
    }
    }
    if(selectedContent.cornerClamps?.cornerGlassToGlass?.length && selectedContent.hardwareFinishes){
      let selectedDisableNames = '';
    selectedContent.cornerClamps.cornerGlassToGlass.forEach(element => {
      if(!getActiveStatus(element.item,selectedContent.hardwareFinishes,hardwareTypes.CORNERGLASSTOGLASS)){
        selectedDisableNames += `${element.item.name}, `;
      }
    });
    if(selectedDisableNames.length){
      errors = {
        ...errors,
        cornerGlassToGlass:{
          status:false,
          message:`"${selectedDisableNames.trim().replace(/,\s*$/, '')}" are not available in finish "${selectedContent.hardwareFinishes?.name}.`
        }
      }
    }
    }
    return errors;
}

export const getSelectedCostDifferenceErrorMsgs = (selectedContent) => {
  console.log(selectedContent,'selectedContent12qwas')
    let errors = null;
    if (!selectedContent.hardwareFinishes?._id) {
        errors = {
          ...errors,
          hardwareFinish:{
            message:`No hardware finish is selected.`
          }
        }
    }
    if (selectedContent.handles?.item && selectedContent.hardwareFinishes) {
      let handlesCost = getHardwareCostBySelectedFinish(selectedContent.handles?.item,selectedContent?.hardwareFinishes?._id);
       if(handlesCost !== selectedContent.handles?.cost){
        errors = {
          ...errors,
          handle:{
            message: `Cost for "${selectedContent.handles.item?.name}" changed from "${selectedContent.handles?.cost}" to "${handlesCost}".`
          }
        }
       } 
    }
    if (selectedContent.doorLock?.item && selectedContent.hardwareFinishes) {
      let itemCost = getHardwareCostBySelectedFinish(selectedContent.doorLock?.item,selectedContent?.hardwareFinishes?._id);
      if(itemCost !== selectedContent.doorLock?.cost){
       errors = {
         ...errors,
         doorLock:{
           status:false,
           message: `Cost for "${selectedContent.doorLock.item?.name}" changed from "${selectedContent.doorLock?.cost}" to "${itemCost}".`
         }
       }
      } 
    }
    if (selectedContent.hinges?.item && selectedContent.hardwareFinishes) {
      let hingesCost = getHardwareCostBySelectedFinish(selectedContent.hinges?.item,selectedContent?.hardwareFinishes?._id);
       if(hingesCost !== selectedContent.hinges?.cost){
        errors = {
          ...errors,
          hinge:{
            message: `Cost for "${selectedContent.hinges.item?.name}" changed from "${selectedContent.hinges?.cost}" to "${hingesCost}".`
          }
        }
       } 
    }
    if (selectedContent.slidingDoorSystem?.item && selectedContent.hardwareFinishes) {
      let itemCost = getHardwareCostBySelectedFinish(selectedContent.slidingDoorSystem?.item,selectedContent?.hardwareFinishes?._id);
       if(itemCost !== selectedContent.slidingDoorSystem?.cost){
        errors = {
          ...errors,
          slidingDoorSystem:{
            status:false,
            message: `Cost for "${selectedContent.slidingDoorSystem.item?.name}" changed from "${selectedContent.slidingDoorSystem?.cost}" to "${itemCost}".`
          }
        }
       } 
    }
    if (selectedContent.header?.item && selectedContent.hardwareFinishes) {
      let itemCost = getHardwareCostBySelectedFinish(selectedContent.header?.item,selectedContent?.hardwareFinishes?._id);
      if(itemCost !== selectedContent.header?.cost){
       errors = {
         ...errors,
         header:{
           status:false,
           message: `Cost for "${selectedContent.header.item?.name}" changed from "${selectedContent.header?.cost}" to "${itemCost}".`
         }
       }
      }  
    }
    if(selectedContent.hardwareAddons?.length && selectedContent.hardwareFinishes){
      let hardwareAddonsCostDiffer = [];
     selectedContent.hardwareAddons.forEach(element => {
      let itemCost = getHardwareCostBySelectedFinish(element?.item,selectedContent?.hardwareFinishes?._id) ?? 0;
      let originalCost = element?.cost ?? 0;
      if(itemCost !== originalCost){
        hardwareAddonsCostDiffer.push({
        message: `Cost for "${element.item?.name}" changed from "${originalCost}" to "${itemCost}".`,
        });
      }
    });
    if(hardwareAddonsCostDiffer.length > 0){
      errors = {
        ...errors,
        hardwareAddons: hardwareAddonsCostDiffer
      }
    }
    }
    if (selectedContent.glassType?.item) {
      let glassCost = getGlassCostBySelectedthickness(selectedContent.glassType,selectedContent.glassType.thickness); 
       if(glassCost !== selectedContent.glassType.cost){
        errors = {
          ...errors,
          glassType:{
            message: `Cost for "${selectedContent.glassType.item?.name}" changed from "${selectedContent.glassType.cost}" to "${glassCost}".`
          }
        }
       } 
    }
    if(selectedContent.glassAddons?.length){
      let glassAddonsCostDiffer = [];
      if(selectedContent.glassAddons?.length){
        selectedContent.glassAddons.forEach(element => {
          let itemCost = element?.item?.options?.[0]?.cost ?? 0;
          let originalCost = element?.cost ?? 0;
          if(itemCost !== originalCost){
            glassAddonsCostDiffer.push({
            message: `Cost for "${element.item?.name}" changed from "${originalCost}" to "${itemCost}".`,
            });
          }
        });
      }
    if(glassAddonsCostDiffer.length){
      errors = {
        ...errors,
        glassAddons:glassAddonsCostDiffer
      }
    }
    }
    if (selectedContent.mountingState === 'channel' && selectedContent.mountingChannel?.item && selectedContent.hardwareFinishes) {
      let itemCost = getHardwareCostBySelectedFinish(selectedContent.mountingChannel?.item,selectedContent?.hardwareFinishes?._id) ?? 0;
       if(itemCost !== selectedContent.mountingChannel?.cost){
        errors = {
          ...errors,
          mountingChannel:{
            message: `Cost for "${selectedContent.mountingChannel.item?.name}" changed from "${selectedContent.mountingChannel?.cost}" to "${itemCost}".`,
          }
        }
       } 
    }
    if(selectedContent.mountingState === 'clamps' && selectedContent.mountingClamps?.wallClamp?.length && selectedContent.hardwareFinishes){
      let wallClampDiff = [];
      selectedContent.mountingClamps?.wallClamp.forEach(element => {
       let itemCost = getHardwareCostBySelectedFinish(element?.item,selectedContent?.hardwareFinishes?._id) ?? 0;
       let originalCost = element?.cost ?? 0;
       if(itemCost !== originalCost){
        wallClampDiff.push({
         message: `Cost for "${element.item?.name}" changed from "${originalCost}" to "${itemCost}".`,
         });
       }
      });
    if(wallClampDiff.length){
      errors = {
        ...errors,
        wallClamp : wallClampDiff
      }
    }
    }
    if(selectedContent.mountingState === 'clamps' && selectedContent.mountingClamps?.sleeveOver?.length && selectedContent.hardwareFinishes){
      let sleeveOverDiff = [];
      selectedContent.mountingClamps?.sleeveOver.forEach(element => {
       let itemCost = getHardwareCostBySelectedFinish(element?.item,selectedContent?.hardwareFinishes?._id) ?? 0;
       let originalCost = element?.cost ?? 0;
       if(itemCost !== originalCost){
        sleeveOverDiff.push({
         message: `Cost for "${element.item?.name}" changed from "${originalCost}" to "${itemCost}".`,
         });
       }
      });
    if(sleeveOverDiff.length){
      errors = {
        ...errors,
        sleeveOver: sleeveOverDiff
      }
    }
    }
    if(selectedContent.mountingState === 'clamps' && selectedContent.mountingClamps?.glassToGlass?.length && selectedContent.hardwareFinishes){
      let glassToGlassDiff = [];
      selectedContent.mountingClamps?.glassToGlass.forEach(element => {
       let itemCost = getHardwareCostBySelectedFinish(element?.item,selectedContent?.hardwareFinishes?._id) ?? 0;
       let originalCost = element?.cost ?? 0;
       if(itemCost !== originalCost){
        glassToGlassDiff.push({
         message: `Cost for "${element.item?.name}" changed from "${originalCost}" to "${itemCost}".`,
         });
       }
      });
    if(glassToGlassDiff.length){
      errors = {
        ...errors,
        glassToGlass: glassToGlassDiff
      }
    }
    }
    if(selectedContent.cornerClamps?.cornerWallClamp?.length && selectedContent.hardwareFinishes){
      let cornerWallClampDiff = [];
     selectedContent.cornerClamps.cornerWallClamp.forEach(element => {
      let itemCost = getHardwareCostBySelectedFinish(element?.item,selectedContent?.hardwareFinishes?._id) ?? 0;
      let originalCost = element?.cost ?? 0;
      if(itemCost !== originalCost){
        cornerWallClampDiff.push({
        message: `Cost for "${element.item?.name}" changed from "${originalCost}" to "${itemCost}".`,
        });
      }
     });
     if(cornerWallClampDiff.length){
      errors = {
        ...errors,
        cornerWallClamp: cornerWallClampDiff
      }
    }
    }
    if(selectedContent.cornerClamps?.cornerSleeveOver?.length && selectedContent.hardwareFinishes){
      let cornerSleeveOverDiff = [];
     selectedContent.cornerClamps.cornerSleeveOver.forEach(element => {
      let itemCost = getHardwareCostBySelectedFinish(element?.item,selectedContent?.hardwareFinishes?._id) ?? 0;
      let originalCost = element?.cost ?? 0;
      if(itemCost !== originalCost){
        cornerSleeveOverDiff.push({
        message: `Cost for "${element.item?.name}" changed from "${originalCost}" to "${itemCost}".`,
        });
      }
     });
    if(cornerSleeveOverDiff.length){
      errors = {
        ...errors,
        cornerSleeveOver:cornerSleeveOverDiff
      }
    }
    }
    if(selectedContent.cornerClamps?.cornerGlassToGlass?.length && selectedContent.hardwareFinishes){
      let cornerGlassToGlassDiff = [];
      selectedContent.cornerClamps.cornerGlassToGlass.forEach(element => {
       let itemCost = getHardwareCostBySelectedFinish(element?.item,selectedContent?.hardwareFinishes?._id) ?? 0;
       let originalCost = element?.cost ?? 0;
       if(itemCost !== originalCost){
        cornerGlassToGlassDiff.push({
         message: `Cost for "${element.item?.name}" changed from "${originalCost}" to "${itemCost}".`,
         });
       }
      });
    if(cornerGlassToGlassDiff.length){
      errors = {
        ...errors,
        cornerGlassToGlass: cornerGlassToGlassDiff
      }
    }
    }
    return errors;
}

export const generateNotificationsForCurrentEstimate = (
  estimateState,
  calculatedGlassThickness = ""
) => {
  const reduxSelectedItem = estimateState.selectedItem;
  const reduxListData = estimateState.listData;
  let selectedContent = { ...estimateState.content };
  let notifications = { ...estimateState.notifications };
  const panelWeight = estimateState.panelWeight;
  const doorWeight = estimateState.doorWeight;
  const doorWidth = estimateState.doorWidth;
  const measurements = estimateState.measurements;


    if(!selectedContent.hardwareFinishes){
        // generate hardwareFinish not selected
        notifications.finishNotSelected = {
          status: true,
          variant: notificationsVariant.WARNING,
          message: `No hardware finish is selected.`,
        };
    }else if (selectedContent.hardwareFinishes && notifications.finishNotSelected.status === true){
      notifications.finishNotSelected = defaultNotificationState;
    }

    if (selectedContent.handles?.item && selectedContent.hardwareFinishes) {
      // generate handle not available notification in current finish
      const status = getActiveStatus(selectedContent.handles?.item,selectedContent.hardwareFinishes,hardwareTypes.HANDLES);
      if (!status)
        notifications.handleNotAvailable = {
          status: true,
          variant: notificationsVariant.WARNING,
          message: `Handle "${selectedContent.handles.item?.name}" is not available in finish "${selectedContent.hardwareFinishes?.name}".`,
        };
    }
    if (selectedContent.doorLock?.item && selectedContent.hardwareFinishes) {
      // generate handle not available notification in current finish
      const status = getActiveStatus(selectedContent.doorLock?.item,selectedContent.hardwareFinishes,hardwareTypes.DOORLOCK);
      if (!status)
        notifications.doorLockNotAvailable = {
          status: true,
          variant: notificationsVariant.WARNING,
          message: `Door Lock "${selectedContent.doorLock.item?.name}" is not available in finish "${selectedContent.hardwareFinishes?.name}".`,
        };
    }
     /** switch hinges if width increases layout defaults only for layouts which have variant */
     if(reduxSelectedItem?.settings?.variant){
    const switchHingeResult = getSwitchHingeNotification(
      selectedContent,
      reduxSelectedItem,
      panelWeight,
      reduxListData,
      doorWidth,
      measurements,
    );
    if (switchHingeResult?.hingesSwitch)
      notifications.hingesSwitch = switchHingeResult.hingesSwitch;
    if (switchHingeResult?.hinges)
      selectedContent.hinges = switchHingeResult.hinges;
    }
    /** end */
    if (selectedContent.hinges?.item && selectedContent.hardwareFinishes) {
      // generate hinges not available notification in current finish
      const status = getActiveStatus(selectedContent.hinges?.item,selectedContent.hardwareFinishes,hardwareTypes.HINGES);
      if (!status){
        notifications.hingeNotAvailable = {
          status: true,
          variant: notificationsVariant.WARNING,
          message: `Hinge "${selectedContent.hinges.item?.name}" is not available in finish "${selectedContent.hardwareFinishes?.name}".`,
        };
      }
    }
    if (selectedContent.slidingDoorSystem?.item && selectedContent.hardwareFinishes) {
      // generate sliding door system not available notification in current finish
      const status = getActiveStatus(selectedContent.slidingDoorSystem?.item,selectedContent.hardwareFinishes,hardwareTypes.SLIDINGDOORSYSTEM);
      if (!status){
        notifications.slidingDoorSystemNotAvailable = {
          status: true,
          variant: notificationsVariant.WARNING,
          message: `Sliding Door System "${selectedContent.slidingDoorSystem.item?.name}" is not available in finish "${selectedContent.hardwareFinishes?.name}".`,
        };
      }
    }
    if (selectedContent.header?.item && selectedContent.hardwareFinishes) {
      // generate header type not available notification in current finish
      const status = getActiveStatus(selectedContent.header?.item,selectedContent.hardwareFinishes,hardwareTypes.HEADER);
      if (!status){
        notifications.headerNotAvailable = {
          status: true,
          variant: notificationsVariant.WARNING,
          message: `Header "${selectedContent.header.item?.name}" is not available in finish "${selectedContent.hardwareFinishes?.name}".`,
        };
      }
    }

     /** switch glass thickness if glass size is greater than provided */
     const thicknessShiftResult = getGlassThicknessShiftNotification(
      selectedContent,
      reduxSelectedItem,
      calculatedGlassThickness,
    );
    if (thicknessShiftResult?.glassThicknessSwitch)
      notifications.glassThicknessSwitch =
        thicknessShiftResult.glassThicknessSwitch;
    if (thicknessShiftResult?.glassType)
      {
      selectedContent.glassType = thicknessShiftResult.glassType;
       // if glass thickness shift than shift active mounting channel according it
      if (thicknessShiftResult?.glassType?.thickness === thicknessTypes.ONEBYTWO && selectedContent.mountingChannel?.item) { 
          let itemFound = reduxListData?.mountingChannel?.find(
            (item) => item.slug === "u-channel-1-2"
          );
          const mountingCost = getHardwareCostBySelectedFinish(itemFound,selectedContent?.hardwareFinish?._id)
          if(itemFound){
            selectedContent.mountingChannel = {
               item: itemFound,
               count: 1,
               cost : mountingCost
            };
          }
      }
      else if (thicknessShiftResult?.glassType?.thickness === thicknessTypes.THREEBYEIGHT && selectedContent.mountingChannel?.item && reduxSelectedItem?.settings?.glassType?.thickness === thicknessTypes.THREEBYEIGHT) { 
        // shift mounting back to 3/8 when glass thickness shift back to 3/8
        let itemFound = reduxListData?.mountingChannel?.find(
          (item) => item.slug === "u-channel-3-8"
        );
        const mountingCost = getHardwareCostBySelectedFinish(itemFound,selectedContent?.hardwareFinish?._id)
        if(itemFound){
          selectedContent.mountingChannel = {
             item: itemFound,
             count: 1,
             cost : mountingCost
          };
        }
      }
      }
    /** end */

    if (selectedContent.glassType?.item) {
      // generate glass type not available notification in current thickness
      const status = getActiveStatus(selectedContent.glassType?.item,selectedContent.glassType.thickness,hardwareTypes.GLASSTYPE);
      if (!status){
        notifications.glassTypeNotAvailable = {
          status: true,
          variant: notificationsVariant.WARNING,
          message: `Glass type "${selectedContent.glassType.item?.name}" is not available in thickness "${selectedContent.glassType.thickness}".`,
        };
      }
    }

    if(selectedContent.glassAddons?.length){
      let glassAddonsNotAvailable = [];
      selectedContent.glassAddons.forEach(element => {
        if(!getActiveStatus(element?.item,null,hardwareTypes.GLASSADDONS)){
          glassAddonsNotAvailable.push({
          status: true,
          variant: notificationsVariant.WARNING,
          message: `Glass Addon "${element?.item?.name}" is not available.`,
          });
        }
      });
      if(glassAddonsNotAvailable.length){
        notifications.glassAddonsNotAvailable = glassAddonsNotAvailable;
      }
    }

    if(selectedContent.hardwareAddons?.length && selectedContent.hardwareFinishes){
      let hardwareAddonsNotAvailable = [];
      selectedContent.hardwareAddons.forEach(element => {
        if(!getActiveStatus(element.item,selectedContent.hardwareFinishes,hardwareTypes.HARDWAREADDONS)){
          hardwareAddonsNotAvailable.push({
          status: true,
          variant: notificationsVariant.WARNING,
          message: `Hardware Addon "${element.item?.name}" is not available in finish "${selectedContent.hardwareFinishes?.name}".`,
          });
        }
      });
      if(hardwareAddonsNotAvailable.length){
        notifications.hardwareAddonsNotAvailable = hardwareAddonsNotAvailable;
      }
    }

    if (selectedContent.mountingState === 'channel' && selectedContent.mountingChannel?.item && selectedContent.hardwareFinishes) {
      const status = getActiveStatus(selectedContent.mountingChannel?.item,selectedContent.hardwareFinishes,hardwareTypes.CHANNEL);
       if(!status){
        notifications.channelNotAvailable = {
          status: true,
          variant: notificationsVariant.WARNING,
          message: `Mounting Channel "${selectedContent.mountingChannel.item?.name}" is not available in finish "${selectedContent.hardwareFinishes?.name}".`,
        };
       }else{
         //Generate Warning if channel is selected 
        notifications.calculateChannelWarning  = {
          status: true,
          variant: notificationsVariant.WARNING,
          message: 'Current channel price is being calculated according to 1 channel stick',
        }
       }}

    if(selectedContent.mountingState === 'clamps' && selectedContent.mountingClamps?.wallClamp?.length && selectedContent.hardwareFinishes){
      let wallClampNotAvailable = [];
      selectedContent.mountingClamps.wallClamp.forEach(element => {
        if(!getActiveStatus(element.item,selectedContent.hardwareFinishes,hardwareTypes.WALLCLAMP)){
          wallClampNotAvailable.push({
          status: true,
          variant: notificationsVariant.WARNING,
          message: `Mounting Wall Clamp "${element.item?.name}" is not available in finish "${selectedContent.hardwareFinishes?.name}".`,
          });
        }
      });
      if(wallClampNotAvailable.length){
        notifications.wallClampNotAvailable = wallClampNotAvailable;
      }
    }

    if(selectedContent.mountingState === 'clamps' && selectedContent.mountingClamps?.sleeveOver?.length && selectedContent.hardwareFinishes){
      let sleeveOverNotAvailable = [];
      selectedContent.mountingClamps.sleeveOver.forEach(element => {
        if(!getActiveStatus(element.item,selectedContent.hardwareFinishes,hardwareTypes.SLEEVEOVER)){
          sleeveOverNotAvailable.push({
          status: true,
          variant: notificationsVariant.WARNING,
          message: `Mounting Sleeve Over "${element.item?.name}" is not available in finish "${selectedContent.hardwareFinishes?.name}".`,
          });
        }
      });
      if(sleeveOverNotAvailable.length){
        notifications.sleeveOverNotAvailable = sleeveOverNotAvailable;
      }
    }

    if(selectedContent.mountingState === 'clamps' && selectedContent.mountingClamps?.glassToGlass?.length && selectedContent.hardwareFinishes){
      let glassToGlassNotAvailable = [];
      selectedContent.mountingClamps.glassToGlass.forEach(element => {
        if(!getActiveStatus(element.item,selectedContent.hardwareFinishes,hardwareTypes.GLASSTOGLASS)){
          glassToGlassNotAvailable.push({
          status: true,
          variant: notificationsVariant.WARNING,
          message: `Mounting Glass to Glass "${element.item?.name}" is not available in finish "${selectedContent.hardwareFinishes?.name}".`,
          });
        }
      });
      if(glassToGlassNotAvailable.length){
        notifications.glassToGlassNotAvailable = glassToGlassNotAvailable;
      }
    }

    if(selectedContent.cornerClamps?.cornerWallClamp?.length && selectedContent.hardwareFinishes){
      let cornerWallClampNotAvailable = [];
      selectedContent.cornerClamps.cornerWallClamp.forEach(element => {
        if(!getActiveStatus(element.item,selectedContent.hardwareFinishes,hardwareTypes.CORNERWALLCLAMP)){
          cornerWallClampNotAvailable.push({
          status: true,
          variant: notificationsVariant.WARNING,
          message: `Corner Wall Clamp "${element.item?.name}" is not available in finish "${selectedContent.hardwareFinishes?.name}".`,
          });
        }
      });
      if(cornerWallClampNotAvailable.length){
        notifications.cornerWallClampNotAvailable = cornerWallClampNotAvailable;
      }
    }

    if(selectedContent.cornerClamps?.cornerSleeveOver?.length && selectedContent.hardwareFinishes){
      let cornerSleeveOverNotAvailable = [];
      selectedContent.cornerClamps.cornerSleeveOver.forEach(element => {
        if(!getActiveStatus(element.item,selectedContent.hardwareFinishes,hardwareTypes.CORNERSLEEVEOVER)){
          cornerSleeveOverNotAvailable.push({
          status: true,
          variant: notificationsVariant.WARNING,
          message: `Corner Sleeve Over "${element.item?.name}" is not available in finish "${selectedContent.hardwareFinishes?.name}".`,
          });
        }
      });
      if(cornerSleeveOverNotAvailable.length){
        notifications.cornerSleeveOverNotAvailable = cornerSleeveOverNotAvailable;
      }
    }

    if(selectedContent.cornerClamps?.cornerGlassToGlass?.length && selectedContent.hardwareFinishes){
      let cornerGlassToGlassNotAvailable = [];
      selectedContent.cornerClamps.cornerGlassToGlass.forEach(element => {
        if(!getActiveStatus(element.item,selectedContent.hardwareFinishes,hardwareTypes.CORNERGLASSTOGLASS)){
          cornerGlassToGlassNotAvailable.push({
          status: true,
          variant: notificationsVariant.WARNING,
          message: `Corner Glass to Glass "${element.item?.name}" is not available in finish "${selectedContent.hardwareFinishes?.name}".`,
          });
        }
      });
      if(cornerGlassToGlassNotAvailable.length){
        notifications.cornerGlassToGlassNotAvailable = cornerGlassToGlassNotAvailable;
      }
    }

    /** Panel overweight notification */
    if (panelWeight > panelOverWeightAmount) {
      notifications.panelOverweight = {
        status: true,
        variant: notificationsVariant.INFO,
        message: `Panel weight is over ${panelOverWeightAmount}lb check your labor`,
      };
    } else {
      if(notifications.panelOverweight.status){
        notifications.panelOverweight = {
          status: false,
          variant: notificationsVariant.INFO,
          message: `Panel weight is normal`,
        };
      }
    }
    /** end */

    return { notifications, selectedContent };
};

const getSwitchHingeNotification = (
  selectedContent,
  reduxSelectedItem,
  panelWeight,
  reduxListData,
  doorWidth,
  measurements,
) => {
  const measurementsObject = convertArrayKeysToObject(measurements);
  // console.log('hinges switch',doorWeight > (reduxSelectedItem?.settings?.heavyDutyOption?.height || 80),doorWeight,(reduxSelectedItem?.settings?.heavyDutyOption?.height || 80))
if(reduxSelectedItem?.settings?.glassType?.thickness === thicknessTypes.ONEBYTWO && selectedContent.glassType?.thickness === thicknessTypes.ONEBYTWO){
  let hinge = reduxListData?.hinges?.find(
    (item) =>
      item._id === reduxSelectedItem?.settings?.heavyDutyOption?.heavyDutyType
  );
  if (hinge) {
    let hingesCost = getHardwareCostBySelectedFinish(hinge,selectedContent?.hardwareFinish?._id);
    // set Notification
    const hingesSwitch = {
      status: false,
      variant: notificationsVariant.WARNING,
      message: '',
    };
    // Unselect content from slice
    const hinges = {
      ...selectedContent.hinges,
      item: hinge,
      cost : hingesCost ?? 0
    };
    return { hingesSwitch, hinges };
}
}
else{
  if (
    // reduxSelectedItem?.settings?.heavyDutyOption?.threshold > 0 &&
    // doorWidth > reduxSelectedItem?.settings?.heavyDutyOption?.threshold
  //  doorWeight > (reduxSelectedItem?.settings?.heavyDutyOption?.height || 80) || doorWidth > 28 ||
  //  measurements[0].value > (reduxSelectedItem?.settings?.heavyDutyOption?.height || 80)
  doorWidth > standardDoorWidth || measurementsObject?.a > (reduxSelectedItem?.settings?.heavyDutyOption?.height || 85) || panelWeight > panelOverWeightAmount 
  ) {
    let hinge = reduxListData?.hinges?.find(
      (item) =>
        item._id === reduxSelectedItem?.settings?.heavyDutyOption?.heavyDutyType
    );
    if (hinge) {
      let hingesCost = getHardwareCostBySelectedFinish(hinge,selectedContent?.hardwareFinish?._id);
      // set Notification
      const hingesSwitch = {
        status: true,
        variant: notificationsVariant.WARNING,
        message: `Hinges switched from standard to heavy`,
      };
      // Unselect content from slice
      const hinges = {
        ...selectedContent.hinges,
        item: hinge,
        cost : hingesCost ?? 0
      };
      return { hingesSwitch, hinges };
    } else {
      return null;
    }
  } else { // shift back to normal hinges if layout dimensions are normal and heavy duty hinge is not layout default hinge
    if(reduxSelectedItem?.settings?.heavyDutyOption?.heavyDutyType === selectedContent.hinges?.item?._id && reduxSelectedItem?.settings?.hinges?.hingesType !== reduxSelectedItem?.settings?.heavyDutyOption?.heavyDutyType){
      let hinge = reduxListData?.hinges?.find(
        (item) =>
          item._id === reduxSelectedItem?.settings?.hinges?.hingesType
      );
      if(hinge){
        let hingesCost = getHardwareCostBySelectedFinish(hinge,selectedContent?.hardwareFinish?._id);
        // set Notification
      const hingesSwitch = {
        status: true,
        variant: notificationsVariant.INFO,
        message: `Hinges switched from heavy to standard`,
      };
      // Unselect content from slice
      const hinges = {
        ...selectedContent.hinges,
        item: hinge,
        cost : hingesCost ?? 0
      };
      return { hingesSwitch, hinges };
      }
    }
    else{
      return null;
    }
  }
};
}
const getGlassThicknessShiftNotification = (
  selectedContent,
  reduxSelectedItem,
  calculatedGlassThickness
) => {
  if (
    calculatedGlassThickness &&
    calculatedGlassThickness === thicknessTypes.ONEBYTWO
  ) {
    //set notification
    const glassThicknessSwitch = {
      status: reduxSelectedItem?.settings?.glassType?.thickness !== thicknessTypes.ONEBYTWO  ? true : false,
      variant: notificationsVariant.WARNING,
      message: `Glass thickness switched from ${thicknessTypes.THREEBYEIGHT} to ${thicknessTypes.ONEBYTWO}`,
    };
     let glassCost = getGlassCostBySelectedthickness(selectedContent.glassType,calculatedGlassThickness); 
    // set glass thickness
    const glassType = {
      ...selectedContent.glassType,
      thickness: calculatedGlassThickness,
      cost : glassCost ?? 0
    };
    return { glassThicknessSwitch, glassType };
  } else {
    if(selectedContent.glassType?.thickness === thicknessTypes.ONEBYTWO && reduxSelectedItem?.settings?.glassType?.thickness === thicknessTypes.THREEBYEIGHT){
    //set notification
    const glassThicknessSwitch = {
      status: true,
      variant: notificationsVariant.INFO,
      message: `Glass thickness switched from ${thicknessTypes.ONEBYTWO} to ${thicknessTypes.THREEBYEIGHT}`,
    };
    let glassCost = getGlassCostBySelectedthickness(selectedContent.glassType,thicknessTypes.THREEBYEIGHT); 
    // set glass thickness
    const glassType = {
      ...selectedContent.glassType,
      thickness: thicknessTypes.THREEBYEIGHT,
      cost : glassCost ?? 0
    };
    return { glassThicknessSwitch, glassType };
    }
    return null;
  }
};

const getHardwareCostBySelectedFinish = (hardware,finishId)=>{
  return  hardware?.finishes?.find((item) => item?.finish_id === finishId)?.cost;
}
const getGlassCostBySelectedthickness = (hardware,thickness)=>{
  return   hardware?.item?.options?.find((option) => option?.thickness === thickness)?.cost;
}