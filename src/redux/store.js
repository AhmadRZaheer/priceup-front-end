import { configureStore } from '@reduxjs/toolkit';

import customerEstimationSlice from './customerEstimateCalculation';
import customsEstimateSlice from './customEstimateSlice';
import defaultSlice from './defaultSlice';
import estimateCalculations from './estimateCalculations';
import estimateReducer from './estimateSlice';
import formSlice from './formSlice';
import globalEstimateForm from './globalEstimateForm';
import hardwareReducer from './hardwareSlice';
import locationReducer from './locationSlice';
import mirrorsEstimateReducer from './mirrorsEstimateSlice';
import mirrorsHardwareReducer from './mirrorsHardwareSlice';
import notificationsSlice from './notificationsSlice';
import refetchSlice from './refetch';
import selectedIdSlice from './selectedIdSlice';
import snackBarSlice from './snackBarSlice';
import staffSlice from './staff';
import userAuth from './userAuth';
import wineCellarsEstimateReducer from './wineCellarEstimateSlice';
// import wineCellarSlice from "./wineCellarSlice";
import wineCellarsHardwareReducer from './wineCellarsHardwareSlice';

const store = configureStore({
  reducer: {
    hardware: hardwareReducer,
    form: formSlice,
    userAuth: userAuth,
    estimateCalculations: estimateCalculations,
    selectedIdSlice: selectedIdSlice,
    defaultSlice: defaultSlice,
    staff: staffSlice,
    snackbar: snackBarSlice,
    refetch: refetchSlice,
    location: locationReducer,
    mirrorsHardware: mirrorsHardwareReducer,
    estimate: estimateReducer,
    mirrorsEstimate: mirrorsEstimateReducer,
    notifications: notificationsSlice,
    // wineCellar: wineCellarSlice,
    wineCellarsHardware: wineCellarsHardwareReducer,
    wineCellarsEstimate: wineCellarsEstimateReducer,
    globalEstimateForm: globalEstimateForm,
    customerEstimation: customerEstimationSlice,
    customsEstimate: customsEstimateSlice,
  },
});

export default store;
