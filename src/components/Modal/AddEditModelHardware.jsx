import * as React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import InputImageIcon from "../../Assets/imageUploader.svg";
import DefaultImageIcon from "../../Assets/default-image.jpg";
import { useState } from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    CircularProgress,
    Grid,
    IconButton,
    TextField,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import {
    useCreateHardware,
    useEditHardware,
} from "../../utilities/ApiHooks/hardware";
import { useEffect } from "react";
import { backendURL } from "../../utilities/common";
import CustomInputField from "../ui-components/CustomInput";
import { CloseTwoTone, ExpandMore } from "@mui/icons-material";
import { SingleFieldEdit } from "../ui-components/SingleFieldEdit";

const style = {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    gap: "19px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 809,
    bgcolor: "#FFFFFF",
    borderRadius: "12px",
    p: "24px 16px 24px 16px",
    border: "1px solid #D0D5DD",
};

export default function AddEditModelHardware({
    open,
    close,
    isEdit,
    data,
    refetch,
    categorySlug,
}) {
    const [selectedImage, setSelectedImage] = useState(null);

    const onDrop = (acceptedFiles) => {
        setSelectedImage(acceptedFiles[0]);
        formik.setFieldValue("image", acceptedFiles[0]);
    };

    const { getInputProps } = useDropzone({ onDrop });
    const {
        mutate: addHardware,
        isLoading: LoadingForAdd,
        isSuccess: CreatedSuccessfully,
    } = useCreateHardware();
    const {
        mutate: editHardware,
        isLoading: LoadingForEdit,
        isSuccess: SuccessForEdit,
    } = useEditHardware();

    useEffect(() => {
        if (CreatedSuccessfully) {
            resetFormHandle();
            refetch();
            close();
        }

        if (SuccessForEdit) {
            refetch();
            close();
            console.log(SuccessForEdit, "effect s");
        }
        console.log("effect");
    }, [CreatedSuccessfully, SuccessForEdit]);

    const handleCreateClick = (props) => {
        addHardware(props);
    };

    const handleEditClick = (props) => {
        const id = data;
        editHardware(props, id);
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Hardware Label is required"),
        image: Yup.mixed(),
    });

    const formik = useFormik({
        initialValues: isEdit
            ? {
                name: data?.name,
                oneInchHoles: data?.oneInchHoles,
                hingeCut: data?.hingeCut,
                clampCut: data?.clampCut,
                notch: data?.notch,
                outages: data?.outages,
                image: data?.image,
            }
            : {
                name: "",
                image: "",
                oneInchHoles: 0,
                hingeCut: 0,
                clampCut: 0,
                notch: 0,
                outages: 0,
                hardware_category_slug: categorySlug,
            },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            {
                isEdit
                    ? handleEditClick({ hardwareData: values, id: data._id })
                    : handleCreateClick(values);
                // resetFormHandle();
            }
        },
    });
    const typeOfValue = () => {
        let statement = "";
        if (
            formik.values.clampCut === 0 &&
            formik.values.hingeCut === 0 &&
            formik.values.notch === 0 &&
            formik.values.oneInchHoles === 0 &&
            formik.values.outages === 0
        ) {
            statement = "Using Default Values";
        } else {
            statement = "Using Customized Values";
        }
        return statement;
    };

    const resetFormHandle = async () => {
        if (CreatedSuccessfully || SuccessForEdit) {
            await formik.resetForm();
            setSelectedImage(null);
        }
    };
    const resetData =()=>{
        formik.resetForm()
    }
    //Image
    const inputRef = React.useRef(null);
    const handleButtonClick = () => {
        inputRef.current.click(); // Trigger click on the file input
    };

    return (
        <div>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{
                    // backdropFilter: "blur(2px)",
                    backgroundColor: "rgba(5, 0, 35, 0.1)",
                    ".MuiModal-backdrop": {
                        backgroundColor: "rgba(5, 0, 35, 0.1)",
                    },
                }}
            >
                <Box sx={style}>

                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                            <Typography
                                sx={{
                                    fontWeight: 700,
                                    fontSize: 18,
                                    lineHeight: "21.09px",
                                    fontFamily: '"Roboto",sans-serif !important',
                                }}
                            >
                                {isEdit ? "Edit Hardware" : "Add Hardware"}
                            </Typography>
                            <Typography
                                sx={{
                                    color: "#212528",
                                    lineHeight: "21.86px",
                                    fontWeight: 600,
                                    // mt:'5px',
                                    fontSize: 16,
                                    opacity: "70%",
                                }}
                            >
                                {isEdit ? "Edit" : "Add"} Hardware details.
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
                    >
                        <Typography
                            sx={{
                                color: "#000000",
                                lineHeight: "16.39px",
                                fontSize: "12px",
                                fontWeight: 600,
                            }}
                        >
                            Hardware image
                        </Typography>
                        <Box sx={{ display: "flex", gap: "19px", my: 2 }}>
                            <Box>
                                {formik.values.image !== undefined &&
                                    formik.values.image !== null &&
                                    formik.values.image !== "" ? (
                                    <img
                                        width={"84px"}
                                        height={"84px"}
                                        style={{ overflow: "hidden", borderRadius: "100%" }}
                                        src={
                                            typeof formik.values.image === "string"
                                                ? `${backendURL}/${formik.values.image}`
                                                : URL.createObjectURL(formik.values.image)
                                        }
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

                            <label htmlFor="image-input" style={{ alignSelf: "center" }}>
                                <Box
                                    sx={
                                        {
                                            // padding: 2,
                                        }
                                    }
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
                                            lineHeight: "16.39px",
                                            mt: 0.5,
                                        }}
                                    >
                                        SVG, PNG, JPG or GIF (max. 800x400px)
                                    </Typography>
                                </Box>
                            </label>
                        </Box>
                    </Box>

                    {/* <Box>
            <input
              accept="image/*"
              id="image-input"
              type="file"
              {...getInputProps()}
              style={{ display: "none" }}
            />
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
            <aside
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                marginTop: 16,
              }}
            >
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
            </aside>
            {formik.errors.image && (
              <Typography color="error">{formik.errors.image}</Typography>
            )}
          </Box> */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <Box sx={{ width: "100%", }} className='model-field'>
                            <Typography className="input-label-text">Hardware Label</Typography>
                            <CustomInputField
                                size="small"
                                placeholder="Enter Hardware Label"
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
                        <Box sx={{ width: "100%", }} className='model-field'>
                            <Typography className="input-label-text">Fabrication </Typography>
                            <Accordion
                                sx={{
                                    background: '#FFFFFF', boxShadow: 'none', border: '1px solid #D4DBDF', borderRadius: '4px', "&.Mui-expanded": {
                                        borderRadius: '4px 4px 12px 12px'
                                    }
                                }}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMore sx={{ color: '#000000' }} />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    sx={{
                                        p: '10px',
                                        m: '0px !important',
                                        minHeight: "40px",
                                        "&.Mui-expanded": {
                                            minHeight: "40px",
                                            height: '40px',
                                            borderBottom: '1px solid #D0D5DD',
                                        },
                                        ".MuiAccordionSummary-content": {
                                            margin: '0px !important'
                                        }
                                    }}
                                >
                                    <Typography sx={{ fontSize: '14px', lineHeight: '19.12px', color: '#959EA3' }}> ( {typeOfValue()} )</Typography>
                                    {/* <Typography sx={{ fontWeight: "bold", fontSize: 22 }}>
                                        Fabrication
                                        <span
                                            style={{
                                                fontSize: 15,
                                                paddingLeft: 6,
                                                fontWeight: "lighter",
                                            }}
                                        >
                                            ( {typeOfValue()} )
                                        </span>
                                    </Typography> */}
                                </AccordionSummary>
                                <AccordionDetails
                                    sx={{
                                        p: "24px 30px"
                                    }}
                                >
                                    <Grid container spacing={2}>
                                        <SingleFieldEdit
                                            label='1" Holes'
                                            value={formik.values.oneInchHoles}
                                            onChange={(event) => {
                                                const userInput = event.target.value;
                                                if (/^\d*$/.test(userInput)) {
                                                    formik.handleChange(event);
                                                }
                                            }}
                                            onBlur={formik.handleBlur}
                                            error={
                                                formik.touched.oneInchHoles &&
                                                Boolean(formik.errors.oneInchHoles)
                                            }
                                            helperText={
                                                formik.touched.oneInchHoles &&
                                                formik.errors.oneInchHoles
                                            }
                                            placeholder='1" Holes'
                                            name="oneInchHoles"
                                        />
                                        <SingleFieldEdit
                                            label="Clamp Cut Out"
                                            value={formik.values.clampCut}
                                            onChange={(event) => {
                                                const userInput = event.target.value;
                                                if (/^\d*$/.test(userInput)) {
                                                    formik.handleChange(event);
                                                }
                                            }}
                                            onBlur={formik.handleBlur}
                                            error={
                                                formik.touched.clampCut &&
                                                Boolean(formik.errors.clampCut)
                                            }
                                            helperText={
                                                formik.touched.clampCut && formik.errors.clampCut
                                            }
                                            placeholder="Clamp Cut Out"
                                            name="clampCut"
                                        />
                                        <SingleFieldEdit
                                            label="Hinge Cut Out"
                                            value={formik.values.hingeCut}
                                            onChange={(event) => {
                                                const userInput = event.target.value;
                                                if (/^\d*$/.test(userInput)) {
                                                    formik.handleChange(event);
                                                }
                                            }}
                                            onBlur={formik.handleBlur}
                                            error={
                                                formik.touched.hingeCut &&
                                                Boolean(formik.errors.hingeCut)
                                            }
                                            helperText={
                                                formik.touched.hingeCut && formik.errors.hingeCut
                                            }
                                            placeholder="Hinge Cut Out"
                                            name="hingeCut"
                                        />
                                        <SingleFieldEdit
                                            label="Notch"
                                            value={formik.values.notch}
                                            onChange={(event) => {
                                                const userInput = event.target.value;
                                                if (/^\d*$/.test(userInput)) {
                                                    formik.handleChange(event);
                                                }
                                            }}
                                            onBlur={formik.handleBlur}
                                            error={
                                                formik.touched.notch && Boolean(formik.errors.notch)
                                            }
                                            helperText={formik.touched.notch && formik.errors.notch}
                                            placeholder="Notch"
                                            name="notch"
                                        />
                                        <SingleFieldEdit
                                            label="Outages"
                                            value={formik.values.outages}
                                            onChange={(event) => {
                                                const userInput = event.target.value;
                                                if (/^\d*$/.test(userInput)) {
                                                    formik.handleChange(event);
                                                }
                                            }}
                                            onBlur={formik.handleBlur}
                                            error={
                                                formik.touched.outages && Boolean(formik.errors.outages)
                                            }
                                            helperText={formik.touched.outages && formik.errors.outages}
                                            placeholder="Outages"
                                            name="outages"
                                        />
                                    </Grid>
                                    {/* <Box>
                                        <Box sx={{ display: "flex", gap: 2 }}>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    gap: 1,
                                                    flexDirection: "column",
                                                    width: "45%",
                                                }}
                                            >
                                                <SingleFieldEdit
                                                    label='1" Holes'
                                                    value={formik.values.oneInchHoles}
                                                    onChange={(event) => {
                                                        const userInput = event.target.value;
                                                        if (/^\d*$/.test(userInput)) {
                                                            formik.handleChange(event);
                                                        }
                                                    }}
                                                    onBlur={formik.handleBlur}
                                                    error={
                                                        formik.touched.oneInchHoles &&
                                                        Boolean(formik.errors.oneInchHoles)
                                                    }
                                                    helperText={
                                                        formik.touched.oneInchHoles &&
                                                        formik.errors.oneInchHoles
                                                    }
                                                    placeholder='1" Holes'
                                                    name="oneInchHoles"
                                                />
                                                <SingleFieldEdit
                                                    label="Clamp Cut Out"
                                                    value={formik.values.clampCut}
                                                    onChange={(event) => {
                                                        const userInput = event.target.value;
                                                        if (/^\d*$/.test(userInput)) {
                                                            formik.handleChange(event);
                                                        }
                                                    }}
                                                    onBlur={formik.handleBlur}
                                                    error={
                                                        formik.touched.clampCut &&
                                                        Boolean(formik.errors.clampCut)
                                                    }
                                                    helperText={
                                                        formik.touched.clampCut && formik.errors.clampCut
                                                    }
                                                    placeholder="Clamp Cut Out"
                                                    name="clampCut"
                                                />
                                            </Box>

                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    gap: 1,
                                                    flexDirection: "column",
                                                    width: "45%",
                                                }}
                                            >
                                                <SingleFieldEdit
                                                    label="Hinge Cut Out"
                                                    value={formik.values.hingeCut}
                                                    onChange={(event) => {
                                                        const userInput = event.target.value;
                                                        if (/^\d*$/.test(userInput)) {
                                                            formik.handleChange(event);
                                                        }
                                                    }}
                                                    onBlur={formik.handleBlur}
                                                    error={
                                                        formik.touched.hingeCut &&
                                                        Boolean(formik.errors.hingeCut)
                                                    }
                                                    helperText={
                                                        formik.touched.hingeCut && formik.errors.hingeCut
                                                    }
                                                    placeholder="Hinge Cut Out"
                                                    name="hingeCut"
                                                />
                                                <SingleFieldEdit
                                                    label="Notch"
                                                    value={formik.values.notch}
                                                    onChange={(event) => {
                                                        const userInput = event.target.value;
                                                        if (/^\d*$/.test(userInput)) {
                                                            formik.handleChange(event);
                                                        }
                                                    }}
                                                    onBlur={formik.handleBlur}
                                                    error={
                                                        formik.touched.notch && Boolean(formik.errors.notch)
                                                    }
                                                    helperText={formik.touched.notch && formik.errors.notch}
                                                    placeholder="Notch"
                                                    name="notch"
                                                />
                                            </Box>
                                        </Box>
                                        <Box sx={{ width: "45%", mt: 1 }}>
                                            <SingleFieldEdit
                                                label="Outages"
                                                value={formik.values.outages}
                                                onChange={(event) => {
                                                    const userInput = event.target.value;
                                                    if (/^\d*$/.test(userInput)) {
                                                        formik.handleChange(event);
                                                    }
                                                }}
                                                onBlur={formik.handleBlur}
                                                error={
                                                    formik.touched.outages && Boolean(formik.errors.outages)
                                                }
                                                helperText={formik.touched.outages && formik.errors.outages}
                                                placeholder="Outages"
                                                name="outages"
                                            />
                                        </Box>
                                    </Box> */}
                                </AccordionDetails>
                            </Accordion>
                        </Box>


                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "end",
                            // marginTop: 2,
                            width: "100%",
                        }}
                    >

                        <Box sx={{ display: "flex", gap: '12px' }}>
                            <Button
                                variant="outlined"
                                onClick={isEdit ? resetData : close}
                                sx={{
                                    color: "#212528",
                                    border: "1px solid #D6DAE3",
                                    width: "fit-content",
                                    fontWeight: 600,
                                    fontSize: '16px',
                                    // p:'10px 16px !important'
                                }}
                            >
                                {isEdit ? "Discard Changes" : "Cancel"}
                            </Button>
                            <Button
                                variant="contained"
                                onClick={formik.handleSubmit}
                                disabled={LoadingForAdd || LoadingForEdit}
                                sx={{
                                    backgroundColor: "#8477DA",
                                    "&:hover": {
                                        backgroundColor: "#8477da",
                                    },
                                    padding: "10px 16px !important",
                                    position: "relative",
                                    fontWeight: 600,
                                    fontSize: '16px'
                                }}
                            >
                                {LoadingForAdd || LoadingForEdit ? (
                                    <CircularProgress size={24} sx={{ color: "#8477DA" }} />
                                ) : isEdit ? (
                                    "Update"
                                ) : (
                                    "Create"
                                )}
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
