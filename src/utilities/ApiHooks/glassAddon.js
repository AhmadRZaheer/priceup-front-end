import { backendURL, createSlug } from "../common";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { parseJwt } from "../../components/ProtectedRoute/authVerify";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../../redux/snackBarSlice";

export const useFetchGlassAddons = () => {
  async function fetchData() {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${backendURL}/glassAddons`, {
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
    queryKey: ["glassTreatmentsData"],
    queryFn: fetchData,
    enabled: false,
    placeholderData: [],
  });
};

export const useDeleteGlassAddonOption = () => {
  const dispatch = useDispatch();
  const handleDelete = async (props) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${backendURL}/glassAddons/${props.glassAddonId}/${props.optionId}`,
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
        dispatch(
          showSnackbar({
            message: "An error occurred while fetching the data",
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
      console.error("Delete failed", error);
      throw `${error.response?.data?.message}`;
    }
  };

  return useMutation(handleDelete);
};
export const useDeleteGlassAddon = () => {
  const dispatch = useDispatch();
  const handleDelete = async (props) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${backendURL}/glassAddons/${props}`,
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
        dispatch(
          showSnackbar({
            message: "An error occurred while fetching the data",
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
      throw `${error.response?.data?.message}`;
    }
  };

  return useMutation(handleDelete);
};

export const useCreateGlassAddon = () => {
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
        `${backendURL}/glassAddons/save`,
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
          showSnackbar({ message: "Created Successfully", severity: "success" })
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
      throw new Error("An error occurred while creating the data.");
    }
  };

  return useMutation(handleCreate);
};

// export const useEditGlassAddon = () => {
//   const handleEdit = async (props) => {
//     const token = localStorage.getItem("token");
//     try {
//       const response = await axios.put(
//         `${backendURL}/glassAddons/${props?.id}`,
//         {
//           ...(props.optionsData ? { options: props.optionsData } : {}),
//           ...(props.glassAddonData
//             ? {
//                 name: props.glassAddonData.name,
//                 image: props.glassAddonData.image,
//               }
//             : {}),
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       if (response.data.code === 200) {
//         return response.data.data;
//       } else {
//         throw new Error("An error occurred while updating the data.");
//       }
//     } catch (error) {
//       throw new Error("An error occurred while updating the data.");
//     }
//   };

//   return useMutation(handleEdit);
// };
// export const useEditGlassAddon = () => {
//   const dispatch = useDispatch();
//   const handleEdit = async (props) => {
//     const token = localStorage.getItem("token");

//     try {
//       console.log(props, "props");
//       const options = {};
//       const formData = new FormData();
//       console.log(props.optionsData, "props.optionsData");
//       // Check if optionsData exists before appending to FormData
//       if (props.optionsData.length >= 0) {
//         options.options = props.optionsData;
//       }

//       // Check if glassAddonData exists before appending to FormData
//       if (props.glassAddonData) {
//         formData.append("name", props.glassAddonData.name);

//         // Check if image exists before appending to FormData
//         if (props.glassAddonData.image) {
//           formData.append("image", props.glassAddonData.image);
//         }
//       }
//       const dataToSend = formData.has("name") ? formData : options;
//       const response = await axios.put(
//         `${backendURL}/glassAddons/${props?.id}`,
//         dataToSend,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data", // Set content type for FormData
//           },
//         }
//       );

//       if (response.data.code === 200) {
//         dispatch(
//           showSnackbar({ message: "Updated Successfully", severity: "error" })
//         );
//         return response.data.data;
//       } else {
//         dispatch(
//           showSnackbar({
//             message: "An error occurred while updating the data",
//             severity: "error",
//           })
//         );
//         throw new Error("An error occurred while updating the data.");
//       }
//     } catch (error) {
//       dispatch(showSnackbar({ message: error, severity: "error" }));
//       throw new Error("An error occurred while updating the data.");
//     }
//   };

//   return useMutation(handleEdit);
// };
export const useEditGlassAddon = () => {
  const dispatch = useDispatch();
  const handleEdit = async (props) => {
    const token = localStorage.getItem("token");
    const slug = createSlug(props.name);
    try {
      const options = {};
      const formData = new FormData();

      // Check if optionsData is defined and is an array
      if (Array.isArray(props.optionsData) && props.optionsData.length > 0) {
        options.options = props.optionsData;
      }

      // Check if glassAddonData exists before appending to FormData
      if (props.glassAddonData) {
        formData.append("name", props.glassAddonData.name);
        formData.append("slug", slug);

        if (props.glassAddonData.image) {
          formData.append("image", props.glassAddonData.image);
        }
      }
      const dataToSend = formData.has("name") ? formData : options;
      const response = await axios.put(
        `${backendURL}/glassAddons/${props?.id}`,
        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Set content type for FormData
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

  return useMutation(handleEdit);
};
export const useEditFullGlassAddon = () => {
  const dispatch = useDispatch();
  const handleEdit = async (props) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `${backendURL}/glassAddons/${props?.id}`,
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
