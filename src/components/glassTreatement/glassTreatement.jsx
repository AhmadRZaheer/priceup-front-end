import React from "react";
import "./glassTreatement.scss";
import { useDispatch } from "react-redux";
import {
  addHardware,
} from "../../redux/hardwareSlice";
import { Box } from "@mui/material";
import userImg from "../../Assets/username1.svg";
import AddEditModel from "../Model/addEditFinish";
import GlassTreatementComponent from "./glassTreatementComponent";

const GlassTreatementTable = () => {
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
    <Box sx={{
       backgroundColor: "white",
       height: "98.2vh",
       paddingTop: 2,
       paddingLeft: 1
    }}>
      <div
        style={{
          marginLeft: "15px",
          marginRight: "15px",
          background: "rgb(232, 232, 232)",
        }}
      >
      </div>
      <Box
        sx={{
          border: "1px solid rgb(232, 232, 232)",
          margin: 2,
          height: "90vh"
        }}
      >
        <div className="hardwareTable">
          <div className="hardwareTable">
            <GlassTreatementComponent type={"Glass Treatments"} />
          </div>
        </div>
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
export default GlassTreatementTable;