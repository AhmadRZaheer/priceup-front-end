import { HardWareColumns } from "@/utilities/DataGridColumns";
import { Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  Menu,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import "./style.scss";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const data = [
  { id: 1, finishType: "Polished Nickel", cost: 1, status: "active" },
  { id: 2, finishType: "Matte Black", cost: 1, status: "inactive" },
  { id: 3, finishType: "Satin Brass", cost: 1, status: "active" },
  { id: 4, finishType: "Polished Nickel", cost: 1, status: "active" },
  { id: 5, finishType: "Matte Black", cost: 1, status: "active" },
  { id: 6, finishType: "Satin Brass", cost: 1, status: "active" },
  { id: 7, finishType: "Brushed Bronze", cost: 1, status: "active" },
];

const ShowersHardWare = () => {
  const [value, setValue] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ display: "flex", gap: "12px" }}>
        <Typography
          sx={{
            fontSize: { lg: 24, md: 20 },
            fontWeight: 600,
            color: "#5D6164",
            display: "flex",
            gap: 1.5,
          }}
        >
          Showers
          <Box
            sx={{
              fontSize: { lg: 24, md: 20 },
              fontWeight: 600,
              color: "#000000",
            }}
          >
            / Hardware
          </Box>
        </Typography>

        <FormControl sx={{ width: "152px" }} size="small">
          <Select
            value={value}
            labelId="demo-select-small-label"
            id="demo-select-small"
            // label="Status"
            className="custom-textfield"
            size="small"
            sx={{ height: "40px" }}
            onChange={(e) => setValue(e.target.value)}
          >
            <MenuItem value="Handles">Handles</MenuItem>
            <MenuItem value={"voided"}>Voided</MenuItem>
            <MenuItem value={"approved"}>Approved</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          pt: 3,
          pb: 1.5,
        }}
      >
        <Typography className="handleTitle">Handles</Typography>
        <Button
          variant="contained"
          sx={{
            background: "#8477DA",
            color: "#FFFFFF",
            fontWeight: 600,
            fontSize: 16,
          }}
        >
          Add New
        </Button>
      </Box>

      <Box
        sx={{
          border: "1px solid #D0D5DD",
          borderRadius: "12px",
          background: "#FFFFFF",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            py: "15px",
            px: 4,
          }}
        >
          <Typography className="tableHeader">8x8 Colonial Pull</Typography>
          <Box>
            <Button
              id="demo-customized-button"
              aria-controls={open ? "demo-customized-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              variant="outlined"
              disableElevation
              onClick={handleClick}
              // sx={{}}
              className="actionBtn"
              endIcon={<KeyboardArrowDownIcon />}
            >
              Actions
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              elevation={0}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}><Typography className='dropTxt'>Update</Typography></MenuItem>
              <MenuItem onClick={handleClose}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Typography className='dropTxt'>Edit</Typography>
                  <Edit sx={{ color: "#8477DA" }} />
                </Box>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Typography className='dropTxt'>Delete</Typography>
                  <Delete sx={{ color: "red" }} />
                </Box>
              </MenuItem>
            </Menu>
          </Box>
          {/* <Box>
            <FormControl sx={{ width: "77px", height: "26px" }} size="small">
              <Select
                value="Action"
                onChange={(e) => e.preventDefault()} // Prevents changing the value
                labelId="demo-select-small-label"
                id="demo-select-small"
                className="custom-textfield"
                size="small"
                MenuProps={{
                  PaperProps: {
                    style: {
                      width: "204px",
                    },
                  },
                }}
                sx={{ height: "40px" }}
              >
                <MenuItem value="Action" disabled>
                  Action
                </MenuItem>
                <MenuItem value="Update">Update</MenuItem>
                <MenuItem value="Edit">
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <Typography>Edit</Typography>
                    <Edit sx={{ color: "#8477DA" }} />
                  </Box>
                </MenuItem>
                <MenuItem value="Delete">
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <Typography>Delete</Typography>
                    <Delete sx={{ color: "red" }} />
                  </Box>
                </MenuItem>
              </Select>
            </FormControl>
          </Box> */}
        </Box>

        <DataGrid
          loading={false}
          style={{
            border: "none",
          }}
          // getRowId={(row) => row._id}
          rows={data}
          columns={HardWareColumns()}
          rowHeight={70.75}
          sx={{ width: "100%" }}
          hideFooter
          disableColumnMenu
        />
      </Box>
    </>
  );
};

export default ShowersHardWare;
