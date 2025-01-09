import { createSlice } from "@reduxjs/toolkit";
export const getLocationMirrorSettings = (state) => state.location.mirrors;
export const getLocationShowerSettings = (state) => state.location.showers;
export const getLocationWineCellarSettings = (state) => state.location.wineCellars;
export const getLocationPdfSettings = (state) => state.location.pdfSettings;
export const getLocationPresentationSettings = (state) => state.location.presentationSettings;

const locationSlice = createSlice({
  name: "location",
  initialState: {
    name: "",
    image: "",
    address: "",
    mirrors: null,
    showers: null,
    wineCellars: null,
    pdfSettings: null,
    presentationSettings: null,
  },
  reducers: {
    setLocationInfo: (state, actions) => {
      const { payload } = actions;
      state.name = payload?.name ?? "";
      state.image = payload?.image ?? "";
      state.address = payload?.address ?? "";
      state.showers = payload?.showers ?? null;
      state.mirrors = payload?.mirrors ?? null;
      state.wineCellars = payload?.wineCellars ?? null;
      state.pdfSettings = payload?.pdfSettings ?? null;
      state.presentationSettings = payload?.presentationSettings ?? null;
    },
  },
});

export const { setLocationInfo } = locationSlice.actions;

export default locationSlice.reducer;
