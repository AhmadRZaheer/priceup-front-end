import React, { useEffect, useState } from "react";
import "./hardwareTable.scss";
import { userColumnsHardware } from "../../customerTableSource";
import ModeIcon from "@mui/icons-material/Mode";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
import { Add } from "@mui/icons-material";
import { Box, CircularProgress, IconButton, Typography } from "@mui/material";

import {
  useDeleteFinishes,
  useFetchDataFinishes,
} from "../../utilities/ApiHooks/Finishes";
import Snackbars from "../Model/SnackBar";
import AddEditFinish from "../Model/AddEditFinish";
const FinishesTable = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const { data: finishesData, refetch: finishesRefetch } =
    useFetchDataFinishes();
  const {
    mutate: deleteFinish,
    error: finishDeleteError,
    isSuccess: deleteSuccess,
    isLoading: loaderForDelete,
  } = useDeleteFinishes();
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState(null);
  const [isEdit, setIsEdit] = React.useState(false);
  const [matchingId, setMatchingId] = useState("");

  const handleOpen = () => {
    setOpen(true);
    setIsEdit(false);
  };
  const handleClose = () => setOpen(false);
  const handleOpenEdit = (data, isEditAble) => {
    setOpen(true);
    setEdit(data);
    setIsEdit(true);
  };

  const handleFinishDelete = (id) => {
    deleteFinish(id);
    setMatchingId(id);
  };

  useEffect(() => {
    if (deleteSuccess) {
      finishesRefetch();
      showSnackbar("Finish is Deleted Successfully ", "error");
    }
  }, [deleteSuccess]);
  const actionColumn = [
    {
      field: " ",
      // headerName: (
      //   // <div onClick={handleOpen}>
      //   //   <img src={plus} alt="Add More" />
      //   // </div>
      // ),
      width: 200,
      renderCell: (params) => {
        const id = params.row._id;
        const isMatchingId = id === matchingId;
        return (
          <div className="cellAction">
            <div
              className="deleteButton"
              onClick={() => handleFinishDelete(id)}
            >
              {isMatchingId && loaderForDelete ? (
                <CircularProgress size={24} color="warning" />
              ) : (
                <DeleteIcon />
              )}
            </div>
            <div
              className="viewButton"
              onClick={() => handleOpenEdit(params.row)}
            >
              <ModeIcon />
            </div>
          </div>
        );
      },
    },
  ];
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
  return (
    <>
      <Box
        sx={{
          backgroundColor: "white",
          height: "100vh",
          borderTopLeftRadius: 30,
          borderBottomLeftRadius: 30,
          pl: 1
        }}
      >
        <div className="page-title">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignContent: "center",
              paddingTop: 15,
              paddingBottom: 15,
              paddingLeft: "10px",
              paddingRight: "10px",
            }}
          >
            <Typography variant="h4">Finishes</Typography>
            <div>
              <IconButton onClick={handleOpen}>
                <Add style={{ color: "rgb(65, 106, 238)" }} />
              </IconButton>
            </div>{" "}
          </div>
        </div>
        <Box sx={{ border: "1px solid #EAECF0", margin: 2, p: 0 }}>
          <div className="hardwareTable">
            <DataGrid
              getRowId={(row) => row._id}
              rows={finishesData}
              columns={userColumnsHardware.concat(actionColumn)}
              paginationModel={{ page: 0, pageSize: 8 }}
            />
          </div>
        </Box>

        <AddEditFinish
          open={open}
          close={handleClose}
          data={edit}
          isEdit={isEdit}
          finishesRefetch={finishesRefetch}
          showSnackbar={showSnackbar}
        />

        <Snackbars
          open={snackbar.open}
          message={snackbar.message}
          severity={snackbar.severity}
          closeSnackbar={closeSnackbar}
        />
      </Box>
    </>
  );
};
export default FinishesTable;
