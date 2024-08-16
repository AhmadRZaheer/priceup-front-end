import React, { useState, useEffect, useCallback } from "react";
import "./superAdmin.scss";
import TeamIcon from "../../Assets/user-gary.svg";
import {
  Box,
  Button,
  IconButton,
  Typography,
  InputAdornment,
  Grid,
  CircularProgress,
  TextField,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import icon from "../../Assets/search-icon.svg";
import DeleteIcon from "../../Assets/Delete-Icon.svg";
import EditIcon from "../../Assets/d.svg";
import CustomerIcon from "../../Assets/Customer-icon-gray.svg";
import DefaultIcon from "../../Assets/layout-gray.svg";
import {
  useDataCustomUser,
  useDeleteUser,
  useFetchAllStaff,
  useFetchDataAdmin,
  useFetchDataSuperAdmin,
  useSwitchLocationSuperAdmin,
} from "../../utilities/ApiHooks/superAdmin";
import AddSuperAdminModel from "../Modal/addSuperAdminModel";
import image1 from "../../Assets/Active-location.png";
import image2 from "../../Assets/Non-Active-location.png";
import image3 from "../../Assets/Team-Members.svg";
import { Link } from "react-router-dom";
import { ContentCopy, Search } from "@mui/icons-material";
import { backendURL, debounce } from "../../utilities/common";
import EstimsteIcon from "../../Assets/estmales-gray.svg";
import { useDispatch } from "react-redux";
import DeleteModal from "../Modal/deleteModal";
import EditLocationModal from "../Modal/editLoactionSuperAdmin";
import DefaultImage from "../ui-components/defaultImage";
import CloneLocationModel from "../Modal/cloneLocationModal";
import { parseJwt } from "../ProtectedRoute/authVerify";
import SingleLocation from "../ui-components/singleLocation";
import WidgetCard from "../ui-components/widgetCard";
import CustomInputField from "../ui-components/CustomInput";
import { useFetchAllDocuments } from "@/utilities/ApiHooks/common";
import AddEditLocationModal from "../Modal/editLoactionSuperAdmin";

const SuperAdminTable = () => {
  const routePrefix = `${backendURL}/companies`;
  const [search, setSearch] = useState("");
  const {
    data: AdminData,
    refetch: AdminRefetch,
    isFetched,
    isFetching,
  } = useFetchAllDocuments(`${routePrefix}/by-role?search=${search}`);
  const {
    mutate: switchLocationSuperAdmin,
    data: useTokenSuperAdmin,
    isSuccess: switchedSuperAdmin,
    isLoading: isSwitchingSuperAdmin,
  } = useSwitchLocationSuperAdmin();
  const { data: staffData } = useFetchAllStaff();
  const {
    mutate: deleteuserdata,
    isSuccess,
    isLoading: deleteisLoading,
  } = useDeleteUser();
  const superSuperAdminsList =
    JSON.parse(process.env.REACT_APP_SUPER_USER_ADMIN) ?? [];

  const [isEdit, setisEdit] = useState(false);
  const [DeleteOpen, setDeleteOpen] = useState(false);
  const [AddEditOpen, setAddEditOpen] = useState(false);
  const [InactiveCount, setInActiveCount] = useState(0);
  const [activeCount, setActiveCount] = useState(0);
  // const [haveAccessUsers, sethaveAccessUsers] = useState([]);
  const [OpenClone, setOpenClone] = useState(false);
  const [isUserData, setisUserData] = useState(null);
  // useEffect(() => {
  //   sethaveAccessUsers((prevHaveAccessArray) => {
  //     const matchingUserData = customUserData.filter((userData) =>
  //       userData?.locationsAccess?.some(
  //         (accessData) => accessData?.company_id === isUserData?.company?._id
  //       )
  //     );
  //     return matchingUserData;
  //   });
  // }, [isUserData?.company, customUserData]);

  useEffect(() => {
    setActiveCount(AdminData.length);
  }, [isFetched]);
  const handleCloseAddEdit = () => setAddEditOpen(false);
  const handleCloseDelete = () => setDeleteOpen(false);
  const handleDeleteUser = async () => {
    await deleteuserdata(isUserData?.user);
  };
  useEffect(() => {
    if (isSuccess) {
      setDeleteOpen(false);
      AdminRefetch();
    }
  }, [isSuccess]);
  useEffect(() => {
    AdminRefetch();
  }, []);
  const debouncedRefetch = useCallback(
    debounce(() => {
      AdminRefetch();
    }, 500),
    [search]
  );

  const handleChange = (e) => {
    setSearch(e.target.value);
    debouncedRefetch();
  };

  const handleOpenDelete = (data) => {
    setDeleteOpen(true);
    setisUserData(data);
  };

  // const handleCloseEdit = () => setEditOpen(false);
  const handleOpenEdit = (data) => {
    setisEdit(true);
    setAddEditOpen(true);
    setisUserData(data);
  };
  const handleOpenClone = (data) => {
    setOpenClone(true);
    setisUserData(data);
  };
  const handleCloseClone = () => {
    setOpenClone(false);
  };
  const token = localStorage.getItem("token");
  const decodedToken = parseJwt(token);

  // const filteredData = AdminData?.filter((admin) =>
  //   admin.name.toLowerCase().includes(search.toLowerCase())
  // );
  const handleAdminClick = (admin) => {
    switchLocationSuperAdmin({
      company_id: admin._id,
      adminId: admin.user._id,
    });
  };

  const handleCreateLocation = () => {
    setisEdit(false);
    setAddEditOpen(true);
  };
  useEffect(() => {
    if (switchedSuperAdmin) {
      localStorage.setItem("userReference", decodedToken.id);
      localStorage.setItem("token", useTokenSuperAdmin);
      window.location.href = "/";
    }
  }, [switchedSuperAdmin]);

  return (
    <Box sx={{ height: "90vh", overflow: "auto" }}>
      <div className="page-title-location">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "98%",
            margin: "auto",
            mt: 2,
          }}
        >
          <Box>
            <Typography sx={{ fontSize: "24px", fontWeight: 600 }}>
              {" "}
              Location Management
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 600,
                color: "#606366",
              }}
            >
              Add, edit and manage your locations.
            </Typography>
          </Box>
          <Box sx={{ width: "200px" }}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => handleCreateLocation(true)}
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
      <Grid container sx={{ px: 3.8 }} spacing={2}>
        {[
          { title: "Active Locations", text: activeCount, variant: "blue" },
          {
            title: "Non-Active Locations",
            text: InactiveCount,
            variant: "red",
          },
        ].map((item) => (
          <Grid item lg={4} md={6} xs={6}>
            <WidgetCard
              text={item.text}
              title={item.title}
              varient={item.variant}
              type={2}
            />
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: 4,
          my: 2,
          mt: 3,
        }}
      >
        <Typography sx={{ fontSize: 24, fontWeight: "bold" }}>
          All Locations
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <CustomInputField
            id="input-with-icon-textfield"
            placeholder="Search by User Name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <img src={icon} alt="search input" />
                </InputAdornment>
              ),
            }}
            value={search}
            onChange={handleChange}
          />
          <FormControl
            sx={{ width: "152px" }}
            size="small"
            className="custom-textfield"
          >
            <InputLabel id="demo-select-small-label" className="input-label">
              Status
            </InputLabel>
            <Select
              // value={age}
              size="small"
              labelId="demo-select-small-label"
              id="demo-select-small"
              label="Status"
              sx={{ height: "40px" }}
              // onChange={handleChange}
            >
              <MenuItem value={true}>Active</MenuItem>
              <MenuItem value={false}>inActive</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      {/* <div className="types-main-contianer">
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
            <Typography sx={{ fontSize: 18 }}>Users</Typography>
          </Box>
          <Typography sx={{ fontSize: 32, mt: 1, fontWeight: "bold" }}>
            {staffData.length}
          </Typography>
        </Box>
      </div> */}
      {/* <Box sx={{ mt: 4, ml: 4, mb: 2 }}>
        <TextField
          placeholder="Search by Name"
          variant="standard"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            width: "20% !important", // You can adjust the width as needed
            // Adjust the margin as needed
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
      </Box> */}
      <Grid container gap={2} p={4} pt={0}>
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
        ) : AdminData.length !== 0 ? (
          AdminData?.map((item) => {
            const filterNonActive = item.staffs;
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
              <SingleLocation
                data={item}
                handleToggleChange={handleToggleChange}
                nonActiveUsers={filterNonActive}
                handleAccessLocation={handleAdminClick}
                handleEdit={handleOpenEdit}
                handleClone={handleOpenClone}
                handleDelete={handleOpenDelete}
                refetch={AdminRefetch}
              />
              // <Box
              //   key={item?.user?._id}
              //   sx={{
              //     bgcolor: "white",
              //     border: "1px solid #EAECF0",
              //     width: "100%",
              //     minHeight: "316px",
              //     maxHeight: "316px",
              //     display: "flex",
              //     flexDirection: "column",
              //     justifyContent: "space-between",
              //   }}
              // >
              //   {/* uper part*/}
              //   <Box
              //     sx={{
              //       display: "flex",
              //       justifyContent: "space-between",
              //       p: 2,
              //     }}
              //   >
              //     {/* Box 1 */}
              //     <Box
              //       sx={{ display: "flex", flexDirection: "column", gap: 1 }}
              //     >
              //       {/* Name and logo */}
              //       <Box
              //         sx={{ display: "flex", gap: 1.5, alignItems: "center" }}
              //       >
              //         <Box>
              //           <DefaultImage
              //             image={item?.company?.image}
              //             name={item?.company?.name}
              //           />
              //         </Box>
              //         <Typography
              //           sx={{
              //             color: "#101828",
              //             fontSize: "18px",
              //             fontWeight: 500,
              //             textTransform:'capitalize'
              //           }}
              //         >
              //           {item?.company?.name}
              //           {/* {item?.user?.name} */}
              //         </Typography>
              //       </Box>
              //       {/* Email */}
              //       <Typography
              //         sx={{ color: "#667085", fontSize: "14px", mt: 1 }}
              //       >
              //         {item?.company?.address ? item?.company?.address : ""}
              //         {/* {item?.user?.email} */}
              //       </Typography>

              //       <Box sx={{ mt: 1 }}>
              //         <Box sx={{ mt: 1 }}>
              //           <Typography sx={{ fontSize: "14px", color: "#667085", textTransform: 'capitalize' }}>
              //             {/* {item?.company?.name} */}
              //             {item?.user?.name}
              //           </Typography>
              //           <Typography
              //             sx={{ fontSize: "14px", color: "#667085", mt: 0.4 }}
              //           >
              //             {/* {item?.company?.address} */}
              //             {item?.user?.email}{" "}
              //           </Typography>
              //           {/* Date Added */}
              //           <Typography
              //             sx={{ color: "#667085", fontSize: "14px", mt: 0.4 }}
              //           >
              //             {new Date(item?.user?.updatedAt).toLocaleDateString(
              //               undefined,
              //               {
              //                 weekday: "long",
              //                 day: "numeric",
              //                 month: "long",
              //                 year: "numeric",
              //               }
              //             )}
              //           </Typography>
              //         </Box>
              //       </Box>
              //     </Box>
              //     {/* Box 2 */}
              //     <Box
              //       sx={{
              //         display: "flex",
              //         flexDirection: "column",
              //         width: "180px",
              //         gap: 1,
              //       }}
              //     >
              //       <Box sx={{ height: "100px" }}>
              //         <Typography sx={{ fontSize: "16px", color: "#667085" }}>
              //           Status
              //         </Typography>

              //         <Box sx={{ ml: -1.2 }}>
              //           <TableRow
              //             title={
              //               item?.user?.status
              //                 ? ""
              //                 : "This Location is not Active"
              //             }
              //             row={item?.user}
              //             onToggleChange={handleToggleChange}
              //             type={"superAdmin"}
              //             refetch={AdminRefetch}
              //           />
              //         </Box>
              //       </Box>

              //       <Box sx={{ height: "125px" }}>
              //         <Typography sx={{ fontSize: "16px", color: "#667085" }}>
              //           Admins
              //         </Typography>
              //         <Grid container mt={1} gap={2}>
              //           {filterNonActive.length !== 0 ? (
              //             filterNonActive.map((user, index) => {
              //               return (
              //                 <DefaultImage
              //                   key={index}
              //                   image={user?.image}
              //                   name={user?.name}
              //                 />
              //               );
              //             })
              //           ) : (
              //             <Box
              //               sx={{ display: "flex", gap: 1.5, color: "#667085" }}
              //             >
              //               <img src={TeamIcon} alt="image of customer" />
              //               <Typography>{filterNonActive.length}</Typography>
              //             </Box>
              //           )}
              //         </Grid>
              //       </Box>
              //     </Box>
              //     {/* Box 3 */}
              //     <Box
              //       sx={{
              //         display: "flex",
              //         flexDirection: "column",
              //         width: "180px",
              //         gap: 1,
              //       }}
              //     >
              //       <Box sx={{ height: "100px" }}>
              //         <Typography sx={{ fontSize: "16px", color: "#667085" }}>
              //           Estimates
              //         </Typography>
              //         <Box
              //           sx={{
              //             display: "flex",
              //             gap: 1.5,
              //             color: "#667085",
              //             alignItems: "center",
              //             mt: 1,
              //           }}
              //         >
              //           <img src={EstimsteIcon} alt="image of customer" />
              //           <Typography sx={{ pt: 0.2 }}>
              //             {item.estimates}
              //           </Typography>
              //         </Box>
              //       </Box>

              //       <Box sx={{ height: "100px" }}>
              //         <Typography sx={{ fontSize: "16px", color: "#667085" }}>
              //           Users
              //         </Typography>
              //         <Box
              //           sx={{
              //             display: "flex",
              //             gap: 1.5,
              //             color: "#667085",
              //             alignItems: "center",
              //             mt: 1.2,
              //           }}
              //         >
              //           <img src={TeamIcon} alt="image of customer" />
              //           <Typography>{item.staffs}</Typography>
              //         </Box>
              //       </Box>
              //     </Box>
              //     {/* Box 4 */}
              //     <Box
              //       sx={{
              //         display: "flex",
              //         flexDirection: "column",
              //         width: "180px",
              //         gap: 1,
              //       }}
              //     >
              //       <Box sx={{ height: "100px" }}>
              //         <Typography sx={{ fontSize: "16px", color: "#667085" }}>
              //           Customers
              //         </Typography>
              //         <Box
              //           sx={{
              //             display: "flex",
              //             gap: 1,
              //             color: "#667085",
              //             alignItems: "center",
              //             mt: 1,
              //           }}
              //         >
              //           <img src={CustomerIcon} alt="image of customer" />
              //           <Typography>{item.customers}</Typography>
              //         </Box>
              //       </Box>

              //       <Box sx={{ height: "100px" }}>
              //         <Typography sx={{ fontSize: "16px", color: "#667085" }}>
              //           Layouts
              //         </Typography>
              //         <Box
              //           sx={{
              //             display: "flex",
              //             gap: 1,
              //             color: "#667085",
              //             alignItems: "center",
              //             mt: 1.2,
              //           }}
              //         >
              //           <img src={DefaultIcon} alt="image of customer" />
              //           <Typography>{item.layouts}</Typography>
              //         </Box>
              //       </Box>
              //     </Box>
              //   </Box>
              //   {/* lower part */}
              //   <Box
              //     sx={{
              //       display: "flex",
              //       justifyContent: "space-between",
              //       p: 0.6,
              //       height: "40px",
              //       borderTop: "1px solid #EAECF0",
              //       alignItems: "center",
              //     }}
              //   >
              //     <Box></Box>
              //     <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              //       <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              //         <IconButton
              //           sx={{
              //             p: 0,
              //             borderRadius: "100%",
              //             width: 28,
              //             height: 28,
              //           }}
              //           onClick={() => handleOpenClone(item)}
              //         >
              //           <ContentCopy sx={{ width: "20px", height: "20px" }} />
              //         </IconButton>
              //         <IconButton
              //           sx={{
              //             p: 0,
              //             borderRadius: "100%",
              //             width: 28,
              //             height: 28,
              //           }}
              //           onClick={() => handleOpenDelete(item)}
              //         >
              //           <img src={DeleteIcon} alt="delete icon" />
              //         </IconButton>
              //         <IconButton
              //           onClick={() => handleOpenEdit(item)}
              //           sx={{
              //             p: 0,
              //             borderRadius: "100%",
              //             width: 28,
              //             height: 28,
              //           }}
              //         >
              //           <img src={EditIcon} alt="delete icon" />
              //         </IconButton>
              //       </Box>
              //       <Tooltip
              //         title={
              //           !item.user.status && "Active this Location to Access"
              //         }
              //         placement="top"
              //         arrow
              //       >
              //         <Box>
              //           <Button
              //             disabled={!item.user.status}
              //             onClick={() => handleAdminClick(item)}
              //             variant="text"
              //             sx={{
              //               p: 1,
              //               m: 0,
              //               color: "#7F56D9",
              //               textTransform: "capitalize",
              //               borderLeft: "1px solid #EAECF0",
              //             }}
              //           >
              //             Access Location
              //           </Button>
              //         </Box>
              //       </Tooltip>
              //     </Box>
              //   </Box>
              // </Box>
            );
          })
        ) : (
          <Box sx={{ color: "#667085", textAlign: "center", mt: 1 }}>
            No Locations Found
          </Box>
        )}
      </Grid>
      <DeleteModal
        open={DeleteOpen}
        text={"location"}
        close={handleCloseDelete}
        isLoading={deleteisLoading}
        handleDelete={handleDeleteUser}
      />
      <AddEditLocationModal
        open={AddEditOpen}
        isEdit={isEdit}
        close={handleCloseAddEdit}
        userdata={isUserData?.user}
        companydata={isUserData?.company}
        refetch={AdminRefetch}
      />
      {/* <AddSuperAdminModel
        open={open}
        close={handleClose}
        refetch={AdminRefetch}
        // data={edit}
        // isEdit={isEdit}
      /> */}
      <CloneLocationModel
        open={OpenClone}
        close={handleCloseClone}
        refetch={AdminRefetch}
        data={isUserData}
      />
    </Box>
  );
};

export default SuperAdminTable;
