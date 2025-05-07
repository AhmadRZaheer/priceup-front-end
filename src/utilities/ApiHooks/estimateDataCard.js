import axios from "axios";
import { backendURL } from "../common";
import { useQuery } from "@tanstack/react-query";

export const useFetchDataEstimateCard = () => {

    async function fetchData() {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${backendURL}/users/dashboardData`, {
          headers: { Authorization: `Bearer ${token}` },
        });
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
      queryKey: ["dashboardData"],
      queryFn: fetchData,
      enabled: false,
      // placeholderData: {},
    });
  };