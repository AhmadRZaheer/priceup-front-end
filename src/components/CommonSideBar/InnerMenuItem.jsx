import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./style.scss";
import { Button, IconButton } from "@mui/material";

const InnerMenuItem = ({ link, secondLink, children }) => {
  const location = useLocation();
  return (
    <>
      <NavLink to={link} className="ineerlink" style={{textDecoration:'none'}}>
        <li
          className={`${location.pathname === link ? "innerActive" : ""}`} >
          <Button
            fullWidth
            className="innerItem"
            sx={{
              color: "#5D6164",
              padding: "0px",
              justifyContent: "start",
              textTransform: "capitalize",
            }}
          >
            {children}
          </Button>
        </li>
      </NavLink>
    </>
  );
};

export default InnerMenuItem;
