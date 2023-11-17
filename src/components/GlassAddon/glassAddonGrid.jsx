import React, { useEffect, useState } from "react";
import { Box, CircularProgress, IconButton } from "@mui/material";
import { Add } from "@mui/icons-material";
import Snackbars from "../Modal/snackBar";
import {
  useDeleteGlassAddon,
  useFetchGlassAddons,
} from "../../utilities/ApiHooks/glassAddon";
import AddEditGlassAddon from "../Modal/addEditGlassAddon";
import AddonList from "./addonList";
import CustomIconButton from "../ui-components/CustomButton";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../../redux/snackBarSlice";

const GlassAddonGrid = ({ type }) => {
  const dispatch = useDispatch();

  const showSnackbarHandler = (message, severity) => {
    dispatch(showSnackbar({ message, severity }));
  };

  const {
    data: glassAddons,
    refetch: glassAddonRefetch,
    isFetching: glassAddonFetching,
  } = useFetchGlassAddons(type);
  const { mutate: deleteGlassAddon, isSuccess: deleteSuccess } =
    useDeleteGlassAddon();
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState(null);
  const [isEdit, setIsEdit] = React.useState(false);

  const handleOpen = (data) => {
    setOpen(true);
    setIsEdit(false);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenEdit = (data, isEditAble) => {
    setOpen(true);
    setEdit(data);
    setIsEdit(true);
  };
  const handleHardwareDelete = (id) => {
    deleteGlassAddon(id);
  };

  useEffect(() => {
    if (deleteSuccess) {
      glassAddonRefetch();
      showSnackbarHandler("Deleted Successfully ", "error");
    }
  }, [deleteSuccess]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center",
          paddingTop: 15,
          paddingBottom: 15,
          paddingLeft: "10px",
          paddingRight: "10px",
        }}
      >
        {" "}
        <div
          style={{
            width: "250px",
            padding: 4,
            alignItems: "center",
            textTransform: "uppercase",
          }}
        >
          <p style={{ fontWeight: "bold", paddingTop: 10, paddingBottom: 10 }}>
            {type}
          </p>
        </div>
        <div
          style={{
            padding: 4,
          }}
        >
          <CustomIconButton
            handleClick={handleOpen}
            icon={<Add style={{ color: "white" }} />}
            buttonText="Add"
          />
        </div>{" "}
      </div>
      <div
        style={{
          display: "flex",
          gap: 4,
          alignContent: "center",
          backgroundColor: "rgb(232, 232, 232)",
          paddingTop: 15,
          paddingBottom: 15,
          paddingLeft: "10px",
          paddingRight: "10px",
        }}
      >
        {" "}
        <div
          style={{
            width: "250px",
            padding: 4,
            alignItems: "center",
          }}
        >
          Name
        </div>{" "}
        <div
          style={{
            width: "250px",

            padding: 4,
          }}
        >
          Part Number{" "}
        </div>{" "}
        <div
          style={{
            width: "250px",

            padding: 4,
          }}
        >
          Cost
        </div>
        <div
          style={{
            width: "250px",

            padding: 4,
          }}
        >
          Status
        </div>{" "}
      </div>
      {glassAddonFetching ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: "20px",
            alignItems: "center",

            height: "56vh",
          }}
        >
          <CircularProgress size={24} sx={{ color: "#8477DA" }} />
        </Box>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            marginTop: 4,
            height: "75vh",
            overflowY: "scroll",
          }}
        >
          {glassAddons?.map((entry, mainIndex) => (
            <AddonList
              entry={entry}
              mainIndex={mainIndex}
              refetch={glassAddonRefetch}
              showSnackbar={showSnackbarHandler}
              type={type}
            />
          ))}
        </div>
      )}

      <AddEditGlassAddon
        open={open}
        close={handleClose}
        data={edit}
        isEdit={isEdit}
        refetch={glassAddonRefetch}
        showSnackbar={showSnackbarHandler}
        categorySlug={type}
      />
    </>
  );
};

export default GlassAddonGrid;
