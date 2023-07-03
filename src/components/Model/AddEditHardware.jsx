import * as React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import { useState } from "react";
import {
    CircularProgress,
    FormControl,
    IconButton,
    TextField,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useDropzone } from "react-dropzone";

import {
    useCreateFinish,
    useEditFinish,
} from "../../utilities/ApiHooks/Finishes";
import Snackbars from "./SnackBar";
import { useCreateHardware, useEditHardware } from "../../utilities/ApiHooks/Hardware";

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
    borderRadius: "4px",
    p: 4,
};

export default function AddEditHardware({
    open,
    close,
    isEdit,
    data,
    refetch,
    showSnackbar,
    categorySlug
}) {
    // console.log(data, "data not id");
    // const [openSnackBarAlert, setOpenSnakbarAlert] = React.useState(false);

    const [selectedImage, setSelectedImage] = useState(null);

    const onDrop = (acceptedFiles) => {
        setSelectedImage(acceptedFiles[0]);
        formik.setFieldValue("image", acceptedFiles[0]);
    };

    const { getInputProps } = useDropzone({ onDrop });
    // hook for add
    const {
        mutate: addHardware,
        isLoading: LoadingForAdd,
        isError: ErrorForAdd,
        isSuccess: CreatedSuccessfully,
    } = useCreateHardware();
    // hook for edit
    const {
        mutate: editHardware,
        isLoading: LoadingForEdit,
        isError: ErrorForEdit,
        isSuccess: SuccessForEdit,
    } = useEditHardware();

    // React.useEffect(() => {
    //   if (CreatedSuccessfully || SuccessForEdit) {
    //     finishesRefetch();
    //     if (CreatedSuccessfully) {
    //       showSnackbar("Created Successfully ", "success");
    //     }
    //     showSnackbar("UpDated Successfully ", "success");
    //   }
    // }, [CreatedSuccessfully, SuccessForEdit]);

    React.useEffect(() => {
        if (CreatedSuccessfully) {
            refetch();
            showSnackbar("Created Successfully ", "success");
            close();
        }

        if (SuccessForEdit) {
            refetch();
            showSnackbar("Updated Successfully ", "success");
            close();
        }
    }, [CreatedSuccessfully, SuccessForEdit]);

    const handleCreateClick = (props) => {
        console.log(props, "props for creat hook in model");
        addHardware(props);
    };

    const handleEditClick = (props) => {
        console.log(props, "props for edit to refetch");
        const id = data;
        editHardware(props, id);
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Hardware Label is required"),
        image: Yup.mixed(),
        // .required("Image is required")
        // .test(
        //   "fileType",
        //   "Only image files are allowed (JPEG, PNG, GIF)",
        //   (value) => {
        //     if (value) {
        //       const supportedFormats = ["image/jpeg", "image/png", "image/gif"];
        //       return supportedFormats.includes(value.type);
        //     }
        //     return false;
        //   }
        // )
        // .test(
        //   "fileSize",
        //   "Image size should be less than 5MB",
        //   (value) => value && value.size <= 5 * 1024 * 1024
        // ),
    });

    const formik = useFormik({
        initialValues: isEdit
            ? {
                name: data?.name,
                image: "",
            }
            : {
                name: "",
                image: "",
                hardware_category_slug: categorySlug
            },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            {


                isEdit ? handleEditClick({ hardwareData: values, id: data._id }) : handleCreateClick(values);

                resetForm();
            }
        },
    });

    return (
        <div>
            <Modal
                open={open}
                // onClose={close}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "baseline",
                        }}
                    >
                        <Typography>{isEdit ? "Edit Hardware" : "Add Hardware"}</Typography>
                        <IconButton onClick={close}>
                            <Close />
                        </IconButton>
                    </Box>

                    <Box>
                        <input
                            accept="image/*"
                            id="image-input"
                            type="file"
                            {...getInputProps()}
                            style={{ display: "none" }}
                        />

                        {formik.errors.image && (
                            <Typography color="error">{formik.errors.image}</Typography>
                        )}
                        {selectedImage ? (
                            <img
                                width={"80px"}
                                height={"80px"}
                                src={URL.createObjectURL(selectedImage)}
                                alt="Selected"
                            />
                        ) : (
                            <label htmlFor="image-input">
                                <Button
                                    style={{
                                        height: "100px",
                                        width: "100px",
                                        boxShadow: "0px 0px 2px blue",
                                    }}
                                    component="span"
                                >
                                    Upload Image
                                </Button>
                            </label>
                        )}
                    </Box>
                    <Box>
                        <Typography>Hardware Label</Typography>
                        <TextField
                            placeholder="Hardware Label"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.name &&
                                Boolean(formik.errors.name)
                            }
                            helperText={
                                formik.touched.name && formik.errors.name
                            }
                            variant="outlined"
                            fullWidth
                        />
                    </Box>
                    <Box onClick={formik.handleSubmit}>
                        <Button
                            fullWidth
                            variant="contained"
                            disabled={LoadingForAdd || LoadingForEdit}
                        >
                            {LoadingForAdd || LoadingForEdit ? (
                                <CircularProgress size={24} />
                            ) : isEdit ? (
                                "Update"
                            ) : (
                                "Create"
                            )}
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
