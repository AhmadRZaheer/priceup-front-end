import { useCreateDocument } from "@/utilities/ApiHooks/common";
import { backendURL } from "@/utilities/common";
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
const validationSchema = yup.object({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    email: yup.string().email('Email must be valid'),
    phone: yup.string().matches(/^[0-9]+$/, "Phone must be numeric"),
});
const CreateCustomerForm = ({ setSelectedCustomer, handleStepChange }) => {
    const { mutateAsync: createCustomer, isLoading: createLoading } = useCreateDocument();
    const routePrefix = `${backendURL}/customers`;

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            address: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            const data = {
                name: `${values.firstName} ${values.lastName}`,
                email: values.email,
                phone: values.phone,
                address: values.address,
            };
            try {
                const resp = await createCustomer({ data: data, apiRoute: `${routePrefix}/save` });
                setSelectedCustomer(resp);
                // handleStepChange(2);
            } catch (err) {
                console.error(err, 'error');
            }
        },
    });
    return (<Box>
        <form>
            <Box sx={{ display: "flex", gap: 2 }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        paddingY: { sm: 0, xs: 2 },
                        width:'50%'
                    }}
                >
                    <Box sx={{ display: { sm: "block", xs: "none" } }}>
                        <label htmlFor="firstName">First Name</label><span style={{ color: 'red' }}>*</span>
                    </Box>

                    <TextField
                    className="custom-textfield"
                        id="firstName"
                        name="firstName"
                        placeholder="Enter First Name"
                        size="small"
                        variant="outlined"
                        // InputProps={{
                        //     style: {
                        //         color: "black",
                        //         borderRadius: 4,
                        //         border: "1px solid #cccccc",
                        //         backgroundColor: "white",
                        //     },
                        //     inputProps: { min: 0, max: 50 },
                        // }}
                        // InputLabelProps={{
                        //     style: {
                        //         color: "rgba(255, 255, 255, 0.5)",
                        //     },
                        // }}
                        sx={{
                            // color: { sm: "black", xs: "white" },
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
                        width:'50%'
                    }}
                >
                    <Box sx={{ display: { sm: "block", xs: "none" } }}>
                        {" "}
                        <label htmlFor="lastName">Last Name</label><span style={{ color: 'red' }}>*</span>
                    </Box>
                    <TextField
                        className="custom-textfield"
                        id="lastName"
                        name="lastName"
                        placeholder="Enter Last Name"
                        size="small"
                        variant="outlined"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        // InputProps={{
                        //     style: {
                        //         color: "black",
                        //         borderRadius: 4,
                        //         border: "1px solid #cccccc",
                        //         backgroundColor: "white",
                        //     },
                        //     inputProps: { min: 0, max: 50 },
                        // }}
                        // InputLabelProps={{
                        //     style: {
                        //         color: "rgba(255, 255, 255, 0.5)",
                        //     },
                        // }}
                        sx={{
                            // color: { sm: "black", xs: "white" },
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
                     className="custom-textfield"
                    value={formik.values.email}
                    // InputProps={{
                    //     style: {
                    //         color: "black",
                    //         borderRadius: 4,
                    //         border: "1px solid #cccccc",
                    //         backgroundColor: "white",
                    //     },
                    //     inputProps: { min: 0, max: 50 },
                    // }}
                    // InputLabelProps={{
                    //     style: {
                    //         color: "rgba(255, 255, 255, 0.5)",
                    //     },
                    // }}
                    sx={{
                        // color: { sm: "black", xs: "white" },
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
                     className="custom-textfield"
                    value={formik.values.phone}
                    // InputProps={{
                    //     style: {
                    //         color: "black",
                    //         borderRadius: 4,
                    //         border: "1px solid #cccccc",
                    //         backgroundColor: "white",
                    //     },
                    //     inputProps: { min: 0, max: 50 },
                    // }}
                    // InputLabelProps={{
                    //     style: {
                    //         color: "rgba(255, 255, 255, 0.5)",
                    //     },
                    // }}
                    sx={{
                        // color: { sm: "black", xs: "white" },
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
                     className="custom-textfield"
                    value={formik.values.address}
                    // InputProps={{
                    //     style: {
                    //         color: "black",
                    //         borderRadius: 4,
                    //         border: "1px solid #cccccc",
                    //         backgroundColor: "white",
                    //     },
                    //     inputProps: { min: 0, max: 50 },
                    // }}
                    // InputLabelProps={{
                    //     style: {
                    //         color: "rgba(255, 255, 255, 0.5)",
                    //     },
                    // }}
                    sx={{
                        // color: { sm: "black", xs: "white" },
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
                    onClick={formik.handleSubmit}
                    type="button"
                    sx={{
                        width: "100%",
                        textTransform: "initial",
                        backgroundColor: "#8477da",
                        "&:hover": {
                            backgroundColor: "#8477da",
                        },
                    }}
                    variant="contained"
                    disabled={createLoading}
                >
                    {createLoading ? <CircularProgress size={24} sx={{ color: "#8477DA" }} /> : "Save Customer"}
                </Button>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    justifyContent: "space-between",
                    alignItems: "center",
                    py: 1,
                    color: "gray"
                }}
            >
                <div style={{ width: "100%", background: "gray", height: "1px" }} />{" "}
                or{" "}
                <div style={{ width: "100%", background: "gray", height: "1px" }} />
            </Box>
            <Button
                onClick={() => handleStepChange(0)}
                sx={{
                    width: "100%",
                    textTransform: "initial",
                    backgroundColor: "#8477da",
                    "&:hover": {
                        backgroundColor: "#8477da",
                    },
                }}
                variant="contained"
            >
                Select From List{" "}
            </Button>
        </form>

    </Box>)
}

export default CreateCustomerForm;