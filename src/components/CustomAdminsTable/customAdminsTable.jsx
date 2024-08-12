import React, { useState, useEffect, useMemo } from "react";
import "./admin.scss";
import TeamIcon from "../../Assets/user-gary.svg";
import {
  Box,
  Button,
  Typography,
  InputAdornment,
  CircularProgress,
  TextField,
  Tooltip,
  FormControl,
  InputLabel,
  Grid,
} from "@mui/material";
import icon from "../../Assets/search-icon.svg";
import CustomerIcon from "../../Assets/Customer-icon-gray.svg";
import DefaultIcon from "../../Assets/layout-gray.svg";
import {
  useFetchCustomAdminHaveAccessTo,
  useSwitchLocationUser,
} from "../../utilities/ApiHooks/superAdmin";
import { Search } from "@mui/icons-material";
import EstimsteIcon from "../../Assets/estmales-gray.svg";
import DefaultImage from "../ui-components/defaultImage";
import { parseJwt } from "../ProtectedRoute/authVerify";
import SingleLocation from "../ui-components/singleLocation";
import CustomInputField from "../ui-components/CustomInput";

const CustomAdminsTable = () => {
  const {
    data: locationsData,
    mutate: fetchLocations,
    isLoading,
  } = useFetchCustomAdminHaveAccessTo();

  const {
    mutate: switchLocationUser,
    data: newToken,
    isSuccess: switched,
    isLoading: isSwitching,
  } = useSwitchLocationUser();

  const [search, setSearch] = useState("");
  const token = localStorage.getItem("token");
  const decodedToken = parseJwt(token);

  const filteredData = useMemo(() => {
    const result = locationsData?.filter((admin) =>
      admin.user.name.toLowerCase().includes(search.toLowerCase())
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
  // useEffect(() => {
  //   if (switched) {
  //     localStorage.setItem("token", useToken);
  //     dispatch(setDataRefetch());
  //     console.log(switched);
  //     setRefetchKey((prevKey) => prevKey + 1);
  //   }
  // }, [switched]);

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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: 4,
          my: 2,
          mt: 12,

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
            onChange={(e) => setSearch(e.target.value)}
          />
        </Box>
      </Box>
      <Grid container gap={2} p={4} pt={0}>
        {isLoading ? (
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
              <SingleLocation
                data={item}
                // handleToggleChange={handleToggleChange}
                // nonActiveUsers={filterNonActive}
                handleAccessLocation={handleSwitchLocation}
                // handleEdit={handleOpenEdit}
                // handleClone={handleOpenClone}
                // handleDelete={handleOpenDelete}
                // refetch={AdminRefetch}
              />
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

export default CustomAdminsTable;
