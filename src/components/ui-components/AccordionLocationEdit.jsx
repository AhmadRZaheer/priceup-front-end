import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import CustomInputField from "./CustomInput";
import { useEditSetting } from "../../utilities/ApiHooks/setting";

function AccordionLocationEdit({ companyData, close, refetch }) {
  const [sections, setSections] = useState(false);
  const {
    mutate: editFinish,
    isSuccess: SuccessForEdit,
    isLoading,
  } = useEditSetting();

  const toggleSection = () => {
    setSections(!sections);
  };

  const formik = useFormik({
    initialValues: {
      name: companyData?.name,
      address: companyData?.address,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      editFinish({ data: values, id: companyData._id });
    },
  });
  useEffect(() => {
    if (SuccessForEdit) {
      close();
      refetch();
    }
  }, [SuccessForEdit]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Accordion
        sx={{
          paddingX: "10px",
          mt: 2,
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          onClick={toggleSection}
        >
          {sections ? (
            <Typography
              sx={{
                color: "#4D5463",
                fontSize: "15px",
                borderBottom: "1px solid #ccc",
                width: "100%",
                pr: 4,
                mr: -3,
                pb: 1,
                mb: -1,
              }}
            >
              Locations Info{" "}
            </Typography>
          ) : (
            <Typography
              sx={{
                color: "#4D5463",
                fontSize: "15px",
                ml: -0.6,
              }}
            >
              Locations Info{" "}
            </Typography>
          )}
        </AccordionSummary>

        <AccordionDetails sx={{ padding: 0 }}>
          <Box mb={2}>
            <Box sx={{ width: "100%" }}>
              <Typography
                sx={{
                  color: "#344054",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                Name
              </Typography>
              <CustomInputField
                fullWidth={true}
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
            </Box>

            <Box sx={{ width: "100%", mt: 1.5 }}>
              <Typography
                sx={{
                  color: "#344054",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                Address
              </Typography>
              <CustomInputField
                fullWidth={true}
                type="text"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />
            </Box>
          </Box>
          <Box sx={{ pb: 1.6, width: "100%" }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: "#8477DA",
                width: "100%",
                color: "white",
                ":hover": {
                  bgcolor: "#8477DA",
                },
              }}
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress size={24} sx={{ color: "#8477da" }} />
              ) : (
                "Save"
              )}
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>
    </form>
  );
}

export default AccordionLocationEdit;
