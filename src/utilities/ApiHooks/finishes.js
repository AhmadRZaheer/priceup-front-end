import { backendURL, createSlug } from "../common";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { parseJwt } from "../../components/ProtectedRoute/authVerify";
import { showSnackbar } from "../../redux/snackBarSlice";
import { useDispatch } from "react-redux";

export const useFetchDataFinishes = () => {
  async function fetchData() {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${backendURL}/finishes`, {
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
    queryKey: ["finishesData"],
    queryFn: fetchData,
    enabled: false,
    placeholderData: [],
  });
};

export const useDeleteFinishes = () => {
  const dispatch = useDispatch();
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${backendURL}/finishes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.code === 200) {
        dispatch(
          showSnackbar({
            message: "Finishes Deleted Successfully",
            severity: "error",
          })
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
      dispatch(showSnackbar({ message: `${error.response?.data?.message}`, severity: "error" }));
      throw `${error.response?.data?.message}`;
    }
  };

  return useMutation(handleDelete);
};

export const useCreateFinish = () => {
  const dispatch = useDispatch();
  const handleCreate = async (props) => {
    const token = localStorage.getItem("token");
    const slug = createSlug(props.hardwareLabel);
    const decodedToken = parseJwt(token);

    const formData = new FormData();
    formData.append("name", props.hardwareLabel);
    formData.append("image", props.image);
    formData.append("company_id", decodedToken?.company_id);
    formData.append("thickness", "both");
    formData.append("slug", slug);
    formData.append("holesNeeded", props.thickness);

    try {
      const response = await axios.post(
        `${backendURL}/finishes/save`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Set the content type for form data
          },
        }
      );

      if (response.data.code === 200) {
        dispatch(
          showSnackbar({
            message: "Finishes Created Succesccfully",
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
      }
    } catch (error) {
      dispatch(
        showSnackbar({
          message: `${error.response?.data?.message}`,
          severity: "error",
        })
      );
    }
  };

  return useMutation(handleCreate);
};

export const useEditFinish = () => {
  const dispatch = useDispatch();
  const handleEdit = async (updatedHardware) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    const slug = createSlug(updatedHardware?.hardwareLabel);

    formData.append("name", updatedHardware?.hardwareLabel);
    formData.append("slug", slug);
    formData.append("image", updatedHardware?.image);
    formData.append("holesNeeded", updatedHardware?.thickness);
    console.log(formData,'formData finishes');
    try {
      const response = await axios.put(
        `${backendURL}/finishes/${updatedHardware?.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Set the content type for form data
          },
        }
      );

      if (response.data.code === 200) {
        dispatch(
          showSnackbar({
            message: "Finishes Updated Successfully",
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
      dispatch(showSnackbar({ message: `${error.response?.data?.message}`, severity: "error" }));
    }
  };

  return useMutation(handleEdit);
};
