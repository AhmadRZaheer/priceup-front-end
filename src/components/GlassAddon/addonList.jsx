import { Box, IconButton } from "@mui/material";
import { backendURL } from "../../utilities/common";
import { Delete, Edit } from "@mui/icons-material";
import ListOption from "./listOption";
import {
  useDeleteGlassAddonOption,
  useDeleteGlassAddon,
  useEditGlassAddon,
  useEditFullGlassAddon,
} from "../../utilities/ApiHooks/glassAddon";
import React, { useEffect, useState } from "react";
import AddEditGlassAddon from "../Modal/addEditGlassAddon";
import DeleteIcon from "../../Assets/Delete-Icon.svg";
import CustomIconButton from "../ui-components/CustomButton";
import DefaultImage from "../ui-components/defaultImage";
import DeleteModal from "../Modal/deleteModal";

const AddonList = ({ entry, mainIndex, refetch, type }) => {
  const [open, setOpen] = useState(false);
  const [isEdit, setisEdit] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteRecord,setDeleteRecord] = useState(null);
  const handleOpenDeleteModal = (id) => {
    setDeleteRecord(id);
    setDeleteModalOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  };
  const { mutate: deleteGlassAddon, isSuccess: deleteSuccess, isLoading: loaderForDelete } =
    useDeleteGlassAddon();
  const handleHardwareDelete = () => {
    deleteGlassAddon(deleteRecord);
    setDeleteModalOpen(false);
  };
  const { mutate: editGlassAddon, isSuccess: glassAddonEditSuccess } =
    useEditFullGlassAddon();
  const handleOpenEdit = () => {
    setOpen(true);
    setisEdit(true);
  };
  useEffect(() => {
    if (glassAddonEditSuccess || deleteSuccess) {
      refetch();
    }
  }, [glassAddonEditSuccess, deleteSuccess]);
  const [UpdateValue, SetUpdateValue] = useState(entry.options);

  const handleOpenUpdate = (id) => {
    editGlassAddon({ optionsData: UpdateValue, id: id });
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
    <>
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
            <DefaultImage image={entry.image} type={2} name={entry.name} />
            {entry.name}
            <CustomIconButton
              handleClick={() => handleOpenEdit(entry)}
              icon={<Edit sx={{ fontSize: 18, mr: 0.4 }} />}
            />
          </Box>
          <Box>
            <IconButton onClick={() => handleOpenDeleteModal(entry._id)}>
              <img src={DeleteIcon} alt="delete icon" />
            </IconButton>
            <CustomIconButton
              handleClick={() => handleOpenUpdate(entry._id)}
              buttonText="Update"
            />
          </Box>
        </Box>
        <Box sx={{ p: 2 }}>
          {entry?.options?.map((finish, index) => (
            <ListOption
              data={finish}
              key={index}
              index={index}
              refetch={refetch}
              glassAddonId={entry._id}
              SetUpdateValue={SetUpdateValue}
              UpdateValue={UpdateValue}
            />
          ))}
        </Box>
      </div>
      <DeleteModal
        open={deleteModalOpen}
        close={()=>{setDeleteModalOpen(false)}}
        isLoading={loaderForDelete}
        handleDelete={handleHardwareDelete}
      />
      <AddEditGlassAddon
        open={open}
        close={handleClose}
        data={entry}
        isEdit={isEdit}
        refetch={refetch}
        categorySlug={type}
      />
    </>
  );
};

export default AddonList;
