import React, { useEffect, useRef, useState } from "react";
import { Box, CircularProgress, Menu, MenuItem } from "@mui/material";
import { ArrowDropDown, ArrowDropUp, ArrowUpward } from "@mui/icons-material";
import { useEditEstimates } from "../../utilities/ApiHooks/estimate";
import { useDispatch } from "react-redux";
import { setDataRefetch } from "../../redux/staff";

const statuses = [
  { value: "pending", label: "Pending" },
  { value: "voided", label: "Voided" },
  { value: "approved", label: "Approved" },
];

function SelectMenu_Status({ status, quoteId }) {
  const { mutate: mutateEdit, isLoading, isSuccess } = useEditEstimates();
  const [selectedStatus, setSelectedStatus] = useState(status);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const dispatch = useDispatch();

  const handleChange = async (event, value) => {
    setSelectedStatus(value);
    setOpen(false);
    await mutateEdit({
      status: value,
      id: quoteId,
    });
  };
  useEffect(() => {
    dispatch(setDataRefetch());
  }, [isSuccess]);
  const handleOpenClose = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <>
      {isLoading ? (
        <CircularProgress size={20} />
      ) : (
        <Box
          sx={{ display: "flex", cursor: "pointer" }}
          onClick={handleOpenClose}
        >
          <Box
            ref={anchorRef}
            sx={{
              width: "60px",
              height:'33px',
              bgcolor:
                selectedStatus === "pending"
                  ? "#FCDEC0"
                  : selectedStatus === "approved"
                  ? "#daf4e9"
                  : "#f6d8d9",
              borderRadius: "70px",
              color:
                selectedStatus === "pending"
                  ? "#503000"
                  : selectedStatus === "approved"
                  ? "#3ac688"
                  : "#d22b2d",
                  p:'6px 8px',
              // pl: 1.8,
              // pt: 0.3,
              // pr: 1.8,
              // pb: 0.5,
              display: "grid",
              gap: 1,
              alignItems: "center",
              textAlign:'center'
            }}
          >
            {/* <Box
              sx={{
                width: "6px",
                height: "6px",
                bgcolor:
                  selectedStatus === "pending"
                    ? "#1d85ff"
                    : selectedStatus === "approved"
                    ? "#3ac688"
                    : "#d22b2d",
                borderRadius: "100%",
                mt: 0.2,
              }}
            /> */}
           <p style={{fontSize:'14px',fontWeight:400,lineHeight:'21px'}}>{selectedStatus?.charAt(0).toUpperCase() + selectedStatus?.slice(1)}</p> 
          </Box>
          <ArrowDropDown
            sx={{
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              alignSelf:'center',
              color:
                selectedStatus === "pending"
                  ? "#FCDEC0"
                  : selectedStatus === "approved"
                  ? "#3ac688"
                  : "#d22b2d",
            }}
          />
        </Box>
      )}
      <Menu
        open={open}
        onClose={handleOpenClose}
        anchorEl={anchorRef.current}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        getContentAnchorEl={null}
        MenuListProps={{
          "aria-labelledby": "select-menu",
        }}
      >
        {statuses.map((statusItem) => (
          <MenuItem
            key={statusItem.value}
            onClick={(event) => handleChange(event, statusItem.value)}
            value={statusItem.value}
          >
            <Box
              sx={{
                width: "fit-content",
                bgcolor:
                  statusItem.value === "pending"
                    ? "#FCDEC0"
                    : statusItem.value === "approved"
                    ? "#daf4e9"
                    : "#f6d8d9",
                borderRadius: "16px",
                color:
                  statusItem.value === "pending"
                    ? "#503000"
                    : statusItem.value === "approved"
                    ? "#3ac688"
                    : "#d22b2d",
                pl: 1.8,
                pt: 0.3,
                pr: 1.8,
                pb: 0.5,
                display: "flex",
                gap: 1,
                alignItems: "center",
              }}
            >
              {/* <Box
                sx={{
                  width: "6px",
                  height: "6px",
                  bgcolor:
                    statusItem.value === "pending"
                      ? "#1d85ff"
                      : statusItem.value === "approved"
                      ? "#3ac688"
                      : "#d22b2d",
                  borderRadius: "100%",
                  mt: 0.2,
                }}
              /> */}
              {statusItem.label}
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default SelectMenu_Status;
