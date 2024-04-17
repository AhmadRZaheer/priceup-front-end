import { Box, IconButton } from "@mui/material";
import { backendURL } from "../../utilities/common";
import { Delete, Edit } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import {
  useDeleteGlassTypeFull,
  useEditFullGlassType,
  useEditGlassType,
} from "../../utilities/ApiHooks/glassType";
import AddEditGlassType from "../Modal/addEidtGlassType";
import GlassTypeItem from "./glassTypeItems";
import DeleteIcon from "../../Assets/Delete-Icon.svg";
import CustomIconButton from "../ui-components/CustomButton";
import DefaultImage from "../ui-components/defaultImage";
import DeleteModal from "../Modal/deleteModal";

const GlassTypeDataItem = ({ entry, mainIndex, GlassTypeRefetch, type }) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteRecord,setDeleteRecord] = useState(null);
  const handleOpenDeleteModal = (id) => {
    setDeleteRecord(id);
    setDeleteModalOpen(true);
  }
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const { mutate: deleteGlassType, isSuccess: deleteSuccess, isLoading: loaderForDelete } =
    useDeleteGlassTypeFull();
  const handleHardwareDelete = () => {
    deleteGlassType(deleteRecord);
    setDeleteModalOpen(false);
  };
  const { mutate: editGlassType, isSuccess: GlassTypeEditSuccess } =
    useEditFullGlassType();
  const handleOpenEdit = () => {
    setOpen(true);
  };
  useEffect(() => {
    if (GlassTypeEditSuccess || deleteSuccess) {
      GlassTypeRefetch();
      console.log("2");
    }
  }, [GlassTypeEditSuccess, deleteSuccess]);
  const [UpdateValue, SetUpdateValue] = useState(entry.options);

  const handleOpenUpdate = (id) => {
    editGlassType({ optionsData: UpdateValue, id: id });
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
              icon={<Edit sx={{ fontSize: 18, mr: 0.4 }} />}
              handleClick={() => handleOpenEdit(entry)}
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
            <GlassTypeItem
              data={finish}
              key={index}
              index={index}
              refetch={GlassTypeRefetch}
              glassTypeId={entry._id}
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
      <AddEditGlassType
        open={open}
        close={handleClose}
        data={entry}
        isEdit={true}
        refetch={GlassTypeRefetch}
        categorySlug={type}
      />
    </>
  );
};

export default GlassTypeDataItem;
