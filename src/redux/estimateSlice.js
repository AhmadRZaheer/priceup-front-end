import { createSlice } from "@reduxjs/toolkit";
export const getEstimateCategory = (state) => state.estimate.estimateCategory;
export const getEstimateState = (state) => state.estimate.estimateState;

const initialState = {
  estimateCategory: "", // 'showers' || 'mirrors'
  estimateState: "", // 'create' || 'edit'
};

const estimateSlice = createSlice({
  name: "estimate",
  initialState,
  reducers: {
    setEstimateCategory: (state, actions) => {
      const { payload } = actions;
      state.estimateCategory = payload;
    },
    setEstimateState: (state, actions) => {
      const { payload } = actions;
      state.estimateState = payload;
    },
  },
});

export const { setEstimateCategory, setEstimateState } = estimateSlice.actions;

export default estimateSlice.reducer;
