import { createSlice } from "@reduxjs/toolkit";
export const getContent = (state) => state.estimateCalculations.content;
export const getTotal = (state) => state.estimateCalculations.totalPrice;
export const getMeasumentSide = (state) =>
  state.estimateCalculations.measuments;
export const selectedItem = (state) => state.estimateCalculations.selectedItem;
export const getPageNavigation = (state) =>
  state.estimateCalculations.handlePageNavigation;

const estimateCalcSlice = createSlice({
  name: "estimateCalculations",
  initialState: {
    handlePageNavigation: "existing",
    measuments: [],
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

      state.measuments = newMeasurements;
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
    setActiveMounting: (state, action) => {
      const { payload } = action;
      state.content.mounting = {
        ...state.content.mounting,
        activeType: payload,
      };
    },
    reinitializeState: (state, action) => {
      const { estimateData, listData } = action.payload;
      console.log(listData, "list");
      let hardwareFinishes = null;
      hardwareFinishes = listData?.hardwareFinishes?.find(
        (item) => item._id === estimateData?.hardwareFinishes
      );

      state.content = {
        ...state.content,
        hardwareFinishes,
      };

      // let glassTreatment = null;
      // glassTreatment = listData?.glassTreatment?.find(
      //   (item) => item._id === estimateData?.glassTreatment
      // );

      // state.content = {
      //   ...state.content,
      //   glassTreatment,
      // };

      // let hinges = null;
      // hinges = listData?.hinges?.find(
      //   (item) => item._id === estimateData?.hinges
      // );

      // state.content = {
      //   ...state.content,
      //   hinges,
      // };

      // let handles = null;
      // handles = listData?.handles?.find(
      //   (item) => item._id === estimateData?.handles
      // );

      // state.content = {
      //   ...state.content,
      //   handles,
      // };
      // let oneInchHoles = null;
      // oneInchHoles = listData?.oneInchHoles?.find(
      //   (item) => item._id === estimateData?.oneInchHoles
      // );

      // state.content = {
      //   ...state.content,
      //   oneInchHoles,
      // };
      // let hingeCut = null;
      // hingeCut = listData?.hingeCut?.find(
      //   (item) => item._id === estimateData?.hingeCut
      // );

      // state.content = {
      //   ...state.content,
      //   hingeCut,
      // };
      // let clampCut = null;
      // clampCut = listData?.clampCut?.find(
      //   (item) => item._id === estimateData?.clampCut
      // );

      // state.content = {
      //   ...state.content,
      //   clampCut,
      // };

      // let notch = null;
      // notch = listData?.notch?.find(
      //   (item) => item._id === estimateData?.notch
      // );

      // state.content = {
      //   ...state.content,
      //   notch,
      // };

      // let outages = null;
      // outages = listData?.outages?.find(
      //   (item) => item._id === estimateData?.outages
      // );

      // state.content = {
      //   ...state.content,
      //   outages,
      // };
      // let mitre = null;
      // mitre = listData?.mitre?.find(
      //   (item) => item._id === estimateData?.mitre
      // );

      // state.content = {
      //   ...state.content,
      //   mitre,
      // };
      // let polish = null;
      // polish = listData?.polish?.find(
      //   (item) => item._id === estimateData?.polish
      // );

      // state.content = {
      //   ...state.content,
      //   polish,
      // };
      // let people = null;
      // people = listData?.people?.find(
      //   (item) => item._id === estimateData?.people
      // );

      // state.content = {
      //   ...state.content,
      //   people,
      // };

      let hours = null;
      hours = listData?.hours?.find((item) => item._id === estimateData?.hours);

      state.content = {
        ...state.content,
        hours,
      };

      // let sleeveOverCount = null;
      // sleeveOverCount = listData?.sleeveOverCount?.find(
      //   (item) => item._id === estimateData?.sleeveOverCount
      // );

      // state.content = {
      //   ...state.content,
      //   sleeveOverCount,
      // };

      // let towelBarsCount = null;
      // towelBarsCount = listData?.towelBarsCount?.find(
      //   (item) => item._id === estimateData?.towelBarsCount
      // );

      // state.content = {
      //   ...state.content,
      //   towelBarsCount,
      // };

      // let addOns = null;
      // addOns = listData?.addOns?.find(
      //   (item) => item._id === estimateData?.addOns
      // );

      // state.content = {
      //   ...state.content,
      //   addOns,
      // };

      let totalPrice = null;
      totalPrice = listData?.totalPrice?.find(
        (item) => item._id === estimateData?.totalPrice
      );
      state.content = {
        ...state.content,
        totalPrice,
      };
    },
  },
});
export const {
  setContent,
  setTotal,
  setCounters,
  setInputContent,
  setThickness,
  updateAddOnCount,
  updateMeasurements,
  addSelectedItem,
  setNavigation,
  setActiveMounting,
  reinitializeState,
} = estimateCalcSlice.actions;
export default estimateCalcSlice.reducer;
