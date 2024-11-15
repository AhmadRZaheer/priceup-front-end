import { createSlice } from "@reduxjs/toolkit";
export const getProjectDetails = (state) =>
  state.globalEstimateForm.projectDetails;
export const getEstimateCategory = (state) => state.globalEstimateForm.category;
export const getEstimateLayout = (state) => state.globalEstimateForm.layout;
export const getEstimateDetail = (state) =>
  state.globalEstimateForm.estimateDetails;
export const getReviewDetail = (state) =>
  state.globalEstimateForm.reviewDetails;
export const getEstimates = (state) => state.globalEstimateForm.estimates;
export const getSelectedImages = (state) => state.globalEstimateForm.selectedImages;

const globalEstimateForm = createSlice({
  name: "globalEstimateForm",
  initialState: {
    projectDetails: {},
    category: "",
    layout: "",
    estimateDetails: {},
    reviewDetails: {},
    estimates: [],
    selectedImages : []
  },
  reducers: {
    setSelectedImages: (state, action) => {
      state.selectedImages =[...state.selectedImages, ...action.payload];;
    },
    removeImage: (state, action) => {
      state.selectedImages = state.selectedImages.filter((_, i) => i !== action.payload);
    },
    setProjectDetails: (state, action) => {
      state.projectDetails = action.payload;
    },
    setEstimateCategory: (state, action) => {
      state.category = action.payload;
    },
    setEstimateLayout: (state, action) => {
      state.layout = action.payload;
    },
    setEstimateDetail: (state, action) => {
      state.estimateDetails = action.payload;
    },
    setReviewDetail: (state, action) => {
      state.reviewDetails = action.payload;
    },
    setEstimatesCollection: (state, action) => {
      state.estimates = [...state.estimates, action.payload];
    },
  },
});
export const {
  setSelectedImages,
  removeImage,
  setProjectDetails,
  setEstimateCategory,
  setEstimateLayout,
  setEstimateDetail,
  setReviewDetail,
  setEstimatesCollection,
} = globalEstimateForm.actions;
export default globalEstimateForm.reducer;