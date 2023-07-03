import React from "react";
import "./TeamTable.scss";
import { teamColumns, userRows } from "../../customerTableSource";
import ModeIcon from "@mui/icons-material/Mode";
import DeleteIcon from "@mui/icons-material/Delete";

import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Typography } from "@mui/material";
import { useFetchDataTeam } from "../../utilities/ApiHooks/Team";

const TeamTable = () => {
  const { data: teamData, refetch: finishesRefetch } = useFetchDataTeam();
  console.log(teamData, "teamDatateamData");
  const actionColumn = [
    {
      field: "action",
      headerName: "Actions",
      width: 200,
      renderCell: () => {
        return (
          <div className="cellAction">
            <div className="deleteButton">
              <DeleteIcon />
            </div>
            <div className="viewButton">
              <ModeIcon />
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <>
      <div className="page-title">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography Boxvariant="h3">Team Memebers</Typography>
          <Box sx={{ width: "200px" }}>
            <Button fullWidth variant="contained">
              Add Members
            </Button>
          </Box>
        </Box>
      </div>
      <div className="CustomerTable">
        <DataGrid
          rows={userRows}
          columns={teamColumns.concat(actionColumn)}
          paginationModel={{ page: 0, pageSize: 8 }}
        />
      </div>
    </>
  );
};

export default TeamTable;
