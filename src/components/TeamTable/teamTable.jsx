import React, { useState } from "react";
import "./teamTable.scss";
import { teamColumns } from "../../customerTableSource";
import ModeIcon from "@mui/icons-material/Mode";
import DeleteIcon from "@mui/icons-material/Delete";
import { Search } from '@mui/icons-material';
import { DataGrid } from "@mui/x-data-grid";
import { Box, CircularProgress, IconButton, Typography,Input,InputAdornment } from "@mui/material";
import {
  useDeleteTeamMembers,
  useFetchDataTeam,
} from "../../utilities/ApiHooks/team";
import AddTeamMembers from "../Modal/addTeamMembers";
import Snackbars from "../Modal/snackBar";
import { Add } from "@mui/icons-material";

const TeamTable = () => {
  const { data: teamData, refetch: teamMemberRefetch } = useFetchDataTeam();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [matchingId, setMatchingId] = useState("");
  const filteredData = teamData?.filter(
    (team) =>
    team.name.toLowerCase().includes(search.toLowerCase()) ||
    team.email.toLowerCase().includes(search.toLowerCase())
  );
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
        <Input
          placeholder="Search by Name or Email"
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
      <div className="CustomerTable">
          {filteredData.length >= 1 ? (
            <DataGrid
              getRowId={(row) => row._id}
              rows={filteredData}
              columns={teamColumns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 2,
                  },
                },
              }}
              pageSizeOptions={[2]}
              sx={{width: "100%"}}
            />
          ) : (
            <Typography
              sx={{ textAlign: "center", fontSize: 20, color: "gray", py: 2 }}
            >
              No Team Found
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
