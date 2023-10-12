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
    const formData = new FormData();
    formData.append('id', props.id);

    if (props.glassTypeData) {
      // Append the fields of glassTypeData individually
      formData.append('name', props.glassTypeData.name);
      formData.append('image', props.glassTypeData.image);
    }

    const requestData = {
      ...(props.optionsData ? { options: props.optionsData } : {}),
    };

    const response = await axios.put(
      `${backendURL}/glassTypes/${props.id}`,
      formData, // Send glassTypeData as FormData
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        params: requestData, // Send optionsData as request parameters
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
