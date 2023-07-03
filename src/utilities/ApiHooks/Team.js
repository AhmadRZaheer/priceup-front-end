import { useState, useEffect } from "react";
import { backendURL, createSlug } from "../common";
import { Mutation, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { parseJwt } from "../../components/ProtectedRoute/AuthVerify";

export const useFetchDataTeam = () => {
  async function fetchData() {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${backendURL}/staffs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response, "response");
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
    queryKey: ["teamData"],
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
      // console.log(response, "delete response");
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
    console.log(props, "hook props in create hook");
    const token = localStorage.getItem("token");
    const decodedToken = parseJwt(token);
    console.log(decodedToken, "parseJwt");

    try {
      const response = await axios.post(
        `${backendURL}/staffs/save`,
        {
          name: props.name,

          company_id: decodedToken?.company_id,
          password: props.password,
          email: props.email,
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
    console.log(editTeamMembers, "editTeamMembers in hooks");

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
