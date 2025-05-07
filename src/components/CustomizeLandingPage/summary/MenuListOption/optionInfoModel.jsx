import '../../style.scss';

import * as React from 'react';

import { backendURL } from '@/utilities/common';
import { InfoOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

const NameAcronyms = ({ name, width, height, borderRadius = "100%", type }) => {
  let firstNameInitial = "";
  let lastNameInitial = "";
  if (name) {
    firstNameInitial = name.charAt(0);
    lastNameInitial = name.length > 1 ? name.charAt(1) : "";
  }
  return (
    <Typography
      sx={{
        backgroundColor: type === 4 ? "#FFFFFF" : "#f95500",
        width: width ?? 40,
        height: height ?? 40,
        opacity: 0.8,
        borderRadius: borderRadius,
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: {sm:700,xs:340},
  minHeight: 300,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  px: {sm:3,xs:2},
  pb: 1.5,
  pt: {sm:4,xs:2},
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

export default function OptionInfoModel({ itemData, colorData }) {
  const primaryColor = colorData?.primary;
  const [open, setOpen] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);
  const handleOpen = (event) => {
    event.stopPropagation();
    setOpen(true);
  };
  const handleClose = (event) => {
    event.stopPropagation();
    setOpen(false);
  };

  return (
    <div>
      <IconButton sx={{ p: "1px" }} onClick={(event) => handleOpen(event)}>
        <InfoOutlined sx={{fontSize:{sm:'24px',xs:'20px'}}}/>
      </IconButton>
      <Modal
        open={open}
        onClose={(event) => handleClose(event)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableAutoFocus
      >
        <Box sx={style}>
          <Box sx={{ display: "flex", gap: {sm:4,xs:2}, width: "100%" }}>
            <Box sx={{ width: {sm:"190px",xs:'90px'} }}>
              {!imageError ? (
                <img
                  className="upgradeOptionImg"
                  
                  onError={() => setImageError(true)}
                  src={`${backendURL}/${itemData?.image}`}
                  alt="not found"
                />
              ) : (
                <NameAcronyms
                  name={itemData?.name}
                  type={1}
                  width={"170px"}
                  height={"170px"}
                />
              )}
            </Box>
            <Box sx={{ width: "100%" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: {sm:3,xs:1},
                }}
              >
                <Typography className="optionHead">
                  {itemData?.name ?? ""}
                </Typography>
                <Typography
                  className="optionSubHead"
                  sx={{
                    pr: 1,
                    fontSize: {sm:"18px !important",xs:"16px !important"},
                    height: "200px",
                    overflowY: "auto",
                  }}
                >
                  {itemData?.description?.length
                    ? itemData?.description
                    : "No Description Found!"}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "end", pt: 1.5 }}>
            <Box>
              <Button
                onClick={(event) => handleClose(event)}
                variant="contained"
                sx={{
                  backgroundColor: primaryColor,
                  "&:hover": {
                    backgroundColor: primaryColor,
                  },
                }}
              >
                Close
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
