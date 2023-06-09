import React, { useEffect, useState } from "react";
import "./SuperAdmin.scss";
import { AdminColumns, teamColumns } from "../../customerTableSource";

import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  Typography,
} from "@mui/material";
import Snackbars from "../Model/SnackBar";
import {
  useFetchDataAdmin,
  useUserStatus,
} from "../../utilities/ApiHooks/SuperAdmin";
import AddSuperAdminModel from "../Model/AddSuperAdminModel";
import { Delete } from "@mui/icons-material";
import TableRow from "./TableRow";

const SuperAdminTable = () => {
  const { data: AdminData, refetch: teamMemberRefetch } = useFetchDataAdmin();
  
  const [open, setOpen] = useState(false);
  // const [matchingId, setMatchingId] = useState("");
  // console.log(matchingId, "matchingId")

  console.log(AdminData, "AdminData");

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
  console.log(AdminData, "teamDatateamData");

  const handleSwitch = (row) => {
    console.log(row, "row");
    // deleteFinish(id);
    // setMatchingId(id);
  };

  const actionColumn = [
    {
      field: " ",
      // headerName: (
      //   // <div onClick={handleOpen}>
      //   //   <img src={plus} alt="Add More" />
      //   // </div>
      // ),
      width: 220,
      renderCell: (params) => {
        const id = params.row._id;
        console.log(params.row, "params id");
        // const isMatchingId = id === matchingId;

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
