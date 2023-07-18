import { createSlice } from "@reduxjs/toolkit";
export const getDefaultId = (state) => state.defaultSlice.defaultId;

const defaultSlice = createSlice({
  name: "default",
  initialState: {
    defaultId: "64b1519397c2fbba74ad806b",
  },
  reducers: {
    setDefaultId: (state, action) => {
      state.defaultId = action.payload;
    },
  },
});
export const { setDefaultId } = defaultSlice.actions;
export default defaultSlice.reducer;
