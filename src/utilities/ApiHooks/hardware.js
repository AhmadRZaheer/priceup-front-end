import { backendURL, createSlug } from "../common";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { parseJwt } from "../../components/ProtectedRoute/authVerify";
import { useEffect, useState } from "react";

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
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${backendURL}/hardwares/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.code === 200) {
        return response.data.data;
      } else {
        throw new Error("An error occurred while fetching the data.");
      }
    } catch (error) {
      console.error("Delete failed", error);
      throw error;
    }
  };

  return useMutation(handleDelete);
};

export const useCreateHardware = () => {
  const handleCreate = async (props) => {
    const token = localStorage.getItem("token");
    const slug = createSlug(props.name);
    const decodedToken = parseJwt(token);

    try {
      const response = await axios.post(
        `${backendURL}/hardwares/save`,
        {
          name: props.name,
          slug: slug,
          hardware_category_slug: props.hardware_category_slug,
          company_id: decodedToken?.company_id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.code === 200) {
        return response.data.data;
      } else {
        throw new Error("An error occurred while creating the data.");
      }
    } catch (error) {
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
export const useEditHardware = () => {
  const handleEdit = async (props) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        `${backendURL}/hardwares/${props.id}`,
        {
          ...(props.finishesData ? { finishes: props.finishesData } : {}),
          ...(props.hardwareData
            ? { name: props.hardwareData.name, image: props.hardwareData.image }
            : {}),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data.code === 200) {
        return response.data.data;
      } else {
        throw new Error("An error occurred while updating the data.");
      }
    } catch (error) {
      throw new Error("An error occurred while updating the data.");
    }
  };
  return useMutation(handleEdit);
};

export const useDeleteHardwareFinish = () => {
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
        return response.data.data;
      } else {
        throw new Error("An error occurred while fetching the data.");
      }
    } catch (error) {
      console.error("Delete failed", error);
      throw error;
    }
  };

  return useMutation(handleDelete);
};
