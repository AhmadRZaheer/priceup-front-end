import { createSlice } from "@reduxjs/toolkit";
export const getWineCellarsHardware = (state) => state.wineCellarsHardware;

const wineCellarsHardwareSlice = createSlice({
  name: "wineCellarsHardware",
  initialState: {
    hardwareFinishes: [],
    handles: [],
    hinges: [],
    heavyDutyOption: [],
    channelOrClamps: ["Channel"],
    mountingChannel: [],
    doorLocks: [],
    glassType: [],
    glassAddons: [],
    slidingDoorSystem: [],
    header: [],
    transom: [],
    cornerGlassToGlass: [],
    glassToGlass: [],
    cornerSleeveOver: [],
    sleeveOver: [],
    wallClamp: [],
    cornerWallClamp: [],
    hardwareAddons: [],
  },
  reducers: {
    setWineCellarsHardware: (state, actions) => {
      const { payload } = actions;
      state.hardwareFinishes = payload?.hardwareFinishes ?? [];
      state.handles = payload?.handles ?? [];
      state.hinges = payload?.hinges ?? [];
      state.heavyDutyOption = payload?.heavyDutyOption ?? [];
      state.channelOrClamps = payload?.channelOrClamps ?? [];
      state.mountingChannel = payload?.mountingChannel ?? [];
      state.doorLocks = payload?.doorLocks ?? [];
      state.glassType = payload?.glassType ?? [];
      state.glassAddons = payload.glassAddons ?? [];
      state.slidingDoorSystem = payload.slidingDoorSystem ?? [];
      state.header = payload.header ?? [];
      state.transom = payload.transom ?? [];
      state.cornerGlassToGlass = payload.cornerGlassToGlass ?? [];
      state.glassToGlass = payload.glassToGlass ?? [];
      state.cornerSleeveOver = payload.cornerSleeveOver ?? [];
      state.sleeveOver = payload.sleeveOver ?? [];
      state.wallClamp = payload.wallClamp ?? [];
      state.cornerWallClamp = payload.cornerWallClamp ?? [];
      state.hardwareAddons = payload.hardwareAddons ?? [];
    },
  },
});

export const { setWineCellarsHardware } = wineCellarsHardwareSlice.actions;

export default wineCellarsHardwareSlice.reducer;
