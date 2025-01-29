import {
  mirrorHardwareTypes,
  notificationsVariant,
} from '@/utilities/constants';
import {
  generateContentForMirrorEdit,
} from '@/utilities/generateEstimateCalculationContent';
import { createSlice } from '@reduxjs/toolkit';

export const getEstimateMeasurements = (state) =>
  state.mirrorsEstimate.measurements;
export const getEstimateState = (state) => state.mirrorsEstimate.estimateState;
export const getEstimateId = (state) => state.mirrorsEstimate.estimateId;
export const getSqftArea = (state) => state.mirrorsEstimate.sqftArea;
export const getItemQuantity = (state) => state.mirrorsEstimate.itemQuantity;
export const getSelectedContent = (state) => state.mirrorsEstimate.content;
export const getPricing = (state) => state.mirrorsEstimate.pricing;
export const getProjectId = (state) => state.mirrorsEstimate.projectId;
export const getSelectedItem = (state) => state.mirrorsEstimate.selectedItem;
export const getAdditionalFields = (state) =>
  state.mirrorsEstimate.content.additionalFields;
export const getModifiedProfitPercentage = (state) =>
  state.mirrorsEstimate.content.modifiedProfitPercentage;
export const getEstimateDiscountValue = (state) =>
  state.mirrorsEstimate.content.discount.value;
export const getEstimateDiscountUnit = (state) =>
  state.mirrorsEstimate.content.discount.unit;
export const getEstimateDiscountTotal = (state) =>
  state.mirrorsEstimate.content.discount.total;
export const getNotifications = (state) => state.mirrorsEstimate.notifications;

const initialState = {
  estimateId: "",
  measurements: [],
  estimateState: "", // 'create' || 'edit'
  sqftArea: 0,
  selectedItem: null,
  projectId: null,
  pricing: {
    labor: 0,
    glass: 0,
    fabrication: 0,
    misc: 0,
    additionalFields: 0,
    profitPercentage: 0,
    cost: 0,
    total: 0,
    discountTotal:0,
  },
  notifications: {
    glassTypeNotAvailable: {
      status: false,
      variant: notificationsVariant.DEFAULT,
      message: "",
    },
    edgeWorkNotAvailable: {
      status: false,
      variant: notificationsVariant.DEFAULT,
      message: "",
    },
    glassAddonsNotAvailable: [],
    hardwaresNotAvailable: [],
  },
  content: {
    modifiedProfitPercentage: 0,
    sufferCostDifference : false,
    discount: {
      value: 0,
      unit: "%",
      total: 0,
    },
    additionalFields: [],
    glassType: {
      item: null,
      thickness: "1/4",
      cost : 0
    },
    edgeWork: {
      item: null,
      thickness: "1/4",
      cost : 0
    },
    hardwares: [],
    glassAddons: [],
    // floatingSize: "",
    // sandBlasting: 0,
    // bevelStrip: false, // true, false
    // safetyBacking: false, //true, false
    simpleHoles: 0,
    // outlets: 0,
    lightHoles: 0,
    notch: 0,
    singleOutletCutout: 0,
    doubleOutletCutout: 0,
    tripleOutletCutout: 0,
    quadOutletCutout: 0,
    people: 0,
    hours: 0,
  },
  itemQuantity: 1,
};

const mirrorsEstimateSlice = createSlice({
  name: "mirrorsEstimate",
  initialState,
  reducers: {
    setMultipleNotifications: (state, action) => {
      const notifications = action.payload;
      state.notifications = notifications;
    },
    resetNotifications: (state) => {
      state.notifications = initialState.notifications;
    },
    resetMirrorEstimateState: (state) => {
      return {
        ...initialState,
      };
    },
    setThickness: (state, action) => {
      const { thickness, type } = action.payload;
      let cost = state.content[type]?.item?.options?.find((option) => option.thickness === thickness)?.cost;
      state.content = {
        ...state.content,
        [type]: {
          ...state.content[type],
          thickness: thickness,
          cost : cost ?? 0
        },
      };
    },
    setCounters: (state, action) => {
      const { type, value, item } = action.payload;
      let hardwareCost = 0 ;
      hardwareCost = item?.options[0]?.cost;
      if (["hardwares"].includes(type)) {
        let existing = state.content.hardwares;
        const foundIndex = existing.findIndex(
          (row) => row?.item?.slug === item.slug
        );
        if (foundIndex !== -1) {
          if (value <= 0) {
            existing.splice(foundIndex, 1);
          } else {
            existing[foundIndex].count = value;
          }
        } else {
          existing.push({ item: item, count: value ,cost : hardwareCost });
        }
        state.content = {
          ...state.content,
          hardwares: [...existing],
        };
      }
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
    setModifiedProfitPercentage: (state, action) => {
      const { payload } = action;
      state.content.modifiedProfitPercentage = payload;
    },
    setEstimateDiscountValue: (state, action) => {
      const { payload } = action;
      state.content.discount.value = payload;
    },
    setEstimateDiscountUnit: (state, action) => {
      const { payload } = action;
      state.content.discount.unit = payload;
    },
    setEstimateDiscountTotal: (state, action) => {
      const { payload } = action;
      state.content.discount.total = payload;
    },
    setSelectedContent: (state, action) => {
      const { type, item } = action.payload;
      if (
        [
          mirrorHardwareTypes.GLASSADDONS,
          mirrorHardwareTypes.HARDWARES,
        ].includes(type)
      ) {
        let glassAddonCost = 0 ;
        glassAddonCost = item?.options[0]?.cost;
        const foundIndex = state.content[type]?.findIndex( 
          (row) => row.item.slug === item.slug
        );
        if (foundIndex !== -1) {
          state.content[type].splice(foundIndex, 1);
        } else {
          state.content[type].push({item : item ,cost : glassAddonCost});
        }
      } else if (["additionalFields"].includes(type)) {
        state.content = {
          ...state.content,
          additionalFields: item,
        };
      } else {
        let cost = null;
        cost = item?.options?.find((option) => option?.thickness === state.content.glassType.thickness)?.cost; 
        state.content = {
          ...state.content,
          [type]: {
            ...state.content[type],
            item: item,
            cost: cost
          },
        };
      }
    },
    setSufferCostDifference: (state, action) => {
      const calculateNewCost = (type, identifierKey, identifierValue) => {
      const cost = state.content[type]?.cost;
      const currentCost = state.content[type]?.item?.[identifierKey]?.find(
        (item) => item[identifierValue.key] === identifierValue?.value
      )?.cost;
  
      return cost >= 0 && cost !== currentCost ? currentCost : cost;
    };
  
    // Update glass cost
    const newGlassCost = calculateNewCost("glassType", "options", {
      key: "thickness",
      value: state.content.glassType.thickness,
    });
  
    // Update handle cost
    const newEdgeWorkCost = calculateNewCost("edgeWork", "options", {
      key: "thickness",
      value: state.content.edgeWork.thickness,
    });    
    const glassAddonsCost = state?.content?.glassAddons?.map((item)=>{
      const itemCost = item?.cost
      const currentCost = item?.item?.options[0]?.cost;
      let newCost = itemCost >= 0 && itemCost !== currentCost ? currentCost : itemCost;
      return {
        ...item,
        cost : newCost ?? 0
      }
    })
    const hardwareCost = state?.content?.hardwares?.map((item)=>{
      const itemCost = item?.cost
      const currentCost = item?.item?.options[0]?.cost;
      let newCost = itemCost >= 0 && itemCost !== currentCost ? currentCost : itemCost;
      return {
        ...item,
        cost : newCost ?? 0
      }
    })
      state.content = {
        ...state.content,
        edgeWork: {
          ...state.content.edgeWork,
          cost : newEdgeWorkCost ?? 0
        },       
        glassType: {
          ...state.content.glassType,
          cost: newGlassCost ?? 0
        },
      glassAddons: glassAddonsCost ?? [],
      hardwares: hardwareCost ?? [],
      sufferCostDifference : false
      };
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
    setMirrorProjectId: (state, actions) => {
      const { payload } = actions;
      state.projectId = payload;
    },
    setPricing: (state, actions) => {
      const { payload } = actions;
      state.pricing = payload;
    },
    initializeStateForEditQuote: (state, action) => {
      const { estimateData, hardwaresList } = action.payload;
      state.estimateId = estimateData?._id;
      state.content.sufferCostDifference = estimateData?.sufferCostDifference;
      const resp = generateContentForMirrorEdit(hardwaresList,estimateData);
      state.content = {
        ...state.content,
        ...resp.content
      };
      state.sqftArea = resp.sqftArea;
    },
  },
});

export const {
  resetMirrorEstimateState,
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
  setSufferCostDifference,
  initializeStateForEditQuote,
  setModifiedProfitPercentage,
  setEstimateDiscountValue,
  setEstimateDiscountUnit,
  setEstimateDiscountTotal,
  setMultipleNotifications,
  resetNotifications,
  setMirrorProjectId,
  setCounters,
} = mirrorsEstimateSlice.actions;

export default mirrorsEstimateSlice.reducer;
