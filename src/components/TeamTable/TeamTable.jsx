import React, { useState } from "react";
import "./TeamTable.scss";
import { teamColumns, userRows } from "../../customerTableSource";
import ModeIcon from "@mui/icons-material/Mode";
import DeleteIcon from "@mui/icons-material/Delete";

import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Typography } from "@mui/material";
import { useFetchDataTeam } from "../../utilities/ApiHooks/Team";
import AddTeamMembers from "../Model/AddTeamMembers";
import Snackbars from "../Model/SnackBar";

const TeamTable = () => {
  const { data: teamData, refetch: finishesRefetch } = useFetchDataTeam();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

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
  console.log(teamData, "teamDatateamData");
  const actionColumn = [
    {
      field: "action",
      headerName: "Actions",
      width: 200,
      renderCell: () => {
        return (
          <div className="cellAction">
            <div className="deleteButton">
              <DeleteIcon />
            </div>
            <div className="viewButton">
              <ModeIcon />
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <>
      <div className="page-title">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography Boxvariant="h3">Team Memebers</Typography>
          <Box sx={{ width: "200px" }}>
            <Button fullWidth variant="contained" onClick={() => setOpen(true)}>
              Add Members
            </Button>
          </Box>
        </Box>
      </div>
      <div className="CustomerTable">
        <DataGrid
          rows={userRows}
          columns={teamColumns.concat(actionColumn)}
          paginationModel={{ page: 0, pageSize: 8 }}
        />
      </div>

      <AddTeamMembers
        open={open}
        close={handleClose}
        data={edit}
        isEdit={isEdit}
        // refetch={hardwareRefetch}
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

export default TeamTable;
