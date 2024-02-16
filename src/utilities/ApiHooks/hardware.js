import { backendURL, createSlug } from "../common";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { parseJwt } from "../../components/ProtectedRoute/authVerify";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../../redux/snackBarSlice";

export const useFetchDatahardwareCategory = () => {
  async function fetchData() {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${backendURL}/hardwareCategory`, {
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
    queryKey: ["hardwareCategoryData"],
    queryFn: fetchData,
    enabled: true,
    placeholderData: [],
  });
};

export const useFetchDatahardware = (type) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(true);
  async function fetchData() {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${backendURL}/hardwares/category/${type}`,
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
  const refetch = () => {
    setIsLoading(true);
    setIsFetching(true);
    fetchData()
      .then((fetchedData) => {
        setData(fetchedData);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
        setIsFetching(false);
      });
  };

  useEffect(() => {
    setIsFetching(true);
    fetchData()
      .then((fetchedData) => {
        setData(fetchedData);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
        setIsFetching(false);
      });
  }, [type]);
  return { data, isLoading, isFetching, refetch };
};

export const useDeleteHardwares = () => {
  const dispatch = useDispatch();
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${backendURL}/hardwares/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.code === 200) {
        dispatch(
          showSnackbar({ message: "Deleted Successfuly", severity: "error" })
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

export const useCreateHardware = () => {
  const dispatch = useDispatch();
  const handleCreate = async (props) => {
    console.log(props, "props");
    const token = localStorage.getItem("token");
    const slug = createSlug(props.name);
    const decodedToken = parseJwt(token);
    const formData = new FormData();
    if (props.image) {
      formData.append("image", props.image);
    }

    formData.append("name", props.name);
    formData.append("slug", slug);
    formData.append("hardware_category_slug", props.hardware_category_slug);
    formData.append("company_id", decodedToken?.company_id);
    try {
      const response = await axios.post(
        `${backendURL}/hardwares/save`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Set content type to multipart/form-data
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
      dispatch(showSnackbar({ message: error, severity: "error" }));
      throw new Error("An error occurred while creating the data.");
    }
  };

  return useMutation(handleCreate);
};
// export const useEditHardware = () => {
//   const handleEdit = async (props) => {
//     const token = localStorage.getItem("token");
//     try {
//       const updatedData = {
//         ...(props.optionsData ? { options: props.optionsData } : {}),
//         ...(props.glassTypeData
//           ? {
//               name: props.glassTypeData.name,
//               // image: props.glassTypeData.image,
//             }
//           : {}),
//       };
//       const formData = new FormData();
//       if (props?.glassTypeData?.image) {
//         formData.append("image", props.glassTypeData.image);
//       }
//       formData.append("jsonData", JSON.stringify(updatedData));
//       const response = await axios.put(
//         `${backendURL}/glassTypes/${props?.id}`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
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
export const useEditFullHardware = () => {
  const dispatch = useDispatch();
  const handleEdit = async (props) => {
    const token = localStorage.getItem("token");
    console.log(props.DataFinishes.id, "props");
    try {
      const response = await axios.put(
        `${backendURL}/hardwares/${props.DataFinishes.id}`,
        {
          ...(props.DataFinishes.finishesData
            ? { finishes: props.DataFinishes.finishesData }
            : {}),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data.code === 200) {
        dispatch(
          showSnackbar({
            message: "Hardware Updated Successfully",
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
          message: error,
          severity: "error",
        })
      );
      throw new Error("An error occurred while updating the data.");
    }
  };
  return useMutation(handleEdit);
};

export const useEditHardware = () => {
  const dispatch = useDispatch();
  const handleEdit = async (props) => {
    const token = localStorage.getItem("token");
    console.log(props, "props");
    console.log(props.hardwareData.image, "props.id");
    const slug = createSlug(props.hardwareData.name);
    try {
      const formData = new FormData();
      formData.append("name", props.hardwareData.name);
      formData.append("slug", slug);
      if (props.hardwareData.image) {
        formData.append("image", props.hardwareData.image);
      }

      const response = await axios.put(
        `${backendURL}/hardwares/${props.id}`,
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
      dispatch(showSnackbar({ message: error, severity: "error" }));
      throw new Error("An error occurred while updating the data.");
    }
  };

  return useMutation(handleEdit);
};

export const useDeleteHardwareFinish = () => {
  const dispatch = useDispatch();
  const handleDelete = async (props) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${backendURL}/hardwares/${props.hardwareId}/${props.finishId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data.code === 200) {
        dispatch(
          showSnackbar({
            message: "Finish Type Deleted Successfully",
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
      dispatch(showSnackbar({ message: error, severity: "error" }));
      throw error;
    }
  };

  return useMutation(handleDelete);
};
