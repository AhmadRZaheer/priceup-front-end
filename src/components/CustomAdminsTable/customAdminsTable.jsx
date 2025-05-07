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
import { setChangeLocation } from "@/redux/refetch";
import { useDispatch } from "react-redux";

const CustomAdminsTable = () => {
  const routePrefix = `${backendURL}/customUsers`;
  const decodedToken = getDecryptedToken();
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const [locationAccessLoading, setLocationAccessLoading] = useState({});
  const {
    data: locationsData,
    refetch: fetchLocations,
    isFetched,
    isFetching,
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
      setLocationAccessLoading((prev) => ({ ...prev, [companyData._id]: true }));
      await switchLocationUser(companyData._id);
      console.log("user changed");
    }
  };
  useEffect(() => {
    if (switched) {
      localStorage.setItem('splashLoading', 'true')
      dispatch(setChangeLocation());
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
        // height: "100vh",
        overflow: "auto",
        width: "100%",
        bgcolor: { sm: "#F6F5FF", xs: '#FFFFFF' },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          // px: 4,
          mb: 2,
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
      <Grid container gap={2}>
        {isFetching ? (
          <Box
            sx={{
              width: "100%",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              height: "300px",
              alignItems: "center",
              // background: '#FFFF'
            }}
          >
            <CircularProgress sx={{ color: "#8477DA" }} />
          </Box>
        ) : locationsData.length !== 0 ? (
          locationsData?.map((item) => {
            return (
              <Grid item xs={5.8} xl={3.89} key={item._id} sx={{
                '@media (min-width: 1400px) and (max-width: 1550px)': {
                  flexBasis: '32.3%', 
                  maxWidth: '32.3%',
                },
              }}>
              <SingleLocation
                data={item}
                // handleToggleChange={handleToggleChange}
                nonActiveUsers={item.staffs}
                handleAccessLocation={handleSwitchLocation}
                isloading={locationAccessLoading[item._id]}
              // handleEdit={handleOpenEdit}
              // handleClone={handleOpenClone}
              // handleDelete={handleOpenDelete}
              // refetch={AdminRefetch}
              />
              </Grid>
            );
          })
        ) : (
          <Box sx={{ color: "#667085", textAlign: "center", mt: 1, width: "100%",}}>
            No Location Found
          </Box>
        )}
      </Grid>
    </Box>
  );
};

export default CustomAdminsTable;
