import { createSlice } from "@reduxjs/toolkit";
export const getLocationMirrorSettings = (state) => state.location.mirrors;
export const getLocationShowerSettings = (state) => state.location.showers;
export const getLocationWineCellarSettings = (state) => state.location.wineCellars;

const locationSlice = createSlice({
  name: "location",
  initialState: {
    name: "",
    image: "",
    address: "",
    mirrors: null,
    showers: null,
    wineCellars: null,
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
    },
  },
});

export const { setLocationInfo } = locationSlice.actions;

export default locationSlice.reducer;
