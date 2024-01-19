import { createSlice } from "@reduxjs/toolkit";
export const getEstimatesListRefetch = (state) => state.refetch.estimatesList;

const refetchSlice = createSlice({
  name: "refetch",
  initialState: {
    estimatesList: 0,
  },
  reducers: {
    setEstimatesListRefetch: (state) => {
      state.estimatesList += 1;
    },
  },
});

export const { setEstimatesListRefetch } = refetchSlice.actions;

export default refetchSlice.reducer;
