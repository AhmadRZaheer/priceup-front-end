import { configureStore } from "@reduxjs/toolkit";

import hardwareReducer from "./hardwareSlice";
import formSlice from "./formSlice";
import userAuth from "./userAuth";
import estimateCalculations from "./estimateCalculations";
import selectedIdSlice from "./selectedIdSlice";
import defaultSlice from "./defaultSlice";
const store = configureStore({
  reducer: {
    hardware: hardwareReducer,
    form: formSlice,
    userAuth: userAuth,
    estimateCalculations: estimateCalculations,
    selectedIdSlice: selectedIdSlice,
    defaultSlice: defaultSlice,
  },
});

export default store;
