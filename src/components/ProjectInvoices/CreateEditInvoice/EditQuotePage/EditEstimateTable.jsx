import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Box, Typography } from "@mui/material";
import { EstimatesColumns } from "@/utilities/DataGridColumns";

export default function EditEstimateTable({
  projectId,
  selectedEstimateRows,
  selectedEstimates,
}) {
  return (
    <>
      <Typography sx={{ fontSize: 24, fontWeight: "bold", pb: 2 }}>
        Estimates
      </Typography>
      {selectedEstimates?.length > 0 ? (
        <Paper sx={{ width: "100%" }}>
          <DataGrid
            getRowId={(row) => row._id}
            rows={selectedEstimates}
            columns={EstimatesColumns(
              () => {},
              () => {},
              () => {},
              false
            )}
            pageSizeOptions={[5, 10]}
            rowHeight={70}
            sx={{ border: 0 }}
            hideFooter
            disableColumnMenu
          />
        </Paper>
      ) : (
        <Box
          sx={{
            width: "99.88%",
            borderRadius: "8px",
            overflow: "hidden",
            border: "1px solid #D0D5DD",
            m: "auto",
          }}
        >
          <Typography
            sx={{ textAlign: "center", fontSize: 20, color: "#667085", py: 2 }}
          >
            No Estimate Found
          </Typography>
        </Box>
      )}
    </>
  );
}
