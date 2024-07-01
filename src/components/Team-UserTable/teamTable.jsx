import React, { useEffect, useState } from "react";
import "./teamTable.scss";
import { teamColumns } from "@/utilities/DataGridColumns";
import ModeIcon from "@mui/icons-material/Mode";
import { ArrowBack, ArrowForward, Search } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  CircularProgress,
  IconButton,
  Typography,
  Input,
  InputAdornment,
  TextField,
  Button,
} from "@mui/material";
import {
  useAddLocation,
  useDeleteTeamFromOne,
  useDeleteTeamMembers,
  useFetchDataTeam,
} from "../../utilities/ApiHooks/team";
import AddTeamMembers from "../Modal/addTeamMembers";
import Snackbars from "../Modal/snackBar";
import DeleteIcon from "../../Assets/Delete-Icon.svg";
import { useFetchAdminLocation } from "../../utilities/ApiHooks/superAdmin";
import CustomIconButton from "../ui-components/CustomButton";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../../redux/snackBarSlice";
import { parseJwt } from "../ProtectedRoute/authVerify";
import DeleteModal from "../Modal/deleteModal";
import { MAX_PAGES_DISPLAYED, itemsPerPage } from "@/utilities/constants";
import NewPagination from "../Pagination";

const TeamTable = () => {
  const { data: stafData, refetch: teamMemberRefetch } = useFetchDataTeam();
  const { mutate: editTeamMembers, isSuccess } = useAddLocation();
  console.log("team", stafData);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [matchingId, setMatchingId] = useState("");
  const token = localStorage.getItem("token");
  const decodedToken = parseJwt(token);
  const filteredData = stafData?.filter((team) =>
    team.name.toLowerCase().includes(search.toLowerCase())
  );
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteRecord, setDeleteRecord] = useState(null);
  // pagination state:
  const [page, setPage] = useState(1);
  const [inputPage, setInputPage] = useState("");
  const [isShowInput, setIsShowInput] = useState(false);

  const handleClose = () => setOpen(false);
  const handleOpenEdit = (data) => {
    setOpen(true);
    setEdit(data);
    setIsEdit(true);
  };
  const {
    mutate: deleteTeamMember,
    isSuccess: deleteSuccess,
    isLoading: loaderForDelete,
  } = useDeleteTeamMembers();
  const handleOpenDeleteModal = (teamdata) => {
    setDeleteRecord(teamdata);
    setDeleteModalOpen(true);
  };
  const handleTeamMemberDelete = async () => {
    if (deleteRecord?.company_id !== decodedToken.company_id) {
      const haveAccessss = deleteRecord.haveAccessTo.filter(
        (item) => item !== decodedToken.company_id
      );
      await editTeamMembers({
        data: haveAccessss,
        locId: deleteRecord._id,
      });
      // teamMemberRefetch();
    } else {
      console.log("delete finish");
      await deleteTeamMember(deleteRecord._id);
      setMatchingId(deleteRecord._id);
      // teamMemberRefetch();
    }
    setDeleteModalOpen(false);
  };

  React.useEffect(() => {
    if (deleteSuccess) {
      teamMemberRefetch();
    } else if (isSuccess) {
      teamMemberRefetch();
    }
  }, [deleteSuccess, isSuccess]);
  const { data: locationData, refetch } = useFetchAdminLocation();
  useEffect(() => {
    teamMemberRefetch();
    refetch();
  }, []);
  const actionColumn = [
    {
      field: "Access",
      headerName: "Access",
      headerClassName: "customHeaderClass-team",
      flex: 1,
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
      headerClassName: "customHeaderClass-team",
      flex: 1,
      renderCell: (params) => {
        const id = params.row._id;
        const isMatchingId = id === matchingId;
        return (
          <div className="cellAction">
            <div
              className="deleteButton"
              onClick={() => handleOpenDeleteModal(params.row)}
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
        }}
      >
        <div className="page-title">
          <Typography sx={{ fontSize: 30, pl: 2, color: "#101828" }}>
            Users
          </Typography>
        </div>
        <Box
          sx={{
            border: "1px solid #EAECF0",
            borderRadius: "8px",
            width: "97%",
            m: "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "95%",
              p: 2,
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "18px",
                color: "#101828",
                fontWeight: 500,
              }}
            >
              Users
            </Typography>
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
            <Box>
              <CustomIconButton
                handleClick={() => (setOpen(true), setIsEdit(false))}
                buttonText="Add User"
              />
            </Box>
          </Box>

          <div className="CustomerTable-team">
            {filteredData.length >= 1 ? (
              <>
                <DataGrid
                  style={{
                    border: "none",
                  }}
                  getRowId={(row) => row._id}
                  rows={filteredData.slice(
                    (page - 1) * itemsPerPage,
                    page * itemsPerPage
                  )}
                  columns={teamColumns.concat(actionColumn)}
                  page={page}
                  pageSize={itemsPerPage}
                  rowCount={filteredData.length}
                  // pageSizeOptions={[1, , 25]}
                  sx={{ width: "100%" }}
                  hideFooter
                />
                
                <NewPagination
                  totalRecords={filteredData.length ? filteredData.length : 0}
                  setIsShowInput={setIsShowInput}
                  isShowInput={isShowInput}
                  setInputPage={setInputPage}
                  inputPage={inputPage}
                  page={page}
                  setPage={setPage}
                />
              </>
            ) : (
              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: 20,
                  color: "#667085",
                  py: 2,
                }}
              >
                No Users found
              </Typography>
            )}
          </div>
        </Box>
        <DeleteModal
          open={deleteModalOpen}
          close={() => {
            setDeleteModalOpen(false);
          }}
          isLoading={loaderForDelete}
          handleDelete={handleTeamMemberDelete}
        />
        <AddTeamMembers
          open={open}
          close={handleClose}
          data={edit}
          isEdit={isEdit}
          refetch={teamMemberRefetch}
        />
      </Box>
    </>
  );
};

export default TeamTable;
