import { backendURL, createSlug } from "../common";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { parseJwt } from "../../components/ProtectedRoute/authVerify";

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
    enabled: true,
    placeholderData: [],
  });
};

export const useDeleteGlassType = () => {
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
export const useDeleteGlassTypeFull = () => {
  const handleDelete = async (props) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${backendURL}/glassTypes/${props}`, {
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

export const useCreateGlassType = () => {
  const handleCreate = async (props) => {
    const token = localStorage.getItem("token");
    const slug = createSlug(props.name);
    const decodedToken = parseJwt(token);

    try {
      const response = await axios.post(
        `${backendURL}/glassTypes/save`,
        {
          name: props.name,
          company_id: decodedToken?.company_id,
          slug: slug,
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

export const useEditGlassType = () => {
  const handleEdit = async (props) => {
    const token = localStorage.getItem("token");
    try {
      const updatedData = {
        ...(props.optionsData ? { options: props.optionsData } : {}),
        ...(props.glassTypeData
          ? {
              name: props.glassTypeData.name,
              // image: props.glassTypeData.image,
            }
          : {}),
      };
      const formData = new FormData();
      if (props?.glassTypeData?.image) {
        formData.append("image", props.glassTypeData.image);
      }
      formData.append("jsonData", JSON.stringify(updatedData));
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
