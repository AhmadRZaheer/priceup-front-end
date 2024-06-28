import { Box, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

const CreateCustomerForm = ({ setSelectedUser, handleStepChange }) => {
    const validationSchema = yup.object({
        firstName: yup.string().required("First Name is required"),
        lastName: yup.string().required("Last Name is required"),
        phone: yup.string().matches(/^[0-9]+$/, "Phone must be numeric"),
    });
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
            const filteredValues = Object.fromEntries(
                Object.entries(values).filter(([key]) => key !== "label")
            );
            setSelectedUser(filteredValues);
            handleStepChange(2);
            // mutate({
            //     customerData: filteredValues,
            //     estimateData: {
            //         ...estimateConfig,
            //         layout_id: estimatesLayout?._id || null,
            //     },
            //     label: values.label,
            //     category: estimateCategory,
            //     cost: Number(estimatesTotal)
            // });

        },
    });
    return (<Box>


        <form onSubmit={formik.handleSubmit}>
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
                        placeholder="Enter First Name"
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
                        placeholder="Enter Last Name"
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
                    placeholder="Enter Email address"
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
                    placeholder="Enter Phone Number"
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
                    <label htmlFor="address">Address</label>
                </Box>
                <TextField
                    id="address"
                    name="address"
                    placeholder="Enter Address"
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
                    onClick={() => handleStepChange(0)}
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
                    Next
                </Button>
            </Box>
        </form>

    </Box>)
}

export default CreateCustomerForm;