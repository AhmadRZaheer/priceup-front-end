import React, { useState, useEffect } from "react";
import "./superAdmin.scss";
import { AdminColumns2 } from "../../customerTableSource";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  IconButton,
  Typography,
  Input,
  InputAdornment,
  Grid,
} from "@mui/material";
import DeleteIcon from "../../Assets/Delete-Icon.svg";
import EditIcon from "../../Assets/d.svg";
import Snackbars from "../Modal/snackBar";
import { useFetchDataAdmin } from "../../utilities/ApiHooks/superAdmin";
import AddSuperAdminModel from "../Modal/addSuperAdminModel";
import TableRow from "./tableRow";
import image1 from "../../Assets/Active-location.png";
import image2 from "../../Assets/Non-Active-location.png";
import image3 from "../../Assets/Team-Members.svg";
import { Link } from "react-router-dom";
import { Search } from "@mui/icons-material";
import { backendURL } from "../../utilities/common";

const SuperAdminTable = () => {
  const {
    data: AdminData,
    refetch: teamMemberRefetch,
    isFetching,
    isFetched,
  } = useFetchDataAdmin();

  const [open, setOpen] = useState(false);
  const [InactiveCount, setInActiveCount] = useState(0);
  const [activeCount, setActiveCount] = useState(0);
  const [edit, setEdit] = React.useState(null);
  const [isEdit, setIsEdit] = React.useState(false);
  useEffect(() => {
    setActiveCount(AdminData.length);
  }, [isFetched]);
  const [search, setSearch] = useState("");

  const handleClose = () => setOpen(false);

  const handleOpenEdit = (data) => {
    setOpen(true);
    setEdit(data);
    setIsEdit(true);
  };

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
        // const isActive = params.row.Status === "Active";

        const handleToggleChange = (active) => {
          setInActiveCount((prevCount) => {
            if (!active && prevCount > 0) {
              return prevCount - 1;
            } else if (active) {
              return prevCount + 1;
            }
            return prevCount; // No change if not active and count is 0
          });

          setActiveCount((prevCount) => {
            if (active && prevCount > 0) {
              return prevCount - 1;
            } else if (!active) {
              return prevCount + 1;
            }

            return prevCount; // No change if not active and count is 0
          });
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
      field: "users",
      headerName: "users",
      width: 120,
      renderCell: (params) => {
        if (params.row && params.row.name) {
          var firstNameInitial = params.row.name.charAt(0);
        } else {
          var firstNameInitial = "";
        }
        if (params.row && params.row.name) {
          var lastNameInitial = params.row.name.charAt(1);
        } else {
          var lastNameInitial = "";
        }
        return (
          <Grid container>
            <Typography
              sx={{
                backgroundColor: "#F9F5FF",
                width: 34,
                height: 34,
                borderRadius: "100%",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#7F56D9",
                textTransform: "uppercase",
                fontWeight: "bold",
              }}
            >
              {firstNameInitial}
              {lastNameInitial}
            </Typography>
          </Grid>
        );
      },
    },
    {
      width: 140,
      renderCell: (params) => {
        const adminID = params.row._id;
        return (
          <>
            <Link
              to={`/?adminID=${adminID}`}
              style={{ textDecoration: "none" }}
            >
              <Button
                variant="text"
                sx={{
                  p: 0.5,
                  m: 0,
                  color: "#7F56D9",
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
              <img src={DeleteIcon} alt="delete icon" />
            </IconButton>
            <IconButton
              onClick={() => handleOpenEdit(params.row)}
              sx={{ p: 0, borderRadius: "100%", width: 28, height: 28 }}
            >
              <img src={EditIcon} alt="delete icon" />
            </IconButton>
          </>
        );
      },
    },
  ];
  const filteredData = AdminData?.filter((admin) =>
    admin.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <Box sx={{ height: "97vh", overflow: "auto" }}>
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
              src={image2}
              alt="image type"
            />
            <Typography sx={{ fontSize: 18 }}>Non-Active Locations</Typography>
          </Box>
          <Typography sx={{ fontSize: 32, mt: 1, fontWeight: "bold" }}>
            {InactiveCount}
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
            {AdminData.length}
          </Typography>
        </Box>
      </div>

      <Input
        placeholder="Search by Name"
        variant="outlined"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{
          mb: 2,
          mt: 10,
          width: "20%", // You can adjust the width as needed
          marginLeft: "30px",
          mt: 3 // Adjust the margin as needed
        }}
        endAdornment={
          <InputAdornment position="end">
            <Search />
          </InputAdornment>
        }
      />
      <div className="hardwareTable">
        <DataGrid
          getRowId={(row) => row._id}
          rows={filteredData}
          columns={AdminColumns2.concat(actionColumn)}
          pageSizeOptions={[10]}
          sx={{ width: "97%", m: "auto" }}
        />
      </div>

      <AddSuperAdminModel
        open={open}
        close={handleClose}
        refetch={teamMemberRefetch}
        showSnackbar={showSnackbar}
        data={edit}
        isEdit={isEdit}
      />
      <Snackbars
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        closeSnackbar={closeSnackbar}
      />
    </Box>
  );
};

export default SuperAdminTable;
