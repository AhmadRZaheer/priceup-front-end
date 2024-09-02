import { useEffect, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import InputImageIcon from "@/Assets/imageUploader.svg";
import { useState } from "react";
import { CircularProgress, IconButton, TextField } from "@mui/material";
import { useDropzone } from "react-dropzone";
import DefaultImageIcon from "../../../Assets/default-image.jpg";
import { backendURL } from "@/utilities/common";
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

export default function HardwareEditModal({
    open,
    close,
    data,
    isLoading,
    handleEdit,
    hardwareType
}) {
    const [selectedImage, setSelectedImage] = useState(null);
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
            name: data?.name,
            image: data?.image,
            id: data?._id,
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            {
                handleEdit(values);
            }
        },
    });
    useEffect(() => {
        return () => {
            setSelectedImage(null);
            formik.resetForm();
        };
    }, [open]);

    const inputRef = useRef(null); // Create a ref for the file input
    const handleButtonClick = () => {
        inputRef.current.click(); // Trigger click on the file input
    };
    const handleDiscard = () => {
        formik.resetForm();
    };


    return (
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
                // backdropFilter: "blur(2px)",
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
                        }}>{`Edit ${hardwareType}`}</Typography>
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
                            {`Edit ${hardwareType} details`}
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

                {/* <Box>
                    <input
                        accept="image/svg+xml,image/png,image/jpeg,image/gif"
                        id="image-input"
                        type="file"
                        {...getInputProps()}
                        style={{ display: "none" }}
                    />

                    {formik.errors.image && (
                        <Typography color="error">{formik.errors.image}</Typography>
                    )}

                    <label htmlFor="image-input">
                        <Box
                            sx={{
                                border: "1px solid #EAECF0",
                                textAlign: "center",
                                padding: 2,
                            }}
                        >
                            <Box sx={{ height: 60 }}>
                                <img
                                    width={60}
                                    src={InputImageIcon}
                                    alt="icon of input image"
                                />
                            </Box>
                            <span
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: 4,
                                }}
                            >
                                <Typography sx={{ color: "#8477DA" }}>
                                    Click to Upload
                                </Typography>
                            </span>
                            <Typography variant="body2" sx={{ color: "#667085" }}>
                                SVG, PNG, JPG or GIF (max. 800x400px)
                            </Typography>
                        </Box>
                    </label>
                    {selectedImage ? (
                        <img
                            width={"80px"}
                            height={"80px"}
                            src={URL.createObjectURL(selectedImage)}
                            alt="Selected"
                        />
                    ) : data?.image ? (
                        <img
                            width={"80px"}
                            height={"80px"}
                            src={`${backendURL}/${data?.image}`}
                            alt="logo team"
                        />
                    ) : (
                        ""
                    )}
                    {formik.errors.image && (
                        <Typography color="error">{formik.errors.image}</Typography>
                    )}
                </Box> */}

                <Box
                    sx={{
                        background: "#F3F5F6",
                        padding: "16px",
                        borderRadius: "12px",
                    }}
                >
                    <Typography
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
                    <Box >
                        <Box sx={{ width: "100%", }} className='model-field'>
                            <Typography className="input-label-text">Hardware Label</Typography>
                            <TextField
                                size="small"
                                placeholder="Enter Hardware Label"
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
                            onClick={handleDiscard}
                            sx={{
                                color: "#212528",
                                border: "1px solid #D6DAE3",
                                width: "fit-content",
                                fontWeight: 600,
                                fontSize: '16px'
                            }}
                        >
                            Discard Changes
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
                                "Save Changes"
                            )}
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
}
