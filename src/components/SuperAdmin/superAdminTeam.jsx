import { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  Input,
  InputAdornment,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import "./superAdmin.scss";
import {
  useFetchAdminLocation,
  useDeleteStaff,
  useFetchAllStaff,
} from "../../utilities/ApiHooks/superAdmin";
import TableRow from "./tableRow";
import { DeleteOutlineOutlined, EditOutlined } from "@mui/icons-material";
import { AdminColumns } from "../../customerTableSource";
import { useFetchDataAdmin } from "../../utilities/ApiHooks/superAdmin";
import { Search } from "@mui/icons-material";
import LocationModel from "../Modal/locationModel";
import Snackbars from "../Modal/snackBar";
import DeleteIcon from "../../Assets/Delete-Icon.svg";
import EditIcon from "../../Assets/d.svg";

const SuperAdminTeam = () => {
  const { data: staffData, refetch: teamMemberRefetch } = useFetchAllStaff();
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
            <Typography color="#667085">
              {matchingLocationNames.join(", ") || "No location member found"}
            </Typography>
          </div>
        );
      },
    },
    {
      field: "Status",
      paddingLeft: 3,
      width: 220,
      renderCell: (params) => {
        return <TableRow row={params.row} refetch={teamMemberRefetch} />;
      },
    },

    {
      field: "location",
      width: 165,
      align: "right",
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
      field: " ",
      width: 165,
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
  return (
    <>
      <Box sx={{ pt: 2, width: "100%", m: "auto" }}>
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
        <div className="CustomerTable">
          <DataGrid
            getRowId={(row) => row._id}
            rows={filteredData}
            columns={AdminColumns.concat(actionColumn)}
            pageSizeOptions={[10]}
          />
        </div>
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
