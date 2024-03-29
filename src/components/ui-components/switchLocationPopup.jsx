import {
  Box,
  CircularProgress,
  IconButton,
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

const SwitchLocationPopup = ({
  isSwitching,
  anchorEl,
  handleClosePopup,
  data,
  handleUserClick,
  handleBack,
}) => {
  const [role, setRole] = useState(false);
  const token = localStorage.getItem("token");
  const decodedToken = useMemo(() => parseJwt(token), [token]);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    if (
      decodedToken.role === userRoles.CUSTOM_ADMIN ||
      decodedToken.role === userRoles.ADMIN ||
      decodedToken.role === userRoles.SUPER_ADMIN ||
      decodedToken.role === userRoles.STAFF
    ) {
      setRole(true);
    } else {
      setRole(false);
    }
  }, [decodedToken]);

  const filteredData = useMemo(() => {
    if (!data) return [];
    const lowercasedQuery = searchQuery.toLowerCase();

    const result = data?.filter((admin) =>
      role
        ? admin?.company?.name.toLowerCase().includes(lowercasedQuery)
        : admin?.name?.toLowerCase().includes(lowercasedQuery)
    );

    return result;
  }, [data, searchQuery, role]);
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
          borderRadius: "34px",
          width: mobile ? "290px" : "317px",
        },
      }}
      sx={{ left: { sm: 30, xs: 0 }, top: { sm: -72, xs: 50 } }}
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

      <Box sx={{ position: "relative" }}>
        <input
          type="text"
          placeholder="Search Admin Names"
          style={{
            width: mobile ? "206px" : "230px",
            padding: "8px",
            paddingLeft: "35px",
            height: "26px",
            marginBottom: "10px",
            marginLeft: "20px",
            marginRight: "20px",
            marginTop: "20px",
            borderRadius: "14px",
          }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <span style={{ position: "absolute", left: "28px", top: "30px" }}>
          <Search sx={{ color: "#8477DA" }} />
        </span>
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
          filteredData.map((admin) => (
            <SingleUser
              key={role ? admin?.company?._id : admin?.id}
              item={role ? admin?.company : admin}
              active={
                role ? admin?.company?._id === decodedToken?.company_id : false
              }
              handleClick={() =>
                admin?.user?.status &&
                handleUserClick(
                  decodedToken.role === userRoles.CUSTOM_ADMIN
                    ? admin?.company?._id
                    : admin
                )
              }
              disabled={role ? !admin?.user?.status : !admin.status}
            />
          ))
        )}
      </div>
    </Popover>
  );
};

export default SwitchLocationPopup;
