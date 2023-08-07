import { Delete, Edit } from "@mui/icons-material";
import { backendURL } from "../../utilities/common";
import FinishItem from "./finishItem";
import { Box, IconButton } from "@mui/material";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  useDeleteHardwares,
  useEditHardware,
} from "../../utilities/ApiHooks/hardware";
import AddEditHardware from "../Model/addEditHardware";

const HardwareItem = ({
  entry,
  mainIndex,
  hardwareRefetch,
  showSnackbar,
  type,
}) => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const { mutate: deleteHardware, isSuccess: deleteSuccess } =
    useDeleteHardwares();
  const handleHardwareDelete = (id) => {
    deleteHardware(id);
  };
  const { mutate: editFinish, isSuccess: hardwareEditSuccess } =
    useEditHardware();
  const handleOpenEdit = () => {
    setOpen(true);
  };
  useEffect(() => {
    if (hardwareEditSuccess || deleteSuccess) {
      if (deleteSuccess) {
        showSnackbar("Deleted Successfully", "error");
      }
      if (hardwareEditSuccess) {
        showSnackbar("Updated Successfully", "success");
      }
      hardwareRefetch();
    }
  }, [hardwareEditSuccess, deleteSuccess]);

  const [UpdateValue, SetUpdateValue] = useState(entry.finishes);

  const handleOpenUpdate = (id) => {
    editFinish({ finishesData: UpdateValue, id: id });
    localStorage.setItem("scrollToIndex", id);
  };

  useEffect(() => {
    const scrollToIndex = localStorage.getItem("scrollToIndex");
    if (scrollToIndex) {
      const updateButton = document.getElementById(scrollToIndex);
      if (updateButton) {
        updateButton.scrollIntoView({ behavior: "smooth" });
        localStorage.removeItem("scrollToIndex");
      }
    }
  }, []);

  
  return (
    <div
      style={{ borderBottom: "2px solid rgb(232, 232, 232)" }}
      key={mainIndex}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center",
          p: 2,
        }}
      >
        {" "}
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <img
            className="cellImg"
            src={`${backendURL}/${entry.image}`}
            alt=""
          />
          {entry.name}
          <IconButton
            onClick={handleOpenEdit}
            sx={{
              backgroundColor: "#8477DA",
              "&:hover": { backgroundColor: "#8477DA" },
              color: "white",
              textTransform: "capitalize",
              borderRadius: 2,
              fontSize: 17,
            }}
          >
            <Edit color="white" sx={{ fontSize: 18, pr: 0.4 }} />
            Edit
          </IconButton>
        </Box>
        <Box>
          <IconButton>
            <Delete onClick={() => handleHardwareDelete(entry._id)} />
          </IconButton>
          <IconButton
            key={entry._id}
            id={entry._id}
            onClick={() => handleOpenUpdate(entry._id)}
            sx={{
              backgroundColor: "#8477DA",
              "&:hover": { backgroundColor: "#8477DA" },
              color: "white",
              textTransform: "capitalize",
              borderRadius: 2,
              fontSize: 17,
            }}
          >
            Update
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ p: 2 }}>
        {entry?.finishes?.map((finish, index) => (
          <FinishItem
            data={finish}
            key={index}
            index={index}
            refetch={hardwareRefetch}
            hardwareId={entry._id}
            showSnackbar={showSnackbar}
            SetUpdateValue={SetUpdateValue}
            UpdateValue={UpdateValue}
          />
        ))}
      </Box>
      <AddEditHardware
        open={open}
        close={handleClose}
        data={entry}
        isEdit={true}
        refetch={hardwareRefetch}
        showSnackbar={showSnackbar}
        categorySlug={type}
      />
    </div>
  );
};
export default HardwareItem;
