import { createSlice } from "@reduxjs/toolkit";
export const getEstimateMeasurements = (state) =>
  state.mirrorsEstimate.measurements;
export const getEstimateState = (state) => state.mirrorsEstimate.estimateState;
export const getEstimateId = (state) => state.mirrorsEstimate.estimateId;
export const getSqftArea = (state) => state.mirrorsEstimate.sqftArea;
export const getItemQuantity = (state) => state.mirrorsEstimate.itemQuantity;
export const getSelectedContent = (state) => state.mirrorsEstimate.content;
export const getPricing = (state) => state.mirrorsEstimate.pricing;
export const getSelectedItem = (state) => state.mirrorsEstimate.selectedItem;

const initialState = {
  estimateId: "",
  measurements: [],
  estimateState: "", // 'create' || 'edit'
  sqftArea: 0,
  profitPercentage: 0,
  modifiedProfitPercentage: 0,
  selectedItem: null,
  pricing: {
    labor: 0,
    glass: 0,
    fabrication: 0,
    misc: 0,
    cost: 0,
    total: 0,
  },
  content: {
    glassType: {
      item: null,
      thickness: "1/4",
    },
    edgeWork: {
      item: null,
      thickness: "1/4",
    },
    floatingSize: null,
    sandBlasting: 0,
    bevelStrip: false, // true, false
    safetyBacking: false, //true, false
    simpleHoles: 0,
    outlets: 0,
    lightHoles: 0,
    notch: 0,
    singleDecora: 0,
    doubleDecora: 0,
    tripleDecora: 0,
    quadDecora: 0,
    singleDuplex: 0,
    doubleDuplex: 0,
    tripleDuplex: 0,
    people: 0,
    hours: 0,
  },
  itemQuantity: 1,
};

const mirrorsEstimateSlice = createSlice({
  name: "mirrorsEstimate",
  initialState,
  reducers: {
    setThickness: (state, action) => {
      const { thickness, type } = action.payload;
      state.content = {
        ...state.content,
        [type]: {
          ...state.content[type],
          thickness: thickness,
        },
      };
    },
    setSelectedItem: (state, action) => {
      const { payload } = action;
      state.selectedItem = payload;
      state.estimateId = payload._id;
    },
    setEstimateMeasurements: (state, action) => {
      const { payload } = action;
      state.measurements = payload;
    },
    setEstimateState: (state, action) => {
      const { payload } = action;
      state.estimateState = payload;
    },
    setSelectedContent: (state, action) => {
      const { type, item } = action.payload;
      if (type === "floatingSize") {
        state.content = {
          ...state.content,
          [type]: item,
        };
      } else {
        state.content = {
          ...state.content,
          [type]: {
            ...state.content[type],
            item: item,
          },
        };
      }
    },
    setInputContent: (state, action) => {
      const { type, value } = action.payload;
      state.content = {
        ...state.content,
        [type]: Number(value),
      };
    },
    setToggles: (state, action) => {
      const { type, value } = action.payload;
      state.content = {
        ...state.content,
        [type]: value,
      };
    },
    setFloatingSize: (state, actions) => {
      const { payload } = actions;
      state.content.floatingSize = payload;
    },
    setBevelStrip: (state, actions) => {
      const { payload } = actions;
      state.content.bevelStrip = payload;
    },
    setSafetyBacking: (state, actions) => {
      const { payload } = actions;
      state.content.safetyBacking = payload;
    },
    setSqftArea: (state, actions) => {
      const { payload } = actions;
      state.sqftArea = payload;
    },
    setSandBlasting: (state, actions) => {
      const { payload } = actions;
      state.content.sandBlasting = payload;
    },
    setPricing: (state, actions) => {
      const { payload } = actions;
      state.pricing = payload;
    },
    initializeStateForEditQuote: (state, action) => {
      const { estimateData, hardwaresList } = action.payload;
      let glassTypee = null;
      glassTypee = hardwaresList?.glassTypes?.find(
        (item) => item._id === estimateData?.config?.glassType?.type
      );

      let edgeWork = null;
      edgeWork = hardwaresList?.edgeWorks?.find(
        (item) => item._id === estimateData?.config?.edgeWork?.type
      );

      state.estimateId = estimateData._id;
      state.content = {
        ...state.content,
        glassType: {
          item: glassTypee,
          thickness: estimateData?.config?.glassType?.thickness,
        },
        edgeWork: {
          item: edgeWork,
          thickness: estimateData?.config?.edgeWork?.thickness,
        },
        floatingSize: estimateData?.config?.floatingSize ?? null,
        sandBlasting: estimateData?.config?.sandBlasting,
        bevelStrip: estimateData?.config?.bevelStrip, // true, false
        safetyBacking: estimateData?.config?.safetyBacking, //true, false
        simpleHoles: estimateData?.config?.simpleHoles,
        outlets: estimateData?.config?.outlets,
        lightHoles: estimateData?.config?.lightHoles,
        notch: estimateData?.config?.notch,
        singleDecora: estimateData?.config?.singleDecora,
        doubleDecora: estimateData?.config?.doubleDecora,
        tripleDecora: estimateData?.config?.tripleDecora,
        quadDecora: estimateData?.config?.quadDecora,
        singleDuplex: estimateData?.config?.singleDuplex,
        doubleDuplex: estimateData?.config?.doubleDuplex,
        tripleDuplex: estimateData?.config?.tripleDuplex,
        people: estimateData?.config?.people,
        hours: estimateData?.config?.hours,
      };
    },
  },
});

export const {
  setEstimateMeasurements,
  setEstimateState,
  setSelectedContent,
  setInputContent,
  setFloatingSize,
  setBevelStrip,
  setSafetyBacking,
  setSqftArea,
  setThickness,
  setToggles,
  setSandBlasting,
  setPricing,
  setSelectedItem,
  initializeStateForEditQuote,
} = mirrorsEstimateSlice.actions;

export default mirrorsEstimateSlice.reducer;
