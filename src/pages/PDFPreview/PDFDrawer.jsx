import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { useState } from "react";
import PDFPreview from ".";
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function PDFPreviewDrawer({ handleClick }) {
  const [open, setOpen] = useState(false);
  const toggleDrawerOpen = (newOpen) => () => {
    setOpen(newOpen);
    handleClick();
  };
  const toggleDrawerClose = () => {
    setOpen(false);
    localStorage.removeItem("pdf-estimate");
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={toggleDrawerOpen(true)}
        startIcon={<VisibilityIcon/>}
        sx={{
          backgroundColor: "#8477da",
          "&:hover": {
            backgroundColor: "#8477da",
          },
          ":disabled": {
            bgcolor: "#c2c2c2",
          },
        }}
      >
      View PDF
      </Button>
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawerClose}
        sx={{
          width: "100vw",
          "& .MuiDrawer-paper": {
            boxShadow: "none",
            width: "calc(100vw - 296px)",
          },
        }}
      >
        <PDFPreview handleClickClose={toggleDrawerClose} />
      </Drawer>
    </>
  );
}
