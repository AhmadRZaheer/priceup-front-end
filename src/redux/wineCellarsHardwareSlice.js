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
    },
  },
});

export const { setWineCellarsHardware } = wineCellarsHardwareSlice.actions;

export default wineCellarsHardwareSlice.reducer;
