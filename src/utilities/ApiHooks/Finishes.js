import { useState, useEffect } from "react";
import { backendURL, createSlug } from "../common";
import { Mutation, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { parseJwt } from "../../components/ProtectedRoute/AuthVerify";

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
      console.error("Delete failed", error);
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

    try {
      const response = await axios.post(
        `${backendURL}/finishes/save`,
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

export const useEditFinish = () => {
  const handleEdit = async (updatedHardware) => {

    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        `${backendURL}/finishes/${updatedHardware?.id}`,
        {
          name: updatedHardware?.hardwareLabel,
          holesNeeded: updatedHardware?.thickness,
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
