import { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  Input,
  InputAdornment,
  CircularProgress,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import "./superAdmin.scss";
import {
  useFetchAdminLocation,
  useDeleteStaff,
  useFetchAllStaff,
} from "../../utilities/ApiHooks/superAdmin";
import TableRow from "./tableRow";
import {
  ArrowBack,
  ArrowForward,
  // DeleteOutlineOutlined,
  // EditOutlined,
} from "@mui/icons-material";
import { AdminColumns } from "../../customerTableSource";
// import { useFetchDataAdmin } from "../../utilities/ApiHooks/superAdmin";
import { Search } from "@mui/icons-material";
import LocationModel from "../Modal/locationModel";
import DeleteIcon from "../../Assets/Delete-Icon.svg";
import EditIcon from "../../Assets/d.svg";
// import { useDispatch } from "react-redux";
// import { showSnackbar } from "../../redux/snackBarSlice";
import DeleteModal from "../Modal/deleteModal";
import AddTeamMembers from "../Modal/addTeamMembers";

const SuperAdminTeam = () => {
  const {
    data: staffData,
    refetch: teamMemberRefetch,
    isFetching,
  } = useFetchAllStaff();
  const { mutate: usedelete, isSuccess } = useDeleteStaff();

  const [search, setSearch] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const openModel = (row) => {
    setSelectedRow(row);
    setOpen(true);
  };
  const closeModel = () => {
    setOpen(false);
  };
  const [Delete_id, setDelete_id] = useState();
  const [Delete_M, setDelete_M] = useState(false);
  const handleOpen = (id) => (setDelete_id(id), setDelete_M(true));
  const handleClose = () => {
    setDelete_M(false);
    setOpen(false);
  };

  const handeleDeleteStaff = () => {
    usedelete(Delete_id);
    handleClose();
  };
  useEffect(() => {
    teamMemberRefetch();
  }, [isSuccess]);

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [edit2, setEdit2] = useState(null);
  const [isEdit2, setIsEdit2] = useState(false);
  const handleOpenEdit = (data) => {
    setOpen2(true);
    setEdit2(data);
    setIsEdit2(true);
  };
  const { data: locationData, refetch } = useFetchAdminLocation();
  useEffect(() => {
    refetch();
  }, []);
  const actionColumn = [
    {
      field: "user_name",
      headerName: "Location",
      headerClassName: "customHeaderClass-admin-team",
      flex: 0.8,
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
            <Typography
              style={{
                maxWidth: "240px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
              color="#667085"
            >
              {matchingLocationNames.join(", ") || "Not added to any location"}
            </Typography>
          </div>
        );
      },
    },
    {
      field: "Status",
      paddingLeft: 3,
      headerClassName: "customHeaderClass-admin-team",
      flex: 0.5,
      renderCell: (params) => {
        return (
          <TableRow
            row={params.row}
            refetch={teamMemberRefetch}
            type={"superAdminTeam"}
          />
        );
      },
    },

    {
      field: "Access",
      flex: 0.6,
      headerClassName: "customHeaderClass-admin-team",
      renderCell: (params) => {
        return (
          <>
            <IconButton
              sx={{ borderRadius: 0, color: "#7F56D9" }}
              onClick={() => openModel(params.row)}
            >
              <h6>Modify Access</h6>
            </IconButton>
          </>
        );
      },
    },

    {
      field: "Action",
      flex: 0.4,
      headerClassName: "customHeaderClass-admin-team",
      renderCell: (params) => {
        console.log(params, "id");
        const id = params.row._id;

        return (
          <>
            <IconButton
              sx={{ p: 0, borderRadius: "100%", width: 28, height: 28 }}
              onClick={() => handleOpen(id)}
            >
              <img src={DeleteIcon} alt="delete icon" />
            </IconButton>
            <IconButton
              sx={{ p: 0, borderRadius: "100%", width: 28, height: 28 }}
              onClick={() => handleOpenEdit(params.row)}
            >
              <img src={EditIcon} alt="EDIT icon" />
            </IconButton>
          </>
        );
      },
    },
  ];
  const filteredData = staffData?.filter((staff) =>
    staff.name.toLowerCase().includes(search.toLowerCase())
  );
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
      <Box sx={{ pt: 2, width: "100%", m: "auto" }}>
        <Typography sx={{ ml: 2, fontSize: 24, fontWeight: "bold" }}>
          Team
        </Typography>
        <Box
          sx={{
            m: 3,
            border: "1px solid #EAECF0",
            borderRadius: "8px",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
            <Typography sx={{ ml: 2, fontSize: 24, fontWeight: "bold" }}>
              Team
            </Typography>
            <TextField
              placeholder="Search by Name"
              variant="standard"
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{
                mb: 2,
                width: "20%",
                marginLeft: "30px",
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
          </Box>
          {isFetching ? (
            <Box
              sx={{
                width: "100%",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                height: "300px",
                alignItems: "center",
              }}
            >
              <CircularProgress sx={{ color: "#8477DA" }} />
            </Box>
          ) : filteredData.length === 0 ? (
            <Typography sx={{ color: "#667085", p: 2, textAlign: "center" }}>
              No Team Found
            </Typography>
          ) : (
            <div className="CustomerTable">
              {filteredData.length > 0 ? (
                <DataGrid
                  style={{
                    border: "none",
                  }}
                  getRowId={(row) => row._id}
                  rows={filteredData?.slice(
                    (page - 1) * itemsPerPage,
                    page * itemsPerPage
                  )}
                  columns={AdminColumns?.concat(actionColumn)}
                  page={page}
                  pageSize={itemsPerPage}
                  rowCount={filteredData?.length}
                  sx={{ width: "100%" }}
                  hideFooter
                />
              ) : (
                <Box
                  sx={{ padding: "10px 0px", fontSize: "18px", color: "gray" }}
                >
                  No Team member found
                </Box>
              )}
              {/* button Box */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px",
                  borderTop: "1px solid #EAECF0",
                  width: "98%",
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
                      onClick={() => setPage(pagenumber)}
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
                        cursor: "pointer",
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
            </div>
          )}
        </Box>
        <DeleteModal
          close={handleClose}
          open={Delete_M}
          handleDelete={handeleDeleteStaff}
        />
        <LocationModel
          open={open}
          onClose={closeModel}
          selectedRow={selectedRow}
          staffRefetch={teamMemberRefetch}
          // filteredAdminData={filteredAdminData}
          // notAdded={notAdded}
          // AdminData={AdminData}
        />
        <AddTeamMembers
          open={open2}
          close={() => {
            setOpen2(false);
          }}
          data={edit2}
          isEdit={isEdit2}
          refetch={teamMemberRefetch}
        />
      </Box>
    </>
  );
};
export default SuperAdminTeam;
