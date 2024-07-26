import { Box, Button, CircularProgress, Divider, Tab, Tabs, TextareaAutosize, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import CustomerSelect from "./CustomerSelect";
import { useMemo, useState } from "react";
import { useCreateDocument, useEditDocument } from "@/utilities/ApiHooks/common";
import { backendURL } from "@/utilities/common";
import { useNavigate } from "react-router-dom";
import { Edit } from "@mui/icons-material";
import CustomTabPanel, { a11yProps } from "@/components/CustomTabPanel";
import ShowerEstimatesList from "./EstimatesList/showers";
import MirrorEstimatesList from "./EstimatesList/mirrors";


const validationSchema = yup.object({
    name: yup.string().required("Project Name is required"),
    location: yup.string().required("Project Location is required"),
    city: yup.string().required("City Name is required"),
    state: yup.string().required("State Name is required"),
    street: yup.string().required("Street Number is required"),
    // phone: yup.string().matches(/^[0-9]+$/, "Phone must be numeric"),
});
const routePrefix = `${backendURL}/projects`;

const ProjectInfoComponent = ({ projectState = 'create', projectData = null }) => {
    const { mutateAsync: createProject, isLoading: createLoading } = useCreateDocument();
    const { mutateAsync: updateProject, isLoading: updateLoading } = useEditDocument();
    const [selectedCustomer, setSelectedCustomer] = useState(projectData?.customerData || null);
    const [editProjectInfo, setEditProjectInfo] = useState(false);
    const [steps, setSteps] = useState(projectState === 'edit' ? 2 : 0);   // 0 for list, 1 for create, 2 for selected customer show
    const [customerInfoModified, setCustomerInfoModified] = useState(false);
    const [activeTabNumber, setActiveTabNumber] = useState(0); // 0 for showers, 1 for mirrors
    const navigate = useNavigate();

    const handleChange = (event, newValue) => {
        setActiveTabNumber(newValue);
    };
    const projectInfoModified = useMemo(() => {
        return projectState === 'edit' && editProjectInfo;
    }, [editProjectInfo]);
    const formik = useFormik({
        initialValues: {
            name: projectData?.name || "",
            location: projectData?.location || "",
            city: projectData?.address?.city || "",
            state: projectData?.address?.state || "",
            street: projectData?.address?.street || "",
            postalCode: projectData?.address?.postalCode || "",
            country: projectData?.address?.country || "America",
            notes: projectData?.notes || ""
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            const data = {
                name: values.name,
                notes: values.notes,
                location: values.location,
                address: {
                    street: values.street,
                    city: values.city,
                    state: values.state,
                    postalCode: values.postalCode,
                    country: values.country,
                },
                customer_id: selectedCustomer?._id,
            }
            try {
                if (projectState === 'create') {
                    const resp = await createProject({ data: data, apiRoute: `${routePrefix}/save` });
                    navigate(`/projects/${resp?._id}`);
                }
                else {
                    await updateProject({ data: data, apiRoute: `${routePrefix}/${projectData?._id}` });
                    setSteps(2);
                    setEditProjectInfo(false);
                    setCustomerInfoModified(false);
                }
            } catch (err) {
                console.error(err, 'error');
            }
            console.log(data, 'data');
        }
    })
    const handleStepChange = (step) => {
        setSteps(step);
    }
    const handleCustomerChange = (customer) => {
        setSelectedCustomer(customer);
        if (projectState === 'edit') {
            setCustomerInfoModified(true);
        }
    }

    return <Box sx={{ background: 'transparent', padding: { sm: 2, xs: '60px 16px 16px 16px' }, width: { sm: '90%', xs: 'auto', margin: '0px auto' } }}>
        <form onSubmit={formik.handleSubmit}>
            {/** Section 1 */}
            <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 2, justifyContent: 'space-evenly', aligItems: 'baseline' }}>
                {/** Project Info Block */}
                <Box sx={{ width: { sm: "480px", xs: "100%" } }}>
                    <Typography sx={{ fontSize: '20px', fontWeight: 800 }}>Project Info</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', }}>
                        {projectState === 'edit' && !editProjectInfo && <Button sx={{
                            width: "fit-content",
                            textTransform: "initial",
                            backgroundColor: "#8477da",
                            "&:hover": {
                                backgroundColor: "#8477da",
                            },
                            borderRadius: 1,
                            padding: 1,
                            fontSize: 16,
                            height: 35,
                        }}
                            variant="contained" onClick={() => setEditProjectInfo(true)}><Edit sx={{ fontSize: '18px', marginRight: '5px' }} /> Edit</Button>}

                    </Box>
                    {projectState === 'create' || editProjectInfo ? <Box sx={{ display: "flex", flexDirection: 'column', gap: 1, padding: 1 }}>
                        <Box sx={{ display: 'flex', gap: 1, flexDirection: { sm: "row", xs: "column" } }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 1,
                                    paddingY: { sm: 0, xs: 2 },
                                }}
                            >
                                <Box sx={{ display: { sm: "block", xs: "none" } }}>
                                    <label htmlFor="name">Name</label><span style={{ color: 'red' }}>*</span>
                                </Box>

                                <TextField
                                    id="name"
                                    name="name"
                                    placeholder="Enter Project Name"
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
                                }}
                            >
                                <Box sx={{ display: { sm: "block", xs: "none" } }}>
                                    <label htmlFor="location">Location</label><span style={{ color: 'red' }}>*</span>
                                </Box>

                                <TextField
                                    id="location"
                                    name="location"
                                    placeholder="Enter Project Location"
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
                                    value={formik.values.location}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={
                                        formik.touched.location && formik.errors.location
                                    }
                                    helperText={
                                        formik.touched.location && formik.errors.location
                                    }
                                />
                            </Box>
                        </Box>
                        <Typography sx={{ fontSize: '17px', fontWeight: 600 }}>Address</Typography>
                        <Box sx={{ display: 'flex', gap: 1, flexDirection: { sm: "row", xs: "column" } }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 1,
                                    paddingY: { sm: 0, xs: 2 },
                                }}
                            >
                                <Box sx={{ display: { sm: "block", xs: "none" } }}>
                                    <label htmlFor="name">City</label><span style={{ color: 'red' }}>*</span>
                                </Box>

                                <TextField
                                    id="city"
                                    name="city"
                                    placeholder="Enter City Name"
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
                                    value={formik.values.city}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={
                                        formik.touched.city && formik.errors.city
                                    }
                                    helperText={
                                        formik.touched.city && formik.errors.city
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
                                    <label htmlFor="location">State</label><span style={{ color: 'red' }}>*</span>
                                </Box>

                                <TextField
                                    id="state"
                                    name="state"
                                    placeholder="Enter State Name"
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
                                    value={formik.values.state}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={
                                        formik.touched.state && formik.errors.state
                                    }
                                    helperText={
                                        formik.touched.state && formik.errors.state
                                    }
                                />
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1, flexDirection: { sm: "row", xs: "column" } }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 1,
                                    paddingY: { sm: 0, xs: 2 },
                                }}
                            >
                                <Box sx={{ display: { sm: "block", xs: "none" } }}>
                                    <label htmlFor="name">Street</label><span style={{ color: 'red' }}>*</span>
                                </Box>

                                <TextField
                                    id="street"
                                    name="street"
                                    placeholder="Enter Street Number"
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
                                    value={formik.values.street}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={
                                        formik.touched.street && formik.errors.street
                                    }
                                    helperText={
                                        formik.touched.street && formik.errors.street
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
                                    <label htmlFor="location">Postal Code</label>
                                </Box>

                                <TextField
                                    id="postalCode"
                                    name="postalCode"
                                    placeholder="Enter Postal Code"
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
                                    value={formik.values.postalCode}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={
                                        formik.touched.postalCode && formik.errors.postalCode
                                    }
                                    helperText={
                                        formik.touched.postalCode && formik.errors.postalCode
                                    }
                                />
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1, flexDirection: { sm: "row", xs: "column" } }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 1,
                                    paddingY: { sm: 0, xs: 2 },
                                }}
                            >
                                <Box sx={{ display: { sm: "block", xs: "none" } }}>
                                    <label htmlFor="name">Country</label>
                                </Box>

                                <TextField
                                    disabled={true}
                                    id="country"
                                    name="country"
                                    placeholder="Enter Country Name"
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
                                    value={formik.values.country}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={
                                        formik.touched.country && formik.errors.country
                                    }
                                    helperText={
                                        formik.touched.country && formik.errors.country
                                    }
                                />
                            </Box>
                        </Box>
                        <Typography sx={{ fontSize: '17px', fontWeight: 600 }}>Additional Notes</Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 1,
                                    paddingY: { sm: 0, xs: 1 },
                                    width: '100%'
                                }}
                            >
                                <TextareaAutosize

                                    color="neutral"
                                    // cols={isMobile ? 38 : 50}
                                    minRows={5}
                                    id="notes"
                                    name="notes"
                                    placeholder="Enter Additional Notes"
                                    size="large"
                                    variant="outlined"
                                    sx={{ padding: '10px', resize: "vertical", }}
                                    value={formik.values.notes}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={
                                        formik.touched.notes && formik.errors.notes
                                    }
                                    helperText={
                                        formik.touched.notes && formik.errors.notes
                                    }
                                />

                            </Box>
                        </Box>
                    </Box> : <Box sx={{ display: "flex", flexDirection: 'column', gap: 1, padding: { sm: 1, xs: 0 } }}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Typography sx={{ fontSize: '18px', fontWeight: 700 }}>Name :</Typography>
                            <Typography sx={{ fontSize: '18px', fontWeight: 500 }}>{formik.values.name}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Typography sx={{ fontSize: '18px', fontWeight: 700 }}>Location :</Typography>
                            <Typography sx={{ fontSize: '18px', fontWeight: 500 }}>{formik.values.location}</Typography>
                        </Box>
                        <Typography sx={{ fonSize: '19px', fontWeight: 800 }}>Address</Typography>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Typography sx={{ fontSize: '18px', fontWeight: 700 }}>City :</Typography>
                            <Typography sx={{ fontSize: '18px', fontWeight: 500 }}>{formik.values.city}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Typography sx={{ fontSize: '18px', fontWeight: 700 }}>State :</Typography>
                            <Typography sx={{ fontSize: '18px', fontWeight: 500 }}>{formik.values.state}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Typography sx={{ fontSize: '18px', fontWeight: 700 }}>Street Number :</Typography>
                            <Typography sx={{ fontSize: '18px', fontWeight: 500 }}>{formik.values.street}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Typography sx={{ fontSize: '18px', fontWeight: 700 }}>Postal Code :</Typography>
                            <Typography sx={{ fontSize: '18px', fontWeight: 500 }}>{formik.values.postalCode}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Typography sx={{ fontSize: '18px', fontWeight: 700 }}>Country :</Typography>
                            <Typography sx={{ fontSize: '18px', fontWeight: 500 }}>{formik.values.country}</Typography>
                        </Box>
                        <Typography sx={{ fonSize: '19px', fontWeight: 800 }}>Additional Notes:</Typography>
                        <Typography>{formik.values.notes}</Typography>
                    </Box>}
                </Box>
                {/** Customer Info Block */}
                <Box sx={{ width: { sm: "480px", xs: "100%" } }}>
                    <Typography sx={{ fontSize: '20px', fontWeight: 800 }}>Customer Info</Typography>
                    <CustomerSelect selectedCustomer={selectedCustomer} setSelectedCustomer={handleCustomerChange} steps={steps} handleStepChange={handleStepChange} />
                </Box>
            </Box>
            <Divider sx={{ width: "100%", margin: '10px auto', color: 'black', border: '1px solid #ccc' }} variant="middle" />
            {/** Section 2 */}
            {projectState === 'create' && <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, alignItems: 'baseline', }}>
                <Box>
                    <Typography sx={{ fontSize: '20px', fontWeight: 900 }}>How to create?</Typography>
                    <Typography sx={{ fontSize: '16px', fontWeight: 500 }}>1. First provide project info.</Typography>
                    <Typography sx={{ fontSize: '16px', fontWeight: 500 }}>2. Second select or create a customer.</Typography>
                    <Typography sx={{ fontSize: '16px', fontWeight: 500 }}>3. Please fill in all fields marked with * sign.</Typography>
                </Box>
                <Box>
                    <Button type="submit"
                        sx={{
                            width: "150px",
                            textTransform: "initial",
                            backgroundColor: "#8477da",
                            "&:hover": {
                                backgroundColor: "#8477da",
                            },
                        }}
                        disabled={selectedCustomer ? false : true}
                        variant="contained">{createLoading ? <CircularProgress sx={{ color: selectedCustomer ? "white" : "#8477da" }} size={24} /> : "Save Project"}</Button>
                </Box>
            </Box>}
            {projectState === 'edit' && <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', gap: 2, alignItems: 'baseline' }}>
                <Typography sx={{ fontSize: '20px', fontWeight: 800 }}>Project Estimates</Typography>
                <Button type="submit"
                    sx={{
                        width: "150px",
                        textTransform: "initial",
                        backgroundColor: "#8477da",
                        "&:hover": {
                            backgroundColor: "#8477da",
                        },
                    }}
                    disabled={projectInfoModified || customerInfoModified ? false : true}
                    variant="contained">{updateLoading ? <CircularProgress sx={{ color: projectInfoModified || customerInfoModified ? "white" : "#8477da" }} size={24} /> : "Save Changes"}</Button>
            </Box>}
            {/** Section 3 */}
            {projectState === 'edit' && <Box>
                {/** Tabs Switch */}
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={activeTabNumber} onChange={handleChange} aria-label="basic tabs example" sx={{
                        "& .MuiTab-root.Mui-selected": {
                            color: '#8477DA'
                        }, "& .MuiTabs-indicator": {
                            backgroundColor: "#8477DA",
                            height: 3,
                        },
                    }}>
                        <Tab label="Showers" sx={{
                            fontSize: '15px', fontWeight: 600
                        }} {...a11yProps(0)} />
                        <Tab label="Mirrors" sx={{ fontSize: '15px', fontWeight: 600 }} {...a11yProps(1)} />
                    </Tabs>
                </Box>
                {/** end */}
                {/** Showers tab */}
                <CustomTabPanel value={activeTabNumber} index={0}>
                    <ShowerEstimatesList projectId={projectData?._id} />
                </CustomTabPanel>
                {/** Mirrors tab */}
                <CustomTabPanel value={activeTabNumber} index={1}>
                    <MirrorEstimatesList projectId={projectData?._id} />
                </CustomTabPanel>
            </Box>}
        </form>
    </Box>;
}
export default ProjectInfoComponent;