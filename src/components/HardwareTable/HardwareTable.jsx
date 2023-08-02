import React from "react";
import "./hardwareTable.scss";

import { useDispatch} from "react-redux";
import {
  addHardware,
} from "../../redux/hardwareSlice";
import { Box, Typography } from "@mui/material";
import userImg from "../../Assets/username1.svg";
import Header from "../TableHeader/TableHeader";
import HardWareComponent from "./HardWareComponent";
import AddEditModel from "../Model/AddEditFinish";
import { useFetchDatahardwareCategory } from "../../utilities/ApiHooks/Hardware";

const HardwareTable = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [showNext, SetShowNext] = React.useState("handles");
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



  const { data: hardwareCategoryData} =
    useFetchDatahardwareCategory();
  return (
    <>
      <Box
        sx={{
          backgroundColor: "white",
          height: "98.2vh",
          // borderTopLeftRadius: 30,
          // borderBottomLeftRadius: 30,
          paddingLeft: 1,
          pt: 2,
        }}
      >
        <div className="page-title">
          <Typography style={{ fontSize: 30, paddingLeft: 10 }}>Hardware</Typography>
        </div>
        <Box
          sx={{
            border: "1px solid rgb(232, 232, 232)",
            marginX: 2,
          }}
        >
          <div className="hardwareTable">
            <div className="hardwareTable">
              <div
                style={{
                  marginLeft: "15px",
                  marginRight: "15px",
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 10,
                
                }}
              >
                <Header types={hardwareCategoryData} showMore={SetShowNext} />
              </div>
              <HardWareComponent type={showNext} />
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
export default HardwareTable;
