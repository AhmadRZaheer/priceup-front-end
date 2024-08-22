import { Box, Typography } from "@mui/material";

const AlertMessage = ({ title, alertMessage, varient }) => {
  const isError = varient === "error";
  const isSuccess = varient === "success";
  const isInfo = varient === "info";
  return (
    <Box
      sx={{
        borderLeft: `5px solid ${
          isError
            ? "rgba(226, 42, 45, 1)"
            : isSuccess
            ? "rgba(0, 173, 120, 1)"
            : isInfo
            ? "rgba(0, 96, 239, 1)"
            : "rgba(0, 96, 239, 1)"
        }`,
        width: "435px",
        height: "85px",
        borderRadius: "4px 0px 0px 4px",
        px: "12px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: isError
          ? "rgba(226, 42, 45, 0.08)"
          : isSuccess
          ? "rgba(0, 173, 120,  0.08)"
          : isInfo
          ? "rgba(0, 96, 239,  0.08)"
          : "rgba(0, 96, 239,  0.08)",
      }}
    >
      <Typography
        sx={{
          fontSize: "16px",
          fontWeight: 600,
          lineHeight: "21.86px",
          color: "black",
          pb: "6px",
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontSize: "14px",
          fontWeight: 600,
          lineHeight: "19.12px",
          color: "#212528",
        }}
      >
        {alertMessage}
      </Typography>
    </Box>
  );
};

export default AlertMessage;
