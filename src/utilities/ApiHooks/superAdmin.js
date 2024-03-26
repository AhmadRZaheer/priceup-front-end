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
    enabled: false,
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
    enabled: false,
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
  const dispatch = useDispatch();
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${backendURL}/staffs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.code === 200) {
        dispatch(
          showSnackbar({ message: "Delete Successfully", severity: "error" })
        );
        return response.data.data;
      } else {
        dispatch(
          showSnackbar({
            message: "An error occurred while fetching the data",
            severity: "error",
          })
        );
        throw new Error("An error occurred while fetching the data.");
      }
    } catch (error) {
      dispatch(
        showSnackbar({
          message: `${error.response?.data?.message}`,
          severity: "error",
        })
      );
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
  const dispatch = useDispatch();
  const handleCreate = async (props) => {
    const token = localStorage.getItem("token");
    const decodedToken = parseJwt(token);
    const formData = new FormData();
    if (props.image) {
      formData.append("image", props.image);
    }
    formData.append("name", props.name);
    formData.append("company_id", decodedToken?.company_id);
    formData.append("email", props.email);
    formData.append("locationName", props.locationName);

    try {
      const response = await axios.post(`${backendURL}/users/save`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.code === 200) {
        dispatch(
          showSnackbar({
            message: "User created Successfully",
            severity: "success",
          })
        );
        return response.data.data;
      } else {
        dispatch(
          showSnackbar({
            message: "An error occurred while creating the data",
            severity: "error",
          })
        );
        throw new Error("An error occurred while creating the data.");
      }
    } catch (error) {
      dispatch(
        showSnackbar({
          message: `${error.response?.data?.message}`,
          severity: "error",
        })
      );
      throw new Error("An error occurred while creating the data.");
    }
  };

  return useMutation(handleCreate);
};
export const useCloneLocation = () => {
  const dispatch = useDispatch();
  const handleCreate = async (props) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    if (props.image) {
      formData.append("image", props.image);
    }
    formData.append("id", props.id);
    formData.append("name", props.name);
    formData.append("company_id", props?.company_id);
    formData.append("email", props.email);
    formData.append("locationName", props.locationName);

    try {
      const response = await axios.post(
        `${backendURL}/companies/clone`,
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
            message: "User created Successfully",
            severity: "success",
          })
        );
        return response.data.data;
      } else {
        dispatch(
          showSnackbar({
            message: "An error occurred while creating the data",
            severity: "error",
          })
        );
        throw new Error("An error occurred while creating the data.");
      }
    } catch (error) {
      dispatch(
        showSnackbar({
          message: `${error.response?.data?.message}`,
          severity: "error",
        })
      );
      throw new Error("An error occurred while creating the data.");
    }
  };

  return useMutation(handleCreate);
};
export const useUserStatus = () => {
  const dispatch = useDispatch();
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
        dispatch(
          showSnackbar({
            message: "Location Status Updated Successfully",
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
        throw new Error("An error occurred while updating the data.");
      }
    } catch (error) {
      dispatch(
        showSnackbar({
          message: `${error.response?.data?.message}`,
          severity: "error",
        })
      );
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
      if (updatedUser?.selectedImage) {
        formData.append("image", updatedUser?.selectedImage);
      }

      formData.append("name", updatedUser?.name);
      // formData.append("email", updatedUser?.email);

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
          message: `${error.response?.data?.message}`,
          severity: "error",
        })
      );
      throw new Error("An error occurred while updating the user data.");
    }
  };

  return useMutation(handleEdit);
};
export const useResetUserPassword = () => {
  const dispatch = useDispatch();
  const handleEdit = async (updatedUser) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `${backendURL}/users/updatePassword/${updatedUser?.userid}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.code === 200) {
        dispatch(
          showSnackbar({
            message: "New password is sent to user email successfully",
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
          message: `${error.response?.data?.message}`,
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

export const useDataCustomUser = () => {
  async function fetchData() {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${backendURL}/customUsers`, {
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
    queryKey: ["customUsers"],
    queryFn: fetchData,
    enabled: true,
    placeholderData: [],
  });
};
export const useDataCustomAdmins = () => {
  async function fetchData() {
    const token = localStorage.getItem("token");
    const decodedToken = parseJwt(token);
    try {
      const response = await axios.get(
        `${backendURL}/customUsers/haveAccess/${decodedToken.id}`,
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
    queryKey: ["customAdmin"],
    queryFn: fetchData,
    enabled: true,
    placeholderData: [],
  });
};
export const useCreateCustomUser = () => {
  const dispatch = useDispatch();
  const handleCreate = async (props) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    if (props.image) {
      formData.append("image", props.image);
    }
    formData.append("name", props.name);
    formData.append("email", props.email);

    try {
      const response = await axios.post(
        `${backendURL}/customUsers/save`,
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
          showSnackbar({ message: "Created Successfully", severity: "success" })
        );
        return response.data.data;
      } else {
        dispatch(
          showSnackbar({
            message: "An error occurred while creating the data.",
            severity: "error",
          })
        );
        throw new Error("An error occurred while creating the data.");
      }
    } catch (error) {
      dispatch(
        showSnackbar({
          message: `${error.response?.data?.message}`,
          severity: "error",
        })
      );
      throw new Error("An error occurred while creating the data.");
    }
  };

  return useMutation(handleCreate);
};

export const useCustomUserStatus = () => {
  const dispatch = useDispatch();
  const handleEdit = async (status) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        `${backendURL}/customUsers/${status?.id}`,
        {
          status: status?.status,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.code === 200) {
        dispatch(
          showSnackbar({
            message: "Admin status Updated successfully",
            severity: "success",
          })
        );
        return response.data.data;
      } else {
        dispatch(
          showSnackbar({
            message: "An error occurred while updating the data.",
            severity: "error",
          })
        );
        throw new Error("An error occurred while updating the data.");
      }
    } catch (error) {
      dispatch(
        showSnackbar({
          message: `${error.response?.data?.message}`,
          severity: "error",
        })
      );
      throw new Error("An error occurred while updating the data.");
    }
  };

  return useMutation(handleEdit);
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
            severity: "error",
          })
        );
        return response.data.data;
      } else {
        dispatch(
          showSnackbar({
            message: "An error occurred while fetching the data.",
            severity: "error",
          })
        );
        throw new Error("An error occurred while fetching the data.");
      }
    } catch (error) {
      dispatch(
        showSnackbar({
          message: `${error.response?.data?.message}`,
          severity: "error",
        })
      );
      throw error;
    }
  };

  return useMutation(handleDelete);
};

export const useDeleteCustomerUser = () => {
  const dispatch = useDispatch();
  const handleDelete = async (userData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${backendURL}/customUsers/${userData}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data.code === 200) {
        dispatch(
          showSnackbar({
            message: "Admin deleted successfully",
            severity: "error",
          })
        );
        return response.data.data;
      } else {
        dispatch(
          showSnackbar({
            message: "An error occurred while fetching the data.",
            severity: "error",
          })
        );
        throw new Error("An error occurred while fetching the data.");
      }
    } catch (error) {
      dispatch(
        showSnackbar({
          message: error,
          severity: "error",
        })
      );
      throw error;
    }
  };

  return useMutation(handleDelete);
};

export const useEditCustomUser = () => {
  const dispatch = useDispatch();
  const handleEdit = async (updatedUser) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    if (updatedUser?.image) {
      formData.append("image", updatedUser?.image);
    }

    formData.append("name", updatedUser?.name);
    try {
      const response = await axios.put(
        `${backendURL}/customUsers/${updatedUser?._id}`,
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
          showSnackbar({ message: "Updated Successfully", severity: "success" })
        );
        return response.data.data;
      } else {
        dispatch(
          showSnackbar({
            message: "An error occurred while creating the data",
            severity: "error",
          })
        );
        throw new Error("An error occurred while creating the data.");
      }
    } catch (error) {
      dispatch(showSnackbar({ message: error, severity: "error" }));
      throw new Error("An error occurred while creating the data.");
    }
  };

  return useMutation(handleEdit);
};

export const useResetPasswordCustomUser = () => {
  const dispatch = useDispatch();
  const handleEdit = async (updatedUser) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        `${backendURL}/customUsers/updatePassword/${updatedUser?._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.code === 200) {
        dispatch(
          showSnackbar({
            message: "New password is sent to Admin email successfully",
            severity: "success",
          })
        );
        return response.data.data;
      } else {
        dispatch(
          showSnackbar({
            message: "An error occurred while creating the data",
            severity: "error",
          })
        );
        throw new Error("An error occurred while creating the data.");
      }
    } catch (error) {
      dispatch(showSnackbar({ message: error, severity: "error" }));
      throw new Error("An error occurred while creating the data.");
    }
  };

  return useMutation(handleEdit);
};

export const useEditAccessCustomUser = () => {
  const dispatch = useDispatch();
  const handleEdit = async (updatedUser) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        `${backendURL}/customUsers/${updatedUser?._id}`,
        {
          ...(updatedUser?.locationsAccess
            ? {
                locationsAccess: updatedUser?.locationsAccess,
              }
            : {}),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // "Content-Type": "multipart/form-data", // Set the content type for form data
          },
        }
      );
      if (response.data.code === 200) {
        dispatch(
          showSnackbar({ message: "Updated Successfully", severity: "success" })
        );
        return response.data.data;
      } else {
        dispatch(
          showSnackbar({
            message: "An error occurred while creating the data",
            severity: "error",
          })
        );
        throw new Error("An error occurred while creating the data.");
      }
    } catch (error) {
      dispatch(showSnackbar({ message: error, severity: "error" }));
      throw new Error("An error occurred while creating the data.");
    }
  };

  return useMutation(handleEdit);
};
// export const useHaveAccsessCustomUser = () => {
//   async function fetchData({id}) {
//     const token = localStorage.getItem("token");
//     try {
//       const response = await axios.get(`${backendURL}/customUsers/haveAccess/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (response.data && response.data.code === 200) {
//         return response.data.data ? response.data.data : [];
//       } else {
//         throw new Error("An error occurred while fetching the data.");
//       }
//     } catch (error) {
//       throw new Error("An error occurred while fetching the data.");
//     }
//   }
//   return useQuery({
//     queryKey: ["customUsers"],
//     queryFn: fetchData,
//     enabled: true,
//     placeholderData: [],
//   });
// };
export const useFetchCustomAdminHaveAccessTo = () => {
  const handleGetData = async () => {
    try {
      const token = localStorage.getItem("token");
      const decodedToken = parseJwt(token);
      const response = await axios.get(
        `${backendURL}/customUsers/haveAccess/${decodedToken.id}`,
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
      throw error;
    }
  };

  return useMutation(handleGetData);
};
export const useSwitchLocationUser = () => {
  const handleSwitch = async (company_id) => {
    const token = localStorage.getItem("token");
    const decodedToken = parseJwt(token);
    try {
      const response = await axios.post(
        `${backendURL}/customUsers/switchLocation`,
        {
          userId: decodedToken?.id,
          companyId: company_id,
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

  return useMutation(handleSwitch);
};

export const useBackToCustomAdminLocations = () => {
  const handleSwitch = async () => {
    const token = localStorage.getItem("token");
    const decodedToken = parseJwt(token);
    try {
      const response = await axios.post(
        `${backendURL}/customUsers/switchBackToSuperView`,
        {
          userId: decodedToken?.id,
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

  return useMutation(handleSwitch);
};

export const useSwitchLocationSuperAdmin = () => {
  const handleSwitch = async (company_id) => {
    const token = localStorage.getItem("token");
    const decodedToken = parseJwt(token);
    try {
      const response = await axios.post(
        `${backendURL}/admins/switchLocation`,
        {
          userId: decodedToken?.id,
          companyId: company_id,
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

  return useMutation(handleSwitch);
};

export const useBackToSuperAdmin = () => {
  const handleSwitch = async (superAdminId) => {
    const token = localStorage.getItem("token");
    // const decodedToken = parseJwt(token);
    try {
      const response = await axios.post(
        `${backendURL}/admins/switchBackToSuperView`,
        {
          userId: superAdminId,
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

  return useMutation(handleSwitch);
};
