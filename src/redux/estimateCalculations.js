import { createSlice } from "@reduxjs/toolkit";
import { layoutVariants } from "../utilities/constants";
export const getContent = (state) => state.estimateCalculations.content;
export const getTotal = (state) => state.estimateCalculations.totalPrice;
export const getDoorWidth = (state) => state.estimateCalculations.doorWidth;
export const getHardwareTotal = (state) => state.estimateCalculations.hardwarePrice;
export const getGlassTotal = (state) => state.estimateCalculations.glassPrice;
export const getGlassAddonsTotal = (state) => state.estimateCalculations.glassAddonsPrice;
export const getFabricationTotal = (state) => state.estimateCalculations.fabricationPrice;
export const getMiscTotal = (state) => state.estimateCalculations.miscPrice;
export const getLaborTotal = (state) => state.estimateCalculations.laborPrice;


export const getMeasurementSide = (state) =>
  state.estimateCalculations.measurements;
export const selectedItem = (state) => state.estimateCalculations.selectedItem;
export const getPageNavigation = (state) =>
  state.estimateCalculations.handlePageNavigation;
export const getPageDesktopNavigation = (state) =>
  state.estimateCalculations.handlePageDesktopNavigation;
export const getQuoteId = (state) => state.estimateCalculations.quoteId;
export const getQuoteState = (state) => state.estimateCalculations.quoteState;
export const getListData = (state) => state.estimateCalculations.listData;
export const getLayoutPerimeter = (state) =>
  state.estimateCalculations.perimeter;
export const getLayoutArea = (state) => state.estimateCalculations.sqftArea;
const estimateCalcSlice = createSlice({
  name: "estimateCalculations",
  initialState: {
    quoteId: null,
    quoteState: "create",
    handlePageNavigation: "existing",
    handlePageDesktopNavigation: "layouts",
    perimeter: 0,
    sqftArea: 0,
    doorWidth: 0,
    measurements: [],
    selectedItem: null,
    listData: null,
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
      mountingClamps: {
        wallClamp: [],
        sleeveOver: [],
        glassToGlass: [],
      },
      corner: {
        wallClamp: [],
        sleeveOver: [],
        glassToGlass: [],
      },
      mountingChannel: {
        item: null,
        count: 0,
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
      glassAddons: [],
      oneInchHoles: 0,
      hingeCut: 0,
      clampCut: 0,
      notch: 0,
      outages: 0,
      mitre: 0,
      polish: 0,
      people: 0,
      hours: 0,
      hardwareAddons: [],
      mountingState: "channel",
    },
    totalPrice: 0,
    hardwarePrice:0,
    glassPrice:0,
    glassAddonsPrice:0,
    fabricationPrice:0,
    miscPrice:0,
    laborPrice:0
  },
  reducers: {
      setDoorWidth: (state, action) => {
        state.doorWidth = action.payload;
      },
    setContent: (state, action) => {
      const { type, item } = action.payload;
      if (["wallClamp", "sleeveOver", "glassToGlass"].includes(type)) {
        console.log("Nice Try.");
      } else if (["channel"].includes(type)) {
        const found = item?._id === state.content.mountingChannel.item?._id;
        state.content = {
          ...state.content,
          mountingChannel: {
            item: found ? null : item,
            count: found ? 0 : 1,
          },
        };
      } else if (["hardwareFinishes"].includes(type)) {
        state.content = {
          ...state.content,
          [type]: item,
        };
      } else if (["hardwareAddons"].includes(type)) {
        console.log("Nice Try.");
      } else if (["glassAddons"].includes(type)) {
        if (item.slug === "no-treatment") {
          state.content.glassAddons = [state.listData.glassAddons[0]];
        } else {
          const foundIndex = state.content.glassAddons?.findIndex(
            (row) => row.slug === item.slug
          );
          if (foundIndex !== -1) {
            state.content.glassAddons.splice(foundIndex, 1);
          } else {
            state.content.glassAddons.push(item);
          }
          const indexOfNoTreatment = state.content.glassAddons?.findIndex(
            (row) => row.slug === "no-treatment"
          );
          if (indexOfNoTreatment !== -1) {
            state.content.glassAddons.splice(indexOfNoTreatment, 1);
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
      const { type, value, item } = action.payload;
      if (["wallClamp", "sleeveOver", "glassToGlass"].includes(type)) {
        let existing = state.content.mountingClamps[type];
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
        let clampCut = 0;
        state.content.mountingClamps?.wallClamp?.map((row) => {
          clampCut += row.count;
        });
        state.content.mountingClamps?.glassToGlass?.map((row) => {
          return (clampCut += row.count);
        });
        state.content.mountingClamps?.sleeveOver?.map((row) => {
          return (clampCut += row.count);
        });

        state.content = {
          ...state.content,
          clampCut: clampCut || 0,
          mountingClamps: {
            ...state.content.mountingClamps,
            [type]: existing,
          },
        };
      }else if (["wallClampCorner", "sleeveOverCorner", "glassToGlassCorner"].includes(type)) {
        let existing = state.content.corner[type];
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
        let clampCut = 0;
        state.content.corner?.wallClampCorner?.map((row) => {
          clampCut += row.count;
        });
        state.content.corner?.glassToGlassCorner?.map((row) => {
          return (clampCut += row.count);
        });
        state.content.corner?.sleeveOverCorner?.map((row) => {
          return (clampCut += row.count);
        });

        state.content = {
          ...state.content,
          clampCut: clampCut || 0,
          corner: {
            ...state.content.corner,
            [type]: existing,
          },
        };
       } else if (["hardwareAddons"].includes(type)) {
        let existing = state.content.hardwareAddons;
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
          hardwareAddons: [...existing],
        };
      } else if (["hinges"].includes(type)) {
        state.content = {
          ...state.content,
          hingeCut: value,
          [type]: {
            ...state.content[type],
            count: value,
          },
        };
      } else if (["handles"].includes(type)) {
        const handleHoles = value * 2;
        let layoutHoles = 0;
        layoutHoles =
          state.selectedItem?.settings?.variant === layoutVariants.SINGLEBARN
            ? 6
            : state.selectedItem?.settings?.variant ===
              layoutVariants.DOUBLEBARN
            ? 8
            : 0;
        state.content = {
          ...state.content,
          oneInchHoles: handleHoles + layoutHoles,
          [type]: {
            ...state.content[type],
            count: value,
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
    setHardwarePrice: (state, action) => {
      const { payload } = action;
      state.hardwarePrice = payload;
    },
    setGlassPrice: (state, action) => {
      const { payload } = action;
      state.glassPrice = payload;
    },
    setGlassAddonsPrice: (state, action) => {
      const { payload } = action;
      state.glassAddonsPrice = payload;
    },
    setFabricationPrice: (state, action) => {
      const { payload } = action;
      state.fabricationPrice = payload;
    },
    setMiscPrice: (state, action) => {
      const { payload } = action;
      state.miscPrice = payload;
    },
    setLaborPrice: (state, action) => {
      const { payload } = action;
      state.laborPrice = payload;
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
      /** on change glass thickness shift active channel of layout */
      let channel = state.content.mountingChannel.item;
      if (payload === "1/2") {
        if (channel) {
          channel = state.listData?.mountingChannel?.find(
            (item) => item.slug === "u-channel-1-2"
          );
        }
      } else if (payload === "3/8") {
        if (channel) {
          channel = state.listData?.mountingChannel?.find(
            (item) => item.slug === "u-channel-3-8"
          );
        }
      }
      /** end */

      state.content = {
        ...state.content,
        glassType: {
          ...state.content.glassType,
          thickness: payload,
        },
        mountingChannel: {
          item: channel,
          count: channel ? 1 : 0,
        },
      };
    },
    updateMeasurements: (state, action) => {
      const newMeasurements = action.payload;
      state.measurements = newMeasurements;
    },
    setListData: (state, action) => {
      const list = action.payload;
      state.listData = list;
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
      state.content.mountingState = payload;
    },
    initializeStateForCustomQuote: (state, action) => {
      let hardwareFinishes = null;
      hardwareFinishes = state.listData?.hardwareFinishes?.find(
        (item) => item.slug === "polished-chrome"
      );
      let glassType = null;
      glassType = state.listData?.glassType?.find(
        (item) => item.slug === "clear"
      );
      let glassAddons = null;
      glassAddons = state.listData?.glassAddons?.find(
        (item) => item.slug === "no-treatment"
      );
      state.content = {
        ...state.content,
        hardwareFinishes: hardwareFinishes,
        glassType: {
          item: glassType,
          thickness: "3/8",
        },
        glassAddons: glassAddons ? [glassAddons] : [],
        people: 0,
        hours: 0,
      };
    },
    initializeStateForCreateQuote: (state, action) => {
      const { layoutData } = action.payload;
      let hardwareFinishes = null;
      hardwareFinishes = state.listData?.hardwareFinishes?.find(
        (item) => item._id === layoutData?.settings?.hardwareFinishes
      );
      let handleType = null;
      handleType = state.listData?.handles?.find(
        (item) => item._id === layoutData?.settings?.handles?.handleType
      );
      let hingesType = null;
      hingesType = state.listData?.hinges?.find(
        (item) => item._id === layoutData?.settings?.hinges?.hingesType
      );
      let slidingDoorSystemType = null;
      slidingDoorSystemType = state.listData?.slidingDoorSystem?.find(
        (item) => item._id === layoutData?.settings?.slidingDoorSystem?.type
      );
      let headerType = null;
      headerType = state.listData?.header?.find(
        (item) => item._id === layoutData?.settings?.header
      );

      let glassType = null;
      glassType = state.listData?.glassType?.find(
        (item) => item._id === layoutData?.settings?.glassType?.type
      );

      let glassAddon = null;
      glassAddon = state.listData?.glassAddons?.find(
        (item) => item._id === layoutData?.settings?.glassAddon
      );

      let wallClampItem = null;
      wallClampItem = state.listData?.wallClamp?.find(
        (item) => item._id === layoutData?.settings?.wallClamp?.wallClampType
      );
      let sleeveOverItem = null;
      sleeveOverItem = state.listData?.sleeveOver?.find(
        (item) => item._id === layoutData?.settings?.sleeveOver?.sleeveOverType
      );
      let glassToGlassItem = null;
      glassToGlassItem = state.listData?.glassToGlass?.find(
        (item) =>
          item._id === layoutData?.settings?.glassToGlass?.glassToGlassType
      );

      let wallClampItemCorner = null;
      wallClampItemCorner = state.listData?.wallClampCorner?.find(
        (item) => item._id === layoutData?.settings?.wallClampCorner?.wallClampType
      );
      let sleeveOverItemCorner = null;
      sleeveOverItemCorner = state.listData?.sleeveOverCorner?.find(
        (item) => item._id === layoutData?.settings?.sleeveOverCorner?.sleeveOverType
      );
      let glassToGlassItemCorner = null;
      glassToGlassItemCorner = state.listData?.glassToGlassCorner?.find(
        (item) =>
          item._id === layoutData?.settings?.glassToGlassCorner?.glassToGlassType
      );
      let channelItem = null;
      channelItem = state.listData?.mountingChannel?.find(
        (item) => item._id === layoutData?.settings?.mountingChannel
      );

      // if(channelItem){
      //   if(layoutData?.settings?.glassType?.thickness === '3/8'){
      //     channelItem = state.listData?.mountingChannel?.find((item)=>item.slug === 'u-channel-3-8');
      //   }else if(layoutData?.settings?.glassType?.thickness === '1/2'){
      //     channelItem = state.listData?.mountingChannel?.find((item)=>item.slug === 'u-channel-1-2');
      //   }
      // }

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
        mountingChannel: {
          item: channelItem || null,
          count: channelItem ? 1 : 0,
        },
        mountingClamps: {
          wallClamp: wallClampItem
            ? [
                {
                  item: wallClampItem,
                  count: layoutData?.settings?.wallClamp?.count,
                },
              ]
            : [],
          sleeveOver: sleeveOverItem
            ? [
                {
                  item: sleeveOverItem,
                  count: layoutData?.settings?.sleeveOver?.count,
                },
              ]
            : [],
          glassToGlass: glassToGlassItem
            ? [
                {
                  item: glassToGlassItem,
                  count: layoutData?.settings?.glassToGlass?.count,
                },
              ]
            : [],
        },
        corner: {
          wallClampCorner: wallClampItemCorner
            ? [
                {
                  item: wallClampItemCorner,
                  count: layoutData?.settings?.wallClampCorner?.count,
                },
              ]
            : [],
          sleeveOverCorner: sleeveOverItemCorner
            ? [
                {
                  item: sleeveOverItemCorner,
                  count: layoutData?.settings?.sleeveOverCorner?.count,
                },
              ]
            : [],
          glassToGlassCorner: glassToGlassItemCorner
            ? [
                {
                  item: glassToGlassItemCorner,
                  count: layoutData?.settings?.glassToGlass?.glassToGlassCorner,
                },
              ]
            : [],
        },
        mountingState: channelItem
          ? "channel"
          : wallClampItem || sleeveOverItem || glassToGlassItem
          ? "clamps"
          : wallClampItemCorner || sleeveOverItemCorner || glassToGlassItemCorner
          ? "corners"
          : "",
        people: layoutData?.settings?.other?.people,
        hours: layoutData?.settings?.other?.hours,
        glassAddons: glassAddon
          ? [glassAddon]
          : [state.listData.glassAddons[0]],
        outages: layoutData?.settings?.outages,
        hingeCut: layoutData?.settings?.hinges?.count,
        oneInchHoles:
          layoutData?.settings?.handles?.count * 2 +
          (layoutData?.settings?.variant === layoutVariants.SINGLEBARN
            ? 6
            : layoutData?.settings?.variant === layoutVariants.DOUBLEBARN
            ? 8
            : 0),
        clampCut:
          layoutData?.settings?.wallClamp?.count +
          layoutData?.settings?.sleeveOver?.count +
          layoutData?.settings?.glassToGlass?.count,
      };
    },
    initializeStateForEditQuote: (state, action) => {
      const { estimateData, quoteState, quotesId } = action.payload;

      state.quoteId = quotesId;

      let hardwareFinishes = null;
      hardwareFinishes = state.listData?.hardwareFinishes?.find(
        (item) => item._id === estimateData?.hardwareFinishes
      );
      let handleType = null;
      handleType = state.listData?.handles?.find(
        (item) => item._id === estimateData?.handles?.type
      );
      let hingesType = null;
      hingesType = state.listData?.hinges?.find(
        (item) => item._id === estimateData?.hinges?.type
      );
      let slidingDoorSystemType = null;
      slidingDoorSystemType = state.listData?.slidingDoorSystem?.find(
        (item) => item._id === estimateData?.slidingDoorSystem?.type
      );

      let headerType = null;
      headerType = state.listData?.header?.find(
        (item) => item._id === estimateData?.header?.type
      );

      let glassTypee = null;
      glassTypee = state.listData?.glassType?.find(
        (item) => item._id === estimateData?.glassType?.type
      );

      let glassAddons = [];
      glassAddons = estimateData?.glassAddons?.map((item) => {
        const record = state.listData?.glassAddons.find(
          (addon) => addon._id === item
        );
        return record;
      });
      let wallClampArray = [];
      wallClampArray = estimateData?.mountingClamps?.wallClamp?.map((row) => {
        const record = state.listData?.wallClamp?.find(
          (clamp) => clamp._id === row?.type
        );
        return { item: record, count: row.count };
      });
      let sleeveOverArray = [];
      sleeveOverArray = estimateData?.mountingClamps?.sleeveOver?.map((row) => {
        const record = state.listData?.sleeveOver?.find(
          (clamp) => clamp._id === row?.type
        );
        return { item: record, count: row.count };
      });
      let glassToGlassArray = [];
      glassToGlassArray = estimateData?.mountingClamps?.glassToGlass?.map(
        (row) => {
          const record = state.listData?.glassToGlass?.find(
            (clamp) => clamp._id === row?.type
          );
          return { item: record, count: row.count };
        }
      );


      let wallClampCornerArray = [];
      wallClampCornerArray = estimateData?.corner?.wallClampCorner?.map((row) => {
        const record = state.listData?.wallClampCorner?.find(
          (clamp) => clamp._id === row?.type
        );
        return { item: record, count: row.count };
      });
      let sleeveOverCornerArray = [];
      sleeveOverCornerArray = estimateData?.corner?.sleeveOverCorner?.map((row) => {
        const record = state.listData?.sleeveOverCorner?.find(
          (clamp) => clamp._id === row?.type
        );
        return { item: record, count: row.count };
      });
      let glassToGlassCornerArray = [];
      glassToGlassCornerArray = estimateData?.corner?.glassToGlassCorner?.map(
        (row) => {
          const record = state.listData?.glassToGlassCorner?.find(
            (clamp) => clamp._id === row?.type
          );
          return { item: record, count: row.count };
        }
      );
      let channelItem = null;
      channelItem = state.listData?.mountingChannel?.find(
        (item) => item._id === estimateData?.mountingChannel
      );
      let hardwareAddons = [];
      hardwareAddons = estimateData?.hardwareAddons?.map((row) => {
        const found = state.listData?.hardwareAddons?.find(
          (item) => item?._id === row.type
        );
        return { item: found, count: row.count };
      });

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

        mountingClamps: {
          wallClamp: [...wallClampArray],
          sleeveOver: [...sleeveOverArray],
          glassToGlass: [...glassToGlassArray],
        },
        corner: {
          wallClampCorner: [...wallClampCornerArray],
          sleeveOverCorner: [...sleeveOverCornerArray],
          glassToGlassCorner: [...glassToGlassCornerArray],
        },
        mountingChannel: {
          item: channelItem || null,
          count: channelItem ? 1 : 0,
        },
        mountingState: channelItem
          ? "channel"
          : wallClampArray?.length ||
            sleeveOverArray?.length ||
            glassToGlassArray?.length
          ? "clamps"
          : wallClampCornerArray?.length ||
          sleeveOverCornerArray?.length ||
          glassToGlassCornerArray?.length
        ? "corners"
          : "",
        hingeCut: estimateData?.hingeCut,
        people: estimateData?.people,
        hours: estimateData?.hours,
        glassAddons: glassAddons?.length
          ? [...glassAddons]
          : state.listData.glassAddons[0],
        oneInchHoles: estimateData?.oneInchHoles,
        clampCut: estimateData?.clampCut,
        notch: estimateData?.notch,
        outages: estimateData?.outages,
        mitre: estimateData?.mitre,
        polish: estimateData?.polish,
        sleeveOverCount: estimateData?.sleeveOverCount,
        towelBarsCount: estimateData?.towelBarsCount,
        hardwareAddons: [...hardwareAddons],
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
  setGlassPrice,
  setHardwarePrice,
  setGlassAddonsPrice,
  setFabricationPrice,
  setMiscPrice,
  setLaborPrice,
  setLayoutArea,
  setLayoutPerimeter,
  setContent,
  setTotal,
  setCounters,
  setInputContent,
  setThickness,
  setListData,
  setDoorWidth,
  // updateAddOnCount,
  updateMeasurements,
  addSelectedItem,
  setNavigationDesktop,
  setNavigation,
  setQuoteState,
  setActiveMounting,
  initializeStateForCustomQuote,
  initializeStateForCreateQuote,
  initializeStateForEditQuote,
} = estimateCalcSlice.actions;
export default estimateCalcSlice.reducer;
