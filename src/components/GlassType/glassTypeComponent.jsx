import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import { backendURL } from "../../utilities/common";
import {
  useDeleteGlassTypeFull,
  useFetchDataGlassType,
} from "../../utilities/ApiHooks/glassType";
import GlassTypeItem from "./glassTypeItems";
import AddEditGlassType from "../Modal/addEidtGlassType";
import GlassTypeDataItem from "./glassTypeData";
import CustomIconButton from "../ui-components/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { showSnackbar } from "../../redux/snackBarSlice";
import { getDataRefetch } from "../../redux/staff";

const GlassTypeComponent = ({ type }) => {
  const refetchData = useSelector(getDataRefetch);

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
  useEffect(() => {
    if (refetchData) {
      GlassTypeRefetch();
    }
  }, [refetchData]);
  useEffect(() => {
    GlassTypeRefetch();
  }, []);
  const handleOpen = (data) => {
    setOpen(true);
    setIsEdit(false);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (deleteSuccess) {
      GlassTypeRefetch();
    }
  }, [deleteSuccess]);
  const miniTab = useMediaQuery("(max-width: 1280px)");
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
            buttonText=" Add"
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
        {/* <div
          style={{
            width: "250px",

            padding: 4,
          }}
        >
          Part Number{" "}
        </div>{" "} */}
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
          <CircularProgress size={24} sx={{ color: "#8477DA" }} />
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            height: miniTab ? "69vh" : "76vh",
            overflowY: "scroll",
          }}
        >
          {GlassTypeData?.map((entry, mainIndex) => (
            <GlassTypeDataItem
              key={mainIndex}
              entry={entry}
              mainIndex={mainIndex}
              GlassTypeRefetch={GlassTypeRefetch}
              type={type}
            />
          ))}
        </Box>
      )}

      <AddEditGlassType
        open={open}
        close={handleClose}
        data={edit}
        isEdit={isEdit}
        refetch={GlassTypeRefetch}
        categorySlug={type}
      />
    </>
  );
};

export default GlassTypeComponent;
