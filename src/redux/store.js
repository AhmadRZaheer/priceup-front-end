import { configureStore } from "@reduxjs/toolkit";

import hardwareReducer from "./hardwareSlice";
import formSlice from "./formSlice";
import userAuth from "./userAuth";
import estimateCalculations from "./estimateCalculations";
import selectedIdSlice from "./selectedIdSlice";
import defaultSlice from "./defaultSlice";
import staffSlice from "./staff";
const store = configureStore({
  reducer: {
    hardware: hardwareReducer,
    form: formSlice,
    userAuth: userAuth,
    estimateCalculations: estimateCalculations,
    selectedIdSlice: selectedIdSlice,
    defaultSlice: defaultSlice,
    staff: staffSlice,
  },
});

export default store;
