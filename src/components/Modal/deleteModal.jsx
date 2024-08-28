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
    display: "flex",
    flexDirection: "column",
    top: "50%",
    left: "50%",
    gap: '19px',
    transform: "translate(-50%, -50%)",
    width: isMobile ? 292 : 533,
    bgcolor: "#FFFFFF",
    border: "1px solid #D0D5DD",
    // boxShadow: 24,
    p: { sm: '24px 16px', xs: 2 },
    borderRadius: "12px",
  };
  return (
    <>
      <Modal open={open} onClose={close}
        sx={{
          backgroundColor: "rgba(5, 0, 35, 0.1)",
          '.MuiModal-backdrop': {
            backgroundColor: "rgba(5, 0, 35, 0.1)",
          }
        }}
      >
        <Box sx={style}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <Typography sx={{
                fontWeight: 700, fontSize: 18, lineHeight: '21.09px',
                fontFamily: '"Roboto",sans-serif !important'
              }}>
                Delete
              </Typography>
              <Typography sx={{
                // color: "#646669", 
                color: "#212528",
                lineHeight: '21.86px',
                fontWeight: 600,
                // mt:'5px',
                fontSize: 16,
                opacity:'70%'
              }}>
                Delete your {text ?? "user"} details.
              </Typography>
            </Box>
            <Box>
              <IconButton onClick={close} sx={{ p: 0 }}>
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
              gap: '10px',
              p: 2,
              background: "#F3F5F6",
              borderRadius: "12px",
            }}
          >
            <Box>
              <img src={DeleteIcon} alt="delete icon" />
            </Box>
            <Typography sx={{
              fontSize: "18px", fontWeight: 700,
              lineHeight: '21.09px',
              fontFamily: '"Roboto",sans-serif !important'
            }}>
              Delete {text ?? "user"}
            </Typography>
            <Typography
              sx={{
                color: "#212528",
                lineHeight: '21.86px',
                fontWeight: 600,
                fontSize: 16,
                opacity:'70%'
              }}
            >
              Are you sure you want to delete {text ?? "user"}?{" "}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: '12px',
              justifyContent: "end",
            }}
          >
            <Button
              onClick={handleDelete}
              variant="outlined"
              sx={{
                fontSize: '16px',
                fontWeight: 600,
                border: "1px solid #D6DAE3",
                color: "#212528",
                ":hover": {
                  border: "1px solid #D6DAE3",
                },
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
                fontSize: '16px',
                fontWeight: 600,
                bgcolor: "#E22A2D",
                color: "#FFFFFF",
                ":hover": {
                  bgcolor: "#E22A2D",
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
