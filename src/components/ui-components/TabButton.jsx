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
        textTransform:'none',
        fontSize: "21px !important",
        lineHeight: "26.6px !important",
        borderBottom:selected? '4px solid #8477DA' :'none',
        ...sx,
      }}
    >
      {title}
    </Button>
  );
};

export default TabButton;
