import React, { useState,useEffect } from "react";
import "./superAdmin.scss";
import { AdminColumns2 } from "../../customerTableSource";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, IconButton, Typography } from "@mui/material";
import Snackbars from "../Modal/snackBar";
import { useFetchDataAdmin } from "../../utilities/ApiHooks/superAdmin";
import AddSuperAdminModel from "../Modal/addSuperAdminModel";
import TableRow from "./tableRow";
import { DeleteOutlineOutlined, EditOutlined } from "@mui/icons-material";
import image1 from "../../Assets/Active-location.png";
import image2 from "../../Assets/Non-Active-location.png";
import image3 from "../../Assets/Team-Members.svg";
import { Link, useNavigate } from "react-router-dom";
import { useFetchAllStaff } from "../../utilities/ApiHooks/superAdmin";

const SuperAdminTable = () => {
  const navigate = useNavigate()
  const { data: AdminData, refetch: teamMemberRefetch } = useFetchDataAdmin();
  const { data: staffData, refetch: teamMemberRefetch2 } = useFetchAllStaff();

  const [open, setOpen] = useState(false);
  const [activeCount, setActiveCount] = useState(0);



  const handleClose = () => setOpen(false);

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

  const actionColumn = [
    {
      field: "Status",
      paddingLeft: 3,
      width: 220,
      renderCell: (params) => {
        const id = params.row._id;
        const isActive = params.row.Status === "Active";

        const handleToggleChange = () => {
          if (!isActive) {
            setActiveCount((prevCount) => prevCount - 1);
          } else {
            setActiveCount((prevCount) => prevCount + 1);
          }
        };


        return (
          <TableRow
            row={params.row}
            refetch={teamMemberRefetch}
            onToggleChange={handleToggleChange}
          />
        );
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
  ];

  return (
    <>
      <div className="page-title">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "98%",
            margin: "auto",
            mt: 2,
          }}
        >
          <Typography variant="h4">Locations</Typography>
          <Box sx={{ width: "200px" }}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => setOpen(true)}
              sx={{
                backgroundColor: "#8477DA",
                "&:hover": { backgroundColor: "#8477DA" },
                color: "white",
                textTransform: "capitalize",
                borderRadius: 2,
                fontSize: 17,
                padding: 1,
              }}
            >
              {/* <Add color="white" /> */}
              Add Location
            </Button>
          </Box>
        </Box>
      </div>
      <div className="types-main-contianer">
        <Box sx={{ p: 2, boxShadow: 1, borderRadius: 2, width: 250 }}>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              width: "100%",
              alignItems: "center",
            }}
          >
            <img
              style={{ width: "42px", height: "100%" }}
              src={image1}
              alt="image type"
            />
            <Typography sx={{ fontSize: 18 }}>Active Locations</Typography>
          </Box>
          <Typography sx={{ fontSize: 32, mt: 1, fontWeight: "bold" }}>
          {AdminData.length}

          </Typography>
        </Box>

        <Box sx={{ p: 2, boxShadow: 1, borderRadius: 2, width: 250 }}>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              width: "100%",
              alignItems: "center",
            }}
          >
            <img
              style={{ width: "42px", height: "100%" }}
              src={image2}
              alt="image type"
            />
            <Typography sx={{ fontSize: 18 }}>Non-Active Locations</Typography>
          </Box>
          <Typography sx={{ fontSize: 32, mt: 1, fontWeight: "bold" }}>
          {activeCount}
          </Typography>
        </Box>

        <Box sx={{ p: 2, boxShadow: 1, borderRadius: 2, width: 250 }}>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              width: "100%",
              alignItems: "center",
            }}
          >
            <img
              style={{ width: "42px", height: "100%" }}
              src={image3}
              alt="image type"
            />
            <Typography sx={{ fontSize: 18 }}>Team Members</Typography>
          </Box>
          <Typography sx={{ fontSize: 32, mt: 1, fontWeight: "bold" }}>
            50
          </Typography>
        </Box>
      </div>
      <div className="CustomerTable">
        <DataGrid
          getRowId={(row) => row._id}
          rows={AdminData}
          columns={AdminColumns2.concat(actionColumn)}
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

      <AddSuperAdminModel
        open={open}
        close={handleClose}
        refetch={teamMemberRefetch}
        showSnackbar={showSnackbar}
      />
      <Snackbars
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        closeSnackbar={closeSnackbar}
      />
    </>
  );
};

export default SuperAdminTable;