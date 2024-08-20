import { useEffect, useState } from "react";
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
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import "./superAdmin.scss";
import {
  useFetchAdminLocation,
  useDeleteStaff,
  useFetchAllStaff,
} from "../../utilities/ApiHooks/superAdmin";
import TableRow from "./tableRow";
import icon from "../../Assets/search-icon.svg";
import { Add } from "@mui/icons-material";
import { AdminColumns } from "@/utilities/DataGridColumns";
import LocationModel from "../Modal/locationModel";
import DeleteIcon from "../../Assets/Delete-Icon.svg";
import EditIcon from "../../Assets/d.svg";
import DeleteModal from "../Modal/deleteModal";
import AddTeamMembers from "../Modal/addTeamMembers";
import { itemsPerPage } from "@/utilities/constants";
import Pagination from "../Pagination";
import CustomInputField from "../ui-components/CustomInput";
import WidgetCard from "../ui-components/widgetCard";

const SuperAdminTeam = () => {
  const {
    data: staffData,
    refetch: teamMemberRefetch,
    isFetching,
  } = useFetchAllStaff();
  const { mutate: usedelete, isSuccess } = useDeleteStaff();
  // pagination state:
  const [page, setPage] = useState(1);

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
  }, [isSuccess, page]);

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
              className="new-table-text"
            >
              {matchingLocationNames.join(", ") || "Not added to any location"}
            </Typography>
          </div>
        );
      },
    },

    // {
    //   field: "Access",
    //   flex: 0.6,
    //   headerClassName: "customHeaderClass-admin-team",
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         <IconButton
    //           sx={{ borderRadius: 0, color: "#7F56D9" }}
    //           onClick={() => openModel(params.row)}
    //         >
    //           <h6>Modify Access</h6>
    //         </IconButton>
    //       </>
    //     );
    //   },
    // },
    {
      field: "User Role",
      flex: 0.6,
      headerClassName: "customHeaderClass-admin-team",
      renderCell: (params) => {
        return (
          <>
            <p className="new-table-text">{params.row?.role ?? "role"}</p>
          </>
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
      renderCell: (params) => {
        console.log(params, "id");
        const id = params.row._id;

        return (
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <div>
              <TableRow
                row={params.row}
                refetch={teamMemberRefetch}
                type={"superAdminTeam"}
                text={""}
              />
            </div>

            <IconButton
              sx={{ p: 0, borderRadius: "100%", width: 28, height: 28 }}
              onClick={() => handleOpenEdit(params.row)}
            >
              <img src={EditIcon} alt="EDIT icon" />
            </IconButton>
            <IconButton
              sx={{ p: 0, borderRadius: "100%", width: 28, height: 28 }}
              onClick={() => handleOpen(id)}
            >
              <img src={DeleteIcon} alt="delete icon" />
            </IconButton>
          </div>
        );
      },
    },
  ];

  const handleCreateUser = async () => {
    await setEdit2(null);
    await setIsEdit2(false);

    setOpen2(true);
  };
  const filteredData = staffData?.filter((staff) =>
    staff.name.toLowerCase().includes(search.toLowerCase())
  );

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
              }}
            >
              User Management
            </Typography>
            <Typography
              sx={{
                color: "#606366",
                fontSize: "16px",
                fontWeight: 500,
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
                textTransform: "capitalize",
                borderRadius: 2,
                fontSize: 17,
                padding: 1,

                px: 2,
              }}
            >
              <Add color="white" sx={{ mr: 1 }} />
              Add New User
            </Button>
          </Box>
        </Box>
        <Grid container sx={{ px: 3 }} spacing={2}>
          {[
            { title: "Total Users", text: "40", variant: "blue" },
            { title: "Users", text: "34", variant: "red" },
            { title: "Admins", text: "15", variant: "green" },
            { title: "Super-Admins", text: "01", variant: "purple" },
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
                labelId="demo-select-small-label"
                id="demo-select-small"
                label="Status"
                size="small"
                sx={{ height: "40px" }}
                // onChange={handleChange}
              >
                <MenuItem value={true}>
                  {" "}
                  <Typography
                    className=" status-active"
                    sx={{ padding: 0, px: 2, width: "44px" }}
                  >
                    Active
                  </Typography>
                </MenuItem>
                <MenuItem value={false}>
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
        </Box>
        <Box
          sx={{
            mx: 3,
            border: "1px solid rgba(212, 219, 223, 1)",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          {isFetching ? (
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
          ) : filteredData.length === 0 ? (
            <Typography sx={{ color: "#667085", p: 2, textAlign: "center" }}>
              No Users Found
            </Typography>
          ) : (
            <div className="CustomerTable">
              {filteredData.length > 0 ? (
                <>
                  <DataGrid
                    loading={isFetching}
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
                    sx={{
                      width: "100%",
                    }}
                    hideFooter
                    disableColumnMenu
                    pagination={false}
                  />
                  <Box sx={{ width: "100%" }}>
                    <Pagination
                      totalRecords={
                        filteredData.length ? filteredData.length : 0
                      }
                      itemsPerPage={itemsPerPage}
                      page={page}
                      setPage={setPage}
                    />
                  </Box>
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
                <Box sx={{ color: "#667085", p: 2, textAlign: "center" }}>
                  No Users Found
                </Box>
              )}
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
          SelectedData={edit2}
          isEdit={isEdit2}
          refetch={teamMemberRefetch}
        />
      </Box>
    </>
  );
};
export default SuperAdminTeam;
