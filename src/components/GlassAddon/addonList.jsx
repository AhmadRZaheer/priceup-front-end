import { Box, IconButton } from "@mui/material";
import { backendURL } from "../../utilities/common";
import { Delete, Edit } from "@mui/icons-material";
import ListOption from "./listOption";
import {
  useDeleteGlassAddonOption,
  useDeleteGlassAddon,
  useEditGlassAddon,
} from "../../utilities/ApiHooks/glassAddon";
import React, { useEffect, useState } from "react";
import AddEditGlassAddon from "../Modal/addEditGlassAddon";

const AddonList = ({
  entry,
  mainIndex,
  refetch,
  showSnackbar,
  type,
}) => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const { mutate: deleteGlassAddon, isSuccess: deleteSuccess } =
  useDeleteGlassAddon();
  const handleHardwareDelete = (id) => {
    deleteGlassAddon(id);
  };
  const { mutate: editGlassAddon, isSuccess: glassAddonEditSuccess } =
    useEditGlassAddon();
  const handleOpenEdit = () => {
    setOpen(true);
  };
  useEffect(() => {
    if (glassAddonEditSuccess || deleteSuccess) {
      if (deleteSuccess) {
        showSnackbar("Deleted Successfully", "error");
      }
      if (glassAddonEditSuccess) {
        showSnackbar("Updated Successfully", "success");
      }
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
            <img
              className="cellImg"
              src={`${backendURL}/${entry.image}`}
              alt=""
            />
            {entry.name}
            <IconButton
              onClick={() => handleOpenEdit(entry)}
              sx={{
                backgroundColor: "#8477DA",
                "&:hover": { backgroundColor: "#8477DA" },
                color: "white",
                textTransform: "capitalize",
                borderRadius: 2,
                fontSize: 17,
                padding: 1,
              }}
            >
              <Edit sx={{ fontSize: 18, mr: 0.4 }} />
              Edit
            </IconButton>
          </Box>
          <Box>
            <IconButton>
              <Delete onClick={() => handleHardwareDelete(entry._id)} />
            </IconButton>
            <IconButton
            id={entry._id}
              onClick={() => handleOpenUpdate(entry._id)}
              sx={{
                backgroundColor: "#8477DA",
                "&:hover": { backgroundColor: "#8477DA" },
                color: "white",
                textTransform: "capitalize",
                borderRadius: 2,
                fontSize: 17,
                padding: 1,
              }}
            >
              Update
            </IconButton>
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
              showSnackbar={showSnackbar}
              SetUpdateValue={SetUpdateValue}
              UpdateValue={UpdateValue}
            />
          ))}
        </Box>
      </div>
      <AddEditGlassAddon
        open={open}
        close={handleClose}
        data={entry}
        isEdit={true}
        refetch={refetch}
        showSnackbar={showSnackbar}
        categorySlug={type}
      />
    </>
  );
};

export default AddonList;