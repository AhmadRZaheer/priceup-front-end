import React, { useState } from "react";
import "./teamTable.scss";
import { teamColumns } from "../../customerTableSource";
import ModeIcon from "@mui/icons-material/Mode";
import DeleteIcon from "@mui/icons-material/Delete";

import { DataGrid } from "@mui/x-data-grid";
import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import {
  useDeleteTeamMembers,
  useFetchDataTeam,
} from "../../utilities/ApiHooks/team";
import AddTeamMembers from "../Modal/addTeamMembers";
import Snackbars from "../Modal/snackBar";
import { Add } from "@mui/icons-material";

const TeamTable = () => {
  const { data: teamData, refetch: teamMemberRefetch } = useFetchDataTeam();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [matchingId, setMatchingId] = useState("");

  const handleClose = () => setOpen(false);
  const handleOpenEdit = (data) => {
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

  const {
    mutate: deleteFinish,
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
              <IconButton
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
                <ModeIcon sx={{ color: "white", fontSize: 18, pr: 0.4 }} /> Edit
              </IconButton>
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
          paddingLeft: 1,
          pt: 2,
        }}
      >
        <div className="page-title">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "98%",
            }}
          >
            <Typography sx={{ fontSize: 30, pl: 2 }}>Team Memebers</Typography>
            <Box sx={{ width: "200px" }}>
              <IconButton
                sx={{
                  backgroundColor: "#8477DA",
                  "&:hover": { backgroundColor: "#8477DA" },
                  color: "white",
                  textTransform: "capitalize",
                  borderRadius: 2,
                  fontSize: 20,
                  padding: 1,
                  mt: 1,
                }}
                fullWidth
                variant="contained"
                onClick={() => (setOpen(true), setIsEdit(false))}
              >
                <Add sx={{ color: "white" }} />
                Add Member
              </IconButton>
            </Box>
          </Box>
        </div>
        <div className="CustomerTable">
          {teamData?.length >= 1 ? (
            <DataGrid
              getRowId={(row) => row._id}
              rows={teamData}
              columns={teamColumns.concat(actionColumn)}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              pageSizeOptions={[10]}
            />
          ) : (
            <Typography
              sx={{ textAlign: "center", py: 2, fontSize: 20, color: "gray" }}
            >
              Team Member not Found
            </Typography>
          )}
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
