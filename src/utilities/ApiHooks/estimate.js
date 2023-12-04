import { backendURL } from "../common";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { parseJwt } from "../../components/ProtectedRoute/authVerify";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../../redux/snackBarSlice";

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
  const dispatch = useDispatch();
  const handleCreate = async (props) => {
    const token = localStorage.getItem("token");
    const decodedToken = parseJwt(token);
    const username = decodedToken.name;

    const randomNumbers = generateRandomNumbers(4);

    try {
      const response = await axios.post(
        `${backendURL}/estimates/save`,
        {
          customerData: props.customerData,
          estimateData: {
            ...props.estimateData,
            creator_id: decodedToken.id,
            creator_type: decodedToken.role,
            status: "pending",
            name: `${username}${randomNumbers}`,
          },
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.code === 200) {
        dispatch(
          showSnackbar({
            message: "Estimate Created Successfully",
            severity: "success",
          })
        );
        return response.data.data;
      } else {
        dispatch(
          showSnackbar({
            message: "An error occurred while creating the data",
            severity: "success",
          })
        );
        throw Error("An error occurred while creating the data.");
      }
    } catch (error) {
      dispatch(
        showSnackbar({
          message: error,
          severity: "success",
        })
      );
      throw new Error("An error occurred while creating the data.");
    }
  };

  return useMutation(handleCreate);
};

function generateRandomNumbers(count) {
  const randomNumbers = [];
  for (let i = 0; i < count; i++) {
    randomNumbers.push(String(1000 + Math.floor(Math.random() * 9000)));
  }
  return randomNumbers.join("");
}

export const useEditEstimates = () => {
  const dispatch = useDispatch();
  const handleEditEstimate = async (updatedEstimate) => {
    const token = localStorage.getItem("token");
    const decodedToken = parseJwt(token);
    try {
      const response = await axios.put(
        `${backendURL}/estimates/${updatedEstimate?.id}`,
        {
          customerData: updatedEstimate.customerData,
          estimateData: {
            ...updatedEstimate.estimateData,
            creator_id: decodedToken.id,
            creator_type: decodedToken.role,
          },
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.code === 200) {
        dispatch(
          showSnackbar({
            message: "Estimate Updated Successfully",
            severity: "success",
          })
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
      dispatch(showSnackbar({ message: error, severity: "error" }));
      throw new Error("An error occurred while updating the data.");
    }
  };

  return useMutation(handleEditEstimate);
};

export const useDeleteEstimates = () => {
  const dispatch = useDispatch();
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${backendURL}/estimates/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.code === 200) {
        dispatch(
          showSnackbar({
            message: "Estimate Deleted Successfuly",
            severity: "error",
          })
        );
        return response.data.data;
      } else {
        dispatch(
          showSnackbar({
            message: "An error occurred while updating the data",
            severity: "error",
          })
        );
        throw new Error("An error occurred while fetching the data.");
      }
    } catch (error) {
      dispatch(
        showSnackbar({
          message: error,
          severity: "error",
        })
      );
      throw error;
    }
  };

  return useMutation(handleDelete);
};
