import React, { useEffect, useState } from "react";
import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import { backendURL } from "../../utilities/common";
import {
  useDeleteHardwares,
  useEditHardware,
  useFetchDatahardware,
} from "../../utilities/ApiHooks/hardware";
import AddEditHardware from "../Modal/addEditHardware";
import Snackbars from "../Modal/snackBar";
import "./hardwareTable.scss";
import FinishItem from "./finishItem";
import HardwareItem from "./hardwreItem";
import AddIcon from "../../Assets/plus.svg";

const HardWareComponent = ({ type }) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const showSnackbar = (message, severity) => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const closeSnackbar = () => {
    setSnackbar((prevState) => ({
      ...prevState,
      open: false,
    }));
  };

  const {
    data: hardwareData,
    isFetching: hardwareFetching,
    refetch: hardwareRefetch,
  } = useFetchDatahardware(type);

  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState(null);
  const [isEdit, setIsEdit] = React.useState(false);

  const handleOpen = (data) => {
    setOpen(true);
    setIsEdit(false);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div
        style={{
          paddingTop: 20,
        }}
      ></div>
      <div
        style={{
          display: "flex",
          gap: 4,
          alignContent: "center",
          backgroundColor: "#EAECF0",
          paddingTop: 15,
          paddingBottom: 15,
          paddingLeft: "10px",
          paddingRight: "10px",
        }}
      >
        {" "}
        <div
          style={{
            width: "250px",
            padding: 8,
            alignItems: "center",
          }}
        >
          Name
        </div>{" "}
        <div
          style={{
            width: "250px",
            padding: 8,
          }}
        >
          Part Number{" "}
        </div>{" "}
        <div
          style={{
            width: "250px",
            padding: 8,
          }}
        >
          Cost
        </div>
        <div
          style={{
            width: "250px",
            padding: 8,
          }}
        >
          Status
        </div>{" "}
        <div style={{ width: "50%", textAlign: "right" }}>
          <IconButton
            onClick={handleOpen}
            sx={{
              color: "#8477DA",
              textTransform: "capitalize",
              borderRadius: 2,
              fontSize: 17,
            }}
          >
            <img width={"25px"} height={"20px"} src={AddIcon} alt="add icon" />
            Add
          </IconButton>
        </div>{" "}
      </div>
      {hardwareFetching ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: "20px",
            alignItems: "center",
            height: "60%",
          }}
        >
          <CircularProgress size={24} color="warning" />
        </Box>
      ) : hardwareData?.length >= 1 ? (
        <div
          className="HardwareTable"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            marginTop: 4,
            overflowY: "scroll",
          }}
        >
          {hardwareData?.map((entry, mainIndex) => (
            <HardwareItem
              entry={entry}
              mainIndex={mainIndex}
              hardwareRefetch={hardwareRefetch}
              showSnackbar={showSnackbar}
              type={type}
            />
          ))}
        </div>
      ) : (
        <Typography
          sx={{ textAlign: "center", py: 2, fontSize: 20, color: "gray" }}
        >
          No {type} Found
        </Typography>
      )}

      <AddEditHardware
        open={open}
        close={handleClose}
        data={edit}
        isEdit={isEdit}
        refetch={hardwareRefetch}
        showSnackbar={showSnackbar}
        categorySlug={type}
      />

      <Snackbars
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        closeSnackbar={closeSnackbar}
      />
    </>
  );
};

export default HardWareComponent;
