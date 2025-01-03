import {
  mirrorHardwareTypes,
  notificationsVariant,
} from "@/utilities/constants";
import { createSlice } from "@reduxjs/toolkit";
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
    discount: {
      value: 0,
      unit: "%",
      total: 0,
    },
    additionalFields: [],
    glassType: {
      item: null,
      thickness: "1/4",
    },
    edgeWork: {
      item: null,
      thickness: "1/4",
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
      state.content = {
        ...state.content,
        [type]: {
          ...state.content[type],
          thickness: thickness,
        },
      };
    },
    setCounters: (state, action) => {
      const { type, value, item } = action.payload;
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
          existing.push({ item: item, count: value });
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
        const foundIndex = state.content[type]?.findIndex(
          (row) => row.slug === item.slug
        );
        if (foundIndex !== -1) {
          state.content[type].splice(foundIndex, 1);
        } else {
          state.content[type].push(item);
        }
      } else if (["additionalFields"].includes(type)) {
        state.content = {
          ...state.content,
          additionalFields: item,
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
      let glassTypee = null;
      glassTypee = hardwaresList?.glassTypes?.find(
        (item) => item?._id === estimateData?.config?.glassType?.type
      );

      let edgeWork = null;
      edgeWork = hardwaresList?.edgeWorks?.find(
        (item) => item?._id === estimateData?.config?.edgeWork?.type
      );

      let glassAddons = [];
      glassAddons = estimateData?.config?.glassAddons?.map((item) => {
        const record = hardwaresList?.glassAddons?.find(
          (addon) => addon?._id === item
        );
        return record;
      });
      let hardwares = [];
      hardwares = estimateData?.config?.hardwares?.map((row) => {
        const found = hardwaresList?.hardwares?.find(
          (item) => item?._id === row.type
        );
        return { item: found, count: row.count };
      });

      state.estimateId = estimateData?._id;
      state.sqftArea = estimateData?.config?.sqftArea;
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
        glassAddons: glassAddons ? [...glassAddons] : [],
        hardwares: hardwares ? [...hardwares] : [],
        modifiedProfitPercentage:
          estimateData?.config?.modifiedProfitPercentage,
          discount : {
            value:estimateData?.config?.discount?.value ?? 0,
            unit:estimateData?.config?.discount?.unit ?? '%',
          },  
        additionalFields: estimateData?.config?.additionalFields,
        // floatingSize: estimateData?.config?.floatingSize ?? null,
        // sandBlasting: estimateData?.config?.sandBlasting,
        // bevelStrip: estimateData?.config?.bevelStrip, // true, false
        // safetyBacking: estimateData?.config?.safetyBacking, //true, false
        simpleHoles: estimateData?.config?.simpleHoles,
        // outlets: estimateData?.config?.outlets,
        lightHoles: estimateData?.config?.lightHoles,
        notch: estimateData?.config?.notch,
        singleOutletCutout: estimateData?.config?.singleOutletCutout,
        doubleOutletCutout: estimateData?.config?.doubleOutletCutout,
        tripleOutletCutout: estimateData?.config?.tripleOutletCutout,
        quadOutletCutout: estimateData?.config?.quadOutletCutout,
        // singleDuplex: estimateData?.config?.singleDuplex,
        // doubleDuplex: estimateData?.config?.doubleDuplex,
        // tripleDuplex: estimateData?.config?.tripleDuplex,
        people: estimateData?.config?.people,
        hours: estimateData?.config?.hours,
      };
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
