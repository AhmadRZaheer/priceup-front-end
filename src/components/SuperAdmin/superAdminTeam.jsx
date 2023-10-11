import { Box, Button, IconButton, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import "./superAdmin.scss";
import { useFetchAllStaff } from "../../utilities/ApiHooks/superAdmin";
import TableRow from "./tableRow";
import { DeleteOutlineOutlined, EditOutlined } from "@mui/icons-material";
import { AdminColumns } from "../../customerTableSource";
import {Link} from 'react-router-dom'

const SuperAdminTeam = () => {
  const { data: staffData, refetch: teamMemberRefetch } = useFetchAllStaff();
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
      width: 140,
      renderCell: (params) => {
        const adminID = params.row._id;
        return (
          <>
            <Link to={`/?adminID=${adminID}`} style={{ textDecoration: 'none' }}>
              <Button
                variant="text"
                sx={{
                  p: 0.5,
                  m: 0,
                  color: "#8477DA",
                  textTransform: "capitalize",
                }}
              >
                Access Location
              </Button>
            </Link>
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
  return (
    <>
      <Box sx={{ pt: 2, width: "100%", m: "auto" }}>
        <Typography sx={{ ml: 2, fontSize: 24, fontWeight: "bold" }}>
          Team
        </Typography>
        <div className="CustomerTable">
          <DataGrid
            getRowId={(row) => row._id}
            rows={staffData}
            columns={AdminColumns.concat(actionColumn)}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[10]}
          />
        </div>
      </Box>
    </>
  );
};
export default SuperAdminTeam;
