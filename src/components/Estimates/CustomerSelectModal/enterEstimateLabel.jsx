import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";

const EnterEstimateLabel = ({ handleSave, previousStep, handleStepChange }) => {
  const formik = useFormik({
    initialValues: {
      label: "",
    },
    onSubmit: (values) => {
      handleSave(values.label);
      // handleStepChange(3);
    },
  });
  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ width: "100%", pb: 1 }}>
          <Typography>Label</Typography>
          <TextField
            id="label"
            name="label"
            placeholder="Enter label"
            size="small"
            variant="outlined"
            InputProps={{
              style: {
                color: "black",
                borderRadius: 4,
                border: "1px solid #cccccc",
                backgroundColor: "white",
              },
              inputProps: { min: 0, max: 50 },
            }}
            InputLabelProps={{
              style: {
                color: "rgba(255, 255, 255, 0.5)",
              },
            }}
            sx={{
              color: { sm: "black", xs: "white" },
            }}
            fullWidth
            value={formik.values.label}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            // error={formik.touched.label && formik.errors.label}
            // helperText={formik.touched.label && formik.errors.label}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            marginTop: 2,
            justifyContent: "space-between",
          }}
        >
          <Button
            type="button"
            onClick={() => handleStepChange(previousStep)}
            variant="contained"
            sx={{
              width: "48%",
              textTransform: "initial",
              backgroundColor: "white",
              "&:hover": {
                backgroundColor: "white",
              },
              color: "#101828",
              border: "1px solid #D0D5DD",
            }}
          >
            {" "}
            Back
          </Button>
          <Button
            type="submit"
            sx={{
              width: "48%",
              textTransform: "initial",
              backgroundColor: "#8477da",
              "&:hover": {
                backgroundColor: "#8477da",
              },
            }}
            variant="contained"
          >
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default EnterEstimateLabel;
