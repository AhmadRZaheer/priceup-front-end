import React, { useState } from "react";
import "./teamTable.scss";
import { teamColumns } from "../../customerTableSource";
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

const   TeamTable = () => {
  const { data: stafData, refetch: teamMemberRefetch } = useFetchDataTeam();
  console.log("team", stafData);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [matchingId, setMatchingId] = useState("");
  const filteredData = stafData?.filter((team) =>
    team.name.toLowerCase().includes(search.toLowerCase())
  );
  const handleClose = () => setOpen(false);
  const handleOpenEdit = (data) => {
    setOpen(true);
    setEdit(data);
    setIsEdit(true);
  };
  const showSnackbarHandler = (message, severity) => {
    dispatch(showSnackbar({ message, severity }));
  };
  const dispatch = useDispatch();

  const {
    mutate: deleteFinish,
    isSuccess: deleteSuccess,
    isLoading: loaderForDelete,
  } = useDeleteTeamMembers();
  const handleTeamMemberDelete = (id) => {
    deleteFinish(id);
    setMatchingId(id);
    if (deleteSuccess) {
      showSnackbarHandler("Deleted Successfully ", "warning");
      teamMemberRefetch();
    }
  };
  React.useEffect(() => {
    if (deleteSuccess) {
      teamMemberRefetch();
      showSnackbarHandler("Deleted Successfully ", "warning");
    }
  }, [deleteSuccess]);
  const { data: locationData } = useFetchAdminLocation();
  const actionColumn = [
    {
      field: "Access",
      headerName: "Access",
      headerClassName: "customHeaderClass-team",
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
      headerClassName: "customHeaderClass-team",
      width: 245,
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

  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const MAX_PAGES_DISPLAYED = 5;

  const getPageNumbersToShow = () => {
    if (totalPages <= MAX_PAGES_DISPLAYED) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const pagesToShow = [];
    const startPage = Math.max(1, page - 2); // Display three on the first side
    const endPage = Math.min(totalPages, startPage + MAX_PAGES_DISPLAYED - 1);

    if (startPage > 1) {
      pagesToShow.push(1);
      if (startPage > 2) {
        pagesToShow.push("..."); // Display ellipsis if there are skipped pages
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pagesToShow.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pagesToShow.push("..."); // Display ellipsis if there are skipped pages
      }
      pagesToShow.push(totalPages);
    }

    return pagesToShow;
  };

  const pageNumbersToShow = getPageNumbersToShow();

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

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
          <Typography sx={{ fontSize: 30, pl: 2, color: "#101828" }}>
            Team Memebers
          </Typography>
        </div>
        <Box
          sx={{ border: "1px solid #EAECF0", borderRadius: "8px", m: 3, mr: 4 }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "96%",
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
              Team Memebers
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
                buttonText="Add member"
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
                  pageSizeOptions={[1, , 25]}
                  sx={{ width: "100%" }}
                  hideFooter
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "10px",
                    borderTop: "1px solid #EAECF0",
                  }}
                >
                  <Button
                    sx={{
                      border: "1px solid #D0D5DD",
                      color: "#344054",
                      borderRadius: "8px",
                      textTransform: "capitalize",
                      fontWeight: 500,
                      ":hover": {
                        border: "1px solid #D0D5DD",
                        color: "#344054",
                      },
                    }}
                    variant="outlined"
                    onClick={handlePreviousPage}
                    disabled={page === 0}
                  >
                    <ArrowBack sx={{ color: "#344054", fontSize: 20, mr: 1 }} />
                    Previous
                  </Button>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    {pageNumbersToShow.map((pagenumber, index) => (
                      <Box
                        key={index}
                        sx={{
                          backgroundColor:
                            page === pagenumber
                              ? "rgba(144, 136, 192, 0.2)"
                              : "white",
                          color: page === pagenumber ? "#353050" : "#667085",
                          width: "40px",
                          height: "40px",
                          borderRadius: "8px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {pagenumber}
                      </Box>
                    ))}
                  </Box>
                  <Button
                    sx={{
                      border: "1px solid #D0D5DD",
                      color: "#344054",
                      borderRadius: "8px",
                      textTransform: "capitalize",
                      fontWeight: 500,
                      ":hover": {
                        border: "1px solid #D0D5DD",
                        color: "#344054",
                      },
                    }}
                    onClick={handleNextPage}
                    disabled={filteredData.length === 0}
                  >
                    Next
                    <ArrowForward
                      sx={{ color: "#344054", fontSize: 20, ml: 1 }}
                    />
                  </Button>
                </Box>
              </>
            ) : (
              <Typography
                sx={{ textAlign: "center", fontSize: 20, color: "gray", py: 2 }}
              >
                No Team Found
              </Typography>
            )}
          </div>
        </Box>

        <AddTeamMembers
          open={open}
          close={handleClose}
          data={edit}
          isEdit={isEdit}
          refetch={teamMemberRefetch}
          showSnackbar={showSnackbarHandler}
        />
      </Box>
    </>
  );
};

export default TeamTable;
