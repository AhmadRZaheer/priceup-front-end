import { Box, Button, Modal, Typography } from "@mui/material";

function DeleteModal({ open, close, handleDelete }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
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
          <Typography>Are you sure you want to perform this action?</Typography>
          <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
            <Button
              onClick={close}
              variant="outlined"
              sx={{
                border: "1px solid #D0D5DD",
                width: "100%",
                color: "#344054",
                ":hover": {
                  border: "1px solid #D0D5DD",
                },
              }}
            >
              Close
            </Button>
            <Button
              onClick={handleDelete}
              variant="contained"
              sx={{
                bgcolor: "#8477DA",
                width: "100%",
                color: "white",
                ":hover": {
                  bgcolor: "#8477DA",
                },
              }}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
export default DeleteModal;
