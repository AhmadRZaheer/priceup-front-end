import React, { useState } from "react";
import "./teamTable.scss";
import { teamColumns } from "../../customerTableSource";
import ModeIcon from "@mui/icons-material/Mode";
import { Search } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  CircularProgress,
  IconButton,
  Typography,
  Input,
  InputAdornment,
  TextField,
} from "@mui/material";
import {
  useDeleteTeamMembers,
  useFetchDataTeam,
} from "../../utilities/ApiHooks/team";
import AddTeamMembers from "../Modal/addTeamMembers";
import Snackbars from "../Modal/snackBar";
import DeleteIcon from "../../Assets/Delete-Icon.svg";
import { useFetchAdminLocation } from "../../utilities/ApiHooks/superAdmin";
import CustomIconButton from "../ui-components/CustomButton";

const TeamTable = () => {
  const { data: stafData, refetch: teamMemberRefetch } = useFetchDataTeam();
  console.log("team", stafData);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [matchingId, setMatchingId] = useState("");
  const filteredData = stafData?.filter(
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
  const { data: locationData } = useFetchAdminLocation();
  const actionColumn = [
    {
      field: "Access",
      headerName: "Access",
      width: 200,
      renderCell: (params) => {
        const { haveAccessTo } = params.row;

        const matchingLocationNames = haveAccessTo
          .map((accessToID) =>
            locationData.find((location) => location.id === accessToID)
          )
          .filter((match) => match)
          .map((match) => match.name);

        return (
          <div>
            <Typography color={"#667085"}>
              {matchingLocationNames.join(", ") || "No location member found"}
            </Typography>
          </div>
        );
      },
    },
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
                <img src={DeleteIcon} alt="delete icon" />
              )}
            </div>

            <div
              className="viewButton"
              onClick={() => handleOpenEdit(params.row)}
            >
              <CustomIconButton
                handleClick={() => handleOpenEdit(params.row)}
                icon={
                  <ModeIcon sx={{ color: "white", fontSize: 18, pr: 0.4 }} />
                }
                buttonText="Edit"
              />
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
                Add member
              </IconButton>
            </Box>
          </Box>
        </div>
        <TextField
          placeholder="Search by Name"
          value={search}
          variant="standard"
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            mb: 2,
            ".MuiInputBase-root:after": {
              border: "1px solid #8477DA",
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search sx={{ color: "#8477DA" }} />
              </InputAdornment>
            ),
          }}
        />
        <div className="CustomerTable">
          {filteredData.length >= 1 ? (
            <DataGrid
              getRowId={(row) => row._id}
              rows={filteredData}
              columns={teamColumns.concat(actionColumn)}
              pageSizeOptions={[10]}
              sx={{ width: "100%" }}
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
