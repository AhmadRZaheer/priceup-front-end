import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  InputAdornment,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import "./superAdmin.scss";
// import {
//   useFetchAdminLocation,
//   useDeleteStaff,
//   useFetchAllStaff,
// } from "../../utilities/ApiHooks/superAdmin";
import TableRow from "./tableRow";
import icon from "../../Assets/search-icon.svg";
import { Add } from "@mui/icons-material";
import { AdminColumns } from "@/utilities/DataGridColumns";
// import LocationModel from "../Modal/locationModel";
import DeleteIcon from "../../Assets/Delete-Icon.svg";
import EditIcon from "../../Assets/d.svg";
import DeleteModal from "../Modal/deleteModal";
import AddTeamMembers from "../Modal/addTeamMembers";
import { userRoles } from "@/utilities/constants";
import Pagination from "../Pagination";
import CustomInputField from "../ui-components/CustomInput";
import WidgetCard from "../ui-components/widgetCard";
import {
  useDeleteDocument,
  useFetchAllDocuments,
} from "@/utilities/ApiHooks/common";
import dayjs from "dayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { debounce } from "lodash";
import { backendURL } from "@/utilities/common";
import { getAssignedLocationName } from "@/utilities/users";

const getUserRoleText = (role) => {
  switch (role) {
    case userRoles.SUPER_ADMIN:
      return "Super Admin";
    case userRoles.STAFF:
      return "User";
    case userRoles.CUSTOM_ADMIN:
      return "Admin";
    default:
      return "---";
  }
};

const routePrefix = `${backendURL}/admins`;

const SuperAdminTeam = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(null);
  const [role, setRole] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [recordToModify, setRecordToModify] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openModifyModal, setOpenModifyModal] = useState(false);
  const itemsPerPage = 10;
  const fetchAllUsersUrl = useMemo(() => {
    let url = `${routePrefix}/all-users?page=${page}&limit=${itemsPerPage}`;
    if (search && search.length) {
      url += `&search=${search}`;
    }
    if (status) {
      url += `&status=${status}`;
    }
    if (role) {
      url += `&role=${role}`;
    }
    if (selectedDate) {
      url += `&date=${selectedDate}`;
    }
    return url;
  }, [page, itemsPerPage, search, status, role, selectedDate]);

  const {
    data: usersList,
    refetch: refetchUsersList,
    isFetching: usersListFetching,
    isLoading,
  } = useFetchAllDocuments(fetchAllUsersUrl);
  const { mutateAsync: deleteUser, isSuccess: deletedSuccessfully } =
    useDeleteDocument();
  const { data: locations, refetch: refetchLocationsList } =
    useFetchAllDocuments(`${backendURL}/companies`);
  const locationsList = useMemo(() => {
    return locations ? locations : [];
  }, [locations]);

  const filteredData = useMemo(() => {
    if (usersList && usersList?.users?.length) {
      return usersList?.users;
    } else {
      return [];
    }
  }, [usersList, search]);

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
    setRole(null);
    setSelectedDate(null);
  };

  const handleOpenDeleteModal = (record) => (
    setRecordToModify(record), setOpenDeleteModal(true)
  );
  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleDeleteUser = async () => {
    try {
      await deleteUser({
        apiRoute: `${routePrefix}/user/${recordToModify?._id}`,
      });
      handleCloseDeleteModal();
    } catch (err) {
      console.log(err, "error while deleting");
    }
  };

  const handleOpenModifyModal = (record) => (
    setRecordToModify(record), setOpenModifyModal(true)
  );
  const handleCloseModifyModal = () => {
    setOpenModifyModal(false);
  };

  const handleCreateUser = async () => {
    setRecordToModify(null);
    setOpenModifyModal(true);
  };

  const debouncedRefetch = useCallback(
    debounce(() => {
      if (page === 1) {
        refetchUsersList();
      } else {
        setPage(1);
      }
    }, 700),
    [page]
  );

  useEffect(() => {
    refetchUsersList();
  }, [page, deletedSuccessfully, status, selectedDate, role]);

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
      field: "user_name",
      headerName: "Location",
      headerClassName: "customHeaderClass-admin-team",
      sortable: false,
      flex: 0.8,
      renderCell: (params) => {
        return (
          <div>
            <Typography
              style={{
                maxWidth: "240px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
              className="new-table-text"
            >
              {[userRoles.CUSTOM_ADMIN, userRoles.STAFF].includes(
                params.row?.role
              )
                ? getAssignedLocationName(params.row, locationsList)
                : "---"}
            </Typography>
          </div>
        );
      },
    },

    {
      field: "User Role",
      flex: 0.6,
      headerClassName: "customHeaderClass-admin-team",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <p className="new-table-text">
              {getUserRoleText(params.row?.role)}
            </p>
          </>
        );
      },
    },
    {
      field: "Status",
      paddingLeft: 3,
      headerClassName: "customHeaderClass-admin-team",
      sortable: false,
      flex: 0.5,
      renderCell: (params) => {
        return (
          <div
            className={params.row.status ? "status-active" : "status-inActive"}
          >
            {params.row.status ? "Active" : "Inactive"}
          </div>
        );
      },
    },
    {
      field: "Actions",
      flex: 0.8,
      headerClassName: "customHeaderClass-admin-team",
      sortable: false,
      renderCell: (params) => {
        // console.log(params, "id");
        // const id = params.row._id;

        return (
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <div>
              <TableRow
                row={params.row}
                refetch={refetchUsersList}
                type={"superAdminTeam"}
                text={""}
              />
            </div>

            <IconButton
              sx={{ p: 0, borderRadius: "100%", width: 28, height: 28 }}
              onClick={() => handleOpenModifyModal(params.row)}
            >
              <img src={EditIcon} alt="EDIT icon" />
            </IconButton>
            <IconButton
              sx={{ p: 0, borderRadius: "100%", width: 28, height: 28 }}
              onClick={() => handleOpenDeleteModal(params.row)}
            >
              <img src={DeleteIcon} alt="delete icon" />
            </IconButton>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Box sx={{ width: "100%", m: "auto" }}>
        <Box
          sx={{
            p: "20px 20px 20px 30px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: 24,
                fontWeight: 600,
                lineHeight: '32.78px'
              }}
            >
              User Management
            </Typography>
            <Typography
              sx={{
                color: "#212528",
                fontSize: "16px",
                fontWeight: 600,
                lineHeight: '21.86px',
                opacity: '70%'
              }}
            >
              Add, edit and manage your Users.
            </Typography>
          </Box>
          <Box>
            <Button
              fullWidth
              variant="contained"
              onClick={handleCreateUser}
              sx={{
                backgroundColor: "#8477DA",
                "&:hover": { backgroundColor: "#8477DA" },
                color: "white",
                fontSize: 16,
                fontWeight: 600,
                gap: '10px'
              }}
            >
              <Add color="white" />
              Add New User
            </Button>
          </Box>
        </Box>
        <Grid container sx={{ px: 3 }} spacing={2}>
          {[
            {
              title: "Total Users",
              text: usersList?.totalUserCount ?? 0,
              variant: "blue",
            },
            {
              title: "Users",
              text: usersList?.staffCount ?? 0,
              variant: "red",
            },
            {
              title: "Admins",
              text: usersList?.customUserCount ?? 0,
              variant: "green",
            },
            {
              title: "Super-Admins",
              text: usersList?.adminCount ?? 0,
              variant: "purple",
            },
          ].map((item) => (
            <Grid item lg={3} md={4} xs={6}>
              <WidgetCard
                text={item.text}
                title={item.title}
                varient={item.variant}
              />
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            px: 3,
            my: 2,
          }}
        >
          <Typography sx={{ fontSize: 24, fontWeight: 600 }}>Users</Typography>
          {/* <TextField
            placeholder="Search by Name"
            variant="outlined"
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
                <InputAdornment position="start">
                  <Search sx={{ color: "#8477DA" }} />
                </InputAdornment>
              ),
            }}
          /> */}
          <Box sx={{ display: "flex", gap: 1 }}>
            <Box>
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
            </Box>
            <Box>
              <DesktopDatePicker
                label="Date Added"
                // placeholder="Date Added"
                inputFormat="MM/DD/YYYY"
                className="custom-textfield"
                // maxDate={new Date()} // Sets the maximum date to the current date
                value={selectedDate}
                onChange={handleDateChange}
                sx={{
                  "& .MuiInputBase-root": {
                    height: 40,
                    width: 152,
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
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    placeholder="Date Added"
                    InputProps={{
                      ...params.InputProps,
                      placeholder: "Date Added", // Add the placeholder here
                    }} u
                  />
                )}
              />
            </Box>
            <Box>
              <FormControl
                sx={{ width: "166px" }}
                size="small"
                className="custom-textfield"
              >
                <Select
                  placeholder="Role"
                  value={role}
                  displayEmpty
                  renderValue={(selected) => {
                    if (selected === null) {
                      return <Typography
                        sx={{
                          fontSize: '14px',
                          fontWeight: 400,
                          lineHeight: '16.41px',
                          color: '#000000'
                        }}>Role</Typography>;
                    }
                    return (
                      <Typography
                        className=" status-active"
                        sx={{ padding: 0, px: 2, width: "fit-content" }}
                      >
                        {userRoles.SUPER_ADMIN === selected
                          ? " Super Admin"
                          : userRoles.CUSTOM_ADMIN === selected
                            ? " Admin"
                            : userRoles.STAFF === selected
                              ? " Staff"
                              : ""}
                      </Typography>
                    );
                  }}
                  size="small"
                  sx={{ height: "40px" }}
                  onChange={(event) => setRole(event.target.value)}
                >
                  <MenuItem value={userRoles.SUPER_ADMIN}>
                    {" "}
                    <Typography
                      className=" status-active"
                      sx={{ padding: 0, px: 2, width: "auto" }}
                    >
                      Super Admin
                    </Typography>
                  </MenuItem>
                  <MenuItem value={userRoles.CUSTOM_ADMIN}>
                    {" "}
                    <Typography
                      className=" status-active"
                      sx={{ padding: 0, px: 2, width: "auto" }}
                    >
                      Admin
                    </Typography>
                  </MenuItem>
                  <MenuItem value={userRoles.STAFF}>
                    {" "}
                    <Typography
                      className=" status-active"
                      sx={{ padding: 0, px: 2, width: "auto" }}
                    >
                      User
                    </Typography>
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box>
              <FormControl
                sx={{ width: "152px" }}
                size="small"
                className="custom-textfield"
              >
                <Select
                  value={status}
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  size="small"
                  displayEmpty
                  sx={{ height: "40px" }}
                  onChange={(event) => setStatus(event.target.value)}
                  renderValue={(selected) => {
                    if (selected === null) {
                      return <p>Status</p>;
                    }

                    return selected ? (
                      <Typography
                        className="status-active"
                        sx={{ padding: 0, px: 2, width: "fit-content" }}
                      >
                        Active
                      </Typography>
                    ) : (
                      <Typography
                        className="status-inActive"
                        sx={{ padding: 0, px: 2, width: "fit-content" }}
                      >
                        Inactive
                      </Typography>
                    );
                  }}
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
                      sx={{ padding: 0, px: 2, width: "fit-content" }}
                    >
                      Inactive
                    </Typography>
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Button variant="text" onClick={handleResetFilter}>
              Clear Filter
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            border: "1px solid rgba(212, 219, 223, 1)",
            borderRadius: "8px",
            overflow: "hidden",
            width: "97%",
            m: "auto",
          }}
        >
          {isLoading ? (
            <Box
              sx={{
                width: "100%",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                height: "300px",
                alignItems: "center",
                background: "#FFFF",
              }}
            >
              <CircularProgress sx={{ color: "#8477DA" }} />
            </Box>
          ) : filteredData?.length === 0 && !usersListFetching ? (
            <Typography sx={{ color: "#667085", p: 2, textAlign: "center" }}>
              No User Found
            </Typography>
          ) : (
            <div className="CustomerTable">
              <DataGrid
                loading={usersListFetching}
                style={{
                  border: "none",
                }}
                getRowId={(row) => row._id}
                rows={filteredData}
                columns={AdminColumns?.concat(actionColumn)}
                page={page}
                pageSize={itemsPerPage}
                rowCount={usersList?.totalRecords ? usersList?.totalRecords : 0}
                sx={{
                  width: "100%",
                  '& .MuiDataGrid-columnHeader': {
                    borderRight: 'none', // Remove the right border between header cells
                    '&:hover': {
                      borderRight: 'none', // Ensure no border on hover
                    },
                  }
                }}
                hideFooter
                disableColumnMenu
                pagination={false}
              />
              <Box sx={{ width: "100%" }}>
                <Pagination
                  totalRecords={
                    usersList?.totalRecords ? usersList?.totalRecords : 0
                  }
                  itemsPerPage={itemsPerPage}
                  page={page}
                  setPage={setPage}
                />
              </Box>
            </div>
          )}
        </Box>
        <DeleteModal
          close={handleCloseDeleteModal}
          open={openDeleteModal}
          handleDelete={handleDeleteUser}
        />
        {/* <LocationModel
          open={open}
          onClose={closeModel}
          selectedRow={selectedRow}
          staffRefetch={refetchUsersList}
        // filteredAdminData={filteredAdminData}
        // notAdded={notAdded}
        // AdminData={AdminData}
        /> */}
        <AddTeamMembers
          open={openModifyModal}
          close={handleCloseModifyModal}
          recordToModify={recordToModify}
          refetchUsers={refetchUsersList}
          locationsList={locationsList}
        />
      </Box>
    </>
  );
};
export default SuperAdminTeam;
