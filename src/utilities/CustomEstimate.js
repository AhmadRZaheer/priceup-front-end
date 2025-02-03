import {
  addSelectedItem,
  resetNotifications,
  setDoorWeight,
  setDoorWidth,
  setisCustomizedDoorWidth,
  setPanelWeight,
  setQuoteState,
  setReturnWeight,
  setShowerProjectId,
  updateMeasurements,
} from '@/redux/customEstimateSlice';
import { resetState } from '@/redux/estimateCalculations';
import {
  setEstimateCategory,
  setEstimateState,
  setProjectId,
} from '@/redux/estimateSlice';

import { calculateAreaAndPerimeter } from './common';
import { quoteState } from './constants';

export const setStateForCustomEstimate = (item, dispatch, navigate,redirect = false) => {
  dispatch(resetNotifications());
  dispatch(setEstimateCategory(item?.category));
  dispatch(setEstimateState(quoteState.EDIT));
  dispatch(resetState());
  dispatch(setisCustomizedDoorWidth(item.config.isCustomizedDoorWidth));
  dispatch(updateMeasurements(item.config.measurements));
  dispatch(addSelectedItem(item));
  dispatch(setProjectId(item?.project_id));
  dispatch(setShowerProjectId(item?.project_id));
  dispatch(setQuoteState(quoteState.EDIT));
  const result = calculateAreaAndPerimeter(
    item.config.measurements,
    item?.settings?.variant,
    item.config.glassType.thickness,
    {doorQuantity:item.config?.doorQuantity}
  );
  if (result?.doorWidth && item.config.isCustomizedDoorWidth === false) {
    dispatch(setDoorWidth(result?.doorWidth));
  } else {
    dispatch(setDoorWidth(item?.doorWidth));
  }
  if (result?.doorWeight) {
    dispatch(setDoorWeight(result?.doorWeight));
  }
  if (result?.panelWeight) {
    dispatch(setPanelWeight(result?.panelWeight));
  }
  if (result?.returnWeight) {
    dispatch(setReturnWeight(result?.returnWeight));
  }
//   if (result?.backWallGlassWeight) {
//     dispatch(setBackWallGlassWeight(result?.backWallGlassWeight));
//   }
  if(navigate){
    // navigate("/estimates/dimensions");
    if(redirect){
      navigate(
        `/estimates/dimensions?category=${item?.category}&projectId=${item?.project_id}&estimateState=${quoteState.EDIT}&estimateId=${item?._id}&layoutId=${item?.config?.layout_id}&redirectTab=all`
      );
    }else{
      navigate(
        `/estimates/dimensions?category=${item?.category}&projectId=${item?.project_id}&estimateState=${quoteState.EDIT}&estimateId=${item?._id}&layoutId=${item?.config?.layout_id}`
      );
    }
  }
};