import { createSlice } from "@reduxjs/toolkit";
export const getMirrorsHardware = (state) => state.mirrorsHardware;

const mirrorsHardwareSlice = createSlice({
  name: "mirrorsHardware",
  initialState: {
    edgeWorks: [],
    glassTypes: [],
    glassAddons: [],
    hardwares: [],
  },
  reducers: {
    setMirrorsHardware: (state, actions) => {
      const { payload } = actions;
      state.edgeWorks = payload?.edgeWorks ?? [];
      state.glassTypes = payload?.glassTypes ?? [];
      state.glassAddons = payload?.glassAddons ?? [];
      state.hardwares = payload?.hardwares ?? [];
    },
  },
});

export const { setMirrorsHardware } = mirrorsHardwareSlice.actions;

export default mirrorsHardwareSlice.reducer;
