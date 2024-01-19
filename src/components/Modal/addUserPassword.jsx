import React, { useEffect } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import CustomInputField from "../ui-components/CustomInput";
import { useEditAccessCustomUser, useEditCustomUser } from "../../utilities/ApiHooks/superAdmin";

function PasswordModal({ open, close, user, companyId, customUserRefech }) {
  const { mutate: UpdateCustomUser, isSuccess } = useEditAccessCustomUser();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid white",
    boxShadow: 24,
    p: 3,
    borderRadius: 2,
  };
  const validationSchema = yup.object({
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      const updatedUser = {
        ...user,
        locationsAccess: [
          ...user.locationsAccess,
          {
            company_id: companyId,
            company_password: values.password,
          },
        ],
      };
      UpdateCustomUser(updatedUser);
      close();
    },
  });
  useEffect(() => {
    customUserRefech();
  }, [isSuccess]);

  return (
    <>
      <Modal open={open} onClose={close}>
        <Box sx={style}>
          <Typography>Enter the Password of the User</Typography>
          <Box sx={{ mt: 3 }}>
            <Typography>Password</Typography>
            <CustomInputField
              placeholder="Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              variant="outlined"
              fullWidth
            />
          </Box>
          <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
            <Button
              onClick={close}
              variant="outlined"
              sx={{
                border: "1px solid #D0D5DD",
                width: "100%",
                color: "#344054",
                ":hover": {
                  border: "1px solid #D0D5DD",
                },
              }}
            >
              Close
            </Button>
            <Button
              variant="contained"
              onClick={formik.handleSubmit}
              sx={{
                bgcolor: "#8477DA",
                width: "100%",
                color: "white",
                ":hover": {
                  bgcolor: "#8477DA",
                },
              }}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default PasswordModal;
