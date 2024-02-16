import { backendURL } from "../common";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { parseJwt } from "../../components/ProtectedRoute/authVerify";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../../redux/snackBarSlice";

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
    enabled: false,
    placeholderData: [],
  });
};

export const useDeleteTeamMembers = () => {
  const dispatch = useDispatch();
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${backendURL}/staffs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.code === 200) {
        dispatch(
          showSnackbar({ message: "Deleted Successfully", severity: "error" })
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
      dispatch(showSnackbar({ message: `${error.response?.data?.message}`, severity: "error" }));
      throw error;
    }
  };

  return useMutation(handleDelete);
};

export const useCreateTeamMembers = () => {
  const dispatch = useDispatch();
  const handleCreate = async (props) => {
    console.log(props, "props.team");
    const token = localStorage.getItem("token");
    const decodedToken = parseJwt(token);
    const formData = new FormData();

    if (
      props.image &&
      (props.image instanceof File || props.image instanceof Blob)
    ) {
      formData.append("image", props.image);
    }

    formData.append("name", props.name);
    formData.append("company_id", decodedToken?.company_id);
    formData.append("password", "");
    formData.append("email", props.email);
    formData.append("haveAccessTo", JSON.stringify([decodedToken?.company_id]));
    try {
      const response = await axios.post(
        `${backendURL}/staffs/save`,
        formData,
        // {
        //   name: props.name,
        //   image: formData.get("image"),
        //   company_id: decodedToken?.company_id,
        //   password: "",
        //   email: props.email,
        //   haveAccessTo: [decodedToken?.company_id],
        // },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Set the content type for form data
          },
        }
      );

      if (response.data.code === 200) {
        dispatch(
          showSnackbar({
            message: " Team Member Created Successfully",
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

export const useEditTeamMembers = () => {
  const dispatch = useDispatch();
  const handleEdit = async (editTeamMembers) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();

    if (
      editTeamMembers?.teamData?.image &&
      (editTeamMembers?.teamData?.image instanceof File ||
        editTeamMembers?.teamData?.image instanceof Blob)
    ) {
      formData.append("image", editTeamMembers?.teamData?.image);
    }
    if (editTeamMembers?.teamData?.name) {
      formData.append("name", editTeamMembers?.teamData?.name);
    }

    if (editTeamMembers?.status !== undefined) {
      formData.append("status", editTeamMembers?.status);
    }

    // const updatedData = {
    //   ...(editTeamMembers?.teamData ? formData : {}),
    //   status: editTeamMembers?.status,
    // };

    try {
      const response = await axios.put(
        `${backendURL}/staffs/${editTeamMembers?.id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
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
            message: "An error occurred while updating the data",
            severity: "success",
          })
        );
        throw new Error("An error occurred while updating the data.");
      }
    } catch (error) {
      dispatch(
        showSnackbar({
          message: `${error.response?.data?.message}`,
          severity: "success",
        })
      );
      throw new Error("An error occurred while updating the data.");
    }
  };

  return useMutation(handleEdit);
};
//new hook for update location
export const useAddLocation = () => {
  const dispatch = useDispatch();
  const handleEdit = async (editTeamMembers) => {
    console.log(editTeamMembers?.data, "testing data");
    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        `${backendURL}/staffs/${editTeamMembers?.locId}`,
        {
          haveAccessTo: editTeamMembers?.data,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.code === 200) {
        dispatch(
          showSnackbar({
            message: "Updated Successfully",
            severity: "success",
          })
        );
        return response.data.data;
      } else {
        dispatch(
          showSnackbar({
            message: "An error occurred while updating the data",
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
