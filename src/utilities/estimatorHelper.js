import { hardwareTypes } from "./constants";

export const getActiveStatus = (selectedItem,selectedFinish,type) => {
 switch(type){
    case hardwareTypes.HANDLES:
      return selectedItem?.finishes?.find((item)=>item.finish_id===selectedFinish?._id)?.status;
    case hardwareTypes.HINGES:
      return selectedItem?.finishes?.find((item)=>item.finish_id===selectedFinish?._id)?.status;
    case hardwareTypes.SLIDINGDOORSYSTEM:
        return selectedItem?.finishes?.find((item)=>item.finish_id===selectedFinish?._id)?.status;
    case hardwareTypes.HEADER:
        return selectedItem?.finishes?.find((item)=>item.finish_id===selectedFinish?._id)?.status;
    default:
        return true;
 }
}

export const getEstimateErrorStatus = (selectedContent) => {
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
   return true;
}