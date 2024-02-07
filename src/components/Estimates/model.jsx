import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import * as yup from "yup";
import { TextField } from "@material-ui/core";
import {
  useCreateEstimates,
  useEditEstimates,
  useFetchDataEstimate,
  useGetEstimates,
} from "../../utilities/ApiHooks/estimate";
import { useDispatch, useSelector } from "react-redux";
import {
  getContent,
  getLayoutArea,
  getLayoutPerimeter,
  getMeasurementSide,
  getQuoteId,
  getQuoteState,
  getTotal,
  selectedItem,
  setNavigationDesktop,
} from "../../redux/estimateCalculations";
import { Link, useNavigate } from "react-router-dom";
import { Autocomplete } from "@mui/material";
import { useFetchDataCustomer } from "../../utilities/ApiHooks/customer";
import { useState } from "react";
import DefaultImage from "../ui-components/defaultImage";

const validationSchema = yup.object({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email address"),
  phone: yup
    .string()
    .required("phone is required")
    .matches(/^[0-9]+$/, "Phone must be numeric"),
});

export default function ClientDetailsModel({ open, handleCancel }) {
  const {
    mutate,
    isError: ErrorForAdd,
    isSuccess: CreatedSuccessfully,
  } = useCreateEstimates();
  const {
    mutate: mutateEdit,
    isError: ErrorForAddEidt,
    isSuccess: CreatedSuccessfullyEdit,
  } = useEditEstimates();
  const estimatesContent = useSelector(getContent);
  const estimatesTotal = useSelector(getTotal);
  const estimatesLayout = useSelector(selectedItem);
  const measurements = useSelector(getMeasurementSide);
  const perimeter = useSelector(getLayoutPerimeter);
  const sqftArea = useSelector(getLayoutArea);
  const updatecheck = useSelector(getQuoteState);
  const quoteId = useSelector(getQuoteId);
  const dispatch = useDispatch();
  const { data: customerData, refetch } = useFetchDataCustomer();
  const [selectedUser, setSelectedUser] = useState();
  const [Tabs, setTabs] = useState("create");
  const hardwareAddonsArray = estimatesContent?.hardwareAddons?.map((row) => {
    return {
      type: row.item._id,
      count: row.count,
    };
  });
  const wallClampArray = estimatesContent?.mountingClamps?.wallClamp?.map(
    (row) => {
      return {
        type: row.item._id,
        count: row.count,
      };
    }
  );
  const sleeveOverArray = estimatesContent?.mountingClamps?.sleeveOver?.map(
    (row) => {
      return {
        type: row.item._id,
        count: row.count,
      };
    }
  );
  const glassToGlassArray = estimatesContent?.mountingClamps?.glassToGlass?.map(
    (row) => {
      return {
        type: row.item._id,
        count: row.count,
      };
    }
  );
  const cornerWallClampArray =
    estimatesContent?.cornerClamps?.cornerWallClamp?.map((row) => {
      return {
        type: row.item._id,
        count: row.count,
      };
    });
  const cornerSleeveOverArray =
    estimatesContent?.cornerClamps?.cornerSleeveOver?.map((row) => {
      return {
        type: row.item._id,
        count: row.count,
      };
    });
  const cornerGlassToGlassArray =
    estimatesContent?.cornerClamps?.cornerGlassToGlass?.map((row) => {
      return {
        type: row.item._id,
        count: row.count,
      };
    });
  const glassAddonsArray = estimatesContent?.glassAddons?.map(
    (item) => item?._id
  );
  const estimate = {
    hardwareFinishes: estimatesContent?.hardwareFinishes?._id,
    handles: {
      type: estimatesContent?.handles?.item?._id,
      count: estimatesContent?.handles?.count,
    },
    hinges: {
      type: estimatesContent?.hinges?.item?._id,
      count: estimatesContent?.hinges?.count,
    },
    mountingClamps: {
      wallClamp: [...wallClampArray],
      sleeveOver: [...sleeveOverArray],
      glassToGlass: [...glassToGlassArray],
    },
    cornerClamps: {
      wallClamp: [...cornerWallClampArray],
      sleeveOver: [...cornerSleeveOverArray],
      glassToGlass: [...cornerGlassToGlassArray],
    },
    mountingChannel: estimatesContent?.mountingChannel?.item?._id || null,
    glassType: {
      type: estimatesContent?.glassType?.item?._id,
      thickness: estimatesContent?.glassType?.thickness,
    },
    glassAddons: [...glassAddonsArray],
    slidingDoorSystem: {
      type: estimatesContent?.slidingDoorSystem?.item?._id,
      count: estimatesContent?.slidingDoorSystem?.count,
    },
    header: {
      type: estimatesContent?.header?.item?._id,
      count: estimatesContent?.header?.count,
    },
    oneInchHoles: estimatesContent?.oneInchHoles,
    hingeCut: estimatesContent?.hingeCut,
    clampCut: estimatesContent?.clampCut,
    notch: estimatesContent?.notch,
    outages: estimatesContent?.outages,
    mitre: estimatesContent?.mitre,
    polish: estimatesContent?.polish,
    people: estimatesContent?.people,
    hours: estimatesContent?.hours,
    cost: Number(estimatesTotal),
    hardwareAddons: [...hardwareAddonsArray],
    sleeveOverCount: estimatesContent?.sleeveOverCount,
    towelBarsCount: estimatesContent?.sleeveOverCount,
    measurements: measurements,
    perimeter: perimeter,
    sqftArea: sqftArea,
    userProfitPercentage: estimatesContent?.userProfitPercentage,
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values, "values");
      if (["create", "custom"].includes(updatecheck)) {
        mutate({
          customerData: values,
          estimateData: {
            ...estimate,
            layout_id: estimatesLayout?._id || null,
          },
        });
      } else {
        mutateEdit({
          customerData: values,
          estimateData: estimate,
          id: quoteId,
        });
      }
    },
  });
  const navigate = useNavigate();
  const { refetch: Refetched } = useFetchDataEstimate();
  React.useEffect(() => {
    if (CreatedSuccessfullyEdit) {
      // dispatch(resetState());
      dispatch(setNavigationDesktop("existing"));
      handleCancel();
      //localhost:3000/customers
      http: Refetched();
      navigate("/estimates");
    } else if (ErrorForAddEidt) {
      const errorMessage = ErrorForAddEidt.message || "An error occurred";
    }
    refetch();
    setFilteredCustomer(customerData);
  }, [CreatedSuccessfullyEdit, ErrorForAddEidt]);
  React.useEffect(() => {
    if (CreatedSuccessfully) {
      // dispatch(resetState());
      dispatch(setNavigationDesktop("existing"));
      handleCancel();
      Refetched();
      navigate("/estimates");
    } else if (ErrorForAdd) {
      const errorMessage = ErrorForAdd.message || "An error occurred";
    }
    refetch();
    setFilteredCustomer(customerData);
  }, [CreatedSuccessfully, ErrorForAdd]);
  // console.log(customerData, "customerData");
  const [searchQuery, setSearchQuery] = useState(""); // State to hold the search query
  const [filteredCustomer, setFilteredCustomer] = useState(customerData); // State to hold filtered customer data

  // Function to handle search query change
  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);

    // Filter customer data based on search query
    const filteredData = customerData.filter(
      (customer) =>
        customer.name.toLowerCase().includes(value.toLowerCase()) ||
        customer.email.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredCustomer(filteredData);
  };

  const HandleSelected = (selectedOption) => {
    setSelectedUser(selectedOption);
  };
  const handleSubmit = async () => {
    const Name = selectedUser.name.split(" ");
    mutate({
      customerData: {
        firstName: Name[0],
        lastName: Name[1],
        ...selectedUser,
      },
      estimateData: {
        ...estimate,
        layout_id: estimatesLayout?._id || null,
      },
    });
  };

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
                    }}
                  >
                    <Typography>Clients Details</Typography>
                  </Box>

                  <Box sx={{ display: "flex", gap: 4 }}>
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
                      <label htmlFor="email">Client Email address</label>
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
                      <label htmlFor="phone">Client Phone Number</label>
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
                      <label htmlFor="address">Client address</label>
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
                    <TextField
                      value={searchQuery}
                      onChange={handleSearchChange}
                      label="Search"
                      variant="outlined"
                      fullWidth
                    />
                    <Box
                      sx={{
                        mt: 2,
                        p: 1,
                        height: "204px",
                        width: "97%",
                        bgcolor: "#dedede",
                        borderRadius: 2,
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        overflowY: "auto",
                      }}
                    >
                      {filteredCustomer.map((option) => (
                        <Box
                          onClick={() => HandleSelected(option)}
                          sx={{
                            display: "flex",
                            backgroundColor:
                              selectedUser?._id === option?._id
                                ? "#8477da"
                                : "white",
                            "&:hover": {
                              backgroundColor: "#8477da",
                              color: "white",
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
                          <Box sx={{ pr: 1, pt: 0.4 }}>
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
                      ))}
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
                      variant="contained"
                      sx={{
                        width: "48%",
                        textTransform: "initial",
                        backgroundColor: "white",
                        "&:hover": {
                          backgroundColor: "white",
                        },
                        color: "#101828",
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
