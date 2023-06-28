import { backendURL, createSlug } from "../common";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { parseJwt } from "../../components/ProtectedRoute/AuthVerify";

export const useFetchDataSetting = () => {
  async function fetchData() {
    const token = localStorage.getItem("token");
    const decodedToken = parseJwt(token);
    console.log(decodedToken, "decodedToken for setting");
    try {
      const response = await axios.get(
        `${backendURL}/companies/${decodedToken?.company_id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
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
    queryKey: ["settingData"],
    queryFn: fetchData,
    enabled: true,
    placeholderData: {},
  });
};

export const useEditSetting = () => {
  const handleEditSetting = async (updatedSetting) => {
    console.log(updatedSetting, "updatedSetting in hooks");

    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        `${backendURL}/campanies/${updatedSetting?.id}`,
        {
          location: updatedSetting.location,
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

  return useMutation(handleEditSetting);
};
