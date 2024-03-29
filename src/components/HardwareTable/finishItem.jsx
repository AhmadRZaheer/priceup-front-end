import { Delete } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  FormControl,
  FormControlLabel,
  IconButton,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  useDeleteHardwareFinish,
  useEditHardware,
} from "../../utilities/ApiHooks/hardware";
import { useEffect } from "react";

const FinishItem = ({
  data,
  index,
  refetch,
  hardwareId,
  showSnackbar,
  SetUpdateValue,
  UpdateValue,
}) => {
  const {
    mutate: deleteFinish,
    isLoading: LoadingForDelete,
    isSuccess: SuccessForDelete,
  } = useDeleteHardwareFinish();
  const {
    mutate: editFinish,
    isLoading: LoadingForEdit,
    isSuccess: SuccessForEdit,
  } = useEditHardware();
  const validationSchema = Yup.object().shape({
    partNumber: Yup.string().required("Hardware Part Number is required"),
    cost: Yup.number().required("Cost is required"),
    status: Yup.boolean().required("Status is required"),
  });
  const formik = useFormik({
    initialValues: {
      partNumber: data?.partNumber,
      cost: data?.cost,
      status: data?.status,
    },
    validationSchema,
    onSubmit: async (values, resetForm) => {
      const finishes = {
        [index]: {
          partNumber: values.partNumber,
          cost: values.cost,
          status: values.status,
        },
      };
      editFinish({ finishesData: finishes, id: hardwareId });
      localStorage.setItem("scrollToIndex", hardwareId);
      resetForm();
    },
  });

  useEffect(() => {
    const scrollToIndex = localStorage.getItem("scrollToIndex");
    if (scrollToIndex) {
      const updateButton = document.getElementById(scrollToIndex);
      if (updateButton) {
        updateButton.scrollIntoView({ behavior: "smooth" });
        localStorage.removeItem("scrollToIndex");
      }
    }
  }, []);


  const handleFinishDelete = (event) => {
    event.preventDefault();
    deleteFinish({ hardwareId: hardwareId, finishId: data._id });
  };

  useEffect(() => {
    if (SuccessForEdit || SuccessForDelete) {
      refetch();
      if (SuccessForDelete) {
        showSnackbar("Deleted Successfully", "error");
      }
      if (SuccessForEdit) {
        showSnackbar("Updated Successfully", "success");
      }
    }
  }, [SuccessForEdit, SuccessForDelete]);

  const handlePartChange = (event) => {
    formik.handleChange(event);
    const value = event.target.value;
    if (value.length > 0) {
      const originalArray = [...UpdateValue];
      originalArray[index] = {
        ...data,
        partNumber: value,
        cost: formik.values.cost,
        status: formik.values.status,
      };
      SetUpdateValue(originalArray);
    }
  };
  const handleStatusChange = (event) => {
    formik.handleChange(event);
    const value = event.target.checked;
    const originalArray = [...UpdateValue];
    originalArray[index] = {
      ...data,
      status: value,
      cost: formik.values.cost,
      partNumber: formik.values.partNumber,
    };
    SetUpdateValue(originalArray);
  };
  const handleCostChange = (event) => {
    formik.handleChange(event);
    const value = event.target.value;
    if (value.length > 0) {
      const originalArray = [...UpdateValue];
      originalArray[index] = {
        ...data,
        cost: value,
        partNumber: formik.values.partNumber,
        status: formik.values.status,
      };
      SetUpdateValue(originalArray);
    }
  };
  return (
    <Box key={index} >
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
            id={hardwareId}
          >
            <Typography>Hardware Part Number</Typography>
            <TextField
              size="small"
              variant="outlined"
              type="number"
              name="partNumber"
              placeholder="Hardware Part Number"
              style={{ width: "100%" }}
              value={formik.values.partNumber}
              onChange={(event) => {
                handlePartChange(event);
              }}
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
              type="number"
              name="cost"
              placeholder="Cost"
              style={{ width: "100%" }}
              value={formik.values.cost}
              onChange={(event) => handleCostChange(event)}
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
              justifyContent: "center",
            }}
          >
            <Box
              style={{
                width: "150px",
                padding: 4,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FormControl style={{ width: "100%" }} size="small">
                <Typography variant="h6">{data?.thickness}</Typography>
              </FormControl>
            </Box>

            <Box style={{ marginTop: "18px" }}>
              <FormControlLabel
                control={
                  <Switch
                    color="primary"
                    checked={formik.values.status}
                    onChange={(event) => handleStatusChange(event)}
                    onBlur={formik.handleBlur}
                    name="status"
                  />
                }
                label={"active"}
              />
            </Box>
            <Box sx={{ display: "flex" }}>
              {LoadingForDelete ? (
                <CircularProgress size={24} color="warning" />
              ) : (
                <IconButton
                  type="button"
                  onClick={(event) => handleFinishDelete(event)}
                >
                  <Delete />
                </IconButton>
              )}
              {LoadingForEdit ? (
                <CircularProgress size={24} color="warning" />
              ) : (
                <IconButton
                  type="submit"
                  sx={{
                    backgroundColor: "#8477DA",
                    "&:hover": { backgroundColor: "#8477DA" },
                    color: "white",
                    textTransform: "capitalize",
                    borderRadius: 2,
                    fontSize: 17,
                    padding: 1,
                  }}
                >
                  Update
                </IconButton>
              )}
            </Box>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default FinishItem;
