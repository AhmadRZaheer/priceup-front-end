import { configureStore } from "@reduxjs/toolkit";

import hardwareReducer from "./hardwareSlice";
const store = configureStore({
  reducer: {
    hardware: hardwareReducer,
  },
});

export default store;
