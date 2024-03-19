import { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  InputAdornment,
  CircularProgress,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import "./superAdmin.scss";
import {
  useDataCustomUser,
  useDeleteCustomerUser,
  useDeleteStaff,
  useDeleteUser,
  useFetchAllStaff,
} from "../../utilities/ApiHooks/superAdmin";
import TableRow from "./tableRow";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { AdminColumns } from "../../customerTableSource";
import { Search } from "@mui/icons-material";
import DeleteIcon from "../../Assets/Delete-Icon.svg";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../../redux/snackBarSlice";
import DeleteModal from "../Modal/deleteModal";
import EditIcon from "../../Assets/d.svg";
import CustomUserCreateModal from "../Modal/addCustomUserAdmin";
import { tuple } from "yup";

const SuperAdminUser = () => {
  const {
    data: customUserData,
    refetch: teamMemberRefetch,
    isFetching,
  } = useDataCustomUser();
  const { mutate: usedelete, isSuccess, isLoading } = useDeleteCustomerUser();

  const [search, setSearch] = useState("");
  const [Delete_id, setDelete_id] = useState(null);
  const [Delete_M, setDelete_M] = useState(false);
  const [Create_Edit_M, setCreate_Edit_M] = useState(false);
  const [isEdit, setisEdit] = useState({ type: false, data: null });

  const handleOpen = (id) => {
    setDelete_id(id);
    setDelete_M(true);
  };
  const handleClose = () => setDelete_M(false);
  const handleOpenCreate = () => {
    setCreate_Edit_M(true);
  };
  const handleOpenEdit = (item) => {
    setCreate_Edit_M(true);
    setisEdit({ type: true, data: item });
  };
  const handleCloseCreate = () => {
    setCreate_Edit_M(false);
    setisEdit({ type: false });
  };
  const handeleDeleteStaff = () => {
    usedelete(Delete_id);
  };
  useEffect(() => {
    if (isSuccess) {
      teamMemberRefetch();
      handleClose();
    }
  }, [isSuccess]);

  const actionColumn = [
    {
      field: "Status",
      paddingLeft: 3,
      headerClassName: "customHeaderClass-admin-team",
      flex: 1,
      renderCell: (params) => {
        return (
          <TableRow
            row={params.row}
            refetch={teamMemberRefetch}
            type={"superAdminUser"}
          />
        );
      },
    },
    {
      field: "Action",
      flex: 0.5,
      headerClassName: "customHeaderClass-admin-team",
      renderCell: (params) => {
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
              onClick={() => handleOpenEdit(params.row)}
              sx={{ p: 0, borderRadius: "100%", width: 28, height: 28 }}
            >
              <img src={EditIcon} alt="delete icon" />
            </IconButton>
          </>
        );
      },
    },
  ];
  const filteredData = customUserData?.filter((staff) =>
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
    const startPage = Math.max(1, page - 2);
    const endPage = Math.min(totalPages, startPage + MAX_PAGES_DISPLAYED - 1);

    if (startPage > 1) {
      pagesToShow.push(1);
      if (startPage > 2) {
        pagesToShow.push("...");
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pagesToShow.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pagesToShow.push("...");
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
        <Box sx={{ display: "flex", justifyContent: "space-between", p: 1 }}>
          <Typography sx={{ ml: 2, fontSize: 26, fontWeight: "bold" }}>
            Admins
          </Typography>
          <Button
            sx={{
              bgcolor: "#8477da",
              color: "white",
              textTransform: "capitalize",
              width: 120,
              height: 40,
              fontSize: 16,
              ":hover": {
                bgcolor: "#8477da",
              },
              mr: 2,
            }}
            onClick={handleOpenCreate}
          >
            Add Admin
          </Button>
        </Box>
        <Box
          sx={{
            m: 3,
            border: "1px solid #EAECF0",
            borderRadius: "8px",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
            <Typography sx={{ ml: 2, fontSize: 24, fontWeight: "bold" }}>
              Admins
            </Typography>
            <TextField
              placeholder="Search by Name"
              variant="standard"
              fullWidth={false}
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
          ) : customUserData.length === 0 ? (
            <Typography sx={{ color: "#667085", textAlign: "center", p: 3 }}>
              No Admin Found
            </Typography>
          ) : filteredData.length !== 0 ? (
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
          ) : (
            <Box sx={{ color: "#667085", textAlign: "center", p: 3 }}>
              No Admin Found
            </Box>
          )}
        </Box>
        <DeleteModal
          close={handleClose}
          open={Delete_M}
          isLoading={isLoading}
          handleDelete={handeleDeleteStaff}
        />
        <CustomUserCreateModal
          close={handleCloseCreate}
          open={Create_Edit_M}
          refetch={teamMemberRefetch}
          isEdit={isEdit}
        />
      </Box>
    </>
  );
};
export default SuperAdminUser;
