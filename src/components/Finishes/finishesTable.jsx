import React, { useEffect, useState } from "react";
import "./hardwareTable.scss";
import { userColumnsHardware } from "../../customerTableSource";
import ModeIcon from "@mui/icons-material/Mode";
import DeleteIcon from "@mui/icons-material/Delete";
import { Search } from '@mui/icons-material';
import { DataGrid } from "@mui/x-data-grid";
import { Add } from "@mui/icons-material";
import { Box, CircularProgress, IconButton, Typography, TextField,Input,InputAdornment } from "@mui/material";
import { useDeleteFinishes, useFetchDataFinishes } from "../../utilities/ApiHooks/finishes";
import Snackbars from "../Modal/snackBar";
import AddEditFinish from "../Modal/addEditFinish";

const FinishesTable = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const { data: finishesData, refetch: finishesRefetch } = useFetchDataFinishes();
  const {
    mutate: deleteFinish,
    isSuccess: deleteSuccess,
    isLoading: loaderForDelete,
  } = useDeleteFinishes();
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState(null);
  const [isEdit, setIsEdit] = React.useState(false);
  const [matchingId, setMatchingId] = useState("");
  const [search, setSearch] = useState("");

  const handleOpen = () => {
    setOpen(true);
    setIsEdit(false);
  };

  const handleClose = () => setOpen(false);

  const handleOpenEdit = (data) => {
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
      showSnackbar("Finish is Deleted Successfully", "error");
    }
  }, [deleteSuccess]);

  const actionColumn = [
    {
      field: "Status",
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
            <div className="viewButton">
              <IconButton
                onClick={() => handleOpenEdit(params.row)}
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
                <ModeIcon sx={{ color: "white", fontSize: 18, mr: 0.4 }} />
                Edit
              </IconButton>
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

  // Filter the finishesData based on the search input
  const filteredData = finishesData?.filter(
    (finish) =>
      finish.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Box
        sx={{
          backgroundColor: "white",
          height: "100vh",
          pl: 1,
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
            </div>
          </div>
        </div>

        <Input
          placeholder="Search by Name"
          variant="outlined"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            mb: 2,
            width: '20%', // You can adjust the width as needed
            marginLeft: '30px', // Adjust the margin as needed
          }}
          endAdornment={(
            <InputAdornment position="end">
              <Search />
            </InputAdornment>
          )}
        />

        <Box sx={{ border: "1px solid #EAECF0", margin: 2, p: 0 }}>
          <div className="hardwareTable">
            <DataGrid
              getRowId={(row) => row._id}
              rows={filteredData}
              columns={userColumnsHardware.concat(actionColumn)}
              pageSizeOptions={[10]}
            />
          </div>
        </Box>
        <Box />
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
  )
};

export default FinishesTable;

