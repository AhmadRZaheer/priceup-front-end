import { Edit } from "@mui/icons-material";
import { backendURL } from "../../utilities/common";
import FinishItem from "./finishItem";
import { Box, IconButton } from "@mui/material";
import React, { useEffect, useLayoutEffect, useState } from "react";
import DeleteIcon from "../../Assets/Delete-Icon.svg";
import {
  useDeleteHardwares,
  useEditFullHardware,
  useEditHardware,
} from "../../utilities/ApiHooks/hardware";
import AddEditHardware from "../Modal/addEditHardware";
import CustomIconButton from "../ui-components/CustomButton";

const HardwareItem = ({ entry, mainIndex, hardwareRefetch, type }) => {
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
    useEditFullHardware();
  const handleOpenEdit = () => {
    setOpen(true);
  };
  useEffect(() => {
    if (hardwareEditSuccess || deleteSuccess) {
      hardwareRefetch();
    }
  }, [hardwareEditSuccess, deleteSuccess]);

  const [UpdateValue, SetUpdateValue] = useState(entry.finishes);
  const [DataFinishes, setIdUpdate] = useState({
    finishesData: null,
    id: null,
  });

  const handleOpenUpdate = (id) => {
    setIdUpdate({ finishesData: UpdateValue, id: id });
    localStorage.setItem("scrollToIndex", id);
  };
  useEffect(() => {
    if (DataFinishes.finishesData !== null && DataFinishes.id !== null) {
      editFinish({ DataFinishes });
    }
  }, [UpdateValue, DataFinishes]);

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
      style={{ borderBottom: "2px solid rgb(232, 232, 232)", width: "100%" }}
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
            style={{ width: 50, height: 50 }}
            src={`${backendURL}/${entry.image}`}
            alt="setting logo"
          />
          {entry.name}
          <CustomIconButton
            handleClick={handleOpenEdit}
            icon={<Edit color="white" sx={{ fontSize: 18, pr: 0.4 }} />}
          />
        </Box>
        <Box>
          <IconButton onClick={() => handleHardwareDelete(entry._id)}>
            <img src={DeleteIcon} alt="delete icon" />
          </IconButton>
          <CustomIconButton
            handleClick={() => handleOpenUpdate(entry._id)}
            buttonText="Update"
          />
        </Box>
      </Box>
      <Box sx={{ p: 2, width: { md: "80%", xs: "90%" } }}>
        {entry?.finishes?.map((finish, index) => (
          <FinishItem
            data={finish}
            key={index}
            index={index}
            refetch={hardwareRefetch}
            hardwareId={entry._id}
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
        categorySlug={type}
      />
    </div>
  );
};
export default HardwareItem;
