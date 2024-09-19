import { createSlice } from "@reduxjs/toolkit";
export const getEstimateCategory = (state) => state.estimate.estimateCategory;
export const getEstimateState = (state) => state.estimate.estimateState;
export const getProjectId = (state) => state.estimate.projectId;

const initialState = {
  estimateCategory: "", // 'showers' || 'mirrors'
  estimateState: "", // 'create' || 'edit'
  projectId: ""
};

const estimateSlice = createSlice({
  name: "estimate",
  initialState,
  reducers: {
    resetEstimateState: (state) => {
      return {
        ...initialState,
      };
    },
    setEstimateCategory: (state, actions) => {
      const { payload } = actions;
      state.estimateCategory = payload;
    },
    setEstimateState: (state, actions) => {
      const { payload } = actions;
      state.estimateState = payload;
    },
    setProjectId: (state, actions) => {
      const { payload } = actions;
      state.projectId = payload;
    },
  },
});

export const { setEstimateCategory, setEstimateState, resetEstimateState, setProjectId } =
  estimateSlice.actions;

export default estimateSlice.reducer;
