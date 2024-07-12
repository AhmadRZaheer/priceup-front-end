import {
  Box,
  Popover, // Import Popover from @mui/material
  Typography,
} from "@mui/material";
import { backendURL } from "../../utilities/common";
import React, { useState } from "react";

const NameAcronyms = ({
  name,
  width = 40,
  height = 40,
  borderRadius = "100%",
  type,
}) => {
  let firstNameInitial = "";
  let lastNameInitial = "";
  if (name) {
    firstNameInitial = name.charAt(0);
    lastNameInitial = name.length > 1 ? name.charAt(1) : "";
  }
  return (
    <Typography
      sx={{
        backgroundColor: type === 4 ? "#FFFFFF" : "#F9F5FF",
        width: width,
        height: height,
        borderRadius: borderRadius,
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#7F56D9",
        textTransform: "uppercase",
        fontWeight: "bold",
        boxShadow: type === 4 ? 1 : "none",
      }}
    >
      {firstNameInitial}
      {lastNameInitial}
    </Typography>
  );
};

const DefaultImage = ({ image, name, type = 1 }) => {
  const [imageError, setImageError] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <>
      <Box
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={type !== 3 ? handlePopoverOpen : undefined}
        onMouseLeave={type !== 3 ? handlePopoverClose : undefined}
        sx={{
          cursor: "pointer",
          overflow: "hidden",
          borderRadius: "100%",
          width: type === 1 || type === 3 || type === 4 ? 40 : 50,
          height: type === 1 || type === 3 || type === 4 ? 40 : 50,
        }}
      >
        {!imageError ? (
          <img
            className="cellImg"
            style={{
              width: type === 1 || type === 3 ? 40 : 50,
              height: type === 1 || type === 3 ? 40 : 50,
            }}
            onError={() => setImageError(true)}
            src={`${backendURL}/${image}`}
            alt="logo image"
          />
        ) : (
          <NameAcronyms name={name} type={type} />
        )}
      </Box>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
          borderRadius: "8px !important",
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
        PaperProps={{
          style: { backgroundColor: "transparent", boxShadow: "none" }, // Set the background color of the Popover to transparent
        }}
      >
        <Box
          sx={{
            backgroundColor: "transparent !important",
            background: "transparent !important",
          }}
        >
          {!imageError ? (
            <img
              className="cellImg"
              style={{ width: 150, height: 150 }}
              src={`${backendURL}/${image}`}
              alt="logo image"
            />
          ) : (
            <NameAcronyms
              name={name}
              width={150}
              height={150}
              borderRadius="10px"
            />
          )}
        </Box>
      </Popover>
    </>
  );
};

export default DefaultImage;
