import { Delete, Edit } from "@mui/icons-material";
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
  createTheme,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import {
  useDeleteGlassTreatement,
  useEditGlassTreatement,
} from "../../utilities/ApiHooks/GlassTreatement";

const GlassTreatementItem = ({
  data,
  index,
  refetch,
  glassTreatementId,
  showSnackbar,
}) => {
  const {
    mutate: deleteGlassTreatement,
    isLoading: LoadingForDelete,
    isSuccess: SuccessForDelete,
  } = useDeleteGlassTreatement();
  const {
    mutate: editGlassTreatement,
    isLoading: LoadingForEdit,
    isSuccess: SuccessForEdit,
  } = useEditGlassTreatement();
  const validationSchema = Yup.object().shape({
    partNumber: Yup.string().required("Hardware Part Number is required"),
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
      const glassTreatement = {
        [index]: {
          partNumber: values.partNumber,
          cost: values.cost,
          status: values.status,
        },
      };
      editGlassTreatement({
        optionsData: glassTreatement,
        id: glassTreatementId,
      });
      resetForm();
    },
  });

  const handleFinishDelete = (event) => {
    event.preventDefault();
    deleteGlassTreatement({
      glassTreatementId: glassTreatementId,
      optionId: data._id,
    });
  };

  useEffect(() => {
    if (SuccessForEdit || SuccessForDelete) {
      refetch();
      if (SuccessForDelete) {
        showSnackbar("Deleted Successfully", "error");
      }
      if (SuccessForEdit) {
        showSnackbar("Edit Successfully", "success");
      }
    }
  }, [SuccessForEdit, SuccessForDelete]);
  const theme = createTheme({
    components: {
      MuiSwitch: {
        styleOverrides: {
          root: {
            color: "#8477DA", // Change this color to your desired custom color
            "&.Mui-checked": {
              color: "#8477DA", // Change this color to your desired custom color when the switch is checked
            },
          },
        },
      },
    },
  });

  return (
    <Box key={index}>
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
                <Typography>Thickness</Typography>
                <Typography variant="h6">{data?.thickness}</Typography>
              </FormControl>
            </Box>

            <Box style={{ marginTop: "18px" }}>
              <ThemeProvider theme={theme}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formik.values.status}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="status"
                    />
                  }
                  label={"active"}
                />
              </ThemeProvider>
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
                  <Edit />
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

export default GlassTreatementItem;
