import React, { useState } from "react";
import {
    Box,
    Button,
    CircularProgress,
    Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
    useFetchDataTeam,
  } from "../../utilities/ApiHooks/team";
  import { teamColumns } from "../../customerTableSource";
import './customerTable.css'

export default function ExitingQuotes() {
    const { data: staffData } =     useFetchDataTeam();
    return (
        <>
            <Box
                sx={{
                    marginTop: 8,
                    color: "#ffff",
                    height: "92vh",
                    backgroundColor: "rgba(16, 13, 36, 1)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "space-between",
                }}
            >
                <Box sx={{}}>
                    <Box
                        sx={{
                            paddingY: 2,
                            paddingX: 2,
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography sx={{ fontSize: 18, fontWeight: "Medium" }}>
                            Customer
                        </Typography>
                    </Box>
                    <div className="CustomerTable">
                        <DataGrid
                        sx={{
                            width: "93vw",
                            margin: "auto"
                        }}
                            getRowId={(row) => row._id}
                            rows={staffData}
                            columns={teamColumns}
                            pageSizeOptions={[10]}
                            style={{ backgroundColor: 'white' }}
                        />
                        {/* <Typography
                            sx={{ textAlign: "center", fontSize: 20, color: "gray", py: 2 }}
                        >
                            No Customer Found
                        </Typography> */}
                    </div>


                </Box>
            </Box>
        </>
    );
}
