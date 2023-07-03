import { Delete, Edit, ToggleOff, ToggleOn } from "@mui/icons-material";
import { Box, Checkbox, CircularProgress, FormControl, FormControlLabel, IconButton, Switch, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useDeleteHardwareFinish, useEditHardware } from "../../utilities/ApiHooks/Hardware";
import { useEffect } from "react";


const FinishItem = ({ data, index, refetch, hardwareId }) => {

    const { mutate: deleteFinish, isLoading: LoadingForDelete,
        isError: ErrorForDelete,
        isSuccess: SuccessForDelete } = useDeleteHardwareFinish();
    const {
        mutate: editFinish,
        isLoading: LoadingForEdit,
        isError: ErrorForEdit,
        isSuccess: SuccessForEdit,
    } = useEditHardware();
    const validationSchema = Yup.object().shape({
        partNumber: Yup.string().required('Hardware Part Number is required'),
        cost: Yup.number().required('Cost is required'),
        status: Yup.boolean().required('Status is required')
    });
    const formik = useFormik({
        initialValues: {
            partNumber: data.partNumber,
            cost: data.cost,
            status: data.status
        },
        validationSchema,
        onSubmit: async (values, resetForm) => {
            // Handle form submission
            // const updatedData = {
            const finishes = {
                [index]: {
                    partNumber: values.partNumber,
                    cost: values.cost,
                    status: values.status,
                },
            };
            // };
            editFinish({ finishesData: finishes, id: hardwareId });
            resetForm();
        },
    });

    const handleFinishDelete = (event) => {
        event.preventDefault();
        deleteFinish({ hardwareId: hardwareId, finishId: data._id });
    }

    useEffect(() => {
        if (SuccessForEdit || SuccessForDelete) {
            refetch();
        }
    }, [SuccessForEdit, SuccessForDelete]);

    return (<Box key={index}>
        <form onSubmit={formik.handleSubmit}>
            <Box
                style={{
                    display: "flex",
                    gap: 4,
                    alignContent: "center",
                    paddingTop: 4,
                    paddingBottom: 4,
                }}
            >
                <Box
                    style={{
                        width: "250px",
                        padding: 4,
                        alignItems: "center",
                    }}
                >
                    <Typography>Finish Type</Typography>
                    <Typography variant="h6">{data?.name}</Typography>
                </Box>

                <Box
                    style={{
                        width: "250px",
                        padding: 4,
                        alignItems: "center",
                    }}
                >
                    <Typography>Hardware Part Number</Typography>
                    <TextField
                        size="small"
                        variant="outlined"
                        name="partNumber"
                        placeholder="Hardware Part Number"
                        style={{ width: "100%" }}
                        value={formik.values.partNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.partNumber && formik.errors.partNumber}
                        helperText={formik.touched.partNumber && formik.errors.partNumber}
                    />
                </Box>

                <Box
                    style={{
                        width: "250px",
                        padding: 4,
                        alignItems: "center",
                    }}
                >
                    <Typography>Cost</Typography>
                    <TextField
                        size="small"
                        variant="outlined"
                        name="cost"
                        placeholder="Cost"
                        style={{ width: "100%" }}
                        value={formik.values.cost}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.cost && formik.errors.cost}
                        helperText={formik.touched.cost && formik.errors.cost}
                    />
                </Box>
                <Box
                    style={{
                        maxWidth: "400px",
                        padding: 4,
                        display: "flex",
                        alignItems: "center",
                        // background: "red",
                        justifyContent: "center",
                    }}
                >
                    {/* <Box style={{ marginTop: "18px" }}>
                        <FormControlLabel
                            control={
                                <Checkbox color="primary" name="isChecked" />
                            }
                            label="Price by sqft"
                        />
                    </Box> */}
                    <Box
                        style={{
                            width: "150px",
                            padding: 4,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <FormControl style={{ width: "100%" }} size="small">
                            <Typography>Thickness</Typography>

                            <Typography variant="h6">
                                {data?.thickness}
                            </Typography>
                        </FormControl>
                    </Box>

                    <Box style={{ marginTop: "18px" }}>

                        <FormControlLabel
                            control={
                                <Switch
                                    color="primary"
                                    checked={formik.values.status}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    name="status"
                                />
                            }
                            label={"active"}
                        />
                    </Box>
                    <Box>
                        {LoadingForDelete ? <CircularProgress size={24} color="warning" />
                            : <IconButton type="button" onClick={(event) => handleFinishDelete(event)}>
                                <Delete />
                            </IconButton>}
                        {LoadingForEdit ?
                            <CircularProgress size={24} color="warning" /> :
                            <IconButton type="submit">
                                <Edit />
                            </IconButton>}
                    </Box>
                </Box>
            </Box>
        </form>
    </Box>)
}

export default FinishItem;