import React, { useEffect, useState } from "react";
import "./teamTable.scss";
import { teamColumns } from "@/utilities/DataGridColumns";
import { Add } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import icon from "../../Assets/search-icon.svg";
import {
  Box,
  CircularProgress,
  IconButton,
  Typography,
  InputAdornment,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  useAddLocation,
  useDeleteTeamMembers,
  useFetchDataTeam,
} from "../../utilities/ApiHooks/team";
import AddTeamMembers from "../Modal/addTeamMembers";
import DeleteIcon from "../../Assets/Delete-Icon.svg";
import { useFetchAdminLocation } from "../../utilities/ApiHooks/superAdmin";
import { parseJwt } from "../ProtectedRoute/authVerify";
import DeleteModal from "../Modal/deleteModal";
import { itemsPerPage } from "@/utilities/constants";
import Pagination from "../Pagination";
import EditIcon from "../../Assets/d.svg";
import CustomInputField from "../ui-components/CustomInput";

const TeamTable = () => {
  const {
    data: stafData,
    refetch: teamMemberRefetch,
    isFetching,
  } = useFetchDataTeam();
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
  // const [inputPage, setInputPage] = useState("");
  // const [isShowInput, setIsShowInput] = useState(false);

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
  }, [page]);
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
            <Typography className="new-table-text">
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
            <IconButton onClick={() => handleOpenEdit(params.row)}>
              <img src={EditIcon} alt="edit icon" />
            </IconButton>
            <IconButton
              className="deleteButton"
              onClick={() => handleOpenDeleteModal(params.row)}
            >
              {isMatchingId && loaderForDelete ? (
                <CircularProgress size={24} color="warning" />
              ) : (
                <img src={DeleteIcon} alt="delete icon" />
              )}
            </IconButton>
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            px: 3.5,
            py: 2,
          }}
        >
          <Box>
            <Typography
              sx={{ fontSize: "24px", color: "#101828", fontWeight: 600 }}
            >
              Users List
            </Typography>
            <Typography
              sx={{ fontSize: "16px", fontWeight: 600, color: "#606366" }}
            >
              Add, edit and manage your Users.
            </Typography>
          </Box>
          <Box>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#8477DA",
                "&:hover": { backgroundColor: "#8477DA" },
                color: "white",
                textTransform: "capitalize",
                borderRadius: 2,
                fontSize: 17,
                padding: 1,
                px: 2,
              }}
              onClick={() => (setOpen(true), setIsEdit(false))}
            >
              <Add color="white" sx={{ mr: 1 }} />
              Add New User
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            px: 3,
            my: 2,
          }}
        >
          <Typography sx={{ fontSize: 24, fontWeight: "bold" }}>
            Users
          </Typography>

          <Box sx={{ display: "flex", gap: 2 }}>
            <CustomInputField
              id="input-with-icon-textfield"
              placeholder="Search by User Name"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={icon} alt="search input" />
                  </InputAdornment>
                ),
              }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FormControl
              sx={{ width: "152px" }}
              size="small"
              className="custom-textfield"
            >
              <InputLabel id="demo-select-small-label" className="input-label">
                Status
              </InputLabel>
              <Select
                // value={age}
                size="small"
                labelId="demo-select-small-label"
                id="demo-select-small"
                label="Status"
                sx={{ height: "40px" }}
                // onChange={handleChange}
              >
                <MenuItem value={"active"}>Active</MenuItem>
                <MenuItem value={"inActive"}>inActive</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Box
          sx={{
            border: "1px solid rgba(208, 213, 221, 1)",
            borderRadius: "8px",
            overflow: "hidden",
            width: "97%",
            m: "auto",
          }}
        >
          <div className="CustomerTable-team">
            {filteredData.length >= 1 ? (
              <>
                <DataGrid
                  loading={isFetching}
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
                  disableColumnMenu
                  pagination={false}
                />
                <Pagination
                  totalRecords={filteredData.length ? filteredData.length : 0}
                  itemsPerPage={itemsPerPage}
                  page={page}
                  setPage={setPage}
                />
                {/* <NewPagination
                  totalRecords={filteredData.length ? filteredData.length : 0}
                  setIsShowInput={setIsShowInput}
                  isShowInput={isShowInput}
                  setInputPage={setInputPage}
                  inputPage={inputPage}
                  page={page}
                  setPage={setPage}
                /> */}
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
          SelectedData={edit}
          isEdit={isEdit}
          refetch={teamMemberRefetch}
        />
      </Box>
    </>
  );
};

export default TeamTable;
