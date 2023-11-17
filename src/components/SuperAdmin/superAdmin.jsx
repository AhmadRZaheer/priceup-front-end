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
  CircularProgress,
  TextField,
} from "@mui/material";
import DeleteIcon from "../../Assets/Delete-Icon.svg";
import EditIcon from "../../Assets/d.svg";

import { useFetchDataAdmin } from "../../utilities/ApiHooks/superAdmin";
import AddSuperAdminModel from "../Modal/addSuperAdminModel";
import TableRow from "./tableRow";
import image1 from "../../Assets/Active-location.png";
import image2 from "../../Assets/Non-Active-location.png";
import image3 from "../../Assets/Team-Members.svg";
import { Link } from "react-router-dom";
import { Search } from "@mui/icons-material";
import { backendURL } from "../../utilities/common";
import EstimsteIcon from "../../Assets/bar.svg";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../../redux/snackBarSlice";

const SuperAdminTable = () => {
  const {
    data: AdminData,
    refetch: teamMemberRefetch,
    isFetched,
    isFetching,
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

  const dispatch = useDispatch();

  const showSnackbarHandler = (message, severity) => {
    dispatch(showSnackbar({ message, severity }));
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
    admin.user.name.toLowerCase().includes(search.toLowerCase())
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

      <TextField
        placeholder="Search by Name"
        variant="standard"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{
          mb: 2,
          mt: 10,
          width: "20%", // You can adjust the width as needed
          marginLeft: "30px",
          mt: 3, // Adjust the margin as needed
          ".MuiInputBase-root:after": {
            border: "1px solid #8477DA",
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search sx={{ color: "#8477DA" }} />
            </InputAdornment>
          ),
        }}
      />
      <div className="hardwareTable-superadmin">
        {/* <DataGrid
          getRowId={(row) => row._id}
          rows={filteredData}
          columns={AdminColumns2.concat(actionColumn)}
          pageSizeOptions={[10]}
          sx={{ width: "97%", m: "auto" }}
        /> */}
        {isFetching ? (
          <Box
            sx={{
              width: "100%",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              height: "300px",
              alignItems: "center",
            }}
          >
            <CircularProgress sx={{ color: "#8477DA" }} />
          </Box>
        ) : (
          filteredData?.map((item) => {
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

            if (item?.user && item?.user?.name) {
              var firstNameInitial = item?.user?.name?.charAt(0);
            } else {
              var firstNameInitial = "";
            }
            if (item?.user && item?.user?.name) {
              var lastNameInitial = item?.user?.name?.charAt(1);
            } else {
              var lastNameInitial = "";
            }

            const adminID = item?.user?._id;
            return (
              <Box
                key={item?.user?._id}
                sx={{
                  bgcolor: "white",
                  border: "1px solid #EAECF0",
                  width: "100%",
                  minHeight: "316px",
                  maxHeight: "316px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                {/* uper part*/}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    p: 2,
                  }}
                >
                  {/* Box 1 */}
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    {/* Name and logo */}
                    <Box
                      sx={{ display: "flex", gap: 1.5, alignItems: "center" }}
                    >
                      <Box
                        sx={{
                          width: "40px",
                          height: "40px",
                          overflow: "hidden",
                          borderRadius: "100%",
                        }}
                      >
                        {item?.user?.image === "images/users/default.jpg" ? (
                          <Typography
                            sx={{
                              backgroundColor: "#F9F5FF",
                              width: 40,
                              height: 40,
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
                        ) : item?.user?.image === "" ? (
                          <Typography
                            sx={{
                              backgroundColor: "#F9F5FF",
                              width: 40,
                              height: 40,
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
                        ) : (
                          <img
                            className="cellImg"
                            style={{ width: 40, height: 40 }}
                            src={`${backendURL}/${item?.user?.image}`}
                            alt="logo image"
                          />
                        )}
                      </Box>
                      <Typography
                        sx={{
                          color: "#101828",
                          fontSize: "18px",
                          fontWeight: 500,
                        }}
                      >
                        {item?.user?.name}
                      </Typography>
                    </Box>
                    {/* Email */}
                    <Typography
                      sx={{ color: "#667085", fontSize: "14px", mt: 1 }}
                    >
                      {item?.user?.email}
                    </Typography>
                    {/* Date Added */}
                    <Typography sx={{ color: "#667085", fontSize: "14px" }}>
                      {new Date(item?.user?.updatedAt).toLocaleDateString(
                        undefined,
                        {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </Typography>
                  </Box>
                  {/* Box 2 */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "180px",
                      gap: 1,
                    }}
                  >
                    <Box sx={{ height: "100px" }}>
                      <Typography sx={{ fontSize: "16px", color: "#667085" }}>
                        Status
                      </Typography>
                      <Box>
                        <TableRow
                          row={item?.user}
                          refetch={teamMemberRefetch}
                          onToggleChange={handleToggleChange}
                        />
                      </Box>
                    </Box>

                    <Box sx={{ height: "125px" }}>
                      <Typography sx={{ fontSize: "16px", color: "#667085" }}>
                        Users
                      </Typography>
                      <Grid container mt={1} gap={2}>
                        <Typography
                          sx={{
                            backgroundColor: "#F9F5FF",
                            width: 32,
                            height: 32,
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
                    </Box>
                  </Box>
                  {/* Box 3 */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "180px",
                      gap: 1,
                    }}
                  >
                    <Box sx={{ height: "100px" }}>
                      <Typography sx={{ fontSize: "16px", color: "#667085" }}>
                        Estimates
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          color: "#667085",
                          alignItems: "center",
                          mt: 1,
                        }}
                      >
                        <img src={EstimsteIcon} alt="image of customer" />
                        <Typography>{item.estimates}</Typography>
                      </Box>
                    </Box>

                    <Box sx={{ height: "100px" }}>
                      <Typography sx={{ fontSize: "16px", color: "#667085" }}>
                        Team
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          color: "#667085",
                          alignItems: "center",
                          mt: 1,
                        }}
                      >
                        <img src={EstimsteIcon} alt="image of customer" />
                        <Typography>{item.staffs}</Typography>
                      </Box>
                    </Box>
                  </Box>
                  {/* Box 4 */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "180px",
                      gap: 1,
                    }}
                  >
                    <Box sx={{ height: "100px" }}>
                      <Typography sx={{ fontSize: "16px", color: "#667085" }}>
                        Customers
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          color: "#667085",
                          alignItems: "center",
                          mt: 1,
                        }}
                      >
                        <img src={EstimsteIcon} alt="image of customer" />
                        <Typography>{item.customers}</Typography>
                      </Box>
                    </Box>

                    <Box sx={{ height: "100px" }}>
                      <Typography sx={{ fontSize: "16px", color: "#667085" }}>
                        Layouts
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          color: "#667085",
                          alignItems: "center",
                          mt: 1,
                        }}
                      >
                        <img src={EstimsteIcon} alt="image of customer" />
                        <Typography>{item.layouts}</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                {/* lower part */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    p: 0.6,
                    height: "40px",
                    borderTop: "1px solid #EAECF0",
                    alignItems: "center",
                  }}
                >
                  <Box></Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <IconButton
                        sx={{
                          p: 0,
                          borderRadius: "100%",
                          width: 28,
                          height: 28,
                        }}
                      >
                        <img src={DeleteIcon} alt="delete icon" />
                      </IconButton>
                      <IconButton
                        onClick={() => handleOpenEdit(item)}
                        sx={{
                          p: 0,
                          borderRadius: "100%",
                          width: 28,
                          height: 28,
                        }}
                      >
                        <img src={EditIcon} alt="delete icon" />
                      </IconButton>
                    </Box>
                    <Link
                      to={`/?adminID=${adminID}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Button
                        variant="text"
                        sx={{
                          p: 1,
                          m: 0,
                          color: "#7F56D9",
                          textTransform: "capitalize",
                          borderLeft: "1px solid #EAECF0",
                        }}
                      >
                        Access Location
                      </Button>
                    </Link>
                  </Box>
                </Box>
              </Box>
            );
          })
        )}
      </div>

      <AddSuperAdminModel
        open={open}
        close={handleClose}
        refetch={teamMemberRefetch}
        showSnackbar={showSnackbarHandler}
        data={edit}
        isEdit={isEdit}
      />
    </Box>
  );
};

export default SuperAdminTable;
