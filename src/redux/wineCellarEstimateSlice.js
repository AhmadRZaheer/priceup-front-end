import { calculateAreaAndPerimeter } from "@/utilities/common";
import {
    hardwareTypes,
    layoutVariants,
    notificationsVariant,
    quoteState,
    thicknessTypes,
  } from "@/utilities/constants";
import { getHardwareSpecificFabrication } from "@/utilities/WineCellarEstimate";
  // import { getWineHardwareSpecificFabrication } from "@/utilities/hardwarefabrication";
  const { createSlice } = require("@reduxjs/toolkit");
  
//   export const getWineProjectId = (state) => state.wineCellarsEstimate.projectId;
  export const selectedItem = (state) => state.wineCellarsEstimate.selectedItem;
//   export const getWineQuoteState = (state) => state.wineCellarsEstimate.quoteState;
  export const getDoorWidth = (state) => state.wineCellarsEstimate.doorWidth;
  export const getDoorQuantity = (state) => state.wineCellarsEstimate.doorQuantity;
  export const getMeasurements = (state) => state.wineCellarsEstimate.measurements;
  export const getisCustomDoorWidth = (state) =>
    state.wineCellarsEstimate.isCustomizedDoorWidth;
  export const getAdditionalFields = (state) =>
    state.wineCellarsEstimate.content.additionalFields;
  export const getHardwareTotal = (state) => state.wineCellarsEstimate.hardwarePrice;
  export const getGlassTotal = (state) => state.wineCellarsEstimate.glassPrice;
  export const getFabricationTotal = (state) =>
    state.wineCellarsEstimate.fabricationPrice;
  export const getLaborTotal = (state) => state.wineCellarsEstimate.laborPrice;
  export const getDoorLaborTotal = (state) => state.wineCellarsEstimate.doorLaborPrice;
  export const getAdditionalFieldsTotal = (state) =>
    state.wineCellarsEstimate.additionalFieldsPrice;
  export const getUserProfitPercentage = (state) =>
    state.wineCellarsEstimate.content.userProfitPercentage;
  export const getDoorWeight = (state) => state.wineCellarsEstimate.doorWeight;
  export const getPanelWeight = (state) => state.wineCellarsEstimate.panelWeight;
  export const getReturnWeight = (state) => state.wineCellarsEstimate.returnWeight;
  export const getTotal = (state) => state.wineCellarsEstimate.totalPrice;
  export const getCost = (state) => state.wineCellarsEstimate.actualCost;
  export const getProfit = (state) => state.wineCellarsEstimate.grossProfit;
  export const getContent = (state) => state.wineCellarsEstimate.content;
  export const getLayoutArea = (state) => state.wineCellarsEstimate.sqftArea;
  export const getLayoutPerimeter = (state) => state.wineCellarsEstimate.perimeter;
//   export const getWineListData = (state) => state.wineCellarsEstimate.listData;
  export const getQuoteId = (state) => state.wineCellarsEstimate.quoteId;
  export const getNotifications = (state) =>
    state.wineCellarsEstimate.notifications;
  
  const initialState = {
    quoteId: null,
    quoteState: "create",
    // projectId: null,
    perimeter: 0,
    doorWeight: 0,
    sqftArea: 0,
    panelWeight: 0,
    returnWeight: 0,
    backWallGlassWeight:0,
    totalPrice: 0,
    grossProfit: 0,
    actualCost: 0,
    doorWidth: 0,
    doorQuantity:1,
    hardwarePrice: 0,
    glassPrice: 0,
    fabricationPrice: 0,
    miscPrice: 0,
    laborPrice: 0,
    doorLaborPrice:0,
    additionalFieldsPrice: 0,
    isCustomizedDoorWidth: false,
    selectedItem: null,
    measurements: [],
    // listData: null,
    notifications: {
      finishNotSelected: {
        status: false,
        variant: notificationsVariant.DEFAULT,
        message: "",
      },
      hingesSwitch: {
        status: false,
        variant: notificationsVariant.DEFAULT,
        message: "",
      },
      glassThicknessSwitch: {
        status: false,
        variant: notificationsVariant.DEFAULT,
        message: "",
      },
      panelOverweight: {
        status: false,
        variant: notificationsVariant.DEFAULT,
        message: "",
      },
      handleNotAvailable: {
        status: false,
        variant: notificationsVariant.DEFAULT,
        message: "",
      },
      doorLockNotAvailable: {
        status: false,
        variant: notificationsVariant.DEFAULT,
        message: "",
      },
      hingeNotAvailable: {
        status: false,
        variant: notificationsVariant.DEFAULT,
        message: "",
      },
      glassTypeNotAvailable: {
        status: false,
        variant: notificationsVariant.DEFAULT,
        message: "",
      },
      channelNotAvailable: {
        status: false,
        variant: notificationsVariant.DEFAULT,
        message: "",
      },
      calculateChannelWarning: {
        status: false,
        variant: notificationsVariant.DEFAULT,
        message: "",
      },
    },
    content: {
      additionalFields: [],
      hardwareFinishes: null,
      handles: {
        item: null,
        count: 0,
      },
      doorLock: {
        item: null,
        count: 0,
      },
      hinges: {
        item: null,
        count: 0,
      },
      mountingChannel: {
        item: null,
        count: 0,
      },
      glassType: {
        item: null,
        thickness: thicknessTypes.THREEBYEIGHT,
      },
      glassAddons: [],
      oneInchHoles: 0,
      hingeCut: 0,
      people: 0,
      hours: 0,
      laborHoursForDoor: 0,
      mountingState: "channel",
      userProfitPercentage: 0,
    },
  };
  
  const wineCellarsEstimateSlice = createSlice({
    name: "wineCellarsEstimate",
    initialState,
    reducers: {
    //   setWineCellarProjectId: (state, action) => {
    //     state.projectId = action.payload;
    //   },
      resetNotifications: (state) => {
        state.notifications = initialState.notifications;
      },
      setisCustomizedDoorWidth: (state, action) => {
        state.isCustomizedDoorWidth = action.payload;
      },
      setDoorWidth: (state, action) => {
        state.doorWidth = action.payload;
      },
      setDoorQuantity: (state, action) => {
        state.doorQuantity = action.payload;
      },
      setSelectedItem: (state, action) => {
        state.selectedItem = action.payload;
      },
      setQuoteState: (state, action) => {
        state.quoteState = action.payload;
      },
      updateMeasurements: (state, action) => {
        state.measurements = action.payload;
      },
      setUserProfitPercentage: (state, action) => {
        state.content.userProfitPercentage = action.payload;
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
      setSelectedItem: (state, action) => {
        const itemData = action.payload;
        state.selectedItem = itemData;
      },
      setDoorWeight: (state, action) => {
        state.doorWeight = action.payload;
      },
      setPanelWeight: (state, action) => {
        state.panelWeight = action.payload;
      },
      setReturnWeight: (state, action) => {
        state.returnWeight = action.payload;
      },
      setBackWallGlassWeight: (state, action) => {
        state.backWallGlassWeight = action.payload;
      },
      setMultipleNotifications: (state, action) => {
        const { selectedContent, notifications } = action.payload;
        state.notifications = notifications;
        state.content = selectedContent;
      },
      setHardwareFabricationQuantity: (state, action) => {
        const { oneInchHoles, hingeCut } =
          action.payload;
        state.content = {
          ...state.content,
          oneInchHoles,
          hingeCut
          // clampCut,
          // notch,
          // outages,
        };
      },
      
  
      initializeStateForCreateQuote: (state, action) => {
        const { layoutData, hardwaresList } = action.payload;
        let notifications = state.notifications;
        let hardwareFinishes = null;
        hardwareFinishes = hardwaresList?.hardwareFinishes?.find(
          (item) => item._id === layoutData?.settings?.hardwareFinishes
        );
  
        let handleType = null;
        handleType = hardwaresList?.handles?.find(
          (item) => item._id === layoutData?.settings?.handles?.handleType
        );
        let doorLockType = null;
        doorLockType = hardwaresList?.doorLocks?.find(
          (item) => item._id === layoutData?.settings?.doorLock?.type
        );
  
        let hingesType = null;
        hingesType = hardwaresList?.hinges?.find(
          (item) => item._id === layoutData?.settings?.hinges?.hingesType
        );
  
        let glassType = null;
        glassType = hardwaresList?.glassType?.find(
          (item) => item._id === layoutData?.settings?.glassType?.type
        );
        let glassThickness =
          layoutData?.settings?.glassType?.thickness ||
          thicknessTypes.THREEBYEIGHT;
  
        // let glassAddon = null;
        // glassAddon = state.listData?.glassAddons?.find(
        //   (item) => item._id === layoutData?.settings?.glassAddon
        // );
         // const noGlassAddon = state.listData?.glassAddons?.find(
        //   (item) => item.slug === "no-treatment"
        // );

        let channelItem;
        channelItem = null;
          channelItem = hardwaresList?.mountingChannel?.find(
            (item) => item._id === layoutData?.settings?.mountingChannel
          );
  
        state.notifications = notifications;
        state.content = {
          ...state.content,
          hardwareFinishes: hardwareFinishes,
          handles: {
            item: handleType || null,
            count: layoutData?.settings?.handles?.count,
          },
          doorLock: {
            item: doorLockType || null,
            count: layoutData?.settings?.doorLock?.count,
          },
          hinges: {
            item: hingesType || null,
            count: layoutData?.settings?.hinges?.count,
          },
          glassType: {
            item: glassType || null,
            thickness: glassThickness,
          },
          mountingChannel: {
            item: channelItem || null,
            count: channelItem ? 1 : 0,
          },
          mountingState: "channel",
          people: layoutData?.settings?.other?.people,
          hours: layoutData?.settings?.other?.hours,
          laborHoursForDoor: layoutData?.settings?.noOfHoursToCompleteSingleDoor,
          // glassAddons: glassAddon ? [glassAddon] : [noGlassAddon],
          hingeCut: layoutData?.settings?.hinges?.count,
          oneInchHoles: layoutData?.settings?.handles?.count * 2,
        };
      },
  
      initializeStateForEditQuote: (state, action) => {
        const { estimateData, quotesId, hardwaresList } = action.payload;
        state.quoteId = quotesId;
  
        let hardwareFinishes = null;
        hardwareFinishes = hardwaresList?.hardwareFinishes?.find(
          (item) => item._id === estimateData?.config?.hardwareFinishes
        );
        let handleType = null;
        handleType = hardwaresList?.handles?.find(
          (item) => item._id === estimateData?.config?.handles?.type
        );
        let doorLockType = null;
        doorLockType = hardwaresList?.doorLocks?.find(
          (item) => item._id === estimateData?.config?.doorLock?.type
        );
        let hingesType = null;
        hingesType = hardwaresList?.hinges?.find(
          (item) => item._id === estimateData?.config?.hinges?.type
        );
  
        let glassTypee = null;
        glassTypee = hardwaresList?.glassType?.find(
          (item) => item._id === estimateData?.config?.glassType?.type
        );
  
        // let glassAddons = [];
        // glassAddons = estimateData?.config?.glassAddons?.map((item) => {
        //   const record = hardwaresList?.glassAddons.find(
        //     (addon) => addon._id === item
        //   );
        //   return record;
        // });

        // const noGlassAddon = state.listData.glassAddons?.find(
        //   (item) => item.slug === "no-treatment"
        // );

        let channelItem = null;
        channelItem = hardwaresList?.mountingChannel?.find(
            (item) => item._id === estimateData?.config?.mountingChannel
        );

        // Generate Channel calculate warning if channel is selected 
        if(channelItem){
          state.notifications.calculateChannelWarning = {
            status: true,
            variant:  notificationsVariant.WARNING ,
            message: 'Current channel price is being calculated according to 1 channel stick',
          }
        }
        
        state.content = {
          ...state.content,
          hardwareFinishes: hardwareFinishes,
          handles: {
            ...state.handles,
            item: handleType,
            count: estimateData?.config?.handles?.count,
          },
          doorLock: {
            ...state.doorLock,
            item: doorLockType,
            count: estimateData?.config?.doorLock?.count,
          },
          hinges: {
            ...state.hinges,
            item: hingesType,
            count: estimateData?.config?.hinges?.count,
          },
          glassType: {
            item: glassTypee,
            thickness: estimateData?.config?.glassType?.thickness,
          },
          mountingChannel: {
            item: channelItem || null,
            count: channelItem ? 1 : 0,
          },
          mountingState:"channel",
          hingeCut: estimateData?.config?.hingeCut,
          people: estimateData?.config?.people,
          hours: estimateData?.config?.hours,
          laborHoursForDoor:  estimateData?.config?.laborHoursForDoor ?? 0,
          // glassAddons: glassAddons?.length ? [...glassAddons] : [noGlassAddon],
          oneInchHoles: estimateData?.config?.oneInchHoles,
          // polish: estimateData?.config?.polish,
          userProfitPercentage: estimateData?.config?.userProfitPercentage,
          additionalFields: estimateData?.config?.additionalFields,
        };
        // state.quoteState = quoteState.EDIT;
        // state.measurements = measurements;
        state.perimeter = estimateData?.config?.perimeter;
        state.sqftArea = estimateData?.config?.sqftArea;
        // state.selectedItem = estimateData;
        state.doorWidth = estimateData?.config?.doorWidth || 0;
        state.doorQuantity = estimateData?.config?.doorQuantity || 1;
      },
  
      setInputContent: (state, action) => {
        const { type, value } = action.payload;
        if (["mitre"].includes(type)) {
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
      setTotal: (state, action) => {
        state.totalPrice = action.payload;
      },
      setHardwarePrice: (state, action) => {
        state.hardwarePrice = action.payload;
      },
      setGlassPrice: (state, action) => {
        state.glassPrice = action.payload;
      },
      setFabricationPrice: (state, action) => {
        state.fabricationPrice = action.payload;
      },
      setLaborPrice: (state, action) => {
        state.laborPrice = action.payload;
      },
      setDoorLaborPrice: (state, action) => {
        state.doorLaborPrice = action.payload;
      },
      setCost: (state, action) => {
        state.actualCost = action.payload;
      },
      sethoursForSingleDoor: (state, action) => {
        state.content.laborHoursForDoor = action.payload;
      },
      setProfit: (state, action) => {
        state.grossProfit = action.payload;
      },
      setAdditionalFieldsPrice: (state, action) => {
        state.additionalFieldsPrice = action.payload;
      },
      setThickness: (state, action) => {
        const { thickness, hardwaresList } = action.payload;
        /** on change glass thickness shift active channel of layout */
        const currentChannel = state.content.mountingChannel.item;
        let newChannel = null;
        if (thickness === thicknessTypes.ONEBYTWO) {
          if (currentChannel) {
            newChannel = hardwaresList?.mountingChannel?.find(
              (item) => item.slug === "u-channel-1-2"
            );
          }
        } else if (thickness === thicknessTypes.THREEBYEIGHT) {
          if (currentChannel) {
            newChannel = hardwaresList?.mountingChannel?.find(
              (item) => item.slug === "u-channel-3-8"
            );
          }
        }
        /** end */
        /** Calculate fabrication of newly selected mounting after glass thickness shift */
        const fabricationsCount = {
          oneInchHoles: state.content.oneInchHoles,
          hingeCut: state.content.hingeCut,
        };
        const hardwareFabrication = getHardwareSpecificFabrication(
          hardwareTypes.CHANNEL,
          fabricationsCount,
          { item: currentChannel, count: currentChannel ? 1 : 0 },
          { item: newChannel, count: newChannel ? 1 : 0 }
        );
  
        /** Calculate all weights on shifting glass thickness */
        const result = calculateAreaAndPerimeter(
          state.measurements,
          state.selectedItem?.settings?.variant ?? layoutVariants.CUSTOM,
          thickness,
          {doorQuantity:state.doorQuantity}
        );
        /** end */
        return {
          ...state,
          doorWeight: result?.doorWeight ?? state.doorWeight,
          panelWeight: result?.panelWeight ?? state.panelWeight,
          returnWeight: result?.returnWeight ?? state.returnWeight,
          backWallGlassWeight: result?.backWallGlassWeight ?? state.backWallGlassWeight,
          content: {
            ...state.content,
            glassType: {
              ...state.content.glassType,
              thickness: thickness,
            },
            mountingChannel: {
              item: newChannel,
              count: newChannel ? 1 : 0,
            },
            oneInchHoles: hardwareFabrication.oneInchHoles,
            hingeCut: hardwareFabrication.hingeCut
          },
        };
      },
  
      setContent: (state, action) => {
        const { type, item } = action.payload;
        /** Calculate and modify fabrication values according to current hardware selected or unselected  */
        const fabricationsCount = {
          oneInchHoles: state.content.oneInchHoles,
          hingeCut: state.content.hingeCut,
        };
  
        if (
          [
            hardwareTypes.HANDLES,
            hardwareTypes.HINGES,
            // hardwareTypes.SLIDINGDOORSYSTEM,
            // hardwareTypes.HEADER,
            hardwareTypes.CHANNEL,
            hardwareTypes.DOORLOCK
          ].includes(type)
        ) {
          let currentHardware = null;
          let newHardware = null;
          if ([hardwareTypes.CHANNEL].includes(type)) {
            const selectedSameItem =
              item?._id === state.content.mountingChannel.item?._id;
            currentHardware = {
              item: state.content.mountingChannel.item,
              count: state.content.mountingChannel.item ? 1 : 0,
            };
            newHardware = {
              item: selectedSameItem ? null : item,
              count: selectedSameItem ? 0 : 1,
            };
              // Generate / remove Channel calculate warning upon selecting or unselecting channel
            state.notifications.calculateChannelWarning = {
              status: selectedSameItem ? false : true,
              variant:  selectedSameItem ? notificationsVariant.DEFAULT : notificationsVariant.WARNING ,
              message: selectedSameItem ? '' : 'Current channel price is being calculated according to 1 channel stick',
            }
          } else if ([hardwareTypes.DOORLOCK].includes(type)){
            const selectedSameItem =
              item?._id === state.content.doorLock.item?._id;
            currentHardware = {
              item: state.content.doorLock.item,
              count: state.content.doorLock.item ? 1 : 0,
            };
            newHardware = {
              item: selectedSameItem ? null : item,
              count: selectedSameItem ? 0 : 1,
            };
          } else {
            currentHardware = {
              item: state.content?.[type]?.item,
              count: state.content?.[type]?.count ?? 0,
            };
            newHardware = {
              item: item,
              count: state.content?.[type]?.count ?? 0,
            };
          }
          const hardwareFabrication = getHardwareSpecificFabrication(
            type,
            fabricationsCount,
            currentHardware,
            newHardware
          );
  
          if (hardwareFabrication) {
            state.content = {
              ...state.content,
              oneInchHoles: hardwareFabrication.oneInchHoles,
              hingeCut: hardwareFabrication.hingeCut,
            };
          }
        }
        if ([hardwareTypes.CHANNEL].includes(type)) {
          const found = item?._id === state.content.mountingChannel.item?._id;
          state.content = {
            ...state.content,
            mountingChannel: {
              item: found ? null : item,
              count: found ? 0 : 1,
            },
          };
        } else if ([hardwareTypes.DOORLOCK].includes(type)) {
          const found = item?._id === state.content.doorLock.item?._id;
          state.content = {
            ...state.content,
            doorLock: {
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
          console.log("Nice Try.");
        } else if (["additionalFields"].includes(type)) {
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
      setCounters: (state, action) => {
        const { type, value, item } = action.payload;
        /** Calculate and modify fabrication values according to current hardware selected or unselected  */
        const fabricationsCount = {
          oneInchHoles: state.content.oneInchHoles,
          hingeCut: state.content.hingeCut
        };
  
        if (
          [
            hardwareTypes.HANDLES,
            hardwareTypes.HINGES,
            hardwareTypes.DOORLOCK,
          ].includes(type)
        ) {
          let currentHardware = null;
          let newHardware = null;
          let oldCounterValue = 0;
          oldCounterValue = state.content?.[type]?.count ?? 0;
          
          currentHardware = {
            item,
            count: oldCounterValue,
          };
          newHardware = {
            item,
            count: value ?? 0,
          };
  
          const hardwareFabrication = getHardwareSpecificFabrication(
            type,
            fabricationsCount,
            currentHardware,
            newHardware
          );
  
          if (hardwareFabrication) {
            state.content = {
              ...state.content,
              oneInchHoles: hardwareFabrication.oneInchHoles,
              hingeCut: hardwareFabrication.hingeCut
            };
          }
        }
        
          state.content = {
            ...state.content,
            [type]: {
              ...state.content[type],
              count: value,
            },
          };
        
      },
      resetWineCellarEstimateState: (state) => {
        return {
          ...initialState,
        };
      },
    },
  });
  export const {
    // setWineCellarProjectId,
    resetNotifications,
    resetWineCellarEstimateState,
    setisCustomizedDoorWidth,
    setDoorWidth,
    setDoorQuantity,
    setSelectedItem,
    setQuoteState,
    updateMeasurements,
    setUserProfitPercentage,
    setLayoutArea,
    setLayoutPerimeter,
    setDoorWeight,
    setPanelWeight,
    setReturnWeight,
    setBackWallGlassWeight,
    setMultipleNotifications,
    setHardwareFabricationQuantity,
    initializeStateForCreateQuote,
    initializeStateForEditQuote,
    setInputContent,
    setTotal,
    setHardwarePrice,
    setGlassPrice,
    setFabricationPrice,
    setLaborPrice,
    setDoorLaborPrice,
    setCost,
    setProfit,  
    setAdditionalFieldsPrice,
    setContent,
    setThickness,
    setCounters,
    setActiveMounting,
    sethoursForSingleDoor
  } = wineCellarsEstimateSlice.actions;
  
  export default wineCellarsEstimateSlice.reducer;
  