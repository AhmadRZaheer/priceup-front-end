import axios from "axios";
import { backendURL } from "../common";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../../redux/snackBarSlice";

export const useFetchSuperSuperAdmin = () => {
  async function fetchData() {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${backendURL}/admins`, {
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
    queryKey: ["SuperSuperData"],
    queryFn: fetchData,
    enabled: true,
    placeholderData: [],
  });
};
export const useUpdateSuper_SuperAdmins = () => {
  const dispatch = useDispatch();
  const handleEdit = async (UpdatedData) => {
    const token = localStorage.getItem("token");
    // const formData = new FormData();
    // console.log(UpdatedData, "status");
    // if (UpdatedData.status !== null) {
    //   formData.append("status", UpdatedData.status);
    // }
    // if (UpdatedData.name) {
    //   formData.append("name", UpdatedData.name);
    // }
    // if (UpdatedData.email) {
    //   formData.append("email", UpdatedData.email);
    // }
    // if (UpdatedData.image) {
    //   formData.append("image", UpdatedData.image);
    // }
    try {
      const response = await axios.put(
        `${backendURL}/admins/${UpdatedData?.id}`,
        {
          ...(UpdatedData.status !== null
            ? { status: UpdatedData.status }
            : {}),
          ...(UpdatedData.data ? UpdatedData.data : {}),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.code === 200) {
        dispatch(
          showSnackbar({
            message: `Super Admin ${
              UpdatedData.data ? "Updated" : "Status Updated"
            } Successfully`,
            severity: "success",
          })
        );
        return response.data.data;
      } else {
        dispatch(
          showSnackbar({
            message: "An error occurred while updating the user data.",
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

export const useCreateSuper_SuperAdmins = () => {
  const dispatch = useDispatch();
  const handleEdit = async (UpdatedData) => {
    const token = localStorage.getItem("token");
    // const formData = new FormData();
    // console.log(UpdatedData, "status");
    // if (UpdatedData.status !== null) {
    //   formData.append("status", UpdatedData.status);
    // }
    // if (UpdatedData.name) {
    //   formData.append("name", UpdatedData.name);
    // }
    // if (UpdatedData.email) {
    //   formData.append("email", UpdatedData.email);
    // }
    // if (UpdatedData.image) {
    //   formData.append("image", UpdatedData.image);
    // }
    try {
      const response = await axios.post(
        `${backendURL}/admins/save`,
        {
          ...(UpdatedData ? UpdatedData : {}),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.code === 200) {
        dispatch(
          showSnackbar({
            message: `Super Admin Created Successfully`,
            severity: "success",
          })
        );
        return response.data.data;
      } else {
        dispatch(
          showSnackbar({
            message: "An error occurred while updating the user data.",
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

export const useDeleteSuper_SuperAdmin = () => {
  const dispatch = useDispatch();
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${backendURL}/admins/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.code === 200) {
        dispatch(
          showSnackbar({ message: "Delete Successfully", severity: "error" })
        );
        return response.data.data;
      } else {
        dispatch(
          showSnackbar({
            message: "An error occurred while fetching the data",
            severity: "error",
          })
        );
        throw new Error("An error occurred while fetching the data.");
      }
    } catch (error) {
      dispatch(showSnackbar({ message: error, severity: "error" }));
      throw error;
    }
  };

  return useMutation(handleDelete);
};
