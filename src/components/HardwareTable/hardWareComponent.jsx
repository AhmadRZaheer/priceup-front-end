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
import { useDispatch } from "react-redux";
import { showSnackbar } from "../../redux/snackBarSlice";

const HardWareComponent = ({ type }) => {
  const dispatch = useDispatch();

  const showSnackbarHandler = (message, severity) => {
    dispatch(showSnackbar({ message, severity }));
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
          <CircularProgress size={24} sx={{ color: "#8477DA" }} />
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
              showSnackbar={showSnackbarHandler}
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
        showSnackbar={showSnackbarHandler}
        categorySlug={type}
      />
    </>
  );
};

export default HardWareComponent;
