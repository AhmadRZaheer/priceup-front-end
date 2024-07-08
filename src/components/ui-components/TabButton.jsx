import { Button } from "@mui/material";
import React from "react";

const TabButton = ({ title, selected, onClick, sx }) => {
  return (
    <Button
      onClick={onClick}
      sx={{
        color: selected ? '#000000' :'rgba(16, 13, 36, 0.57)',
        borderRadius: "unset",
        background: "none",
        fontWeight: selected ? 500 : 300,
        fontSize: "21px !important",
        lineHeight: "26.6px !important",
        ...sx,
      }}
    >
      {title}
    </Button>
  );
};

export default TabButton;
