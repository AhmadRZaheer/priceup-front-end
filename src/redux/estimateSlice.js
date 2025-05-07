import { createSlice } from "@reduxjs/toolkit";
export const getEstimateCategory = (state) => state.estimate.estimateCategory;
export const getEstimateState = (state) => state.estimate.estimateState;
export const getProjectId = (state) => state.estimate.projectId;
export const getCustomerDetail = (state) => state.estimate.customerDetail;
export const getSkeltonState = (state) => state.estimate.skeltonState;

const initialState = {
  estimateCategory: "", // 'showers' || 'mirrors'
  estimateState: "", // 'create' || 'edit'
  projectId: "",
  customerDetail: null,
  skeltonState: true,
};

const estimateSlice = createSlice({
  name: "estimate",
  initialState,
  reducers: {
    resetEstimateState: (state) => {
      return {
        ...initialState,
        customerDetail: state.customerDetail,
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
    setCustomerDetail: (state, actions) => {
      state.customerDetail = actions.payload;
    },
    setSkeltonState: (state) => {
      state.skeltonState = false;
    },
  },
});

export const {
  setEstimateCategory,
  setEstimateState,
  resetEstimateState,
  setProjectId,
  setCustomerDetail,
  setSkeltonState,
} = estimateSlice.actions;

export default estimateSlice.reducer;
