import { backendURL, createSlug } from "../common";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { parseJwt } from "../../components/ProtectedRoute/authVerify";

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
    enabled: true,
    placeholderData: [],
  });
};

export const useDeleteGlassAddonOption = () => {
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
export const useDeleteGlassAddon = () => {
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

export const useCreateGlassAddon = () => {
  const handleCreate = async (props) => {
    const token = localStorage.getItem("token");
    const slug = createSlug(props.name);
    const decodedToken = parseJwt(token);

    try {
      const response = await axios.post(
        `${backendURL}/glassAddons/save`,
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

export const useEditGlassAddon = () => {
  const handleEdit = async (props) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `${backendURL}/glassAddons/${props?.id}`,
        {
          ...(props.optionsData ? { options: props.optionsData } : {}),
          ...(props.glassAddonData
            ? {
                name: props.glassAddonData.name,
                image: props.glassAddonData.image,
              }
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
