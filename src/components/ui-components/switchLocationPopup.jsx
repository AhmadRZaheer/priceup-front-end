import {
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
  Popover,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import SingleUser from "./SingleUser";
import { parseJwt } from "../ProtectedRoute/authVerify";
import { Search } from "@mui/icons-material";
import BackIcon from "../../Assets/back.svg";
import { userRoles } from "../../utilities/constants";
import CustomInputField from "./CustomInput";

const SwitchLocationPopup = ({
  isSwitching,
  anchorEl,
  handleClosePopup,
  data,
  handleUserClick,
  handleBack,
}) => {
  const token = localStorage.getItem("token");
  const decodedToken = useMemo(() => parseJwt(token), [token]);
  const [searchQuery, setSearchQuery] = useState("");

  const isAdmin_SuperAdmin =
    decodedToken.role === userRoles.ADMIN ||
    decodedToken.role === userRoles.SUPER_ADMIN
      ? true
      : false;

  const filteredData = useMemo(() => {
    if (!data) return [];
    const lowercasedQuery = searchQuery.toLowerCase();

    const result = data?.filter((admin) =>
      isAdmin_SuperAdmin
        ? admin?.company?.name.toLowerCase().includes(lowercasedQuery)
        : admin?.name?.toLowerCase().includes(lowercasedQuery)
    );

    return result;
  }, [data, searchQuery, decodedToken.role]);
  const mobile = useMediaQuery("(max-width: 600px)");
  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={handleClosePopup}
      anchorOrigin={{
        vertical: "top",
        horizontal: mobile ? "left" : "right",
      }}
      transformOrigin={{
        vertical: { sm: "top" },
        horizontal: { sm: "left" },
      }}
      PaperProps={{
        style: {
          borderRadius: "8px",
          width: mobile ? "290px" : "335px",
          border:'1px solid #D4DBDF'
        },
      }}
      sx={{ left: { sm: 24, xs: 0 }, top: { sm: -35, xs: 50 } }}
    >
      {decodedToken.company_id !== "" && (
        <IconButton
          sx={{
            fontSize: "15px",
            borderRadius: 1,
            ml: 2.2,
            mt: 2,
            color: "#667085",
            position: "sticky",
            bg: "white",
            top: 0,
            display: "flex",
            gap: 2,
            bgcolor: "white",
            ":hover": {
              bgcolor: "white",
            },
            p: 1,
          }}
          onClick={handleBack}
        >
          <img src={BackIcon} alt="back icon" />
          Back to{" "}
          {decodedToken.role === userRoles.CUSTOM_ADMIN
            ? "Custom Admin"
            : decodedToken.role === userRoles.STAFF
            ? "all Locations"
            : "Super Admin"}{" "}
          view
        </IconButton>
      )}

      <Box sx={{ position:'relative',m:'20px 20px 10px 20px' }}>
      <CustomInputField
            id="input-with-icon-textfield"
            placeholder="Search by Location Name"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: "#8477DA" }} />
                </InputAdornment>
              ),
            }}
            value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          />
        {/* <input
          type="text"
          placeholder="Search Admin Names"
          style={{
            width: mobile ? "206px" : "250px",
            padding: "8px",
            paddingLeft: "35px",
            height: "26px",
            marginBottom: "10px",
            marginLeft: "20px",
            marginRight: "20px",
            marginTop: "20px",
            borderRadius: "4px",
          }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <span style={{ position: "absolute", left: "28px", top: "30px" }}>
          <Search sx={{ color: "#8477DA" }} />
        </span> */}
      </Box>
      <div
        style={{
          maxHeight: "260px",
          overflowY: "auto",
          paddingX: 25,
          width: mobile ? "280px" : "315px",
          display: "flex",
          flexDirection: "column",
          gap: 5,
          pt: 100,
          position: "relative",
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        {filteredData.length === 0 ? (
          <Typography sx={{ textAlign: "center", color: "#8f8f8f", py: 2 }}>
            No location found
          </Typography>
        ) : isSwitching ? (
          <Box
            sx={{
              width: "100%",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              height: "100px",
              alignItems: "center",
            }}
          >
            <CircularProgress sx={{ color: "#8477DA" }} />
          </Box>
        ) : (
          filteredData.map((admin) => {
            return (
              <SingleUser
                key={isAdmin_SuperAdmin ? admin?.company?._id : admin?._id}
                item={isAdmin_SuperAdmin ? admin?.company : admin}
                active={
                  isAdmin_SuperAdmin
                    ? admin?.company?._id === decodedToken?.company_id
                    : false
                }
                handleClick={() => {
                  admin?.user?.status
                    ? handleUserClick(
                        isAdmin_SuperAdmin ? admin.company : admin
                      )
                    : console.log("user is not active");
                }}
                disabled={!admin?.user?.status ?? !admin.status}
              />
            );
          })
        )}
      </div>
    </Popover>
  );
};

export default SwitchLocationPopup;
