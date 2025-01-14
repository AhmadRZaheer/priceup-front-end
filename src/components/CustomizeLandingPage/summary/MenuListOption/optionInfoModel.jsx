import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid, IconButton } from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";
import Imag1 from "@/Assets/CustomerLandingImages/2.png";
import { backendURL } from "@/utilities/common";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 700,
  minHeight: 300,
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  boxShadow: 24,
  borderRadius: 2,
  px: 3,
  pb: 1.5,
  pt: 4,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

export default function OptionInfoModel({ itemData }) {
  const [open, setOpen] = React.useState(false);
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
        <InfoOutlined />
      </IconButton>
      <Modal
        open={open}
        onClose={(event) => handleClose(event)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableAutoFocus
      >
        <Box sx={style}>
          <Box sx={{display:'flex',gap:4,width:'100%'}}>
            <Box sx={{width:'190px'}}>
              <img
                src={`${backendURL}/${itemData?.image}`}
                alt="not"
                style={{ width: "170px", height: "170px" }}
              />
            </Box>
            <Box  sx={{width:'100%' }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  //   justifyContent: "center",
                  gap: 3,
                }}
              >
                <Typography className="optionHead">
                  {itemData?.name ?? ""}
                </Typography>
                <Typography
                  className="optionSubHead"
                  sx={{ pr: 1, fontSize: "18px !important",height:'200px',overflowY:'auto' }}
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
                  backgroundColor: "#F95500",
                  //   fontSize:'18px',
                  "&:hover": {
                    backgroundColor: "#F95500",
                  },
                  // width: "120px",
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
