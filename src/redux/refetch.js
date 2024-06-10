import { createSlice } from "@reduxjs/toolkit";
export const getEstimatesListRefetch = (state) => state.refetch.estimatesList;
export const getLocationSettingsRefetch = (state) =>
  state.refetch.locationSettingsRefetch;
export const getMirrorsHardwareRefetch = (state) =>
  state.refetch.mirrorsHardwareRefetch;
export const getShowersHardwareRefetch = (state) =>
  state.refetch.showersHardwareRefetch;

const refetchSlice = createSlice({
  name: "refetch",
  initialState: {
    estimatesList: 0,
    locationSettingsRefetch: 0,
    mirrorsHardwareRefetch: 0,
    showersHardwareRefetch: 0,
  },
  reducers: {
    setEstimatesListRefetch: (state) => {
      state.estimatesList += 1;
    },
    setLocationSettingsRefetch: (state) => {
      state.locationSettingsRefetch += 1;
    },
    setMirrorsHardwareRefetch: (state) => {
      state.mirrorsHardwareRefetch += 1;
    },
    setShowersHardwareRefetch: (state) => {
      state.showersHardwareRefetch += 1;
    },
  },
});

export const {
  setEstimatesListRefetch,
  setLocationSettingsRefetch,
  setMirrorsHardwareRefetch,
  setShowersHardwareRefetch,
} = refetchSlice.actions;

export default refetchSlice.reducer;
