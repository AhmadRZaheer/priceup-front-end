import { Box, Switch, Tooltip, Typography } from "@mui/material";

function CustomToggle({ checked, onChange, name, onBlur, onClick, title }) {
  return (
    <>
      <Tooltip title={title} placement="top" arrow>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Switch
            checked={checked}
            onChange={onChange}
            name={name}
            onBlur={onBlur}
            onClick={onClick}
            sx={{
              "& .MuiSwitch-switchBase": {
                color: "transparent !important",
                backgroundColor: "transparent !important",
                ":hover": {
                  backgroundColor: "transparent ", // Remove or set to the desired color
                },
                ":focus": {
                  backgroundColor: "transparent !important", // Remove or set to the desired color
                },
                ":active": {
                  backgroundColor: "transparent !important", // Remove or set to the desired color
                },
              },
              "& .MuiSwitch-thumb": {
                backgroundColor: "white",
                mt: 0.76,
                ml: 0.6,
              },

              "& .MuiSwitch-track": {
                backgroundColor: "#7F56D9 !important",
                opacity: `${checked ? 1 : 0.2} !important`,
                paddingTop: 1.4,
                pl: 1.6,
                pr: 4,
                borderRadius: "20px !important",
              },
            }}
          />
          <Typography sx={{ mt: 1.4, width: 60 }}>Active</Typography>
        </Box>
      </Tooltip>
    </>
  );
}

export default CustomToggle;
