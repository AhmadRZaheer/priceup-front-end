import { backendURL } from "../common";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../../redux/snackBarSlice";

export const useFetchDataCustomer = () => {
  async function fetchData() {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${backendURL}/customers`, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
    enabled: false,
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
export const useFetchDataCustomerEstimtes = () => {
  const fetchData = async ({ quoteId }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${backendURL}/users/getQuote/${quoteId?._id}`,
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
  };
  return useMutation(fetchData);
};

export const useEditCustomer = () => {
  const dispatch = useDispatch();
  const handleEdit = async (data) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    if (
      data?.customerData?.image &&
      (data?.customerData?.image instanceof File ||
        data?.customerData?.image instanceof Blob)
    ) {
      formData.append("image", data?.customerData?.image);
    }
    formData.append("name", data.customerData.name);
    formData.append("email", data.customerData.email);
    formData.append("phone", data.customerData.phone);

    try {
      const response = await axios.put(
        `${backendURL}/customers/${data?.id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.code === 200) {
        dispatch(
          showSnackbar({ message: "Updated Successfully", severity: "success" })
        );
        return response.data.data;
      } else {
        dispatch(
          showSnackbar({
            message: "An error occurred while updating the data",
            severity: "error",
          })
        );
        throw new Error("An error occurred while updating the data.");
      }
    } catch (error) {
      dispatch(
        showSnackbar({
          message: `${error.response?.data?.message}`,
          severity: "error",
        })
      );
      throw new Error("An error occurred while updating the data.");
    }
  };

  return useMutation(handleEdit);
};