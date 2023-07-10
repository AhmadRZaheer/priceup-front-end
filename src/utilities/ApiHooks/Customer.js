import { backendURL } from "../common";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useFetchDataCustomer = () => {
  async function fetchData() {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${backendURL}/customers`,
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
    queryKey: ["teamData"],
    queryFn: fetchData,
    enabled: true,
    placeholderData: [],
  });
};
