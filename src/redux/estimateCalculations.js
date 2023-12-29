import { createSlice } from "@reduxjs/toolkit";
import { layoutVariants } from "../utilities/constants";
export const getContent = (state) => state.estimateCalculations.content;
export const getCost = (state) => state.estimateCalculations.actualCost;
export const getProfit = (state) => state.estimateCalculations.grossProfit;
export const getTotal = (state) => state.estimateCalculations.totalPrice;
export const getDoorWidth = (state) => state.estimateCalculations.doorWidth;
export const getHardwareTotal = (state) =>
  state.estimateCalculations.hardwarePrice;
export const getGlassTotal = (state) => state.estimateCalculations.glassPrice;
export const getGlassAddonsTotal = (state) =>
  state.estimateCalculations.glassAddonsPrice;
export const getFabricationTotal = (state) =>
  state.estimateCalculations.fabricationPrice;
export const getMiscTotal = (state) => state.estimateCalculations.miscPrice;
export const getLaborTotal = (state) => state.estimateCalculations.laborPrice;

export const getUserProfitPercentage = (state) =>
  state.estimateCalculations.content.userProfitPercentage;
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
export const getPanelWidth = (state) => state.estimateCalculations.panelWidth;

const initialState = {
  quoteId: null,
  quoteState: "create",
  handlePageNavigation: "existing",
  handlePageDesktopNavigation: "existing",
  perimeter: 0,
  sqftArea: 0,
  doorWidth: 0,
  panelWidth: 0,
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
    cornerClamps: {
      cornerWallClamp: [],
      cornerSleeveOver: [],
      cornerGlassToGlass: [],
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
    userProfitPercentage: 0,
  },
  actualCost: 0,
  grossProfit: 0,
  totalPrice: 0,
  hardwarePrice: 0,
  glassPrice: 0,
  glassAddonsPrice: 0,
  fabricationPrice: 0,
  miscPrice: 0,
  laborPrice: 0,
};
const estimateCalcSlice = createSlice({
  name: "estimateCalculations",
  initialState,
  reducers: {
    resetState: (state) => {
      return {
        ...initialState,
        handlePageDesktopNavigation: state.handlePageDesktopNavigation,
      };
    },
    setDoorWidth: (state, action) => {
      state.doorWidth = action.payload;
    },
    setPanelWidth: (state, action) => {
      state.panelWidth = action.payload;
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
          const noGlassAddon = state.listData.glassAddons?.find(
            (item) => item.slug === "no-treatment"
          );
          state.content.glassAddons = [noGlassAddon];
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
      let allClamps = ["wallClamp", "sleeveOver", "glassToGlass"];
      let allCorners = [
        "cornerWallClamp",
        "cornerSleeveOver",
        "cornerGlassToGlass",
      ];

      if (allClamps.includes(type) || allCorners.includes(type)) {
        let existing;
        if (allClamps.includes(type)) {
          existing = state.content.mountingClamps[type];
        } else {
          existing = state.content.cornerClamps[type];
        }

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

        allClamps.forEach((clampType) => {
          state.content.mountingClamps?.[clampType]?.forEach((row) => {
            clampCut += row.count;
          });
        });

        allCorners.forEach((cornerType) => {
          if (!["cornerSleeveOver"].includes(cornerType)) {
            state.content.cornerClamps?.[cornerType]?.forEach((row) => {
              clampCut += row.count;
            });
          }
        });

        state.content = {
          ...state.content,
          clampCut: clampCut || 0,
        };

        if (allClamps.includes(type)) {
          state.content.mountingClamps = {
            ...state.content.mountingClamps,
            [type]: existing,
          };
        } else {
          state.content.cornerClamps = {
            ...state.content.cornerClamps,
            [type]: existing,
          };
        }
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

    setUserProfitPercentage: (state, action) => {
      const { payload } = action;
      state.content.userProfitPercentage = payload;
    },
    setTotal: (state, action) => {
      const { payload } = action;
      state.totalPrice = payload;
    },
    setCost: (state, action) => {
      const { payload } = action;
      state.actualCost = payload;
    },
    setProfit: (state, action) => {
      const { payload } = action;
      state.grossProfit = payload;
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
      if (["mitre"].includes(type)) {
        // const mitre = value;
        const polish = state.perimeter - value;
        state.content = {
          ...state.content,
          mitre: value,
          polish: polish,
        };
      } else {
        state.content = {
          ...state.content,
          [type]: value,
        };
      }
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
      /* switch to default selected data of a layout or existing estimate */

      if (["create"].includes(state.quoteState)) {
        let clampCutCount = 0;
        state.content.cornerClamps.cornerWallClamp.forEach((record) => {
          clampCutCount += record.count;
        });
        // state.content.cornerClamps.cornerSleeveOver.forEach((record) => {
        //   clampCutCount += record.count;
        // });
        state.content.cornerClamps.cornerGlassToGlass.forEach((record) => {
          clampCutCount += record.count;
        });

        // if state is create quote
        if (["channel"].includes(payload?.toLowerCase())) {
          // for channel
          let channelItem = null;
          channelItem = state.listData?.mountingChannel?.find(
            (item) => item._id === state.selectedItem?.settings?.mountingChannel
          );

          state.content = {
            ...state.content,
            mountingChannel: {
              item: channelItem || null,
              count: channelItem ? 1 : 0,
            },
            clampCut: clampCutCount,
          };
        } else if (["clamps"].includes(payload?.toLowerCase())) {
          // for clamps
          let wallClampItem = null;
          wallClampItem = state.listData?.wallClamp?.find(
            (item) =>
              item._id ===
              state.selectedItem?.settings?.wallClamp?.wallClampType
          );
          let sleeveOverItem = null;
          sleeveOverItem = state.listData?.sleeveOver?.find(
            (item) =>
              item._id ===
              state.selectedItem?.settings?.sleeveOver?.sleeveOverType
          );
          let glassToGlassItem = null;
          glassToGlassItem = state.listData?.glassToGlass?.find(
            (item) =>
              item._id ===
              state.selectedItem?.settings?.glassToGlass?.glassToGlassType
          );
          state.content = {
            ...state.content,
            mountingClamps: {
              wallClamp: wallClampItem
                ? [
                    {
                      item: wallClampItem,
                      count: state.selectedItem?.settings?.wallClamp?.count,
                    },
                  ]
                : [],
              sleeveOver: sleeveOverItem
                ? [
                    {
                      item: sleeveOverItem,
                      count: state.selectedItem?.settings?.sleeveOver?.count,
                    },
                  ]
                : [],
              glassToGlass: glassToGlassItem
                ? [
                    {
                      item: glassToGlassItem,
                      count: state.selectedItem?.settings?.glassToGlass?.count,
                    },
                  ]
                : [],
            },
            clampCut:
              state.selectedItem?.settings?.wallClamp?.count +
              state.selectedItem?.settings?.sleeveOver?.count +
              state.selectedItem?.settings?.glassToGlass?.count +
              clampCutCount,
          };
        }
      }
      // if state is edit quote
      else if (["edit"].includes(state.quoteState)) {
        let clampCutCount = 0;
        state.content.cornerClamps.cornerWallClamp.forEach((record) => {
          clampCutCount += record.count;
        });
        // state.content.cornerClamps.cornerSleeveOver.forEach((record) => {
        //   clampCutCount += record.count;
        // });
        state.content.cornerClamps.cornerGlassToGlass.forEach((record) => {
          clampCutCount += record.count;
        });
        if (["channel"].includes(payload?.toLowerCase())) {
          // for channel
          let channelItem = null;
          channelItem = state.listData?.mountingChannel?.find(
            (item) => item._id === state.selectedItem?.mountingChannel
          );

          state.content = {
            ...state.content,
            mountingChannel: {
              item: channelItem || null,
              count: channelItem ? 1 : 0,
            },
            clampCut: clampCutCount,
          };
        } else if (["clamps"].includes(payload?.toLowerCase())) {
          // for clamps
          let wallClampArray = [];
          wallClampArray = state.selectedItem?.mountingClamps?.wallClamp?.map(
            (row) => {
              const record = state.listData?.wallClamp?.find(
                (clamp) => clamp._id === row?.type
              );
              return { item: record, count: row.count };
            }
          );
          let sleeveOverArray = [];
          sleeveOverArray = state.selectedItem?.mountingClamps?.sleeveOver?.map(
            (row) => {
              const record = state.listData?.sleeveOver?.find(
                (clamp) => clamp._id === row?.type
              );
              return { item: record, count: row.count };
            }
          );
          let glassToGlassArray = [];
          glassToGlassArray =
            state.selectedItem?.mountingClamps?.glassToGlass?.map((row) => {
              const record = state.listData?.glassToGlass?.find(
                (clamp) => clamp._id === row?.type
              );
              return { item: record, count: row.count };
            });
          let clampCutCountDefault = 0;
          state.selectedItem?.mountingClamps?.wallClamp.forEach((record) => {
            clampCutCountDefault += record.count;
          });
          state.selectedItem?.mountingClamps?.sleeveOver.forEach((record) => {
            clampCutCountDefault += record.count;
          });
          state.selectedItem?.mountingClamps?.glassToGlass.forEach((record) => {
            clampCutCountDefault += record.count;
          });
          state.content = {
            ...state.content,
            mountingClamps: {
              wallClamp: [...wallClampArray],
              sleeveOver: [...sleeveOverArray],
              glassToGlass: [...glassToGlassArray],
            },
            clampCut: clampCutCountDefault + clampCutCount,
          };
        }
      } else if (["custom"].includes(state.quoteState)) {
        let clampCutCount = 0;
        state.content.cornerClamps.cornerWallClamp.forEach((record) => {
          clampCutCount += record.count;
        });
        // state.content.cornerClamps.cornerSleeveOver.forEach((record) => {
        //   clampCutCount += record.count;
        // });
        state.content.cornerClamps.cornerGlassToGlass.forEach((record) => {
          clampCutCount += record.count;
        });
        if (["channel"].includes(payload?.toLowerCase())) {
          state.content = {
            ...state.content,
            mountingClamps: {
              wallClamp: [],
              sleeveOver: [],
              glassToGlass: [],
            },
            clampCut: clampCutCount,
          };
        } else if (["clamps"].includes(payload?.toLowerCase())) {
          state.content = {
            ...state.content,
            mountingChannel: {
              item: null,
              count: 0,
            },
            clampCut: clampCutCount,
          };
        }
      }
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

      let clampCutOut = 0;
      let wallClampItem,
        sleeveOverItem,
        glassToGlassItem,
        cornerWallClampItem,
        cornerSleeveOverItem,
        cornerGlassToGlassItem,
        channelItem;
      wallClampItem =
        sleeveOverItem =
        glassToGlassItem =
        cornerWallClampItem =
        cornerSleeveOverItem =
        cornerGlassToGlassItem =
        channelItem =
          null;
      // do not calculate if a lyout does not have mounting channel or clamp
      if (
        ![
          layoutVariants.DOOR,
          layoutVariants.DOUBLEDOOR,
          layoutVariants.DOUBLEBARN,
        ].includes(layoutData?.settings?.variant)
      ) {
        wallClampItem = state.listData?.wallClamp?.find(
          (item) => item._id === layoutData?.settings?.wallClamp?.wallClampType
        );

        sleeveOverItem = state.listData?.sleeveOver?.find(
          (item) =>
            item._id === layoutData?.settings?.sleeveOver?.sleeveOverType
        );

        glassToGlassItem = state.listData?.glassToGlass?.find(
          (item) =>
            item._id === layoutData?.settings?.glassToGlass?.glassToGlassType
        );

        cornerWallClampItem = state.listData?.cornerWallClamp?.find(
          (item) =>
            item._id === layoutData?.settings?.cornerWallClamp?.wallClampType
        );

        cornerSleeveOverItem = state.listData?.cornerSleeveOver?.find(
          (item) =>
            item._id === layoutData?.settings?.cornerSleeveOver?.sleeveOverType
        );

        cornerGlassToGlassItem = state.listData?.cornerGlassToGlass?.find(
          (item) =>
            item._id ===
            layoutData?.settings?.cornerGlassToGlass?.glassToGlassType
        );

        channelItem = state.listData?.mountingChannel?.find(
          (item) => item._id === layoutData?.settings?.mountingChannel
        );
        clampCutOut =
          layoutData?.settings?.wallClamp?.count +
          layoutData?.settings?.sleeveOver?.count +
          layoutData?.settings?.glassToGlass?.count +
          layoutData?.settings?.cornerWallClamp?.count +
          layoutData?.settings?.cornerGlassToGlass?.count;
        //   layoutData?.settings?.cornerSleeveOver?.count +
      }

      // if(channelItem){
      //   if(layoutData?.settings?.glassType?.thickness === '3/8'){
      //     channelItem = state.listData?.mountingChannel?.find((item)=>item.slug === 'u-channel-3-8');
      //   }else if(layoutData?.settings?.glassType?.thickness === '1/2'){
      //     channelItem = state.listData?.mountingChannel?.find((item)=>item.slug === 'u-channel-1-2');
      //   }
      // }
      const noGlassAddon = state.listData.glassAddons?.find(
        (item) => item.slug === "no-treatment"
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
          thickness: layoutData?.settings?.glassType?.thickness || "1/2",
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
        cornerClamps: {
          cornerWallClamp: cornerWallClampItem
            ? [
                {
                  item: cornerWallClampItem,
                  count: layoutData?.settings?.cornerWallClamp?.count,
                },
              ]
            : [],
          cornerSleeveOver: cornerSleeveOverItem
            ? [
                {
                  item: cornerSleeveOverItem,
                  count: layoutData?.settings?.cornerSleeveOver?.count,
                },
              ]
            : [],
          cornerGlassToGlass: cornerGlassToGlassItem
            ? [
                {
                  item: cornerGlassToGlassItem,
                  count: layoutData?.settings?.cornerGlassToGlass?.count,
                },
              ]
            : [],
        },
        mountingState:
          wallClampItem || sleeveOverItem || glassToGlassItem
            ? "clamps"
            : "channel",
        people: layoutData?.settings?.other?.people,
        hours: layoutData?.settings?.other?.hours,
        glassAddons: glassAddon ? [glassAddon] : [noGlassAddon],
        outages: layoutData?.settings?.outages,
        notch: layoutData?.settings?.notch,
        hingeCut: layoutData?.settings?.hinges?.count,
        oneInchHoles:
          layoutData?.settings?.handles?.count * 2 +
          (layoutData?.settings?.variant === layoutVariants.SINGLEBARN
            ? 6
            : layoutData?.settings?.variant === layoutVariants.DOUBLEBARN
            ? 8
            : 0),
        clampCut: clampCutOut,
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

      let wallClampArray,
        sleeveOverArray,
        glassToGlassArray,
        cornerWallClampArray,
        cornerSleeveOverArray,
        cornerGlassToGlassArray,
        channelItem;
      wallClampArray =
        sleeveOverArray =
        glassToGlassArray =
        cornerWallClampArray =
        cornerSleeveOverArray =
        cornerGlassToGlassArray =
          [];
      channelItem = null;
      // do not calculate if a layout does not have mounting channel or clamp
      if (
        ![
          layoutVariants.DOOR,
          layoutVariants.DOUBLEDOOR,
          layoutVariants.DOUBLEBARN,
        ].includes(estimateData?.layoutData?.variant)
      ) {
        wallClampArray = estimateData?.mountingClamps?.wallClamp?.map((row) => {
          const record = state.listData?.wallClamp?.find(
            (clamp) => clamp._id === row?.type
          );
          return { item: record, count: row.count };
        });
        sleeveOverArray = estimateData?.mountingClamps?.sleeveOver?.map(
          (row) => {
            const record = state.listData?.sleeveOver?.find(
              (clamp) => clamp._id === row?.type
            );
            return { item: record, count: row.count };
          }
        );
        glassToGlassArray = estimateData?.mountingClamps?.glassToGlass?.map(
          (row) => {
            const record = state.listData?.glassToGlass?.find(
              (clamp) => clamp._id === row?.type
            );
            return { item: record, count: row.count };
          }
        );

        cornerWallClampArray = estimateData?.cornerClamps?.wallClamp?.map(
          (row) => {
            const record = state.listData?.cornerWallClamp?.find(
              (clamp) => clamp._id === row?.type
            );
            return { item: record, count: row.count };
          }
        );

        cornerSleeveOverArray = estimateData?.cornerClamps?.sleeveOver?.map(
          (row) => {
            const record = state.listData?.cornerSleeveOver?.find(
              (clamp) => clamp._id === row?.type
            );
            return { item: record, count: row.count };
          }
        );

        cornerGlassToGlassArray = estimateData?.cornerClamps?.glassToGlass?.map(
          (row) => {
            const record = state.listData?.cornerGlassToGlass?.find(
              (clamp) => clamp._id === row?.type
            );
            return { item: record, count: row.count };
          }
        );

        channelItem = state.listData?.mountingChannel?.find(
          (item) => item._id === estimateData?.mountingChannel
        );
      }
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
        cornerClamps: {
          cornerWallClamp: [...cornerWallClampArray],
          cornerSleeveOver: [...cornerSleeveOverArray],
          cornerGlassToGlass: [...cornerGlassToGlassArray],
        },
        mountingChannel: {
          item: channelItem || null,
          count: channelItem ? 1 : 0,
        },
        mountingState:
          wallClampArray?.length ||
          sleeveOverArray?.length ||
          glassToGlassArray?.length
            ? "clamps"
            : "channel",
        hingeCut: estimateData?.hingeCut,
        people: estimateData?.people,
        hours: estimateData?.hours,
        glassAddons: glassAddons?.length
          ? [...glassAddons]
          : [state.listData.glassAddons[0]],
        oneInchHoles: estimateData?.oneInchHoles,
        clampCut: estimateData?.clampCut,
        notch: estimateData?.notch,
        outages: estimateData?.outages,
        mitre: estimateData?.mitre,
        polish: estimateData?.polish,
        sleeveOverCount: estimateData?.sleeveOverCount,
        towelBarsCount: estimateData?.towelBarsCount,
        hardwareAddons: [...hardwareAddons],
        userProfitPercentage: estimateData?.userProfitPercentage,
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
  resetState,
  setGlassPrice,
  setHardwarePrice,
  setGlassAddonsPrice,
  setFabricationPrice,
  setMiscPrice,
  setLaborPrice,
  setUserProfitPercentage,
  setLayoutArea,
  setLayoutPerimeter,
  setContent,
  setTotal,
  setCost,
  setProfit,
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
  setPanelWidth,
} = estimateCalcSlice.actions;
export default estimateCalcSlice.reducer;
