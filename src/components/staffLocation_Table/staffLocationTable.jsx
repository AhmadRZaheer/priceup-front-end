import React, { useState, useEffect, useMemo, useCallback } from "react";
import "./staffLocation.scss";
import {
  Box,
  Typography,
  InputAdornment,
  CircularProgress,
  Grid,
} from "@mui/material";
import { parseJwt } from "../ProtectedRoute/authVerify";
import icon from "../../Assets/search-icon.svg";
import {
  useFetchStaffHaveAccessTo,
  useSwitchStaffLocation,
} from "../../utilities/ApiHooks/team";
import SingleLocation from "../ui-components/singleLocation";
import CustomInputField from "../ui-components/CustomInput";
import { backendURL, debounce, getDecryptedToken } from "@/utilities/common";
import { useFetchAllDocuments } from "@/utilities/ApiHooks/common";

const StaffLocationsTable = () => {
  const routePrefix = `${backendURL}/staffs`;
  const decodedToken = getDecryptedToken();
  const [search, setSearch] = useState("");
  const {
    data: locationsData,
    refetch: fetchLocations,
    isFetched,
    isLoading,
  } = useFetchAllDocuments(
    `${routePrefix}/haveAccess/${decodedToken?.id}?search=${search}`
  );
  // http://localhost:5000/customUsers/haveAccess/:id?search=weww
  // const {
  //   data: locationsData,
  //   refetch: fetchLocations,
  //   isLoading,
  // } = useFetchStaffHaveAccessTo();
  const {
    mutate: switchLocationUser,
    data: newToken,
    isSuccess: switched,
    isLoading: isSwitching,
  } = useSwitchStaffLocation();

  const debouncedRefetch = useCallback(
    debounce(() => {
      fetchLocations();
    }, 500),
    [search]
  );

  const handleChange = (e) => {
    setSearch(e.target.value);
    debouncedRefetch();
  };
  // const filteredData = useMemo(() => {
  //   const result = locationsData?.filter((admin) =>
  //     admin.name.toLowerCase().includes(search.toLowerCase())
  //   );
  //   return result ?? [];
  // }, [locationsData, search]);

  const handleSwitchLocation = async (companydata) => {
    if (!companydata._id || !decodedToken) {
      console.error("Invalid user data or decoded token.");
      return;
    }
    if (companydata._id !== decodedToken.company_id) {
      await switchLocationUser(companydata._id);
      console.log("user changed");
    }
  };
  useEffect(() => {
    if (switched) {
      localStorage.setItem("token", newToken);
      window.location.href = "/";
    }
  }, [switched]);

  useEffect(() => {
    fetchLocations();
  }, []);
  return (
    <Box
      sx={{
        height: "100vh",
        overflow: "auto",
        width: "100%",
        bgcolor: {sm:"#F6F5FF",xs:'#FFFFFF'},
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: 4,
          my: 2,
          // mt: 12,
        }}
      >
        <Typography sx={{ fontSize: 24, fontWeight: "bold" }}>
          All Locations
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <CustomInputField
            id="input-with-icon-textfield"
            placeholder="Search"
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
        </Box>
      </Box>
      <Grid container gap={2} p={4} pt={0}>
        {isLoading || isSwitching ? (
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
        ) : locationsData.length !== 0 ? (
          locationsData?.map((item) => {
            return (
              <SingleLocation
                data={item}
                // handleToggleChange={handleToggleChange}
                nonActiveUsers={item.staffs}
                handleAccessLocation={handleSwitchLocation}
                // handleEdit={handleOpenEdit}
                // handleClone={handleOpenClone}
                // handleDelete={handleOpenDelete}
                // refetch={AdminRefetch}
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
              //             textTransform: "capitalize"
              //           }}
              //         >
              //           {item?.company?.name}
              //         </Typography>
              //       </Box>
              //       {/* Email */}
              //       <Typography
              //         sx={{ color: "#667085", fontSize: "14px", mt: 1 }}
              //       >
              //         {item?.company?.address}
              //       </Typography>

              //       <Box sx={{ mt: 2 }}>
              //         <Typography sx={{ fontSize: "14px", color: "#667085", textTransform: "capitalize"}}>
              //           {item?.user?.name}
              //           {/* {item?.company?.name} */}
              //         </Typography>
              //         {/* Email */}

              //         <Typography
              //           sx={{ fontSize: "14px", color: "#667085", mt: 0.4 }}
              //         >
              //           {item?.user?.email}
              //           {/* {item?.company?.address} */}
              //         </Typography>
              //         {/* Date Added */}
              //         <Typography sx={{ color: "#667085", fontSize: "14px" }}>
              //           {new Date(item?.user?.updatedAt).toLocaleDateString(
              //             undefined,
              //             {
              //               weekday: "long",
              //               day: "numeric",
              //               month: "long",
              //               year: "numeric",
              //             }
              //           )}
              //         </Typography>
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
              //     <Tooltip
              //       title={!item.user.status && "This Location is not Active"}
              //       placement="top"
              //       arrow
              //     >
              //       <Box>
              //         <Button
              //           onClick={() => handleSwitchLocation(item.company._id)}
              //           variant="text"
              //           disabled={!item.user.status}
              //           sx={{
              //             p: 1,
              //             m: 0,
              //             color: "#7F56D9",
              //             textTransform: "capitalize",
              //             borderLeft: "1px solid #EAECF0",
              //           }}
              //         >
              //           Access Location
              //         </Button>
              //       </Box>
              //     </Tooltip>
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
    </Box>
  );
};

export default StaffLocationsTable;
