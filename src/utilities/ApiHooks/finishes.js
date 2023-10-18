import { backendURL, createSlug } from "../common";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { parseJwt } from "../../components/ProtectedRoute/authVerify";

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
    enabled: true,
    placeholderData: [],
  });
};

export const useDeleteFinishes = () => {
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${backendURL}/finishes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.code === 200) {
        return response.data.data;
      } else {
        throw new Error("An error occurred while fetching the data.");
      }
    } catch (error) {
      throw error;
    }
  };

  return useMutation(handleDelete);
};

export const useCreateFinish = () => {
  const handleCreate = async (props) => {
    const token = localStorage.getItem("token");
    const slug = createSlug(props.hardwareLabel);
    const decodedToken = parseJwt(token);

    const formData = new FormData();
    formData.append('name', props.hardwareLabel);
    formData.append('image', props.image);
    formData.append('company_id', decodedToken?.company_id);
    formData.append('thickness', 'both');
    formData.append('slug', slug);
    formData.append('holesNeeded', props.thickness);

    try {
      const response = await axios.post(
        `${backendURL}/finishes/save`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data', // Set the content type for form data
          },
        }
      );

      if (response.data.code === 200) {
        return response.data.data;
      } else {
        throw new Error("An error occurred while creating the data.");
      }
    } catch (error) {
       console.log("Error",error)
    }
  };

  return useMutation(handleCreate);
};

export const useEditFinish = () => {
  const handleEdit = async (updatedHardware) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();

    formData.append('name', updatedHardware?.hardwareLabel);
    formData.append('image', updatedHardware?.image);
    formData.append('holesNeeded', updatedHardware?.thickness);

    try {
      const response = await axios.put(
        `${backendURL}/finishes/${updatedHardware?.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data', // Set the content type for form data
          },
        }
      );

      if (response.data.code === 200) {
        return response.data.data;
      } else {
        throw new Error("An error occurred while updating the data.");
      }
    } catch (error) {
      console.log("Error",error)
    }
  };

  return useMutation(handleEdit);
};