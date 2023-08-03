import React, { useEffect, useState } from "react";
import { Box, CircularProgress, IconButton } from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import { backendURL } from "../../utilities/common";
import Snackbars from "../Model/SnackBar";
import {
  useDeleteGlassTypeFull,
  useFetchDataGlassType,
} from "../../utilities/ApiHooks/GlassType";
import GlassTypeItem from "./glassTypeItems";
import AddEditGlassType from "../Model/AddEidtGlassType";

const GlassTypeComponent = ({ type }) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const showSnackbar = (message, severity) => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const closeSnackbar = () => {
    setSnackbar((prevState) => ({
      ...prevState,
      open: false,
    }));
  };

  const {
    data: GlassTypeData,
    refetch: GlassTypeRefetch,
    isFetching: GlassTypeFetching,
  } = useFetchDataGlassType(type);
  const { mutate: deleteGlassType, isSuccess: deleteSuccess } =
    useDeleteGlassTypeFull();
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
    deleteGlassType(id);
  };

  useEffect(() => {
    if (deleteSuccess) {
      GlassTypeRefetch();
      showSnackbar("Deleted Successfully ", "error");
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
          <IconButton
            onClick={handleOpen}
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
            <Add style={{ color: "white" }} />
            Add
          </IconButton>
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
          PartNnumber{" "}
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
      {GlassTypeFetching ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: "20px",
            alignItems: "center",

            height: "56vh",
          }}
        >
          <CircularProgress size={24} color="warning" />
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
          {GlassTypeData?.map((entry, mainIndex) => (
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
                </Box>
                <Box>
                  <IconButton>
                    <Delete onClick={() => handleHardwareDelete(entry._id)} />
                  </IconButton>
                  <IconButton
                    onClick={() => handleOpenEdit(entry)}
                    sx={{
                      backgroundColor: "#8477DA",
                      "&:hover": { backgroundColor: "#8477DA" },
                      color: "white",
                      textTransform: "capitalize",
                      borderRadius: 2,
                      fontSize: 17,
                    }}
                  >
                    <Edit color="white" sx={{fontSize: 18, mr: 0.4}} />
                    Edit
                  </IconButton>
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
                    showSnackbar={showSnackbar}
                  />
                ))}
              </Box>
            </div>
          ))}
        </div>
      )}

      <AddEditGlassType
        open={open}
        close={handleClose}
        data={edit}
        isEdit={isEdit}
        refetch={GlassTypeRefetch}
        showSnackbar={showSnackbar}
        categorySlug={type}
      />

      <Snackbars
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        closeSnackbar={closeSnackbar}
      />
    </>
  );
};

export default GlassTypeComponent;