import { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  Input,
  InputAdornment,
  CircularProgress,
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
  DeleteOutlineOutlined,
  EditOutlined,
} from "@mui/icons-material";
import { AdminColumns } from "../../customerTableSource";
import { useFetchDataAdmin } from "../../utilities/ApiHooks/superAdmin";
import { Search } from "@mui/icons-material";
import LocationModel from "../Modal/locationModel";
import Snackbars from "../Modal/snackBar";
import DeleteIcon from "../../Assets/Delete-Icon.svg";
import EditIcon from "../../Assets/d.svg";

const SuperAdminTeam = () => {
  const {
    data: staffData,
    refetch: teamMemberRefetch,
    isFetching,
  } = useFetchAllStaff();
  const { mutate: usedelete, isSuccess } = useDeleteStaff();
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

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  // console.log(selectedRow, "selectedRow");
  const openModel = (row) => {
    setSelectedRow(row);
    setOpen(true);
  };
  const closeModel = () => {
    setOpen(false);
  };

  // const filteredAdminData = AdminLocations.filter(
  //   (data) => data._id === "650bfe2699342cae578a772a"
  // );
  // const notAdded = AdminLocations.filter(
  //   (data) => data._id !== "650bfe2699342cae578a772a"
  // );
  // const filteredAdminData = AdminData.filter((data) =>
  //   selectedRow?.haveAccessTo.includes(data._id)
  // );

  const handeleDeleteStaff = (id) => {
    usedelete(id);
  };
  useEffect(() => {
    teamMemberRefetch();
  }, [isSuccess]);

  const { data: locationData } = useFetchAdminLocation();
  const actionColumn = [
    {
      field: "user_name",
      headerName: "Location",
      headerClassName: "customHeaderClass-admin-team",
      width: 300,
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
      width: 180,
      renderCell: (params) => {
        return <TableRow row={params.row} refetch={teamMemberRefetch} />;
      },
    },

    {
      field: "Access",
      width: 165,
      align: "right",
      headerClassName: "customHeaderClass-admin-team",
      renderCell: (params) => {
        return (
          <>
            <IconButton
              sx={{ borderRadius: 0, color: "#7F56D9" }}
              onClick={() => openModel(params.row)}
            >
              <h6>Access Location</h6>
            </IconButton>
          </>
        );
      },
    },

    {
      field: "Action",
      width: 165,
      headerClassName: "customHeaderClass-admin-team",
      align: "right",
      renderCell: (params) => {
        console.log(params, "id");
        const id = params.row._id;

        return (
          <>
            <IconButton
              sx={{ p: 0, borderRadius: "100%", width: 28, height: 28 }}
              onClick={() => handeleDeleteStaff(id)}
            >
              <img src={DeleteIcon} alt="delete icon" />
            </IconButton>
            <IconButton
              sx={{ p: 0, borderRadius: "100%", width: 28, height: 28 }}
            >
              <img src={EditIcon} alt="delete icon" />
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
            <Input
              placeholder="Search by Name"
              variant="outlined"
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{
                mb: 2,
                mt: 10,
                width: "20%",
                marginLeft: "30px",
                mt: 1,
              }}
              endAdornment={
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              }
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
          ) : (
            <div className="CustomerTable">
              <DataGrid
                style={{
                  border: "none",
                }}
                getRowId={(row) => row._id}
                rows={filteredData.slice(
                  (page - 1) * itemsPerPage,
                  page * itemsPerPage
                )}
                columns={AdminColumns.concat(actionColumn)}
                page={page}
                pageSize={itemsPerPage}
                rowCount={filteredData.length}
                sx={{ width: "100%" }}
                hideFooter
              />
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
            </div>
          )}
        </Box>
        <LocationModel
          open={open}
          onClose={closeModel}
          selectedRow={selectedRow}
          staffRefetch={teamMemberRefetch}
          showSnackbar={showSnackbar}
          // filteredAdminData={filteredAdminData}
          // notAdded={notAdded}
          // AdminData={AdminData}
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
export default SuperAdminTeam;
