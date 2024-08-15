import React from "react";
import "./style.scss";
import { useDispatch } from "react-redux";
import { addHardware } from "../../redux/hardwareSlice";
import { Box } from "@mui/material";
import userImg from "../../Assets/username1.svg";
import AddEditModel from "../Modal/addEditFinish";
import GlassAddonGrid from "./glassAddonGrid";

const GlassAddonComponent = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  const handleHeaderClick = (selectedImage) => {
    const newId = Date.now() % 10000;
    const newHardware = {
      id: newId,
      name: "new ",
      img: userImg,
      username: "New",
      PartNumber: "",
      Cost: "",
      Price: "",
      Status: "",
    };

    dispatch(addHardware(newHardware));
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: {sm:"#F6F5FF",xs:'#FFFFFF'},
          height: "90vh",
          paddingTop: 2,
        }}
      >
        <Box
          sx={{
            border: "1px solid rgb(232, 232, 232)",
            margin: 2,
            height: "84vh",
          }}
        >
          <GlassAddonGrid type={"Glass Addons"} />
        </Box>
        <AddEditModel
          open={open}
          close={handleClose}
          handleHeaderClick={handleHeaderClick}
        />
      </Box>
    </>
  );
};

export default GlassAddonComponent;
