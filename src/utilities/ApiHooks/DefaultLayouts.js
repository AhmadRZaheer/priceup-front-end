import { backendURL, createSlug } from "../common";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
export const useFetchDataDefault = () => {
  console.log("first  hook");
  async function fetchData() {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${backendURL}/layouts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response, "response");
      if (response.data && response.data.code === 200) {
        return response.data.data ? response.data.data : [];
      } else {
        throw new Error("An error occurred while fetching the data.");
      }
    } catch (error) {
      throw new Error("An error occurred while fetching the data.");
    }
  }
  return useQuery({
    queryKey: ["defaultData"],
    queryFn: fetchData,
    enabled: true,
    placeholderData: [],
  });
};
export const useFetchSingleDefault = (id) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(true);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${backendURL}/layouts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response, "response");
      if (response.data && response.data.code === 200) {
        return response.data.data ? response.data.data : null;
      } else {
        throw new Error("An error occurred while fetching the data.");
      }
    } catch (error) {
      throw new Error("An error occurred while fetching the data.");
    }
  };
  const refetch = () => {
    setIsLoading(true);
    setIsFetching(true);
    fetchData()
      .then((fetchedData) => {
        setData(fetchedData);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
        setIsFetching(false);
      });
  };

  useEffect(() => {
    setIsFetching(true);
    fetchData()
      .then((fetchedData) => {
        setData(fetchedData);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
        setIsFetching(false);
      });
  }, [id]);
  return { data, isLoading, isFetching, refetch };
};
export const useEditDefault = () => {
  const handleEdit = async (updatedDefault) => {
    console.log(updatedDefault, "updatedDefault in hooks");
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `${backendURL}/layouts/${updatedDefault?.id}`,

        {
          name: updatedDefault.settings?.name,
          image: updatedDefault.settings?.image,

          settings: {
            hardwareFinishes: updatedDefault.settings?.hardwareFinishes,
            handles: {
              handleType: updatedDefault.settings?.handles?.handleType,
              count: updatedDefault.settings?.handles?.count,
            },
            hinges: {
              hingesType: updatedDefault.settings?.hinges?.hingesType,
              count: updatedDefault.settings?.hinges?.count,
            },
            pivotHingeOption: {
              pivotHingeType:
                updatedDefault.settings?.pivotHingeOption?.pivotHingeType,
              count: updatedDefault.settings?.pivotHingeOption?.count,
            },
            heavyDutyOption: {
              heavyDutyType:
                updatedDefault.settings?.heavyDutyOption?.heavyDutyType,
              threshold: updatedDefault.settings?.heavyDutyOption?.threshold,
              height: updatedDefault.settings?.heavyDutyOption?.height,
            },
            heavyPivotOption: {
              heavyPivotType:
                updatedDefault.settings?.heavyPivotOption?.heavyPivotType,
              threshold: updatedDefault.settings.heavyPivotOption.threshold,

              height: updatedDefault.settings.heavyPivotOption.height,
            },
            channelOrClamps: updatedDefault.settings?.channelOrClamps,
            mountingChannel: updatedDefault.settings?.mountingChannel,
            wallClamp: {
              wallClampType: updatedDefault.settings?.wallClamp?.wallClampType,
              count: updatedDefault.settings?.wallClamp?.count,
            },
            sleeveOver: {
              sleeveOverType:
                updatedDefault.settings?.sleeveOver?.sleeveOverType,
              count: updatedDefault.settings?.sleeveOver?.count,
            },
            glassToGlass: {
              glassToGlassType:
                updatedDefault.settings?.glassToGlass?.glassToGlassType,
              count: updatedDefault.settings?.glassToGlass?.count,
            },
            glassType: {
              type: updatedDefault.settings?.glassType?.type,
              thickness: updatedDefault.settings?.glassType?.thickness,
            },
            slidingDoorSystem: {
              type: updatedDefault.settings?.slidingDoorSystem?.type,
              count: updatedDefault.settings?.slidingDoorSystem?.count,
            },
            outages: updatedDefault.settings?.outages,
            transom: updatedDefault.settings?.transom,
            header: updatedDefault.settings?.header,
            glassTreatment: updatedDefault.settings?.glassTreatment,
            other: {
              people: updatedDefault.settings?.other?.people,
              hours: updatedDefault.settings?.other?.hours,
            },
          },
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.code === 200) {
        return response.data.data;
      } else {
        throw new Error("An error occurred while updating the data.");
      }
    } catch (error) {
      throw new Error("An error occurred while updating the data.");
    }
  };

  return useMutation(handleEdit);
};
