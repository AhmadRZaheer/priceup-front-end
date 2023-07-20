import React, { useState } from "react";
import "./SuperAdmin.scss";
import { AdminColumns } from "../../customerTableSource";

import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Typography,
} from "@mui/material";
import Snackbars from "../Model/SnackBar";
import {
  useFetchDataAdmin,
} from "../../utilities/ApiHooks/SuperAdmin";
import AddSuperAdminModel from "../Model/AddSuperAdminModel";
import TableRow from "./TableRow";

const SuperAdminTable = () => {
  const { data: AdminData, refetch: teamMemberRefetch } = useFetchDataAdmin();

  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

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

  const actionColumn = [
    {
      field: " ",

      width: 220,
      renderCell: (params) => {
        const id = params.row._id;

        return <TableRow row={params.row} refetch={teamMemberRefetch} />;
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
          <Typography Boxvariant="h3">Users</Typography>
          <Box sx={{ width: "200px" }}>
            <Button fullWidth variant="contained" onClick={() => setOpen(true)}>
              Add Users
            </Button>
          </Box>
        </Box>
      </div>
      <div className="CustomerTable">
        <DataGrid
          getRowId={(row) => row._id}
          rows={AdminData}
          columns={AdminColumns.concat(actionColumn)}
          paginationModel={{ page: 0, pageSize: 8 }}
        />
      </div>

      <AddSuperAdminModel
        open={open}
        close={handleClose}
        refetch={teamMemberRefetch}
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

export default SuperAdminTable;
