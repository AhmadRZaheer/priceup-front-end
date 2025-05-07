const { statusTypes } = require("@/utilities/constants");
const { Box, Typography } = require("@mui/material");

const StatusChip = ({ variant, sx }) => {
  // variants Pending , Voided , Approved
  let bgColorWrapper;
  let colorWrapper;
  let bgColorInner;
  switch (variant) {
    case statusTypes.PENDING:
      bgColorWrapper = "#FCDEC0";
      colorWrapper = "#503000";
      bgColorInner = "#1d85ff";
      break;
    case statusTypes.UNPAID:
      bgColorWrapper = "#FCDEC0";
      colorWrapper = "#503000";
      bgColorInner = "#1d85ff";
      break;
    case statusTypes.APPROVED:
      bgColorWrapper = "#daf4e9";
      colorWrapper = "#3ac688";
      bgColorInner = "#3ac688";
      break;
    case statusTypes.PAID:
      bgColorWrapper = "#daf4e9";
      colorWrapper = "#3ac688";
      bgColorInner = "#3ac688";
      break;
    case statusTypes.VOIDED:
      bgColorWrapper = "#f6d8d9";
      colorWrapper = "#d22b2d";
      bgColorInner = "#d22b2d";
      break;
    default:
      bgColorWrapper = "white";
      colorWrapper = "black";
      bgColorInner = "white";
      break;
  }
  return (
    <Box
      sx={{
        height: "21px",
        // width: "fit-content",
        bgcolor: bgColorWrapper,
        borderRadius: "70px",
        color: colorWrapper,
        p: "6px 8px",
        // pl: { lg: 1.8, xs: 1 },
        // pt: 0.8,
        // pr: { lg: 1.8, xs: 1 },
        // pb: 1,
        display: "grid",
        gap: '7px',
        width: "fit-content",
        ...sx,
      }}
    >
      {/* <Box
            sx={{
                width: "6px",
                height: "6px",
                bgcolor: bgColorInner,
                textTransform: 'capitalize',
                borderRadius: "100%",
                mt: 0.2,
            }}
        /> */}
      <Typography
        sx={{
          fontSize: "14px",
          fontWeight: 400,
          lineHeight: "21px",
          //   textOverflow: "ellipsis",
          //   whiteSpace: "nowrap",
          //   overflow: "hidden",
          //   width: { lg: "100%", xs: "33px" },
        }}
      >
        {variant?.charAt(0).toUpperCase() + variant?.slice(1)}
      </Typography>
    </Box>
  );
};

export default StatusChip;
