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

function DeleteModal({ open, close, handleDelete, isLoading, text }) {
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
    borderRadius: 2,
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
                Edit your {text ?? "user"} details.
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
              borderRadius: "8px",
              mt: 3,
            }}
          >
            <Box>
              <img src={DeleteIcon} alt="delete icon" />
            </Box>
            <Typography sx={{ fontSize: "18px", fontWeight: 700 }}>
              Delete {text ?? "user"}
            </Typography>
            <Typography
              sx={{ fontSize: "16px", fontWeight: 600, color: "#587d9f" }}
            >
              Are you sure you want to delete {text ?? "user"}?{" "}
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
                border: "1px solid #D0D5DD",
                color: "#344054",
                ":hover": {
                  border: "1px solid #D0D5DD",
                },
                width: "164px"
              }}
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress
                  sx={{
                    color: "#344054",
                    width: "24px !important",
                    height: "24px !important",
                  }}
                />
              ) : (
                "Yes, Delete it"
              )}
            </Button>
            <Button
              onClick={close}
              variant="contained"
              sx={{
                bgcolor: "rgba(226, 42, 45, 1)",
                color: "white",
                ":hover": {
                  bgcolor: "rgba(226, 42, 45, 1)",
                },
              }}
              disabled={isLoading}
            >
              No, Keep it
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
export default DeleteModal;
