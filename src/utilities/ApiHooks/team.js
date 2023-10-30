import { backendURL } from "../common";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { parseJwt } from "../../components/ProtectedRoute/authVerify";

export const useFetchDataTeam = () => {
  async function fetchData() {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${backendURL}/staffs`, {
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
    queryKey: ["stafData"],
    queryFn: fetchData,
    enabled: true,
    placeholderData: [],
  });
};

export const useDeleteTeamMembers = () => {
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${backendURL}/staffs/${id}`, {
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

export const useCreateTeamMembers = () => {
  const handleCreate = async (props) => {
    const token = localStorage.getItem("token");
    const decodedToken = parseJwt(token);

    try {
      const response = await axios.post(
        `${backendURL}/staffs/save`,
        {
          name: props.name,
          company_id: decodedToken?.company_id,
          password: "",
          email: props.email,
          haveAccessTo: [decodedToken?.company_id],
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

export const useEditTeamMembers = () => {
  const handleEdit = async (editTeamMembers) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        `${backendURL}/staffs/${editTeamMembers?.id}`,
        {
          name: editTeamMembers?.teamData?.name,
          email: editTeamMembers?.teamData?.email,
          password: editTeamMembers?.teamData?.password,
          image: editTeamMembers?.teamData?.image,
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

export const useFetchStaffHaveAccessTo = () => {
  const token = localStorage.getItem("token");
  const decodedToken = parseJwt(token);
  async function fetchData() {
    try {
      const response = await axios.get(
        `${backendURL}/staffs/haveAccess/${decodedToken?.id}`,
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
  return useQuery({
    queryKey: ["staffHaveAccessTo", decodedToken?.id],
    queryFn: fetchData,
    enabled: Boolean(decodedToken?.id),
    placeholderData: [],
    cacheTime: 60_000,
  });
};

export const useSwitchStaffLocation = () => {
  const switchLocation = async (props) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `${backendURL}/staffs/switchLocation`,
        {
          staffId: props.staffId,
          companyId: props.companyId,
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

  return useMutation(switchLocation);
};
