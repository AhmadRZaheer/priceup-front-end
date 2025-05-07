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
import { useEffect, useRef, useState } from "react";
import CustomInputField from "./CustomInput";
import { useEditSetting } from "../../utilities/ApiHooks/setting";
import { backendURL } from "../../utilities/common";
import { useDropzone } from "react-dropzone";
import InputImageIcon from "../../Assets/imageUploader.svg";

function AccordionLocationEdit({ companyData, close, refetch }) {
  const [sections, setSections] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const inputRef = useRef(null); // Create a ref for the file input

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
      image: companyData?.image,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log(values, "value");
      editFinish({ data: values, id: companyData._id });
    },
  });
  useEffect(() => {
    if (SuccessForEdit) {
      close();
      refetch();
    }
  }, [SuccessForEdit]);
  const handleImageChange = (e) => {
    console.log(e, "e"); // Log the event object to see its structure
    const file = e.target.files[0];
    console.log(file, "file"); // Log the selected file
    setSelectedImage(file);
    formik.setFieldValue("image", file);
  };
  console.log(selectedImage, formik.values.image, "selectedImage");
  const handleSelectImage = () => {
    inputRef.current.click(); // Trigger click on the file input
  };
  return (
    <form onSubmit={formik.handleSubmit}>
      {/* <Accordion
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

        <AccordionDetails sx={{ padding: 0 }}> */}
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box
            sx={{
              width: "84px",
              height: "84px",
              borderRadius: "100%",
              overflow: "hidden",
            }}
          >
            {selectedImage ? (
              <img
                width={"84px"}
                height={"84px"}
                src={URL.createObjectURL(selectedImage)}
                alt="Selected"
              />
            ) : companyData?.image ? (
              <img
                width={"84px"}
                height={"84px"}
                src={`${backendURL}/${companyData?.image}`}
                alt="Selected"
              />
            ) : (
              ""
            )}
          </Box>
          <Box>
            <label htmlFor="image-input-2" style={{ cursor: "pointer" }}>
              <input
                accept="image/*"
                id="image-input-2"
                type="file"
                ref={inputRef}
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
              <Box>
                <Button
                  onClick={handleSelectImage}
                  sx={{
                    color: "black",
                    fontWeight: 500,
                    borderRadius: "54px !important",
                    border: "1px solid rgba(212, 219, 223, 1)",
                  }}
                >
                  Upload Profile Image
                </Button>
                <Typography
                  variant="body2"
                  sx={{
                    color: "rgba(132, 119, 218, 1)",
                    fontSize: "12px",
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

        <Box sx={{ width: "100%", mt: 2 }}>
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
      <Box sx={{ pt: 2.4, width: "100%" }}>
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
      {/* </AccordionDetails>
      </Accordion> */}
    </form>
  );
}

export default AccordionLocationEdit;
