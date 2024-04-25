import { useFormik } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import InputImageIcon from "../../Assets/imageUploader.svg";

import React, { useEffect, useState } from "react";
import { CircularProgress, TextField } from "@mui/material";
import { useDropzone } from "react-dropzone";
import {
    useEditCustomer,
} from "../../utilities/ApiHooks/customer";
import { backendURL } from "../../utilities/common";

const style = {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    gap: 2,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: "12px",
    p: 4,
};

export default function EditCustomer({ open, close, data, refetch }) {
    const [selectedImage, setSelectedImage] = useState(data?.image || null);

    const onDrop = (acceptedFiles) => {
        setSelectedImage(acceptedFiles[0]);
        formik.setFieldValue("image", acceptedFiles[0]);
    };

    const { getInputProps } = useDropzone({ onDrop });

    const {
        mutate: editCustomer,
        isLoading: LoadingForEdit,
        isSuccess: SuccessForEdit,
    } = useEditCustomer();

    useEffect(() => {
        if (SuccessForEdit) {
            setSelectedImage(null);
            refetch();
            close();
        }
    }, [SuccessForEdit]);

    const handleEditClick = (props) => {
        const id = data;
        editCustomer(props, id);
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string().email("Invalid email address"),
        image: Yup.mixed()
    });

    const formik = useFormik({
        initialValues: {
            name: data?.name,
            email: data?.email,
            image: data?.image,
            phone: data?.phone
        }
        ,
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            {
                handleEditClick({ customerData: values, id: data._id });
                // resetForm();
            }
        },
    });

    return (
        <div>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{
                    backdropFilter: "blur(2px)",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
            >
                <Box sx={style}>
                    <Box>
                        <Typography sx={{ fontWeight: "bold", fontSize: 18 }}>
                            Edit Customer
                        </Typography>
                    </Box>

                    <Box>
                        <input
                            accept="image/*"
                            id="image-input"
                            type="file"
                            {...getInputProps()}
                            style={{ display: "none" }}
                        />
                        <Typography sx={{ color: "black", marginTop: 1 }}>
                            Add Image
                        </Typography>
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
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "end",
                            }}
                        >
                            {selectedImage ? (
                                <img
                                    width={"80px"}
                                    height={"80px"}
                                    src={URL.createObjectURL(selectedImage)}
                                    alt="Selected"
                                />
                            ) : data?.image !== undefined || null ? (
                                <img
                                    width={"80px"}
                                    height={"80px"}
                                    src={`${backendURL}/${data?.image}`}
                                    alt="logo team"
                                />
                            ) : (
                                ""
                            )}
                        </Box>
                    </Box>
                    <Box>
                        <Typography>Name</Typography>
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
                        />
                    </Box>
                    <Box>
                        <Typography>Email</Typography>
                        <TextField
                            placeholder="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && Boolean(formik.errors.email)}
                            helperText={formik.touched.name && formik.errors.email}
                            variant="outlined"
                            fullWidth
                        />
                    </Box>
                    <Box>
                        <Typography>Phone</Typography>
                        <TextField
                            placeholder="phone"
                            name="phone"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.phone && Boolean(formik.errors.phone)}
                            helperText={formik.touched.phone && formik.errors.phone}
                            variant="outlined"
                            fullWidth
                        />
                    </Box>
                    <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
                        <Button
                            variant="outlined"
                            onClick={close}
                            sx={{
                                color: "#101828",
                                border: "1px solid #D0D5DD",
                                width: "50%",
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={formik.handleSubmit}
                            disabled={LoadingForEdit}
                            sx={{
                                backgroundColor: "#8477DA",
                                width: "50%",
                                "&:hover": {
                                    backgroundColor: "#8477da",
                                },
                            }}
                        >
                            {LoadingForEdit ? (
                                <CircularProgress size={24} sx={{ color: "#8477DA" }} />
                            ) : (
                                "Update"
                            )}
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
