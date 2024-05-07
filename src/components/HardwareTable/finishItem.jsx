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
import DeleteIcon from "../../Assets/Delete-Icon.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  useDeleteHardwareFinish,
  useEditHardware,
} from "../../utilities/ApiHooks/hardware";
import { useEffect, useState } from "react";
import CustomToggle from "../ui-components/Toggle";
import CustomInputField from "../ui-components/CustomInput";
import DeleteModal from "../Modal/deleteModal";

const FinishItem = ({
  data,
  index,
  refetch,
  hardwareId,
  SetUpdateValue,
  UpdateValue,
}) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const handleOpenDeleteModal = (event) => {
    event.preventDefault();
    setDeleteModalOpen(true);
  }
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
    // partNumber: Yup.string().required("Hardware Part Number is required"),
    cost: Yup.number().required("Cost is required"),
    status: Yup.boolean().required("Status is required"),
  });

  const formik = useFormik({
    initialValues: {
      partNumber: data?.partNumber, // Initialize with empty string
      cost: data?.cost, // Initialize with a default value (0 in this case)
      status: data?.status, // Initialize as false (assuming it's a boolean)
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

  const handleFinishDelete = () => {
    deleteFinish({ hardwareId: hardwareId, finishId: data._id });
    setDeleteModalOpen(false);
  };

  useEffect(() => {
    if (SuccessForEdit || SuccessForDelete) {
      refetch();
    }
  }, [SuccessForEdit, SuccessForDelete]);

  const handlePartChange = (event) => {
    formik.handleChange(event);
    const value = event.target.value;
    const originalArray = [...UpdateValue];
    originalArray[index] = {
      ...data,
      partNumber: value,
      cost: formik.values.cost,
      status: formik.values.status,
    };
    SetUpdateValue(originalArray);
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
    const originalArray = [...UpdateValue];
    originalArray[index] = {
      ...data,
      cost: value,
      partNumber: formik.values.partNumber,
      status: formik.values.status,
    };
    SetUpdateValue(originalArray);
  };
  return (
    <Box key={index}>
      <form onSubmit={formik.handleSubmit}>
        <Box
          style={{
            display: "flex",
            alignContent: "center",
            paddingTop: 4,
            paddingBottom: 4,
          }}
        >
          <Box
            sx={{
              minWidth: "200px",
              padding: 1,
              alignItems: "center",
            }}
          >
            <Typography>Finish Type</Typography>
            <Typography variant="h6">{data?.name}</Typography>
          </Box>

          {/* <Box
            id={hardwareId}
            sx={{
              minWidth: "230px",
              padding: 1,
              alignItems: "center",
            }}
          >
            <Typography>Hardware Part Number</Typography>
            <CustomInputField
              size="small"
              variant="outlined"
              type="number"
              InputProps={{
                inputProps: { min: 0 },
              }}
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
          </Box> */}

          <Box
            sx={{
              minWidth: "230px",
              padding: 1,
              alignItems: "start",
              pl: 10
            }}
          >
            <Typography>Cost</Typography>

            <CustomInputField
              size="small"
              variant="outlined"
              type="number"
              inputProps={{
                min: 0
              }}
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
            sx={{
              minWidth: "260px",
              padding: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              style={{
                width: "100%",
                padding: 4,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FormControl style={{ width: "100%" }} size="small">
                <Typography variant="h6">{data?.thickness}</Typography>
              </FormControl>
            </Box>

            <Box style={{ marginTop: "8px" }}>
              <CustomToggle
                checked={formik.values.status}
                onChange={(event) => handleStatusChange(event)}
                onBlur={formik.handleBlur}
                name="status"
              />
            </Box>
            <Box sx={{ display: "flex" }}>
              {LoadingForDelete ? (
                <CircularProgress size={24} color="warning" />
              ) : (
                <IconButton
                  type="button"
                  onClick={(event) => handleOpenDeleteModal(event)}
                  sx={{ mt: 2 }}
                >
                  <img src={DeleteIcon} alt="delete icon" />
                </IconButton>
              )}
              {/* {LoadingForEdit ? (
                <CircularProgress size={24} sx={{ color: "#8477DA" }} />
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
              )} */}
            </Box>
          </Box>
        </Box>
      </form>
      <DeleteModal
        open={deleteModalOpen}
        close={()=>{setDeleteModalOpen(false)}}
        isLoading={LoadingForDelete}
        handleDelete={handleFinishDelete}
      />
    </Box>
  );
};

export default FinishItem;
