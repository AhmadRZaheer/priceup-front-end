import { AddCircle, ChevronRight, RemoveCircle } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import MountingItem from "./mountingItem";
import { useState } from "react";

const MountingList = ({ type, mounting, handleSetMounting, list }) => {
  const [anchorEl, setAnchorEl] = useState(false);
  const handleOpenClose = () => {
    setAnchorEl(!anchorEl);
  };
  return (
    <>
      <Button
        onClick={handleOpenClose}
        id="basic-button"
        sx={{
          color: {
            sm: anchorEl ? "#8477DA" : "#000000 !important ",
            xs: "white",
          },
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          gap: 2,
          //   border
        }}
      >
        {" "}
        {anchorEl ? (
          <ChevronRight
            sx={{
              display: "flex",
              alignItems: "center",
              transform: "rotate(90deg)",
              color: anchorEl ? "#8477DA" : "#98A2B3 !important",
              mr: 2,
            }}
          />
        ) : (
          <ChevronRight sx={{ color: "#98A2B3", mr: 2 }} />
        )}
        <Typography sx={{ textTransform: "capitalize" }}>{type}</Typography>
      </Button>
      {anchorEl ? (
        <Box
          sx={{
            width: "100%",
            p: "6px",
            borderRadius: "8px",
            border: "1px solid #D4DBDF",
            background: "#F3F5F6",
          }}
        >
          {list?.[type]?.map((item, index) => (
            <MountingItem
              key={index}
              item={item}
              type={type}
              handleSetMounting={handleSetMounting}
              selectedItem={mounting?.[type]}
            />
          ))}
        </Box>
      ) : anchorEl && list?.[type]?.length ? (
        <Typography> No item found.</Typography>
      ) : (
        ""
      )}
    </>
  );
};

export default MountingList;
