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
  minWidth: 400,
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  boxShadow: 24,
  borderRadius: 2,
  px: 3,
  pb: 1.5,
  pt: 4,
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
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <img
                src={`${backendURL}/${itemData?.image}`}
                alt="not"
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={7.5} sx={{ display: "flex" }}>
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
                  {/* GCS ARMOR THE ULTIMATE GLASS PROTECTION SOLUTION{" "} */}
                </Typography>
                <Typography
                  className="optionSubHead"
                  sx={{ pr: 1, fontSize: "20px !important" }}
                >
                  {itemData?.description?.length
                    ? itemData?.description
                    : "No Dscription Found!"}
                  {/* Glass is naturally porous, allowing water and contaminants to
                  seep in, but GCS Armor's hydrophobic nano coating fills and
                  seals these pores, leaving surfaces smooth and protected.
                  Backed by a 10-year warranty, it ensures long-lasting
                  durability. */}
                </Typography>
              </Box>
            </Grid>
          </Grid>
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
