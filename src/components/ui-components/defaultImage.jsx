import {
  Popover, // Import Popover from @mui/material
  Typography,
} from "@mui/material";
import { backendURL } from "../../utilities/common";
import { useState } from "react";

function DefaultImage({ image, name, type = 1 }) {
  let firstNameInitial = "";
  let lastNameInitial = "";

  if (name) {
    firstNameInitial = name.charAt(0);
    lastNameInitial = name.length > 1 ? name.charAt(1) : "";
  }
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  switch (image) {
    case "images/users/default.jpg":
    case "images/staffs/default.jpg":
    case "images/staff/default.jpg":
    case "":
    case "null":
    case null:
    case undefined:
      return (
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
      );
    default:
      return (
        <>
          <Typography
            aria-owns={open ? "mouse-over-popover" : undefined}
            aria-haspopup="true"
            onMouseEnter={type !== 3 ? handlePopoverOpen : undefined}
            onMouseLeave={type !== 3 ? handlePopoverClose : undefined}
            sx={{
              cursor: "pointer",
              overflow: "hidden",
              borderRadius: "100%",
              width: type === 1 || type === 3 ? 40 : 50,
              height: type === 1 || type === 3 ? 40 : 50,
            }}
          >
            <img
              className="cellImg"
              style={{
                width: type === 1 || type === 3 ? 40 : 50,
                height: type === 1 || type === 3 ? 40 : 50,
              }}
              src={`${backendURL}/${image}`}
              alt="logo image"
            />
          </Typography>
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
            <Typography
              sx={{
                backgroundColor: "transparent !important",
                background: "transparent !important",
              }}
            >
              {" "}
              <img
                className="cellImg"
                style={{ width: 150, height: 150 }}
                src={`${backendURL}/${image}`}
                alt="logo image"
              />
            </Typography>
          </Popover>
        </>
      );
  }
}

export default DefaultImage;
