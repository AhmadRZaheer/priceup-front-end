import { Delete } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  FormControl,
  FormControlLabel,
  IconButton,
  Switch,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import {
  useDeleteGlassAddonOption,
  useEditGlassAddon,
} from "../../utilities/ApiHooks/glassAddon";
import DeleteIcon from "../../Assets/Delete-Icon.svg";
import CustomToggle from "../ui-components/Toggle";
import CustomInputField from "../ui-components/CustomInput";
import DeleteModal from "../Modal/deleteModal";

const ListOption = ({
  data,
  index,
  refetch,
  glassAddonId,
  SetUpdateValue,
  UpdateValue,
}) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const {
    mutate: deleteGlassAddon,
    isLoading: LoadingForDelete,
    isSuccess: SuccessForDelete,
  } = useDeleteGlassAddonOption();
  const {
    mutate: editGlassAddon,
    isLoading: LoadingForEdit,
    isSuccess: SuccessForEdit,
  } = useEditGlassAddon();
  const validationSchema = Yup.object().shape({
    // partNumber: Yup.string().required("Hardware Part Number is required"),
    cost: Yup.number().required("Cost is required"),
    status: Yup.boolean().required("Status is required"),
  });
  const formik = useFormik({
    initialValues: {
      partNumber: data.partNumber,
      cost: data.cost,
      status: data.status,
    },
    validationSchema,
    onSubmit: async (values, resetForm) => {
      const glassAddon = {
        [index]: {
          partNumber: values.partNumber,
          cost: values.cost,
          status: values.status,
        },
      };
      editGlassAddon({
        optionsData: glassAddon,
        id: glassAddonId,
      });
      localStorage.setItem("scrollToIndex", glassAddonId);
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
  const handleDeleteModalOpen = () => {
    setDeleteModalOpen(true);
  }
  const handleOptionDelete = () => {
    deleteGlassAddon({
      glassAddonId: glassAddonId,
      optionId: data._id,
    });
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
    <Box key={index} id={glassAddonId}>
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
          ></Box>

          {/* <Box
            style={{
              width: "250px",
              padding: 4,
              alignItems: "center",
            }}
          >
            <Typography>Hardware Part Number </Typography>
            <CustomInputField
              size="small"
              variant="outlined"
              type="number"
              InputProps={{
                inputProps: { min: 0 },
              }}
              name="partNumber"
              placeholder="Hardware Part Number"
              fullWidth
              value={formik.values.partNumber}
              onChange={(event) => handlePartChange(event)}
              onBlur={formik.handleBlur}
              error={formik.touched.partNumber && formik.errors.partNumber}
              helperText={formik.touched.partNumber && formik.errors.partNumber}
            />
          </Box> */}

          <Box
            style={{
              width: "250px",
              padding: 4,
              alignItems: "center",
            }}
          >
            <Typography>Cost</Typography>
            <CustomInputField
              size="small"
              variant="outlined"
              name="cost"
              placeholder="Cost"
              style={{ width: "100%" }}
              type="number"
              InputProps={{
                inputProps: { min: 0 },
              }}
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
            {/* <Box
              style={{
                width: "150px",
                padding: 4,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FormControl style={{ width: "100%" }} size="small">
                <Typography>Thickness</Typography>
                <Typography variant="h6">{data?.thickness}</Typography>
              </FormControl>
            </Box> */}

            <Box style={{ marginTop: "12px" }}>
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
                  onClick={handleDeleteModalOpen}
                  sx={{ mt: 2.6 }}
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
        handleDelete={handleOptionDelete}
      />
    </Box>
  );
};

export default ListOption;
