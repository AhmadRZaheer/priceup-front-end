import { showSnackbar } from "@/redux/snackBarSlice";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch } from "react-redux";

export const useFetchAllDocuments = (apiRoute) => {
  async function fetch() {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(apiRoute, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data && response.data.code === 200) {
        return response.data.data ? response.data.data : [];
      } else {
        throw new Error("An error occurred while fetching records.");
      }
    } catch (error) {
      throw new Error("An error occurred while fetching records.");
    }
  }
  return useQuery({
    queryKey: [`key-${apiRoute}`],
    queryFn: fetch,
    enabled: false,
    placeholderData: [],
  });
};

export const useFetchSingleDocument = (apiRoute) => {
  async function fetch() {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(apiRoute, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data && response.data.code === 200) {
        return response.data.data ? response.data.data : {};
      } else {
        throw new Error("An error occurred while fetching records.");
      }
    } catch (error) {
      throw new Error("An error occurred while fetching records.");
    }
  }
  return useQuery({
    queryKey: [`key-${apiRoute}`],
    queryFn: fetch,
    enabled: false,
    // placeholderData: {},
  });
};

export const useDeleteDocumentProp = () => {
  const dispatch = useDispatch();
  const handleDelete = async (props) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(props.apiRoute, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.code === 200) {
        dispatch(
          showSnackbar({ message: "Deleted Successfully", severity: "error" })
        );
        return response.data.data;
      } else {
        showSnackbar({
          message: "An error occurred while deleting record",
          severity: "error",
        });
        throw new Error("An error occurred while deleting record.");
      }
    } catch (error) {
      showSnackbar({
        message: `${error.response?.data?.message}`,
        severity: "error",
      });
    }
  };

  return useMutation(handleDelete);
};
//   ${routePrefix}/${props.glassTypeId}/${props.optionId}

export const useDeleteDocument = () => {
  const dispatch = useDispatch();
  const handleDelete = async (props) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(props.apiRoute, {
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
            message: "An error occurred while deleting record",
            severity: "error",
          })
        );
        throw new Error("An error occurred while deleting record.");
      }
    } catch (error) {
      dispatch(
        showSnackbar({
          message: `${error.response?.data?.message}`,
          severity: "error",
        })
      );
      throw `${error.response?.data?.message}`;
    }
  };

  return useMutation(handleDelete);
};
//   ${routePrefix}/${props}

export const useCreateDocument = () => { 
  const dispatch = useDispatch();
  const handleCreate = async (props) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(props.apiRoute, props.data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.code === 200) {
        dispatch(
          showSnackbar({ message: "Created Successfuly", severity: "success" })
        );
        return response.data.data;
      } else {
        dispatch(
          showSnackbar({
            message: "An error occurred while creating record",
            severity: "error",
          })
        );
        throw new Error("An error occurred while creating record.");
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

export const useEditDocument = () => {
  const dispatch = useDispatch();
  const handleEdit = async (props) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(props.apiRoute, props.data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.code === 200) {
        dispatch(
          showSnackbar({ message: "Updated Successfully", severity: "success" })
        );
        return response.data.data;
      } else {
        dispatch(
          showSnackbar({
            message: "An error occurred while updating record",
            severity: "error",
          })
        );
        throw new Error("An error occurred while updating record.");
      }
    } catch (error) {
      dispatch(
        showSnackbar({
          message: `${error.response?.data?.message}`,
          severity: "error",
        })
      );
      throw new Error("An error occurred while updating record.");
    }
  };

  return useMutation(handleEdit);
};
