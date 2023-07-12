import { configureStore } from "@reduxjs/toolkit";

import hardwareReducer from "./hardwareSlice";
import formSlice from "./formSlice";
import userAuth from "./userAuth";
import selectedIdSlice from "./selectedIdSlice";
const store = configureStore({
  reducer: {
    hardware: hardwareReducer,
    form: formSlice,
    userAuth: userAuth,
    selectedIdSlice: selectedIdSlice,
  },
});

export default store;
