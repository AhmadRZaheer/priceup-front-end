import { Box, Typography } from "@mui/material";

const AlertMessage = ({ title, alertMessage, varient }) => {
  const isError = varient === "error";
  const isSuccess = varient === "success";
  const isInfo = varient === "info";
  const isWarning = varient === "warning";
  const borderColor =  isError
  ? "rgba(226, 42, 45, 1)"
  : isSuccess
  ? "rgba(0, 173, 120, 1)"
  : isInfo
  ? "rgba(0, 96, 239, 1)"
  : isWarning
  ? "rgba(240, 173, 78,1)"
  : "rgba(0, 96, 239, 1)";
  const backgroundColor = isError
  ? "rgba(226, 42, 45, 0.08)"
  : isSuccess
  ? "rgba(0, 173, 120,  0.08)"
  : isInfo
  ? "rgba(0, 96, 239,  0.08)"
  : isWarning
  ? "#FCDEC0"
  : "rgba(0, 96, 239,  0.08)";
  return (
    <Box
      sx={{
        borderLeft: `5px solid ${borderColor}`,
        width: "435px",
        height: "85px",
        borderRadius: "4px 0px 0px 4px",
        px: "12px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: backgroundColor,
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
