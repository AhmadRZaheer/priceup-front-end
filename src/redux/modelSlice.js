import { createSlice } from '@reduxjs/toolkit';

export const getCostDifferenceModelStatus = (state) => state.model.costDifference.modelStatus;
export const getCostDifferenceModelData = (state) => state.model.costDifference.modelData;

const initialState = {
costDifference : {
modelStatus: false,
modelData: null,
}
};

const modelSlice = createSlice({
  name: "model",
  initialState,
  reducers: {
    resetModelState: (state) => {
      return {
        ...initialState,
      };
    },
    setCostDifferenceModelState: (state, actions) => {
      const { payload } = actions;
      state.costDifference.modelStatus = payload;
    },
    setCostDifferenceModelData: (state, actions) => {
      const { payload } = actions;
      state.costDifference.modelData = payload;
    },
  },
});

export const { resetModelState, setCostDifferenceModelState, setCostDifferenceModelData } =
  modelSlice.actions;

export default modelSlice.reducer;
