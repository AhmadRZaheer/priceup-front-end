import { useCreateDocument } from "@/utilities/ApiHooks/common";
import { backendURL } from "@/utilities/common";
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  name: yup.string().required("Comapany name is required"),
  phone: yup.string().required("Phone number is required"),
});
const CreateCompanyContactForm = ({
  setSelectedContact,
  handleStepChange,
  selectedCustomer,
}) => {
  const { mutateAsync: companyCreaete, isLoading, isSuccess } = useCreateDocument();
  const routePrefix = `${backendURL}/contacts`;
  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      try {
        const response = await companyCreaete({data:{ ...values,customer_id:selectedCustomer?._id }, apiRoute:`${routePrefix}/save`})
        setSelectedContact(response);
    } catch (err) {
        console.error(err, 'error');
    }
    },
  });
  return (
    <Box>
      <form>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            paddingBottom: { sm: 0, xs: 2 },
          }}
        >
          <Box sx={{ display: { sm: "block", xs: "none" } }}>
            <label htmlFor="state">Company Name</label>
            <span style={{ color: "red" }}>*</span>
          </Box>
          <TextField
            id="name"
            name="name"
            placeholder="Enter company name"
            size="small"
            variant="outlined"
            className="custom-textfield"
            value={formik.values.name}
            sx={{
              width: "100%",
            }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && formik.errors.name}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            paddingBottom: { sm: 0, xs: 2 },
          }}
        >
          <Box sx={{ display: { sm: "block", xs: "none" } }}>
            <label htmlFor="phone">Phone Number</label>
            <span style={{ color: "red" }}>*</span>
          </Box>
          <TextField
            id="phone"
            name="phone"
            type='number'
            placeholder="Enter phone number"
            size="small"
            variant="outlined"
            className="custom-textfield"
            value={formik.values.phone}
            sx={{
              width: "100%",
            }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phone && formik.errors.phone}
            helperText={formik.touched.phone && formik.errors.phone}
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
            onClick={formik.handleSubmit}
            type="button"
            sx={{
              width: "100%",
              textTransform: "initial",
              backgroundColor: "#8477da",
              "&:hover": {
                backgroundColor: "#8477da",
              },
            }}
            variant="contained"
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={24} sx={{ color: "#8477DA" }} />
            ) : (
              "Save Contact"
            )}
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "space-between",
            alignItems: "center",
            py: 1,
            color: "gray",
          }}
        >
          <div style={{ width: "100%", background: "gray", height: "1px" }} />{" "}
          or{" "}
          <div style={{ width: "100%", background: "gray", height: "1px" }} />
        </Box>
        <Button
          onClick={() => handleStepChange(0)}
          sx={{
            width: "100%",
            textTransform: "initial",
            backgroundColor: "#8477da",
            "&:hover": {
              backgroundColor: "#8477da",
            },
          }}
          variant="contained"
        >
          Select From List{" "}
        </Button>
      </form>
    </Box>
  );
};

export default CreateCompanyContactForm;
