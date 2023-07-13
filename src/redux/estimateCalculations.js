import { configureStore, createSlice } from "@reduxjs/toolkit";
export const getContent = (state) => state.estimateCalculations.content;
export const getTotal = (state) => state.estimateCalculations.totalPrice;
export const measumentSide = (state) => state.estimateCalculations.measuments;

const estimateCalcSlice = createSlice({
  name: "estimateCalculations",
  initialState: {
    measuments: [],
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
      sleeveOverCount: 0, // Add separate property for Sleeve Over count
      towelBarsCount: 0, // Add separate property for Towel Bars count
      addOns: [],
    },
    totalPrice: 0,
  },
  reducers: {
    setContent: (state, action) => {
      //   state.(action.payload);
      const { type, item } = action.payload;
      if (["wallClamp", "sleeveOver", "glassToGlass"].includes(type)) {
        // for mounting clamps
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
            activeType: "clamps",
          },
        };
      } else if (["channel"].includes(type)) {
        // for mounting channel
        state = {
          ...state.content,
          mounting: {
            ...state.content.mounting,
            channel: {
              ...state.content.mounting.channel,
              item: item,
            },
            activeType: "channel",
          },
        };
      } else if (["hardwareFinishes"].includes(type)) {
        // for hardware finishes
        state.content = {
          ...state.content,
          [type]: item,
        };
      }
    
      else if (["addOns"].includes(type)) {
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
        // for others
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
        // for mounting clamps
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
        // for others
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
      console.log(newMeasurements, "newMeasurements in redux");

      state.measuments = newMeasurements;
    },

    updateAddOnCount: (state, action) => {
      const { type, count } = action.payload;
      // const updatedAddOns = state.content.addOns.map((addOn) => {
      //   if (addOn.type === type) {
      //     return { ...addOn, count };
      //   }
      //   return addOn;
      // });
      state.content[type] = count;
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
} = estimateCalcSlice.actions;
export default estimateCalcSlice.reducer;
