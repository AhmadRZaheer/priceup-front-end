export const getActiveStatus = (selectedItem,selectedFinish,type) => {
 switch(type){
    case 'handles':
      return selectedItem?.finishes?.find((item)=>item.finish_id===selectedFinish?._id)?.status;
    case 'hinges':
      return selectedItem?.finishes?.find((item)=>item.finish_id===selectedFinish?._id)?.status;
    case 'slidingDoorSystem':
        return selectedItem?.finishes?.find((item)=>item.finish_id===selectedFinish?._id)?.status;
    case 'header':
        return selectedItem?.finishes?.find((item)=>item.finish_id===selectedFinish?._id)?.status;
    default:
        return true;
 }
}