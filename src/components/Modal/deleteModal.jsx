import { CloseTwoTone } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Modal,
  Typography,
  useMediaQuery,
} from "@mui/material";
import DeleteIcon from "../../Assets/delete-full icon.svg";

function DeleteModal({ open, close, handleDelete, isLoading }) {
  const isMobile = useMediaQuery("(max-width:600px)");
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? 200 : 560,
    bgcolor: "background.paper",
    border: "2px solid white",
    boxShadow: 24,
    p: 3,
    borderRadius: "12px",
  };
  return (
    <>
      <Modal open={open} onClose={close}>
        <Box sx={style}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Typography sx={{ fontWeight: "bold", fontSize: 18 }}>
                Delete
              </Typography>
              <Typography sx={{ color: "#646669", marginTop: 0.5 }}>
                Delete your details.
              </Typography>
            </Box>
            <Box>
              <IconButton onClick={close}>
                <CloseTwoTone />
              </IconButton>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 0.4,
              p: 2,
              background: "#f3f5f6",
              borderRadius: "12px",
              mt: 3,
            }}
          >
            <Box>
              <img src={DeleteIcon} alt="delete icon" />
            </Box>
            <Typography sx={{ fontSize: "18px", fontWeight: 700 }}>
              Delete user
            </Typography>
            <Typography
              sx={{ fontSize: "16px", fontWeight: 600, color: "#606366" }}
            >
              Are you sure you want to delete user?{" "}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              mt: 3,
              justifyContent: "end",
            }}
          >
            <Button
              onClick={handleDelete}
              variant="outlined"
              sx={{
                fontWeight: 600,
                border: "1px solid #D0D5DD",
                color: "black",
                ":hover": {
                  border: "1px solid #D0D5DD",
                },
              }}
            >
              Yes, Delete it
            </Button>
            <Button
              onClick={close}
              variant="contained"
              sx={{
                fontWeight: 600,
                bgcolor: "rgba(226, 42, 45, 1)",
                color: "white",
                ":hover": {
                  bgcolor: "rgba(226, 42, 45, 1)",
                },
              }}
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress
                  sx={{
                    color: "white",
                    width: "24px !important",
                    height: "24px !important",
                  }}
                />
              ) : (
                "No, Keep it"
              )}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
export default DeleteModal;
