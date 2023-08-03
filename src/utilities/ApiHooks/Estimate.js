import { backendURL } from "../common";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { parseJwt } from "../../components/ProtectedRoute/AuthVerify";

export const useFetchDataEstimate = () => {
  async function fetchData() {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${backendURL}/estimates/listsData`, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
    queryKey: ["estimateData"],
    queryFn: fetchData,
    enabled: true,
    placeholderData: [],
  });
};

export const useGetEstimates = () => {
  async function fetchData() {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${backendURL}/estimates`, {
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
    queryKey: ["estimates"],
    queryFn: fetchData,
    enabled: true,
    placeholderData: null,
  });
};

export const useCreateEstimates = () => {
  const handleCreate = async (props) => {
    const token = localStorage.getItem("token");
    // const slug = createSlug(props.hardwareLabel);
    const decodedToken = parseJwt(token);
    try {
      const response = await axios.post(
        `${backendURL}/estimates/save`,
        {
          customerData: props.customerData,
          estimateData: { ...props.estimateData, creator_id: decodedToken.id, creator_type: decodedToken.role, status: "pending" },
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.code === 200) {
        return response.data.data;
      } else {
        throw new Error("An error occurred while creating the data.");
      }
    } catch (error) {
      throw new Error("An error occurred while creating the data.");
    }
  };

  return useMutation(handleCreate);
};

export const useEditEstimates = () => {
  const handleEditEstimate = async (updatedEstimate) => {
    const token = localStorage.getItem("token");
    const decodedToken = parseJwt(token);
    try {
      const response = await axios.put(
        `${backendURL}/estimates/${updatedEstimate?.id}`,
        {
          customerData: updatedEstimate.customerData,
          estimateData: { ...updatedEstimate.estimateData, creator_id: decodedToken.id , creator_type: decodedToken.role },
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

  return useMutation(handleEditEstimate);
};

export const useDeleteEstimates = () => {
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${backendURL}/estimates/${id}`, {
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

  return useMutation(handleDelete);
};

