import {
  Box,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import "../style.scss";

const ModificationItem = ({ data }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <Typography className="modificationTitle">{data.name}</Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <FormControl fullWidth className="custom-textfield">
          <Select
            value="Active"
            size="small"
            labelId="demo-select-small-label"
            id="demo-select-small"
            sx={{ height: "40px", background: "#F6F5FF" }}
            // onChange={handleChangeLayout}
          >
            <MenuItem value={true}>Active</MenuItem>
            <MenuItem value={false}>inActive</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth className="custom-textfield">
          <TextField
            type="number"
            size="small"
            id="outlined-basic"
            placeholder="Count"
            variant="outlined"
            sx={{
              background: "#F6F5FF",
              ".MuiOutlinedInput-root": {
                height: "44px",
              },
            }}
          />
        </FormControl>
      </Box>
    </Box>
  );
};

export default ModificationItem;
