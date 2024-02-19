import { backendURL } from "../common";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { parseJwt } from "../../components/ProtectedRoute/authVerify";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../../redux/snackBarSlice";

export const useFetchDataSetting = () => {
  async function fetchData() {
    const token = localStorage.getItem("token");
    const decodedToken = parseJwt(token);
    try {
      const response = await axios.get(
        `${backendURL}/companies/${decodedToken?.company_id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

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
    enabled: false,
    placeholderData: {},
  });
};

export const useEditSetting = () => {
  const dispatch = useDispatch();
  const handleEditSetting = async (editedData) => {
    const token = localStorage.getItem("token");
    console.log(editedData, "editedData");
    const formData = new FormData();

    if (editedData.data?.image) {
      formData.append("image", editedData.data.image);
      delete editedData.data?.image;
    }
    if (
      editedData.data?.image === null ??
      editedData.data?.image === undefined
    ) {
      delete editedData.data?.image;
    }
    formData.append("data", JSON.stringify(editedData.data));

    try {
      const response = await axios.put(
        `${backendURL}/companies/${editedData?.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
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

  return useMutation(handleEditSetting);
};
