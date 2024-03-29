import React, { useState, useEffect, useMemo } from "react";
import "./staffLocation.scss";
import TeamIcon from "../../Assets/user-gary.svg";
import {
  Box,
  Button,
  Typography,
  InputAdornment,
  CircularProgress,
  TextField,
  Tooltip,
} from "@mui/material";
import CustomerIcon from "../../Assets/Customer-icon-gray.svg";
import DefaultIcon from "../../Assets/layout-gray.svg";
import { Search } from "@mui/icons-material";
import EstimsteIcon from "../../Assets/estmales-gray.svg";
import DefaultImage from "../ui-components/defaultImage";
import { parseJwt } from "../ProtectedRoute/authVerify";
import {
  useFetchStaffHaveAccessTo,
  useSwitchStaffLocation,
} from "../../utilities/ApiHooks/team";

const StaffLocationsTable = () => {
  const {
    data: locationsData,
    refetch: fetchLocations,
    isLoading,
  } = useFetchStaffHaveAccessTo();
  const {
    mutate: switchLocationUser,
    data: newToken,
    isSuccess: switched,
    isLoading: isSwitching,
  } = useSwitchStaffLocation();
  const [search, setSearch] = useState("");
  const token = localStorage.getItem("token");
  const decodedToken = parseJwt(token);

  const filteredData = useMemo(() => {
    const result = locationsData?.filter((admin) =>
      admin.company.name.toLowerCase().includes(search.toLowerCase())
    );
    return result ?? [];
  }, [locationsData, search]);

  const handleSwitchLocation = async (companyId) => {
    if (!companyId || !decodedToken) {
      console.error("Invalid user data or decoded token.");
      return;
    }
    if (companyId !== decodedToken.company_id) {
      await switchLocationUser(companyId);
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
        bgcolor: "white",
      }}
    >
      <div className="page-title">
        <Typography variant="h4" pt={1} pl={2}>
          Locations
        </Typography>
      </div>

      <Box sx={{ mt: 4, ml: 4, mb: 2 }}>
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
      </Box>
      <div className="hardwareTable-superadmin">
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
        ) : filteredData.length !== 0 ? (
          filteredData?.map((item) => {
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
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    {/* Name and logo */}
                    <Box
                      sx={{ display: "flex", gap: 1.5, alignItems: "center" }}
                    >
                      <Box>
                        <DefaultImage
                          image={item?.company?.image}
                          name={item?.company?.name}
                        />
                      </Box>
                      <Typography
                        sx={{
                          color: "#101828",
                          fontSize: "18px",
                          fontWeight: 500,
                        }}
                      >
                        {item?.company?.name}
                      </Typography>
                    </Box>
                    {/* Email */}
                    <Typography
                      sx={{ color: "#667085", fontSize: "14px", mt: 1 }}
                    >
                      {item?.company?.address}
                    </Typography>

                    <Box sx={{ mt: 2 }}>
                      <Typography sx={{ fontSize: "14px", color: "#667085" }}>
                        {item?.user?.name}
                        {/* {item?.company?.name} */}
                      </Typography>
                      {/* Email */}

                      <Typography
                        sx={{ fontSize: "14px", color: "#667085", mt: 0.4 }}
                      >
                        {item?.user?.email}
                        {/* {item?.company?.address} */}
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
                          gap: 1.5,
                          color: "#667085",
                          alignItems: "center",
                          mt: 1,
                        }}
                      >
                        <img src={EstimsteIcon} alt="image of customer" />
                        <Typography sx={{ pt: 0.2 }}>
                          {item.estimates}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ height: "100px" }}>
                      <Typography sx={{ fontSize: "16px", color: "#667085" }}>
                        Users
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1.5,
                          color: "#667085",
                          alignItems: "center",
                          mt: 1.2,
                        }}
                      >
                        <img src={TeamIcon} alt="image of customer" />
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
                        <img src={CustomerIcon} alt="image of customer" />
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
                          mt: 1.2,
                        }}
                      >
                        <img src={DefaultIcon} alt="image of customer" />
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
                  <Tooltip
                    title={!item.user.status && "This Location is not Active"}
                    placement="top"
                    arrow
                  >
                    <Box>
                      <Button
                        onClick={() => handleSwitchLocation(item.company._id)}
                        variant="text"
                        disabled={!item.user.status}
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
                    </Box>
                  </Tooltip>
                </Box>
              </Box>
            );
          })
        ) : (
          <Box sx={{ color: "#667085", textAlign: "center", mt: 1 }}>
            No Locations Found
          </Box>
        )}
      </div>
    </Box>
  );
};

export default StaffLocationsTable;
