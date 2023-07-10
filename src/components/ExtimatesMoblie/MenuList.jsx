import * as React from "react";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { ChevronRight } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

const MenuList = ({ menuOptions, title }) => {
  const [anchorEl, setAnchorEl] = React.useState(false);

  const handleClose = () => {
    setAnchorEl(!anchorEl);
  };

  return (
    <div>
      <Button
        onClick={handleClose}
        id="basic-button"
        sx={{ color: { md: "#000000 !important ", xs: "white" } }}
      >
        {anchorEl ? (
          <ChevronRight
            sx={{
              display: "flex",
              alignItems: "center",
              transform: "rotate(90deg)",
              color: "#98A2B3 !important",
            }}
          />
        ) : (
          <ChevronRight sx={{ color: "#98A2B3" }} />
        )}
        {title}
      </Button>
      {anchorEl ? (
        <Box
          sx={{
            height: "150px",
            overflowY: "scroll",
            color: { md: "#000000", xs: "white" },
          }}
        >
          {menuOptions.map((item) => (
            <MenuItem key={item.id} onClick={handleClose}>
              <Box
                sx={{
                  width: "200px",
                  borderRadius: "12px",
                  boxShadow:
                    "0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)",
                  border: "1px solid #EAECF0",
                  p: 2,
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                  width: { md: "100%", xs: "95%" },
                }}
              >
                <img
                  width={"25px"}
                  height={"25px"}
                  src={item.image}
                  alt="Selected"
                />
                <Box sx={{ color: { md: "#000000 ", xs: "white" } }}>
                  <Typography>{item.name}</Typography>
                  <Typography>{item.price}</Typography>
                </Box>
              </Box>
            </MenuItem>
          ))}
        </Box>
      ) : (
        ""
      )}
    </div>
  );
};

export default MenuList;
