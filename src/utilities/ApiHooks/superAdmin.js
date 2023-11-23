import React, { useEffect, Fragment, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { backendURL } from "../common";
import { useMutation, useQuery } from "@tanstack/react-query";
import { parseJwt } from "../../components/ProtectedRoute/authVerify";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../../redux/snackBarSlice";

export const useFetchDataAdmin = () => {
  async function fetchData() {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${backendURL}/users`, {
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
    queryKey: ["teamData"],
    queryFn: fetchData,
    enabled: true,
    placeholderData: [],
  });
};

export const useFetchAdminLocation = () => {
  async function fetchData() {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${backendURL}/admins/allLocations `, {
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
    queryKey: ["locationData"],
    queryFn: fetchData,
    enabled: true,
    placeholderData: [],
  });
};
export const useFetchAllStaff = () => {
  async function fetchStaffData() {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${backendURL}/staffs/allStaff`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data && response.data.message === "All Staff") {
        return response.data.data ? response.data.data : [];
      } else {
        throw new Error("An error occurred while fetching staff data.");
      }
    } catch (error) {
      throw new Error("An error occurred while fetching staff data.");
    }
  }

  return useQuery({
    queryKey: ["staffData"],
    queryFn: fetchStaffData,
    enabled: true,
    placeholderData: [],
  });
};

export const useDeleteStaff = () => {
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
      throw error;
    }
  };

  return useMutation(handleDelete);
};

export const FetchId2 = ({ children }) => {
  const [newToken, setNewToken] = useState(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userID = searchParams.get("userID");
  const adminId = searchParams.get("adminID");
  let token = newToken || localStorage.getItem("token");

  useEffect(() => {
    if (adminId) {
      try {
        axios
          .post(
            `${backendURL}/admins/loginAdminId`,
            { id: adminId },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((resp) => {
            console.log({ resp });

            const newToken = resp.data.data.token;
            localStorage.setItem("superAdminToken", token);

            localStorage.setItem("token", newToken);
            setNewToken(newToken);
          });
      } catch (error) {
        console.error("An error occurred:", error);
      }
    } else if (userID) {
      try {
        axios
          .post(
            `${backendURL}/admins/loginAdminIdAgain`,
            { id: userID },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((resp) => {
            console.log({ resp });

            const newToken = resp.data.data.token;
            localStorage.removeItem("token");

            localStorage.setItem("token", newToken);
            setNewToken(newToken);
          });
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  }, [adminId, userID]);

  return <Fragment key={encodeURIComponent(token)}>{children}</Fragment>;
};
export const useCreateAdminsMembers = () => {
  const handleCreate = async (props) => {
    const token = localStorage.getItem("token");
    const decodedToken = parseJwt(token);

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

export const useUserStatus = () => {
  const handleEdit = async (status) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        `${backendURL}/users/status/${status?.id}`,
        {
          status: status.status,
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

export const useEditUser = () => {
  const dispatch = useDispatch();
  const handleEdit = async (updatedUser) => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      formData.append("image", updatedUser?.selectedImage);
      formData.append("name", updatedUser?.name);
      // formData.append("email", updatedUser?.email);
      if (updatedUser?.password !== "") {
        formData.append("password", updatedUser?.password);
      }

      const response = await axios.put(
        `${backendURL}/users/${updatedUser?.userid}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.code === 200) {
        dispatch(
          showSnackbar({
            message: "User status updated successfully",
            severity: "success",
          })
        );
        return response.data.data;
      } else {
        dispatch(
          showSnackbar({
            message: "An error occurred while updating the user data.",
            severity: "error",
          })
        );
        throw new Error("An error occurred while updating the user data.");
      }
    } catch (error) {
      dispatch(
        showSnackbar({
          message: "An error occurred while updating the user data.",
          severity: "error",
        })
      );
      throw new Error("An error occurred while updating the user data.");
    }
  };

  return useMutation(handleEdit);
};

export const useGiveAccessToStaff = () => {
  const handleUpdate = async (props) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `${backendURL}/admins/giveAccessToStaff/${props.staffId}`,
        {
          haveAccessTo: props.locationIds,
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
      console.log("Error", error);
    }
  };

  return useMutation(handleUpdate);
};
export const useDeleteUser = () => {
  const dispatch = useDispatch();
  const handleDelete = async (userData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${backendURL}/users/${userData?._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.code === 200) {
        dispatch(
          showSnackbar({
            message: "User deleted successfully",
            severity: "success",
          })
        );
        return response.data.data;
      } else {
        dispatch(
          showSnackbar({
            message: `Failed to delete user. Server response: ${response.data.message}`,
            severity: "error",
          })
        );
        throw new Error(
          `Failed to delete user. Server response: ${response.data.message}`
        );
      }
    } catch (error) {
      dispatch(
        showSnackbar({
          message: `An error occurred while trying to delete the user.`,
          severity: "error",
        })
      );
      throw new Error("An error occurred while trying to delete the user.");
    }
  };

  return useMutation(handleDelete);
};
