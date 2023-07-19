import React, { useState } from "react";
import "./TeamTable.scss";
import { teamColumns, userRows } from "../../customerTableSource";
import ModeIcon from "@mui/icons-material/Mode";
import DeleteIcon from "@mui/icons-material/Delete";

import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import {
  useDeleteTeamMembers,
  useFetchDataTeam,
} from "../../utilities/ApiHooks/Team";
import AddTeamMembers from "../Model/AddTeamMembers";
import Snackbars from "../Model/SnackBar";

const TeamTable = () => {
  const { data: teamData, refetch: teamMemberRefetch } = useFetchDataTeam();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [matchingId, setMatchingId] = useState("");

  const handleOpen = (data) => {
    setOpen(true);
    setIsEdit(false);
  };
  const handleClose = () => setOpen(false);
  const handleOpenEdit = (data, isEditAble) => {
    setOpen(true);
    setEdit(data);
    setIsEdit(true);
  };
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
  // const actionColumn = [
  //   {
  //     field: "action",
  //     headerName: "Actions",
  //     width: 200,
  //     renderCell: () => {
  //       return (
  //         <div className="cellAction">
  //           <div className="deleteButton">
  //             <DeleteIcon />
  //           </div>
  //           <div className="viewButton">
  //             <ModeIcon />
  //           </div>
  //         </div>
  //       );
  //     },
  //   },
  // ];

  const {
    mutate: deleteFinish,
    error: finishDeleteError,
    isSuccess: deleteSuccess,
    isLoading: loaderForDelete,
  } = useDeleteTeamMembers();
  const handleTeamMemberDelete = (id) => {
    deleteFinish(id);
    setMatchingId(id);
    if (deleteSuccess) {
      showSnackbar("Deleted Successfully ", "warning");
      teamMemberRefetch();
    }
  };
  React.useEffect(() => {
    if (deleteSuccess) {
      teamMemberRefetch();
      showSnackbar("Deleted Successfully ", "warning");
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
              onClick={() => handleTeamMemberDelete(id)}
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
  return (
    <>
      <Box
        sx={{
          backgroundColor: "white",
          height: "98.2vh",
          borderTopLeftRadius: 30,
          borderBottomLeftRadius: 30,
          paddingLeft: 1,
          pt: 2,
        }}
      >
        <div className="page-title">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "98%"
            }}
          >
            <Typography sx={{ fontSize: 30, pl: 2 }}>Team Memebers</Typography>
            <Box sx={{ width: "200px" }}>
              <Button
                sx={{ backgroundColor: "#8477DA", padding: 1.2, boxShadow: 0, }}
                fullWidth
                variant="contained"
                onClick={() => setOpen(true)}
              >
                Add Members
              </Button>
            </Box>
          </Box>
        </div>
        <div className="CustomerTable">
          <DataGrid
            getRowId={(row) => row._id}
            rows={teamData}
            columns={teamColumns.concat(actionColumn)}
            paginationModel={{ page: 0, pageSize: 8 }}
          />
        </div>

        <AddTeamMembers
          open={open}
          close={handleClose}
          data={edit}
          isEdit={isEdit}
          refetch={teamMemberRefetch}
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

export default TeamTable;
