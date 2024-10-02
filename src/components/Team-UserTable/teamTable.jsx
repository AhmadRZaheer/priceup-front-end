import React, { useCallback, useEffect, useState, useMemo } from "react";
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
// import {
//   useAddLocation,
//   useDeleteTeamMembers,
//   useFetchDataTeam,
// } from "../../utilities/ApiHooks/team";
import AddTeamMembers from "../Modal/addTeamMembers";
import DeleteIcon from "../../Assets/Delete-Icon.svg";
// import { useFetchAdminLocation } from "../../utilities/ApiHooks/superAdmin";
// import { parseJwt } from "../ProtectedRoute/authVerify";
import DeleteModal from "../Modal/deleteModal";
import Pagination from "../Pagination";
import EditIcon from "../../Assets/d.svg";
import CustomInputField from "../ui-components/CustomInput";
import { backendURL, getDecryptedToken } from "@/utilities/common";
import {
  useDeleteDocument,
  useEditDocument,
  useFetchAllDocuments,
} from "@/utilities/ApiHooks/common";
import { debounce } from "lodash";
import dayjs from "dayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { getAssignedLocationName } from "@/utilities/users";
import { GenrateColumns, GenrateRows } from "@/utilities/skeltonLoading";

const routePrefix = `${backendURL}/staffs`;
const itemsPerPage = 10;

const TeamTable = () => {
  const decryptedToken = getDecryptedToken();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openModifyModal, setOpenModifyModal] = useState(false);
  const [recordToModify, setRecordToModify] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const fetchAllStaffUrl = useMemo(() => {
    let url = `${routePrefix}?page=${page}&limit=${itemsPerPage}`;
    if (search && search.length) {
      url += `&search=${search}`;
    }
    if (status) {
      url += `&status=${status}`;
    }
    if (selectedDate) {
      url += `&date=${selectedDate}`;
    }
    return url;
  }, [page, itemsPerPage, search, status, selectedDate]);

  const {
    data: staffsList,
    refetch: refetchStaffsList,
    isFetching: staffsListFetching,
    isFetched,
  } = useFetchAllDocuments(fetchAllStaffUrl);
  const {
    mutateAsync: deleteStaff,
    isLoading: deleteStaffLoading,
    isSuccess: deletedSuccessfully,
  } = useDeleteDocument();
  const {
    mutateAsync: updateStaff,
    isLoading: updateStaffLoading,
    isSuccess: updateStaffSuccess,
  } = useEditDocument();
  const { data: locations, refetch: refetchLocationsList } =
    useFetchAllDocuments(`${backendURL}/companies`);
  // console.log("team", staffsList);

  const filteredData = useMemo(() => {
    if (staffsList && staffsList?.staffs?.length) {
      return staffsList?.staffs;
    } else {
      return [];
    }
  }, [staffsList, search]);

  const handleDateChange = (newDate) => {
    if (newDate) {
      // Set time to noon (12:00) to avoid time zone issues
      const adjustedDate = dayjs(newDate)
        .hour(12)
        .minute(0)
        .second(0)
        .millisecond(0);
      setSelectedDate(adjustedDate);
    } else {
      setSelectedDate(null);
    }
  };

  const handleResetFilter = () => {
    setSearch("");
    setStatus(null);
    setSelectedDate(null);
  };

  const handleCloseModifyModal = () => setOpenModifyModal(false);
  const handleOpenModifyModal = (data) => {
    setRecordToModify(data);
    setOpenModifyModal(true);
  };

  const handleCreateStaff = async () => {
    setRecordToModify(null);
    setOpenModifyModal(true);
  };

  const handleOpenDeleteModal = (data) => {
    setRecordToModify(data);
    setOpenDeleteModal(true);
  };
  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };
  const handleStaffDelete = async () => {
    try {
      if (recordToModify?.company_id !== decryptedToken.company_id) {
        const haveAccessToArray = recordToModify.haveAccessTo.filter(
          (item) => item !== decryptedToken.company_id
        );
        await updateStaff({
          apiRoute: `${routePrefix}/${recordToModify?._id}`,
          data: {
            haveAccessTo: haveAccessToArray,
          },
        });
      } else {
        await deleteStaff({
          apiRoute: `${routePrefix}/${recordToModify?._id}`,
        });
      }
      setOpenDeleteModal(false);
      refetchStaffsList();
    } catch (err) {
      console.log(err, "error while deleting");
    }
  };

  const debouncedRefetch = useCallback(
    debounce(() => {
      // Always refetch when page is 1, else reset page to 1 to trigger refetch
      if (page !== 1) {
        setPage(1); // This will trigger a refetch due to the useEffect watching `page`
      } else {
        refetchStaffsList(); // If already on page 1, just refetch directly
      }
    }, 700),
    [page, refetchStaffsList] // Ensure refetchStaffsList is included in dependencies
  );

  useEffect(() => {
    // Reset page to 1 if filters (status, selectedDate, or search) change
    if (status || selectedDate || search) {
      setPage(1);
    }
    if (search) {
      debouncedRefetch();
      return () => {
        debouncedRefetch.cancel();
      };
    } else {
      refetchStaffsList();
    }
  }, [status, selectedDate, search, page, deletedSuccessfully]);

  useEffect(() => {
    if (isFetched) {
      setIsLoading(false);
    }
  }, [isFetched]);

  useEffect(() => {
    refetchLocationsList();
  }, []);

  const actionColumn = [
    {
      field: "Access",
      headerName: "Access",
      headerClassName: "customHeaderClass-team",
      sortable: false,
      flex: 1,
      renderCell: (params) => {
        return (
          <div>
            <Typography className="new-table-text">
              {getAssignedLocationName(params.row, locations)}
            </Typography>
          </div>
        );
      },
    },
    {
      field: "Actions",
      headerClassName: "customHeaderClass-team",
      sortable: false,
      flex: 1,
      renderCell: (params) => {
        // const id = params.row._id;
        // const isMatchingId = id === matchingId;
        return (
          <div className="cellAction">
            <IconButton onClick={() => handleOpenModifyModal(params.row)}>
              <img src={EditIcon} alt="edit icon" />
            </IconButton>
            <IconButton
              className="deleteButton"
              onClick={() => handleOpenDeleteModal(params.row)}
            >
              {deleteStaffLoading ? (
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

  const SkeletonColumnsGenerated = GenrateColumns([
    "Name",
    "Email address",
    "Date Added",
    "Last quote",
    "Total quoted",
    "Status",
    "Access",
    "Actions",
  ]);
  const SkeletonRowsGenerated = GenrateRows([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          backgroundColor: { sm: "#F6F5FF", xs: "#FFFFFF" },
          // height: "98.2vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            // px: 3.5,
            pb: 2,
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: 24,
                fontWeight: 600,
                lineHeight: "32.78px",
              }}
            >
              User Management
            </Typography>
            <Typography
              sx={{
                color: "#212528",
                fontSize: "16px",
                fontWeight: 600,
                lineHeight: "21.86px",
                opacity: "70%",
              }}
            >
              Add, edit and manage your Users.
            </Typography>
          </Box>
          <Box sx={{ alignSelf: "center" }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#8477DA",
                "&:hover": { backgroundColor: "#8477DA" },
                color: "white",
                fontSize: 16,
                fontWeight: 600,
                gap: "10px",
              }}
              onClick={handleCreateStaff}
            >
              <Add color="white" />
              Add New User
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            // px: 3,
            my: 2,
          }}
        >
          <Typography sx={{ fontSize: 24, fontWeight: 600 }}>Users</Typography>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Box>
              <CustomInputField
                id="input-with-icon-textfield"
                placeholder="Search"
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
            </Box>
            <Box>
              <DesktopDatePicker
                label="Date Added"
                inputFormat="MM/DD/YYYY"
                className="custom-textfield"
                // maxDate={new Date()} // Sets the maximum date to the current date
                value={selectedDate}
                onChange={handleDateChange}
                sx={{
                  "& .MuiInputBase-root": {
                    height: 40,
                    width: 150,
                    backgroundColor: "white", // Adjust height
                  },
                  "& .MuiInputBase-input": {
                    fontSize: "0.875rem", // Adjust font size
                    padding: "8px 14px", // Adjust padding
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: "14px",
                    fontWeight: 400,
                    fontFamily: '"Roboto",sans-serif !important',
                    top: "-5px", // Adjust label size
                    color: "#000000",
                  },
                }}
                renderInput={(params) => <TextField {...params} size="small" />}
              />
            </Box>
            <Box>
              <FormControl
                sx={{ width: "152px" }}
                size="small"
                className="custom-textfield"
              >
                <InputLabel
                  id="demo-select-small-label"
                  className="input-label"
                >
                  Status
                </InputLabel>
                <Select
                  placeholder="Status"
                  value={status}
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  label="Status"
                  size="small"
                  sx={{ height: "40px" }}
                  onChange={(event) => setStatus(event.target.value)}
                >
                  <MenuItem value={"active"}>
                    {" "}
                    <Typography
                      className=" status-active"
                      sx={{ padding: 0, px: 2, width: "44px" }}
                    >
                      Active
                    </Typography>
                  </MenuItem>
                  <MenuItem value={"inactive"}>
                    {" "}
                    <Typography
                      className=" status-inActive"
                      sx={{ padding: 0, px: 2, width: "44px" }}
                    >
                      Inactive
                    </Typography>
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Button
              variant="text"
              onClick={handleResetFilter}
              sx={{
                p: "6px 8px !important",
                fontFamily: '"Roboto",sans-serif !important',
              }}
            >
              Clear Filter
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            width: "99.88%",
            borderRadius: "8px",
            overflow: "hidden",
            border: "1px solid #D0D5DD",
            m: "auto",
          }}
        >
          <div className="CustomerTable-team">
            {isLoading ? (
              <Box>
                <DataGrid
                  getRowId={(row) => row._id}
                  rows={SkeletonRowsGenerated}
                  columns={SkeletonColumnsGenerated}
                  page={1}
                  pageSize={10}
                  className="table"
                  hideFooter
                  disableColumnMenu
                  pagination={false}
                />
              </Box>
            ) : filteredData.length > 0 ? (
              <Box>
                <DataGrid
                  loading={staffsListFetching}
                  style={{
                    border: "none",
                  }}
                  getRowId={(row) => row._id}
                  rows={filteredData}
                  columns={teamColumns.concat(actionColumn)}
                  page={page}
                  pageSize={itemsPerPage}
                  rowCount={
                    staffsList?.totalRecords ? staffsList?.totalRecords : 0
                  }
                  sx={{ width: "100%" }}
                  hideFooter
                  disableColumnMenu
                  pagination={false}
                />
                <Pagination
                  totalRecords={
                    staffsList?.totalRecords ? staffsList?.totalRecords : 0
                  }
                  itemsPerPage={itemsPerPage}
                  page={page}
                  setPage={setPage}
                />
              </Box>
            ) : (
              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: 20,
                  color: "#667085",
                  py: 2,
                }}
              >
                No User found
              </Typography>
            )}
          </div>
        </Box>
        <DeleteModal
          open={openDeleteModal}
          close={handleCloseDeleteModal}
          isLoading={deleteStaffLoading}
          handleDelete={handleStaffDelete}
        />
        <AddTeamMembers
          open={openModifyModal}
          close={handleCloseModifyModal}
          recordToModify={recordToModify}
          refetchUsers={refetchStaffsList}
          locationsList={[]}
        />
      </Box>
    </>
  );
};

export default TeamTable;
