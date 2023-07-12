import React, { useEffect, useState } from "react";
import "./glassTreatement.scss";
import ModeIcon from "@mui/icons-material/Mode";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
import { Add } from "@mui/icons-material";
import { Box, CircularProgress, IconButton } from "@mui/material";
import { useDeleteGlassTreatement, useFetchDataGlassTreatement } from "../../utilities/ApiHooks/GlassTreatement";
import { userColumnsHardware } from "../../customerTableSource";
import AddEditGlassTreatement from "../Model/AddGlassTreatement";
import Snackbars from "../Model/SnackBar";


const GlassTreatementTable = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });
  // console.log(snackbar, "snackbar snackbar");
  const { data: glassTreatementData, refetch: glassTreatementRefetch } =
    useFetchDataGlassTreatement();
  const {
    mutate: deleteGlassTreatement,
    error: finishDeleteError,
    isSuccess: deleteSuccess,
    isLoading: loaderForDelete,
  } = useDeleteGlassTreatement();
  console.log(glassTreatementData, "data");
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
    deleteGlassTreatement(id);
    setMatchingId(id);
  };

  useEffect(() => {
    if (deleteSuccess) {
      glassTreatementRefetch();
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
          <div
            style={{
              width: "250px",
              padding: 4,
              alignItems: "center",
            }}
          >
            GlassTreatement
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
            rows={glassTreatementData}
            columns={userColumnsHardware.concat(actionColumn)}
            paginationModel={{ page: 0, pageSize: 8 }}
          />
        </div>
      </Box>

      <AddEditGlassTreatement
        open={open}
        close={handleClose}
        data={edit}
        isEdit={isEdit}
        finishesRefetch={glassTreatementRefetch}
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
export default GlassTreatementTable;
