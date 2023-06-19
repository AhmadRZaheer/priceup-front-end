import { configureStore } from "@reduxjs/toolkit";

import hardwareReducer from "./hardwareSlice";
import formSlice from "./formSlice";
import userAuth from "./userAuth";
const store = configureStore({
  reducer: {
    hardware: hardwareReducer,
    form: formSlice,
    userAuth: userAuth,
  },
});

export default store;
