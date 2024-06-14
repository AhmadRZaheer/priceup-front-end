import { createSlice } from "@reduxjs/toolkit";
import { userRowsHardware } from "@/utilities/DataGridColumns";

const hardwareSlice = createSlice({
  name: "hardware",
  initialState: userRowsHardware,
  reducers: {
    deleteHardware: (state, action) => {
      const id = action.payload;
      return state.filter((hardware) => hardware.id !== id);
    },
 

    editHardware: (state, action) => {
      const updatedHardware = action.payload;
      return state.map((hardware) =>
        hardware.id === updatedHardware.id ? updatedHardware : hardware
      );
    },
    addHardware: (state, action) => {
      const newHardware = action.payload;
      state.push(newHardware);
    },
  },
});

export const { deleteHardware, editHardware, addHardware } =
  hardwareSlice.actions;

export default hardwareSlice.reducer;
