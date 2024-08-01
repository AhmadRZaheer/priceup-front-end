import { Box, Button, CircularProgress, FormControl, InputAdornment, InputLabel, MenuItem, Select, Tab, Tabs, TextareaAutosize, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import CustomerSelect from "./CustomerSelect";
import { useMemo, useState } from "react";
import { useCreateDocument, useEditDocument } from "@/utilities/ApiHooks/common";
import { backendURL, getDecryptedToken } from "@/utilities/common";
import { useNavigate } from "react-router-dom";
import { Close } from "@mui/icons-material";
import CustomTabPanel, { a11yProps } from "@/components/CustomTabPanel";
import ShowerEstimatesList from "./EstimatesList/showers";
import MirrorEstimatesList from "./EstimatesList/mirrors";
import { projectStatus } from "@/utilities/constants";
import AddressSelect from "./AddressSelect";


const validationSchema = yup.object({
    name: yup.string().required("Project Name is required"),
    status: yup.string().required("Project Status is required"),
});
const routePrefix = `${backendURL}/projects`;

const ProjectInfoComponent = ({ projectState = 'create', projectData = null }) => {
    const decryptedToken = getDecryptedToken();
    const creatorName = projectState === 'create' ? decryptedToken?.name : projectData?.creatorData?.name;
    const createdDate = useMemo(() => {
        const todaysDate = new Date();
        if (projectState === 'create') {
            return todaysDate?.toDateString();
        }
        else {
            const current = new Date(projectData?.createdAt);
            return current?.toDateString();
        }
    }, [projectState, projectData])
    const { mutateAsync: createProject, isLoading: createLoading } = useCreateDocument();
    const { mutateAsync: updateProject, isLoading: updateLoading } = useEditDocument();
    const [selectedCustomer, setSelectedCustomer] = useState(projectData?.customerData || null);
    const [selectedAddress, setSelectedAddress] = useState(projectData?.addressData || null);
    const [openCustomerSelectModal, setOpenCustomerSelectModal] = useState(false);
    const [openAddressSelectModal, setOpenAddressSelectModal] = useState(false);
    const [activeTabNumber, setActiveTabNumber] = useState(0); // 0 for showers, 1 for mirrors
    const navigate = useNavigate();

    const handleChange = (event, newValue) => {
        setActiveTabNumber(newValue);
    };

    const formik = useFormik({
        initialValues: {
            name: projectData?.name || "",
            status: projectData?.status || projectStatus.PENDING,
            customer: selectedCustomer?.name || "",
            address: selectedAddress?.name || "",
            notes: projectData?.notes || ""
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            const data = {
                name: values.name,
                notes: values.notes,
                status: values.status,
                address_id: selectedAddress?._id,
                customer_id: selectedCustomer?._id,
            }
            try {
                if (projectState === 'create') {
                    const resp = await createProject({ data: data, apiRoute: `${routePrefix}/save` });
                    navigate(`/projects/${resp?._id}`);
                }
                else {
                    await updateProject({ data: data, apiRoute: `${routePrefix}/${projectData?._id}` });
                }
            } catch (err) {
                console.error(err, 'error');
            }
            console.log(data, 'data');
        }
    })
    const handleCustomerSelect = () => {
        setOpenCustomerSelectModal(true);
    }
    const handleCustomerUnSelect = (event) => {
        event.stopPropagation();
        setSelectedCustomer(null);
        formik.setFieldValue('customer', '');
        setSelectedAddress(null);
        formik.setFieldValue('address', '');
    }
    const handleCustomerChange = (customer) => {
        setSelectedCustomer(customer);
        setSelectedAddress(null);
        formik.setFieldValue('address', '');
        setOpenCustomerSelectModal(false);
    }
    const handleAddressSelect = () => {
        setOpenAddressSelectModal(true);
    }
    const handleAddressUnSelect = (event) => {
        event.stopPropagation();
        setSelectedAddress(null);
        formik.setFieldValue('address', '');
    }
    const handleAddressChange = (address) => {
        setSelectedAddress(address);
        setOpenAddressSelectModal(false);
    }
    return <Box sx={{ background: 'transparent', padding: { sm: 1.5, xs: '60px 8px 8px 8px' }, width: { sm: '98%', xs: 'auto', margin: '0px auto' } }}>
        <Typography sx={{ fontSize: '22px', fontWeight: 800, marginBottom: 1.5 }}>Project</Typography>

        <Box sx={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', borderRadius: '5px', padding: { md: 2, xs: 1 } }}>
            <form onSubmit={formik.handleSubmit}>
                {/** Section 1 */}
                <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 2, aligItems: 'baseline' }}>
                    {/** Project Detail Block */}
                    <Box sx={{ width: { md: "auto", xs: "100%" } }}>
                        <Typography sx={{ fontSize: '20px', fontWeight: 800 }}>Detail</Typography>
                        <Box sx={{ display: "flex", flexDirection: 'column', gap: 1, padding: 1 }}>
                            <Box sx={{ display: 'flex', gap: 1, flexDirection: { sm: "row", xs: "column" } }}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 1,
                                        paddingY: { sm: 0, xs: 2 },
                                    }}
                                >
                                    <Box sx={{ display: { sm: "block", xs: "none" }, marginBottom: 1 }}>
                                        <label htmlFor="name">Creater</label><span style={{ color: 'red' }}>*</span>
                                    </Box>
                                    <TextField
                                        disabled="true"
                                        id="creator"
                                        name="creator"
                                        label="Enter Creator Name"
                                        size="small"
                                        variant="outlined"
                                        InputProps={{
                                            style: {
                                                color: "black",
                                                borderRadius: 4,
                                                backgroundColor: "white",
                                            },
                                        }}

                                        sx={{
                                            color: { sm: "black", xs: "white" },
                                            width: "100%",
                                        }}
                                        value={creatorName}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 1,
                                        paddingY: { sm: 0, xs: 2 },
                                        flexGrow: 1
                                    }}
                                >
                                    <Box sx={{ display: { sm: "block", xs: "none" }, marginBottom: 1 }}>
                                        <label htmlFor="status">Status</label><span style={{ color: 'red' }}>*</span>
                                    </Box>
                                    <FormControl fullWidth>
                                        <InputLabel id="status-label">Status</InputLabel>
                                        <Select
                                            sx={{ textTransform: 'capitalize' }}
                                            size="small"
                                            labelId="status-label"
                                            id="status"
                                            name="status"
                                            value={formik.values.status}
                                            label="Status"
                                            onChange={formik.handleChange}
                                        >
                                            <MenuItem value={projectStatus.PENDING} sx={{ textTransform: 'capitalize' }}>{projectStatus.PENDING}</MenuItem>
                                            <MenuItem value={projectStatus.VOIDED} sx={{ textTransform: 'capitalize' }}>{projectStatus.VOIDED}</MenuItem>
                                            <MenuItem value={projectStatus.APPROVED} sx={{ textTransform: 'capitalize' }}>{projectStatus.APPROVED}</MenuItem>
                                        </Select>
                                    </FormControl>
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
                                    <Box sx={{ display: { sm: "block", xs: "none" }, marginBottom: 1 }}>
                                        <label htmlFor="name">Date</label><span style={{ color: 'red' }}>*</span>
                                    </Box>
                                    <TextField
                                        disabled="true"
                                        id="date"
                                        name="creator"
                                        label="Enter Create Date"
                                        size="small"
                                        variant="outlined"
                                        InputProps={{
                                            style: {
                                                color: "black",
                                                borderRadius: 4,
                                                backgroundColor: "white",
                                            },
                                        }}

                                        sx={{
                                            color: { sm: "black", xs: "white" },
                                            width: "100%",
                                        }}
                                        value={createdDate}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 1,
                                        paddingY: { sm: 0, xs: 2 },
                                        flexGrow: 1
                                    }}
                                >
                                    <Box sx={{ display: { sm: "block", xs: "none" }, marginBottom: 1 }}>
                                        <label htmlFor="status">Name</label><span style={{ color: 'red' }}>*</span>
                                    </Box>
                                    <TextField
                                        id="name"
                                        name="name"
                                        label="Enter Project Name"
                                        size="small"
                                        variant="outlined"
                                        InputProps={{
                                            endAdornment: formik.values.name ? (
                                                <InputAdornment
                                                    position="end"
                                                    sx={{ cursor: "pointer" }}
                                                    onClick={() => {

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
                                                backgroundColor: "white",
                                            },
                                            inputProps: { min: 0, max: 50 },
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
                                        style={{ padding: '10px', borderColor: '#cccc', borderRadius: '5px' }}
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
                        </Box>
                    </Box>
                    {/** Customer Select Block */}
                    <Box sx={{ width: { md: "auto", xs: "100%" } }}>
                        <Typography sx={{ fontSize: '20px', fontWeight: 800 }}>Customer</Typography>
                        <Box sx={{ display: "flex", flexDirection: 'column', gap: 1, padding: 1 }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 1,
                                    paddingY: { sm: 0, xs: 2 },
                                }}
                            >
                                <Box sx={{ display: { sm: "block", xs: "none" }, marginBottom: 1 }}>
                                    <label htmlFor="name">Customer</label><span style={{ color: 'red' }}>*</span>
                                </Box>
                                <TextField
                                    id="customer"
                                    name="customer"
                                    label="Select a Customer"
                                    size="small"
                                    variant="outlined"
                                    onClick={handleCustomerSelect}
                                    InputProps={{
                                        endAdornment: selectedCustomer ? (
                                            <InputAdornment
                                                position="end"
                                                sx={{ cursor: "pointer" }}
                                                onClick={(event) => { handleCustomerUnSelect(event) }}
                                            >
                                                <Close sx={{}} />
                                            </InputAdornment>
                                        ) : (
                                            ""
                                        ),
                                        readOnly: true,
                                        style: {
                                            color: "black",
                                            borderRadius: 4,
                                            backgroundColor: "white",
                                        },
                                    }}

                                    sx={{
                                        color: { sm: "black", xs: "white" },
                                        width: "100%",
                                    }}
                                    value={formik.values.customer}
                                    onChange={() => { }}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', paddingX: 0.5, gap: 0.6, }}><Typography >{selectedCustomer?.email}</Typography></Box>
                            <Box sx={{ display: 'flex', paddingX: 0.5, gap: 0.6, flexWrap: 'wrap' }}><Typography>{selectedCustomer?.address}</Typography></Box>

                        </Box>
                    </Box>
                    {/** Address Select Block */}
                    <Box sx={{ width: { md: "auto", xs: "100%" } }}>
                        <Typography sx={{ fontSize: '20px', fontWeight: 800 }}>Address</Typography>
                        <Box sx={{ display: "flex", flexDirection: 'column', gap: 1, padding: 1 }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 1,
                                    paddingY: { sm: 0, xs: 2 },
                                }}
                            >
                                <Box sx={{ display: { sm: "block", xs: "none" }, marginBottom: 1 }}>
                                    <label htmlFor="name">Project Location</label><span style={{ color: 'red' }}>*</span>
                                </Box>
                                <TextField
                                    disabled={!selectedCustomer}
                                    id="address"
                                    name="address"
                                    label="Select an Address"
                                    size="small"
                                    variant="outlined"
                                    onClick={handleAddressSelect}
                                    InputProps={{
                                        endAdornment: selectedAddress ? (
                                            <InputAdornment
                                                position="end"
                                                sx={{ cursor: "pointer" }}
                                                onClick={(event) => { handleAddressUnSelect(event) }}
                                            >
                                                <Close sx={{}} />
                                            </InputAdornment>
                                        ) : (
                                            ""
                                        ),
                                        readOnly: true,
                                        style: {
                                            color: "black",
                                            borderRadius: 4,
                                            backgroundColor: "white",
                                        },
                                    }}

                                    sx={{
                                        color: { sm: "black", xs: "white" },
                                        width: "100%",
                                    }}
                                    value={formik.values.address}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', paddingX: 0.5, gap: 0.5 }} ><Typography sx={{ fontSize: '16px' }}>{selectedAddress?.street}</Typography></Box>
                            <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'baseline', paddingX: 0.5 }}>
                                <Typography sx={{ fontSize: '16px' }}>{selectedAddress?.state},</Typography>
                                <Typography sx={{ fontSize: '16px' }}>{selectedAddress?.city}</Typography>
                                <Typography sx={{ fontSize: '16px' }}>{selectedAddress?.postalCode}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', paddingX: 0.5, gap: 0.5 }} ><Typography sx={{ fontSize: '16px' }}>{selectedAddress?.country}</Typography></Box>
                        </Box>
                    </Box>
                </Box>
                {/** Section 2 */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, alignItems: 'baseline' }}>
                    <Box>
                        <Typography sx={{ fontSize: { sm: '17px', xs: '15px' }, fontWeight: 600 }}>Please fill in all fields marked with * sign.</Typography>
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
                            disabled={!selectedCustomer || !selectedAddress}
                            variant="contained">{updateLoading || createLoading ? <CircularProgress sx={{ color: updateLoading || createLoading ? "white" : "#8477da" }} size={24} /> : projectState === 'create' ? "Save Project" : "Save Changes"}</Button>
                    </Box>
                </Box>
            </form>
        </Box>
        {/** Section 3 */}
        {projectState === 'edit' && <Box>
            <Typography sx={{ fontSize: '22px', fontWeight: 800, marginY: 1 }}>Estimates</Typography>
            <Box sx={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', borderRadius: '5px', padding: { md: 2, xs: 1 } }}>
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
            </Box>
        </Box>}
        <CustomerSelect open={openCustomerSelectModal} handleClose={() => setOpenCustomerSelectModal(false)} selectedCustomer={selectedCustomer} setSelectedCustomer={handleCustomerChange} />
        <AddressSelect open={openAddressSelectModal} handleClose={() => setOpenAddressSelectModal(false)} selectedAddress={selectedAddress} setSelectedAddress={handleAddressChange} selectedCustomer={selectedCustomer} />
    </Box>;
}
export default ProjectInfoComponent;