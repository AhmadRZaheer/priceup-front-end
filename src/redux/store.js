import { configureStore } from "@reduxjs/toolkit";

import hardwareReducer from "./hardwareSlice";
import formSlice from "./formSlice";
import userAuth from "./userAuth";
import estimateCalculations from "./estimateCalculations";
import selectedIdSlice from "./selectedIdSlice";
import defaultSlice from "./defaultSlice";
import staffSlice from "./staff";
import snackBarSlice from "./snackBarSlice";
import refetchSlice from "./refetch";
import locationReducer from "./locationSlice";
import mirrorsHardwareReducer from "./mirrorsHardwareSlice";
import estimateReducer from "./estimateSlice";
import mirrorsEstimateReducer from "./mirrorsEstimateSlice";
import notificationsSlice from "./notificationsSlice";

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
  },
});

export default store;
