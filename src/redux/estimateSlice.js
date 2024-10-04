import { createSlice } from "@reduxjs/toolkit";
export const getEstimateCategory = (state) => state.estimate.estimateCategory;
export const getEstimateState = (state) => state.estimate.estimateState;
export const getProjectId = (state) => state.estimate.projectId;
export const getCustomerDetail = (state) => state.estimate.customerDetail;

const initialState = {
  estimateCategory: "", // 'showers' || 'mirrors'
  estimateState: "", // 'create' || 'edit'
  projectId: "",
  customerDetail : null,
};

const estimateSlice = createSlice({
  name: "estimate",
  initialState,
  reducers: {
    resetEstimateState: (state) => {
      return {
        ...initialState,
       customerDetail: state.customerDetail
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
  },
});

export const { setEstimateCategory, setEstimateState, resetEstimateState, setProjectId,setCustomerDetail } =
  estimateSlice.actions;

export default estimateSlice.reducer;
