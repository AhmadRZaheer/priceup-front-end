import { createSlice } from "@reduxjs/toolkit";
export const getContent = (state) => state.estimateCalculations.content;
export const getTotal = (state) => state.estimateCalculations.totalPrice;
export const getMeasurementSide = (state) =>
  state.estimateCalculations.measurements;
export const selectedItem = (state) => state.estimateCalculations.selectedItem;
export const getPageNavigation = (state) =>
  state.estimateCalculations.handlePageNavigation;
export const getPageDesktopNavigation = (state) =>
  state.estimateCalculations.handlePageDesktopNavigation;
export const getQuoteId = (state) => state.estimateCalculations.quoteId;
export const getQuoteState = (state) => state.estimateCalculations.quoteState;
export const getLayoutPerimeter = (state) =>
  state.estimateCalculations.perimeter;
export const getLayoutArea = (state) => state.estimateCalculations.sqftArea;
const estimateCalcSlice = createSlice({
  name: "estimateCalculations",
  initialState: {
    quoteId: null,
    quoteState: "create",
    handlePageNavigation: "existing",
    handlePageDesktopNavigation: "Layout",
    perimeter: 0,
    sqftArea: 0,
    measurements: [],
    selectedItem: [],
    content: {
      hardwareFinishes: null,
      handles: {
        item: null,
        count: 0,
      },
      hinges: {
        item: null,
        count: 0,
      },

      mounting: {
        clamps: {
          wallClamp: {
            item: null,
            count: 0,
          },
          sleeveOver: {
            item: null,
            count: 0,
          },
          glassToGlass: {
            item: null,
            count: 0,
          },
        },
        channel: {
          item: null,
          count: 0,
        },
        activeType: "clamps",
      },

      header: {
        item: null,
        count: 0,
      },
      slidingDoorSystem: {
        item: null,
        count: 0,
      },
      glassType: {
        item: null,
        thickness: "1/2",
      },
      glassTreatment: null,
      oneInchHoles: "",
      hingeCut: "",
      clampCut: "",
      notch: "",
      outages: "",
      mitre: "",
      polish: "",
      people: 0,
      hours: 0,
      sleeveOverCount: 0,
      towelBarsCount: 0,
      addOns: [],
    },
    totalPrice: 0,
  },
  reducers: {
    setContent: (state, action) => {
      const { type, item } = action.payload;

      if (["wallClamp", "sleeveOver", "glassToGlass"].includes(type)) {
        state.content = {
          ...state.content,
          mounting: {
            ...state.content.mounting,
            clamps: {
              ...state.content.mounting.clamps,
              [type]: {
                ...state.content.mounting.clamps[type],
                item: item,
              },
            },
          },
        };
      } else if (["channel"].includes(type)) {
        state.content = {
          ...state.content,
          mounting: {
            ...state.content.mounting,
            channel: {
              ...state.content.mounting.channel,
              item: item,
            },
          },
        };
      } else if (["hardwareFinishes"].includes(type)) {
        state.content = {
          ...state.content,
          [type]: item,
        };
      } else if (["addOns"].includes(type)) {
        const foundIndex = state.content.addOns?.findIndex(
          (row) => row.slug === item.slug
        );
        if (foundIndex !== -1) {
          state.content.addOns.splice(foundIndex, 1);
        } else {
          if (item.slug !== "sleeve-over" && item.slug !== "towel-bars") {
            state.content.addOns.push(item);
          }
        }
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
    setCounters: (state, action) => {
      const { type, value } = action.payload;
      if (["wallClamp", "sleeveOver", "glassToGlass"].includes(type)) {
        state.content = {
          ...state.content,
          mounting: {
            ...state.content.mounting,
            clamps: {
              ...state.content.mounting.clamps,
              [type]: {
                ...state.content.mounting.clamps[type],
                count: value,
              },
            },
          },
        };
      } else {
        state.content = {
          ...state.content,
          [type]: {
            ...state.content[type],
            count: value,
          },
        };
      }
    },
    setTotal: (state, action) => {
      const { payload } = action;
      state.totalPrice = payload;
    },
    setInputContent: (state, action) => {
      const { type, value } = action.payload;
      state.content = {
        ...state.content,
        [type]: value,
      };
    },
    setThickness: (state, action) => {
      const { payload } = action;
      state.content = {
        ...state.content,
        glassType: {
          ...state.content.glassType,
          thickness: payload,
        },
      };
    },
    updateMeasurements: (state, action) => {
      const newMeasurements = action.payload;
      state.measurements = newMeasurements;
    },

    updateAddOnCount: (state, action) => {
      const { type, count } = action.payload;
      state.content[type] = count;
    },
    addSelectedItem: (state, action) => {
      const itemData = action.payload;
      state.selectedItem = itemData;
    },
    setNavigation: (state, action) => {
      state.handlePageNavigation = action.payload;
    },
    setNavigationDesktop: (state, action) => {
      state.handlePageDesktopNavigation = action.payload;
    },
    setQuoteState: (state, action) => {
      state.quoteState = action.payload;
    },
    setLayoutArea: (state, action) => {
      state.sqftArea = action.payload;
    },
    setLayoutPerimeter: (state, action) => {
      state.perimeter = action.payload;
      state.content = {
        ...state.content,
        polish: action.payload,
      };
    },
    setActiveMounting: (state, action) => {
      const { payload } = action;
      state.content.mounting = {
        ...state.content.mounting,
        activeType: payload,
      };
    },
    initializeStateForCreateQuote: (state, action) => {
      const { layoutData, listData } = action.payload;
      console.log(listData, "list");
      console.log(layoutData, "layout");
      let hardwareFinishes = null;
      hardwareFinishes = listData?.hardwareFinishes?.find(
        (item) => item._id === layoutData?.settings?.hardwareFinishes
      );
      let handleType = null;
      handleType = listData?.handles?.find(
        (item) => item._id === layoutData?.settings?.handles?.handleType
      );
      let hingesType = null;
      hingesType = listData?.hinges?.find(
        (item) => item._id === layoutData?.settings?.hinges?.hingesType
      );
      let slidingDoorSystemType = null;
      slidingDoorSystemType = listData?.slidingDoorSystem?.find(
        (item) => item._id === layoutData?.settings?.slidingDoorSystem?.type
      );
      let headerType = null;
      headerType = listData?.header?.find(
        (item) => item._id === layoutData?.settings?.header
      );

      let glassType = null;
      glassType = listData?.glassType?.find(
        (item) => item._id === layoutData?.settings?.glassType?.type
      );

      let glassTreatment = null;
      glassTreatment = listData?.glassTreatment?.find(
        (item) => item._id === layoutData?.settings?.glassTreatment
      );

      let wallClampItem = null;
      wallClampItem = listData?.mountingChannel?.find(
        (item) => item._id === layoutData?.settings?.wallClamp?.wallClampType
      );
      let sleeveOverItem = null;
      sleeveOverItem = listData?.mountingChannel?.find(
        (item) => item._id === layoutData?.settings?.sleeveOver?.sleeveOverType
      );
      let glassToGlassItem = null;
      glassToGlassItem = listData?.mountingChannel?.find(
        (item) =>
          item._id === layoutData?.settings?.glassToGlass?.glassToGlassType
      );
      let channelItem = null;
      channelItem = listData?.mountingChannel?.find(
        (item) => item._id === layoutData?.settings?.mountingChannel
      );

      state.content = {
        ...state.content,
        hardwareFinishes: hardwareFinishes,
        handles: {
          item: handleType || null,
          count: layoutData?.settings?.handles?.count,
        },
        hinges: {
          item: hingesType || null,
          count: layoutData?.settings?.hinges?.count,
        },
        header: {
          item: headerType || null,
          count: headerType ? 1 : 0,
        },
        slidingDoorSystem: {
          item: slidingDoorSystemType || null,
          count: layoutData?.settings?.slidingDoorSystem?.count,
        },
        glassType: {
          item: glassType || null,
          thickness: layoutData?.settings?.glassType?.thickness,
        },

        mounting: {
          clamps: {
            wallClamp: {
              item: wallClampItem || null,
              count: layoutData?.settings?.wallClamp?.count,
            },
            sleeveOver: {
              item: sleeveOverItem || null,
              count: layoutData?.settings?.sleeveOver?.count,
            },
            glassToGlass: {
              item: glassToGlassItem || null,
              count: layoutData?.settings?.glassToGlass?.count,
            },
          },
          channel: {
            item: channelItem || null,
            count: channelItem ? 1 : 0,
          },
          activeType: layoutData?.settings?.channelOrClamps
            ? layoutData?.settings?.channelOrClamps?.toLowerCase()
            : "clamps",
        },

        // hingeCut: estimateData?.hingeCut,
        people: layoutData?.settings?.other?.people,
        hours: layoutData?.settings?.other?.hours,
        glassTreatment: glassTreatment || null,
        // oneInchHoles: estimateData?.oneInchHoles,
        // clampCut: estimateData?.clampCut,
        // notch: estimateData?.notch,
        outages: layoutData?.settings?.outages,
        // mitre: estimateData?.mitre,
        // polish: layoutData?.settings?.polish,
        // sleeveOverCount: estimateData?.sleeveOverCount,
        // towelBarsCount: estimateData?.towelBarsCount,
        // addOns: addOns
      };
    },
    initializeStateForEditQuote: (state, action) => {
      const { estimateData, listData, quoteState, quotesId } = action.payload;
      console.log(listData, "list");
      console.log(estimateData, "list2");

      state.quoteId = quotesId;

      let hardwareFinishes = null;
      hardwareFinishes = listData?.hardwareFinishes?.find(
        (item) => item._id === estimateData?.hardwareFinishes
      );
      let handleType = null;
      handleType = listData?.handles?.find(
        (item) => item._id === estimateData?.handles?.type
      );
      let hingesType = null;
      hingesType = listData?.hinges?.find(
        (item) => item._id === estimateData?.hinges?.type
      );
      let slidingDoorSystemType = null;
      slidingDoorSystemType = listData?.slidingDoorSystem?.find(
        (item) => item._id === estimateData?.slidingDoorSystem?.type
      );

      let headerType = null;
      headerType = listData?.header?.find(
        (item) => item._id === estimateData?.header?.type
      );

      let glassTypee = null;
      glassTypee = listData?.glassType?.find(
        (item) => item._id === estimateData?.glassType?.type
      );

      let glassTreatment = null;
      glassTreatment = listData?.glassTreatment?.find(
        (item) => item._id === estimateData?.glassTreatment
      );

      let wallClampItem = null;
      wallClampItem = listData?.mountingChannel?.find(
        (item) => item._id === estimateData?.mounting?.clamps?.wallClamp?.type
      );
      let sleeveOverItem = null;
      sleeveOverItem = listData?.mountingChannel?.find(
        (item) => item._id === estimateData?.mounting?.clamps?.sleeveOver?.type
      );
      let glassToGlassItem = null;
      glassToGlassItem = listData?.mountingChannel?.find(
        (item) =>
          item._id === estimateData?.mounting?.clamps?.glassToGlass?.type
      );
      let channelItem = null;
      channelItem = listData?.mountingChannel?.find(
        (item) => item._id === estimateData?.mounting?.channel
      );
      let addOns = estimateData?.addOns?.map((id) =>
        listData?.addOns?.find((item) => item?._id === id)
      );
      const measurements = estimateData.measurements.map(
        ({ _id, ...rest }) => rest
      );
      state.content = {
        ...state.content,
        hardwareFinishes: hardwareFinishes,
        handles: {
          ...state.handles,
          item: handleType,
          count: estimateData?.handles?.count,
        },
        hinges: {
          ...state.hinges,
          item: hingesType,
          count: estimateData?.hinges?.count,
        },
        header: {
          item: headerType,
          count: estimateData?.header?.count,
        },
        slidingDoorSystem: {
          item: slidingDoorSystemType,
          count: estimateData?.slidingDoorSystem?.count,
        },
        glassType: {
          item: glassTypee,
          thickness: estimateData?.glassType?.thickness,
        },

        mounting: {
          clamps: {
            wallClamp: {
              item: wallClampItem,
              count: estimateData?.mounting?.clamps?.wallClamp?.count,
            },
            sleeveOver: {
              item: sleeveOverItem,
              count: estimateData?.mounting?.clamps?.sleeveOver?.count,
            },
            glassToGlass: {
              item: glassToGlassItem,
              count: estimateData?.mounting?.clamps?.glassToGlass?.count,
            },
          },
          channel: {
            item: channelItem,
            count: channelItem ? 1 : 0,
          },
          activeType: estimateData?.mounting?.activeType,
        },

        hingeCut: estimateData?.hingeCut,
        people: estimateData?.people,
        hours: estimateData?.hours,
        glassTreatment: glassTreatment,
        oneInchHoles: estimateData?.oneInchHoles,
        clampCut: estimateData?.clampCut,
        notch: estimateData?.notch,
        outages: estimateData?.outages,
        mitre: estimateData?.mitre,
        polish: estimateData?.polish,
        sleeveOverCount: estimateData?.sleeveOverCount,
        towelBarsCount: estimateData?.towelBarsCount,
        addOns: addOns,
      };
      state.quoteState = quoteState;
      state.measurements = measurements;
      state.perimeter = estimateData.perimeter;
      state.sqftArea = estimateData.sqftArea;
      state.selectedItem = estimateData.layoutData;
    },
  },
});
export const {
  setLayoutArea,
  setLayoutPerimeter,
  setContent,
  setTotal,
  setCounters,
  setInputContent,
  setThickness,
  updateAddOnCount,
  updateMeasurements,
  addSelectedItem,
  setNavigationDesktop,
  setNavigation,
  setQuoteState,
  setActiveMounting,
  initializeStateForCreateQuote,
  initializeStateForEditQuote,
} = estimateCalcSlice.actions;
export default estimateCalcSlice.reducer;
