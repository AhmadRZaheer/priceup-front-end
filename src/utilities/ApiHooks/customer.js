import { backendURL } from "../common";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

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
      if (response?.data && response?.data?.code === 200) {
        return response?.data?.data ? response?.data?.data : [];
      } else {
        throw new Error("An error occurred while fetching the data.");
      }
    } catch (error) {
      throw new Error("An error occurred while fetching the data.");
    }
  }
  return useQuery({
    queryKey: ["customerData"],
    queryFn: fetchData,
    enabled: true,
    placeholderData: [],
  });
};
export const useGetQuote = () => {
  const handleGetQuote = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${backendURL}/users/getQuote/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.code === 200) {
        return response.data.data;
      } else {
        throw new Error("An error occurred while fetching the data.");
      }
    } catch (error) {
      throw error;
    }
  };

  return useMutation(handleGetQuote);
};
