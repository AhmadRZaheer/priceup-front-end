import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import * as yup from "yup";
import { TextField } from "@material-ui/core";
import {
  useCreateEstimates
} from "@/utilities/ApiHooks/estimate";
import { useDispatch, useSelector } from "react-redux";
import {
  getTotal,
  selectedItem,
} from "@/redux/estimateCalculations";
import { useNavigate } from "react-router-dom";
import { CircularProgress, InputAdornment } from "@mui/material";
import { useFetchDataCustomer } from "@/utilities/ApiHooks/customer";
import { useState } from "react";
import DefaultImage from "@/components/ui-components/defaultImage";
import { useEffect } from "react";
import { Close } from "@mui/icons-material";
import { setEstimatesListRefetch } from "@/redux/refetch";
import { getPricing } from "@/redux/mirrorsEstimateSlice";

const validationSchema = yup.object({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  phone: yup.string().matches(/^[0-9]+$/, "Phone must be numeric"),
});

export const ClientDetailsModel = ({ open, handleCancel, estimateConfig, estimateCategory }) => {
  const {
    mutate,
    isError: ErrorForAdd,
    isSuccess: CreatedSuccessfully,
  } = useCreateEstimates();

  const estimatesTotal = useSelector(getTotal);
  const estimatesLayout = useSelector(selectedItem);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: customerData, refetch, isLoading } = useFetchDataCustomer();
  const [selectedUser, setSelectedUser] = useState();
  const [Tabs, setTabs] = useState("create");
  const pricing = useSelector(getPricing);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      label: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const filteredValues = Object.fromEntries(
        Object.entries(values).filter(([key]) => key !== "label")
      );
      mutate({
        customerData: filteredValues,
        estimateData: {
          ...estimateConfig,
          layout_id: estimatesLayout?._id || null,
          label: values.label,
        },
        category: estimateCategory,
        cost: Number(pricing.total)
      });

    },
  });

  useEffect(() => {
    if (CreatedSuccessfully) {
      dispatch(setEstimatesListRefetch());
      handleCancel();
      navigate("/estimates");
    } else if (ErrorForAdd) {
      const errorMessage = ErrorForAdd.message || "An error occurred";
    }
  }, [CreatedSuccessfully, ErrorForAdd]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCustomer, setFilteredCustomer] = useState(customerData);

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);

    if (value === "") {
      setFilteredCustomer(customerData);
    } else {
      const filteredData = customerData.filter(
        (customer) =>
          customer.name.toLowerCase().includes(value.toLowerCase()) ||
          customer.email.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCustomer(filteredData);
    }
  };

  const HandleSelected = (selectedOption) => {
    setSelectedUser(selectedOption);
  };
  const handleSubmit = async () => {
    const Name = selectedUser.name.split(" ");
    await mutate({
      customerData: {
        firstName: Name[0],
        lastName: Name[1],
        email: selectedUser.email,
        phone: selectedUser.phone,
        address: selectedUser.address,
        id: selectedUser._id,
      },
      estimateData: {
        ...estimateConfig,
        layout_id: estimatesLayout?._id || null,
      },
      category: estimateCategory,
      cost: Number(pricing.total)
    });
  };
  useEffect(() => {
    setFilteredCustomer(customerData);
    refetch();
  }, [customerData]);
  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={formik.handleSubmit}>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              zIndex: 12,
              width: "100%",
              height: "100vh",
              display: "flex",
              justifyContent: { sm: "center" },
              alignItems: { xs: "end", sm: "center" },
            }}
          >
            <Box
              sx={{
                backgroundColor: { xs: "#100D24", sm: "white" },
                backdropFilter: { xs: "blur(81.5px)", sm: "none" },
                padding: 3,
                borderTopLeftRadius: { sm: "4px", xs: 30 },
                borderTopRightRadius: { sm: "4px", xs: 30 },
                color: { sm: "#101828", xs: "white" },
                width: { sm: "400px", xs: "100%" },
              }}
            >
              <Box sx={{ display: "flex" }}>
                <Button
                  onClick={() => setTabs("create")}
                  sx={{
                    width: "100%",
                    height: "38px",
                    textTransform: "initial",
                    backgroundColor: Tabs === "create" ? "#8477da" : "white",
                    color: Tabs === "create" ? "white" : "#8477da",
                    borderBottom: "1px solid #8477da",
                    "&:hover": {
                      backgroundColor: "#8477da",
                      color: "white",
                    },
                    borderRadius: 0,
                  }}
                >
                  Create New
                </Button>
                <Button
                  onClick={() => setTabs("olduser")}
                  sx={{
                    width: "100%",
                    height: "38px",
                    textTransform: "initial",
                    backgroundColor: Tabs === "olduser" ? "#8477da" : "white",
                    color: Tabs === "olduser" ? "white" : "#8477da",
                    borderBottom: "1px solid #8477da",
                    "&:hover": {
                      backgroundColor: "#8477da",
                      color: "white",
                    },
                    borderRadius: 0,
                  }}
                >
                  Select Existing
                </Button>
              </Box>

              {Tabs === "create" ? (
                <>
                  <Box
                    sx={{
                      fontSize: "18px",
                      fontWeight: 600,
                      paddingBottom: "4px",
                      pt: 1,
                      fontWeight: "bold",
                    }}
                  >
                    <Typography>Customer Detail</Typography>
                  </Box>
                  <Box sx={{ width: "100%", pb: 1 }}>
                    <Typography>Label</Typography>
                    <TextField
                      id="label"
                      name="label"
                      placeholder="label"
                      size="small"
                      variant="outlined"
                      InputProps={{
                        style: {
                          color: "black",
                          borderRadius: 4,
                          border: "1px solid #cccccc",
                          backgroundColor: "white",
                        },
                        inputProps: { min: 0, max: 50 },
                      }}
                      InputLabelProps={{
                        style: {
                          color: "rgba(255, 255, 255, 0.5)",
                        },
                      }}
                      sx={{
                        color: { sm: "black", xs: "white" },
                      }}
                      fullWidth
                      value={formik.values.label}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.label && formik.errors.label}
                      helperText={formik.touched.label && formik.errors.label}
                    />
                  </Box>

                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        paddingY: { sm: 0, xs: 2 },
                      }}
                    >
                      <Box sx={{ display: { sm: "block", xs: "none" } }}>
                        <label htmlFor="firstName">First Name</label>
                      </Box>

                      <TextField
                        id="firstName"
                        name="firstName"
                        placeholder="First Name"
                        size="small"
                        variant="outlined"
                        InputProps={{
                          style: {
                            color: "black",
                            borderRadius: 4,
                            border: "1px solid #cccccc",
                            backgroundColor: "white",
                          },
                          inputProps: { min: 0, max: 50 },
                        }}
                        InputLabelProps={{
                          style: {
                            color: "rgba(255, 255, 255, 0.5)",
                          },
                        }}
                        sx={{
                          color: { sm: "black", xs: "white" },
                          width: "100%",
                        }}
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.firstName && formik.errors.firstName
                        }
                        helperText={
                          formik.touched.firstName && formik.errors.firstName
                        }
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        paddingY: { sm: 0, xs: 2 },
                      }}
                    >
                      <Box sx={{ display: { sm: "block", xs: "none" } }}>
                        {" "}
                        <label htmlFor="lastName">Last Name</label>
                      </Box>
                      <TextField
                        id="lastName"
                        name="lastName"
                        placeholder="Last Name"
                        size="small"
                        variant="outlined"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        InputProps={{
                          style: {
                            color: "black",
                            borderRadius: 4,
                            border: "1px solid #cccccc",
                            backgroundColor: "white",
                          },
                          inputProps: { min: 0, max: 50 },
                        }}
                        InputLabelProps={{
                          style: {
                            color: "rgba(255, 255, 255, 0.5)",
                          },
                        }}
                        sx={{
                          color: { sm: "black", xs: "white" },
                          width: "100%",
                        }}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.lastName && formik.errors.lastName
                        }
                        helperText={
                          formik.touched.lastName && formik.errors.lastName
                        }
                      />
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      paddingBottom: { sm: 0, xs: 2 },
                    }}
                  >
                    <Box sx={{ display: { sm: "block", xs: "none" } }}>
                      <label htmlFor="email">Email</label>
                    </Box>
                    <TextField
                      id="email"
                      name="email"
                      placeholder="Client Email address"
                      size="small"
                      variant="outlined"
                      value={formik.values.email}
                      InputProps={{
                        style: {
                          color: "black",
                          borderRadius: 4,
                          border: "1px solid #cccccc",
                          backgroundColor: "white",
                        },
                        inputProps: { min: 0, max: 50 },
                      }}
                      InputLabelProps={{
                        style: {
                          color: "rgba(255, 255, 255, 0.5)",
                        },
                      }}
                      sx={{
                        color: { sm: "black", xs: "white" },
                        width: "100%",
                      }}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.email && formik.errors.email}
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      paddingBottom: { sm: 0, xs: 2 },
                    }}
                  >
                    <Box sx={{ display: { sm: "block", xs: "none" } }}>
                      <label htmlFor="phone">Phone Number</label>
                    </Box>
                    <TextField
                      id="phone"
                      name="phone"
                      placeholder="Client Email address"
                      size="small"
                      variant="outlined"
                      value={formik.values.phone}
                      InputProps={{
                        style: {
                          color: "black",
                          borderRadius: 4,
                          border: "1px solid #cccccc",
                          backgroundColor: "white",
                        },
                        inputProps: { min: 0, max: 50 },
                      }}
                      InputLabelProps={{
                        style: {
                          color: "rgba(255, 255, 255, 0.5)",
                        },
                      }}
                      sx={{
                        color: { sm: "black", xs: "white" },
                        width: "100%",
                      }}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.phone && formik.errors.phone}
                      helperText={formik.touched.phone && formik.errors.phone}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                    }}
                  >
                    <Box sx={{ display: { sm: "block", xs: "none" } }}>
                      {" "}
                      <label htmlFor="address">address</label>
                    </Box>
                    <TextField
                      id="address"
                      name="address"
                      placeholder="Client address"
                      size="small"
                      variant="outlined"
                      value={formik.values.address}
                      InputProps={{
                        style: {
                          color: "black",
                          borderRadius: 4,
                          border: "1px solid #cccccc",
                          backgroundColor: "white",
                        },
                        inputProps: { min: 0, max: 50 },
                      }}
                      InputLabelProps={{
                        style: {
                          color: "rgba(255, 255, 255, 0.5)",
                        },
                      }}
                      sx={{
                        color: { sm: "black", xs: "white" },
                        width: "100%",
                      }}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.address && formik.errors.address}
                      helperText={
                        formik.touched.address && formik.errors.address
                      }
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      marginTop: 2,
                      justifyContent: "space-between",
                    }}
                  >
                    <Button
                      onClick={handleCancel}
                      variant="contained"
                      sx={{
                        width: "48%",
                        textTransform: "initial",
                        backgroundColor: "white",
                        "&:hover": {
                          backgroundColor: "white",
                        },
                        color: "#101828",
                        border: "1px solid #D0D5DD",
                      }}
                    >
                      {" "}
                      Back
                    </Button>
                    {/* <Link to={"/Estimates"} style={{width: "48%"}}> */}
                    <Button
                      type="submit"
                      sx={{
                        width: "48%",
                        textTransform: "initial",
                        backgroundColor: "#8477da",
                        "&:hover": {
                          backgroundColor: "#8477da",
                        },
                      }}
                      variant="contained"
                    >
                      Save
                    </Button>
                  </Box>
                </>
              ) : (
                <>
                  <Box sx={{ p: 1 }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        paddingBottom: { sm: 0, xs: 2 },
                      }}
                    >
                      {/* <Box sx={{ display: { sm: "block", xs: "none" } }}>
                        <label htmlFor="search by name">Search by name</label>
                      </Box> */}
                      <TextField
                        // size="small"
                        InputProps={{
                          endAdornment: searchQuery ? (
                            <InputAdornment
                              position="end"
                              sx={{ cursor: "pointer" }}
                              onClick={() => {
                                setSearchQuery("");
                                handleSearchChange({ target: { value: "" } });
                              }}
                            >
                              <Close sx={{}} />
                            </InputAdornment>
                          ) : (
                            ""
                          ),
                          style: {
                            color: "black",
                            borderRadius: 4,
                            border: "1px solid #cccccc",
                            backgroundColor: "white",
                          },
                          inputProps: { min: 0, max: 50 },
                        }}
                        sx={{
                          color: { sm: "black", xs: "white" },
                          width: "100%",
                        }}
                        value={searchQuery}
                        onChange={handleSearchChange}
                        // placeholder="Search by name"
                        label="Search by name"
                        variant="outlined"
                        fullWidth
                      />
                    </Box>

                    <Box
                      sx={{
                        mt: 2,
                        p: 1,
                        height: { sm: "212px", xs: "171px" },
                        width: "97%",
                        borderRadius: 2,
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        overflowY: "auto",
                        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                      }}
                    >
                      {isLoading ? (
                        <CircularProgress size={24} color="#8477da" />
                      ) : filteredCustomer?.length === 0 ? (
                        <Typography
                          sx={{ color: "gray", textAlign: "center", p: 1 }}
                        >
                          No Customer Found
                        </Typography>
                      ) : (
                        filteredCustomer.map((option) => (
                          <Box
                            onClick={() => HandleSelected(option)}
                            sx={{
                              display: "flex",
                              backgroundColor:
                                selectedUser?._id === option?._id
                                  ? "#8477da"
                                  : "white",
                              "&:hover": {
                                boxShadow:
                                  "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                              },

                              color:
                                selectedUser?._id === option?._id
                                  ? "white"
                                  : "black",
                              p: 0.5,
                              width: "96%",
                              borderRadius: 2,
                              cursor: "pointer",
                            }}
                          >
                            <Box
                              sx={{
                                mr: 1,
                                mt: 0.4,
                                borderRadius: "100%",
                                overflow: "hidden",
                              }}
                            >
                              <DefaultImage
                                name={option.name}
                                image={option.image}
                              />
                            </Box>
                            <Box>
                              <Typography>{option.name}</Typography>
                              <Typography> {option.email}</Typography>
                            </Box>
                          </Box>
                        ))
                      )}
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      marginTop: 2,
                      justifyContent: "space-between",
                    }}
                  >
                    <Button
                      onClick={handleCancel}
                      variant="outlined"
                      sx={{
                        width: "48%",
                        textTransform: "initial",
                        backgroundColor: "white",
                        "&:hover": {
                          backgroundColor: "white",
                        },
                        color: "#101828",
                        border: "1px solid #D0D5DD",
                      }}
                    >
                      {" "}
                      Back
                    </Button>
                    {/* <Link to={"/Estimates"} style={{width: "48%"}}> */}
                    <Button
                      onClick={handleSubmit}
                      sx={{
                        width: "48%",
                        textTransform: "initial",
                        backgroundColor: "#8477da",
                        "&:hover": {
                          backgroundColor: "#8477da",
                        },
                      }}
                      variant="contained"
                      disabled={selectedUser ? false : true}
                    >
                      Save
                    </Button>
                  </Box>
                </>
              )}

              {/* </Link> */}
            </Box>
          </Box>
        </form>
      </Modal>
    </div>
  );
}