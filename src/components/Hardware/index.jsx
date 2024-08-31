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
import React, { useEffect, useState } from "react";
import "./style.scss";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CheckIcon from "@mui/icons-material/Check";
import { backendURL } from "@/utilities/common";
import { useFetchAllDocuments } from "@/utilities/ApiHooks/common";
import ShowerHardwareModel from "../Modal/ShowerHardwareModel";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const data = [
  { id: 1, finishType: "Polished Nickel", cost: 1, status: "active" },
  { id: 2, finishType: "Matte Black", cost: 1, status: "inactive" },
  { id: 3, finishType: "Satin Brass", cost: 1, status: "active" },
  { id: 4, finishType: "Polished Nickel", cost: 1, status: "active" },
  { id: 5, finishType: "Matte Black", cost: 1, status: "active" },
  { id: 6, finishType: "Satin Brass", cost: 1, status: "active" },
  { id: 7, finishType: "Brushed Bronze", cost: 1, status: "active" },
];
const routePrefix = `${backendURL}/layouts`;
const ShowersHardWare = () => {
  const [recordToModify, setRecordToModify] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openModifyModal, setOpenModifyModal] = useState(false);
  const [selectedlayoutId, setSelectedLayoutId] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);

  const handleChangeLayout = (event) => {
    setSelectedLayoutId(event.target.value);
  };

  const {
    data: allLayouts,
    refetch: refetchAllLayouts,
  } = useFetchAllDocuments(routePrefix);

  useEffect(() => {
    refetchAllLayouts();
    // if (selectedlayoutId) {
    //   refetchSingleLayout();
    // }
  }, [selectedlayoutId]);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleEdit = () => {
    setOpenModifyModal(true)
    setRecordToModify(true);
  }
  const handleAdd = () => {
    setOpenModifyModal(false)
    setOpenAddModal(true)
  }
  return (
    <>
      <Box sx={{ display: "flex", gap: "12px", pt: '30px' }}>
        <Typography
          className='headingTxt'
          sx={{
            color: "#5D6164",
            display: 'flex'
          }}
        >
          Showers &nbsp;
          <Box
            className='headingTxt'
            sx={{
              color: "#000000",
            }}
          >
            / Hardware
          </Box>
        </Typography>

        {/* <FormControl sx={{ width: "152px" }} size="small">
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
        </FormControl> */}


        <FormControl
          sx={{ width: "212px" }}
          size="small"
          className="custom-textfield"
        >
          <Select
            value={selectedlayoutId}
            size="small"
            labelId="demo-select-small-label"
            id="demo-select-small"
            sx={{ height: "40px", background: "#F6F5FF", }}
            onChange={handleChangeLayout}
            renderValue={(value) => {
              const selectedItem = allLayouts?.find(item => item._id === value);
              return <Typography sx={{ fontSize: "14px", textOverflow: 'ellipsis', overflow: 'hidden', textWrap: 'nowrap' }}>{selectedItem?.name}</Typography>;
            }}
          >
            {allLayouts?.map((data, index) => (
              <MenuItem key={index} value={data?._id} sx={{
                p: '10px 12px', ':hover': {
                  background: '#EFF2F6'
                }
              }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    gap: '10px'
                  }}
                >
                  <Typography sx={{ fontSize: "14px" }}>
                    {data?.name}
                  </Typography>
                  {data?._id === selectedlayoutId ? (
                    <CheckIcon sx={{ color: "#8477DA" }} />
                  ) : null}
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>

      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          pt: 1.5,
          pb: 1.5,
        }}
      >
        <Typography className="handleTitle">Handles</Typography>
        <Button
          variant="contained"
          onClick={handleAdd}
          sx={{
            background: "#8477DA",
            color: "#FFFFFF",
            fontWeight: 600,
            fontSize: 16,
            letterSpacing: '0px',
            ':hover': {
              background: "#8477DA",
            }
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
              className="actionBtn"
            >
              Actions
              <KeyboardArrowDownIcon sx={{ width: '16px', height: '16px' }} />
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
              slotProps={{
                paper: {
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "none",
                    boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
                    border: "1px solid #D0D5DD",
                    p: 0,
                    width: "171px",
                    "& .MuiList-padding": {
                      p: 0,
                    },
                  },
                },
              }}
            >
              <MenuItem onClick={handleClose} sx={{
                p: '12px', ':hover': {
                  background: '#EDEBFA'
                }
              }}><Typography className='dropTxt'>Update</Typography></MenuItem>
              <MenuItem onClick={handleEdit} sx={{
                p: '12px', ':hover': {
                  background: '#EDEBFA'
                }
              }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Typography className='dropTxt'>Edit</Typography>
                  <EditOutlinedIcon sx={{ color: "#5D6164", height: '20px', width: '20px' }} />
                </Box>
              </MenuItem>
              <MenuItem onClick={handleClose} sx={{
                p: '12px', ':hover': {
                  background: '#EDEBFA'
                }
              }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Typography className='dropTxt'>Delete</Typography>
                  <DeleteOutlineOutlinedIcon sx={{ color: "#E22A2D", height: '20px', width: '20px' }} />
                </Box>
              </MenuItem>
            </Menu>

          </Box>
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


        <ShowerHardwareModel open={openAddModal}
          close={() => setOpenAddModal(false)}
          recordToModify={recordToModify} />

        <ShowerHardwareModel open={openModifyModal}
          close={() => setOpenModifyModal(false)}
          recordToModify={true} />

      </Box>
    </>
  );
};

export default ShowersHardWare;
