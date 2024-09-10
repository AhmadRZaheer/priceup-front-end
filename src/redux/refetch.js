import { createSlice } from "@reduxjs/toolkit";
export const getEstimatesListRefetch = (state) => state.refetch.estimatesList;
export const getLocationSettingsRefetch = (state) =>
  state.refetch.locationSettingsRefetch;
export const getMirrorsHardwareRefetch = (state) =>
  state.refetch.mirrorsHardwareRefetch;
export const getShowersHardwareRefetch = (state) =>
  state.refetch.showersHardwareRefetch;
export const getNotificationsRefetch = (state) =>
  state.refetch.notificationsRefetch;
export const getLocationsRefetch = (state) =>
  state.refetch.locationsRefetch;
export const getChangeLocation = (state) =>
  state.refetch.locationsChange;


const refetchSlice = createSlice({
  name: "refetch",
  initialState: {
    estimatesList: 0,
    locationSettingsRefetch: 0,
    mirrorsHardwareRefetch: 0,
    showersHardwareRefetch: 0,
    notificationsRefetch: 0,
    locationsRefetch: 0,
    locationsChange: 0,
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
    setNotificationsRefetch: (state) => {
      state.notificationsRefetch += 1;
    },
    setLocationsRefetch: (state) => {
      state.locationsRefetch += 1;
    },
    setChangeLocation: (state) => {
      state.locationsChange += 1;
    },
  },
});

export const {
  setEstimatesListRefetch,
  setLocationSettingsRefetch,
  setMirrorsHardwareRefetch,
  setShowersHardwareRefetch,
  setNotificationsRefetch,
  setLocationsRefetch,
  setChangeLocation
} = refetchSlice.actions;

export default refetchSlice.reducer;
