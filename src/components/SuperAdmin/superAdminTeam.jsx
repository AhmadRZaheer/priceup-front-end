import { useState } from "react";
import { Box, Button, IconButton, Typography,Input,InputAdornment } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import "./superAdmin.scss";
import { useFetchAllStaff } from "../../utilities/ApiHooks/superAdmin";
import TableRow from "./tableRow";
import { DeleteOutlineOutlined, EditOutlined } from "@mui/icons-material";
import { AdminColumns } from "../../customerTableSource";
import {Link} from 'react-router-dom'
import { useFetchDataAdmin } from "../../utilities/ApiHooks/superAdmin";
import { Search } from '@mui/icons-material';

const SuperAdminTeam = () => {
  const { data: staffData, refetch: teamMemberRefetch } = useFetchAllStaff();
  const { data: AdminData, refetch: adminMember } = useFetchDataAdmin();
  const [search, setSearch] = useState("");
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
  const filteredData = staffData?.filter(
    (staff) =>
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
            width: '20%', // You can adjust the width as needed
            marginLeft: '30px', // Adjust the margin as needed
          }}
          endAdornment={(
            <InputAdornment position="end">
              <Search />
            </InputAdornment>
          )}
        />
        <div className="CustomerTable">
          <DataGrid
            getRowId={(row) => row._id}
            rows={filteredData}
            columns={AdminColumns.concat(actionColumn)}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 2,
                },
              },
            }}
            pageSizeOptions={[2]}
          />
        </div>
      </Box>
    </>
  );
};
export default SuperAdminTeam;
