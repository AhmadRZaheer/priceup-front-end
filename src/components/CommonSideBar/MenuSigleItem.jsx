import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./style.scss";
import { Button, IconButton } from "@mui/material";

const MenuSigleItem = ({ link, secondLink, children }) => {
  const location = useLocation();
  return (
    <>
      {!secondLink ? (
        <NavLink to={link} className="link">
          <li className={` ${location.pathname === link ? "active" : ""}`}>
            <Button
              fullWidth
              className="iconButton"
              sx={{
                color: "#5D6164",
                padding: "0px",
                justifyContent: "start",
                textTransform: "capitalize",
                gap: "12px",
              }}
            >
              {children}
            </Button>
          </li>
        </NavLink>
      ) : (
        <NavLink to={link} className="link">
          <li
            className={` ${
              location.pathname === link
                ? "active"
                : location.pathname === secondLink
                ? "active"
                : ""
            }`}
          >
            <Button
              fullWidth
              className="iconButton"
              sx={{
                color: "#5D6164",
                padding: "0px",
                justifyContent: "start",
                textTransform: "capitalize",
                gap:'12px'
              }}
            >
              {children}
            </Button>
          </li>
        </NavLink>
      )}
    </>
  );
};

export default MenuSigleItem;
