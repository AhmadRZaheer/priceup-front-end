import React, { useEffect, useState } from "react";
import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import { backendURL } from "../../utilities/common";
import {
  useDeleteHardwares,
  useEditHardware,
  useFetchDatahardware,
} from "../../utilities/ApiHooks/Hardware";
import AddEditHardware from "../Model/AddEditHardware";
import Snackbars from "../Model/SnackBar";
import "./hardwareTable.scss";
import FinishItem from "./FinishItem";
import HardwareItem from "./HardwreItem";

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
    refetch: hardwareRefetch,
    isFetching: hardwareFetching,
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

  
 

  // useEffect(() => {
  //   if (deleteSuccess) {
  //     hardwareRefetch();
  //     showSnackbar("Deleted Successfully ", "error");
  //   }
  // }, [deleteSuccess]);

 

  

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center",
          paddingTop: 20,
          paddingBottom: 15,
          paddingLeft: "10px",
          paddingRight: "10px",
          // height: "100%",
          // height: calc("100vh" - "200px"),
          alignItems: "start",
        }}
      >
        {" "}
        <div
          style={{
            width: "250px",
            padding: 4,
            alignItems: "center",
            textTransform: "uppercase",
          }}
        >
          <p style={{ fontWeight: "bold", paddingTop: 10, paddingBottom: 10 }}>
            {type}
          </p>
        </div>
        <div
          style={{
            padding: 4,
          }}
        >
          <IconButton
            onClick={handleOpen}
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
            <Add style={{ color: "white" }} />
            Add
          </IconButton>
        </div>{" "}
      </div>
      <div
        style={{
          display: "flex",
          gap: 4,
          alignContent: "center",
          backgroundColor: "rgb(232, 232, 232)",
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
            padding: 4,
            alignItems: "center",
          }}
        >
          Name
        </div>{" "}
        <div
          style={{
            width: "250px",

            padding: 4,
          }}
        >
          PartNnumber{" "}
        </div>{" "}
        <div
          style={{
            width: "250px",

            padding: 4,
          }}
        >
          Cost
        </div>
        <div
          style={{
            width: "250px",

            padding: 4,
          }}
        >
          Status
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
            // maxHeight: "600px",
            // height: "100%",
            overflowY: "scroll",
          }}
        >
          {hardwareData?.map((entry, mainIndex) => (
            <HardwareItem entry={entry} mainIndex={mainIndex} hardwareRefetch={hardwareRefetch} showSnackbar={showSnackbar} type={type}/>
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
