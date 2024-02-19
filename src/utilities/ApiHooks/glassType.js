import { backendURL, createSlug } from "../common";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { parseJwt } from "../../components/ProtectedRoute/authVerify";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../../redux/snackBarSlice";

export const useFetchDataGlassType = () => {
  async function fetchData() {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${backendURL}/glassTypes`, {
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
    queryKey: ["glassTypeData"],
    queryFn: fetchData,
    enabled: false,
    placeholderData: [],
  });
};

export const useDeleteGlassType = () => {
  const dispatch = useDispatch();
  const handleDelete = async (props) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${backendURL}/glassTypes/${props.glassTypeId}/${props.optionId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data.code === 200) {
        dispatch(
          showSnackbar({ message: "Deleted Successfully", severity: "error" })
        );
        return response.data.data;
      } else {
        showSnackbar({
          message: "An error occurred while fetching the data",
          severity: "error",
        });
        throw new Error("An error occurred while fetching the data.");
      }
    } catch (error) {
      showSnackbar({ message: `${error.response?.data?.message}`, severity: "error" });
    }
  };

  return useMutation(handleDelete);
};
export const useDeleteGlassTypeFull = () => {
  const dispatch = useDispatch();
  const handleDelete = async (props) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${backendURL}/glassTypes/${props}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.code === 200) {
        dispatch(
          showSnackbar({ message: "Deleted Successfully", severity: "error" })
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

export const useCreateGlassType = () => {
  const dispatch = useDispatch();
  const handleCreate = async (props) => {
    const token = localStorage.getItem("token");
    const slug = createSlug(props.name);
    const decodedToken = parseJwt(token);
    const formData = new FormData();
    if (props.image) {
      formData.append("image", props.image);
    }
    formData.append("name", props.name);
    formData.append("company_id", decodedToken?.company_id);
    formData.append("slug", slug);

    try {
      const response = await axios.post(
        `${backendURL}/glassTypes/save`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.code === 200) {
        dispatch(
          showSnackbar({ message: "Created Successfuly", severity: "success" })
        );
        return response.data.data;
      } else {
        dispatch(
          showSnackbar({
            message: "An error occurred while creating the data",
            severity: "error",
          })
        );
        throw new Error("An error occurred while creating the data.");
      }
    } catch (error) {
      dispatch(
        showSnackbar({
          message: `${error.response?.data?.message}`,
          severity: "error",
        })
      );
      throw new Error(`${error.response?.data?.message}`);
    }
  };

  return useMutation(handleCreate);
};

export const useEditGlassType = () => {
  const dispatch = useDispatch();
  const handleEdit = async (props) => {
    const token = localStorage.getItem("token");
    try {
      const formData = new FormData();
      const slug = createSlug(props.glassTypeData.name);
      // Append image field
      if (props?.glassTypeData?.image) {
        formData.append("image", props.glassTypeData.image);
      }

      if (props.glassTypeData) {
        formData.append("name", props.glassTypeData.name);
        formData.append("slug", slug);
      }
      const response = await axios.put(
        `${backendURL}/glassTypes/${props?.id}`,
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
      dispatch(showSnackbar({ message: `${error.response?.data?.message}`, severity: "error" }));
      throw new Error("An error occurred while updating the data.");
    }
  };

  return useMutation(handleEdit);
};
export const useEditFullGlassType = () => {
  const dispatch = useDispatch();
  const handleEdit = async (props) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `${backendURL}/glassTypes/${props?.id}`,
        {
          options: props.optionsData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
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
      dispatch(showSnackbar({ message: `${error.response?.data?.message}`, severity: "error" }));
      throw new Error("An error occurred while updating the data.");
    }
  };

  return useMutation(handleEdit);
};
