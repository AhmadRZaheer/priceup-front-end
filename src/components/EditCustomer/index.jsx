import { useFormik } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InputImageIcon from "../../Assets/imageUploader.svg";
import DefaultImageIcon from "../../Assets/DefaultIMG.png";
import React, { useEffect, useRef, useState } from "react";
import { CircularProgress, Divider, Grid } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { useEditCustomer } from "../../utilities/ApiHooks/customer";
import { backendURL } from "../../utilities/common";
import { useSearchParams } from "react-router-dom";
import { useFetchSingleDocument } from "@/utilities/ApiHooks/common";
import CustomInputField from "../ui-components/CustomInput";
import ProjectsSection from "./projectsSection";
import EstimateSection from "./estimatesSection";
import LocationSection from "./locationSection";

const EditCustomer = () => {
  const [searchParams] = useSearchParams();
  const CustomerId = searchParams.get("id");
  const inputRef = useRef(null); 
  const [CurrentSection, setCurrentSection] = useState("projects");

  console.log(CustomerId, "CustomerId");
  const apiPath = `${backendURL}/customers/${CustomerId}`;
  const { data, refetch } = useFetchSingleDocument(apiPath);

  const onDrop = (acceptedFiles) => {
    formik.setFieldValue("image", acceptedFiles[0]);
  };

  const handleButtonClick = () => {
    inputRef.current.click(); // Trigger click on the file input
  };
  const { getInputProps } = useDropzone({ onDrop });

  const {
    mutate: editCustomer,
    isLoading: LoadingForEdit,
    isSuccess: SuccessForEdit,
  } = useEditCustomer();

  useEffect(() => {
    if (SuccessForEdit) {
      // setSelectedImage(null);
      refetch();
      //   close();
    }
  }, [SuccessForEdit]);

  const handleEditClick = (props) => {
    const id = data;
    editCustomer(props, id);
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email address"),
    image: Yup.mixed(),
  });

  const formik = useFormik({
    initialValues: {
      name: data?.name,
      email: data?.email,
      image: data?.image,
      phone: data?.phone,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      {
        handleEditClick({ customerData: values, id: data._id });
        // resetForm();
      }
    },
  });

  useEffect(() => {
    refetch();
  }, []);

  return (
    <Box >
      <Box>
        <Typography sx={{ fontSize: "20px", fontWeight: 600 }}>
          Edit Customer
        </Typography>
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 600,
            opacity: "70%",
            color: "#212528",
          }}
        >
          View and Edit your Customer Detail.
        </Typography>
      </Box>
      <Box
        sx={{
          background: "white",
          borderRadius: "4px",
          border: "1px solid #D4DBDF",
          mt: 2,
        }}
      >
        <Box sx={{ padding: "16px", background: "#F3F5F6" }}>
          <Typography
            sx={{ fontSize: "14px", fontWeight: 600, color: "black" }}
          >
            Customer Detail
          </Typography>
        </Box>
        <Divider sx={{ borderColor: "#D4DBDF" }} />
        <Box sx={{ padding: "16px" }}>
          <Box>
            <Typography
              sx={{
                color: "#000000",
                lineHeight: "16.39px",
                fontSize: "12px",
                fontWeight: 600,
              }}
            >
              Profile image
            </Typography>
            <Box sx={{ display: "flex", gap: "19px", my: 2 }}>
              <Box>
                {formik.values.image !== undefined &&
                formik.values.image !== null ? (
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
                      px: "10px 12px !important",
                      lineHeight: "21px",
                      fontSize: 16,
                    }}
                    onClick={handleButtonClick}
                  >
                    Upload Profile Image
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
              {formik.errors.image && (
                <Typography color="error">{formik.errors.image}</Typography>
              )}
            </Box>
          </Box>
          <Grid
            container
            gap={2}
            sx={{ width: { md: "50%", sm: "60%", xs: "100%" } }}
          >
            <Grid item xs={5.5}>
              <Typography>Name</Typography>
              <CustomInputField
                placeholder="Name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={5.5}>
              <Typography>Email</Typography>
              <CustomInputField
                placeholder="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.email)}
                helperText={formik.touched.name && formik.errors.email}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={5.5}>
              <Typography>Phone</Typography>
              <CustomInputField
                placeholder="phone"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              marginTop: 2,
              justifyContent: "flex-end",
            }}
          >
            {/* <Button
              variant="outlined"
              //   onClick={close}
              sx={{
                color: "#101828",
                border: "1px solid #D0D5DD",
                width: "50%",
              }}
            >
              Cancel
            </Button> */}
            <Button
              fullWidth
              variant="contained"
              onClick={formik.handleSubmit}
              disabled={LoadingForEdit}
              sx={{
                backgroundColor: "#8477DA",
                width: "140px",
                "&:hover": {
                  backgroundColor: "#8477da",
                },
              }}
            >
              {LoadingForEdit ? (
                <CircularProgress size={24} sx={{ color: "#8477DA" }} />
              ) : (
                "Update"
              )}
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Bottom section */}
      <Box sx={{ mt: 2 }}>
        <Box
          sx={{
            backgroundColor: "#F3F5F6",
            border: "1px solid #D0D5DD",
            borderRadius: "6px",
            padding: "2px",
            width: "fit-content",
            color: "black",
          }}
        >
          <Button
            sx={{
              bgcolor: CurrentSection === "projects" ? "white" : "transparent",
              borderRadius: "4px !important",
              padding: "7px 12px 7px 12px",
              width: "79px",
              ":hover": {
                bgcolor: "white",
              },
              fontSize: "14px",
              fontWeight: 500,
              color: "black",
            }}
            onClick={() => setCurrentSection("projects")}
          >
            projects
          </Button>
          <Button
            sx={{
              bgcolor: CurrentSection === "location" ? "white" : "transparent",
              borderRadius: "4px !important",
              padding: "7px 12px 7px 12px",
              ":hover": {
                bgcolor: "white",
              },
              fontSize: "14px",
              fontWeight: 500,
              color: "black",
            }}
            onClick={() => setCurrentSection("location")}
          >
            Locations
          </Button>
          <Button
            sx={{
              bgcolor: CurrentSection === "estimates" ? "white" : "transparent",
              borderRadius: "4px !important",
              padding: "7px 12px 7px 12px",
              ":hover": {
                bgcolor: "white",
              },
              fontSize: "14px",
              fontWeight: 500,
              color: "black",
            }}
            onClick={() => setCurrentSection("estimates")}
          >
            Estimates
          </Button>
        </Box>
        <Box sx={{ mt: 1 }}>
          {CurrentSection === "projects" ? (
            <ProjectsSection />
          ) : CurrentSection === "location" ? (
            <LocationSection />
          ) : (
            <EstimateSection />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default EditCustomer;
