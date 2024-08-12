import { selectedItem } from "@/redux/estimateCalculations";
import { useCreateEstimates } from "@/utilities/ApiHooks/estimate";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const { Close } = require("@mui/icons-material")
const { Modal, Box, Typography, TextField, Button, IconButton, CircularProgress } = require("@mui/material");
const { useFormik } = require("formik");

const EnterLabelModal = ({ handleClose, open, estimateConfig, estimateCategory, estimatesTotal, projectId }) => {
    const {
        mutateAsync,
        isLoading: estimateCreateLoading,
    } = useCreateEstimates();
    const navigate = useNavigate();
    const estimatesLayout = useSelector(selectedItem);
    const formik = useFormik({
        initialValues: {
            label: "",
        },
        onSubmit: (values) => {
            handleSave(values.label);
        },
    });

    const handleSave = async (label) => {
        try {
            await mutateAsync({
                estimateData: {
                    ...estimateConfig,
                    layout_id: estimatesLayout?._id || null,
                },
                label: label,
                category: estimateCategory,
                cost: Number(estimatesTotal),
                projectId: projectId
            });
            navigate(`/projects/${projectId}`);
        }
        catch (err) {
            console.log('error', err);
        }
    }

    return (<Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
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
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ textAlign: "center", p: 1 }}>Enter estimate label</Typography>
                    <IconButton onClick={handleClose}><Close /></IconButton>
                </Box>
                <form onSubmit={formik.handleSubmit}>
                    <Box sx={{ width: "100%", pb: 1 }}>
                        <Typography>Label</Typography>
                        <TextField
                            id="label"
                            name="label"
                            placeholder="Enter label"
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
                            type="button"
                            onClick={() => handleClose()}
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
                            Close
                        </Button>
                        <Button
                            disabled={estimateCreateLoading}
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
                            {estimateCreateLoading ? <CircularProgress /> : 'Submit'}
                        </Button>
                    </Box>
                </form>
            </Box>
        </Box>
    </Modal>)
}

export default EnterLabelModal;