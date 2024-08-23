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
import { useDeleteDocument, useEditDocument, useFetchAllDocuments } from "@/utilities/ApiHooks/common";
import { debounce } from "lodash";
import dayjs from "dayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers";

const routePrefix = `${backendURL}/staffs`;
const itemsPerPage = 10;

const TeamTable = () => {
  // const {
  //   data: stafData,
  //   refetch: teamMemberRefetch,
  //   isFetching,
  // } = useFetchDataTeam();
  const decryptedToken = getDecryptedToken();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openModifyModal, setOpenModifyModal] = useState(false);
  const [recordToModify, setRecordToModify] = useState(null);
  const fetchAllStaffUrl = useMemo(() => {
    let url = `${routePrefix}?page=${page}&limit=${itemsPerPage}`;
    if (search && search.length) {
      url += `&search=${search}`;
    }
    if (status) {
      url += `&status=${status}`;
    }
    if (selectedDate) {
      url += `&date=${selectedDate}`
    }
    return url;
  }, [page, itemsPerPage, search, status, selectedDate])

  const {
    data: staffsList,
    refetch: refetchStaffsList,
    isFetching: staffsListFetching,
    isLoading
  } = useFetchAllDocuments(fetchAllStaffUrl);
  const { mutateAsync: deleteStaff, isLoading: deleteStaffLoading, isSuccess: deletedSuccessfully } = useDeleteDocument();
  const { mutateAsync: updateStaff, isLoading: updateStaffLoading, isSuccess: updateStaffSuccess } = useEditDocument();
  const { data: locations, refetch: refetchLocationsList } = useFetchAllDocuments(`${backendURL}/companies`);
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
      const adjustedDate = dayjs(newDate).hour(12).minute(0).second(0).millisecond(0);
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
          apiRoute: `${routePrefix}/${recordToModify?._id}`, data: {
            haveAccessTo: haveAccessToArray
          }
        });
      } else {
        await deleteStaff({ apiRoute: `${routePrefix}/${recordToModify?._id}` });
      }
      setOpenDeleteModal(false);
      refetchStaffsList();
    }
    catch (err) {
      console.log(err, 'error while deleting');
    }
  };

  const debouncedRefetch = useCallback(
    debounce(() => {
      if (page === 1) {
        refetchStaffsList();
      } else {
        setPage(1);
      }
    }, 700),
    [page]
  );

  useEffect(() => {
    refetchStaffsList();
  }, [page, deletedSuccessfully, status, selectedDate]);

  useEffect(() => {
    debouncedRefetch();
    // Cleanup function to cancel debounce if component unmounts
    return () => {
      debouncedRefetch.cancel();
    };
  }, [search]);

  useEffect(() => {
    refetchLocationsList();
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
          ?.map((accessToID) =>
            locations?.find((location) => location.id === accessToID)
          )
          ?.filter((match) => match)
          ?.map((match) => match.name);

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

  return (
    <>
      <Box
        sx={{
          backgroundColor: { sm: "#F6F5FF", xs: '#FFFFFF' },
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
              onClick={handleCreateStaff}
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
                    fontSize: "0.875rem",
                    top: "-6px", // Adjust label size
                  },
                }}
                renderInput={(params) => <TextField {...params} size="small" />}
              />
            </Box>
            <FormControl
              sx={{ width: "152px" }}
              size="small"
              className="custom-textfield"
            >
              <InputLabel id="demo-select-small-label" className="input-label">
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
                <MenuItem value={'active'}>
                  {" "}
                  <Typography
                    className=" status-active"
                    sx={{ padding: 0, px: 2, width: "44px" }}
                  >
                    Active
                  </Typography>
                </MenuItem>
                <MenuItem value={'inactive'}>
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
            <Button variant="text" onClick={handleResetFilter}>
              Clear Filter
            </Button>
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
                  loading={staffsListFetching}
                  style={{
                    border: "none",
                  }}
                  getRowId={(row) => row._id}
                  rows={filteredData}
                  columns={teamColumns.concat(actionColumn)}
                  page={page}
                  pageSize={itemsPerPage}
                  rowCount={staffsList?.totalRecords ? staffsList?.totalRecords : 0}
                  // rowCount={filteredData.length}
                  // pageSizeOptions={[1, , 25]}
                  sx={{ width: "100%" }}
                  hideFooter
                  disableColumnMenu
                  pagination={false}
                />
                <Pagination
                  totalRecords={staffsList?.totalRecords ? staffsList?.totalRecords : 0}
                  itemsPerPage={itemsPerPage}
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
