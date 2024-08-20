import { backendURL } from "../common";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { parseJwt } from "../../components/ProtectedRoute/authVerify";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../../redux/snackBarSlice";
import { setEstimatesListRefetch } from "../../redux/refetch";
import { socketClient } from "../../configs/socket";
import { socketIoChannel } from "../constants";

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
    enabled: false,
    // placeholderData: [],
  });
};

export const useGetEstimates = (
  page,
  limit,
  searchValue,
  statusValue,
  dateValue
) => {
  async function fetchData() {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${backendURL}/estimates`, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          page,
          limit,
          search: searchValue,
          status: statusValue,
          date: dateValue,
        },
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
    enabled: false,
  });
};

export const useCreateEstimates = () => {
  const dispatch = useDispatch();
  const handleCreate = async (props) => {
    const token = localStorage.getItem("token");
    const decodedToken = parseJwt(token);
    const username = decodedToken.name;

    const date = new Date();
    var current_date =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    var current_time =
      date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    try {
      const response = await axios.post(
        `${backendURL}/estimates/save`,
        {
          // customerData: props.customerData,
          estimateData: {
            cost: props.cost,
            config: { ...props.estimateData },
            creator_id: decodedToken.id,
            creator_type: decodedToken.role,
            status: "pending",
            category: props.category,
            name: `${current_date} ${current_time}`,
            label: props.label ?? "",
            project_id: props.projectId,
          },
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.code === 200) {
        socketClient.emit(
          socketIoChannel.NOTIFICATIONS,
          "An estimate created."
        );
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
            severity: "error",
          })
        );
        throw Error("An error occurred while creating the data.");
      }
    } catch (error) {
      dispatch(
        showSnackbar({
          message: `${error.response?.data?.message}`,
          severity: "error",
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
          // ...(updatedEstimate.customerData
          //   ? { customerData: updatedEstimate.customerData }
          //   : {}),
          estimateData: {
            ...(updatedEstimate.estimateData
              ? {
                  config: { ...updatedEstimate.estimateData },
                  cost: updatedEstimate.cost,
                  project_id: updatedEstimate.projectId,
                }
              : {}),
            ...(updatedEstimate.status
              ? { status: updatedEstimate.status }
              : {}),
            creator_id: decodedToken.id,
            creator_type: decodedToken.role,
          },
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.code === 200) {
        socketClient.emit(
          socketIoChannel.NOTIFICATIONS,
          "An estimate updated."
        );
        dispatch(setEstimatesListRefetch());
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
      dispatch(
        showSnackbar({
          message: `${error.response?.data?.message}`,
          severity: "error",
        })
      );
      throw new Error("An error occurred while updating the data.");
    }
  };

  return useMutation(handleEditEstimate);
};

export const useDeleteEstimates = () => {
  // const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${backendURL}/estimates/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.code === 200) {
        socketClient.emit(
          socketIoChannel.NOTIFICATIONS,
          "An estimate deleted."
        );
        dispatch(setEstimatesListRefetch());
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
          message: `${error.response?.data?.message}`,
          severity: "error",
        })
      );
      throw error;
    }
  };

  return useMutation(handleDelete);
};

export const useGetEstimatesStats = () => {
  async function fetchData() {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${backendURL}/estimates/allStats`, {
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
    queryKey: ["estimatesStats"],
    queryFn: fetchData,
    enabled: false,
  });
};
