import { useCreateDocument } from "@/utilities/ApiHooks/common";
import { backendURL } from "@/utilities/common";
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
const validationSchema = yup.object({
    name: yup.string().required("Address reference is required"),
    street: yup.string().required("Street number is required"),
    state: yup.string().required('State name is required'),
    city: yup.string().required('City name is required'),
    postalCode: yup.string().matches(/^[0-9]+$/, "Postal code must be numeric"),
});
const CreateAddressForm = ({ setSelectedAddress, handleStepChange, selectedCustomer }) => {
    const { mutateAsync: createAddress, isLoading: createLoading } = useCreateDocument();
    const routePrefix = `${backendURL}/addresses`;

    const formik = useFormik({
        initialValues: {
            name: "",
            street: "",
            state: "",
            city: "",
            postalCode: "",
            country: "America"
        },
        validationSchema,
        onSubmit: async (values) => {

            try {
                const resp = await createAddress({ data: { ...values,customer_id:selectedCustomer?._id }, apiRoute: `${routePrefix}/save` });
                setSelectedAddress(resp);
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
                        <label htmlFor="firstName">Reference</label><span style={{ color: 'red' }}>*</span>
                    </Box>

                    <TextField
                        className="custom-textfield"
                        id="name"
                        name="name"
                        placeholder="Enter Address Reference"
                        size="small"
                        variant="outlined"
                        // InputProps={{
                        //     style: {
                        //         color: "black",
                        //         borderRadius: 4,
                        //         backgroundColor: "white",
                        //     },
                        // }}
                        sx={{
                            // color: { sm: "black", xs: "white" },
                            width: "100%",
                        }}
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.name && formik.errors.name
                        }
                        helperText={
                            formik.touched.name && formik.errors.name
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
                        <label htmlFor="lastName">City</label><span style={{ color: 'red' }}>*</span>
                    </Box>
                    <TextField
                        id="city"
                        name="city"
                        placeholder="Enter city name"
                        size="small"
                        variant="outlined"
                        className="custom-textfield"
                        value={formik.values.city}
                        onChange={formik.handleChange}
                        // InputProps={{
                        //     style: {
                        //         color: "black",
                        //         borderRadius: 4,
                        //         backgroundColor: "white",
                        //     },
                        // }}
                        sx={{
                            // color: { sm: "black", xs: "white" },
                            width: "100%",
                        }}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.city && formik.errors.city
                        }
                        helperText={
                            formik.touched.city && formik.errors.city
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
                    <label htmlFor="state">State</label><span style={{ color: 'red' }}>*</span>
                </Box>
                <TextField
                    id="state"
                    name="state"
                    placeholder="Enter state name"
                    size="small"
                    variant="outlined"
                    className="custom-textfield"
                    value={formik.values.state}
                    // InputProps={{
                    //     style: {
                    //         color: "black",
                    //         borderRadius: 4,
                    //         backgroundColor: "white",
                    //     },
                    // }}
                    sx={{
                        // color: { sm: "black", xs: "white" },
                        width: "100%",
                    }}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.state && formik.errors.state}
                    helperText={formik.touched.state && formik.errors.state}
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
                    <label htmlFor="phone">Street Number</label><span style={{ color: 'red' }}>*</span>
                </Box>
                <TextField
                    id="street"
                    name="street"
                    placeholder="Enter street number"
                    size="small"
                    variant="outlined"
                    className="custom-textfield"
                    value={formik.values.street}
                    // InputProps={{
                    //     style: {
                    //         color: "black",
                    //         borderRadius: 4,
                    //         backgroundColor: "white",
                    //     },
                    // }}

                    sx={{
                        // color: { sm: "black", xs: "white" },
                        width: "100%",
                    }}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.street && formik.errors.street}
                    helperText={formik.touched.street && formik.errors.street}
                />
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        width:'50%'
                    }}
                >
                    <Box sx={{ display: { sm: "block", xs: "none" } }}>
                        {" "}
                        <label htmlFor="address">Postal Code</label>
                    </Box>
                    <TextField
                        id="postalCode"
                        name="postalCode"
                        placeholder="Enter postal code"
                        size="small"
                        variant="outlined"
                        className="custom-textfield"
                        value={formik.values.postalCode}
                        // InputProps={{
                        //     style: {
                        //         color: "black",
                        //         borderRadius: 4,
                        //         backgroundColor: "white",
                        //     },
                        // }}
                        sx={{
                            // color: { sm: "black", xs: "white" },
                            width: "100%",
                        }}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.postalCode && formik.errors.postalCode}
                        helperText={
                            formik.touched.postalCode && formik.errors.postalCode
                        }
                    />
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        width:'50%'
                    }}
                >
                    <Box sx={{ display: { sm: "block", xs: "none" } }}>
                        {" "}
                        <label htmlFor="address">Country</label>
                    </Box>
                    <TextField
                        disabled={true}
                        id="country"
                        name="country"
                        placeholder="Enter country name"
                        size="small"
                        variant="outlined"
                        className="custom-textfield"
                        value={formik.values.country}
                        // InputProps={{
                        //     style: {
                        //         color: "black",
                        //         borderRadius: 4,
                        //         backgroundColor: "white",
                        //     },
                        // }}
                        sx={{
                            // color: { sm: "black", xs: "white" },
                            width: "100%",
                        }}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.country && formik.errors.country}
                        helperText={
                            formik.touched.country && formik.errors.country
                        }
                    />
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
                    {createLoading ? <CircularProgress sx={{ color: "#8477da" }} /> : "Save Address"}
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

export default CreateAddressForm;