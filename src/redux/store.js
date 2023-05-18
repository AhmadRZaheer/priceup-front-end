import { configureStore } from "@reduxjs/toolkit";

import hardwareReducer from "./hardwareSlice";
import formSlice from "./formSlice";
const store = configureStore({
  reducer: {
    hardware: hardwareReducer,
    form: formSlice,
  },
});

export default store;
