import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

const ActionButtons = ({ count, handleCountSet }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        gap: 2,
        color: { md: "#000000  ", xs: "white" },
        alignSelf: "flex-end",
      }}
    >
      <AddCircleOutline
        onClick={(event) => handleCountSet(count + 1, event)}
        sx={{ color: "#98A2B3" }}
      />
      <Typography>{count}</Typography>
      <RemoveCircleOutline
        onClick={(event) => handleCountSet(count - 1, event)}
        sx={{ color: "#98A2B3" }}
      />
    </Box>
  );
};

export default ActionButtons;
