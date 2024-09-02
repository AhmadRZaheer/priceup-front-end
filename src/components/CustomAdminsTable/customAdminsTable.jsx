import React, { useState, useEffect, useCallback } from "react";
import "./admin.scss";
import {
  Box,
  Typography,
  InputAdornment,
  CircularProgress,
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
import { backendURL, debounce, getDecryptedToken } from "@/utilities/common";
import { useFetchAllDocuments } from "@/utilities/ApiHooks/common";

const CustomAdminsTable = () => {
  const routePrefix = `${backendURL}/customUsers`;
  const decodedToken = getDecryptedToken();
  const [search, setSearch] = useState("");
  const {
    data: locationsData,
    refetch: fetchLocations,
    isFetched,
    isLoading,
  } = useFetchAllDocuments(`${routePrefix}/haveAccess/${decodedToken?.id}?search=${search}`);
  // const {
  //   data: locationsData,
  //   mutate: fetchLocations,
  //   isLoading,
  // } = useFetchCustomAdminHaveAccessTo();

  const {
    mutate: switchLocationUser,
    data: newToken,
    isSuccess: switched,
    isLoading: isSwitching,
  } = useSwitchLocationUser();

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
  //     admin.user.name.toLowerCase().includes(search.toLowerCase())
  //   );
  //   return result ?? [];
  // }, [locationsData, search]);

  const handleSwitchLocation = async (companyData) => {
    if (!companyData._id || !decodedToken) {
      console.error("Invalid user data or decoded token.");
      return;
    }
    if (companyData._id !== decodedToken.company_id) {
      await switchLocationUser(companyData._id);
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
        bgcolor: { sm: "#F6F5FF", xs: '#FFFFFF' },
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
        {isLoading ? (
          <Box
            sx={{
              width: "100%",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              height: "300px",
              alignItems: "center",
              background: '#FFFF'
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
            );
          })
        ) : (
          <Box sx={{ color: "#667085", textAlign: "center", mt: 1, width: "100%", background: '#FFFF' }}>
            No Location Found
          </Box>
        )}
      </Grid>
    </Box>
  );
};

export default CustomAdminsTable;
