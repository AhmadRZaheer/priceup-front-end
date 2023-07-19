import React, { useEffect, useState } from "react";
import wheel from "../../Assets/wheel.svg";

import {
  Box,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Add, Delete, Edit, ToggleOff, ToggleOn } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { addItems } from "../../redux/formSlice";
import { backendURL } from "../../utilities/common";
import axios from "axios";
import {
  useDeleteHardwares,
  useFetchDatahardware,
} from "../../utilities/ApiHooks/Hardware";
import AddEditHardware from "../Model/AddEditHardware";
import Snackbars from "../Model/SnackBar";
import FinishItem from "./FinishItem";

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
  const dispatch = useDispatch();

  const {
    data: hardwareData,
    refetch: hardwareRefetch,
    isFetching: hardwareFetching,
  } = useFetchDatahardware(type);
  const {
    mutate: deleteHardware,
    error: hardwareDeleteError,
    isSuccess: deleteSuccess,
    isLoading: loaderForDelete,
  } = useDeleteHardwares();
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

  const handleOpenEdit = (data, isEditAble) => {
    setOpen(true);
    setEdit(data);
    setIsEdit(true);
  };
  const handleHardwareDelete = (id) => {
    deleteHardware(id);
  };

  useEffect(() => {
    if (deleteSuccess) {
      hardwareRefetch();
      showSnackbar("Deleted Successfully ", "error");
    }
  }, [deleteSuccess]);
  console.log(hardwareFetching, "hardwareData12 form api hardware component");

  const handleAddFormEntryItems = (id, event) => {
    dispatch(
      addItems({
        id: id,
        data: {
          id: Date.now() % 10000,
          additionalFinishType: "",
          hardwarePartNumber: "",
          cost: "",
          price: "",
          isChecked: "",
          thickness: "",
        },
      })
    );
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center",
          paddingTop: 15,
          paddingBottom: 15,
          paddingLeft: "10px",
          paddingRight: "10px",
          // background: "red",
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
          {type}
        </div>
        <div
          style={{
            padding: 4,
          }}
        >
          <IconButton onClick={handleOpen}>
            <Add style={{ color: "rgb(65, 106, 238)" }} />
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

          // background: "red",
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
        {/* <div
          style={{
            width: "250px",

            padding: 4,
          }}
        >
          Price
        </div>{" "} */}
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

            height: "56vh",
          }}
        >
          <CircularProgress size={24} color="warning" />
        </Box>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            marginTop: 4,
            // background: "red",

            maxHeight: "600px",
            overflowY: "scroll",
          }}
        >
          {hardwareData?.map((entry, mainIndex) => (
            <div
              style={{ borderBottom: "2px solid rgb(232, 232, 232)" }}
              key={mainIndex}
            >
              <Box
                sx={{
                  // background: "red",

                  display: "flex",
                  justifyContent: "space-between",
                  alignContent: "center",
                  p: 2,
                }}
              >
                {" "}
                <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                  {/* <div className="customerImg"> */}
                  <img
                    className="cellImg"
                    // src={wheel}
                    src={`${backendURL}/${entry.image}`}
                    alt=""
                  />
                  {entry.name}
                  {/* </div> */}
                </Box>
                <Box>
                  <IconButton>
                    <Delete
                      // style={{ color: "rgb(65, 106, 238)" }}
                      onClick={() => handleHardwareDelete(entry._id)}
                    />
                  </IconButton>
                  <IconButton>
                    <Edit
                      // style={{ color: "rgb(65, 106, 238)" }}
                      onClick={() => handleOpenEdit(entry)}
                    />
                  </IconButton>
                </Box>
              </Box>
              <Box sx={{ p: 2 }}>
                {entry?.finishes?.map((finish, index) => (
                  <FinishItem
                    data={finish}
                    key={index}
                    index={index}
                    refetch={hardwareRefetch}
                    hardwareId={entry._id}
                    showSnackbar={showSnackbar}
                  />
                ))}
              </Box>
            </div>
          ))}
        </div>
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
