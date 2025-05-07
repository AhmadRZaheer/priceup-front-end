import { createSlice } from "@reduxjs/toolkit";
export const getDataRefetch = (state) => state.staff.refetchData;

const staffSlice = createSlice({
  name: "staff",
  initialState: {
    refetchData: 0,
  },
  reducers: {
    setDataRefetch: (state) => {
      state.refetchData += 1;
    },
  },
});

export const { setDataRefetch } = staffSlice.actions;

export default staffSlice.reducer;
