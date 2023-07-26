import { backendURL, createSlug } from "../common";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { parseJwt } from "../../components/ProtectedRoute/AuthVerify";

export const useFetchDataGlassTreatement = () => {
  async function fetchData() {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${backendURL}/glassTreatments`, {
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


export const useDeleteGlassTreatement = () => {
  const handleDelete = async (props) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${backendURL}/glassTreatments/${props.glassTreatementId}/${props.optionId}`, {
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
export const useDeleteGlassTreatementFull = () => {
  const handleDelete = async (props) => {
    console.log(props ,"full delete")
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${backendURL}/glassTreatments/${props}`, {
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

export const useCreateGlassTreatement = () => {
  const handleCreate = async (props) => {
    const token = localStorage.getItem("token");
    const slug = createSlug(props.hardwareLabel);
    const decodedToken = parseJwt(token);

    try {
      const response = await axios.post(
        `${backendURL}/glassTreatments/save`,
        {
          name: props.hardwareLabel,
          company_id: decodedToken?.company_id,
          thickness: "both",
          slug: slug,
          holesNeeded: props.thickness,
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

export const useEditGlassTreatement = () => {
  const handleEdit = async (props) => {

    const token = localStorage.getItem("token");
    console.log(props,"data edit")
    try {
      const response = await axios.put(
        `${backendURL}/glassTreatments/${props?.id}`,
        {
          ...(props.optionsData ? { options: props.optionsData } : {}),
          ...(props.glassTreatementData
            ? { name: props.glassTreatementData.name, image: props.glassTreatementData.image }
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
