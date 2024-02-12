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
              width: "fit-content",
              bgcolor:
                selectedStatus === "pending"
                  ? "#daf4e9"
                  : selectedStatus === "approved"
                  ? "#dfeeff"
                  : "#f6d8d9",
              borderRadius: "16px",
              color:
                selectedStatus === "pending"
                  ? "#3ac688"
                  : selectedStatus === "approved"
                  ? "#1d85ff"
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
            <Box
              sx={{
                width: "6px",
                height: "6px",
                bgcolor:
                  selectedStatus === "pending"
                    ? "#3ac688"
                    : selectedStatus === "approved"
                    ? "#1d85ff"
                    : "#d22b2d",
                borderRadius: "100%",
                mt: 0.2,
              }}
            />
            {selectedStatus}
          </Box>
          <ArrowDropDown
            sx={{
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              color:
                selectedStatus === "pending"
                  ? "#3ac688"
                  : selectedStatus === "approved"
                  ? "#1d85ff"
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
                    ? "#daf4e9"
                    : statusItem.value === "approved"
                    ? "#dfeeff"
                    : "#f6d8d9",
                borderRadius: "16px",
                color:
                  statusItem.value === "pending"
                    ? "#3ac688"
                    : statusItem.value === "approved"
                    ? "#1d85ff"
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
              <Box
                sx={{
                  width: "6px",
                  height: "6px",
                  bgcolor:
                    statusItem.value === "pending"
                      ? "#3ac688"
                      : statusItem.value === "approved"
                      ? "#1d85ff"
                      : "#d22b2d",
                  borderRadius: "100%",
                  mt: 0.2,
                }}
              />
              {statusItem.label}
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default SelectMenu_Status;
