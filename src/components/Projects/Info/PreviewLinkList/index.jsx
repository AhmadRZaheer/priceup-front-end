import { Close } from "@mui/icons-material";
import DeleteIcon from "@/Assets/Delete-Icon.svg";
import EditIcon from "@/Assets/d.svg";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

const {
  Box,
  Typography,
  Modal,
  IconButton,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
} = require("@mui/material");

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
  bgcolor: "background.paper",
  p: 2,
  borderRadius: { sm: "4px", xs: "10px" },
  width: { sm: "880px", xs: "80%" },
};

const PreviewLinkList = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-customer-select"
    >
      <Box sx={style}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              p: 0.2,
              fontSize: "18px",
              fontWeight: 700,
            }}
          >
            Existing Landing Page List
          </Typography>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>
        <Box
          sx={{
            mt: 3,
            maxHeight: "70vh", // Limit height
            overflowY: "auto", // Enable scrolling
          }}
        >
          <Table sx={{  }} aria-label="simple table">
            <TableHead sx={{ backgroundColor: "#F3F5F6" }}>
              <TableRow>
                <TableCell>No. of Estimates</TableCell>
                <TableCell align="right">Total Amount</TableCell>
                <TableCell align="right">Date Added</TableCell>
                <TableCell align="right">Expiry Date</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.from({ length: 2 }).map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>sdsds</TableCell>
                  <TableCell align="right">sdsdsds</TableCell>
                  <TableCell align="right">sdsdsds</TableCell>
                  <TableCell align="right">sdsdsds</TableCell>
                  <TableCell align="right" sx={{ display: "flex", gap: 1.5 }}>
                    <IconButton
                      sx={{ width: 20, height: 20 }}
                      // onClick={() => handleOpenCloneModal(params?.row)}
                    >
                      <RemoveRedEyeIcon />
                    </IconButton>
                    <IconButton
                      sx={{ width: 20, height: 20 }}
                      // onClick={() => handleOpenDeleteModal(params?.row)}
                    >
                      <img
                        src={DeleteIcon}
                        alt="delete icon"
                        style={{ width: "20px", height: "20px" }}
                      />
                    </IconButton>
                    <IconButton
                      sx={{ width: 20, height: 20 }}
                      // onClick={() => handleOpenModifyModal(params?.row)}
                    >
                      <img
                        src={EditIcon}
                        alt="delete icon"
                        style={{ width: "20px", height: "20px" }}
                      />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Box>
    </Modal>
  );
};

export default PreviewLinkList;
