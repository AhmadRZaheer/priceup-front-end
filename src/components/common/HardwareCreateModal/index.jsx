import { useEffect, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import InputImageIcon from "@/Assets/imageUploader.svg";
import { useState } from "react";
import { CircularProgress, Grid, IconButton, TextField } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { backendURL } from "@/utilities/common";
import DefaultImageIcon from "../../../Assets/DefaultIMG.png";
import { CloseTwoTone } from "@mui/icons-material";

const style = {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    gap: '19px',
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 809,
    bgcolor: "#FFFFFF",
    borderRadius: "12px",
    p: '24px 16px 24px 16px',
};

export default function HardwareCreateModal({
    open,
    close,
    isLoading,
    handleCreate,
    hardwareType
}) {
    const [selectedImage, setSelectedImage] = useState(null);
    const inputRef = useRef(null); // Create a ref for the file input
    const onDrop = (acceptedFiles) => {
        setSelectedImage(acceptedFiles[0]);
        formik.setFieldValue("image", acceptedFiles[0]);
    };

    const { getInputProps } = useDropzone({ onDrop });

    const validationSchema = Yup.object().shape({
        image: Yup.mixed(),
        name: Yup.string()
            .min(3, "Name must be at least 3 characters long")
            .required("Name is required"),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            image: "",
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            {
                handleCreate(values);
            }
        },
    });

    useEffect(() => {
        return () => {
            setSelectedImage(null);
            formik.resetForm();
        };
    }, [open]);

    const handleButtonClick = () => {
        inputRef.current.click(); // Trigger click on the file input
    };

    return (
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
                backgroundColor: "rgba(5, 0, 35, 0.1)",
                '.MuiModal-backdrop': {
                    backgroundColor: "rgba(5, 0, 35, 0.1)",
                }
            }}
        >
            <Box sx={style}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        // alignItems: "baseline",
                    }}
                >
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <Typography sx={{
                            fontWeight: 700,
                            fontSize: 18,
                            lineHeight: '21.09px',
                            fontFamily: '"Roboto",sans-serif !important'
                        }}>{`Add ${hardwareType}`}</Typography>
                        <Typography
                            sx={{
                                color: "#212528",
                                lineHeight: '21.86px',
                                fontWeight: 600,
                                // mt:'5px',
                                fontSize: 16,
                                opacity: '70%'
                            }}
                        >
                            {`Add ${hardwareType} details`}
                        </Typography>
                    </Box>
                    <Box>
                        <IconButton
                            sx={{ p: 0 }}
                            onClick={() => {
                                close();
                            }}
                        >
                            <CloseTwoTone />
                        </IconButton>
                    </Box>
                </Box>
                <Box
                    sx={{
                        background: "#F3F5F6",
                        padding: "16px",
                        borderRadius: "12px",
                    }}
                > <Typography
                    sx={{
                        color: "#000000",
                        lineHeight: '16.39px',
                        fontSize: "12px",
                        fontWeight: 600,
                    }}
                >
                        {hardwareType} image
                    </Typography>
                    <Box sx={{ display: "flex", gap: '19px', my: 2 }}>
                        <Box>
                            {formik.values.image !== undefined && formik.values.image !== null && formik.values.image !== '' ? (
                                <img
                                    width={"84px"}
                                    height={"84px"}
                                    style={{ overflow: "hidden", borderRadius: "100%" }}
                                    src={typeof formik.values.image === 'string' ? `${backendURL}/${formik.values.image}` : URL.createObjectURL(formik.values.image)}
                                    alt="logo team"
                                />
                            ) : (
                                <img
                                    width={"84px"}
                                    height={"84px"}
                                    style={{ overflow: "hidden", borderRadius: "100%" }}
                                    src={DefaultImageIcon}
                                    alt="Selected"
                                />
                            )}
                        </Box>
                        <input
                            accept="image/*"
                            id="image-input"
                            type="file"
                            {...getInputProps()}
                            ref={inputRef} // Attach the ref to the input
                            style={{ display: "none" }}
                        />
                        <label htmlFor="image-input" style={{ alignSelf: 'center' }}>
                            <Box
                                sx={{
                                    // padding: 2,
                                }}
                            >
                                <Button
                                    sx={{
                                        color: "#000000",
                                        fontWeight: 600,
                                        borderRadius: "54px !important",
                                        border: "1px solid #D4DBDF",
                                        textTransform: "capitalize",
                                        p: '10px 12px !important',
                                        lineHeight: '21px',
                                        fontSize: 16
                                    }}
                                    onClick={handleButtonClick}
                                >
                                    Upload Image
                                </Button>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: "#8477DA",
                                        fontSize: "12px",
                                        fontWeight: 600,
                                        lineHeight: '16.39px', mt: 0.5
                                    }}
                                >
                                    SVG, PNG, JPG or GIF (max. 800x400px)
                                </Typography>
                            </Box>
                        </label>

                    </Box>
                    <Box>
                        <Box sx={{ width: "100%", }} className='model-field'>
                            <Typography className="input-label-text">{hardwareType} Label</Typography>
                            <TextField
                                size="small"
                                placeholder={`Enter ${hardwareType} Label`}
                                name="name"
                                className="custom-textfield"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                sx={{ '.MuiOutlinedInput-input': { p: '10px !important' } }}
                                // error={formik.touched.locationName}
                                // helperText={
                                //   formik.touched.locationName && formik.errors.locationName
                                // }
                                variant="outlined"
                                fullWidth
                            />
                            {formik.touched.name && formik.errors.name && (
                                <Typography variant="caption" color="error" sx={{ paddingLeft: '5px' }}>
                                    {formik.errors.name}
                                </Typography>
                            )}
                        </Box>
                        {/* <Typography>Name</Typography>
                        <TextField
                            placeholder="Name"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                            variant="outlined"
                            fullWidth
                        /> */}
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "end",
                        width: "100%",
                    }}
                >
                    <Box sx={{ display: "flex", gap: '12px' }}>
                        <Button
                            variant="outlined"
                            onClick={close}
                            sx={{
                                color: "#212528",
                                border: "1px solid #D6DAE3",
                                width: "fit-content",
                                fontWeight: 600,
                                fontSize: '16px'
                            }}
                        >
                            Cancel
                        </Button>
                        <Button

                            onClick={formik.handleSubmit}
                            variant="contained"
                            disabled={isLoading}
                            sx={{
                                backgroundColor: "#8477DA",
                                "&:hover": {
                                    backgroundColor: "#8477da",
                                },
                                position: "relative",
                                fontWeight: 600,
                                fontSize: '16px'
                            }}
                        >
                            {isLoading ? (
                                <CircularProgress size={24} sx={{ color: "#8477DA" }} />
                            ) : (
                                "Create"
                            )}
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
}
