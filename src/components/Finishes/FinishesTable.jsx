import React, { useEffect, useState } from "react";
import "./hardwareTable.scss";
import { userColumnsHardware } from "../../customerTableSource";
import ModeIcon from "@mui/icons-material/Mode";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
import { Add } from "@mui/icons-material";
import { Box, CircularProgress, IconButton } from "@mui/material";
import AddEditModel from "../Model/AddEdit";
import { useDeleteFinishes, useFetchDataFinishes } from "../../utilities/Hooks";
import Snackbars from "../Model/SnackBar";
const FinishesTable = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });
  console.log(snackbar, "snackbar snackbar");
  const { data: finishesData, refetch: finishesRefetch } =
    useFetchDataFinishes();
  const {
    mutate: deleteFinish,
    error: finishDeleteError,
    isSuccess: deleteSuccess,
    isLoading: loaderForDelete,
  } = useDeleteFinishes();
  console.log(finishesData, "data");
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState(null);
  const [isEdit, setIsEdit] = React.useState(false);

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
        return (
          <div className="cellAction">
            <div
              className="deleteButton"
              onClick={() => handleFinishDelete(id)}
            >
              {!loaderForDelete ? (
                <DeleteIcon />
              ) : (
                <CircularProgress size={24} />
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
          splash-logo.svg{" "}
          <div
            style={{
              width: "250px",
              padding: 4,
              alignItems: "center",
            }}
          >
            Finishes
          </div>{" "}
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
      </div>
      <Box sx={{ border: "1px solid #EAECF0", margin: 2 }}>
        <div className="hardwareTable">
          <DataGrid
            getRowId={(row) => row._id}
            rows={finishesData}
            columns={userColumnsHardware.concat(actionColumn)}
            paginationModel={{ page: 0, pageSize: 8 }}
          />
        </div>
      </Box>

      <AddEditModel
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
    </>
  );
};
export default FinishesTable;
