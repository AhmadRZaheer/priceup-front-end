import { backendURL, createSlug } from "../common";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

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
  console.log(id, "second hook");
  async function fetchData() {
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
  }
  return useQuery({
    queryKey: ["singleLayout", id],
    queryFn: fetchData,
    enabled: !!id,
    placeholderData: null,
  });
};

export const useEditDefault = () => {
  const handleEdit = async (updatedHardware) => {
    console.log(updatedHardware, "updatehardware in hooks");

    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        `${backendURL}/finishes/${updatedHardware?.id}`,
        {
          name: updatedHardware?.hardwareLabel,
          holesNeeded: updatedHardware?.thickness,
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
