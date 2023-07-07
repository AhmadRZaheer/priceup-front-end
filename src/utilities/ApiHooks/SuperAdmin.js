import { useState, useEffect } from "react";
import { backendURL, createSlug } from "../common";
import { Mutation, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { parseJwt } from "../../components/ProtectedRoute/AuthVerify";

export const useFetchDataAdmin = () => {
  async function fetchData() {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${backendURL}/users`, {
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



export const useCreateAdminsMembers = () => {
  const handleCreate = async (props) => {
    console.log(props, "hook props in create hook");
    const token = localStorage.getItem("token");
    const decodedToken = parseJwt(token);
    console.log(decodedToken, "parseJwt");

    try {
      const response = await axios.post(
        `${backendURL}/users/save`,
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


