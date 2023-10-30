import { useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  Input,
  InputAdornment,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import "./superAdmin.scss";
import {
  useFetchAdminLocation,
  useFetchAllStaff,
} from "../../utilities/ApiHooks/superAdmin";
import TableRow from "./tableRow";
import { DeleteOutlineOutlined, EditOutlined } from "@mui/icons-material";
import { AdminColumns } from "../../customerTableSource";
import { useFetchDataAdmin } from "../../utilities/ApiHooks/superAdmin";
import { Search } from "@mui/icons-material";
import LocationModel from "../Modal/locationModel";

const SuperAdminTeam = () => {
  const { data: staffData, refetch: teamMemberRefetch } = useFetchAllStaff();
  const { data: AdminData, refetch: adminMember } = useFetchDataAdmin();
  // const { data: AdminLocations, refetch: refectLocations } =
  //   useFetchAdminLocation();

  console.log(staffData, "staffData");

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

  const actionColumn = [
    {
      field: "Status",
      paddingLeft: 3,
      width: 220,
      renderCell: (params) => {
        const id = params.row._id;

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
            <IconButton onClick={() => openModel(params.row,)}>
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
        return (
          <>
            <IconButton
              sx={{ p: 0, borderRadius: "100%", width: 28, height: 28 }}
            >
              <DeleteOutlineOutlined sx={{ color: "#788093", fontSize: 20 }} />
            </IconButton>
            <IconButton
              sx={{ p: 0, borderRadius: "100%", width: 28, height: 28 }}
            >
              <EditOutlined sx={{ color: "#788093", fontSize: 20 }} />
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
        // filteredAdminData={filteredAdminData}
        // notAdded={notAdded}
        // AdminData={AdminData}
        />
      </Box>
    </>
  );
};
export default SuperAdminTeam;
