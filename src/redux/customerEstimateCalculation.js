import {
  EstimateCategory,
  hardwareTypes,
} from '@/utilities/constants';
import {
  generateContentForMirrorEdit,
  generateContentForShowerEdit,
  generateContentForWineCellarEdit,
} from '@/utilities/generateEstimateCalculationContent';
import {
  getHardwareSpecificFabrication as getShowerHardwareFabrication,
} from '@/utilities/hardwarefabrication';
import {
  getHardwareSpecificFabrication as getWineCellarHardwareFabrication,
} from '@/utilities/WineCellarEstimate';
import { createSlice } from '@reduxjs/toolkit';

export const getEstimatesList = (state) => state.customerEstimation.estimates;

const initialState = {
  estimates: [],
  grandTotal: 0,
};

const customerEstimationSlice = createSlice({
  name: "customerEstimation",
  initialState,
  reducers: {
    setEstimateTotal(state, action) {
      const { prices, estimateId, category } = action.payload;
      const estimateIndex = state.estimates.findIndex(
        (estimate) => estimate?.selectedItem?._id === estimateId
      );
      if (estimateIndex !== -1) {
        if (
          category === EstimateCategory.SHOWERS ||
          category === EstimateCategory.WINECELLARS
        ) {
          state.estimates[estimateIndex].hardwarePrice = prices.hardwarePrice;
          state.estimates[estimateIndex].glassPrice = prices.glassPrice;
          state.estimates[estimateIndex].hardwareAddonsPrice =
            prices.hardwareAddonsPrice;
          state.estimates[estimateIndex].glassAddonsPrice =
            prices.glassAddonsPrice;
          state.estimates[estimateIndex].fabricationPrice =
            prices.fabricationPrice;
          state.estimates[estimateIndex].laborPrice = prices.laborPrice;
          state.estimates[estimateIndex].additionalFieldPrice =
            prices.additionalFieldPrice;
          state.estimates[estimateIndex].totalPrice = prices.total;
          state.estimates[estimateIndex].content.discount.total =
            prices.discountTotal;
          state.estimates[estimateIndex].cost = prices.cost;
          state.estimates[estimateIndex].profit = prices.profit;
          if (category === EstimateCategory.WINECELLARS)
            state.estimates[estimateIndex].doorLaborPrice =
              prices.doorLaborPrice;
        } else if (category === EstimateCategory.MIRRORS) {
          state.estimates[estimateIndex].laborPrice = prices.labor;
          state.estimates[estimateIndex].glassPrice = prices.glass;
          state.estimates[estimateIndex].fabricationPrice = prices.fabrication;
          // state.estimates[estimateIndex].miscPrice = prices.misc;
          state.estimates[estimateIndex].additionalFieldPrice =
            prices.additionalFields;
          state.estimates[estimateIndex].profit = prices.profitPercentage;
          state.estimates[estimateIndex].cost = prices.cost;
          state.estimates[estimateIndex].totalPrice = prices.total;
          state.estimates[estimateIndex].content.discount.total =
            prices.discountTotal;
        }
      }
    },
    setContent(state, action) {
      const { type, item, hardwaresList, estimateId } = action.payload;
      const estimateIndex = state.estimates.findIndex(
        (estimate) => estimate?.selectedItem?._id === estimateId
      );
      if (estimateIndex !== -1) {
        if (["glassAddons"].includes(type)) {
          if (item.slug === "no-treatment") {
            const noGlassAddon = hardwaresList.glassAddons?.find(
              (item) => item.slug === "no-treatment"
            );
            state.estimates[estimateIndex].content.glassAddons = [{item : noGlassAddon }];
          } else {
            const foundIndex = state.estimates[
              estimateIndex
            ].content.glassAddons?.findIndex((row) => row.item.slug === item.slug);
            if (foundIndex !== -1) {
              state.estimates[estimateIndex].content.glassAddons.splice(
                foundIndex,
                1
              );
            } else {
              state.estimates[estimateIndex].content.glassAddons.push({ item: item });
            }
            const indexOfNoTreatment = state.estimates[
              estimateIndex
            ].content.glassAddons?.findIndex(
              (row) => row.item.slug === "no-treatment"
            );
            if (indexOfNoTreatment !== -1) {
              state.estimates[estimateIndex].content.glassAddons.splice(
                indexOfNoTreatment,
                1
              );
            }
          }
        } else {
          state.estimates[estimateIndex].content = {
            ...state.estimates[estimateIndex].content,
            [type]: {
              ...state.estimates[estimateIndex].content[type],
              item: item,
            },
          };
        }
      }
    },
    setCounter(state, action) {
      const { type, item, counter, estimateId } = action.payload;
      const estimateIndex = state.estimates.findIndex(
        (estimate) => estimate?.selectedItem?._id === estimateId
      );
      if (estimateIndex !== -1) {
        const fabricationsCount = {
          oneInchHoles: state.estimates[estimateIndex].content.oneInchHoles,
          hingeCut: state.estimates[estimateIndex].content.hingeCut,
          clampCut: state.estimates[estimateIndex].content.clampCut,
          notch: state.estimates[estimateIndex].content.notch,
          outages: state.estimates[estimateIndex].content.outages,
        };

        if ([hardwareTypes.HARDWAREADDONS].includes(type)) {
          let currentHardware = null;
          let newHardware = null;
          let oldCounterValue = 0;
          if ([hardwareTypes.HARDWAREADDONS].includes(type)) {
            const oldItem = state.estimates[
              estimateIndex
            ].content.hardwareAddons?.find(
              (row) => row?.item?._id === item._id
            );
            oldCounterValue = oldItem?.count ?? 0;
          } else {
            oldCounterValue =
              state.estimates[estimateIndex].content?.[type]?.count ?? 0;
          }
          currentHardware = {
            item,
            count: oldCounterValue,
          };
          newHardware = {
            item,
            count: counter ?? 0,
          };
          const getHardwareFabrication =
            state.estimates[estimateIndex].category === EstimateCategory.SHOWERS
              ? getShowerHardwareFabrication
              : getWineCellarHardwareFabrication;
          const hardwareFabrication = getHardwareFabrication(
            type,
            fabricationsCount,
            currentHardware,
            newHardware
          );

          if (hardwareFabrication) {
            state.estimates[estimateIndex].content = {
              ...state.estimates[estimateIndex].content,
              oneInchHoles: hardwareFabrication.oneInchHoles,
              hingeCut: hardwareFabrication.hingeCut,
              clampCut: hardwareFabrication.clampCut,
              notch: hardwareFabrication.notch,
              outages: hardwareFabrication.outages,
            };
          }
        }
        if ([hardwareTypes.HARDWAREADDONS].includes(type)) {
          let existing = state.estimates[estimateIndex].content.hardwareAddons;
          const foundIndex = existing.findIndex(
            (row) => row?.item?.slug === item.slug
          );
          if (foundIndex !== -1) {
            if (counter <= 0) {
              existing.splice(foundIndex, 1);
            } else {
              existing[foundIndex].count = counter;
            }
          } else {
            existing.push({ item: item, count: counter });
          }
          state.estimates[estimateIndex].content = {
            ...state.estimates[estimateIndex].content,
            hardwareAddons: [...existing],
          };
        } else {
          state.estimates[estimateIndex].content = {
            ...state.estimates[estimateIndex].content,
            [type]: {
              ...state.estimates[estimateIndex].content[type],
              count: counter,
            },
          };
        }
      }
    },
    initializeState(state, action) {
      const {
        estimates,
        showerHardwaresList,
        mirrorHardwaresList,
        wineCellarHardwaresList,
      } = action.payload;
      const data = [];
      let totalPrice = 0;
      estimates.forEach((estimate) => {
        if (estimate.category === EstimateCategory.SHOWERS) {
          const resp = generateContentForShowerEdit(
            showerHardwaresList,
            estimate
          );
          totalPrice += estimate.cost;
          data.push({
            category: estimate.category,
            perimeter: resp.perimeter,
            sqftArea: resp.sqftArea,
            doorWidth: estimate.config.doorWidth,
            isCustomizedDoorWidth: estimate.config.isCustomizedDoorWidth,
            measurements: estimate.config.measurements,
            content: resp.content,
            selectedItem: estimate,
            actualCost: 0,
            grossProfit: 0,
            totalPrice: estimate.cost,
            hardwarePrice: 0,
            glassPrice: 0,
            glassAddonsPrice: 0,
            hardwareAddonsPrice: 0,
            fabricationPrice: 0,
            miscPrice: 0,
            laborPrice: 0,
            additionalFieldsPrice: 0,
          });
        } else if (estimate.category === EstimateCategory.MIRRORS) {
          const resp = generateContentForMirrorEdit(
            mirrorHardwaresList,
            estimate
          );
          totalPrice += estimate.cost;
          data.push({
            category: estimate.category,
            sqftArea: resp.sqftArea,
            measurements: estimate.config.measurements,
            content: resp.content,
            selectedItem: estimate,
            actualCost: 0,
            grossProfit: 0,
            totalPrice: estimate.cost,
            hardwarePrice: 0,
            glassPrice: 0,
            glassAddonsPrice: 0,
            hardwareAddonsPrice: 0,
            fabricationPrice: 0,
            miscPrice: 0,
            laborPrice: 0,
            additionalFieldsPrice: 0,
            itemQuantity: 1,
            // pricing: {
            //   labor: 0,
            //   glass: 0,
            //   fabrication: 0,
            //   misc: 0,
            //   additionalFields: 0,
            //   profitPercentage: 0,
            //   cost: 0,
            //   total: 0,
            //   discountTotal:0,
            // },
          });
        } else if (estimate.category === EstimateCategory.WINECELLARS) {
          const resp = generateContentForWineCellarEdit(
            wineCellarHardwaresList,
            estimate
          );
          totalPrice += estimate.cost;
          data.push({
            category: estimate.category,
            perimeter: resp.perimeter,
            sqftArea: resp.sqftArea,
            doorWidth: estimate.config.doorWidth,
            isCustomizedDoorWidth: estimate.config.isCustomizedDoorWidth,
            measurements: estimate.config.measurements,
            content: resp.content,
            selectedItem: estimate,
            actualCost: 0,
            grossProfit: 0,
            totalPrice: estimate.cost,
            hardwarePrice: 0,
            glassPrice: 0,
            glassAddonsPrice: 0,
            hardwareAddonsPrice: 0,
            fabricationPrice: 0,
            miscPrice: 0,
            laborPrice: 0,
            additionalFieldsPrice: 0,
            doorWeight: 0,
            panelWeight: 0,
            returnWeight: 0,
            backWallGlassWeight: 0,
            doorQuantity: estimate.config?.doorQuantity ?? 1,
            doorLaborPrice: 0,
            additionalFieldsPrice: 0,
          });
        }
      });
      console.log(data, "estimates format generated");
      state.estimates = [...data];
      state.grandTotal = totalPrice;
    },
    setEstimateStatus(state, action) {
      const { estimateId, status } = action.payload;
      const estimateIndex = state.estimates.findIndex(
        (estimate) => estimate?.selectedItem?._id === estimateId
      );
      if (estimateIndex !== -1) {
        state.estimates[estimateIndex].selectedItem.status = status;
      }
    },
  },
});

export const {
  setContent,
  setCounter,
  initializeState,
  setEstimateTotal,
  setEstimateStatus,
} = customerEstimationSlice.actions;

export default customerEstimationSlice.reducer;
